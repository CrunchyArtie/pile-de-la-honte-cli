import {BoardgameRawLineInterface} from './boardgame-raw-line.interface';


export class BoardgameModel {

    public constructor(private line: BoardgameRawLineInterface) {
    }

    public get title(): string {
        return this.line.Titre;
    }

    public get gamme(): string {
        return this.line.Gamme;
    }


    public get univers(): string {
        return this.line.Univers;
    }

    public get type(): string {
        return this.line.Type;
    }

    public get ages(): string {
        return this.line['Age(s)'].replace('+', '');
    }

    public get language(): string {
        return this.line.Langues;
    }

    public get themes(): string {
        return this.line['Thème(s)'];
    }

    public get authors(): string {
        return this.line['Auteur(s)'];
    }

    public get illustrators(): string {
        return this.line['Illustrateur(s)'];
    }

    public get playersAvailable(): number[] {
        const rawCount = this.line['Joueur(s)'];

        if (rawCount === 'Solo') return [1];
        if (rawCount === 'Duo') return [2];
        if (rawCount[rawCount.length - 1] === '+') return [+rawCount.slice(0, rawCount.length - 1), -1]

        const [from, to] = rawCount.split(' — ');
        if (!from || !to) throw Error(JSON.stringify({from, to, game: this}));

        const result = [];
        for (let i = 0; i <= (+to - +from); i++) {
            result.push(+from + i)
        }
        return result;
    }

    public get categories(): string[] {
        return this.line['Catégorie(s)'].split(',');
    }

    /**
     * retourne tout les temps de jeux compris en le temps minimum et le temps maximum nécessaire pour jouer à ce jeu
     * @example
     *     //35-40
     *     [35, 36, 37, 38, 39, 40]
     */
    public get time(): number[] {
        const rawTime = this.line['Durée'];
        let [from, to] = rawTime.split(' — ');
        if (!from) throw Error(JSON.stringify({from, to, game: this}));
        if (!to) to = from;
        const result = [];
        for (let i = 0; i <= (+to - +from); i++) {
            result.push(+from + i)
        }
        return result;
    }


    public get rawTime(): string {
        return this.line['Durée'];
    }
}
