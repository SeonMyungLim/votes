import { SET_QUESTIONS } from '../actions/questions';
import { SUBMIT_ANSWER } from '../actions/submitAnswer';
import { BUILD_QUESTION } from '../actions/buildQuestion';
import * as R from 'ramda';

var getQuestions = R.prop('questions');

export default function(state = {}, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return getQuestions(action);
        case BUILD_QUESTION:
            var question = action.payload;
            return {
                ...state,
                [question.id]: question,
            };
        case SUBMIT_ANSWER:
            var { qid, answer, authedUser } = action.payload;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser]),
                    },
                },
            };
        default:
            return state;
    }
}
