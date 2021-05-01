import {QuestionBase} from './question.base';
import {Observable} from 'rxjs';

export abstract class FileTreeSelectionQuestionBase extends QuestionBase {
    readonly type = 'file-tree-selection';
    readonly name = 'path';
    abstract message: string;

    abstract onComplete<T>(answers: { path: string }): Observable<any>;
}

