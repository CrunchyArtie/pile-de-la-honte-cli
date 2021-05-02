import {InputQuestionBase} from './base/input-question.base';
import {Config, Options} from '../config';
import {BoardgameCollection} from '../games/boardgame.collection';
import {GameRecordCollection} from '../games/game-record.collection';
import terminalSize from 'term-size';
import Table from 'cli-table3';
import {Observable} from 'rxjs';
import {HomeQuestion} from './home.question';
import {BoardgamesByPlayersTimeTable} from '../tables/boardgame-by-players-time.table';

export class ShameListQuestion extends InputQuestionBase {
    protected before() {
        super.before();
        const boardgames = BoardgameCollection.getInstance().getBoardgames();
        const gameRecords = GameRecordCollection.getInstance().getRecords();

        const alreadyPlayedBoardgameTitles = gameRecords.map(gr => gr.boardgameTitle);
        const notPlayedBoardgames = boardgames.filter(b => alreadyPlayedBoardgameTitles.includes(b.title) === false);

        console.log(new BoardgamesByPlayersTimeTable(notPlayedBoardgames).toString())
    }

    message = 'On continue ?'; // TODO utiliser une question "On continue ?" mutualisé

    onComplete(answers: { input: string }): Observable<any> {
        return new HomeQuestion().ask();
    }
}
