import { SET_USERS } from '../actions/user';
import { BUILD_QUESTION } from '../actions/buildQuestion';
import { SUBMIT_ANSWER } from '../actions/submitAnswer';
import * as R from 'ramda';

var getUser = R.prop('users');

export default function(state = {}, action) {
    switch (action.type) {
        case SET_USERS:
            return getUser(action);
        case SUBMIT_ANSWER:
            var { authedUser, qid, answer } = action.payload;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: { ...state[authedUser].answers, [qid]: answer },
                },
            };
        case BUILD_QUESTION:
            var { author, id } = action.payload;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: [...state[author].questions, id],
                },
            };
        default:
            return state;
    }
}
