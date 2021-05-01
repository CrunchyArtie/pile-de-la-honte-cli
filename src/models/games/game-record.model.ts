import {GameRecordRawLineInterface} from './game-record-raw-line.interface';

export class GameRecordModel {
    public constructor(private line: GameRecordRawLineInterface) {
    }

    public get boardgameTitle(): string {
        return this.line.Titre;
    }
}
