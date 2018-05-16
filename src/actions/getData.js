import { _getUsers, _getQuestions } from '../api';
import { setUsers } from './user';
import { setQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function getInitialDataAction() {
    return (dispatch) => {
        dispatch(showLoading());
        return Promise.all([_getUsers(), _getQuestions()]).then(
            ([users, questions]) => {
                dispatch(hideLoading());
                dispatch(setUsers(users));
                dispatch(setQuestions(questions));
            }
        );
    };
}
