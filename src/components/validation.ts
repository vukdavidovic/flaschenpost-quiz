import {IAnswer, IConstraint} from "./interfaces";

export const validation = (answer: IAnswer, constraints: IConstraint): string[] => {

    let errors: string[] = [];
    let questionAnswer = answer.answer;

    for (let key in constraints) {
        let error: string | boolean;
        switch (key) {
            case 'required':
                error = validateRequired(questionAnswer);
                if (typeof error === "string") {
                    errors = errors.concat(error);
                }
                break;
            case 'min':
                error = validateMin(questionAnswer, constraints.min);
                if (typeof error === "string") {
                    errors = errors.concat(error);
                }
                break;
            case 'max':
                error = validateMax(questionAnswer, constraints.max);
                if (typeof error === "string") {
                    errors = errors.concat(error);
                }
                break;
            case 'forbidenWords':
                error = validateForbiddenWords(questionAnswer, constraints.forbidenWords);
                console.log(error);
                if (typeof error === "string") {
                    errors = errors.concat(error);
                }
                break;
        }
    }

    return errors;
};

const validateRequired = (answer: string | string[]): string | boolean => {
    if (!answer.length) {
        return 'Please answer the question';
    }
    return false;
};

const validateMin = (answer: string | string[], min?: number): string | boolean => {
    if (min && answer.length <= min) {
        return `Answer is too short. Minimum length of answer should be ${min}`;
    }
    return false;
};

const validateMax = (answer: string | string[], max?: number): string | boolean => {
    if (max && answer.length > max) {
        return `Answer is too long. Maximum length of answer should be ${max}`;
    }
    return false;
};

const validateForbiddenWords = (answer: string | string[], forbiddenWords?: string[]): string | boolean => {
    let error: boolean | string = false;
    forbiddenWords?.forEach((item) => {
        if (answer.includes(item)) {
            error = `Answer should not contain ${item}`;
        }
    });
    return error;
};
