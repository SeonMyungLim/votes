import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import users from './users';
import login from './login';
import questions from './questions';
import menuStatus from './menuStatus';

const reducer = combineReducers({
    users,
    loading: loadingBarReducer,
    loginUser: login,
    questions,
    isMenuOpen: menuStatus,
});

export default reducer;
