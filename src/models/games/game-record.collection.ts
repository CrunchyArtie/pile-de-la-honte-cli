import {GameRecordModel} from './game-record.model';
import _ from 'lodash';

export class GameRecordCollection {
    private static instance: GameRecordCollection;
    private records: GameRecordModel[] = [];

    private constructor() {
    }

    public static getInstance(): GameRecordCollection {
        if(!GameRecordCollection.instance) {
            GameRecordCollection.instance = new GameRecordCollection();
        }
        return this.instance;
    }

    getRecords(): GameRecordModel[] {
        return this.records.slice();
    }

    public addRecord(record: GameRecordModel | GameRecordModel[]): GameRecordCollection {
        const list = _.isArray(record) ? record : [record];
        this.records.push(...list);
        return this;
    }

}
