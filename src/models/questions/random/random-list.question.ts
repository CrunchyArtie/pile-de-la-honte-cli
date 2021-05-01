import {MultiQuestionsBase} from '../base/multi-questions.base';
import {QuestionBase} from '../base/question.base';
import {Observable, of} from 'rxjs';
import {RandomListViewerQuestion} from './random-list-viewer.question';
import {Config, Options} from '../../config';

class HowManyUserQuestion extends QuestionBase {
    message = 'Combien de joueurs ?';

    onComplete(answers: any): Observable<any> {return of()};

    readonly name: string = 'players'
    readonly type: string = 'number'
    default = Config.getInstance().get(Options.minPlayers)
}

class HowManyTimeQuestion extends QuestionBase {
    message = 'Combien de Temps ?';

    onComplete(answers: any): Observable<any> {return of()};

    readonly name: string = 'time'
    readonly type: string = 'number'
    default = Config.getInstance().get(Options.averageTime)
}

export class RandomListQuestion extends MultiQuestionsBase {
    questions: QuestionBase[] = [
        new HowManyUserQuestion(),
        new HowManyTimeQuestion()
    ];

    onComplete(answers: { players: number, time: number }): Observable<any> {
        return new RandomListViewerQuestion(answers).ask();
    }
}
