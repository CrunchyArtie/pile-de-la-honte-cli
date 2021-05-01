import {IndexBlacklistQuestion} from './index-blacklist.question';
import {AddBlacklistQuestion} from './add-blacklist.question';
import {RemoveBlacklistQuestion} from './remove-blacklist.question';
import {Observable} from 'rxjs';
import {BlackListFilterEnum} from '../../../black-list-filter.enum';
import {OrderedSelectQuestionBase} from '../../base/ordered-select-question.base';
import {Options} from '../../../config';

export class EditBlacklistQuestion extends OrderedSelectQuestionBase {
    choices = [
        {value: 'add', name: 'Ajouter un élément à la blacklist'},
        {value: 'remove', name: 'Retirer un élément à la blacklist'},
        {value: 'back', name: 'Revenir aux options blackList'}
    ];

    message = 'Modifier la blacklist : ' + this.label;

    constructor(
        private label: BlackListFilterEnum,
        private configBlacklistKey: Options,
        private blackListAvailableChoices: string[]) {
        super();
    }

    onComplete(answers: any): Observable<any> {
        if (answers.option === 'add') return new AddBlacklistQuestion(this.label, this.configBlacklistKey, this.blackListAvailableChoices).ask()
        else if (answers.option === 'remove') return new RemoveBlacklistQuestion(this.label, this.configBlacklistKey).ask()
        else if (answers.option === 'back') return new IndexBlacklistQuestion().ask();
        else return this.ask();
    }
}
