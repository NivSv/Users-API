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