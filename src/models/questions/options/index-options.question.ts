import {HomeQuestion} from '../home.question';
import {IndexBlacklistQuestion} from './blacklist/index-blacklist.question';
import {IndexDefaultQuestion} from './default/index-default.question';
import {Observable} from 'rxjs';
import {OrderedSelectQuestionBase} from '../base/ordered-select-question.base';

export class IndexOptionsQuestion extends OrderedSelectQuestionBase {
    message = 'Modifier les options';
    choices = [
        {value: 'defaults', name: 'Changer les valeurs par défaut'},
        {value: 'blacklist', name: 'Modifier la liste des jeux blacklistés'},
        {value: 'back', name: 'Revenir au menu'}
    ]

    onComplete(answers: { option: string }): Observable<any> {
        if (answers.option === 'back') return new HomeQuestion().ask();
        else if (answers.option === 'defaults') return new IndexDefaultQuestion().ask();
        else if (answers.option === 'blacklist') return new IndexBlacklistQuestion().ask();
        else return this.ask();
    }
}
