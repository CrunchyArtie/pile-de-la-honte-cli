import {InputQuestionBase} from './base/input-question.base';
import {Config, Options} from '../config';
import {BoardgameCollection} from '../games/boardgame.collection';
import {GameRecordCollection} from '../games/game-record.collection';
import terminalSize from 'term-size';
import Table from 'cli-table3';
import {Observable} from 'rxjs';
import {HomeQuestion} from './home.question';

export class ShameListQuestion extends InputQuestionBase {
    protected before() {
        super.before();
        const config = Config.getInstance();
        const boardgames = BoardgameCollection.getInstance().getBoardgames();
        const gameRecords = GameRecordCollection.getInstance().getRecords();

        const alreadyPlayedBoardgameTitles = gameRecords.map(gr => gr.boardgameTitle);
        const notPlayedBoardgames = boardgames.filter(b => alreadyPlayedBoardgameTitles.includes(b.title) === false);

        // les temps de jeux possibles
        const minTime = config.get<number>(Options.minTime);
        const gapTime = config.get<number>(Options.gap);
        const configMaxTime = config.get<number>(Options.maxTime);
        const maxTime = configMaxTime === -1 ? Math.max(...notPlayedBoardgames.map(b => b.time.map(t => +t)).flat()) : configMaxTime
        const availableTime: number[] = [];
        for (let i = minTime; i <= maxTime; i += gapTime) {
            availableTime.push(i);
        }

        const tableFriendlyAvailableTime = availableTime.reduce((acc: number[][], value) => {
            const lastEntryArr = acc[acc.length - 1];
            const lastEntryValue = lastEntryArr[lastEntryArr.length - 1]
            acc.push([lastEntryValue, value])
            return acc;
        }, <number[][]>[[]]).filter((row) => row.length > 0 && row.every(n => n !== undefined));

        // le nombre de joueurs possibles
        const minPlayers = config.get<number>(Options.minPlayers);
        const configMaxPlayers = config.get<number>(Options.maxPlayers);
        const maxPlayers = configMaxPlayers === -1 ? Math.max(...notPlayedBoardgames.map(b => b.playersAvailable).flat()) : configMaxPlayers
        const availablePlayers: number[] = [];
        for (let i = minPlayers; i <= maxPlayers; i++) {
            availablePlayers.push(i);
        }

        const timeColWidth = 9;
        const maxWidth = terminalSize().columns;
        const availableWidth = maxWidth - timeColWidth
        const colWidth = Math.floor(availableWidth / (availablePlayers.length + 1));

        const table = new Table({
            head: ['', ...availablePlayers.map(n => n.toString())],
            wordWrap: true,
            colWidths: [timeColWidth, ...availablePlayers.map(() => colWidth)]

        });

        const groupByAvailablePlayers = availablePlayers.map(playersNumber => {
            return notPlayedBoardgames.filter(b => b.playersAvailable.includes(playersNumber))
        })

        const tableRows = tableFriendlyAvailableTime.map(([from, to]) => {
            return { [from + `-` + to]: groupByAvailablePlayers.map(boardgames => boardgames.filter(b => b.time.some(t => t >= from && t < to)).map(b => b.title).join('\n'))}
        });
        table.push(...tableRows)

        console.log(table.toString())
    }

    message = 'On continue ?'; // TODO utiliser une question "On continue ?" mutualisé

    onComplete(answers: { input: string }): Observable<any> {
        return new HomeQuestion().ask();
    }
}
