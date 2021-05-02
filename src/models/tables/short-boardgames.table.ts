import {TableBase} from './table.base';
import {BoardgameModel} from '../games/boardgame.model';
import {Config, Options} from '../config';
import Table from 'cli-table3';
import chalk from 'chalk';

export class ShortBoardgamesTable extends TableBase<BoardgameModel> {
    toString(): string {
        const table = new Table({
            head: ['jeu', 'min', 'max', 'durée'].map(t => chalk.bold(t))
        })

        const limit = Config.getInstance().get<number>(Options.count)
        const shuffled = this.data.slice().sort(() => 0.5 - Math.random()).slice(0, limit);

        table.push(...shuffled.map(boardgame => {
            const cells: string[] = [
                Math.min(...boardgame.playersAvailable).toString(),
                Math.max(...boardgame.playersAvailable).toString(),
                boardgame.rawTime
            ]
            return {[chalk.hex('#5555ff').bold(boardgame.title)]: cells}
        }))

        return table.toString();
    }
}
