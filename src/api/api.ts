import * as http from "./http";

const getQuestions = (): Promise<any> => http.get('/questions');
const resetQuestions = (): Promise<any> => http.post('/clean');
const saveQuiz = (data: {}): Promise<any> => http.post('/store', data);

export {
    getQuestions,
    resetQuestions,
    saveQuiz
}
