import { _saveQuestionAnswer } from '../api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { SUBMIT_ANSWER } from './types';

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
