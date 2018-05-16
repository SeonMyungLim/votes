import { _saveQuestionAnswer } from '../api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

function submit(payload) {
    return {
        type: SUBMIT_ANSWER,
        payload,
    };
}

export function submitAnswer(payload) {
    return (dispatch) => {
        dispatch(showLoading());
        _saveQuestionAnswer(payload).then(() => {
            dispatch(hideLoading());
            dispatch(submit(payload));
        });
    };
}
