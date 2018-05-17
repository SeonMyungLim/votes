import { SET_MENU_STATUS } from './types';

export function setMenuStatus(value) {
    return {
        type: SET_MENU_STATUS,
        value,
    };
}
