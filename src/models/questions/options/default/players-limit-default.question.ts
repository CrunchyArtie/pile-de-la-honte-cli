import {IndexDefaultQuestion} from './index-default.question';
import {QuestionBase} from '../../base/question.base';
import {MultiQuestionsBase} from '../../base/multi-questions.base';
import {Config, Options} from '../../../config';
import {EMPTY, Observable} from 'rxjs';

class MinPlayerQuestion extends QuestionBase {
    readonly message = 'Combien de joueur minimum ?';
    readonly name = 'min';
    readonly type = 'number';
    readonly default = Config.getInstance().get(Options.minPlayers);

    onComplete(answers: any): Observable<unknown> {return EMPTY}
}

class MaxPlayerQuestion extends QuestionBase {
    readonly message = 'Combien de joueur maximum (-1 = infini) ?';
    readonly name = 'max';
    readonly type = 'number';
    readonly default = Config.getInstance().get(Options.maxPlayers);

    onComplete(answers: any): Observable<unknown> {return EMPTY}
}

export class PlayersLimitDefaultQuestion extends MultiQuestionsBase {

    questions = [new MinPlayerQuestion(), new MaxPlayerQuestion()];

    onComplete({max, min}: {max: number, min: number}): Observable<any> {
        if (max < min && max !== -1) {
            console.log('Le nombre maxmimum doit valoir -1 ou plus que le minimum.')
            return this.ask({clear: false});
        } else {
            Config.getInstance().set(Options.minPlayers, min);
            Config.getInstance().set(Options.maxPlayers, max);
            return new IndexDefaultQuestion().ask()
        }
    }

}
