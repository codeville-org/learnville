# Complete Guide: Deploying PayloadCMS on Cloudflare Workers

> A comprehensive guide for deploying PayloadCMS to Cloudflare's global edge network, including R2 storage, Neon PostgreSQL with Hyperdrive, D1 migration, and DevOps best practices.

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Prerequisites](#prerequisites)
4. [Storage Configuration](#storage-configuration)
   - [Cloudflare R2 Storage Adapter](#cloudflare-r2-storage-adapter)
5. [Database Options](#database-options)
   - [Neon PostgreSQL with Cloudflare Hyperdrive](#neon-postgresql-with-cloudflare-hyperdrive)
   - [Cloudflare D1 (SQLite)](#cloudflare-d1-sqlite)
   - [Migration: PostgreSQL to D1](#migration-postgresql-to-d1)
6. [Step-by-Step Deployment](#step-by-step-deployment)
7. [DevOps & CI/CD](#devops--cicd)
8. [Environment Management](#environment-management)
9. [Performance Optimization](#performance-optimization)
10. [Limitations & Considerations](#limitations--considerations)
11. [Troubleshooting](#troubleshooting)
12. [Resources](#resources)

---

## Introduction

### Why Cloudflare Workers for PayloadCMS?

Cloudflare Workers is a serverless computing platform that runs JavaScript/TypeScript at the edge across 300+ global locations. Combining PayloadCMS with Cloudflare Workers provides:

| Benefit | Description |
|---------|-------------|
| **Global Edge Deployment** | Code runs closer to users, reducing latency dramatically |
| **Serverless Architecture** | No servers to manage, automatic scaling |
| **Cost-Effective** | Pay only for what you use with generous free tiers |
| **Zero Cold Starts** | V8 Isolates technology enables millisecond startup |
| **Native Integrations** | Seamless use of D1, R2, KV, and other Cloudflare services |

### What This Means for Your Project

This project (`learnville`) currently uses:
- **Database**: PostgreSQL via `@payloadcms/db-postgres`
- **Storage**: S3 via `@payloadcms/storage-s3`

To deploy on Cloudflare Workers, you'll need to:
1. Configure OpenNext adapter for Workers compatibility
2. Set up R2 for media storage (or keep S3 with public access)
3. Choose database strategy: Hyperdrive + Neon PostgreSQL OR migrate to D1

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare Global Network                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│   │   Worker    │────▶│  Hyperdrive │────▶│   Neon DB   │       │
│   │  (Payload)  │     │ (Pool/Cache)│     │ (PostgreSQL)│       │
│   └──────┬──────┘     └─────────────┘     └─────────────┘       │
│          │                                                       │
│          │            ┌─────────────┐                           │
│          └───────────▶│     R2      │ (Media Storage)           │
│                       └─────────────┘                           │
│                                                                  │
│   Alternative Database Architecture:                             │
│   ┌─────────────┐     ┌─────────────────────────────┐           │
│   │   Worker    │────▶│    D1 (SQLite on Edge)      │           │
│   │  (Payload)  │     │  + Global Read Replicas     │           │
│   └─────────────┘     └─────────────────────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

### Required Accounts

1. **Cloudflare Account** - Free tier works for getting started
2. **Neon Account** (if using PostgreSQL) - For managed PostgreSQL database

### Required Tools

```powershell
# Install Wrangler CLI globally
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login

# Verify authentication
wrangler whoami
```

### Enable Cloudflare Services

In your Cloudflare Dashboard, ensure you have enabled:
- ✅ Workers (under Workers & Pages)
- ✅ D1 Databases (if using D1)
- ✅ R2 Storage
- ✅ Hyperdrive (if using external PostgreSQL)

---

## Storage Configuration

### Cloudflare R2 Storage Adapter

R2 is Cloudflare's S3-compatible object storage with zero egress fees. There are two approaches:

#### Option 1: Official R2 Storage Plugin (Recommended)

```bash
# Install the official R2 storage adapter
pnpm add @payloadcms/storage-r2
```

**Configuration using Bindings:**

```typescript
// src/payload.config.ts
import { r2Storage } from '@payloadcms/storage-r2'
import { getCloudflareContext } from '@opennextjs/cloudflare'

// Get Cloudflare context for bindings
const cloudflare = await getCloudflareContext({ async: true })

export default buildConfig({
  // ... other config
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2_BUCKET,  // R2 binding
      collections: {
        media: true,  // Enable for media collection
      },
    }),
  ],
})
```

#### Option 2: S3 Adapter with R2 Compatibility

Since R2 is S3-compatible, you can use the existing S3 adapter:

```typescript
// src/payload.config.ts
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
      },
    }),
  ],
})
```

#### Option 3: Custom R2 Adapter Using Bindings

For optimal performance with Workers bindings (no API tokens needed):

```typescript
// src/lib/adapters/r2-storage.ts
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import path from 'path'

const isMiniflare = process.env.NODE_ENV === 'development'

export const r2StorageAdapter: (bucket: R2Bucket) => Adapter = (bucket) => ({ prefix = '' }) => {
  const key = (filename: string) => path.posix.join(prefix, filename)
  
  return {
    name: 'r2',
    
    handleDelete: ({ filename }) => bucket.delete(key(filename)),
    
    handleUpload: async ({ file }) => {
      // Miniflare compatibility: https://github.com/cloudflare/workers-sdk/issues/6047
      const buffer = isMiniflare ? new Blob([file.buffer]) : file.buffer
      await bucket.put(key(file.filename), buffer)
    },
    
    staticHandler: async (req, { params }) => {
      const obj = await bucket?.get(key(params.filename), {
        range: isMiniflare ? undefined : req.headers,
      })
      
      if (obj?.body === undefined) {
        return new Response(null, { status: 404 })
      }

      const headers = new Headers()
      if (!isMiniflare) obj.writeHttpMetadata(headers)
      
      return obj.etag === (req.headers.get('etag') || req.headers.get('if-none-match'))
        ? new Response(null, { headers, status: 304 })
        : new Response(obj.body, { headers, status: 200 })
    },
  }
}
```

### Creating R2 Bucket

```powershell
# Create R2 bucket
wrangler r2 bucket create learnville-media

# List buckets to verify
wrangler r2 bucket list
```

### R2 Public Access Configuration

For public media access, configure a custom domain or use R2's public access:

1. Go to **R2** in Cloudflare Dashboard
2. Select your bucket → **Settings**
3. Enable **Public Access** or configure a **Custom Domain**

---

## Database Options

### Neon PostgreSQL with Cloudflare Hyperdrive

**Hyperdrive** is Cloudflare's solution for accelerating connections to external databases. It provides:

| Feature | Benefit |
|---------|---------|
| **Connection Pooling** | Maintains persistent connections across Cloudflare's network |
| **Query Caching** | Caches read queries at the edge for faster responses |
| **Reduced Latency** | Tunnels to database through optimized routes |
| **Session Affinity** | Maintains connection state for transactions |

#### Why Use Hyperdrive?

Workers can't maintain persistent connections due to their stateless nature. Each request would normally require establishing a new database connection, adding 50-100ms+ latency. Hyperdrive solves this by:

1. Maintaining a pool of warm connections
2. Routing queries through the nearest Cloudflare data center
3. Caching repeated read queries

#### Step 1: Set Up Neon PostgreSQL

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project and database
3. Copy your connection string:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

#### Step 2: Create Hyperdrive Configuration

```powershell
# Create Hyperdrive config
wrangler hyperdrive create learnville-db `
  --connection-string="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"

# Note the returned ID - you'll need it for wrangler.jsonc
```

#### Step 3: Configure PayloadCMS

```typescript
// src/payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { getCloudflareContext } from '@opennextjs/cloudflare'

const cloudflare = await getCloudflareContext({ async: true })

export default buildConfig({
  db: postgresAdapter({
    pool: {
      // Use Hyperdrive connection string from binding
      connectionString: cloudflare.env.HYPERDRIVE.connectionString,
      // IMPORTANT: Disable pooling since Hyperdrive handles it
      maxUses: 1,
    },
  }),
  // ... rest of config
})
```

#### Step 4: Update wrangler.jsonc

```jsonc
{
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<your-hyperdrive-id>"
    }
  ]
}
```

### Cloudflare D1 (SQLite)

D1 is Cloudflare's native serverless database built on SQLite. Benefits:

| Feature | Description |
|---------|-------------|
| **Zero Configuration** | No connection strings or pooling needed |
| **Edge-Native** | Runs alongside your Worker |
| **Global Read Replicas** | Automatic replication for global reads |
| **Bindings** | Direct access without API tokens |
| **Cost-Effective** | Generous free tier, pay-per-query |

#### Install D1 Adapter

```bash
pnpm add @payloadcms/db-d1-sqlite
```

#### Create D1 Database

```powershell
# Create D1 database
wrangler d1 create learnville-db

# Output will show:
# database_name = "learnville-db"
# database_id = "<uuid>"
```

#### Configure PayloadCMS for D1

```typescript
// src/payload.config.ts
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { getCloudflareContext, CloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'

// Smart context detection for local development vs production
const cloudflare = process.argv.find((value) => value.match(/^(generate|migrate):?/))
  ? await getCloudflareContextFromWrangler()
  : await getCloudflareContext({ async: true })

export default buildConfig({
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,  // D1 binding
  }),
  // ... rest of config
})

// Helper function for local development
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(`${'__wrangler'.replaceAll('_', '')}`).then(({ getPlatformProxy }) =>
    getPlatformProxy({
      environment: process.env.CLOUDFLARE_ENV,
      experimental: { remoteBindings: process.env.NODE_ENV === 'production' },
    } satisfies GetPlatformProxyOptions),
  )
}
```

### Migration: PostgreSQL to D1

If you're currently using PostgreSQL and want to migrate to D1:

#### When to Consider D1 Migration

✅ **Consider D1 if:**
- Your database size is under 10GB
- Read-heavy workload (D1 excels at reads with replicas)
- Want zero-ops database management
- Need lowest possible latency globally
- Cost sensitivity (D1 has generous free tier)

❌ **Stay with PostgreSQL if:**
- Need advanced PostgreSQL features (JSON functions, full-text search, etc.)
- Large dataset (>10GB)
- Complex queries with CTEs or window functions
- Need strict ACID compliance for writes

#### Migration Steps

##### 1. Export PostgreSQL Schema and Data

```powershell
# Export schema
pg_dump --schema-only -d your_database > schema.sql

# Export data
pg_dump --data-only --inserts -d your_database > data.sql
```

##### 2. Convert Schema for SQLite

Key differences to address:

| PostgreSQL | SQLite (D1) |
|------------|-------------|
| `SERIAL` / `BIGSERIAL` | `INTEGER PRIMARY KEY AUTOINCREMENT` |
| `TIMESTAMP WITH TIME ZONE` | `TEXT` (ISO 8601 format) |
| `JSONB` | `TEXT` (JSON string) |
| `UUID` | `TEXT` |
| `BOOLEAN` | `INTEGER` (0/1) |
| `ARRAY` types | `TEXT` (JSON array string) |

##### 3. Create New Payload Migration

```bash
# Switch to D1 adapter in config first
# Then create migration
pnpm payload migrate:create

# This generates migration files compatible with D1
```

##### 4. Import Data to D1

```powershell
# Execute migration
pnpm payload migrate

# For bulk data import
wrangler d1 execute learnville-db --file=./data.sql
```

##### 5. Update Application Code

Replace PostgreSQL-specific queries with SQLite-compatible versions. Payload handles most of this automatically through its abstraction layer.

#### Rollback Strategy

Keep your PostgreSQL database running during transition:

```typescript
// src/payload.config.ts
const useD1 = process.env.USE_D1 === 'true'

export default buildConfig({
  db: useD1
    ? sqliteD1Adapter({ binding: cloudflare.env.D1 })
    : postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL },
      }),
})
```

---

## Step-by-Step Deployment

### Step 1: Install Required Packages

```bash
pnpm add @opennextjs/cloudflare wrangler
```

### Step 2: Create OpenNext Configuration

```typescript
// open-next.config.ts
import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
}

export default config
```

### Step 3: Update Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@payloadcms/db-postgres'],
  },
  images: {
    unoptimized: true,  // Required for Workers
  },
}

export default nextConfig
```

### Step 4: Create Wrangler Configuration

```jsonc
// wrangler.jsonc
{
  "name": "learnville",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "main": ".open-next/worker.js",
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  
  // Choose one database option:
  
  // Option A: D1 Database
  "d1_databases": [
    {
      "binding": "D1",
      "database_name": "learnville-db",
      "database_id": "<your-d1-database-id>"
    }
  ],
  
  // Option B: Hyperdrive (for Neon PostgreSQL)
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<your-hyperdrive-id>"
    }
  ],
  
  // R2 Storage
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "learnville-media"
    }
  ],
  
  // Environment Variables
  "vars": {
    "PAYLOAD_SECRET": "<generate-a-secure-secret>",
    "NODE_ENV": "production"
  },
  
  // Environment-specific overrides
  "env": {
    "staging": {
      "name": "learnville-staging",
      "vars": {
        "NODE_ENV": "staging"
      }
    },
    "production": {
      "name": "learnville-production",
      "routes": [
        { "pattern": "learnville.com/*", "zone_name": "learnville.com" }
      ]
    }
  }
}
```

### Step 5: Update Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:worker": "opennextjs-cloudflare",
    "deploy": "pnpm run build:worker && wrangler deploy",
    "deploy:staging": "pnpm run build:worker && wrangler deploy --env staging",
    "deploy:production": "pnpm run build:worker && wrangler deploy --env production",
    "preview": "pnpm run build:worker && wrangler dev",
    "migrate:create": "payload migrate:create",
    "migrate": "payload migrate",
    "migrate:remote": "CLOUDFLARE_ENV=production payload migrate"
  }
}
```

### Step 6: Run Database Migrations

```powershell
# Create initial migration
pnpm payload migrate:create

# Run migrations locally
pnpm payload migrate

# Run migrations against remote D1
pnpm migrate:remote
```

### Step 7: Deploy

```powershell
# Deploy to Cloudflare
pnpm run deploy

# Output will show your deployment URL:
# Published learnville (1.23 sec)
# https://learnville.workers.dev
```

---

## DevOps & CI/CD

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

env:
  CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
  CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run linting
        run: pnpm lint
      
      - name: Run tests
        run: pnpm test:int
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  deploy-staging:
    needs: lint-and-test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run database migrations
        run: pnpm migrate:remote
        env:
          CLOUDFLARE_ENV: staging
      
      - name: Build and Deploy
        run: pnpm deploy:staging

  deploy-production:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run database migrations
        run: pnpm migrate:remote
        env:
          CLOUDFLARE_ENV: production
      
      - name: Build and Deploy
        run: pnpm deploy:production
```

### Required GitHub Secrets

| Secret | Description | How to Get |
|--------|-------------|------------|
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID | Dashboard → Workers → Overview |
| `CLOUDFLARE_API_TOKEN` | API token with Workers permissions | Dashboard → My Profile → API Tokens |
| `TEST_DATABASE_URL` | Database URL for tests | Your test database connection string |

### Creating Cloudflare API Token

1. Go to **Cloudflare Dashboard** → **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use **Custom Token** template with these permissions:
   - Account → Workers Scripts → Edit
   - Account → Workers R2 Storage → Edit
   - Account → D1 → Edit
   - Account → Workers KV Storage → Edit
   - Zone → Workers Routes → Edit (if using custom domain)

### Branch Protection Rules

Configure these in GitHub repository settings:

```yaml
# main branch
- Require pull request reviews: 1 reviewer
- Require status checks:
  - lint-and-test
- Require branches to be up to date
- Restrict pushes (only through PRs)

# staging branch
- Require status checks:
  - lint-and-test
```

### Deployment Strategy

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Feature   │    │   Staging   │    │ Production  │
│   Branch    │───▶│   Branch    │───▶│   Branch    │
│             │ PR │             │ PR │   (main)    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
   Local Dev         Staging Env        Production
   (wrangler dev)    (auto-deploy)      (auto-deploy)
```

---

## Environment Management

### Environment Structure

```
wrangler.jsonc
├── Base configuration (shared)
├── env.staging
│   ├── Different worker name
│   ├── Staging database
│   └── Staging R2 bucket
└── env.production
    ├── Production worker name
    ├── Production database
    ├── Production R2 bucket
    └── Custom domain routing
```

### Complete Multi-Environment Configuration

```jsonc
// wrangler.jsonc
{
  "name": "learnville",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "main": ".open-next/worker.js",
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  
  // Default environment (development)
  "d1_databases": [
    {
      "binding": "D1",
      "database_name": "learnville-dev",
      "database_id": "<dev-database-id>"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "learnville-media-dev"
    }
  ],
  "vars": {
    "PAYLOAD_SECRET": "dev-secret-change-in-production",
    "NODE_ENV": "development",
    "NEXT_PUBLIC_SERVER_URL": "http://localhost:3000"
  },
  
  // Environment overrides
  "env": {
    "staging": {
      "name": "learnville-staging",
      "d1_databases": [
        {
          "binding": "D1",
          "database_name": "learnville-staging",
          "database_id": "<staging-database-id>"
        }
      ],
      "r2_buckets": [
        {
          "binding": "R2_BUCKET",
          "bucket_name": "learnville-media-staging"
        }
      ],
      "vars": {
        "NODE_ENV": "staging",
        "NEXT_PUBLIC_SERVER_URL": "https://staging.learnville.com"
      }
    },
    "production": {
      "name": "learnville-production",
      "d1_databases": [
        {
          "binding": "D1",
          "database_name": "learnville-prod",
          "database_id": "<production-database-id>"
        }
      ],
      "r2_buckets": [
        {
          "binding": "R2_BUCKET",
          "bucket_name": "learnville-media-prod"
        }
      ],
      "vars": {
        "NODE_ENV": "production",
        "NEXT_PUBLIC_SERVER_URL": "https://learnville.com"
      },
      "routes": [
        {
          "pattern": "learnville.com/*",
          "zone_name": "learnville.com"
        },
        {
          "pattern": "www.learnville.com/*",
          "zone_name": "learnville.com"
        }
      ]
    }
  }
}
```

### Secrets Management

Never commit secrets to wrangler.jsonc. Use Wrangler secrets instead:

```powershell
# Set secret for default environment
wrangler secret put PAYLOAD_SECRET

# Set secret for specific environment
wrangler secret put PAYLOAD_SECRET --env staging
wrangler secret put PAYLOAD_SECRET --env production

# List secrets
wrangler secret list
wrangler secret list --env production
```

### Local Development Setup

Create `.dev.vars` for local secrets (gitignored):

```bash
# .dev.vars
PAYLOAD_SECRET=your-local-development-secret
DATABASE_URL=postgresql://localhost:5432/learnville_dev
```

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `PAYLOAD_SECRET` | JWT signing secret (32+ chars) | Yes |
| `NODE_ENV` | Environment identifier | Yes |
| `NEXT_PUBLIC_SERVER_URL` | Public URL for the application | Yes |
| `DATABASE_URL` | PostgreSQL connection (if not using D1) | Conditional |
| `R2_PUBLIC_DOMAIN` | Custom domain for R2 assets | Optional |
| `CLOUDFLARE_ACCOUNT_ID` | For API operations | Optional |

---

## Performance Optimization

### D1 Global Read Replicas

Enable read replicas for global performance:

```typescript
// In your D1 adapter configuration
// Using first-primary session for consistency
this.drizzle = drizzle(
  this.binding.withSession("first-primary"),
  { logger, schema: this.schema }
)
```

Performance improvements with read replicas:

| Metric | Without Replicas | With Replicas | Improvement |
|--------|------------------|---------------|-------------|
| P50 Latency | 300ms | 120ms | -60% |
| P90 Latency | 480ms | 250ms | -48% |
| P99 Latency | 760ms | 550ms | -28% |

*Measurements from Cloudflare's testing with globally distributed load.*

### Caching Strategies

#### 1. Edge Caching with Cache API

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'

export async function middleware(request: Request) {
  const url = new URL(request.url)
  
  // Cache static pages at the edge
  if (url.pathname.startsWith('/courses/')) {
    const response = NextResponse.next()
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    )
    return response
  }
  
  return NextResponse.next()
}
```

#### 2. Hyperdrive Query Caching

Hyperdrive automatically caches read queries. Optimize by:

```typescript
// Use specific selects instead of SELECT *
const courses = await payload.find({
  collection: 'courses',
  select: {
    title: true,
    slug: true,
    thumbnail: true,
  },
  depth: 0,  // Minimize depth for better caching
})
```

### Bundle Size Optimization

Workers have size limits:
- **Free tier**: 1MB compressed
- **Paid tier**: 10MB compressed

Tips to reduce bundle size:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@payloadcms/db-postgres',
      'sharp',  // Externalize heavy packages
    ],
  },
  // Tree shake unused code
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
}
```

### Image Optimization

Since Workers can't run sharp for image processing:

```typescript
// Use Cloudflare Images or external service
// src/payloadcms/collections/Media.ts
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    disableLocalStorage: true,  // Required for R2
    imageSizes: [], // Disable server-side resizing
    formatOptions: {
      format: 'webp',  // Serve optimized format
    },
  },
}
```

Use Cloudflare Image Resizing:

```typescript
// In your frontend components
const optimizedUrl = `${imageUrl}?width=800&format=webp&quality=80`
```

---

## Limitations & Considerations

### Known Limitations

| Limitation | Impact | Workaround |
|------------|--------|------------|
| **GraphQL Support** | Not fully compatible with Workers | Use REST API endpoints |
| **Bundle Size** | 1MB free / 10MB paid limit | Tree-shake, externalize packages |
| **Request Duration** | 30s CPU time limit | Optimize queries, use streaming |
| **D1 Size** | 10GB per database | Shard data or use Hyperdrive + PostgreSQL |
| **Sharp/Image Processing** | Not supported in Workers | Use Cloudflare Images or pre-process |
| **WebSocket Duration** | Limited to request lifecycle | Use Durable Objects for persistent connections |

### D1 vs PostgreSQL Decision Matrix

| Factor | D1 | PostgreSQL + Hyperdrive |
|--------|----|-----------------------|
| **Latency** | ⭐⭐⭐⭐⭐ (edge-native) | ⭐⭐⭐⭐ (cached) |
| **Data Size** | Up to 10GB | Unlimited |
| **Feature Set** | SQLite subset | Full PostgreSQL |
| **Cost** | Very low | Database hosting + Hyperdrive |
| **Ops Overhead** | Zero | Moderate |
| **Complex Queries** | Limited | Full support |

### Security Considerations

1. **Secrets Management**
   ```powershell
   # Never commit secrets - use Wrangler
   wrangler secret put PAYLOAD_SECRET
   ```

2. **Access Control**
   ```typescript
   // Use Cloudflare Access for admin panel
   // Configure in Cloudflare Dashboard → Zero Trust
   ```

3. **Rate Limiting**
   ```jsonc
   // wrangler.jsonc
   {
     "rules": [
       {
         "action": "block",
         "rateLimit": {
           "requests_per_period": 100,
           "period": 60
         }
       }
     ]
   }
   ```

---

## Troubleshooting

### Common Issues

#### 1. "Cannot perform I/O on behalf of a different request"

**Cause**: Sharing connections across requests

**Solution**:
```typescript
db: postgresAdapter({
  pool: {
    connectionString: cloudflare.env.HYPERDRIVE.connectionString,
    maxUses: 1,  // Disable connection reuse
  },
})
```

#### 2. "Bundle size exceeds limit"

**Solutions**:
- Externalize heavy packages in next.config.ts
- Remove unused dependencies
- Use dynamic imports for admin-only features
- Upgrade to Workers Paid plan (10MB limit)

#### 3. "D1 migration fails"

**Check**:
```powershell
# Ensure using remote bindings for migrations
CLOUDFLARE_ENV=production pnpm payload migrate

