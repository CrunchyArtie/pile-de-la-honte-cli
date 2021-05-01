import {InputQuestionBase} from '../base/input-question.base';
import {BoardgameModel} from '../../games/boardgame.model';
import Table from 'cli-table3';
import termSize from 'term-size';
import {IndexListQuestion} from './index-list.question';
import {Observable} from 'rxjs';

export class ListBoardgamesQuestion extends InputQuestionBase {
    constructor(private boardgames: BoardgameModel[]) {
        super();
    }

    protected before() {
        super.before();
        const colSize = 38
        const colsCount = Math.floor((termSize().columns) / colSize)
        const rowsCount = Math.ceil(this.boardgames.length / colsCount);

        const colWidths = [];
        const rows: string[][] = [];
        for (let i = 0; i < colsCount; i++) {
            colWidths.push(colSize);
        }

        for (let x = 0; x < rowsCount; x++) {
            const currentRow: string[] = rows[x] = [];
            for (let y = 0; y < colsCount; y++) {
                const boardgame = this.boardgames[(y * rowsCount) + x];
                const boardgameTitle = !!boardgame ? boardgame.title : '';
                currentRow[y] = boardgameTitle
            }
        }

        const headers: string[] = rows[0].map((col, index) => col[0] +'-'+ (rows[rows.length-1][index][0] || '...'))

        const table = new Table({
            chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
            colWidths: colWidths,
            wordWrap: false,
            head: headers
        });
        rows.forEach(r => table.push(r));
        console.log(table.toString());

    }

    message = 'On continue ?';

    onComplete(answers: any): Observable<any> {
        return new IndexListQuestion().ask();
    }
}
