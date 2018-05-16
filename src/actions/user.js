export const SET_LOGIN_USER = 'SET_LOGIN_USER';
export const SET_USERS = 'SET_USERS';
export const LOGOUT = 'LOGOUT';

export function setUsers(users) {
    return {
        type: SET_USERS,
        users,
    };
}

export function login(user) {
    return {
        type: SET_LOGIN_USER,
        user,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
