CREATE OR REPLACE FUNCTION create_user(
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  title VARCHAR(255),
  email VARCHAR(255),
  image VARCHAR(255),
  department_id INTEGER
)
RETURNS users
LANGUAGE plpgsql
AS $$
DECLARE
  created_user users;
BEGIN
  INSERT INTO users (first_name, last_name, title, email, image, department_id)
  VALUES (first_name, last_name, title, email, image, department_id)
  RETURNING * INTO created_user;

  RETURN created_user;
END;
$$;