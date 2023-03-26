CREATE TYPE department_with_user_count AS (
  id INTEGER,
  name VARCHAR(255),
  description VARCHAR(255),
  user_count INTEGER
);

CREATE OR REPLACE FUNCTION create_department(
  p_name VARCHAR(255),
  p_description VARCHAR(255)
)
RETURNS department_with_user_count
AS $$
DECLARE
  new_department department_with_user_count;
BEGIN
  INSERT INTO departments (name, description)
  VALUES (p_name, p_description)
  RETURNING id, name, description INTO new_department;

  SELECT COUNT(u.id)::INTEGER INTO new_department.user_count
  FROM departments d
  LEFT JOIN users u ON d.id = u.department_id
  WHERE d.id = new_department.id
  GROUP BY d.id;

  RETURN new_department;
END;
$$ LANGUAGE plpgsql;