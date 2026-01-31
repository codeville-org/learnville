import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'instructor', 'user');
  CREATE TYPE "public"."enum_users_instructor_profile_qualifications_type" AS ENUM('degree', 'certification', 'diploma', 'course');
  CREATE TYPE "public"."enum_customers_tier" AS ENUM('Free', 'Basic', 'Pro', 'Enterprise');
  CREATE TYPE "public"."enum_lessons_blocks_lesson_materials_materials_file_type" AS ENUM('pdf', 'doc', 'sheet', 'code', 'archive', 'other');
  CREATE TYPE "public"."enum_lessons_blocks_lesson_quiz_questions_question_type" AS ENUM('multiple-choice', 'true-false', 'short-answer');
  CREATE TYPE "public"."enum_lessons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lessons_v_blocks_lesson_materials_materials_file_type" AS ENUM('pdf', 'doc', 'sheet', 'code', 'archive', 'other');
  CREATE TYPE "public"."enum__lessons_v_blocks_lesson_quiz_questions_question_type" AS ENUM('multiple-choice', 'true-false', 'short-answer');
  CREATE TYPE "public"."enum__lessons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_courses_level" AS ENUM('beginner', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum_courses_pricing_type" AS ENUM('free', 'premium');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_version_level" AS ENUM('beginner', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum__courses_v_version_pricing_type" AS ENUM('free', 'premium');
  CREATE TYPE "public"."enum__courses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_course_enrollments_status" AS ENUM('active', 'completed', 'paused', 'dropped');
  CREATE TYPE "public"."enum_pages_blocks_hero_statistics_stats_icon" AS ENUM('none', 'book', 'users', 'award', 'star', 'graduation', 'target');
  CREATE TYPE "public"."enum_pages_blocks_hero_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_hero_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_top_categories_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_top_categories_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_about_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_about_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_about_layout" AS ENUM('image-left', 'image-right');
  CREATE TYPE "public"."enum_pages_blocks_featured_courses_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_featured_courses_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_type" AS ENUM('buttons', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_featured_blogs_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_featured_blogs_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_site_stats_block_variant" AS ENUM('secondary', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_tab_layout_block_tabs_layout" AS ENUM('imageLeft', 'imageRight');
  CREATE TYPE "public"."enum_pages_blocks_tab_layout_block_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum_pages_blocks_form_block_layout" AS ENUM('fullWidth', 'constrained', 'twoColumn');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_statistics_stats_icon" AS ENUM('none', 'book', 'users', 'award', 'star', 'graduation', 'target');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_top_categories_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_top_categories_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_about_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_about_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_about_layout" AS ENUM('image-left', 'image-right');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_courses_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_courses_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_type" AS ENUM('buttons', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_blogs_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_blogs_content_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_site_stats_block_variant" AS ENUM('secondary', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_tab_layout_block_tabs_layout" AS ENUM('imageLeft', 'imageRight');
  CREATE TYPE "public"."enum__pages_v_blocks_tab_layout_block_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_layout" AS ENUM('fullWidth', 'constrained', 'twoColumn');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_blocks_phone_field_width" AS ENUM('100', '75', '66', '50', '33', '25');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_redirect_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_navigation_links_type" AS ENUM('page', 'external', 'custom');
  CREATE TYPE "public"."enum_header_top_banner_background_color" AS ENUM('teal', 'blue', 'purple', 'red', 'orange');
  CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_version_navigation_links_type" AS ENUM('page', 'external', 'custom');
  CREATE TYPE "public"."enum__header_v_version_top_banner_background_color" AS ENUM('teal', 'blue', 'purple', 'red', 'orange');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_socials_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'github');
  CREATE TYPE "public"."enum_footer_link_columns_links_type" AS ENUM('internal', 'external', 'category');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_socials_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'github');
  CREATE TYPE "public"."enum__footer_v_version_link_columns_links_type" AS ENUM('internal', 'external', 'category');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_cta_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum_cta_instructor_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_cta_student_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_cta_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cta_v_version_content_highlight_color" AS ENUM('orange', 'emerald', 'teal', 'purple', 'blue');
  CREATE TYPE "public"."enum__cta_v_version_instructor_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cta_v_version_student_c_t_a_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__cta_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_instructor_profile_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"institution" varchar,
  	"year" numeric,
  	"type" "enum_users_instructor_profile_qualifications_type" DEFAULT 'degree',
  	"verification_url" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"instructor_profile_display_name" varchar,
  	"instructor_profile_tagline" varchar,
  	"instructor_profile_bio" varchar,
  	"instructor_profile_years_experience" numeric,
  	"instructor_profile_social_links_website" varchar,
  	"instructor_profile_social_links_linkedin" varchar,
  	"instructor_profile_social_links_twitter" varchar,
  	"instructor_profile_social_links_github" varchar,
  	"instructor_profile_social_links_youtube" varchar,
  	"instructor_profile_is_public_profile" boolean DEFAULT true,
  	"instructor_stats_total_courses" numeric DEFAULT 0,
  	"instructor_stats_total_students" numeric DEFAULT 0,
  	"instructor_stats_average_rating" numeric DEFAULT 0,
  	"instructor_stats_total_reviews" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "customers_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "customers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"tier" "enum_customers_tier",
  	"total_x_p" numeric DEFAULT 0,
  	"level" numeric DEFAULT 1,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "customers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"course_enrollments_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lessons_blocks_lesson_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_title" varchar,
  	"video_u_r_l" varchar,
  	"video_duration" numeric,
  	"thumbnail_id" integer,
  	"transcript" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "lessons_blocks_lesson_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_title" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "lessons_blocks_lesson_materials_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"material_name" varchar,
  	"file_id" integer,
  	"file_type" "enum_lessons_blocks_lesson_materials_materials_file_type",
  	"description" varchar
  );
  
  CREATE TABLE "lessons_blocks_lesson_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"materials_title" varchar DEFAULT 'Downloadable Resources',
  	"block_name" varchar
  );
  
  CREATE TABLE "lessons_blocks_lesson_quiz_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option_text" varchar,
  	"is_correct" boolean DEFAULT false
  );
  
  CREATE TABLE "lessons_blocks_lesson_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" jsonb,
  	"question_type" "enum_lessons_blocks_lesson_quiz_questions_question_type" DEFAULT 'multiple-choice',
  	"xp_points" numeric DEFAULT 10,
  	"correct_answer" varchar,
  	"explanation" jsonb
  );
  
  CREATE TABLE "lessons_blocks_lesson_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quiz_title" varchar DEFAULT 'Knowledge Check',
  	"quiz_description" varchar,
  	"passing_score" numeric DEFAULT 70,
  	"block_name" varchar
  );
  
  CREATE TABLE "lessons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"course_id" integer,
  	"instructor_id" integer,
  	"lesson_name" varchar,
  	"duration" numeric,
  	"order" numeric DEFAULT 1,
  	"description" varchar,
  	"is_preview" boolean DEFAULT false,
  	"total_lesson_x_p" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_lessons_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_lessons_v_blocks_lesson_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_title" varchar,
  	"video_u_r_l" varchar,
  	"video_duration" numeric,
  	"thumbnail_id" integer,
  	"transcript" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lessons_v_blocks_lesson_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_title" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lessons_v_blocks_lesson_materials_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"material_name" varchar,
  	"file_id" integer,
  	"file_type" "enum__lessons_v_blocks_lesson_materials_materials_file_type",
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lessons_v_blocks_lesson_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"materials_title" varchar DEFAULT 'Downloadable Resources',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lessons_v_blocks_lesson_quiz_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"option_text" varchar,
  	"is_correct" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lessons_v_blocks_lesson_quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" jsonb,
  	"question_type" "enum__lessons_v_blocks_lesson_quiz_questions_question_type" DEFAULT 'multiple-choice',
  	"xp_points" numeric DEFAULT 10,
  	"correct_answer" varchar,
  	"explanation" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lessons_v_blocks_lesson_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quiz_title" varchar DEFAULT 'Knowledge Check',
  	"quiz_description" varchar,
  	"passing_score" numeric DEFAULT 70,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lessons_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_course_id" integer,
  	"version_instructor_id" integer,
  	"version_lesson_name" varchar,
  	"version_duration" numeric,
  	"version_order" numeric DEFAULT 1,
  	"version_description" varchar,
  	"version_is_preview" boolean DEFAULT false,
  	"version_total_lesson_x_p" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__lessons_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "courses_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chapter_title" varchar,
  	"chapter_description" varchar
  );
  
  CREATE TABLE "courses_learning_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"outcome" varchar
  );
  
  CREATE TABLE "courses_prerequisites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prerequisite" varchar
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"short_description" varchar,
  	"thumbnail_id" integer,
  	"description" jsonb,
  	"instructor_id" integer,
  	"category_id" integer,
  	"level" "enum_courses_level",
  	"pricing_type" "enum_courses_pricing_type" DEFAULT 'premium',
  	"price" numeric DEFAULT 0,
  	"featured" boolean DEFAULT false,
  	"total_x_p" numeric DEFAULT 0,
  	"overall_rating" numeric DEFAULT 0,
  	"estimated_duration" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_courses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "courses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"lessons_id" integer
  );
  
  CREATE TABLE "_courses_v_version_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"chapter_title" varchar,
  	"chapter_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_learning_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"outcome" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_prerequisites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prerequisite" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_thumbnail_id" integer,
  	"version_description" jsonb,
  	"version_instructor_id" integer,
  	"version_category_id" integer,
  	"version_level" "enum__courses_v_version_level",
  	"version_pricing_type" "enum__courses_v_version_pricing_type" DEFAULT 'premium',
  	"version_price" numeric DEFAULT 0,
  	"version_featured" boolean DEFAULT false,
  	"version_total_x_p" numeric DEFAULT 0,
  	"version_overall_rating" numeric DEFAULT 0,
  	"version_estimated_duration" numeric,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_courses_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"lessons_id" integer
  );
  
  CREATE TABLE "course_enrollments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_id" integer NOT NULL,
  	"course_id" integer NOT NULL,
  	"enrolled_at" timestamp(3) with time zone NOT NULL,
  	"status" "enum_course_enrollments_status" DEFAULT 'active' NOT NULL,
  	"progress" numeric DEFAULT 0,
  	"total_x_p_earned" numeric DEFAULT 0,
  	"last_accessed_at" timestamp(3) with time zone,
  	"completed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_enrollments_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"lessons_id" integer
  );
  
  CREATE TABLE "quiz_attempts_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question_index" numeric NOT NULL,
  	"answer" jsonb NOT NULL,
  	"is_correct" boolean DEFAULT false,
  	"xp_awarded" numeric DEFAULT 0
  );
  
  CREATE TABLE "quiz_attempts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_id" integer NOT NULL,
  	"enrollment_id" integer NOT NULL,
  	"lesson_id" integer NOT NULL,
  	"quiz_block_id" varchar NOT NULL,
  	"score" numeric NOT NULL,
  	"xp_earned" numeric DEFAULT 0 NOT NULL,
  	"passed" boolean DEFAULT false,
  	"attempted_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_id" integer NOT NULL,
  	"course_id" integer NOT NULL,
  	"enrollment_id" integer NOT NULL,
  	"rating" numeric NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"is_verified_purchase" boolean DEFAULT true,
  	"is_approved" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_statistics_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"icon" "enum_pages_blocks_hero_statistics_stats_icon" DEFAULT 'none',
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar,
  	"content_heading" varchar,
  	"content_highlighted_text" varchar,
  	"content_highlight_color" "enum_pages_blocks_hero_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar,
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'Explore Courses',
  	"content_cta_link_type" "enum_pages_blocks_hero_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"image_media_id" integer,
  	"statistics_enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_top_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar DEFAULT 'Popular Categories,',
  	"content_heading" varchar DEFAULT 'Explore Our Most-Loved',
  	"content_highlighted_text" varchar DEFAULT 'Learning Paths.',
  	"content_highlight_color" "enum_pages_blocks_top_categories_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar,
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'View All Categories',
  	"content_cta_link_type" "enum_pages_blocks_top_categories_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_section_image_id" integer,
  	"content_pre_heading" varchar DEFAULT 'About Learnville',
  	"content_heading" varchar DEFAULT 'One Platform. Infinite',
  	"content_highlighted_text" varchar DEFAULT 'Learning Possibilities',
  	"content_highlight_color" "enum_pages_blocks_about_content_highlight_color" DEFAULT 'emerald',
  	"content_description" varchar DEFAULT 'At Learnville, we believe quality education should be accessible, engaging, and empowering-for everyone, everywhere.',
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'Learn More About Us',
  	"content_cta_link_type" "enum_pages_blocks_about_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"layout" "enum_pages_blocks_about_layout" DEFAULT 'image-left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar DEFAULT 'Featured Courses',
  	"content_heading" varchar DEFAULT 'Start Your Journey',
  	"content_highlight_color" "enum_pages_blocks_featured_courses_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar,
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'View All Courses',
  	"content_cta_link_type" "enum_pages_blocks_featured_courses_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_cta_block_type",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar DEFAULT 'Our Blog',
  	"content_heading" varchar DEFAULT 'Insights & Ideas From',
  	"content_highlighted_text" varchar DEFAULT 'The Land of Learning.',
  	"content_highlight_color" "enum_pages_blocks_featured_blogs_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar DEFAULT 'See what are the latest updates in your interested areas and explore more learning stuff beyond the courses & examinations',
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'Explore Blogs',
  	"content_cta_link_type" "enum_pages_blocks_featured_blogs_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_site_stats_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_site_stats_block_variant" DEFAULT 'secondary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tab_layout_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"layout" "enum_pages_blocks_tab_layout_block_tabs_layout" DEFAULT 'imageLeft'
  );
  
  CREATE TABLE "pages_blocks_tab_layout_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pre_heading" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"highlight_color" "enum_pages_blocks_tab_layout_block_highlight_color" DEFAULT 'orange',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_pages_blocks_form_block_layout" DEFAULT 'constrained',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"is_homepage" boolean DEFAULT false,
  	"slug" varchar,
  	"description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"courses_id" integer,
  	"blog_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_statistics_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"icon" "enum__pages_v_blocks_hero_statistics_stats_icon" DEFAULT 'none',
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar,
  	"content_heading" varchar,
  	"content_highlighted_text" varchar,
  	"content_highlight_color" "enum__pages_v_blocks_hero_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar,
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'Explore Courses',
  	"content_cta_link_type" "enum__pages_v_blocks_hero_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"image_media_id" integer,
  	"statistics_enabled" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_top_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar DEFAULT 'Popular Categories,',
  	"content_heading" varchar DEFAULT 'Explore Our Most-Loved',
  	"content_highlighted_text" varchar DEFAULT 'Learning Paths.',
  	"content_highlight_color" "enum__pages_v_blocks_top_categories_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar,
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'View All Categories',
  	"content_cta_link_type" "enum__pages_v_blocks_top_categories_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_section_image_id" integer,
  	"content_pre_heading" varchar DEFAULT 'About Learnville',
  	"content_heading" varchar DEFAULT 'One Platform. Infinite',
  	"content_highlighted_text" varchar DEFAULT 'Learning Possibilities',
  	"content_highlight_color" "enum__pages_v_blocks_about_content_highlight_color" DEFAULT 'emerald',
  	"content_description" varchar DEFAULT 'At Learnville, we believe quality education should be accessible, engaging, and empowering-for everyone, everywhere.',
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'Learn More About Us',
  	"content_cta_link_type" "enum__pages_v_blocks_about_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"layout" "enum__pages_v_blocks_about_layout" DEFAULT 'image-left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar DEFAULT 'Featured Courses',
  	"content_heading" varchar DEFAULT 'Start Your Journey',
  	"content_highlight_color" "enum__pages_v_blocks_featured_courses_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar,
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'View All Courses',
  	"content_cta_link_type" "enum__pages_v_blocks_featured_courses_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_cta_block_type",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar DEFAULT 'Our Blog',
  	"content_heading" varchar DEFAULT 'Insights & Ideas From',
  	"content_highlighted_text" varchar DEFAULT 'The Land of Learning.',
  	"content_highlight_color" "enum__pages_v_blocks_featured_blogs_content_highlight_color" DEFAULT 'orange',
  	"content_description" varchar DEFAULT 'See what are the latest updates in your interested areas and explore more learning stuff beyond the courses & examinations',
  	"content_cta_enabled" boolean DEFAULT true,
  	"content_cta_label" varchar DEFAULT 'Explore Blogs',
  	"content_cta_link_type" "enum__pages_v_blocks_featured_blogs_content_cta_link_type" DEFAULT 'internal',
  	"content_cta_internal_link_id" integer,
  	"content_cta_external_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_site_stats_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_site_stats_block_variant" DEFAULT 'secondary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tab_layout_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"layout" "enum__pages_v_blocks_tab_layout_block_tabs_layout" DEFAULT 'imageLeft',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tab_layout_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pre_heading" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"highlight_color" "enum__pages_v_blocks_tab_layout_block_highlight_color" DEFAULT 'orange',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum__pages_v_blocks_form_block_layout" DEFAULT 'constrained',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_is_homepage" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"courses_id" integer,
  	"blog_id" integer
  );
  
  CREATE TABLE "blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"content" jsonb,
  	"author_id" integer,
  	"category_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"read_time" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blog_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_id" integer
  );
  
  CREATE TABLE "_blog_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_content" jsonb,
  	"version_author_id" integer,
  	"version_category_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_read_time" numeric,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_is_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_blog_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_phone" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"default_value" varchar,
  	"field_width" "enum_forms_blocks_phone_field_width",
  	"required" boolean,
  	"hidden" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_type" "enum_forms_redirect_type" DEFAULT 'reference',
  	"redirect_url" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"description" varchar,
  	"require_re_captcha" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"customers_id" integer,
  	"categories_id" integer,
  	"lessons_id" integer,
  	"courses_id" integer,
  	"course_enrollments_id" integer,
  	"quiz_attempts_id" integer,
  	"reviews_id" integer,
  	"pages_id" integer,
  	"blog_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"customers_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_header_navigation_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_image_id" integer,
  	"logo_alt" varchar DEFAULT 'Learnville Logo',
  	"top_banner_enabled" boolean DEFAULT true,
  	"top_banner_background_color" "enum_header_top_banner_background_color" DEFAULT 'teal',
  	"top_banner_message" jsonb,
  	"top_banner_closeable" boolean DEFAULT true,
  	"search_placeholder" varchar DEFAULT 'Search for anything',
  	"search_enabled" boolean DEFAULT true,
  	"explore_menu_enabled" boolean DEFAULT true,
  	"explore_menu_label" varchar DEFAULT 'Explore',
  	"explore_menu_view_all_link_enabled" boolean DEFAULT true,
  	"explore_menu_view_all_link_label" varchar DEFAULT 'View All Categories',
  	"explore_menu_view_all_link_page_id" integer,
  	"cta_buttons_login_button_label" varchar DEFAULT 'Log in',
  	"cta_buttons_login_button_url" varchar DEFAULT '/signin',
  	"cta_buttons_signup_button_label" varchar DEFAULT 'Sign up',
  	"cta_buttons_signup_button_url" varchar DEFAULT '/signup',
  	"cta_buttons_my_account_button_label" varchar DEFAULT 'My Account',
  	"cta_buttons_my_account_button_url" varchar DEFAULT '/portal',
  	"mobile_menu_enabled" boolean DEFAULT true,
  	"_status" "enum_header_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_header_v_version_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__header_v_version_navigation_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_image_id" integer,
  	"version_logo_alt" varchar DEFAULT 'Learnville Logo',
  	"version_top_banner_enabled" boolean DEFAULT true,
  	"version_top_banner_background_color" "enum__header_v_version_top_banner_background_color" DEFAULT 'teal',
  	"version_top_banner_message" jsonb,
  	"version_top_banner_closeable" boolean DEFAULT true,
  	"version_search_placeholder" varchar DEFAULT 'Search for anything',
  	"version_search_enabled" boolean DEFAULT true,
  	"version_explore_menu_enabled" boolean DEFAULT true,
  	"version_explore_menu_label" varchar DEFAULT 'Explore',
  	"version_explore_menu_view_all_link_enabled" boolean DEFAULT true,
  	"version_explore_menu_view_all_link_label" varchar DEFAULT 'View All Categories',
  	"version_explore_menu_view_all_link_page_id" integer,
  	"version_cta_buttons_login_button_label" varchar DEFAULT 'Log in',
  	"version_cta_buttons_login_button_url" varchar DEFAULT '/signin',
  	"version_cta_buttons_signup_button_label" varchar DEFAULT 'Sign up',
  	"version_cta_buttons_signup_button_url" varchar DEFAULT '/signup',
  	"version_cta_buttons_my_account_button_label" varchar DEFAULT 'My Account',
  	"version_cta_buttons_my_account_button_url" varchar DEFAULT '/portal',
  	"version_mobile_menu_enabled" boolean DEFAULT true,
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_header_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_socials_platform",
  	"url" varchar
  );
  
  CREATE TABLE "footer_link_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_footer_link_columns_links_type" DEFAULT 'internal',
  	"internal_link_id" integer,
  	"category_link_id" integer,
  	"external_link" varchar
  );
  
  CREATE TABLE "footer_link_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"tagline" varchar,
  	"newsletter_title" varchar DEFAULT 'Subscribe Our Newsletter',
  	"newsletter_description" varchar DEFAULT 'Get the latest courses, tips & stories delivered to your inbox.',
  	"newsletter_placeholder" varchar DEFAULT 'Enter your email address',
  	"newsletter_button_text" varchar DEFAULT 'Subscribe',
  	"contact_info_title" varchar DEFAULT 'Get in Touch',
  	"contact_info_email" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_address" varchar,
  	"copyright_text" varchar DEFAULT 'All rights reserved.',
  	"copyright_designer" varchar DEFAULT 'Developed by CodeVille',
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_footer_v_version_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__footer_v_version_socials_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_link_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__footer_v_version_link_columns_links_type" DEFAULT 'internal',
  	"internal_link_id" integer,
  	"category_link_id" integer,
  	"external_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_link_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version_tagline" varchar,
  	"version_newsletter_title" varchar DEFAULT 'Subscribe Our Newsletter',
  	"version_newsletter_description" varchar DEFAULT 'Get the latest courses, tips & stories delivered to your inbox.',
  	"version_newsletter_placeholder" varchar DEFAULT 'Enter your email address',
  	"version_newsletter_button_text" varchar DEFAULT 'Subscribe',
  	"version_contact_info_title" varchar DEFAULT 'Get in Touch',
  	"version_contact_info_email" varchar,
  	"version_contact_info_phone" varchar,
  	"version_contact_info_address" varchar,
  	"version_copyright_text" varchar DEFAULT 'All rights reserved.',
  	"version_copyright_designer" varchar DEFAULT 'Developed by CodeVille',
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "cta_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_pre_heading" varchar DEFAULT 'Join Thousands of Learners',
  	"content_heading" varchar DEFAULT 'Unlock Your Potential with, One',
  	"content_highlighted_text" varchar DEFAULT 'Powerful Platform.',
  	"content_highlight_color" "enum_cta_content_highlight_color" DEFAULT 'teal',
  	"content_description" varchar,
  	"instructor_c_t_a_image_id" integer,
  	"instructor_c_t_a_title" varchar DEFAULT 'Become an Instructor',
  	"instructor_c_t_a_description" varchar DEFAULT 'Join our community of expert instructors and share your knowledge with learners worldwide. Empower others while growing your personal brand and earning income.',
  	"instructor_c_t_a_button_label" varchar DEFAULT 'Start Teaching Today',
  	"instructor_c_t_a_link_type" "enum_cta_instructor_c_t_a_link_type" DEFAULT 'internal',
  	"instructor_c_t_a_internal_link_id" integer,
  	"instructor_c_t_a_external_link" varchar,
  	"student_c_t_a_image_id" integer,
  	"student_c_t_a_title" varchar DEFAULT 'Join as a Student',
  	"student_c_t_a_description" varchar DEFAULT 'Join our community of learners and gain access to a wide range of courses designed to help you achieve your goals.',
  	"student_c_t_a_button_label" varchar DEFAULT 'Browse Courses',
  	"student_c_t_a_link_type" "enum_cta_student_c_t_a_link_type" DEFAULT 'internal',
  	"student_c_t_a_internal_link_id" integer,
  	"student_c_t_a_external_link" varchar,
  	"_status" "enum_cta_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_cta_v_version_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cta_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content_pre_heading" varchar DEFAULT 'Join Thousands of Learners',
  	"version_content_heading" varchar DEFAULT 'Unlock Your Potential with, One',
  	"version_content_highlighted_text" varchar DEFAULT 'Powerful Platform.',
  	"version_content_highlight_color" "enum__cta_v_version_content_highlight_color" DEFAULT 'teal',
  	"version_content_description" varchar,
  	"version_instructor_c_t_a_image_id" integer,
  	"version_instructor_c_t_a_title" varchar DEFAULT 'Become an Instructor',
  	"version_instructor_c_t_a_description" varchar DEFAULT 'Join our community of expert instructors and share your knowledge with learners worldwide. Empower others while growing your personal brand and earning income.',
  	"version_instructor_c_t_a_button_label" varchar DEFAULT 'Start Teaching Today',
  	"version_instructor_c_t_a_link_type" "enum__cta_v_version_instructor_c_t_a_link_type" DEFAULT 'internal',
  	"version_instructor_c_t_a_internal_link_id" integer,
  	"version_instructor_c_t_a_external_link" varchar,
  	"version_student_c_t_a_image_id" integer,
  	"version_student_c_t_a_title" varchar DEFAULT 'Join as a Student',
  	"version_student_c_t_a_description" varchar DEFAULT 'Join our community of learners and gain access to a wide range of courses designed to help you achieve your goals.',
  	"version_student_c_t_a_button_label" varchar DEFAULT 'Browse Courses',
  	"version_student_c_t_a_link_type" "enum__cta_v_version_student_c_t_a_link_type" DEFAULT 'internal',
  	"version_student_c_t_a_internal_link_id" integer,
  	"version_student_c_t_a_external_link" varchar,
  	"version__status" "enum__cta_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "site_stats_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "site_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stats_active_learners" varchar DEFAULT '60K',
  	"stats_expert_instructors" varchar DEFAULT '500+',
  	"stats_courses_available" varchar DEFAULT '1,200+',
  	"stats_certificates_issued" varchar DEFAULT '30K',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_instructor_profile_qualifications" ADD CONSTRAINT "users_instructor_profile_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "customers_sessions" ADD CONSTRAINT "customers_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "customers_rels" ADD CONSTRAINT "customers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "customers_rels" ADD CONSTRAINT "customers_rels_course_enrollments_fk" FOREIGN KEY ("course_enrollments_id") REFERENCES "public"."course_enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_video" ADD CONSTRAINT "lessons_blocks_lesson_video_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_video" ADD CONSTRAINT "lessons_blocks_lesson_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_content" ADD CONSTRAINT "lessons_blocks_lesson_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_materials_materials" ADD CONSTRAINT "lessons_blocks_lesson_materials_materials_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_materials_materials" ADD CONSTRAINT "lessons_blocks_lesson_materials_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons_blocks_lesson_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_materials" ADD CONSTRAINT "lessons_blocks_lesson_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_quiz_questions_options" ADD CONSTRAINT "lessons_blocks_lesson_quiz_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons_blocks_lesson_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_quiz_questions" ADD CONSTRAINT "lessons_blocks_lesson_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons_blocks_lesson_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_blocks_lesson_quiz" ADD CONSTRAINT "lessons_blocks_lesson_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_instructor_id_users_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_video" ADD CONSTRAINT "_lessons_v_blocks_lesson_video_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_video" ADD CONSTRAINT "_lessons_v_blocks_lesson_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lessons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_content" ADD CONSTRAINT "_lessons_v_blocks_lesson_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lessons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_materials_materials" ADD CONSTRAINT "_lessons_v_blocks_lesson_materials_materials_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_materials_materials" ADD CONSTRAINT "_lessons_v_blocks_lesson_materials_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lessons_v_blocks_lesson_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_materials" ADD CONSTRAINT "_lessons_v_blocks_lesson_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lessons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_quiz_questions_options" ADD CONSTRAINT "_lessons_v_blocks_lesson_quiz_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lessons_v_blocks_lesson_quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_quiz_questions" ADD CONSTRAINT "_lessons_v_blocks_lesson_quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lessons_v_blocks_lesson_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_quiz" ADD CONSTRAINT "_lessons_v_blocks_lesson_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lessons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lessons_v" ADD CONSTRAINT "_lessons_v_parent_id_lessons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lessons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lessons_v" ADD CONSTRAINT "_lessons_v_version_course_id_courses_id_fk" FOREIGN KEY ("version_course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lessons_v" ADD CONSTRAINT "_lessons_v_version_instructor_id_users_id_fk" FOREIGN KEY ("version_instructor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_chapters" ADD CONSTRAINT "courses_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_learning_outcomes" ADD CONSTRAINT "courses_learning_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_prerequisites" ADD CONSTRAINT "courses_prerequisites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_users_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_chapters" ADD CONSTRAINT "_courses_v_version_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_learning_outcomes" ADD CONSTRAINT "_courses_v_version_learning_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_prerequisites" ADD CONSTRAINT "_courses_v_version_prerequisites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_parent_id_courses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_instructor_id_users_id_fk" FOREIGN KEY ("version_instructor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_enrollments_rels" ADD CONSTRAINT "course_enrollments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."course_enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course_enrollments_rels" ADD CONSTRAINT "course_enrollments_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quiz_attempts_answers" ADD CONSTRAINT "quiz_attempts_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_enrollment_id_course_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."course_enrollments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_enrollment_id_course_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."course_enrollments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_statistics_stats" ADD CONSTRAINT "pages_blocks_hero_statistics_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_categories" ADD CONSTRAINT "pages_blocks_top_categories_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_categories" ADD CONSTRAINT "pages_blocks_top_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_content_section_image_id_media_id_fk" FOREIGN KEY ("content_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_courses" ADD CONSTRAINT "pages_blocks_featured_courses_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_courses" ADD CONSTRAINT "pages_blocks_featured_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_blogs" ADD CONSTRAINT "pages_blocks_featured_blogs_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_blogs" ADD CONSTRAINT "pages_blocks_featured_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_site_stats_block" ADD CONSTRAINT "pages_blocks_site_stats_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_content" ADD CONSTRAINT "pages_blocks_rich_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tab_layout_block_tabs" ADD CONSTRAINT "pages_blocks_tab_layout_block_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tab_layout_block_tabs" ADD CONSTRAINT "pages_blocks_tab_layout_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tab_layout_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tab_layout_block" ADD CONSTRAINT "pages_blocks_tab_layout_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_statistics_stats" ADD CONSTRAINT "_pages_v_blocks_hero_statistics_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_categories" ADD CONSTRAINT "_pages_v_blocks_top_categories_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_categories" ADD CONSTRAINT "_pages_v_blocks_top_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_content_section_image_id_media_id_fk" FOREIGN KEY ("content_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_courses" ADD CONSTRAINT "_pages_v_blocks_featured_courses_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_courses" ADD CONSTRAINT "_pages_v_blocks_featured_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_blogs" ADD CONSTRAINT "_pages_v_blocks_featured_blogs_content_cta_internal_link_id_pages_id_fk" FOREIGN KEY ("content_cta_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_blogs" ADD CONSTRAINT "_pages_v_blocks_featured_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_site_stats_block" ADD CONSTRAINT "_pages_v_blocks_site_stats_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_content" ADD CONSTRAINT "_pages_v_blocks_rich_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tab_layout_block_tabs" ADD CONSTRAINT "_pages_v_blocks_tab_layout_block_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tab_layout_block_tabs" ADD CONSTRAINT "_pages_v_blocks_tab_layout_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tab_layout_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tab_layout_block" ADD CONSTRAINT "_pages_v_blocks_tab_layout_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_version_tags" ADD CONSTRAINT "_blog_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_parent_id_blog_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_phone" ADD CONSTRAINT "forms_blocks_phone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_course_enrollments_fk" FOREIGN KEY ("course_enrollments_id") REFERENCES "public"."course_enrollments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quiz_attempts_fk" FOREIGN KEY ("quiz_attempts_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_links" ADD CONSTRAINT "header_navigation_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_links" ADD CONSTRAINT "header_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_explore_menu_view_all_link_page_id_pages_id_fk" FOREIGN KEY ("explore_menu_view_all_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_navigation_links" ADD CONSTRAINT "_header_v_version_navigation_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_version_navigation_links" ADD CONSTRAINT "_header_v_version_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_logo_image_id_media_id_fk" FOREIGN KEY ("version_logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_explore_menu_view_all_link_page_id_pages_id_fk" FOREIGN KEY ("version_explore_menu_view_all_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_socials" ADD CONSTRAINT "footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_category_link_id_categories_id_fk" FOREIGN KEY ("category_link_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns" ADD CONSTRAINT "footer_link_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_socials" ADD CONSTRAINT "_footer_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD CONSTRAINT "_footer_v_version_link_columns_links_internal_link_id_pages_id_fk" FOREIGN KEY ("internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD CONSTRAINT "_footer_v_version_link_columns_links_category_link_id_categories_id_fk" FOREIGN KEY ("category_link_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD CONSTRAINT "_footer_v_version_link_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_link_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_link_columns" ADD CONSTRAINT "_footer_v_version_link_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta_info" ADD CONSTRAINT "cta_info_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta_info" ADD CONSTRAINT "cta_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_instructor_c_t_a_image_id_media_id_fk" FOREIGN KEY ("instructor_c_t_a_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_instructor_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("instructor_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_student_c_t_a_image_id_media_id_fk" FOREIGN KEY ("student_c_t_a_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta" ADD CONSTRAINT "cta_student_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("student_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v_version_info" ADD CONSTRAINT "_cta_v_version_info_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v_version_info" ADD CONSTRAINT "_cta_v_version_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_instructor_c_t_a_image_id_media_id_fk" FOREIGN KEY ("version_instructor_c_t_a_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_instructor_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("version_instructor_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_student_c_t_a_image_id_media_id_fk" FOREIGN KEY ("version_student_c_t_a_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_cta_v" ADD CONSTRAINT "_cta_v_version_student_c_t_a_internal_link_id_pages_id_fk" FOREIGN KEY ("version_student_c_t_a_internal_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_stats_features" ADD CONSTRAINT "site_stats_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_stats"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_instructor_profile_qualifications_order_idx" ON "users_instructor_profile_qualifications" USING btree ("_order");
  CREATE INDEX "users_instructor_profile_qualifications_parent_id_idx" ON "users_instructor_profile_qualifications" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_categories_id_idx" ON "users_rels" USING btree ("categories_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "customers_sessions_order_idx" ON "customers_sessions" USING btree ("_order");
  CREATE INDEX "customers_sessions_parent_id_idx" ON "customers_sessions" USING btree ("_parent_id");
  CREATE INDEX "customers_updated_at_idx" ON "customers" USING btree ("updated_at");
  CREATE INDEX "customers_created_at_idx" ON "customers" USING btree ("created_at");
  CREATE UNIQUE INDEX "customers_email_idx" ON "customers" USING btree ("email");
  CREATE INDEX "customers_rels_order_idx" ON "customers_rels" USING btree ("order");
  CREATE INDEX "customers_rels_parent_idx" ON "customers_rels" USING btree ("parent_id");
  CREATE INDEX "customers_rels_path_idx" ON "customers_rels" USING btree ("path");
  CREATE INDEX "customers_rels_course_enrollments_id_idx" ON "customers_rels" USING btree ("course_enrollments_id");
  CREATE UNIQUE INDEX "categories_name_idx" ON "categories" USING btree ("name");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_icon_idx" ON "categories" USING btree ("icon_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "lessons_blocks_lesson_video_order_idx" ON "lessons_blocks_lesson_video" USING btree ("_order");
  CREATE INDEX "lessons_blocks_lesson_video_parent_id_idx" ON "lessons_blocks_lesson_video" USING btree ("_parent_id");
  CREATE INDEX "lessons_blocks_lesson_video_path_idx" ON "lessons_blocks_lesson_video" USING btree ("_path");
  CREATE INDEX "lessons_blocks_lesson_video_thumbnail_idx" ON "lessons_blocks_lesson_video" USING btree ("thumbnail_id");
  CREATE INDEX "lessons_blocks_lesson_content_order_idx" ON "lessons_blocks_lesson_content" USING btree ("_order");
  CREATE INDEX "lessons_blocks_lesson_content_parent_id_idx" ON "lessons_blocks_lesson_content" USING btree ("_parent_id");
  CREATE INDEX "lessons_blocks_lesson_content_path_idx" ON "lessons_blocks_lesson_content" USING btree ("_path");
  CREATE INDEX "lessons_blocks_lesson_materials_materials_order_idx" ON "lessons_blocks_lesson_materials_materials" USING btree ("_order");
  CREATE INDEX "lessons_blocks_lesson_materials_materials_parent_id_idx" ON "lessons_blocks_lesson_materials_materials" USING btree ("_parent_id");
  CREATE INDEX "lessons_blocks_lesson_materials_materials_file_idx" ON "lessons_blocks_lesson_materials_materials" USING btree ("file_id");
  CREATE INDEX "lessons_blocks_lesson_materials_order_idx" ON "lessons_blocks_lesson_materials" USING btree ("_order");
  CREATE INDEX "lessons_blocks_lesson_materials_parent_id_idx" ON "lessons_blocks_lesson_materials" USING btree ("_parent_id");
  CREATE INDEX "lessons_blocks_lesson_materials_path_idx" ON "lessons_blocks_lesson_materials" USING btree ("_path");
  CREATE INDEX "lessons_blocks_lesson_quiz_questions_options_order_idx" ON "lessons_blocks_lesson_quiz_questions_options" USING btree ("_order");
  CREATE INDEX "lessons_blocks_lesson_quiz_questions_options_parent_id_idx" ON "lessons_blocks_lesson_quiz_questions_options" USING btree ("_parent_id");
  CREATE INDEX "lessons_blocks_lesson_quiz_questions_order_idx" ON "lessons_blocks_lesson_quiz_questions" USING btree ("_order");
  CREATE INDEX "lessons_blocks_lesson_quiz_questions_parent_id_idx" ON "lessons_blocks_lesson_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "lessons_blocks_lesson_quiz_order_idx" ON "lessons_blocks_lesson_quiz" USING btree ("_order");
  CREATE INDEX "lessons_blocks_lesson_quiz_parent_id_idx" ON "lessons_blocks_lesson_quiz" USING btree ("_parent_id");
  CREATE INDEX "lessons_blocks_lesson_quiz_path_idx" ON "lessons_blocks_lesson_quiz" USING btree ("_path");
  CREATE INDEX "lessons_course_idx" ON "lessons" USING btree ("course_id");
  CREATE INDEX "lessons_instructor_idx" ON "lessons" USING btree ("instructor_id");
  CREATE INDEX "lessons_updated_at_idx" ON "lessons" USING btree ("updated_at");
  CREATE INDEX "lessons_created_at_idx" ON "lessons" USING btree ("created_at");
  CREATE INDEX "lessons__status_idx" ON "lessons" USING btree ("_status");
  CREATE INDEX "_lessons_v_blocks_lesson_video_order_idx" ON "_lessons_v_blocks_lesson_video" USING btree ("_order");
  CREATE INDEX "_lessons_v_blocks_lesson_video_parent_id_idx" ON "_lessons_v_blocks_lesson_video" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_blocks_lesson_video_path_idx" ON "_lessons_v_blocks_lesson_video" USING btree ("_path");
  CREATE INDEX "_lessons_v_blocks_lesson_video_thumbnail_idx" ON "_lessons_v_blocks_lesson_video" USING btree ("thumbnail_id");
  CREATE INDEX "_lessons_v_blocks_lesson_content_order_idx" ON "_lessons_v_blocks_lesson_content" USING btree ("_order");
  CREATE INDEX "_lessons_v_blocks_lesson_content_parent_id_idx" ON "_lessons_v_blocks_lesson_content" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_blocks_lesson_content_path_idx" ON "_lessons_v_blocks_lesson_content" USING btree ("_path");
  CREATE INDEX "_lessons_v_blocks_lesson_materials_materials_order_idx" ON "_lessons_v_blocks_lesson_materials_materials" USING btree ("_order");
  CREATE INDEX "_lessons_v_blocks_lesson_materials_materials_parent_id_idx" ON "_lessons_v_blocks_lesson_materials_materials" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_blocks_lesson_materials_materials_file_idx" ON "_lessons_v_blocks_lesson_materials_materials" USING btree ("file_id");
  CREATE INDEX "_lessons_v_blocks_lesson_materials_order_idx" ON "_lessons_v_blocks_lesson_materials" USING btree ("_order");
  CREATE INDEX "_lessons_v_blocks_lesson_materials_parent_id_idx" ON "_lessons_v_blocks_lesson_materials" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_blocks_lesson_materials_path_idx" ON "_lessons_v_blocks_lesson_materials" USING btree ("_path");
  CREATE INDEX "_lessons_v_blocks_lesson_quiz_questions_options_order_idx" ON "_lessons_v_blocks_lesson_quiz_questions_options" USING btree ("_order");
  CREATE INDEX "_lessons_v_blocks_lesson_quiz_questions_options_parent_id_idx" ON "_lessons_v_blocks_lesson_quiz_questions_options" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_blocks_lesson_quiz_questions_order_idx" ON "_lessons_v_blocks_lesson_quiz_questions" USING btree ("_order");
  CREATE INDEX "_lessons_v_blocks_lesson_quiz_questions_parent_id_idx" ON "_lessons_v_blocks_lesson_quiz_questions" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_blocks_lesson_quiz_order_idx" ON "_lessons_v_blocks_lesson_quiz" USING btree ("_order");
  CREATE INDEX "_lessons_v_blocks_lesson_quiz_parent_id_idx" ON "_lessons_v_blocks_lesson_quiz" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_blocks_lesson_quiz_path_idx" ON "_lessons_v_blocks_lesson_quiz" USING btree ("_path");
  CREATE INDEX "_lessons_v_parent_idx" ON "_lessons_v" USING btree ("parent_id");
  CREATE INDEX "_lessons_v_version_version_course_idx" ON "_lessons_v" USING btree ("version_course_id");
  CREATE INDEX "_lessons_v_version_version_instructor_idx" ON "_lessons_v" USING btree ("version_instructor_id");
  CREATE INDEX "_lessons_v_version_version_updated_at_idx" ON "_lessons_v" USING btree ("version_updated_at");
  CREATE INDEX "_lessons_v_version_version_created_at_idx" ON "_lessons_v" USING btree ("version_created_at");
  CREATE INDEX "_lessons_v_version_version__status_idx" ON "_lessons_v" USING btree ("version__status");
  CREATE INDEX "_lessons_v_created_at_idx" ON "_lessons_v" USING btree ("created_at");
  CREATE INDEX "_lessons_v_updated_at_idx" ON "_lessons_v" USING btree ("updated_at");
  CREATE INDEX "_lessons_v_latest_idx" ON "_lessons_v" USING btree ("latest");
  CREATE INDEX "courses_chapters_order_idx" ON "courses_chapters" USING btree ("_order");
  CREATE INDEX "courses_chapters_parent_id_idx" ON "courses_chapters" USING btree ("_parent_id");
  CREATE INDEX "courses_learning_outcomes_order_idx" ON "courses_learning_outcomes" USING btree ("_order");
  CREATE INDEX "courses_learning_outcomes_parent_id_idx" ON "courses_learning_outcomes" USING btree ("_parent_id");
  CREATE INDEX "courses_prerequisites_order_idx" ON "courses_prerequisites" USING btree ("_order");
  CREATE INDEX "courses_prerequisites_parent_id_idx" ON "courses_prerequisites" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_thumbnail_idx" ON "courses" USING btree ("thumbnail_id");
  CREATE INDEX "courses_instructor_idx" ON "courses" USING btree ("instructor_id");
  CREATE INDEX "courses_category_idx" ON "courses" USING btree ("category_id");
  CREATE INDEX "courses_meta_meta_image_idx" ON "courses" USING btree ("meta_image_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses__status_idx" ON "courses" USING btree ("_status");
  CREATE INDEX "courses_rels_order_idx" ON "courses_rels" USING btree ("order");
  CREATE INDEX "courses_rels_parent_idx" ON "courses_rels" USING btree ("parent_id");
  CREATE INDEX "courses_rels_path_idx" ON "courses_rels" USING btree ("path");
  CREATE INDEX "courses_rels_lessons_id_idx" ON "courses_rels" USING btree ("lessons_id");
  CREATE INDEX "_courses_v_version_chapters_order_idx" ON "_courses_v_version_chapters" USING btree ("_order");
  CREATE INDEX "_courses_v_version_chapters_parent_id_idx" ON "_courses_v_version_chapters" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_learning_outcomes_order_idx" ON "_courses_v_version_learning_outcomes" USING btree ("_order");
  CREATE INDEX "_courses_v_version_learning_outcomes_parent_id_idx" ON "_courses_v_version_learning_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_prerequisites_order_idx" ON "_courses_v_version_prerequisites" USING btree ("_order");
  CREATE INDEX "_courses_v_version_prerequisites_parent_id_idx" ON "_courses_v_version_prerequisites" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_parent_idx" ON "_courses_v" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_version_slug_idx" ON "_courses_v" USING btree ("version_slug");
  CREATE INDEX "_courses_v_version_version_thumbnail_idx" ON "_courses_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_courses_v_version_version_instructor_idx" ON "_courses_v" USING btree ("version_instructor_id");
  CREATE INDEX "_courses_v_version_version_category_idx" ON "_courses_v" USING btree ("version_category_id");
  CREATE INDEX "_courses_v_version_meta_version_meta_image_idx" ON "_courses_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_courses_v_version_version_updated_at_idx" ON "_courses_v" USING btree ("version_updated_at");
  CREATE INDEX "_courses_v_version_version_created_at_idx" ON "_courses_v" USING btree ("version_created_at");
  CREATE INDEX "_courses_v_version_version__status_idx" ON "_courses_v" USING btree ("version__status");
  CREATE INDEX "_courses_v_created_at_idx" ON "_courses_v" USING btree ("created_at");
  CREATE INDEX "_courses_v_updated_at_idx" ON "_courses_v" USING btree ("updated_at");
  CREATE INDEX "_courses_v_latest_idx" ON "_courses_v" USING btree ("latest");
  CREATE INDEX "_courses_v_rels_order_idx" ON "_courses_v_rels" USING btree ("order");
  CREATE INDEX "_courses_v_rels_parent_idx" ON "_courses_v_rels" USING btree ("parent_id");
  CREATE INDEX "_courses_v_rels_path_idx" ON "_courses_v_rels" USING btree ("path");
  CREATE INDEX "_courses_v_rels_lessons_id_idx" ON "_courses_v_rels" USING btree ("lessons_id");
  CREATE INDEX "course_enrollments_customer_idx" ON "course_enrollments" USING btree ("customer_id");
  CREATE INDEX "course_enrollments_course_idx" ON "course_enrollments" USING btree ("course_id");
  CREATE INDEX "course_enrollments_updated_at_idx" ON "course_enrollments" USING btree ("updated_at");
  CREATE INDEX "course_enrollments_created_at_idx" ON "course_enrollments" USING btree ("created_at");
  CREATE INDEX "course_enrollments_rels_order_idx" ON "course_enrollments_rels" USING btree ("order");
  CREATE INDEX "course_enrollments_rels_parent_idx" ON "course_enrollments_rels" USING btree ("parent_id");
  CREATE INDEX "course_enrollments_rels_path_idx" ON "course_enrollments_rels" USING btree ("path");
  CREATE INDEX "course_enrollments_rels_lessons_id_idx" ON "course_enrollments_rels" USING btree ("lessons_id");
  CREATE INDEX "quiz_attempts_answers_order_idx" ON "quiz_attempts_answers" USING btree ("_order");
  CREATE INDEX "quiz_attempts_answers_parent_id_idx" ON "quiz_attempts_answers" USING btree ("_parent_id");
  CREATE INDEX "quiz_attempts_customer_idx" ON "quiz_attempts" USING btree ("customer_id");
  CREATE INDEX "quiz_attempts_enrollment_idx" ON "quiz_attempts" USING btree ("enrollment_id");
  CREATE INDEX "quiz_attempts_lesson_idx" ON "quiz_attempts" USING btree ("lesson_id");
  CREATE INDEX "quiz_attempts_updated_at_idx" ON "quiz_attempts" USING btree ("updated_at");
  CREATE INDEX "quiz_attempts_created_at_idx" ON "quiz_attempts" USING btree ("created_at");
  CREATE INDEX "reviews_customer_idx" ON "reviews" USING btree ("customer_id");
  CREATE INDEX "reviews_course_idx" ON "reviews" USING btree ("course_id");
  CREATE INDEX "reviews_enrollment_idx" ON "reviews" USING btree ("enrollment_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "pages_blocks_hero_statistics_stats_order_idx" ON "pages_blocks_hero_statistics_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_statistics_stats_parent_id_idx" ON "pages_blocks_hero_statistics_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_content_cta_content_cta_internal_link_idx" ON "pages_blocks_hero" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "pages_blocks_hero_image_image_media_idx" ON "pages_blocks_hero" USING btree ("image_media_id");
  CREATE INDEX "pages_blocks_top_categories_order_idx" ON "pages_blocks_top_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_top_categories_parent_id_idx" ON "pages_blocks_top_categories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_top_categories_path_idx" ON "pages_blocks_top_categories" USING btree ("_path");
  CREATE INDEX "pages_blocks_top_categories_content_cta_content_cta_inte_idx" ON "pages_blocks_top_categories" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_content_content_section_image_idx" ON "pages_blocks_about" USING btree ("content_section_image_id");
  CREATE INDEX "pages_blocks_about_content_cta_content_cta_internal_link_idx" ON "pages_blocks_about" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "pages_blocks_featured_courses_order_idx" ON "pages_blocks_featured_courses" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_courses_parent_id_idx" ON "pages_blocks_featured_courses" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_courses_path_idx" ON "pages_blocks_featured_courses" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_courses_content_cta_content_cta_in_idx" ON "pages_blocks_featured_courses" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "pages_blocks_cta_block_order_idx" ON "pages_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_parent_id_idx" ON "pages_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_block_path_idx" ON "pages_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_blogs_order_idx" ON "pages_blocks_featured_blogs" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_blogs_parent_id_idx" ON "pages_blocks_featured_blogs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_blogs_path_idx" ON "pages_blocks_featured_blogs" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_blogs_content_cta_content_cta_inte_idx" ON "pages_blocks_featured_blogs" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "pages_blocks_site_stats_block_order_idx" ON "pages_blocks_site_stats_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_site_stats_block_parent_id_idx" ON "pages_blocks_site_stats_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_site_stats_block_path_idx" ON "pages_blocks_site_stats_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_content_order_idx" ON "pages_blocks_rich_text_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_content_parent_id_idx" ON "pages_blocks_rich_text_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_content_path_idx" ON "pages_blocks_rich_text_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_tab_layout_block_tabs_order_idx" ON "pages_blocks_tab_layout_block_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tab_layout_block_tabs_parent_id_idx" ON "pages_blocks_tab_layout_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tab_layout_block_tabs_image_idx" ON "pages_blocks_tab_layout_block_tabs" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tab_layout_block_order_idx" ON "pages_blocks_tab_layout_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_tab_layout_block_parent_id_idx" ON "pages_blocks_tab_layout_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tab_layout_block_path_idx" ON "pages_blocks_tab_layout_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_courses_id_idx" ON "pages_rels" USING btree ("courses_id");
  CREATE INDEX "pages_rels_blog_id_idx" ON "pages_rels" USING btree ("blog_id");
  CREATE INDEX "_pages_v_blocks_hero_statistics_stats_order_idx" ON "_pages_v_blocks_hero_statistics_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_statistics_stats_parent_id_idx" ON "_pages_v_blocks_hero_statistics_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_content_cta_content_cta_internal_li_idx" ON "_pages_v_blocks_hero" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "_pages_v_blocks_hero_image_image_media_idx" ON "_pages_v_blocks_hero" USING btree ("image_media_id");
  CREATE INDEX "_pages_v_blocks_top_categories_order_idx" ON "_pages_v_blocks_top_categories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_top_categories_parent_id_idx" ON "_pages_v_blocks_top_categories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_top_categories_path_idx" ON "_pages_v_blocks_top_categories" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_top_categories_content_cta_content_cta_i_idx" ON "_pages_v_blocks_top_categories" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_content_content_section_image_idx" ON "_pages_v_blocks_about" USING btree ("content_section_image_id");
  CREATE INDEX "_pages_v_blocks_about_content_cta_content_cta_internal_l_idx" ON "_pages_v_blocks_about" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "_pages_v_blocks_featured_courses_order_idx" ON "_pages_v_blocks_featured_courses" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_courses_parent_id_idx" ON "_pages_v_blocks_featured_courses" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_courses_path_idx" ON "_pages_v_blocks_featured_courses" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_courses_content_cta_content_cta_idx" ON "_pages_v_blocks_featured_courses" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "_pages_v_blocks_cta_block_order_idx" ON "_pages_v_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_block_parent_id_idx" ON "_pages_v_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_path_idx" ON "_pages_v_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_blogs_order_idx" ON "_pages_v_blocks_featured_blogs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_blogs_parent_id_idx" ON "_pages_v_blocks_featured_blogs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_blogs_path_idx" ON "_pages_v_blocks_featured_blogs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_blogs_content_cta_content_cta_i_idx" ON "_pages_v_blocks_featured_blogs" USING btree ("content_cta_internal_link_id");
  CREATE INDEX "_pages_v_blocks_site_stats_block_order_idx" ON "_pages_v_blocks_site_stats_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_site_stats_block_parent_id_idx" ON "_pages_v_blocks_site_stats_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_site_stats_block_path_idx" ON "_pages_v_blocks_site_stats_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_content_order_idx" ON "_pages_v_blocks_rich_text_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_content_parent_id_idx" ON "_pages_v_blocks_rich_text_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_content_path_idx" ON "_pages_v_blocks_rich_text_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tab_layout_block_tabs_order_idx" ON "_pages_v_blocks_tab_layout_block_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tab_layout_block_tabs_parent_id_idx" ON "_pages_v_blocks_tab_layout_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tab_layout_block_tabs_image_idx" ON "_pages_v_blocks_tab_layout_block_tabs" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tab_layout_block_order_idx" ON "_pages_v_blocks_tab_layout_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tab_layout_block_parent_id_idx" ON "_pages_v_blocks_tab_layout_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tab_layout_block_path_idx" ON "_pages_v_blocks_tab_layout_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_courses_id_idx" ON "_pages_v_rels" USING btree ("courses_id");
  CREATE INDEX "_pages_v_rels_blog_id_idx" ON "_pages_v_rels" USING btree ("blog_id");
  CREATE INDEX "blog_tags_order_idx" ON "blog_tags" USING btree ("_order");
  CREATE INDEX "blog_tags_parent_id_idx" ON "blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX "blog_featured_image_idx" ON "blog" USING btree ("featured_image_id");
  CREATE INDEX "blog_author_idx" ON "blog" USING btree ("author_id");
  CREATE INDEX "blog_category_idx" ON "blog" USING btree ("category_id");
  CREATE INDEX "blog_meta_meta_image_idx" ON "blog" USING btree ("meta_image_id");
  CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX "blog__status_idx" ON "blog" USING btree ("_status");
  CREATE INDEX "blog_rels_order_idx" ON "blog_rels" USING btree ("order");
  CREATE INDEX "blog_rels_parent_idx" ON "blog_rels" USING btree ("parent_id");
  CREATE INDEX "blog_rels_path_idx" ON "blog_rels" USING btree ("path");
  CREATE INDEX "blog_rels_blog_id_idx" ON "blog_rels" USING btree ("blog_id");
  CREATE INDEX "_blog_v_version_tags_order_idx" ON "_blog_v_version_tags" USING btree ("_order");
  CREATE INDEX "_blog_v_version_tags_parent_id_idx" ON "_blog_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_blog_v_parent_idx" ON "_blog_v" USING btree ("parent_id");
  CREATE INDEX "_blog_v_version_version_slug_idx" ON "_blog_v" USING btree ("version_slug");
  CREATE INDEX "_blog_v_version_version_featured_image_idx" ON "_blog_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blog_v_version_version_author_idx" ON "_blog_v" USING btree ("version_author_id");
  CREATE INDEX "_blog_v_version_version_category_idx" ON "_blog_v" USING btree ("version_category_id");
  CREATE INDEX "_blog_v_version_meta_version_meta_image_idx" ON "_blog_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blog_v_version_version_updated_at_idx" ON "_blog_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_v_version_version_created_at_idx" ON "_blog_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_v_version_version__status_idx" ON "_blog_v" USING btree ("version__status");
  CREATE INDEX "_blog_v_created_at_idx" ON "_blog_v" USING btree ("created_at");
  CREATE INDEX "_blog_v_updated_at_idx" ON "_blog_v" USING btree ("updated_at");
  CREATE INDEX "_blog_v_latest_idx" ON "_blog_v" USING btree ("latest");
  CREATE INDEX "_blog_v_autosave_idx" ON "_blog_v" USING btree ("autosave");
  CREATE INDEX "_blog_v_rels_order_idx" ON "_blog_v_rels" USING btree ("order");
  CREATE INDEX "_blog_v_rels_parent_idx" ON "_blog_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_v_rels_path_idx" ON "_blog_v_rels" USING btree ("path");
  CREATE INDEX "_blog_v_rels_blog_id_idx" ON "_blog_v_rels" USING btree ("blog_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_blocks_phone_order_idx" ON "forms_blocks_phone" USING btree ("_order");
  CREATE INDEX "forms_blocks_phone_parent_id_idx" ON "forms_blocks_phone" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_phone_path_idx" ON "forms_blocks_phone" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("customers_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_lessons_id_idx" ON "payload_locked_documents_rels" USING btree ("lessons_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_course_enrollments_id_idx" ON "payload_locked_documents_rels" USING btree ("course_enrollments_id");
  CREATE INDEX "payload_locked_documents_rels_quiz_attempts_id_idx" ON "payload_locked_documents_rels" USING btree ("quiz_attempts_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_customers_id_idx" ON "payload_preferences_rels" USING btree ("customers_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_navigation_links_order_idx" ON "header_navigation_links" USING btree ("_order");
  CREATE INDEX "header_navigation_links_parent_id_idx" ON "header_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_links_page_idx" ON "header_navigation_links" USING btree ("page_id");
  CREATE INDEX "header_logo_logo_image_idx" ON "header" USING btree ("logo_image_id");
  CREATE INDEX "header_explore_menu_view_all_link_explore_menu_view_all__idx" ON "header" USING btree ("explore_menu_view_all_link_page_id");
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_categories_id_idx" ON "header_rels" USING btree ("categories_id");
  CREATE INDEX "_header_v_version_navigation_links_order_idx" ON "_header_v_version_navigation_links" USING btree ("_order");
  CREATE INDEX "_header_v_version_navigation_links_parent_id_idx" ON "_header_v_version_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_navigation_links_page_idx" ON "_header_v_version_navigation_links" USING btree ("page_id");
  CREATE INDEX "_header_v_version_logo_version_logo_image_idx" ON "_header_v" USING btree ("version_logo_image_id");
  CREATE INDEX "_header_v_version_explore_menu_view_all_link_version_exp_idx" ON "_header_v" USING btree ("version_explore_menu_view_all_link_page_id");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE INDEX "_header_v_autosave_idx" ON "_header_v" USING btree ("autosave");
  CREATE INDEX "_header_v_rels_order_idx" ON "_header_v_rels" USING btree ("order");
  CREATE INDEX "_header_v_rels_parent_idx" ON "_header_v_rels" USING btree ("parent_id");
  CREATE INDEX "_header_v_rels_path_idx" ON "_header_v_rels" USING btree ("path");
  CREATE INDEX "_header_v_rels_categories_id_idx" ON "_header_v_rels" USING btree ("categories_id");
  CREATE INDEX "footer_socials_order_idx" ON "footer_socials" USING btree ("_order");
  CREATE INDEX "footer_socials_parent_id_idx" ON "footer_socials" USING btree ("_parent_id");
  CREATE INDEX "footer_link_columns_links_order_idx" ON "footer_link_columns_links" USING btree ("_order");
  CREATE INDEX "footer_link_columns_links_parent_id_idx" ON "footer_link_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_link_columns_links_internal_link_idx" ON "footer_link_columns_links" USING btree ("internal_link_id");
  CREATE INDEX "footer_link_columns_links_category_link_idx" ON "footer_link_columns_links" USING btree ("category_link_id");
  CREATE INDEX "footer_link_columns_order_idx" ON "footer_link_columns" USING btree ("_order");
  CREATE INDEX "footer_link_columns_parent_id_idx" ON "footer_link_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE INDEX "_footer_v_version_socials_order_idx" ON "_footer_v_version_socials" USING btree ("_order");
  CREATE INDEX "_footer_v_version_socials_parent_id_idx" ON "_footer_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_link_columns_links_order_idx" ON "_footer_v_version_link_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_link_columns_links_parent_id_idx" ON "_footer_v_version_link_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_link_columns_links_internal_link_idx" ON "_footer_v_version_link_columns_links" USING btree ("internal_link_id");
  CREATE INDEX "_footer_v_version_link_columns_links_category_link_idx" ON "_footer_v_version_link_columns_links" USING btree ("category_link_id");
  CREATE INDEX "_footer_v_version_link_columns_order_idx" ON "_footer_v_version_link_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_link_columns_parent_id_idx" ON "_footer_v_version_link_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_version_logo_idx" ON "_footer_v" USING btree ("version_logo_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "_footer_v_autosave_idx" ON "_footer_v" USING btree ("autosave");
  CREATE INDEX "cta_info_order_idx" ON "cta_info" USING btree ("_order");
  CREATE INDEX "cta_info_parent_id_idx" ON "cta_info" USING btree ("_parent_id");
  CREATE INDEX "cta_info_icon_idx" ON "cta_info" USING btree ("icon_id");
  CREATE INDEX "cta_instructor_c_t_a_instructor_c_t_a_image_idx" ON "cta" USING btree ("instructor_c_t_a_image_id");
  CREATE INDEX "cta_instructor_c_t_a_instructor_c_t_a_internal_link_idx" ON "cta" USING btree ("instructor_c_t_a_internal_link_id");
  CREATE INDEX "cta_student_c_t_a_student_c_t_a_image_idx" ON "cta" USING btree ("student_c_t_a_image_id");
  CREATE INDEX "cta_student_c_t_a_student_c_t_a_internal_link_idx" ON "cta" USING btree ("student_c_t_a_internal_link_id");
  CREATE INDEX "cta__status_idx" ON "cta" USING btree ("_status");
  CREATE INDEX "_cta_v_version_info_order_idx" ON "_cta_v_version_info" USING btree ("_order");
  CREATE INDEX "_cta_v_version_info_parent_id_idx" ON "_cta_v_version_info" USING btree ("_parent_id");
  CREATE INDEX "_cta_v_version_info_icon_idx" ON "_cta_v_version_info" USING btree ("icon_id");
  CREATE INDEX "_cta_v_version_instructor_c_t_a_version_instructor_c_t_a_idx" ON "_cta_v" USING btree ("version_instructor_c_t_a_image_id");
  CREATE INDEX "_cta_v_version_instructor_c_t_a_version_instructor_c_t_1_idx" ON "_cta_v" USING btree ("version_instructor_c_t_a_internal_link_id");
  CREATE INDEX "_cta_v_version_student_c_t_a_version_student_c_t_a_image_idx" ON "_cta_v" USING btree ("version_student_c_t_a_image_id");
  CREATE INDEX "_cta_v_version_student_c_t_a_version_student_c_t_a_inter_idx" ON "_cta_v" USING btree ("version_student_c_t_a_internal_link_id");
  CREATE INDEX "_cta_v_version_version__status_idx" ON "_cta_v" USING btree ("version__status");
  CREATE INDEX "_cta_v_created_at_idx" ON "_cta_v" USING btree ("created_at");
  CREATE INDEX "_cta_v_updated_at_idx" ON "_cta_v" USING btree ("updated_at");
  CREATE INDEX "_cta_v_latest_idx" ON "_cta_v" USING btree ("latest");
  CREATE INDEX "_cta_v_autosave_idx" ON "_cta_v" USING btree ("autosave");
  CREATE INDEX "site_stats_features_order_idx" ON "site_stats_features" USING btree ("_order");
  CREATE INDEX "site_stats_features_parent_id_idx" ON "site_stats_features" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_instructor_profile_qualifications" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "customers_sessions" CASCADE;
  DROP TABLE "customers" CASCADE;
  DROP TABLE "customers_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "lessons_blocks_lesson_video" CASCADE;
  DROP TABLE "lessons_blocks_lesson_content" CASCADE;
  DROP TABLE "lessons_blocks_lesson_materials_materials" CASCADE;
  DROP TABLE "lessons_blocks_lesson_materials" CASCADE;
  DROP TABLE "lessons_blocks_lesson_quiz_questions_options" CASCADE;
  DROP TABLE "lessons_blocks_lesson_quiz_questions" CASCADE;
  DROP TABLE "lessons_blocks_lesson_quiz" CASCADE;
  DROP TABLE "lessons" CASCADE;
  DROP TABLE "_lessons_v_blocks_lesson_video" CASCADE;
  DROP TABLE "_lessons_v_blocks_lesson_content" CASCADE;
  DROP TABLE "_lessons_v_blocks_lesson_materials_materials" CASCADE;
  DROP TABLE "_lessons_v_blocks_lesson_materials" CASCADE;
  DROP TABLE "_lessons_v_blocks_lesson_quiz_questions_options" CASCADE;
  DROP TABLE "_lessons_v_blocks_lesson_quiz_questions" CASCADE;
  DROP TABLE "_lessons_v_blocks_lesson_quiz" CASCADE;
  DROP TABLE "_lessons_v" CASCADE;
  DROP TABLE "courses_chapters" CASCADE;
  DROP TABLE "courses_learning_outcomes" CASCADE;
  DROP TABLE "courses_prerequisites" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_rels" CASCADE;
  DROP TABLE "_courses_v_version_chapters" CASCADE;
  DROP TABLE "_courses_v_version_learning_outcomes" CASCADE;
  DROP TABLE "_courses_v_version_prerequisites" CASCADE;
  DROP TABLE "_courses_v" CASCADE;
  DROP TABLE "_courses_v_rels" CASCADE;
  DROP TABLE "course_enrollments" CASCADE;
  DROP TABLE "course_enrollments_rels" CASCADE;
  DROP TABLE "quiz_attempts_answers" CASCADE;
  DROP TABLE "quiz_attempts" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "pages_blocks_hero_statistics_stats" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_top_categories" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_featured_courses" CASCADE;
  DROP TABLE "pages_blocks_cta_block" CASCADE;
  DROP TABLE "pages_blocks_featured_blogs" CASCADE;
  DROP TABLE "pages_blocks_site_stats_block" CASCADE;
  DROP TABLE "pages_blocks_rich_text_content" CASCADE;
  DROP TABLE "pages_blocks_tab_layout_block_tabs" CASCADE;
  DROP TABLE "pages_blocks_tab_layout_block" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_statistics_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_top_categories" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_courses" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_blogs" CASCADE;
  DROP TABLE "_pages_v_blocks_site_stats_block" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_content" CASCADE;
  DROP TABLE "_pages_v_blocks_tab_layout_block_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tab_layout_block" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "blog_rels" CASCADE;
  DROP TABLE "_blog_v_version_tags" CASCADE;
  DROP TABLE "_blog_v" CASCADE;
  DROP TABLE "_blog_v_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_phone" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_navigation_links" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "_header_v_version_navigation_links" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_header_v_rels" CASCADE;
  DROP TABLE "footer_socials" CASCADE;
  DROP TABLE "footer_link_columns_links" CASCADE;
  DROP TABLE "footer_link_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "_footer_v_version_socials" CASCADE;
  DROP TABLE "_footer_v_version_link_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_link_columns" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "cta_info" CASCADE;
  DROP TABLE "cta" CASCADE;
  DROP TABLE "_cta_v_version_info" CASCADE;
  DROP TABLE "_cta_v" CASCADE;
  DROP TABLE "site_stats_features" CASCADE;
  DROP TABLE "site_stats" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_instructor_profile_qualifications_type";
  DROP TYPE "public"."enum_customers_tier";
  DROP TYPE "public"."enum_lessons_blocks_lesson_materials_materials_file_type";
  DROP TYPE "public"."enum_lessons_blocks_lesson_quiz_questions_question_type";
  DROP TYPE "public"."enum_lessons_status";
  DROP TYPE "public"."enum__lessons_v_blocks_lesson_materials_materials_file_type";
  DROP TYPE "public"."enum__lessons_v_blocks_lesson_quiz_questions_question_type";
  DROP TYPE "public"."enum__lessons_v_version_status";
  DROP TYPE "public"."enum_courses_level";
  DROP TYPE "public"."enum_courses_pricing_type";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum__courses_v_version_level";
  DROP TYPE "public"."enum__courses_v_version_pricing_type";
  DROP TYPE "public"."enum__courses_v_version_status";
  DROP TYPE "public"."enum_course_enrollments_status";
  DROP TYPE "public"."enum_pages_blocks_hero_statistics_stats_icon";
  DROP TYPE "public"."enum_pages_blocks_hero_content_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_hero_content_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_top_categories_content_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_top_categories_content_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_content_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_about_content_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_layout";
  DROP TYPE "public"."enum_pages_blocks_featured_courses_content_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_featured_courses_content_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_block_type";
  DROP TYPE "public"."enum_pages_blocks_featured_blogs_content_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_featured_blogs_content_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_site_stats_block_variant";
  DROP TYPE "public"."enum_pages_blocks_tab_layout_block_tabs_layout";
  DROP TYPE "public"."enum_pages_blocks_tab_layout_block_highlight_color";
  DROP TYPE "public"."enum_pages_blocks_form_block_layout";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_statistics_stats_icon";
  DROP TYPE "public"."enum__pages_v_blocks_hero_content_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_content_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_top_categories_content_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_top_categories_content_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_content_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_about_content_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_layout";
  DROP TYPE "public"."enum__pages_v_blocks_featured_courses_content_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_featured_courses_content_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_type";
  DROP TYPE "public"."enum__pages_v_blocks_featured_blogs_content_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_featured_blogs_content_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_site_stats_block_variant";
  DROP TYPE "public"."enum__pages_v_blocks_tab_layout_block_tabs_layout";
  DROP TYPE "public"."enum__pages_v_blocks_tab_layout_block_highlight_color";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_layout";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum__blog_v_version_status";
  DROP TYPE "public"."enum_forms_blocks_phone_field_width";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_redirect_type";
  DROP TYPE "public"."enum_header_navigation_links_type";
  DROP TYPE "public"."enum_header_top_banner_background_color";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__header_v_version_navigation_links_type";
  DROP TYPE "public"."enum__header_v_version_top_banner_background_color";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum_footer_socials_platform";
  DROP TYPE "public"."enum_footer_link_columns_links_type";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_socials_platform";
  DROP TYPE "public"."enum__footer_v_version_link_columns_links_type";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum_cta_content_highlight_color";
  DROP TYPE "public"."enum_cta_instructor_c_t_a_link_type";
  DROP TYPE "public"."enum_cta_student_c_t_a_link_type";
  DROP TYPE "public"."enum_cta_status";
  DROP TYPE "public"."enum__cta_v_version_content_highlight_color";
  DROP TYPE "public"."enum__cta_v_version_instructor_c_t_a_link_type";
  DROP TYPE "public"."enum__cta_v_version_student_c_t_a_link_type";
  DROP TYPE "public"."enum__cta_v_version_status";`)
}
