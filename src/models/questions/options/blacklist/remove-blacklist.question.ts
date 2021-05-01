import {SearchListQuestionBase} from '../../base/search-list-question.base';
import {IndexBlacklistQuestion} from './index-blacklist.question';
import {Config, Options} from '../../../config';
import {Observable} from 'rxjs';
import {BlackListFilterEnum} from '../../../black-list-filter.enum';

export class RemoveBlacklistQuestion extends SearchListQuestionBase {
    constructor(private label: BlackListFilterEnum, private blacklistConfigKey : Options) {
        super(Config.getInstance().get<string[]>(blacklistConfigKey));
    }

    message = 'Retirer un élément à la blacklist : ' + this.label;

    onComplete(answers: { response: string }): Observable<any> {
        if (answers.response === '') return this.ask();
        else {
            const config = Config.getInstance();
            const blacklist = config.get<string[]>(this.blacklistConfigKey);
            const verifiedResponse = blacklist.find(b => b === answers.response);
            if (verifiedResponse === undefined) {
                console.log('Aucun élément de ce nom trouvé dans la blacklist.');
                return this.ask();
            } else {
                config.set(this.blacklistConfigKey, blacklist.filter(b => b !== answers.response));
                return new IndexBlacklistQuestion().ask();
            }
        }
    }
}
