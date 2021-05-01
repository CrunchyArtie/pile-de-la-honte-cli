import {Config, Options} from '../../config';
import fs from 'fs';
import {Observable, of} from 'rxjs';
import {FileTreeSelectionQuestionBase} from '../base/file-tree-selection-question.base';

export class InitCsvCollectionPathQuestion extends FileTreeSelectionQuestionBase {
    message = 'Quel est le chemin vers le CSV listant les jeux ?';

    onComplete(answers: { path: string }): Observable<any> {
        try {
            if (fs.existsSync(answers.path)) {
                Config.getInstance().set(Options.collection, answers.path);
                return of({})
            } else {
                console.log('chemin incorrect');
                return this.ask({clear: false})
            }
        } catch (e) {
            console.error(e);
            console.log('On réessaye ?')
            return this.ask({clear: false});
        }
    }
}
