import {InputQuestionBase} from '../base/input-question.base';
import {BoardgameCollection} from '../../games/boardgame.collection';
import {GameRecordCollection} from '../../games/game-record.collection';
import Table from 'cli-table3';
import {Observable} from 'rxjs';
import {HomeQuestion} from '../home.question';
import {Config, Options} from '../../config';
import {ShortBoardgamesTable} from '../../tables/short-boardgames.table';

export class RandomListViewerQuestion extends InputQuestionBase {
    protected before() {
        super.before();

        const boardgames = BoardgameCollection.getInstance().getBoardgames();
        const gameRecords = GameRecordCollection.getInstance().getRecords();

        const alreadyPlayedBoardgameTitles = gameRecords.map(gr => gr.boardgameTitle);
        const notPlayedBoardgames = boardgames.filter(b => alreadyPlayedBoardgameTitles.includes(b.title) === false);

        const availableBoargames = notPlayedBoardgames.filter(b => b.time.includes(this.data.time) && b.playersAvailable.includes(this.data.players))

        const limit = Config.getInstance().get<number>(Options.count)
        const shuffled = availableBoargames.slice().sort(() => 0.5 - Math.random()).slice(0, limit);

        console.log(new ShortBoardgamesTable(shuffled).toString())
    }

    constructor(private data: { players: number; time: number }) {
        super();
    }

    message = 'On continue ?';

    onComplete(answers: any): Observable<any> {
        return new HomeQuestion().ask();
    }

}
