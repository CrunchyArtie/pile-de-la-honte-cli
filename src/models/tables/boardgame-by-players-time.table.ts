import {TableBase} from './table.base';
import {BoardgameModel} from '../games/boardgame.model';
import {Config, Options} from '../config';
import terminalSize from 'term-size';
import Table from 'cli-table3';
import chalk from 'chalk';

export class BoardgamesByPlayersTimeTable extends TableBase<BoardgameModel> {
    private config = Config.getInstance();

    toString(): string {
        const availableTimes = this.getAvailableTimes();
        const tableFriendlyAvailableTime = this.getTableFriendlyAvailableTime(availableTimes);
        const availablePlayers = this.getAvailablePlayers();

        const timeColWidth = 9;
        const timeColWidthAndMargin = timeColWidth + 2
        const terminalWidth = terminalSize().columns;
        const availableWidth = terminalWidth - (2*availablePlayers.length) - ((timeColWidthAndMargin) + 1)  // 1 = bordure exterieur droite
        const colWidth = Math.floor((availableWidth) / (availablePlayers.length));

        const table = new Table({
            head: ['', ...availablePlayers.map(n => n.toString()).map(h => chalk.bold(h))],
            wordWrap: false,
            colWidths: [timeColWidth, ...availablePlayers.map(() => colWidth)]
        });

        table.push(...tableFriendlyAvailableTime
            .map(([from, to]) => ({
                    [chalk.hex('#5555ff').bold(from + `-` + to)]: availablePlayers
                        .map(playersNumber => this.data.filter(b => b.playersAvailable.includes(playersNumber)))
                        .map(boardgames => boardgames
                            .filter(b => b.time.some(t => t >= from && t < to))
                            .map(b => b.title)
                            .join('\n'))
                })
            )
        )

        return table.toString();

    }

    private getAvailablePlayers() {
        const minPlayers = this.config.get<number>(Options.minPlayers);
        const configMaxPlayers = this.config.get<number>(Options.maxPlayers);
        const maxPlayers = configMaxPlayers === -1 ? Math.max(...this.data.map(b => b.playersAvailable).flat()) : configMaxPlayers
        const availablePlayers: number[] = [];
        for (let i = minPlayers; i <= maxPlayers; i++) {
            availablePlayers.push(i);
        }
        return availablePlayers;
    }

    private getTableFriendlyAvailableTime(availableTimes: number[]) {
        return availableTimes.reduce((acc: number[][], value) => {
            const lastEntryArr = acc[acc.length - 1];
            const lastEntryValue = lastEntryArr[lastEntryArr.length - 1]
            acc.push([lastEntryValue, value])
            return acc;
        }, <number[][]>[[]]).filter((row) => row.length > 0 && row.every(n => n !== undefined));
    }

    private getAvailableTimes() {
        // les temps de jeux possibles
        const minTime = this.config.get<number>(Options.minTime);
        const gapTime = this.config.get<number>(Options.gap);
        const configMaxTime = this.config.get<number>(Options.maxTime);
        const maxTime = configMaxTime === -1 ? Math.max(...this.data.map(b => b.time.map(t => +t)).flat()) : configMaxTime
        const availableTime: number[] = [];
        for (let i = minTime; i <= maxTime; i += gapTime) {
            availableTime.push(i);
        }
        return availableTime;
    }
}
