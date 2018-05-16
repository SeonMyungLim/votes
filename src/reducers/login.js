import { SET_LOGIN_USER, LOGOUT } from '../actions/user';
import * as R from 'ramda';

var getId = R.compose(R.prop('id'), R.prop('user'));

export default function(state = null, action) {
    switch (action.type) {
        case SET_LOGIN_USER:
            return getId(action);
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
