import {HomeQuestion} from '../home.question';
import {SelectQuestionBase} from '../base/select-question.base';
import {BoardgameCollection} from '../../games/boardgame.collection';
import {ListBoardgamesQuestion} from './list-boardgames.question';
import {Observable} from 'rxjs';

export class IndexListQuestion extends SelectQuestionBase {
    message = 'Lister les jeux';
    choices = [
        {value: 'all', name: '1 - Afficher tout (hors blacklist)'},
        {value: 'allAndBlacklist', name: '2 - Afficher tout (blacklist incluse)'},
        {value: 'back', name: '3 - Revenir au menu'}
    ]

    onComplete(answers: { option: string }): Observable<any> {
        const collection = BoardgameCollection.getInstance();
        if (answers.option === 'all') return  new ListBoardgamesQuestion(collection.getBoardgames()).ask({clear: false});
        else if (answers.option === 'allAndBlacklist') return new ListBoardgamesQuestion(collection.getBoardgames({byBlacklist: false})).ask({clear: false});
        else if (answers.option === 'back') return new HomeQuestion().ask();
        else return  this.ask();
    }
}
