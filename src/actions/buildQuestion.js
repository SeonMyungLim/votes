import { _saveQuestion } from '../api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const BUILD_QUESTION = 'BUILD_QUESTION';

function buildQuestion(payload) {
    return {
        type: BUILD_QUESTION,
        payload,
    };
}

export function buildQuestionAction(payload) {
    return (dispatch) => {
        dispatch(showLoading());
        _saveQuestion(payload).then((question) => {
            dispatch(hideLoading());
            dispatch(buildQuestion(question));
        });
    };
}
