import {InputQuestionBase} from '../base/input-question.base';
import {BoardgameCollection} from '../../games/boardgame.collection';
import {GameRecordCollection} from '../../games/game-record.collection';
import Table from 'cli-table3';
import {Observable} from 'rxjs';
import {HomeQuestion} from '../home.question';
import {Config, Options} from '../../config';

export class RandomListViewerQuestion extends InputQuestionBase {
    protected before() {
        super.before();

        const boardgames = BoardgameCollection.getInstance().getBoardgames();
        const gameRecords = GameRecordCollection.getInstance().getRecords();

        const alreadyPlayedBoardgameTitles = gameRecords.map(gr => gr.boardgameTitle);
        const notPlayedBoardgames = boardgames.filter(b => alreadyPlayedBoardgameTitles.includes(b.title) === false);

        const availableBoargames = notPlayedBoardgames.filter(b => b.time.includes(this.data.time) && b.playersAvailable.includes(this.data.players))

        const table = new Table({
            head: ['jeu', 'min', 'max', 'durée']
        })

        const limit = Config.getInstance().get<number>(Options.count)
        const shuffled = availableBoargames.slice().sort(() => 0.5 - Math.random()).slice(0, limit);

        table.push(...shuffled.map(boardgame => {
            const cells: string[] = [
                Math.min(...boardgame.playersAvailable).toString(),
                Math.max(...boardgame.playersAvailable).toString(),
                boardgame.rawTime
            ]
            return {[boardgame.title]: cells}
        }))

        console.log(table.toString())
    }

    constructor(private data: { players: number; time: number }) {
        super();
    }

    message = 'On continue ?';

    onComplete(answers: any): Observable<any> {
        return new HomeQuestion().ask();
    }

}
