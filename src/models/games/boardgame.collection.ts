import _ from 'lodash';
import {BoardgameModel} from './boardgame.model';
import {Config, Options} from '../config';
import {BlackListFilterEnum} from '../black-list-filter.enum';

interface BoardgamesFiltersInterface {
    byBlacklist: boolean | BlackListFilterEnum[]
    // TODO byValues: { [key: string]: any }[]
}

export class BoardgameCollection {
    private static instance: BoardgameCollection;
    private boardgames: BoardgameModel[] = [];

    private constructor() {
    }

    public static getInstance(): BoardgameCollection {
        if (!BoardgameCollection.instance) {
            BoardgameCollection.instance = new BoardgameCollection();
        }
        return BoardgameCollection.instance;
    }

    public addBoardgame(boardgame: BoardgameModel | BoardgameModel[]): BoardgameCollection {
        const list = _.isArray(boardgame) ? boardgame : [boardgame];
        this.boardgames.push(...list);
        return this;
    }

    public getBoardgames(filters: Partial<BoardgamesFiltersInterface> = {}): BoardgameModel[] {
        const defaultFilters: Partial<BoardgamesFiltersInterface> = {
            byBlacklist: true,
            // byValues: []
        };
        const mergedFilters: Partial<BoardgamesFiltersInterface> = _.merge({}, defaultFilters, filters);
        let list = this.boardgames.slice();

        if (mergedFilters.byBlacklist === true) {
            mergedFilters.byBlacklist = [BlackListFilterEnum.boardgames, BlackListFilterEnum.categories, BlackListFilterEnum.types]
        }

        if (_.isArray(mergedFilters.byBlacklist)) {
            const config = Config.getInstance();

            if (mergedFilters.byBlacklist.includes(BlackListFilterEnum.boardgames)) {
                list = list.filter(b => config.get<string[]>(Options.boardgames).includes(b.title) === false)
            }
            if (mergedFilters.byBlacklist.includes(BlackListFilterEnum.categories)) {
                list = list.filter(b => b.categories.some(c => config.get<string[]>(Options.categories).includes(c)) === false)
            }
            if (mergedFilters.byBlacklist.includes(BlackListFilterEnum.types)) {
                list = list.filter(b => config.get<string[]>(Options.types).includes(b.type) === false)
            }
        }
        return list;
    }
}
