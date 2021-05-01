import {QuestionBase} from './question.base';
import {InquirerQuestionInterface} from './inquirer-question.interface';
import _ from 'lodash';
import {Observable} from 'rxjs';
import Choice from 'inquirer/lib/objects/choice';
export type CustomChoice = Omit<Choice, 'disabled' | 'short' >;

export abstract class SelectQuestionBase extends QuestionBase {
    public readonly type = 'list';
    public readonly name = 'option';
    public abstract message: string = '';
    public abstract choices: CustomChoice[] = [];

    toQuestion(): InquirerQuestionInterface & {choices: CustomChoice[]} {
        return _.merge(
            <InquirerQuestionInterface>super.toQuestion(),
            {choices: this.choices}
        )
    }

    public abstract onComplete(answers: {option: string}): Observable<any>;
}
