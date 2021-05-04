DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.modules CASCADE;
DROP TABLE IF EXISTS public.student_modules CASCADE;
DROP TABLE IF EXISTS public.tutor_modules CASCADE;
DROP TABLE IF EXISTS public.tutors CASCADE;
 

CREATE TABLE
    IF NOT EXISTS
        students (
            student_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR ( 50 ) NOT NULL,
            lastname VARCHAR ( 50 ) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);

CREATE TABLE
	IF NOT EXISTS
		tutors(
			tutor_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR(50) NOT NULL,
			lastname VARCHAR(50) NOT NULL,
            country VARCHAR(50) NOT NULL,
			expertise VARCHAR(50) NOT NULL,
			created_at TIMESTAMPTZ DEFAULT NOW()
		);



CREATE TABLE
	IF NOT EXISTS
		modules(
			module_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR(50) NOT NULL,
			starts_at DATE NOT NULL,
			ends_at DATE NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
		);

CREATE TABLE
    IF NOT EXISTS
        student_modules(
            relation_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            student_id  INTEGER REFERENCES students,
            module_id  INTEGER REFERENCES modules,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

CREATE TABLE
    IF NOT EXISTS
        tutor_modules(
            relation_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            tutor_id INTEGER REFERENCES tutors,
            module_id  INTEGER REFERENCES modules,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );



 

