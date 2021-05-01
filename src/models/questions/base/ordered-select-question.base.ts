import {CustomChoice, SelectQuestionBase} from './select-question.base';
import {InquirerQuestionInterface} from './inquirer-question.interface';

export abstract class OrderedSelectQuestionBase extends SelectQuestionBase {
    toQuestion(): InquirerQuestionInterface & { choices: CustomChoice[] } {
        const q = super.toQuestion();
        q.choices.forEach((c, i) => c.name = `${i+1}) ${c.name}` );
        return q;
    }
}
