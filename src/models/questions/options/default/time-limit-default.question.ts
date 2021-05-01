import {IndexDefaultQuestion} from './index-default.question';
import {QuestionBase} from '../../base/question.base';
import {MultiQuestionsBase} from '../../base/multi-questions.base';
import {Config, Options} from '../../../config';
import {EMPTY, Observable} from 'rxjs';

class MinTimeQuestion extends QuestionBase {
    readonly message = 'Combien de temps minimum ?';
    readonly name = 'min';
    readonly type = 'number';
    readonly default = Config.getInstance().get(Options.minTime);

    onComplete(answers: any): Observable<unknown> {return EMPTY}
}

class MaxTimeQuestion extends QuestionBase {
    readonly message = 'Combien de temps maximum (-1 = infini) ?';
    readonly name = 'max';
    readonly type = 'number';
    readonly default = Config.getInstance().get(Options.maxTime);

    onComplete(answers: any): Observable<unknown> {return EMPTY}
}

class GapTimeQuestion extends QuestionBase {
    readonly message = 'Combien de gap entre deux créneaux ?';
    readonly name = 'gap';
    readonly type = 'number';
    readonly default = Config.getInstance().get(Options.gap);

    onComplete(answers: any): Observable<unknown> {return EMPTY}
}

class AverageTimeQuestion extends QuestionBase {
    readonly message = 'Quel est votre temps de jeux préféré ?';
    readonly name = 'average';
    readonly type = 'number';
    readonly default = Config.getInstance().get(Options.averageTime);

    onComplete(answers: any): Observable<unknown> {return EMPTY}
}


export class TimeLimitDefaultQuestion extends MultiQuestionsBase {

    questions = [new MinTimeQuestion(), new MaxTimeQuestion(), new GapTimeQuestion(), new AverageTimeQuestion()];

    onComplete({min, max, gap, average}: {min: number, max: number, gap: number, average:number}): Observable<any> {
        if (max < min && max !== -1) {
            console.log('Le nombre maxmimum doit valoir -1 ou plus que le minimum.')
            return this.ask({clear: false});
        } else if (gap < 1) {
            console.log('Le gap doit valoir au moins 1.')
            return this.ask({clear: false});
        } else {
            Config.getInstance().set(Options.minTime, min);
            Config.getInstance().set(Options.maxTime, max);
            Config.getInstance().set(Options.gap, gap);
            Config.getInstance().set(Options.averageTime, average);
            return new IndexDefaultQuestion().ask()
        }
    }
}
