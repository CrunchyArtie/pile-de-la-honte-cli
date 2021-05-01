import {IndexOptionsQuestion} from '../index-options.question';
import {ReadBlacklistQuestion} from './read-blacklist.question';
import {EditBlacklistQuestion} from './edit-blacklist.question';
import {Observable} from 'rxjs';
import {BlackListFilterEnum} from '../../../black-list-filter.enum';
import {OrderedSelectQuestionBase} from '../../base/ordered-select-question.base';
import {BoardgameCollection} from '../../../games/boardgame.collection';
import _ from 'lodash';
import {Options} from '../../../config';


export class IndexBlacklistQuestion extends OrderedSelectQuestionBase {
    message = 'Modifier la liste des jeux blacklistés';
    choices = [
        {value: 'list', name: 'Afficher les élèments blacklistés'},
        {value: 'boardgames', name: 'Gérer les jeux blacklistés'},
        {value: 'types', name: 'Gérer les types blacklistés'},
        {value: 'categories', name: 'Gérer les catégories blacklistées'},
        {value: 'back', name: 'Revenir aux options'}
    ]

    onComplete(answers: any): Observable<unknown> {

        const availableBoardgames = BoardgameCollection.getInstance().getBoardgames();
        const availableTypes = _.uniq(BoardgameCollection.getInstance().getBoardgames().map(b => b.type)).filter(v => !!v);
        const availableCategories = _.uniq(BoardgameCollection.getInstance().getBoardgames().map(b => b.categories).flat()).filter(v => !!v);
3
        if (answers.option === 'list') return new ReadBlacklistQuestion().ask({clear: false})
        else if (answers.option === 'boardgames') return new EditBlacklistQuestion(BlackListFilterEnum.boardgames, Options.boardgames, availableBoardgames.map(b => b.title)).ask()
        else if (answers.option === 'types') return new EditBlacklistQuestion(BlackListFilterEnum.types, Options.types, availableTypes).ask()
        else if (answers.option === 'categories') return new EditBlacklistQuestion(BlackListFilterEnum.categories, Options.categories, availableCategories).ask()
        else if (answers.option === 'back') return new IndexOptionsQuestion().ask()
        else return this.ask();
    }
}