# Verify D1 database exists
wrangler d1 list
```

#### 4. "R2 uploads fail locally"

**Miniflare compatibility issue**:
```typescript
// Check for Miniflare and handle accordingly
const isMiniflare = process.env.NODE_ENV === 'development'
const buffer = isMiniflare ? new Blob([file.buffer]) : file.buffer
```

#### 5. "Types not generated correctly"

```powershell
# Regenerate types after schema changes
pnpm payload generate:types
pnpm generate:importmap
```

### Debug Commands

```powershell
# View Worker logs
wrangler tail

# Local development with remote bindings
wrangler dev --remote

# Check deployment status
wrangler deployments list

# Execute D1 query directly
wrangler d1 execute learnville-db --command "SELECT * FROM users LIMIT 5"
```

---

## Resources

### Official Documentation

| Resource | URL |
|----------|-----|
| PayloadCMS Docs | https://payloadcms.com/docs |
| Cloudflare Workers | https://developers.cloudflare.com/workers/ |
| Cloudflare D1 | https://developers.cloudflare.com/d1/ |
| Cloudflare R2 | https://developers.cloudflare.com/r2/ |
| Cloudflare Hyperdrive | https://developers.cloudflare.com/hyperdrive/ |
| OpenNext Cloudflare | https://opennext.js.org/cloudflare |
| Neon PostgreSQL | https://neon.tech/docs |

### Templates & Examples

| Resource | URL |
|----------|-----|
| Payload + Cloudflare D1 Template | https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1 |
| Deploy to Cloudflare Button | https://deploy.workers.cloudflare.com/?url=https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1 |
| Example Project | https://github.com/bearBoy80/payload-with-cloudflare |

### Community & Support

| Channel | URL |
|---------|-----|
| PayloadCMS Discord | https://discord.com/invite/payload |
| Cloudflare Discord | https://discord.cloudflare.com |
| PayloadCMS GitHub | https://github.com/payloadcms/payload |

---

## Quick Start Checklist

- [ ] Install Wrangler CLI and authenticate
- [ ] Create Cloudflare resources (D1/Hyperdrive, R2)
- [ ] Install required packages (`@opennextjs/cloudflare`, adapters)
- [ ] Create `open-next.config.ts`
- [ ] Create `wrangler.jsonc` with bindings
- [ ] Update `payload.config.ts` for Cloudflare context
- [ ] Update `next.config.ts` for Workers compatibility
- [ ] Set secrets via `wrangler secret put`
- [ ] Run database migrations
- [ ] Test locally with `wrangler dev`
- [ ] Deploy with `wrangler deploy`
- [ ] Set up CI/CD pipeline
- [ ] Configure custom domain (optional)
- [ ] Enable Cloudflare Access for admin (recommended)

---

*Last Updated: January 2026*
*Payload CMS Version: 3.69.0*
*Tested with Cloudflare Workers & OpenNext*
