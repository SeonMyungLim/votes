import { SET_MENU_STATUS } from '../actions/setMenuStatus';

export default function(state = false, action) {
    switch (action.type) {
        case SET_MENU_STATUS:
            return action.value;
        default:
            return state;
    }
}
