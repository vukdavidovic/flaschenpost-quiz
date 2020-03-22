export interface IQuestion {
    id: number,
    question: string,
    input: IInput
}

export interface IInput {
    type: string,
    default: string[] | string | null,
    values: string[] | null,
    constraints: IConstraint
}

export interface IConstraint {
    required: boolean,
    min?: number,
    max?: number,
    forbidenWords?: Array<string>
}

export interface IAnswer {
    questionId: number,
    question: string,
    answer: string | string[]
}

export interface IAnimationTimeout {
    enter: number,
    exit: number
}
