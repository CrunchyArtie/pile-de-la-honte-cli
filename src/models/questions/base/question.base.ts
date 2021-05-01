import _ from 'lodash';
import inquirer from 'inquirer';
import {InquirerQuestionInterface} from './inquirer-question.interface';
import {AskOptionsInterface} from './ask-options.interface';
import {from, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

export abstract class QuestionBase {
    public abstract readonly type: string;
    public abstract readonly name: string;
    public abstract readonly message: string;
    public readonly default?: any;

    protected before() {
    }

    public ask(options?: Partial<AskOptionsInterface>) {
        const defaultOptions: AskOptionsInterface = {clear: true};
        const mergedOptions = _.merge(defaultOptions, options);

        if (mergedOptions.clear) {
            console.clear();
            // TODO showHeader();
        }

        this.before();

        const questions: InquirerQuestionInterface[] = _.isArray(this.toQuestion())
            ? <InquirerQuestionInterface[]>this.toQuestion()
            : [<InquirerQuestionInterface>this.toQuestion()]
        const promise = inquirer.prompt(questions);
        return from(promise).pipe(
            mergeMap(answers => this.onComplete(answers))
        )
    }

    public toQuestion(): InquirerQuestionInterface | InquirerQuestionInterface[] {
        const r: InquirerQuestionInterface = {
            type: this.type,
            name: this.name,
            message: this.message
        };

        if(this.default !== undefined) r.default = this.default;

        return r;
    }

    public abstract onComplete(answers: any): Observable<any>;

}
