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
    "classroom_id" integer,
    CONSTRAINT "fk_activity_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
    CONSTRAINT "fk_activity_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms" ("id")
);
CREATE INDEX "index_activities_on_user_id" ON "activities" ("user_id");
CREATE INDEX "index_activities_on_classroom_id" ON "activities" ("classroom_id");
CREATE TABLE IF NOT EXISTS "criteria"
(
    "id"          integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year"        integer,
    "mec_code"    varchar,
    "subject"     varchar,
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

-- User EmaiL: global@example.com, Password: password
INSERT INTO users (id, first_name, last_name, email, accepted_terms_at, admin, encrypted_password) VALUES (1, 'Angelita', 'Silva', 'global@example.com', 0, true, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');

-- Classroom
INSERT INTO classrooms (id, name, user_id) VALUES (1, 'Português da Angelita', 1);
INSERT INTO classrooms (id, name, user_id) VALUES (2, 'Matemática da Angelita', 1);

-- Student
INSERT INTO students (id, name) VALUES (1, 'Joãozinho');
INSERT INTO students (id, name) VALUES (2, 'Mariazinha');
INSERT INTO students (id, name) VALUES (3, 'Pedrinho');
INSERT INTO students (id, name) VALUES (4, 'Jerson');
INSERT INTO students (id, name) VALUES (5, 'Sueles');
INSERT INTO students (id, name) VALUES (6, 'Alberto');
INSERT INTO students (id, name) VALUES (7, 'Gerônimo');
INSERT INTO students (id, name) VALUES (8, 'Júlia');
INSERT INTO students (id, name) VALUES (9, 'Bruna');

-- Registration
INSERT INTO registrations (id, classroom_id, student_id) VALUES (1, 1, 1);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (2, 1, 2);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (3, 1, 3);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (4, 2, 4);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (5, 2, 5);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (6, 2, 6);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (7, 2, 7);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (8, 2, 8);
INSERT INTO registrations (id, classroom_id, student_id) VALUES (9, 2, 9);

-- Activities
INSERT INTO activities (id, name, created_at, user_id, classroom_id) VALUES (1, 'Prova 1', '2023-05-18 09:48:53', 1, 1);
INSERT INTO activities (id, name, created_at, user_id, classroom_id) VALUES (2, 'Prova 2', '2023-05-19 13:32:24', 1, 2);

-- Criteria
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (1, 3, 'EF03MA01', 'Math', 'Números naturais' );
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (2, 3, 'EF03MA02', 'Math', 'Soma e subtração');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (3, 3, 'EF03MA03', 'Math', 'Formas geométricas');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (4, 3, 'EF03MA05', 'Math', 'Lorem Ipsim');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (5, 3, 'EF03MA06', 'Math', 'Demo');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (6, 3, 'EF03PT01', 'Português', 'Formas geométricas');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (7, 3, 'EF03PT02', 'Português', 'Lorem Ipsum');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (8, 3, 'EF03PT03', 'Português', 'Dolor sit');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (9, 3, 'EF03PT04', 'Português', 'Amet consectur');
INSERT INTO criteria (id, year, mec_code, subject, description) VALUES (10, 3, 'EF03PT05', 'Português', 'Bla bla');

-- Questions
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (1, 'Questão 1', 1, 1, 100);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (2, 'Questão 2', 1, 2, 100);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (3, 'Questão 3', 1, 3, 100);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (4, 'Questão 4', 1, 4, 100);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (5, 'Questão 5', 1, 5, 100);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (6, 'Questão 1', 2, 9, 40);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (7, 'Questão 2', 2, 6, 40);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (8, 'Questão 3', 2, 8, 30);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (9, 'Questão 4', 2, 7, 5);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (10, 'Questão 5', 2, 10, 70);
INSERT INTO questions (id, content, activity_id, criterium_id, max_grade_percent) VALUES (11, 'Questão 6', 2, 6, 20);

-- Grades
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (1,1,1,100);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (2,1,2,100);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (3,1,3,100);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (4,2,1,90);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (5,2,2,70);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (6,2,3,90);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (7,3,1,90);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (8,3,2,90);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (9,3,3,80);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (10,4,1,50);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (11,4,2,40);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (12,4,3,10);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (13,5,1,70);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (14,5,2,80);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (15,5,3,60);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (16,6,4,20);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (17,6,5,39);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (18,6,6,30);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (19,7,4,38);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (20,7,5,14);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (21,7,6,17);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (22,8,4,20);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (23,8,5,10);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (24,8,6,3);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (25,9,4,4);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (26,9,5,5);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (27,9,6,4);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (28,10,4,50);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (29,10,5,60);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (30,10,6,63);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (31,11,4,17);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (32,11,5,13);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (33,11,6,15);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (34,6,7,23);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (35,6,8,12);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (36,6,9,26);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (37,7,7,30);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (38,7,8,27);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (39,7,9,33);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (40,8,7,15);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (41,8,8,28);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (42,8,9,23);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (43,9,7,1);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (44,9,8,5);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (45,9,9,4);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (46,10,7,32);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (47,10,8,56);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (48,10,9,49);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (49,11,7,19);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (50,11,8,8);
INSERT INTO grades (id, question_id, student_id, grade_percent) VALUES (51,11,9,20);


COMMIT;
