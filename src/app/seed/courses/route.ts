/**
 * Seed API Route
 *
 * POST /seed/courses         — seed courses & lessons
 * POST /seed/courses?force=1 — delete existing seeded data first, then re-seed
 *
 * Usage:
 *   curl -X POST http://localhost:3000/seed/courses
 *   curl -X POST http://localhost:3000/seed/courses?force=1
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

// ── Lexical Helpers ──────────────────────────────────────────────

function lexicalParagraph(text: string) {
  return {
    root: {
      children: [
        {
          children: [
            { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

function lexicalContent(
  blocks: Array<{ type: 'heading' | 'paragraph'; text: string; tag?: string }>,
) {
  return {
    root: {
      children: blocks.map((block) => {
        const textNode = {
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: block.text,
          type: 'text',
          version: 1,
        }
        if (block.type === 'heading') {
          return {
            children: [textNode],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'heading',
            tag: block.tag || 'h2',
            version: 1,
          }
        }
        return {
          children: [textNode],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        }
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

// ── YouTube placeholder embed ────────────────────────────────────

const YOUTUBE_EMBED =
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

// ── IDs from existing DB ─────────────────────────────────────────

const INSTRUCTORS = {
  johnSmith: 3,
  thuVu: 4,
}

const CATEGORIES = {
  webDev: 1,
  dataScience: 2,
  mobileDev: 3,
  ai: 6,
}

const THUMBNAILS = {
  react: 14,
  python: 15,
  flutter: 21,
  ai: 23,
}

// ── Block builders ───────────────────────────────────────────────

function videoBlock(title: string, duration?: number) {
  return {
    blockType: 'lessonVideo',
    videoTitle: title,
    videoType: 'youtube',
    youtubeEmbed: YOUTUBE_EMBED,
    videoDuration: duration || 15,
  }
}

function contentBlock(title: string, paragraphs: string[]) {
  const blocks: Array<{ type: 'heading' | 'paragraph'; text: string; tag?: string }> = [
    { type: 'heading', text: title, tag: 'h2' },
    ...paragraphs.map((p) => ({ type: 'paragraph' as const, text: p })),
  ]
  return {
    blockType: 'lessonContent',
    contentTitle: title,
    content: lexicalContent(blocks),
  }
}

interface QuizQuestion {
  question: string
  questionType: 'multiple-choice' | 'true-false' | 'short-answer'
  xpPoints: number
  options?: Array<{ optionText: string; isCorrect: boolean }>
  correctAnswer?: string
  explanation: string
}

function quizBlock(title: string, description: string, questions: QuizQuestion[]) {
  return {
    blockType: 'lessonQuiz',
    quizTitle: title,
    quizDescription: description,
    passingScore: 70,
    questions: questions.map((q) => ({
      question: lexicalParagraph(q.question),
      questionType: q.questionType,
      xpPoints: q.xpPoints,
      options:
        q.questionType !== 'short-answer'
          ? q.options!.map((o) => ({ optionText: o.optionText, isCorrect: o.isCorrect }))
          : undefined,
      correctAnswer: q.questionType === 'short-answer' ? q.correctAnswer : undefined,
      explanation: lexicalParagraph(q.explanation),
    })),
  }
}

// ══════════════════════════════════════════════════════════════════
// COURSE DATA
// ══════════════════════════════════════════════════════════════════

interface CourseData {
  title: string
  slug: string
  shortDescription: string
  description: ReturnType<typeof lexicalContent>
  instructor: number
  category: number
  level: 'beginner' | 'intermediate' | 'advanced'
  pricingType: 'free' | 'premium'
  price: number
  thumbnail: number
  featured: boolean
  estimatedDuration: number
  learningOutcomes: Array<{ outcome: string }>
  prerequisites: Array<{ prerequisite: string }>
  chapters: Array<{
    chapterTitle: string
    chapterDescription: string
    lessonSlugs: string[]
  }>
}

interface LessonData {
  lessonName: string
  slug: string
  courseSlug: string
  duration: number
  order: number
  description: string
  isPreview: boolean
  curriculum: any[]
}

// ── Course 1: Modern React & Next.js Masterclass ─────────────────

const course1: CourseData = {
  title: 'Modern React & Next.js Masterclass',
  slug: 'modern-react-nextjs-masterclass',
  shortDescription:
    'Master React 19 and Next.js 15 with Server Components, App Router, and production deployment strategies.',
  description: lexicalContent([
    { type: 'heading', text: 'Build Modern Web Applications with React & Next.js', tag: 'h2' },
    {
      type: 'paragraph',
      text: 'This comprehensive course takes you from React fundamentals to building production-ready applications with Next.js 15. You will learn Server Components, the App Router, advanced state management patterns, and deployment best practices.',
    },
    {
      type: 'paragraph',
      text: 'Through hands-on projects and real-world examples, you will gain the confidence to build, test, and deploy modern web applications that scale.',
    },
  ]),
  instructor: INSTRUCTORS.johnSmith,
  category: CATEGORIES.webDev,
  level: 'intermediate',
  pricingType: 'premium',
  price: 49,
  thumbnail: THUMBNAILS.react,
  featured: true,
  estimatedDuration: 12,
  learningOutcomes: [
    { outcome: 'Build full-stack applications with React 19 and Next.js 15' },
    { outcome: 'Understand and implement Server Components and the App Router' },
    { outcome: 'Master advanced state management with React Context and Zustand' },
    { outcome: 'Deploy applications to Vercel with CI/CD pipelines' },
  ],
  prerequisites: [
    { prerequisite: 'Basic knowledge of HTML, CSS, and JavaScript' },
    { prerequisite: 'Familiarity with ES6+ syntax (arrow functions, destructuring, modules)' },
    { prerequisite: 'A code editor and Node.js 18+ installed' },
  ],
  chapters: [
    {
      chapterTitle: 'React Foundations',
      chapterDescription: 'Core React concepts including components, hooks, and rendering',
      lessonSlugs: ['react-fundamentals', 'server-components-and-ssr'],
    },
    {
      chapterTitle: 'Advanced Next.js',
      chapterDescription: 'State management, data fetching, and production deployment',
      lessonSlugs: ['state-management-patterns', 'deployment-and-cicd'],
    },
  ],
}

const course1Lessons: LessonData[] = [
  {
    lessonName: 'React Fundamentals',
    slug: 'react-fundamentals',
    courseSlug: course1.slug,
    duration: 45,
    order: 1,
    description: 'Learn the building blocks of React: JSX, components, props, and hooks.',
    isPreview: true,
    curriculum: [
      videoBlock('Introduction to React 19', 20),
      contentBlock('Understanding JSX and Components', [
        'React uses JSX — a syntax extension that lets you write HTML-like code inside JavaScript. Components are the building blocks of any React application.',
        'A component is a JavaScript function that returns JSX. Components can accept props (properties) to customize their behavior and appearance.',
        'React 19 introduces several improvements including the new compiler, Actions, and enhanced Suspense support for a better developer experience.',
      ]),
      quizBlock('React Basics Quiz', 'Test your understanding of React fundamentals', [
        {
          question: 'What is JSX in React?',
          questionType: 'multiple-choice',
          xpPoints: 10,
          options: [
            { optionText: 'A database query language', isCorrect: false },
            {
              optionText: 'A syntax extension for writing HTML-like code in JavaScript',
              isCorrect: true,
            },
            { optionText: 'A CSS framework', isCorrect: false },
            { optionText: 'A build tool for bundling assets', isCorrect: false },
          ],
          explanation:
            'JSX stands for JavaScript XML. It allows you to write HTML-like syntax directly in your JavaScript code, which React then transforms into regular JavaScript function calls.',
        },
        {
          question: 'React components must always return multiple elements.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: false },
            { optionText: 'False', isCorrect: true },
          ],
          explanation:
            'React components must return a single root element. You can use fragments (<></>) to group multiple elements without adding extra DOM nodes.',
        },
        {
          question: 'What hook is used to manage state in a functional React component?',
          questionType: 'short-answer',
          xpPoints: 15,
          correctAnswer: 'useState',
          explanation:
            'The useState hook allows you to add state variables to functional components. It returns an array with the current state value and a function to update it.',
        },
      ]),
    ],
  },
  {
    lessonName: 'Server Components & SSR',
    slug: 'server-components-and-ssr',
    courseSlug: course1.slug,
    duration: 50,
    order: 2,
    description: 'Understand the difference between Server and Client Components in Next.js 15.',
    isPreview: false,
    curriculum: [
      videoBlock('Server Components Explained', 25),
      contentBlock('Server vs Client Components', [
        'In Next.js 15 with the App Router, all components are Server Components by default. This means they render on the server and send HTML to the client with zero JavaScript.',
        'Client Components are opt-in — you mark them with the "use client" directive when you need interactivity (onClick, useState, useEffect, etc.).',
        'The key benefit of Server Components is performance: they reduce the JavaScript bundle sent to the client, enable direct database access, and keep sensitive logic on the server.',
      ]),
      quizBlock(
        'Server Components Quiz',
        'Verify your understanding of the Server Component model',
        [
          {
            question: 'In Next.js 15 App Router, components are Client Components by default.',
            questionType: 'true-false',
            xpPoints: 10,
            options: [
              { optionText: 'True', isCorrect: false },
              { optionText: 'False', isCorrect: true },
            ],
            explanation:
              'In the App Router, all components are Server Components by default. You must explicitly add "use client" at the top of a file to make it a Client Component.',
          },
          {
            question: 'Which directive marks a component as a Client Component?',
            questionType: 'multiple-choice',
            xpPoints: 15,
            options: [
              { optionText: '"use server"', isCorrect: false },
              { optionText: '"use client"', isCorrect: true },
              { optionText: '"use browser"', isCorrect: false },
              { optionText: '"use interactive"', isCorrect: false },
            ],
            explanation:
              'The "use client" directive at the top of a file tells Next.js to treat all exports from that module as Client Components.',
          },
        ],
      ),
    ],
  },
  {
    lessonName: 'State Management Patterns',
    slug: 'state-management-patterns',
    courseSlug: course1.slug,
    duration: 55,
    order: 3,
    description: 'Explore React Context, Zustand, and server-side state strategies.',
    isPreview: false,
    curriculum: [
      videoBlock('State Management Deep Dive', 30),
      contentBlock('Choosing the Right State Solution', [
        'State management in React has evolved significantly. For local component state, useState and useReducer remain the best choices.',
        'For shared state across components, React Context works well for low-frequency updates like themes and auth. For high-frequency updates, consider Zustand or Jotai for their simplicity and performance.',
        'In Next.js 15, server-side data fetching with async Server Components often eliminates the need for client-side global state entirely.',
      ]),
      quizBlock('State Management Quiz', 'Test your knowledge of state management strategies', [
        {
          question:
            'Which library is known for its minimal boilerplate and hook-based API for global state?',
          questionType: 'multiple-choice',
          xpPoints: 15,
          options: [
            { optionText: 'Redux Toolkit', isCorrect: false },
            { optionText: 'MobX', isCorrect: false },
            { optionText: 'Zustand', isCorrect: true },
            { optionText: 'Angular Services', isCorrect: false },
          ],
          explanation:
            'Zustand is a small, fast, and scalable state management library that uses a hook-based API with minimal boilerplate. No providers or wrappers needed.',
        },
        {
          question:
            'What is the name of the React hook for managing complex state logic with actions?',
          questionType: 'short-answer',
          xpPoints: 10,
          correctAnswer: 'useReducer',
          explanation:
            'useReducer is useful for managing state with complex logic. It accepts a reducer function and initial state, returning the current state and a dispatch function.',
        },
      ]),
    ],
  },
  {
    lessonName: 'Deployment & CI/CD',
    slug: 'deployment-and-cicd',
    courseSlug: course1.slug,
    duration: 40,
    order: 4,
    description:
      'Deploy your Next.js app to Vercel with automated testing and continuous deployment.',
    isPreview: false,
    curriculum: [
      videoBlock('Deploying to Production', 20),
      contentBlock('Production Deployment Checklist', [
        'Before deploying, ensure your application is optimized: enable image optimization, set up proper caching headers, and configure environment variables.',
        'Vercel offers the smoothest deployment experience for Next.js — just connect your Git repository and every push triggers an automatic deployment with preview URLs for pull requests.',
        'Set up GitHub Actions for running tests, linting, and type checking before each deploy to catch issues early.',
      ]),
      quizBlock('Deployment Quiz', 'Ensure you understand deployment best practices', [
        {
          question: 'Vercel automatically creates preview deployments for pull requests.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: true },
            { optionText: 'False', isCorrect: false },
          ],
          explanation:
            'Vercel creates a unique preview URL for every pull request, allowing you to test changes before merging to production.',
        },
        {
          question: 'What does CI/CD stand for?',
          questionType: 'multiple-choice',
          xpPoints: 10,
          options: [
            { optionText: 'Code Integration / Code Delivery', isCorrect: false },
            { optionText: 'Continuous Integration / Continuous Deployment', isCorrect: true },
            { optionText: 'Cloud Infrastructure / Cloud Delivery', isCorrect: false },
            { optionText: 'Central Integration / Central Deployment', isCorrect: false },
          ],
          explanation:
            'CI/CD stands for Continuous Integration and Continuous Deployment — automating the process of testing, building, and deploying code changes.',
        },
      ]),
    ],
  },
]

// ── Course 2: Python for Data Science & ML ───────────────────────

const course2: CourseData = {
  title: 'Python for Data Science & Machine Learning',
  slug: 'python-data-science-ml',
  shortDescription:
    'Learn Python, NumPy, Pandas, and Scikit-Learn to analyze data and build machine learning models from scratch.',
  description: lexicalContent([
    { type: 'heading', text: 'From Python Basics to Machine Learning', tag: 'h2' },
    {
      type: 'paragraph',
      text: 'This course is designed for beginners who want to break into the world of data science. Starting with Python fundamentals, you will progressively build skills in data manipulation with Pandas, numerical computing with NumPy, and machine learning with Scikit-Learn.',
    },
    {
      type: 'paragraph',
      text: 'By the end of this course, you will be able to clean and analyze real-world datasets, visualize data insights, and train predictive machine learning models.',
    },
  ]),
  instructor: INSTRUCTORS.thuVu,
  category: CATEGORIES.dataScience,
  level: 'beginner',
  pricingType: 'premium',
  price: 39,
  thumbnail: THUMBNAILS.python,
  featured: true,
  estimatedDuration: 10,
  learningOutcomes: [
    { outcome: 'Write clean Python code with functions, classes, and modules' },
    { outcome: 'Manipulate and analyze datasets with Pandas and NumPy' },
    { outcome: 'Create data visualizations with Matplotlib and Seaborn' },
    { outcome: 'Build and evaluate ML models using Scikit-Learn' },
  ],
  prerequisites: [
    { prerequisite: 'No programming experience required' },
    { prerequisite: 'Basic math knowledge (algebra, statistics)' },
  ],
  chapters: [
    {
      chapterTitle: 'Python & NumPy Foundations',
      chapterDescription: 'Learn Python syntax and numerical computing with NumPy',
      lessonSlugs: ['python-basics-and-numpy'],
    },
    {
      chapterTitle: 'Data Analysis & Machine Learning',
      chapterDescription: 'Data wrangling with Pandas and intro to ML with Scikit-Learn',
      lessonSlugs: ['pandas-data-wrangling', 'intro-to-ml-scikit-learn'],
    },
  ],
}

const course2Lessons: LessonData[] = [
  {
    lessonName: 'Python Basics & NumPy',
    slug: 'python-basics-and-numpy',
    courseSlug: course2.slug,
    duration: 60,
    order: 1,
    description:
      'Get started with Python syntax, data types, and NumPy arrays for numerical computing.',
    isPreview: true,
    curriculum: [
      videoBlock('Python Setup & First Program', 15),
      contentBlock('Python Data Types & NumPy Arrays', [
        'Python is a versatile programming language known for its readability. Key data types include integers, floats, strings, lists, tuples, and dictionaries.',
        'NumPy is the foundation of scientific computing in Python. It provides the ndarray — a powerful N-dimensional array object that enables fast vectorized operations.',
        'Unlike Python lists, NumPy arrays are homogeneous (same data type), stored in contiguous memory, and support element-wise operations without explicit loops.',
      ]),
      quizBlock('Python & NumPy Quiz', 'Check your understanding of Python basics', [
        {
          question: 'Which of the following is a mutable data type in Python?',
          questionType: 'multiple-choice',
          xpPoints: 10,
          options: [
            { optionText: 'Tuple', isCorrect: false },
            { optionText: 'String', isCorrect: false },
            { optionText: 'List', isCorrect: true },
            { optionText: 'Integer', isCorrect: false },
          ],
          explanation:
            'Lists are mutable in Python, meaning you can change their contents after creation. Tuples, strings, and integers are immutable.',
        },
        {
          question: 'NumPy arrays can contain elements of different data types.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: false },
            { optionText: 'False', isCorrect: true },
          ],
          explanation:
            'NumPy arrays are homogeneous — all elements must be the same data type. This constraint enables efficient memory layout and fast computations.',
        },
        {
          question:
            'What NumPy function creates an array of evenly spaced values between a start and stop?',
          questionType: 'short-answer',
          xpPoints: 15,
          correctAnswer: 'linspace',
          explanation:
            'np.linspace(start, stop, num) returns an array of num evenly spaced values between start and stop (inclusive).',
        },
      ]),
    ],
  },
  {
    lessonName: 'Pandas & Data Wrangling',
    slug: 'pandas-data-wrangling',
    courseSlug: course2.slug,
    duration: 55,
    order: 2,
    description: 'Master data manipulation, cleaning, and aggregation with Pandas DataFrames.',
    isPreview: false,
    curriculum: [
      videoBlock('Pandas DataFrames in Action', 25),
      contentBlock('Working with DataFrames', [
        'Pandas is the go-to library for data manipulation in Python. The DataFrame is its primary data structure — a two-dimensional table with labeled rows and columns.',
        'Key operations include filtering rows (boolean indexing), selecting columns, handling missing data (fillna, dropna), and grouping data for aggregation (groupby).',
        'Pandas also excels at reading data from various sources: CSV files, Excel spreadsheets, SQL databases, and JSON APIs.',
      ]),
      quizBlock('Pandas Quiz', 'Test your Pandas knowledge', [
        {
          question: 'What Pandas method fills missing values with a specified value?',
          questionType: 'multiple-choice',
          xpPoints: 15,
          options: [
            { optionText: 'replace()', isCorrect: false },
            { optionText: 'fillna()', isCorrect: true },
            { optionText: 'impute()', isCorrect: false },
            { optionText: 'fill()', isCorrect: false },
          ],
          explanation:
            'The fillna() method replaces NaN/None values with a specified value, forward-fill, or back-fill strategy.',
        },
        {
          question: 'A Pandas Series is a one-dimensional labeled array.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: true },
            { optionText: 'False', isCorrect: false },
          ],
          explanation:
            'A Series is a one-dimensional array with axis labels (index). A DataFrame is essentially a collection of Series sharing the same index.',
        },
      ]),
    ],
  },
  {
    lessonName: 'Intro to ML with Scikit-Learn',
    slug: 'intro-to-ml-scikit-learn',
    courseSlug: course2.slug,
    duration: 65,
    order: 3,
    description: 'Train your first machine learning models using Scikit-Learn pipelines.',
    isPreview: false,
    curriculum: [
      videoBlock('Your First ML Model', 30),
      contentBlock('Machine Learning Fundamentals', [
        'Machine learning is the science of getting computers to learn from data without being explicitly programmed. Scikit-Learn provides simple and efficient tools for data analysis and modeling.',
        'The ML workflow includes: (1) data preprocessing, (2) splitting into train/test sets, (3) choosing a model, (4) training, (5) evaluation, and (6) prediction.',
        'Common algorithms include Linear Regression for continuous targets, Logistic Regression for classification, Decision Trees for interpretable models, and Random Forests for ensemble learning.',
      ]),
      quizBlock('Machine Learning Quiz', 'Validate your ML fundamentals', [
        {
          question: 'What type of ML problem is predicting house prices?',
          questionType: 'multiple-choice',
          xpPoints: 15,
          options: [
            { optionText: 'Classification', isCorrect: false },
            { optionText: 'Regression', isCorrect: true },
            { optionText: 'Clustering', isCorrect: false },
            { optionText: 'Reinforcement Learning', isCorrect: false },
          ],
          explanation:
            'Predicting a continuous numeric value (like price) is a regression problem. Classification predicts discrete categories.',
        },
        {
          question:
            'Overfitting occurs when a model performs well on training data but poorly on unseen data.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: true },
            { optionText: 'False', isCorrect: false },
          ],
          explanation:
            'Overfitting means the model has memorized the training data (including noise) instead of learning general patterns, leading to poor generalization.',
        },
        {
          question: 'What Scikit-Learn function splits data into training and test sets?',
          questionType: 'short-answer',
          xpPoints: 15,
          correctAnswer: 'train_test_split',
          explanation:
            'sklearn.model_selection.train_test_split() splits arrays into random train and test subsets. A common split ratio is 80/20.',
        },
      ]),
    ],
  },
]

// ── Course 3: Flutter Mobile App Development ─────────────────────

const course3: CourseData = {
  title: 'Flutter Mobile App Development',
  slug: 'flutter-mobile-app-development',
  shortDescription:
    'Build beautiful, cross-platform mobile apps with Flutter and Dart. From widgets to state management with Riverpod.',
  description: lexicalContent([
    { type: 'heading', text: 'Cross-Platform Mobile Development with Flutter', tag: 'h2' },
    {
      type: 'paragraph',
      text: "Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. This course covers everything from Dart language essentials to advanced state management.",
    },
    {
      type: 'paragraph',
      text: 'You will build multiple real-world apps throughout the course, learning widgets, layouts, navigation, HTTP APIs, local storage, and state management with Riverpod.',
    },
  ]),
  instructor: INSTRUCTORS.johnSmith,
  category: CATEGORIES.mobileDev,
  level: 'beginner',
  pricingType: 'free',
  price: 0,
  thumbnail: THUMBNAILS.flutter,
  featured: false,
  estimatedDuration: 8,
  learningOutcomes: [
    { outcome: 'Write Dart programs with classes, generics, and async/await' },
    { outcome: 'Build responsive UIs with Flutter widgets and layouts' },
    { outcome: 'Implement navigation, forms, and API integration' },
    { outcome: 'Manage app state efficiently with Riverpod' },
  ],
  prerequisites: [
    { prerequisite: 'Basic programming knowledge in any language' },
    { prerequisite: 'Flutter SDK and Android Studio/Xcode installed' },
  ],
  chapters: [
    {
      chapterTitle: 'Getting Started with Dart & Flutter',
      chapterDescription: 'Learn the Dart language and Flutter widget system',
      lessonSlugs: ['dart-language-essentials', 'flutter-widgets-and-layouts'],
    },
    {
      chapterTitle: 'State Management',
      chapterDescription: 'Master app state with Riverpod',
      lessonSlugs: ['state-management-with-riverpod'],
    },
  ],
}

const course3Lessons: LessonData[] = [
  {
    lessonName: 'Dart Language Essentials',
    slug: 'dart-language-essentials',
    courseSlug: course3.slug,
    duration: 50,
    order: 1,
    description:
      'Master Dart syntax: variables, functions, classes, null safety, and async programming.',
    isPreview: true,
    curriculum: [
      videoBlock('Dart Language Tour', 20),
      contentBlock('Dart Fundamentals', [
        'Dart is a strongly-typed, object-oriented language developed by Google. It features null safety, meaning you must explicitly handle null values — reducing runtime errors.',
        'Key Dart features include sound null safety, pattern matching (Dart 3), extension methods, mixins for code reuse, and isolates for concurrent programming.',
        'Async programming in Dart uses Future and Stream objects with async/await syntax — essential for network requests and file I/O in Flutter apps.',
      ]),
      quizBlock('Dart Quiz', 'Test your Dart knowledge', [
        {
          question: 'What symbol makes a Dart variable nullable?',
          questionType: 'multiple-choice',
          xpPoints: 10,
          options: [
            { optionText: '!', isCorrect: false },
            { optionText: '?', isCorrect: true },
            { optionText: '*', isCorrect: false },
            { optionText: '~', isCorrect: false },
          ],
          explanation:
            'The ? suffix makes a type nullable. For example, String? can hold a String or null. Without ?, the variable cannot be null.',
        },
        {
          question: 'Dart supports multiple inheritance through classes.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: false },
            { optionText: 'False', isCorrect: true },
          ],
          explanation:
            'Dart does not support multiple class inheritance. Instead, it uses mixins (with keyword) to share behavior across multiple class hierarchies.',
        },
      ]),
    ],
  },
  {
    lessonName: 'Flutter Widgets & Layouts',
    slug: 'flutter-widgets-and-layouts',
    courseSlug: course3.slug,
    duration: 55,
    order: 2,
    description: 'Build responsive UIs using Row, Column, Stack, ListView, and custom widgets.',
    isPreview: false,
    curriculum: [
      videoBlock('Building UIs with Flutter Widgets', 25),
      contentBlock('The Widget Tree', [
        'In Flutter, everything is a widget. Text, buttons, padding, images — all are widgets. The UI is a tree of nested widgets.',
        'Layout widgets like Row, Column, and Stack arrange child widgets horizontally, vertically, or overlapping. Flex widgets like Expanded and Flexible control how space is distributed.',
        'Flutter distinguishes between StatelessWidget (immutable, pure) and StatefulWidget (mutable, can rebuild). Choosing the right type impacts performance and code clarity.',
      ]),
      quizBlock('Flutter Widgets Quiz', 'Check your widget knowledge', [
        {
          question: 'Which widget arranges children horizontally?',
          questionType: 'multiple-choice',
          xpPoints: 10,
          options: [
            { optionText: 'Column', isCorrect: false },
            { optionText: 'Row', isCorrect: true },
            { optionText: 'Stack', isCorrect: false },
            { optionText: 'ListView', isCorrect: false },
          ],
          explanation:
            'Row arranges children horizontally (left to right). Column arranges children vertically (top to bottom).',
        },
        {
          question: 'What is the Flutter method called that rebuilds the widget UI?',
          questionType: 'short-answer',
          xpPoints: 15,
          correctAnswer: 'build',
          explanation:
            'The build() method returns the widget tree that describes the UI. It is called whenever the widget needs to re-render (e.g., after setState).',
        },
      ]),
    ],
  },
  {
    lessonName: 'State Management with Riverpod',
    slug: 'state-management-with-riverpod',
    courseSlug: course3.slug,
    duration: 60,
    order: 3,
    description:
      'Implement clean state management using Riverpod providers, notifiers, and consumers.',
    isPreview: false,
    curriculum: [
      videoBlock('Riverpod State Management', 30),
      contentBlock('Why Riverpod?', [
        'Riverpod is a reactive state management solution for Flutter that fixes several limitations of Provider. It is compile-safe, testable, and does not require BuildContext.',
        'Key concepts: Provider (read-only state), StateProvider (simple mutable state), NotifierProvider (complex state logic), and AsyncNotifierProvider (async operations).',
        'Riverpod generates code with riverpod_generator, enabling type-safe dependency injection and automatic disposal of resources.',
      ]),
      quizBlock('Riverpod Quiz', 'Test your Riverpod understanding', [
        {
          question: 'Riverpod requires BuildContext to read providers.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: false },
            { optionText: 'False', isCorrect: true },
          ],
          explanation:
            'Unlike Provider, Riverpod does not require BuildContext to access state. You can read providers anywhere using a Ref object.',
        },
        {
          question: 'Which Riverpod widget replaces ConsumerWidget when you need to use hooks?',
          questionType: 'multiple-choice',
          xpPoints: 15,
          options: [
            { optionText: 'StatefulConsumerWidget', isCorrect: false },
            { optionText: 'HookConsumerWidget', isCorrect: true },
            { optionText: 'HookWidget', isCorrect: false },
            { optionText: 'ConsumerHookWidget', isCorrect: false },
          ],
          explanation:
            'HookConsumerWidget combines flutter_hooks with Riverpod, giving you access to both hooks (useState, useEffect) and providers (ref.watch).',
        },
        {
          question: 'What annotation is used with riverpod_generator to create a provider?',
          questionType: 'short-answer',
          xpPoints: 15,
          correctAnswer: '@riverpod',
          explanation:
            'The @riverpod annotation on a function or class generates the corresponding provider automatically. Run build_runner to generate the code.',
        },
      ]),
    ],
  },
]

// ── Course 4: Generative AI & LLM Engineering ───────────────────

const course4: CourseData = {
  title: 'Generative AI & LLM Engineering',
  slug: 'generative-ai-llm-engineering',
  shortDescription:
    'Master transformer architecture, prompt engineering, RAG systems, and fine-tuning large language models for production.',
  description: lexicalContent([
    { type: 'heading', text: 'Build Production AI Systems with LLMs', tag: 'h2' },
    {
      type: 'paragraph',
      text: 'Large Language Models are transforming software development. This advanced course covers the theory and practice of working with LLMs — from understanding transformer architecture to building production RAG systems and fine-tuning models for specific domains.',
    },
    {
      type: 'paragraph',
      text: 'You will work with OpenAI, Anthropic, and open-source models, learning to build intelligent applications that leverage embeddings, vector databases, and retrieval-augmented generation.',
    },
  ]),
  instructor: INSTRUCTORS.thuVu,
  category: CATEGORIES.ai,
  level: 'advanced',
  pricingType: 'premium',
  price: 79,
  thumbnail: THUMBNAILS.ai,
  featured: true,
  estimatedDuration: 15,
  learningOutcomes: [
    { outcome: 'Understand transformer architecture and self-attention mechanisms' },
    { outcome: 'Craft effective prompts and build prompt engineering pipelines' },
    { outcome: 'Build RAG systems with vector databases and embedding models' },
    { outcome: 'Fine-tune LLMs using LoRA and QLoRA techniques' },
  ],
  prerequisites: [
    { prerequisite: 'Intermediate Python programming skills' },
    { prerequisite: 'Basic understanding of machine learning concepts' },
    { prerequisite: 'Familiarity with APIs and JSON data format' },
  ],
  chapters: [
    {
      chapterTitle: 'Foundations',
      chapterDescription: 'Transformer architecture and prompt engineering fundamentals',
      lessonSlugs: ['transformer-architecture', 'prompt-engineering'],
    },
    {
      chapterTitle: 'Advanced LLM Systems',
      chapterDescription: 'RAG pipelines and model fine-tuning',
      lessonSlugs: ['rag-and-vector-databases', 'fine-tuning-llms'],
    },
  ],
}

const course4Lessons: LessonData[] = [
  {
    lessonName: 'Transformer Architecture',
    slug: 'transformer-architecture',
    courseSlug: course4.slug,
    duration: 60,
    order: 1,
    description:
      'Understand self-attention, positional encoding, and the architecture behind GPT and Claude.',
    isPreview: true,
    curriculum: [
      videoBlock('The Transformer Paper Explained', 30),
      contentBlock('Self-Attention & Positional Encoding', [
        'The Transformer architecture, introduced in the "Attention Is All You Need" paper (2017), replaced recurrent networks with self-attention mechanisms — enabling parallel processing and better long-range dependencies.',
        'Self-attention computes three matrices from the input: Query (Q), Key (K), and Value (V). The attention score is calculated as softmax(QK^T / sqrt(d_k)) * V, allowing each token to "attend" to every other token.',
        'Since transformers process all tokens simultaneously (no inherent order), positional encoding is added to give the model information about token positions. Modern models use Rotary Position Embeddings (RoPE) for better generalization.',
      ]),
      quizBlock('Transformer Quiz', 'Test your understanding of transformers', [
        {
          question: 'What year was the "Attention Is All You Need" paper published?',
          questionType: 'multiple-choice',
          xpPoints: 10,
          options: [
            { optionText: '2015', isCorrect: false },
            { optionText: '2017', isCorrect: true },
            { optionText: '2019', isCorrect: false },
            { optionText: '2020', isCorrect: false },
          ],
          explanation:
            'The foundational Transformer paper was published by Vaswani et al. at Google in 2017, revolutionizing NLP and later all of AI.',
        },
        {
          question: 'In self-attention, what three matrices are computed from the input?',
          questionType: 'short-answer',
          xpPoints: 20,
          correctAnswer: 'Query, Key, Value',
          explanation:
            'Self-attention computes Query (Q), Key (K), and Value (V) matrices. The attention weights are formed by the dot product of Q and K, applied to V.',
        },
        {
          question: 'Transformers process tokens sequentially like RNNs.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: false },
            { optionText: 'False', isCorrect: true },
          ],
          explanation:
            'Unlike RNNs, Transformers process all tokens in parallel using self-attention, making them much faster to train on modern hardware.',
        },
      ]),
    ],
  },
  {
    lessonName: 'Prompt Engineering',
    slug: 'prompt-engineering',
    courseSlug: course4.slug,
    duration: 45,
    order: 2,
    description:
      'Master the art of crafting effective prompts: few-shot, chain-of-thought, and system prompts.',
    isPreview: false,
    curriculum: [
      videoBlock('Prompt Engineering Masterclass', 25),
      contentBlock('Prompt Techniques', [
        'Prompt engineering is the practice of designing inputs to LLMs to get desired outputs. Good prompts are clear, specific, and provide context.',
        'Key techniques: Zero-shot (just ask), Few-shot (provide examples), Chain-of-Thought (ask the model to reason step by step), and ReAct (Reasoning + Acting for tool use).',
        'System prompts set the behavior and persona of the model. They are processed before user messages and establish rules, tone, and expertise areas for the conversation.',
      ]),
      quizBlock('Prompt Engineering Quiz', 'Validate your prompting skills', [
        {
          question: 'Which prompting technique provides example input-output pairs?',
          questionType: 'multiple-choice',
          xpPoints: 15,
          options: [
            { optionText: 'Zero-shot', isCorrect: false },
            { optionText: 'Few-shot', isCorrect: true },
            { optionText: 'Chain-of-thought', isCorrect: false },
            { optionText: 'Self-consistency', isCorrect: false },
          ],
          explanation:
            'Few-shot prompting includes several examples of the desired input-output format, helping the model understand the expected pattern.',
        },
        {
          question:
            'Chain-of-thought prompting asks the model to explain its reasoning step by step.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: true },
            { optionText: 'False', isCorrect: false },
          ],
          explanation:
            'Chain-of-thought (CoT) prompting encourages the model to break down complex problems into intermediate steps, improving accuracy on reasoning tasks.',
        },
      ]),
    ],
  },
  {
    lessonName: 'RAG & Vector Databases',
    slug: 'rag-and-vector-databases',
    courseSlug: course4.slug,
    duration: 55,
    order: 3,
    description:
      'Build retrieval-augmented generation systems with embeddings, Pinecone, and Chroma.',
    isPreview: false,
    curriculum: [
      videoBlock('Building a RAG Pipeline', 30),
      contentBlock('Retrieval-Augmented Generation', [
        'RAG (Retrieval-Augmented Generation) combines the power of LLMs with external knowledge bases. Instead of relying solely on training data, RAG retrieves relevant documents at query time.',
        'The RAG pipeline: (1) Convert documents into embeddings using models like OpenAI text-embedding-3-small, (2) Store embeddings in a vector database (Pinecone, Chroma, Weaviate), (3) At query time, embed the user question, find similar documents via cosine similarity, (4) Pass retrieved context + question to the LLM.',
        'Key metrics for RAG systems: retrieval precision (are the retrieved docs relevant?), answer faithfulness (is the answer grounded in the retrieved context?), and latency (how fast is the end-to-end pipeline?).',
      ]),
      quizBlock('RAG Quiz', 'Test your RAG knowledge', [
        {
          question:
            'What mathematical operation is commonly used to measure similarity between embeddings?',
          questionType: 'multiple-choice',
          xpPoints: 15,
          options: [
            { optionText: 'Euclidean distance', isCorrect: false },
            { optionText: 'Cosine similarity', isCorrect: true },
            { optionText: 'Manhattan distance', isCorrect: false },
            { optionText: 'Hamming distance', isCorrect: false },
          ],
          explanation:
            'Cosine similarity measures the angle between two vectors, making it scale-invariant — ideal for comparing semantic meaning of text embeddings.',
        },
        {
          question: 'RAG eliminates the need for an LLM entirely.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: false },
            { optionText: 'False', isCorrect: true },
          ],
          explanation:
            'RAG augments an LLM with retrieved context — the LLM is still needed to generate the final answer. RAG reduces hallucinations by grounding responses in real data.',
        },
      ]),
    ],
  },
  {
    lessonName: 'Fine-Tuning LLMs',
    slug: 'fine-tuning-llms',
    courseSlug: course4.slug,
    duration: 70,
    order: 4,
    description: 'Fine-tune open-source LLMs using LoRA and QLoRA for domain-specific tasks.',
    isPreview: false,
    curriculum: [
      videoBlock('Fine-Tuning with LoRA', 35),
      contentBlock('Parameter-Efficient Fine-Tuning', [
        'Fine-tuning adapts a pre-trained model to specific tasks or domains. Full fine-tuning updates all model parameters, requiring significant compute and memory.',
        'LoRA (Low-Rank Adaptation) freezes the pre-trained model weights and adds small trainable rank decomposition matrices to each layer — typically training only 0.1% of the total parameters.',
        'QLoRA combines LoRA with 4-bit quantization, enabling fine-tuning of 65B+ parameter models on a single GPU. The process: quantize the base model to 4-bit, add LoRA adapters, train only the adapters.',
      ]),
      quizBlock('Fine-Tuning Quiz', 'Validate your fine-tuning knowledge', [
        {
          question: 'What percentage of parameters does LoRA typically train?',
          questionType: 'multiple-choice',
          xpPoints: 15,
          options: [
            { optionText: '100%', isCorrect: false },
            { optionText: '50%', isCorrect: false },
            { optionText: '10%', isCorrect: false },
            { optionText: '< 1%', isCorrect: true },
          ],
          explanation:
            'LoRA typically trains less than 1% (often around 0.1%) of the total parameters by adding small trainable matrices while keeping the base model frozen.',
        },
        {
          question: 'QLoRA combines LoRA with 4-bit quantization.',
          questionType: 'true-false',
          xpPoints: 10,
          options: [
            { optionText: 'True', isCorrect: true },
            { optionText: 'False', isCorrect: false },
          ],
          explanation:
            'QLoRA (Quantized LoRA) quantizes the base model to 4-bit precision and applies LoRA adapters, dramatically reducing memory requirements for fine-tuning.',
        },
        {
          question:
            'What is the name of the technique that adapts pre-trained models using low-rank matrices?',
          questionType: 'short-answer',
          xpPoints: 20,
          correctAnswer: 'LoRA',
          explanation:
            'LoRA (Low-Rank Adaptation) inserts trainable low-rank decomposition matrices into transformer layers, enabling efficient fine-tuning without modifying the original weights.',
        },
      ]),
    ],
  },
]

// ══════════════════════════════════════════════════════════════════
// SEED RUNNER
// ══════════════════════════════════════════════════════════════════

const allCourses = [course1, course2, course3, course4]
const allLessons = [course1Lessons, course2Lessons, course3Lessons, course4Lessons]

async function seed(force: boolean) {
  const payload = await getPayload({ config })
  const logs: string[] = []
  const log = (msg: string) => {
    console.log(msg)
    logs.push(msg)
  }

  log('Starting seed...')

  // ── Check for existing data ──
  const existing = await payload.find({
    collection: 'courses',
    where: { slug: { in: allCourses.map((c) => c.slug) } },
    limit: 1,
    depth: 0,
  })

  if (existing.totalDocs > 0 && !force) {
    log('Seed data already exists. Use ?force=1 to re-seed.')
    return { success: false, message: 'Data already exists', logs }
  }

  if (existing.totalDocs > 0 && force) {
    log('Force mode: deleting existing seed data...')

    // Delete lessons first (they reference courses)
    for (const course of allCourses) {
      const courseLessons = allLessons[allCourses.indexOf(course)]
      for (const lesson of courseLessons) {
        const found = await payload.find({
          collection: 'lessons',
          where: { lessonName: { equals: lesson.lessonName } },
          limit: 1,
          depth: 0,
        })
        for (const doc of found.docs) {
          await payload.delete({ collection: 'lessons', id: doc.id })
          log(`  Deleted lesson: ${doc.lessonName}`)
        }
      }
    }

    // Delete courses
    for (const course of allCourses) {
      const found = await payload.find({
        collection: 'courses',
        where: { slug: { equals: course.slug } },
        limit: 1,
        depth: 0,
      })
      for (const doc of found.docs) {
        await payload.delete({ collection: 'courses', id: doc.id })
        log(`  Deleted course: ${doc.title}`)
      }
    }
  }

  // ── Step 1: Create courses (without chapter lessons) ──
  log('\nCreating courses...')
  const courseIdMap: Record<string, number> = {}

  for (const course of allCourses) {
    const created = await payload.create({
      collection: 'courses',
      draft: true,
      data: {
        title: course.title,
        slug: course.slug,
        shortDescription: course.shortDescription,
        description: course.description as any,
        instructor: course.instructor,
        // categories: [course.category],
        category: course.category,
        level: course.level,
        pricingType: course.pricingType,
        price: course.price,
        thumbnail: course.thumbnail,
        featured: course.featured,
        estimatedDuration: course.estimatedDuration,
        learningOutcomes: course.learningOutcomes,
        prerequisites: course.prerequisites,
        chapters: course.chapters.map((ch) => ({
          chapterTitle: ch.chapterTitle,
          chapterDescription: ch.chapterDescription,
          lessons: [],
        })),
      },
    })
    courseIdMap[course.slug] = created.id
    log(`  Created: ${course.title} (id: ${created.id})`)
  }

  // ── Step 2: Create lessons ──
  log('\nCreating lessons...')
  const lessonIdMap: Record<string, number> = {}

  for (let ci = 0; ci < allCourses.length; ci++) {
    const course = allCourses[ci]
    const lessons = allLessons[ci]
    const courseId = courseIdMap[course.slug]

    for (const lesson of lessons) {
      const created = await payload.create({
        collection: 'lessons',
        draft: true,
        data: {
          lessonName: lesson.lessonName,
          course: courseId,
          duration: lesson.duration,
          order: lesson.order,
          description: lesson.description,
          isPreview: lesson.isPreview,
          curriculum: lesson.curriculum as any,
        },
      })
      lessonIdMap[lesson.slug] = created.id
      log(`  Created: ${lesson.lessonName} (id: ${created.id}, course: ${course.title})`)
    }
  }

  // ── Step 3: Update courses with chapter lessons ──
  log('\nLinking lessons to chapters...')

  for (const course of allCourses) {
    const courseId = courseIdMap[course.slug]
    const chaptersWithLessons = course.chapters.map((ch) => ({
      chapterTitle: ch.chapterTitle,
      chapterDescription: ch.chapterDescription,
      lessons: ch.lessonSlugs.map((slug) => lessonIdMap[slug]),
    }))

    await payload.update({
      collection: 'courses',
      id: courseId,
      draft: true,
      data: {
        chapters: chaptersWithLessons,
      },
    })
    log(`  Linked: ${course.title} — ${chaptersWithLessons.length} chapters`)
  }

  // ── Step 4: Publish all lessons ──
  log('\nPublishing lessons...')
  for (const [slug, id] of Object.entries(lessonIdMap)) {
    await payload.update({
      collection: 'lessons',
      id,
      draft: false,
      data: { _status: 'published' },
    })
  }
  log(`  Published ${Object.keys(lessonIdMap).length} lessons`)

  // ── Step 5: Publish all courses ──
  log('\nPublishing courses...')
  for (const [slug, id] of Object.entries(courseIdMap)) {
    await payload.update({
      collection: 'courses',
      id,
      draft: false,
      data: { _status: 'published' },
    })
  }
  log(`  Published ${Object.keys(courseIdMap).length} courses`)

  // ── Summary ──
  const totalQuestions = allLessons.flat().reduce((sum, l) => {
    return (
      sum +
      l.curriculum
        .filter((b: any) => b.blockType === 'lessonQuiz')
        .reduce((s: number, q: any) => s + (q.questions?.length || 0), 0)
    )
  }, 0)

  const summary = {
    courses: Object.keys(courseIdMap).length,
    lessons: Object.keys(lessonIdMap).length,
    totalQuestions,
    courseIds: courseIdMap,
    lessonIds: lessonIdMap,
  }

  log(
    `\nSeed complete! ${summary.courses} courses, ${summary.lessons} lessons, ${summary.totalQuestions} quiz questions`,
  )

  return { success: true, summary, logs }
}

export async function POST(req: NextRequest) {
  try {
    const force = req.nextUrl.searchParams.get('force') === '1'
    const result = await seed(force)
    return NextResponse.json(result, { status: result.success ? 200 : 409 })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Seed endpoint. Use POST to seed, POST ?force=1 to re-seed.',
    courses: allCourses.map((c) => c.title),
    totalLessons: allLessons.flat().length,
  })
}
