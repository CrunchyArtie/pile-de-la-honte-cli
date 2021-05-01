import {IndexOptionsQuestion} from '../index-options.question';
import {PlayersLimitDefaultQuestion} from './players-limit-default.question';
import {TimeLimitDefaultQuestion} from './time-limit-default.question';
import {Observable} from 'rxjs';
import {OrderedSelectQuestionBase} from '../../base/ordered-select-question.base';
import {CountDefaultQuestion} from './count-default.question';

export class IndexDefaultQuestion extends OrderedSelectQuestionBase {
    message = 'changer les valeurs par défaut';
    choices = [
        {value: 'player', name: 'Changer le nombre de joueur par défaut'},
        {value: 'time', name: 'Changer le temps de jeux par défaut'},
        {value: 'count', name: 'Changer le nombre de jeux a afficher'},
        {value: 'back', name: 'Revenir aux options'}
    ]

    onComplete(answers: any): Observable<any> {
        if (answers.option === 'player') return new PlayersLimitDefaultQuestion().ask()
        else if (answers.option === 'time') return new TimeLimitDefaultQuestion().ask()
        else if (answers.option === 'count') return new CountDefaultQuestion().ask()
        else if (answers.option === 'back') return new IndexOptionsQuestion().ask()
        else return this.ask();
    }
}
