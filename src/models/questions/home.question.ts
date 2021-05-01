import {IndexOptionsQuestion} from './options/index-options.question';
import {Observable, of} from 'rxjs';
import {OrderedSelectQuestionBase} from './base/ordered-select-question.base';
import {ShameListQuestion} from './shame-list.question';
import {RandomListQuestion} from './random/random-list.question';

export class HomeQuestion extends OrderedSelectQuestionBase {
    message = 'Que faire ?';

    choices = [
        {value: 'shame', name: 'Afficher la pile de la honte'},
        {value: 'random', name: 'Trouver un jeux dans la pile de la honte'},
        // TODO {value: 'list', name: 'Afficher les jeux'},
        {value: 'options', name: 'Modifier les options'},
        {value: 'quit', name: 'Quitter'}
    ]

    onComplete(answers: { option: string }): Observable<any> {
        if (answers.option === 'shame') return new ShameListQuestion().ask();
        else if (answers.option === 'random') return new RandomListQuestion().ask();
        else if (answers.option === 'options') return new IndexOptionsQuestion().ask();
        else if (answers.option === 'quit') {
            console.clear();
            console.log('A bientot !');
            setTimeout(() => {
                console.clear();
                process.exit()
            }, 1000)
            return of({})
        } else return this.ask();
    }
}
