export const GET_ALL_USERS = 'SELECT * FROM get_users($1);'
export const GET_ALL_USERS_BY_DEPARTMENT_ID =
    'SELECT * FROM users WHERE department_id = $1;'
export const GET_USER_BY_ID = 'SELECT * FROM users WHERE id = $1;'
export const CREATE_USER = 'SELECT * FROM create_user($1, $2, $3, $4, $5, $6);'
export const DELETE_USER = 'DELETE FROM users WHERE id = $1;'
export const UPDATE_USER =
    'SELECT * FROM update_user($1, $2, $3, $4, $5, $6,$7);'
