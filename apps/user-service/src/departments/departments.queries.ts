export const GET_ALL_DEPARTMENTS =
    'SELECT d.*, COUNT(u.id)::INTEGER as user_count FROM departments d LEFT JOIN users u ON d.id = u.department_id GROUP BY d.id'
export const GET_DEPARTMENT =
    'SELECT d.*, COUNT(u.id)::INTEGER as user_count FROM departments d LEFT JOIN users u ON d.id = u.department_id WHERE d.id = $1 GROUP BY d.id'
export const GET_DEPARTMENT_BY_NAME =
    'SELECT d.*, COUNT(u.id)::INTEGER as user_count FROM departments d LEFT JOIN users u ON d.id = u.department_id WHERE d.name = $1 GROUP BY d.id'
export const DELETE_DEPARTMENT = 'DELETE FROM departments WHERE id = $1;'
