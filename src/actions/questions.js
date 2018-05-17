import { SET_QUESTIONS } from './types';

export function setQuestions(questions) {
    return {
        type: SET_QUESTIONS,
        questions,
    };
}
