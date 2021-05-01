import {QuestionBase} from './question.base';

export abstract class MultiQuestionsBase extends QuestionBase {

    readonly type = "MultiQuestionsBase Type not implemented"
    readonly name = "MultiQuestionsBase name not implemented"
    readonly message = "MultiQuestionsBase message not implemented"

    public abstract questions: QuestionBase[];

    toQuestion(): any[]  {
        return this.questions.map(q => q.toQuestion())
    }
}
