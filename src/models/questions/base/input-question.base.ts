import {QuestionBase} from './question.base';
import {Observable} from 'rxjs';

export abstract class InputQuestionBase extends QuestionBase {
    readonly type = 'input';
    readonly name = 'input';
    abstract message: string;

    abstract onComplete<T>(answers: { input: string }): Observable<any>;
}

