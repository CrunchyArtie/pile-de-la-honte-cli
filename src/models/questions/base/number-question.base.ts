import {QuestionBase} from './question.base';
import {Observable} from 'rxjs';

export abstract class NumberQuestionBase extends QuestionBase {
    readonly type = 'number';
    readonly name = 'number';
    abstract message: string;


    abstract onComplete<T>(answers: { number: number }): Observable<any>;
}

