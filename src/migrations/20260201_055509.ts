import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Create types only if they don't exist (dev mode may have created them already)
  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_top_categories_content_cta_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_top_categories_content_cta_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_header_explore_menu_view_all_link_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__header_v_version_explore_menu_view_all_link_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_cta_instructor_c_t_a_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_cta_student_c_t_a_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__cta_v_version_instructor_c_t_a_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__cta_v_version_student_c_t_a_type" AS ENUM('page', 'external', 'custom');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  
  -- Drop constraints if they exist (may already be dropped by dev mode)
  ALTER TABLE "pages_blocks_top_categories" DROP CONSTRAINT IF EXISTS "pages_blocks_top_categories_content_cta_internal_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_top_categories" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_top_categories_content_cta_internal_link_id_pages_id_fk";
  ALTER TABLE "footer_link_columns_links" DROP CONSTRAINT IF EXISTS "footer_link_columns_links_internal_link_id_pages_id_fk";
  ALTER TABLE "footer_link_columns_links" DROP CONSTRAINT IF EXISTS "footer_link_columns_links_category_link_id_categories_id_fk";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP CONSTRAINT IF EXISTS "_footer_v_version_link_columns_links_internal_link_id_pages_id_fk";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP CONSTRAINT IF EXISTS "_footer_v_version_link_columns_links_category_link_id_categories_id_fk";
  ALTER TABLE "cta" DROP CONSTRAINT IF EXISTS "cta_instructor_c_t_a_internal_link_id_pages_id_fk";
  ALTER TABLE "cta" DROP CONSTRAINT IF EXISTS "cta_student_c_t_a_internal_link_id_pages_id_fk";
  ALTER TABLE "_cta_v" DROP CONSTRAINT IF EXISTS "_cta_v_version_instructor_c_t_a_internal_link_id_pages_id_fk";
  ALTER TABLE "_cta_v" DROP CONSTRAINT IF EXISTS "_cta_v_version_student_c_t_a_internal_link_id_pages_id_fk";
  
  -- Handle footer_link_columns_links type column migration (skip if already migrated)
  DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_footer_link_columns_links_type' AND EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = pg_type.oid AND enumlabel = 'internal')) THEN
      ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
      ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::text;
      UPDATE "footer_link_columns_links" SET "type" = 'page' WHERE "type" = 'internal';
      UPDATE "footer_link_columns_links" SET "type" = 'custom' WHERE "type" = 'category';
      DROP TYPE "public"."enum_footer_link_columns_links_type";
      CREATE TYPE "public"."enum_footer_link_columns_links_type" AS ENUM('page', 'external', 'custom');
      ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::"public"."enum_footer_link_columns_links_type";
      ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_footer_link_columns_links_type" USING "type"::"public"."enum_footer_link_columns_links_type";
    END IF;
  END $$;
  
  DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__footer_v_version_link_columns_links_type' AND EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = pg_type.oid AND enumlabel = 'internal')) THEN
      ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
      ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::text;
      UPDATE "_footer_v_version_link_columns_links" SET "type" = 'page' WHERE "type" = 'internal';
      UPDATE "_footer_v_version_link_columns_links" SET "type" = 'custom' WHERE "type" = 'category';
      DROP TYPE "public"."enum__footer_v_version_link_columns_links_type";
      CREATE TYPE "public"."enum__footer_v_version_link_columns_links_type" AS ENUM('page', 'external', 'custom');
      ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::"public"."enum__footer_v_version_link_columns_links_type";
      ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum__footer_v_version_link_columns_links_type" USING "type"::"public"."enum__footer_v_version_link_columns_links_type";
    END IF;
  END $$;
  DROP INDEX IF EXISTS "pages_blocks_top_categories_content_cta_content_cta_inte_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_top_categories_content_cta_content_cta_i_idx";
  DROP INDEX IF EXISTS "footer_link_columns_links_internal_link_idx";
  DROP INDEX IF EXISTS "footer_link_columns_links_category_link_idx";
  DROP INDEX IF EXISTS "_footer_v_version_link_columns_links_internal_link_idx";
  DROP INDEX IF EXISTS "_footer_v_version_link_columns_links_category_link_idx";
  DROP INDEX IF EXISTS "cta_instructor_c_t_a_instructor_c_t_a_internal_link_idx";
  DROP INDEX IF EXISTS "cta_student_c_t_a_student_c_t_a_internal_link_idx";
  DROP INDEX IF EXISTS "_cta_v_version_student_c_t_a_version_student_c_t_a_inter_idx";
  DROP INDEX IF EXISTS "_cta_v_version_instructor_c_t_a_version_instructor_c_t_1_idx";
  ALTER TABLE "pages_blocks_top_categories" ADD COLUMN IF NOT EXISTS "content_cta_type" "enum_pages_blocks_top_categories_content_cta_type" DEFAULT 'page';
  ALTER TABLE "pages_blocks_top_categories" ADD COLUMN IF NOT EXISTS "content_cta_page_id" integer;
  ALTER TABLE "pages_blocks_top_categories" ADD COLUMN IF NOT EXISTS "content_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_top_categories" ADD COLUMN IF NOT EXISTS "content_cta_type" "enum__pages_v_blocks_top_categories_content_cta_type" DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_top_categories" ADD COLUMN IF NOT EXISTS "content_cta_page_id" integer;
  ALTER TABLE "_pages_v_blocks_top_categories" ADD COLUMN IF NOT EXISTS "content_cta_url" varchar;
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "explore_menu_view_all_link_type" "enum_header_explore_menu_view_all_link_type" DEFAULT 'page';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "explore_menu_view_all_link_url" varchar;
  ALTER TABLE "_header_v" ADD COLUMN IF NOT EXISTS "version_explore_menu_view_all_link_type" "enum__header_v_version_explore_menu_view_all_link_type" DEFAULT 'page';
  ALTER TABLE "_header_v" ADD COLUMN IF NOT EXISTS "version_explore_menu_view_all_link_url" varchar;
  ALTER TABLE "footer_link_columns_links" ADD COLUMN IF NOT EXISTS "page_id" integer;
  ALTER TABLE "footer_link_columns_links" ADD COLUMN IF NOT EXISTS "url" varchar;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD COLUMN IF NOT EXISTS "page_id" integer;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD COLUMN IF NOT EXISTS "url" varchar;
  ALTER TABLE "cta" ADD COLUMN IF NOT EXISTS "instructor_c_t_a_type" "enum_cta_instructor_c_t_a_type" DEFAULT 'page';
  ALTER TABLE "cta" ADD COLUMN IF NOT EXISTS "instructor_c_t_a_page_id" integer;
  ALTER TABLE "cta" ADD COLUMN IF NOT EXISTS "instructor_c_t_a_url" varchar;
  ALTER TABLE "cta" ADD COLUMN IF NOT EXISTS "student_c_t_a_type" "enum_cta_student_c_t_a_type" DEFAULT 'page';
  ALTER TABLE "cta" ADD COLUMN IF NOT EXISTS "student_c_t_a_page_id" integer;
  ALTER TABLE "cta" ADD COLUMN IF NOT EXISTS "student_c_t_a_url" varchar;
  ALTER TABLE "_cta_v" ADD COLUMN IF NOT EXISTS "version_instructor_c_t_a_type" "enum__cta_v_version_instructor_c_t_a_type" DEFAULT 'page';
  ALTER TABLE "_cta_v" ADD COLUMN IF NOT EXISTS "version_instructor_c_t_a_page_id" integer;
  ALTER TABLE "_cta_v" ADD COLUMN IF NOT EXISTS "version_instructor_c_t_a_url" varchar;
  ALTER TABLE "_cta_v" ADD COLUMN IF NOT EXISTS "version_student_c_t_a_type" "enum__cta_v_version_student_c_t_a_type" DEFAULT 'page';
  ALTER TABLE "_cta_v" ADD COLUMN IF NOT EXISTS "version_student_c_t_a_page_id" integer;
  ALTER TABLE "_cta_v" ADD COLUMN IF NOT EXISTS "version_student_c_t_a_url" varchar;
  -- Add constraints only if they don't exist
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_top_categories" ADD CONSTRAINT "pages_blocks_top_categories_content_cta_page_id_pages_id_fk" FOREIGN KEY ("content_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_top_categories" ADD CONSTRAINT "_pages_v_blocks_top_categories_content_cta_page_id_pages_id_fk" FOREIGN KEY ("content_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_footer_v_version_link_columns_links" ADD CONSTRAINT "_footer_v_version_link_columns_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "cta" ADD CONSTRAINT "cta_instructor_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("instructor_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "cta" ADD CONSTRAINT "cta_student_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("student_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_instructor_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("version_instructor_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_student_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("version_student_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "pages_blocks_top_categories_content_cta_content_cta_page_idx" ON "pages_blocks_top_categories" USING btree ("content_cta_page_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_top_categories_content_cta_content_cta_p_idx" ON "_pages_v_blocks_top_categories" USING btree ("content_cta_page_id");
  CREATE INDEX IF NOT EXISTS "footer_link_columns_links_page_idx" ON "footer_link_columns_links" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "_footer_v_version_link_columns_links_page_idx" ON "_footer_v_version_link_columns_links" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "cta_instructor_c_t_a_instructor_c_t_a_page_idx" ON "cta" USING btree ("instructor_c_t_a_page_id");
  CREATE INDEX IF NOT EXISTS "cta_student_c_t_a_student_c_t_a_page_idx" ON "cta" USING btree ("student_c_t_a_page_id");
  CREATE INDEX IF NOT EXISTS "_cta_v_version_student_c_t_a_version_student_c_t_a_page_idx" ON "_cta_v" USING btree ("version_student_c_t_a_page_id");
  CREATE INDEX IF NOT EXISTS "_cta_v_version_instructor_c_t_a_version_instructor_c_t_1_idx" ON "_cta_v" USING btree ("version_instructor_c_t_a_page_id");
  ALTER TABLE "pages_blocks_top_categories" DROP COLUMN IF EXISTS "content_cta_link_type";
  ALTER TABLE "pages_blocks_top_categories" DROP COLUMN IF EXISTS "content_cta_internal_link_id";
  ALTER TABLE "pages_blocks_top_categories" DROP COLUMN IF EXISTS "content_cta_external_link";
  ALTER TABLE "_pages_v_blocks_top_categories" DROP COLUMN IF EXISTS "content_cta_link_type";
  ALTER TABLE "_pages_v_blocks_top_categories" DROP COLUMN IF EXISTS "content_cta_internal_link_id";
  ALTER TABLE "_pages_v_blocks_top_categories" DROP COLUMN IF EXISTS "content_cta_external_link";
  ALTER TABLE "footer_link_columns_links" DROP COLUMN IF EXISTS "internal_link_id";
  ALTER TABLE "footer_link_columns_links" DROP COLUMN IF EXISTS "category_link_id";
  ALTER TABLE "footer_link_columns_links" DROP COLUMN IF EXISTS "external_link";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP COLUMN IF EXISTS "internal_link_id";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP COLUMN IF EXISTS "category_link_id";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP COLUMN IF EXISTS "external_link";
  ALTER TABLE "cta" DROP COLUMN IF EXISTS "instructor_c_t_a_link_type";
  ALTER TABLE "cta" DROP COLUMN IF EXISTS "instructor_c_t_a_internal_link_id";
  ALTER TABLE "cta" DROP COLUMN IF EXISTS "instructor_c_t_a_external_link";
  ALTER TABLE "cta" DROP COLUMN IF EXISTS "student_c_t_a_link_type";
  ALTER TABLE "cta" DROP COLUMN IF EXISTS "student_c_t_a_internal_link_id";
  ALTER TABLE "cta" DROP COLUMN IF EXISTS "student_c_t_a_external_link";
  ALTER TABLE "_cta_v" DROP COLUMN IF EXISTS "version_instructor_c_t_a_link_type";
  ALTER TABLE "_cta_v" DROP COLUMN IF EXISTS "version_instructor_c_t_a_internal_link_id";
  ALTER TABLE "_cta_v" DROP COLUMN IF EXISTS "version_instructor_c_t_a_external_link";
  ALTER TABLE "_cta_v" DROP COLUMN IF EXISTS "version_student_c_t_a_link_type";
  ALTER TABLE "_cta_v" DROP COLUMN IF EXISTS "version_student_c_t_a_internal_link_id";
  ALTER TABLE "_cta_v" DROP COLUMN IF EXISTS "version_student_c_t_a_external_link";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_top_categories_content_cta_link_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_top_categories_content_cta_link_type";
  DROP TYPE IF EXISTS "public"."enum_cta_instructor_c_t_a_link_type";
  DROP TYPE IF EXISTS "public"."enum_cta_student_c_t_a_link_type";
  DROP TYPE IF EXISTS "public"."enum__cta_v_version_instructor_c_t_a_link_type";
  DROP TYPE IF EXISTS "public"."enum__cta_v_version_student_c_t_a_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_top_categories_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_top_categories_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_cta_instructor_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_cta_student_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cta_v_version_instructor_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cta_v_version_student_c_t_a_link_type" AS ENUM('internal', 'external');
  ALTER TABLE "pages_blocks_top_categories" DROP CONSTRAINT "pages_blocks_top_categories_content_cta_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_top_categories" DROP CONSTRAINT "_pages_v_blocks_top_categories_content_cta_page_id_pages_id_fk";
  
  ALTER TABLE "footer_link_columns_links" DROP CONSTRAINT "footer_link_columns_links_page_id_pages_id_fk";
  
  ALTER TABLE "_footer_v_version_link_columns_links" DROP CONSTRAINT "_footer_v_version_link_columns_links_page_id_pages_id_fk";
  
  ALTER TABLE "cta" DROP CONSTRAINT "cta_instructor_c_t_a_page_id_pages_id_fk";
  
  ALTER TABLE "cta" DROP CONSTRAINT "cta_student_c_t_a_page_id_pages_id_fk";
  
  ALTER TABLE "_cta_v" DROP CONSTRAINT "_cta_v_version_instructor_c_t_a_page_id_pages_id_fk";
  
  ALTER TABLE "_cta_v" DROP CONSTRAINT "_cta_v_version_student_c_t_a_page_id_pages_id_fk";
  
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'internal'::text;
  DROP TYPE "public"."enum_footer_link_columns_links_type";
  CREATE TYPE "public"."enum_footer_link_columns_links_type" AS ENUM('internal', 'external', 'category');
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'internal'::"public"."enum_footer_link_columns_links_type";
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_footer_link_columns_links_type" USING "type"::"public"."enum_footer_link_columns_links_type";
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'internal'::text;
  DROP TYPE "public"."enum__footer_v_version_link_columns_links_type";
  CREATE TYPE "public"."enum__footer_v_version_link_columns_links_type" AS ENUM('internal', 'external', 'category');
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'internal'::"public"."enum__footer_v_version_link_columns_links_type";
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum__footer_v_version_link_columns_links_type" USING "type"::"public"."enum__footer_v_version_link_columns_links_type";
  DROP INDEX "pages_blocks_top_categories_content_cta_content_cta_page_idx";
  DROP INDEX "_pages_v_blocks_top_categories_content_cta_content_cta_p_idx";
  DROP INDEX "footer_link_columns_links_page_idx";
  DROP INDEX "_footer_v_version_link_columns_links_page_idx";
  DROP INDEX "cta_instructor_c_t_a_instructor_c_t_a_page_idx";
  DROP INDEX "cta_student_c_t_a_student_c_t_a_page_idx";
  DROP INDEX "_cta_v_version_student_c_t_a_version_student_c_t_a_page_idx";
  DROP INDEX "_cta_v_version_instructor_c_t_a_version_instructor_c_t_1_idx";
  ALTER TABLE "pages_blocks_top_categories" ADD COLUMN "content_cta_link_type" "enum_pages_blocks_top_categories_content_cta_link_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_top_categories" ADD COLUMN "content_cta_internal_link_id" integer;
  ALTER TABLE "pages_blocks_top_categories" ADD COLUMN "content_cta_external_link" varchar;
  ALTER TABLE "_pages_v_blocks_top_categories" ADD COLUMN "content_cta_link_type" "enum__pages_v_blocks_top_categories_content_cta_link_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_top_categories" ADD COLUMN "content_cta_internal_link_id" integer;
  ALTER TABLE "_pages_v_blocks_top_categories" ADD COLUMN "content_cta_external_link" varchar;
  ALTER TABLE "footer_link_columns_links" ADD COLUMN "internal_link_id" integer;
  ALTER TABLE "footer_link_columns_links" ADD COLUMN "category_link_id" integer;
  ALTER TABLE "footer_link_columns_links" ADD COLUMN "external_link" varchar;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD COLUMN "internal_link_id" integer;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD COLUMN "category_link_id" integer;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD COLUMN "external_link" varchar;
  ALTER TABLE "cta" ADD COLUMN "instructor_c_t_a_link_type" "enum_cta_instructor_c_t_a_link_type" DEFAULT 'internal';
  ALTER TABLE "cta" ADD COLUMN "instructor_c_t_a_internal_link_id" integer;
  ALTER TABLE "cta" ADD COLUMN "instructor_c_t_a_external_link" varchar;
  ALTER TABLE "cta" ADD COLUMN "student_c_t_a_link_type" "enum_cta_student_c_t_a_link_type" DEFAULT 'internal';
  ALTER TABLE "cta" ADD COLUMN "student_c_t_a_internal_link_id" integer;
  ALTER TABLE "cta" ADD COLUMN "student_c_t_a_external_link" varchar;
  ALTER TABLE "_cta_v" ADD COLUMN "version_instructor_c_t_a_link_type" "enum__cta_v_version_instructor_c_t_a_link_type" DEFAULT 'internal';
  ALTER TABLE "_cta_v" ADD COLUMN "version_instructor_c_t_a_internal_link_id" integer;
  ALTER TABLE "_cta_v" ADD COLUMN "version_instructor_c_t_a_external_link" varchar;
  ALTER TABLE "_cta_v" ADD COLUMN "version_student_c_t_a_link_type" "enum__cta_v_version_student_c_t_a_link_type" DEFAULT 'internal';
  ALTER TABLE "_cta_v" ADD COLUMN "version_student_c_t_a_internal_link_id" integer;
  ALTER TABLE "_cta_v" ADD COLUMN "version_student_c_t_a_external_link" varchar;
  ALTER TABLE "pages_blocks_top_categories" ADD CONSTRAINT "pages_blocks_top_categories_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_categories" ADD CONSTRAINT "_pages_v_blocks_top_categories_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_category_link_id_categories_id_fk" FOREIGN KEY ("category_link_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD CONSTRAINT "_footer_v_version_link_columns_links_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD CONSTRAINT "_footer_v_version_link_columns_links_category_link_id_categories_id_fk" FOREIGN KEY ("category_link_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_instructor_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("instructor_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_student_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("student_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_instructor_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("version_instructor_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_student_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("version_student_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_top_categories_content_cta_content_cta_inte_idx" ON "pages_blocks_top_categories" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "_pages_v_blocks_top_categories_content_cta_content_cta_i_idx" ON "_pages_v_blocks_top_categories" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "footer_link_columns_links_internal_link_idx" ON "footer_link_columns_links" USING btree ("internal_link_id");
  CREATE INDEX "footer_link_columns_links_category_link_idx" ON "footer_link_columns_links" USING btree ("category_link_id");
  CREATE INDEX "_footer_v_version_link_columns_links_internal_link_idx" ON "_footer_v_version_link_columns_links" USING btree ("internal_link_id");
  CREATE INDEX "_footer_v_version_link_columns_links_category_link_idx" ON "_footer_v_version_link_columns_links" USING btree ("category_link_id");
  CREATE INDEX "cta_instructor_c_t_a_instructor_c_t_a_internal_link_idx" ON "cta" USING btree ("instructor_c_t_a_internal_link_id");
  CREATE INDEX "cta_student_c_t_a_student_c_t_a_internal_link_idx" ON "cta" USING btree ("student_c_t_a_internal_link_id");
  CREATE INDEX "_cta_v_version_student_c_t_a_version_student_c_t_a_inter_idx" ON "_cta_v" USING btree ("version_student_c_t_a_internal_link_id");
  CREATE INDEX "_cta_v_version_instructor_c_t_a_version_instructor_c_t_1_idx" ON "_cta_v" USING btree ("version_instructor_c_t_a_internal_link_id");
  ALTER TABLE "pages_blocks_top_categories" DROP COLUMN "content_cta_type";
  ALTER TABLE "pages_blocks_top_categories" DROP COLUMN "content_cta_page_id";
  ALTER TABLE "pages_blocks_top_categories" DROP COLUMN "content_cta_url";
  ALTER TABLE "_pages_v_blocks_top_categories" DROP COLUMN "content_cta_type";
  ALTER TABLE "_pages_v_blocks_top_categories" DROP COLUMN "content_cta_page_id";
  ALTER TABLE "_pages_v_blocks_top_categories" DROP COLUMN "content_cta_url";
  ALTER TABLE "header" DROP COLUMN "explore_menu_view_all_link_type";
  ALTER TABLE "header" DROP COLUMN "explore_menu_view_all_link_url";
  ALTER TABLE "_header_v" DROP COLUMN "version_explore_menu_view_all_link_type";
  ALTER TABLE "_header_v" DROP COLUMN "version_explore_menu_view_all_link_url";
  ALTER TABLE "footer_link_columns_links" DROP COLUMN "page_id";
  ALTER TABLE "footer_link_columns_links" DROP COLUMN "url";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP COLUMN "page_id";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP COLUMN "url";
  ALTER TABLE "cta" DROP COLUMN "instructor_c_t_a_type";
  ALTER TABLE "cta" DROP COLUMN "instructor_c_t_a_page_id";
  ALTER TABLE "cta" DROP COLUMN "instructor_c_t_a_url";
  ALTER TABLE "cta" DROP COLUMN "student_c_t_a_type";
  ALTER TABLE "cta" DROP COLUMN "student_c_t_a_page_id";
  ALTER TABLE "cta" DROP COLUMN "student_c_t_a_url";
  ALTER TABLE "_cta_v" DROP COLUMN "version_instructor_c_t_a_type";
  ALTER TABLE "_cta_v" DROP COLUMN "version_instructor_c_t_a_page_id";
  ALTER TABLE "_cta_v" DROP COLUMN "version_instructor_c_t_a_url";
  ALTER TABLE "_cta_v" DROP COLUMN "version_student_c_t_a_type";
  ALTER TABLE "_cta_v" DROP COLUMN "version_student_c_t_a_page_id";
  ALTER TABLE "_cta_v" DROP COLUMN "version_student_c_t_a_url";
  DROP TYPE "public"."enum_pages_blocks_top_categories_content_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_top_categories_content_cta_type";
  DROP TYPE "public"."enum_header_explore_menu_view_all_link_type";
  DROP TYPE "public"."enum__header_v_version_explore_menu_view_all_link_type";
  DROP TYPE "public"."enum_cta_instructor_c_t_a_type";
  DROP TYPE "public"."enum_cta_student_c_t_a_type";
  DROP TYPE "public"."enum__cta_v_version_instructor_c_t_a_type";
  DROP TYPE "public"."enum__cta_v_version_student_c_t_a_type";`)
}
