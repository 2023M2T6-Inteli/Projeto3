BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid NOT NULL PRIMARY KEY,
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar,
    "accepted_terms_at" varchar,
    "admin" boolean,
    "encrypted_password" varchar,
);
CREATE TABLE IF NOT EXISTS "classrooms" (
    "id" uuid NOT NULL PRIMARY KEY,
    "name" varchar,
    "user_id" uuid NOT NULL,
    "subject" varchar,
    CONSTRAINT "fk_classroom_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);
CREATE INDEX "index_classrooms_on_user_id" ON "classrooms" ("user_id");
CREATE TABLE IF NOT EXISTS "students" (
    "id" uuid NOT NULL PRIMARY KEY,
    "name" varchar,
);
CREATE TABLE IF NOT EXISTS "registrations" (
    "id" uuid NOT NULL PRIMARY KEY,
    "classroom_id" uuid NOT NULL,
    "student_id" uuid NOT NULL,
    CONSTRAINT "fk_registration_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms" ("id"),
    CONSTRAINT "fk_registration_student" FOREIGN KEY ("student_id") REFERENCES "students" ("id")
);
CREATE INDEX "index_registrations_on_classroom_id" ON "registrations" ("classroom_id");
CREATE INDEX "index_registrations_on_student_id" ON "registrations" ("student_id");
CREATE TABLE IF NOT EXISTS "activities" (
    "id" uuid NOT NULL PRIMARY KEY,
    "name" varchar,
    "user_id" uuid NOT NULL,
    "classroom_id" uuid NOT NULL,
    CONSTRAINT "fk_activity_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
    CONSTRAINT "fk_activity_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms" ("id")
);
CREATE INDEX "index_activities_on_user_id" ON "activities" ("user_id");
CREATE INDEX "index_activities_on_classroom_id" ON "activities" ("classroom_id");
CREATE TABLE IF NOT EXISTS "criteria" (
    "id" uuid NOT NULL PRIMARY KEY,
    "name" varchar,
    "mec_code" varchar,
    "subject" varchar,
);
CREATE TABLE IF NOT EXISTS "questions" (
    "id" uuid NOT NULL PRIMARY KEY,
    "activity_id" uuid NOT NULL,
    "criterium_id" uuid NOT NULL,
    "max_grade_percent" integer,
    CONSTRAINT "fk_question_activity" FOREIGN KEY ("activity_id") REFERENCES "activities" ("id"),
    CONSTRAINT "fk_question_criterium" FOREIGN KEY ("criterium_id") REFERENCES "criteria" ("id")
);
CREATE INDEX "index_questions_on_activity_id" ON "questions" ("activity_id");
CREATE INDEX "index_questions_on_criterium_id" ON "questions" ("criterium_id");
CREATE TABLE IF NOT EXISTS "grades" (
    "id" uuid NOT NULL PRIMARY KEY,
    "question_id" uuid NOT NULL,
    "student_id" uuid NOT NULL,
    "grade_percent" integer,
    CONSTRAINT "fk_grade_question" FOREIGN KEY ("question_id") REFERENCES "questions" ("id"),
    CONSTRAINT "fk_grade_student" FOREIGN KEY ("student_id") REFERENCES "students" ("id")
);
CREATE INDEX "index_grades_on_question_id" ON "grades" ("question_id");
CREATE INDEX "index_grades_on_student_id" ON "grades" ("student_id");
COMMIT;