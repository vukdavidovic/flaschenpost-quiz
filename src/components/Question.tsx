import React from 'react';
import {IQuestion} from "./interfaces";
import {InputFactory} from "./fields/InputFactory";
import './Question.scss';

interface IQuestionProps {
    question: IQuestion,
    onChange: (e: any) => void
}

const Question = (props: IQuestionProps) => {
    return (
        <div className={'question'}>
            <p>{props.question.question}</p>
            <InputFactory input={props.question.input} onChange={props.onChange}/>
        </div>
    );
};

export default Question;
