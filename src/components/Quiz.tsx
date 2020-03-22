import React, {Component, ReactElement} from 'react';
import './Quiz.scss';
import './Question';
import {getQuestions, resetQuestions, saveQuiz} from "../api/api";
import Question from "./Question";
import {IAnimationTimeout, IAnswer, IQuestion} from "./interfaces";
import {Loader} from "./Loader";
import {Button} from "./Button";
import * as ls from 'local-storage';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {validation} from "./validation";

export interface IQuizState {
    questions: IQuestion[],
    currentQuestion: number,
    finished: boolean,
    loading: boolean,
    answers: IAnswer[],
    currentAnswer: IAnswer,
    animationTimeout: IAnimationTimeout,
    errors: string[]
}

export class Quiz extends Component<{}, IQuizState> {

    constructor(props: {}) {
        super(props);

        let previousState: null | IQuizState = ls.get('flaschenpostQuizData');
        if (previousState) {
            this.state = previousState;
        } else {
            this.state = {
                questions: [],
                currentQuestion: 0,
                finished: false,
                loading: true,
                answers: [],
                currentAnswer: {
                    questionId: 0,
                    question: '',
                    answer: ''
                },
                animationTimeout: {
                    enter: 800,
                    exit: 800,
                },
                errors: []
            };
        }

    }

    async componentDidMount(): Promise<any> {
        await getQuestions().then((questoions) => {
            this.setState({
                questions: questoions,
                loading: false,
                currentAnswer: {
                    answer: questoions[0].input.default ? questoions[0].input.default : '',
                    question: questoions[0].id,
                    questionId: questoions[0].question
                }
            });
        });
    }

    /**
     * Save state in local storage, so user can continue Quiz later
     */
    componentDidUpdate(): void {
        ls.set('flaschenpostQuizData', this.state);
    }

    /**
     * Go to next question.
     */
    nextQuestion = async (): Promise<any> => {
        await this.saveAnswer();

        if (!this.hasErrors()) {
            const nextQuestion = this.state.currentQuestion + 1;
            const defaultValue = this.state.questions[nextQuestion].input.default;
            this.setState({
                currentQuestion: nextQuestion,
                currentAnswer: {
                    answer: defaultValue ? defaultValue : '',
                    question: this.state.questions[nextQuestion].question,
                    questionId: this.state.questions[nextQuestion].id
                }
            });
        }

    };

    /**
     * Validate answer and store it
     */
    saveAnswer = async (): Promise<any> => {
        const errors = validation(this.state.currentAnswer, this.state.questions[this.state.currentQuestion].input.constraints);
        if (errors.length) {
            this.setState({
                errors: errors
            });
        } else {
            this.setState({
                errors: [],
                answers: this.state.answers.concat(this.state.currentAnswer)
            });
        }
    };

    /**
     * Submit quiz results, store results on api
     */
    submitResults = async (): Promise<any> => {
        await this.saveAnswer();

        if (!this.hasErrors()) {
            this.setState({
                finished: true,
                loading: true
            });
            await saveQuiz(this.state.answers).then(data => {
                if (data.status) {
                    this.setState({
                        loading: false
                    });
                }
            });
        }
    };

    /**
     * Reset quiz
     */
    resetQuiz = async (): Promise<any> => {
        this.setState({
            loading: true,
            questions: [],
            finished: false,
            currentQuestion: 0,
            answers: []
        });
        const questions = await resetQuestions().then(data => {
            if (data.status) {
                return getQuestions();
            }
        });
        this.setState({
            questions: questions,
            loading: false,
            currentAnswer: {
                answer: questions[0].input.default ? questions[0].input.default : '',
                question: questions[0].id,
                questionId: questions[0].question
            }
        });
    };

    handleChange = (answer: string | string[]): void => {
        this.setState({
            currentAnswer: {...this.state.currentAnswer, answer: answer}
        });
    };

    hasErrors = (): number => {
        return this.state.errors.length;
    };

    renderQuestions = (): ReactElement => {

        let current = this.state.currentQuestion;
        return (
            <CSSTransition timeout={this.state.animationTimeout} key={current} classNames={'animate'}>
                <div className={'question-holder'}>
                    <div
                        className={'counter'}>Question <span>{current + 1} / <span>{this.state.questions.length}</span></span>
                    </div>
                    <Question question={this.state.questions[current]} onChange={this.handleChange}/>
                    <div className="errors">
                        {
                            this.state.errors.map((error, index) => {
                                return (
                                    <span key={index}><i className={'fas fa-exclamation-circle'}></i>{error}</span>);
                            })
                        }
                    </div>
                    <div className="quiz-controls">
                        {
                            this.state.currentQuestion < this.state.questions.length - 1 ?
                                <Button icon={'fas fa-arrow-right'} label={'Next question'}
                                        onClick={this.nextQuestion}/> :
                                <Button label={'Finish quiz'} icon={'fas fa-flag-checkered'}
                                        onClick={this.submitResults}/>
                        }
                    </div>
                </div>
            </CSSTransition>
        );
    };

    renderThankYou = (): ReactElement => {

        return (
            <CSSTransition timeout={this.state.animationTimeout} key={'thank-you'} classNames={'fade'}>
                <div key={'thank-you'} className={'thank-you text-center'}>
                    <h3>Thank you for finishig quiz!</h3>
                    <p>Do you want to start over?</p>
                    <Button label={'Yes, its so interesting'} icon={'fas fa-undo'} onClick={this.resetQuiz}/>
                </div>
            </CSSTransition>
        );
    };

    renderLoader = (): ReactElement => {
        return (
            <CSSTransition timeout={this.state.animationTimeout} classNames={'fade'}>
                <Loader key={'loader'}/>
            </CSSTransition>
        )
    };

    render = () => {

        return (
            <main className={'container'}>
                <TransitionGroup className={'quiz-holder'}>
                    {this.state.loading ? this.renderLoader() : !this.state.finished ? this.renderQuestions() : this.renderThankYou()}
                </TransitionGroup>
            </main>
        );
    }
}
