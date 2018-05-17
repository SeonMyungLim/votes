import { SET_LOGIN_USER, SET_USERS, LOGOUT } from './types';

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
