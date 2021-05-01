import {homedir} from 'os';
import nconf from 'nconf';

export enum Options {
    collection = 'path.csv.collection',
    games = 'path.csv.games',
    boardgames = 'blacklist.boardgames',
    categories = 'blacklist.categories',
    types = 'blacklist.types',
    minTime = 'default.time.min',
    maxTime = 'default.time.max',
    gap = 'default.time.gap',
    minPlayers = 'default.players.min',
    maxPlayers = 'default.players.max',
    averageTime = 'default.time.average',
    count = 'default.count',
    version = 'version',
}

export class Config {
    private static instance: Config;

    private constructor() {
        nconf.file(homedir() + '/.pile'); // TODO gérer une execution --no-trace pour ne pas sauver de fichier.
        nconf.defaults({
            'version': '1',
            'path.csv.collection': '',
            'path.csv.games': '',
            'blacklist.boardgames': JSON.stringify([]), // ex: ['Age of Sigmar: Kharadron Overlords', 'Dirty Words', 'Villainous - La fin est proche !', 'Villainous - Mauvais jusqu\'à l\'os'],
            'blacklist.categories': JSON.stringify(['Jeu de rôle', 'Livre dont vous êtes le héros', 'Livre jeu']), // ex: ['Jeu de rôle', 'Livre dont vous êtes le héros', 'Livre jeu'],
            'blacklist.types': JSON.stringify(['extension', 'accessoire', 'goodie']), // ex: ['extension', 'accessoire', 'goodie']
            'default.time.min': 0,
            'default.time.max': 150,
            'default.time.gap': 15,
            'default.time.average': 20,
            'default.players.min': 1,
            'default.players.max': 6,
            'default.count': 5
        });
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    public get<T>(path: Options): T {
        const value = nconf.get(path);
        return value ? <T>JSON.parse(value) : value;
    }

    public set<T>(path: Options, value: T): void {
        nconf.set(path, JSON.stringify(value))
        nconf.save((err: Error) => {
            if (err) throw err
        });
    }

}
