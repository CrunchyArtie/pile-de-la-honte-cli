import {NumberQuestionBase} from '../../base/number-question.base';
import {Observable} from 'rxjs';
import {Config, Options} from '../../../config';
import {IndexDefaultQuestion} from './index-default.question';

export class CountDefaultQuestion extends NumberQuestionBase {
    message = 'Combien de jeux afficher par défaut (-1 = infini) ?';
    default = Config.getInstance().get(Options.count)

    onComplete({number}: { number: number }): Observable<any> {
        if (!number || (number < 1 && number !== -1)) {
            console.log('La réponse doit valoir -1 ou plus de 0.')
            return this.ask({clear: false});
        } else {
            Config.getInstance().set(Options.count, number);
            return new IndexDefaultQuestion().ask()
        }
    }
}
