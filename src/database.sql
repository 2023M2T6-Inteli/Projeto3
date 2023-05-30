BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users"
(
    "id"                 integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name"         varchar,
    "last_name"          varchar,
    "email"              varchar,
    "accepted_terms_at"  varchar,
    "admin"              boolean,
    "encrypted_password" varchar
);
CREATE TABLE IF NOT EXISTS "classrooms"
(
    "id"      integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"    varchar,
    "user_id" integer NOT NULL,
    "subject" varchar,
    "year"    integer,
    CONSTRAINT "fk_classroom_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);
CREATE INDEX "index_classrooms_on_user_id" ON "classrooms" ("user_id");
CREATE TABLE IF NOT EXISTS "students"
(
    "id"   integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" varchar
);
CREATE TABLE IF NOT EXISTS "registrations"
(
    "id"           integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "classroom_id" integer NOT NULL,
    "student_id"   integer NOT NULL,
    CONSTRAINT "fk_registration_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms" ("id"),
    CONSTRAINT "fk_registration_student" FOREIGN KEY ("student_id") REFERENCES "students" ("id")
);
CREATE INDEX "index_registrations_on_classroom_id" ON "registrations" ("classroom_id");
CREATE INDEX "index_registrations_on_student_id" ON "registrations" ("student_id");
CREATE TABLE IF NOT EXISTS "activities"
(
    "id"           integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"         varchar,
    "created_at"   text,
    "user_id"      integer NOT NULL,
    "classroom_id" integer NOT NULL,
    CONSTRAINT "fk_activity_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
    CONSTRAINT "fk_activity_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms" ("id")
);
CREATE INDEX "index_activities_on_user_id" ON "activities" ("user_id");
CREATE INDEX "index_activities_on_classroom_id" ON "activities" ("classroom_id");
CREATE TABLE IF NOT EXISTS "criteria"
(
    "id"          integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mec_code"    varchar,
    "subject"     varchar,
    "synthesis"   varchar,
    "description" varchar
);
CREATE TABLE IF NOT EXISTS "questions"
(
    "id"                integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content"           varchar NOT NULL,
    "activity_id"       integer NOT NULL,
    "criterium_id"      integer NOT NULL,
    "max_grade_percent" integer,
    CONSTRAINT "fk_question_activity" FOREIGN KEY ("activity_id") REFERENCES "activities" ("id"),
    CONSTRAINT "fk_question_criterium" FOREIGN KEY ("criterium_id") REFERENCES "criteria" ("id")
);
CREATE INDEX "index_questions_on_activity_id" ON "questions" ("activity_id");
CREATE INDEX "index_questions_on_criterium_id" ON "questions" ("criterium_id");
CREATE TABLE IF NOT EXISTS "grades"
(
    "id"            integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id"   integer NOT NULL,
    "student_id"    integer NOT NULL,
    "grade_percent" integer,
    CONSTRAINT "fk_grade_question" FOREIGN KEY ("question_id") REFERENCES "questions" ("id"),
    CONSTRAINT "fk_grade_student" FOREIGN KEY ("student_id") REFERENCES "students" ("id")
);
CREATE INDEX "index_grades_on_question_id" ON "grades" ("question_id");
CREATE INDEX "index_grades_on_student_id" ON "grades" ("student_id");

INSERT INTO users (id, first_name, last_name, email, accepted_terms_at, admin, encrypted_password)
VALUES (1, 'Angelita', 'Silva', 'admin@example.com', 0, true, '$2a$1');
INSERT INTO classrooms (id, name, user_id, subject,year)
VALUES (1, 'Português da Angelita', 1, 'Português', 2);
INSERT INTO classrooms (id, name, user_id, subject, year)
VALUES (2, 'Matemática da Angelita', 1, 'Matemática', 2);
INSERT INTO students (id, name)
VALUES (1, 'Joãozinho');
INSERT INTO students (id, name)
VALUES (2, 'Mariazinha');
INSERT INTO students (id, name)
VALUES (3, 'Pedrinho');
INSERT INTO registrations (id, classroom_id, student_id)
VALUES (1, 1, 1);
INSERT INTO registrations (id, classroom_id, student_id)
VALUES (2, 1, 2);
INSERT INTO registrations (id, classroom_id, student_id)
VALUES (3, 1, 3);
INSERT INTO activities (id, name, created_at, user_id, classroom_id)
VALUES (1, 'Prova 1', '2023-05-18 09:48:53', 1, 1);
INSERT INTO activities (id, name, created_at, user_id, classroom_id)
VALUES (2, 'Prova 2', '2023-05-19 13:32:24', 1, 1);
INSERT INTO criteria (id, mec_code, subject, synthesis, description)
VALUES (1, 'EF03MA01', 'Math', 'Números', 'Números naturais' );
INSERT INTO criteria (id, mec_code, subject, synthesis, description)
VALUES (2, 'EF03MA02', 'Math', 'Operações', 'Soma e subtração');
INSERT INTO criteria (id, mec_code, subject, synthesis, description)
VALUES (3, 'EF03MA03', 'Math', 'Geometria', 'Formas geométricas');
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent)
VALUES (1, 'Questão 1', 1, 1, 100);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent)
VALUES (2, 'Questão 2', 1, 2, 100);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent)
VALUES (3, 'Questão 3', 1, 3, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (1, 1, 1, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (2, 1, 2, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (3, 1, 3, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (4, 2, 1, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (5, 2, 2, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (6, 2, 3, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (7, 3, 1, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (8, 3, 2, 100);
INSERT INTO grades (id, question_id, student_id, grade_percent)
VALUES (9, 3, 3, 100);


COMMIT;