import Table from 'cli-table3';
import termSize from 'term-size';
import {IndexBlacklistQuestion} from './index-blacklist.question';
import {InputQuestionBase} from '../../base/input-question.base';
import {Config, Options} from '../../../config';
import {Observable} from 'rxjs';

export class ReadBlacklistQuestion extends InputQuestionBase {
    protected before() {
        const config = Config.getInstance();

        const blacklistTable = new Table({
            wordWrap: true,
            colWidths: [15, termSize().columns - 15 - 5]
        });
        blacklistTable.push({jeux: config.get<string[]>(Options.boardgames).join(', ')})
        blacklistTable.push({types: config.get<string[]>(Options.types).join(', ')})
        blacklistTable.push({'catégories': config.get<string[]>(Options.categories).join(', ')})

        console.log(blacklistTable.toString());
    }

    message = 'On continue ?';

    onComplete(answers: any): Observable<unknown>{
        return new IndexBlacklistQuestion().ask()
    }

}
