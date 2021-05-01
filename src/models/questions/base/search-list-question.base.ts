import _ from 'lodash';
import {QuestionBase} from './question.base';
import {InquirerQuestionInterface} from './inquirer-question.interface';
import {Observable} from 'rxjs';

export abstract class SearchListQuestionBase extends QuestionBase {
    public readonly type = 'search-list';
    public readonly name = 'response';
    public abstract message: string = '';

    constructor(public choices: string[] = []) {
        super();
    }

    toQuestion(): InquirerQuestionInterface & { choices: string[] } {
        return _.merge(
            <InquirerQuestionInterface> super.toQuestion(),
            {choices: this.choices}
        )
    }


    public abstract onComplete(answers: { response: string }): Observable<any>;
}
