CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL CHECK (LENGTH(name) >= 2),
  description VARCHAR(255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL CHECK (LENGTH(first_name) >= 2),
  last_name VARCHAR(255) NOT NULL CHECK (LENGTH(last_name) >= 2),
  title VARCHAR(255),
  email VARCHAR(255) NOT NULL CHECK (POSITION('@' IN email) > 1 AND POSITION('.' IN SUBSTRING(email, POSITION('@' IN email))) > 0),
  image VARCHAR(255),
  department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL
);

INSERT INTO departments (name, description) VALUES
  ('Engineering', 'Develop and maintain software products'),
  ('Product', 'Manage product development and strategy'),
  ('Marketing', 'Promote products and build brand awareness'),
  ('Sales', 'Sell products to customers');

INSERT INTO users (first_name, last_name, title, email, image, department_id) VALUES
  ('John', 'Doe', 'Software Engineer', 'john.doe@example.com', 'https://example.com/john.jpg', 1),
  ('Jane', 'Smith', 'Product Manager', 'jane.smith@example.com', 'https://example.com/jane.jpg', 2),
  ('Bob', 'Johnson', 'QA Analyst', 'bob.johnson@example.com', 'https://example.com/bob.jpg', 3),
  ('Alice', 'Williams', 'Marketing Coordinator', 'alice.williams@example.com', 'https://example.com/alice.jpg', 3),
  ('Tom', 'Brown', 'Senior Developer', 'tom.brown@example.com', 'https://example.com/tom.jpg', 1),
  ('Samantha', 'Lee', 'UX Designer', 'samantha.lee@example.com', 'https://example.com/samantha.jpg', 2),
  ('Mike', 'Wilson', 'Sales Representative', 'mike.wilson@example.com', 'https://example.com/mike.jpg', 4),
  ('Karen', 'Miller', 'Business Analyst', 'karen.miller@example.com', 'https://example.com/karen.jpg', 2),
  ('David', 'Clark', 'Project Manager', 'david.clark@example.com', 'https://example.com/david.jpg', 1),
  ('Amy', 'Taylor', 'HR Manager', 'amy.taylor@example.com', 'https://example.com/amy.jpg', 4);

-- Stored procedure for creating a user
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

-- Stored procedure for updating a user
CREATE OR REPLACE FUNCTION update_user(
  user_id INTEGER,
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
  updated_user users;
BEGIN
  UPDATE users
  SET
    first_name = COALESCE($2, users.first_name),
    last_name = COALESCE($3, users.last_name),
    title = COALESCE($4, users.title),
    email = COALESCE($5, users.email),
    image = COALESCE($6, users.image),
    department_id = COALESCE($7, users.department_id)
  WHERE id = $1
  RETURNING * INTO updated_user;

  RETURN updated_user;
END;
$$;

-- Stored procedure for creating a department
CREATE OR REPLACE PROCEDURE create_department(
  name VARCHAR(255),
  description VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO departments (name, description)
  VALUES (name, description);
END;
$$;

-- Stored procedure for updating a department
CREATE OR REPLACE PROCEDURE update_department(
  department_id INTEGER,
  name VARCHAR(255),
  description VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE departments
  SET
    name = COALESCE(name, departments.name),
    description = COALESCE(description, departments.description)
  WHERE id = department_id;
END;
$$;

-- Stored procedure for getting all users in a department
CREATE OR REPLACE FUNCTION get_users(
  filters json DEFAULT '{}'
)
RETURNS TABLE (
  id INTEGER,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  title VARCHAR(255),
  email VARCHAR(255),
  image VARCHAR(255),
  department_id INTEGER,
  department_name VARCHAR(255)
)
AS $$
DECLARE
  firstNameFilter TEXT := '';
  lastNameFilter TEXT := '';
  emailFilter TEXT := '';
  imageFilter TEXT := '';
  titleFilter TEXT := '';
  departmentNameFilter TEXT := '';
BEGIN
  IF filters->>'firstName' IS NOT NULL THEN
    firstNameFilter := format('first_name ILIKE ''%%%s%%'' AND', filters->>'firstName');
  END IF;
  
  IF filters->>'lastName' IS NOT NULL THEN
    lastNameFilter := format('last_name ILIKE ''%%%s%%'' AND', filters->>'lastName');
  END IF;
  
  IF filters->>'email' IS NOT NULL THEN
    emailFilter := format('email ILIKE ''%%%s%%'' AND', filters->>'email');
  END IF;
  
  IF filters->>'image' IS NOT NULL THEN
    imageFilter := format('image ILIKE ''%%%s%%'' AND', filters->>'image');
  END IF;
  
  IF filters->>'title' IS NOT NULL THEN
    titleFilter := format('title ILIKE ''%%%s%%'' AND', filters->>'title');
  END IF;
  
  IF filters->>'departmentName' IS NOT NULL THEN
    departmentNameFilter := format('departments.name ILIKE ''%%%s%%'' AND', filters->>'departmentName');
  END IF;
  
  RETURN QUERY EXECUTE format('
    SELECT users.*, departments.name AS department_name
    FROM users
    LEFT JOIN departments ON users.department_id = departments.id
    WHERE
      %s
      %s
      %s
      %s
      %s
      %s
      first_name IS NOT NULL AND last_name IS NOT NULL
  ', firstNameFilter, lastNameFilter, emailFilter, imageFilter, titleFilter, departmentNameFilter);
END;
$$ LANGUAGE plpgsql;

-- Stored procedure for getting all departments
CREATE OR REPLACE FUNCTION get_all_departments()
RETURNS SETOF departments AS $$
BEGIN
  RETURN QUERY (
    SELECT * FROM departments
  );
END;
$$ LANGUAGE plpgsql;