#!/usr/bin/env node

import parse from 'csv-parse/lib/sync';
import fs from 'fs';
import inquirer from 'inquirer';
import {HomeQuestion} from './models/questions/home.question';
import {BoardgameCollection} from './models/games/boardgame.collection';
import {BoardgameRawLineInterface} from './models/games/boardgame-raw-line.interface';
import {BoardgameModel} from './models/games/boardgame.model';
import {GameRecordRawLineInterface} from './models/games/game-record-raw-line.interface';
import {GameRecordModel} from './models/games/game-record.model';
import {Config, Options} from './models/config';
import {InitCsvCollectionPathQuestion} from './models/questions/config/init-csv-collection-path.question';
import {of} from 'rxjs';
import {mergeMap, tap} from 'rxjs/operators';
import {InitCsvGamesPathQuestion} from './models/questions/config/init-csv-games-path.question';
import {GameRecordCollection} from './models/games/game-record.collection';
import figlet from 'figlet';
import terminalSize from 'term-size';
import chalk from 'chalk';

console.clear();
const header = figlet.textSync('Pile de la honte', {
    font: <any>['Roman', 'Chunky', 'Thin'].sort(() => 0.5 - Math.random())[0],
    verticalLayout: 'default',
    width: terminalSize().columns,
});

const styledHeader = chalk.hex('#5555ff').bold(header);
console.log(styledHeader);

inquirer.registerPrompt('search-list', require('inquirer-search-list'));
inquirer.registerPrompt('file-tree-selection', require('inquirer-file-tree-selection-prompt'));

const defaultOptions = {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';'
};

const config = Config.getInstance();

const csvCollectionPath = config.get<string>(Options.collection);
const csvGamesPath = config.get<string>(Options.games);

let obs = of({});

if (csvCollectionPath === '' || fs.existsSync(csvCollectionPath) === false) {
    obs = obs.pipe(
        mergeMap(() => new InitCsvCollectionPathQuestion().ask())
    );
}

if (csvGamesPath === '' || fs.existsSync(csvGamesPath) === false) {
    obs = obs.pipe(
        mergeMap(() => new InitCsvGamesPathQuestion().ask())
    );
}


obs.pipe(
    tap(() => { // TODO bouger dans une classe d'initialisation
        const collectionCsv = fs.readFileSync(config.get<string>(Options.collection));
        const collectionRecords = (<BoardgameRawLineInterface[]>parse(collectionCsv, defaultOptions)).map(line => new BoardgameModel(line))
        BoardgameCollection.getInstance().addBoardgame(collectionRecords);
        console.log(BoardgameCollection.getInstance().getBoardgames().length + ' jeu(x) chargé(s)')
    }),
    tap(() => { // TODO bouger dans une classe d'initialisation
        const gameRecordsCsv = fs.readFileSync(config.get(Options.games));
        const gamesRecords = (<GameRecordRawLineInterface[]>parse(gameRecordsCsv, defaultOptions)).map(line => new GameRecordModel(line))
        GameRecordCollection.getInstance().addRecord(gamesRecords);
        console.log(GameRecordCollection.getInstance().getRecords().length + ' partie(s) chargée(s)') // TODO uniformiser l'affichage d'information
    }),
    mergeMap(() => new HomeQuestion().ask({clear: false}))
).subscribe()
