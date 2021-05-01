import {SearchListQuestionBase} from '../../base/search-list-question.base';
import {IndexBlacklistQuestion} from './index-blacklist.question';
import {Config, Options} from '../../../config';
import {Observable} from 'rxjs';
import {BlackListFilterEnum} from '../../../black-list-filter.enum';

export class AddBlacklistQuestion extends SearchListQuestionBase {
    constructor(private blacklistType: BlackListFilterEnum, private configBlacklistKey: Options, choices: string[]) {
        super(choices);
    }

    message = 'Ajouter un élément à la blacklist : ' + this.blacklistType;

    onComplete(answers: any): Observable<any> {
        const config = Config.getInstance();
        const verifiedResponse = this.choices.find(b => b === answers.response);
        const blacklist = config.get<string[]>(this.configBlacklistKey);
        const alreadyBlacklisted = blacklist.includes(answers.response);
        if (verifiedResponse === undefined) {
            console.log('Aucun élément de ce nom trouvé');
            return this.ask();
        } else if (alreadyBlacklisted) {
            console.log('L\'élément est déjà blacklisté');
            return this.ask();
        } else {
            blacklist.push(answers.response)
            config.set(this.configBlacklistKey, blacklist);
            return new IndexBlacklistQuestion().ask();
        }
    }
}
