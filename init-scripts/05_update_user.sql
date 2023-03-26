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