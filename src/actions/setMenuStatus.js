export const SET_MENU_STATUS = 'SET_MENU_STATUS';

export function setMenuStatus(value) {
    return {
        type: SET_MENU_STATUS,
        value,
    };
}
