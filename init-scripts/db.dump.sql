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
