import { SUBMIT_ANSWER } from '../actions/submitAnswer';
import * as R from 'ramda';

export default function(state = {}, action) {
    console.log(action.type);
    switch (action.type) {
        case SUBMIT_ANSWER:
            debugger;
        default:
            return state;
    }
}
