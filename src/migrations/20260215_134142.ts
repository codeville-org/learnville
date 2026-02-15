import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_lessons_blocks_lesson_video_video_type" AS ENUM('youtube', 'bunnyStream');
  CREATE TYPE "public"."enum__lessons_v_blocks_lesson_video_video_type" AS ENUM('youtube', 'bunnyStream');
  CREATE TYPE "public"."enum_certificate_templates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certificate_templates_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_footer_link_columns_links_type" ADD VALUE 'category';
  ALTER TYPE "public"."enum__footer_v_version_link_columns_links_type" ADD VALUE 'category';
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'lesson-videos',
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
  
  CREATE TABLE "certificate_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"is_default" boolean DEFAULT false,
  	"canvas_width" numeric DEFAULT 1122,
  	"canvas_height" numeric DEFAULT 793,
  	"background_image_id" integer,
  	"canvas_data" jsonb,
  	"preview_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_certificate_templates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_certificate_templates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_is_default" boolean DEFAULT false,
  	"version_canvas_width" numeric DEFAULT 1122,
  	"version_canvas_height" numeric DEFAULT 793,
  	"version_background_image_id" integer,
  	"version_canvas_data" jsonb,
  	"version_preview_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__certificate_templates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "certificates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_id" integer NOT NULL,
  	"course_id" integer NOT NULL,
  	"enrollment_id" integer NOT NULL,
  	"template_id" integer NOT NULL,
  	"certificate_number" varchar NOT NULL,
  	"issued_at" timestamp(3) with time zone NOT NULL,
  	"student_name" varchar NOT NULL,
  	"course_name" varchar NOT NULL,
  	"instructor_name" varchar,
  	"completion_date" timestamp(3) with time zone,
  	"total_x_p_earned" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_all_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_all_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_all_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_all_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "lessons_blocks_lesson_video" ADD COLUMN "video_type" "enum_lessons_blocks_lesson_video_video_type";
  ALTER TABLE "lessons_blocks_lesson_video" ADD COLUMN "youtube_embed" varchar;
  ALTER TABLE "lessons_blocks_lesson_video" ADD COLUMN "video_id" integer;
  ALTER TABLE "_lessons_v_blocks_lesson_video" ADD COLUMN "video_type" "enum__lessons_v_blocks_lesson_video_video_type";
  ALTER TABLE "_lessons_v_blocks_lesson_video" ADD COLUMN "youtube_embed" varchar;
  ALTER TABLE "_lessons_v_blocks_lesson_video" ADD COLUMN "video_id" integer;
  ALTER TABLE "courses" ADD COLUMN "certificate_enabled" boolean DEFAULT false;
  ALTER TABLE "courses" ADD COLUMN "certificate_template_id" integer;
  ALTER TABLE "_courses_v" ADD COLUMN "version_certificate_enabled" boolean DEFAULT false;
  ALTER TABLE "_courses_v" ADD COLUMN "version_certificate_template_id" integer;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "heading_enabled" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "heading_enabled" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "certificate_templates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "certificates_id" integer;
  ALTER TABLE "footer_link_columns_links" ADD COLUMN "category_id" integer;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD COLUMN "category_id" integer;
  ALTER TABLE "certificate_templates" ADD CONSTRAINT "certificate_templates_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificate_templates" ADD CONSTRAINT "certificate_templates_preview_image_id_media_id_fk" FOREIGN KEY ("preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificate_templates_v" ADD CONSTRAINT "_certificate_templates_v_parent_id_certificate_templates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certificate_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificate_templates_v" ADD CONSTRAINT "_certificate_templates_v_version_background_image_id_media_id_fk" FOREIGN KEY ("version_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificate_templates_v" ADD CONSTRAINT "_certificate_templates_v_version_preview_image_id_media_id_fk" FOREIGN KEY ("version_preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_enrollment_id_course_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."course_enrollments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_template_id_certificate_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."certificate_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_all_categories" ADD CONSTRAINT "pages_blocks_all_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_all_blogs" ADD CONSTRAINT "pages_blocks_all_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_all_categories" ADD CONSTRAINT "_pages_v_blocks_all_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_all_blogs" ADD CONSTRAINT "_pages_v_blocks_all_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE UNIQUE INDEX "videos_filename_idx" ON "videos" USING btree ("filename");
  CREATE INDEX "certificate_templates_background_image_idx" ON "certificate_templates" USING btree ("background_image_id");
  CREATE INDEX "certificate_templates_preview_image_idx" ON "certificate_templates" USING btree ("preview_image_id");
  CREATE INDEX "certificate_templates_updated_at_idx" ON "certificate_templates" USING btree ("updated_at");
  CREATE INDEX "certificate_templates_created_at_idx" ON "certificate_templates" USING btree ("created_at");
  CREATE INDEX "certificate_templates__status_idx" ON "certificate_templates" USING btree ("_status");
  CREATE INDEX "_certificate_templates_v_parent_idx" ON "_certificate_templates_v" USING btree ("parent_id");
  CREATE INDEX "_certificate_templates_v_version_version_background_imag_idx" ON "_certificate_templates_v" USING btree ("version_background_image_id");
  CREATE INDEX "_certificate_templates_v_version_version_preview_image_idx" ON "_certificate_templates_v" USING btree ("version_preview_image_id");
  CREATE INDEX "_certificate_templates_v_version_version_updated_at_idx" ON "_certificate_templates_v" USING btree ("version_updated_at");
  CREATE INDEX "_certificate_templates_v_version_version_created_at_idx" ON "_certificate_templates_v" USING btree ("version_created_at");
  CREATE INDEX "_certificate_templates_v_version_version__status_idx" ON "_certificate_templates_v" USING btree ("version__status");
  CREATE INDEX "_certificate_templates_v_created_at_idx" ON "_certificate_templates_v" USING btree ("created_at");
  CREATE INDEX "_certificate_templates_v_updated_at_idx" ON "_certificate_templates_v" USING btree ("updated_at");
  CREATE INDEX "_certificate_templates_v_latest_idx" ON "_certificate_templates_v" USING btree ("latest");
  CREATE INDEX "certificates_customer_idx" ON "certificates" USING btree ("customer_id");
  CREATE INDEX "certificates_course_idx" ON "certificates" USING btree ("course_id");
  CREATE INDEX "certificates_enrollment_idx" ON "certificates" USING btree ("enrollment_id");
  CREATE INDEX "certificates_template_idx" ON "certificates" USING btree ("template_id");
  CREATE UNIQUE INDEX "certificates_certificate_number_idx" ON "certificates" USING btree ("certificate_number");
  CREATE INDEX "certificates_updated_at_idx" ON "certificates" USING btree ("updated_at");
  CREATE INDEX "certificates_created_at_idx" ON "certificates" USING btree ("created_at");
  CREATE INDEX "pages_blocks_all_categories_order_idx" ON "pages_blocks_all_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_all_categories_parent_id_idx" ON "pages_blocks_all_categories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_all_categories_path_idx" ON "pages_blocks_all_categories" USING btree ("_path");
  CREATE INDEX "pages_blocks_all_blogs_order_idx" ON "pages_blocks_all_blogs" USING btree ("_order");
  CREATE INDEX "pages_blocks_all_blogs_parent_id_idx" ON "pages_blocks_all_blogs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_all_blogs_path_idx" ON "pages_blocks_all_blogs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_all_categories_order_idx" ON "_pages_v_blocks_all_categories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_all_categories_parent_id_idx" ON "_pages_v_blocks_all_categories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_all_categories_path_idx" ON "_pages_v_blocks_all_categories" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_all_blogs_order_idx" ON "_pages_v_blocks_all_blogs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_all_blogs_parent_id_idx" ON "_pages_v_blocks_all_blogs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_all_blogs_path_idx" ON "_pages_v_blocks_all_blogs" USING btree ("_path");
  ALTER TABLE "lessons_blocks_lesson_video" ADD CONSTRAINT "lessons_blocks_lesson_video_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lessons_v_blocks_lesson_video" ADD CONSTRAINT "_lessons_v_blocks_lesson_video_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_certificate_template_id_certificate_templates_id_fk" FOREIGN KEY ("certificate_template_id") REFERENCES "public"."certificate_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_certificate_template_id_certificate_templates_id_fk" FOREIGN KEY ("version_certificate_template_id") REFERENCES "public"."certificate_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificate_templates_fk" FOREIGN KEY ("certificate_templates_id") REFERENCES "public"."certificate_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificates_fk" FOREIGN KEY ("certificates_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns_links" ADD CONSTRAINT "footer_link_columns_links_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_link_columns_links" ADD CONSTRAINT "_footer_v_version_link_columns_links_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "lessons_blocks_lesson_video_video_idx" ON "lessons_blocks_lesson_video" USING btree ("video_id");
  CREATE INDEX "_lessons_v_blocks_lesson_video_video_idx" ON "_lessons_v_blocks_lesson_video" USING btree ("video_id");
  CREATE INDEX "courses_certificate_template_idx" ON "courses" USING btree ("certificate_template_id");
  CREATE INDEX "_courses_v_version_version_certificate_template_idx" ON "_courses_v" USING btree ("version_certificate_template_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "payload_locked_documents_rels_certificate_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificate_templates_id");
  CREATE INDEX "payload_locked_documents_rels_certificates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificates_id");
  CREATE INDEX "footer_link_columns_links_category_idx" ON "footer_link_columns_links" USING btree ("category_id");
  CREATE INDEX "_footer_v_version_link_columns_links_category_idx" ON "_footer_v_version_link_columns_links" USING btree ("category_id");
  ALTER TABLE "lessons_blocks_lesson_video" DROP COLUMN "video_u_r_l";
  ALTER TABLE "_lessons_v_blocks_lesson_video" DROP COLUMN "video_u_r_l";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certificate_templates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_certificate_templates_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_all_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_all_blogs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_all_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_all_blogs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "certificate_templates" CASCADE;
  DROP TABLE "_certificate_templates_v" CASCADE;
  DROP TABLE "certificates" CASCADE;
  DROP TABLE "pages_blocks_all_categories" CASCADE;
  DROP TABLE "pages_blocks_all_blogs" CASCADE;
  DROP TABLE "_pages_v_blocks_all_categories" CASCADE;
  DROP TABLE "_pages_v_blocks_all_blogs" CASCADE;
  ALTER TABLE "lessons_blocks_lesson_video" DROP CONSTRAINT "lessons_blocks_lesson_video_video_id_videos_id_fk";
  
  ALTER TABLE "_lessons_v_blocks_lesson_video" DROP CONSTRAINT "_lessons_v_blocks_lesson_video_video_id_videos_id_fk";
  
  ALTER TABLE "courses" DROP CONSTRAINT "courses_certificate_template_id_certificate_templates_id_fk";
  
  ALTER TABLE "_courses_v" DROP CONSTRAINT "_courses_v_version_certificate_template_id_certificate_templates_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_certificate_templates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_certificates_fk";
  
  ALTER TABLE "footer_link_columns_links" DROP CONSTRAINT "footer_link_columns_links_category_id_categories_id_fk";
  
  ALTER TABLE "_footer_v_version_link_columns_links" DROP CONSTRAINT "_footer_v_version_link_columns_links_category_id_categories_id_fk";
  
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::text;
  DROP TYPE "public"."enum_footer_link_columns_links_type";
  CREATE TYPE "public"."enum_footer_link_columns_links_type" AS ENUM('page', 'external', 'custom');
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::"public"."enum_footer_link_columns_links_type";
  ALTER TABLE "footer_link_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_footer_link_columns_links_type" USING "type"::"public"."enum_footer_link_columns_links_type";
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::text;
  DROP TYPE "public"."enum__footer_v_version_link_columns_links_type";
  CREATE TYPE "public"."enum__footer_v_version_link_columns_links_type" AS ENUM('page', 'external', 'custom');
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::"public"."enum__footer_v_version_link_columns_links_type";
  ALTER TABLE "_footer_v_version_link_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum__footer_v_version_link_columns_links_type" USING "type"::"public"."enum__footer_v_version_link_columns_links_type";
  DROP INDEX "lessons_blocks_lesson_video_video_idx";
  DROP INDEX "_lessons_v_blocks_lesson_video_video_idx";
  DROP INDEX "courses_certificate_template_idx";
  DROP INDEX "_courses_v_version_version_certificate_template_idx";
  DROP INDEX "payload_locked_documents_rels_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_certificate_templates_id_idx";
  DROP INDEX "payload_locked_documents_rels_certificates_id_idx";
  DROP INDEX "footer_link_columns_links_category_idx";
  DROP INDEX "_footer_v_version_link_columns_links_category_idx";
  ALTER TABLE "lessons_blocks_lesson_video" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "_lessons_v_blocks_lesson_video" ADD COLUMN "video_u_r_l" varchar;
  ALTER TABLE "lessons_blocks_lesson_video" DROP COLUMN "video_type";
  ALTER TABLE "lessons_blocks_lesson_video" DROP COLUMN "youtube_embed";
  ALTER TABLE "lessons_blocks_lesson_video" DROP COLUMN "video_id";
  ALTER TABLE "_lessons_v_blocks_lesson_video" DROP COLUMN "video_type";
  ALTER TABLE "_lessons_v_blocks_lesson_video" DROP COLUMN "youtube_embed";
  ALTER TABLE "_lessons_v_blocks_lesson_video" DROP COLUMN "video_id";
  ALTER TABLE "courses" DROP COLUMN "certificate_enabled";
  ALTER TABLE "courses" DROP COLUMN "certificate_template_id";
  ALTER TABLE "_courses_v" DROP COLUMN "version_certificate_enabled";
  ALTER TABLE "_courses_v" DROP COLUMN "version_certificate_template_id";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "heading_enabled";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "heading_enabled";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "certificate_templates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "certificates_id";
  ALTER TABLE "footer_link_columns_links" DROP COLUMN "category_id";
  ALTER TABLE "_footer_v_version_link_columns_links" DROP COLUMN "category_id";
  DROP TYPE "public"."enum_lessons_blocks_lesson_video_video_type";
  DROP TYPE "public"."enum__lessons_v_blocks_lesson_video_video_type";
  DROP TYPE "public"."enum_certificate_templates_status";
  DROP TYPE "public"."enum__certificate_templates_v_version_status";`)
}
