# pile-de-la-honte-cli
A npm cli app built with typescript about not played boardgames.
You can list the unplayed games (by number of players and playing time) or simply ask to display a random number of unplayed games filtered according to your preferences.

## Things to know
- You need to download the boargame list csv and game records csv from https://www.myludo.fr/ `(Mon compte -> Exporter)` or create it manually.
- At launch, if no CSV file has already been given (it's the case at first use), the application will allow you to explore your file system to find them.
- A file will be created in your user's home direction named `.pile` used to save your config.

## Use it From everywhere
1. Install the npm package globally :
    - From everywhere
        ```shell
        npm install --global pile-de-la-honte
        ```

    - Or from local a folder
        ```shell
        git clone git@github.com:CrunchyArtie/pile-de-la-honte-cli.git
        cd pile-de-la-honte
        npm install && npm run build && npm instal --global
        ```

2. and execute it

    ```shell
    pile
    ```

## To contribute
### clone the repo locally and install dependencies 
    git clone git@github.com:CrunchyArtie/pile-de-la-honte-cli.git
    cd pile-de-la-honte
    npm install
### hot reload compilation and execution 
   ```shell
    npm run dev
   ```
   
### You can also :
- make a one time compilation :
    ```shell
    npm run build
    ```
- make a hot reload compilation but no execution (`tsc` must be in your `path`):
    ```shell
    tsc -w  
    ```

make your changes and create a pull request ;-)

### Keep in mind
Do not make request or anything else to directly call https://myludo.fr 

## TODO
- Create a shared "Continue ?" question.
- Automatize 'back' response questions.
- Filter boardgames from `BoardgameCollection` class.
- Standardize information display.
- Create an initialization class to prevent common errors.
- listen the args to override file config.
- add argument while executing to avoid the creation of the `.pile` file.
- add arguments to use the script bypassing the questions pattern.
- export the main intelligence to be used in other cases than a CLI app
- add tests, more comments and continuous integration

## License
MIT © 2021 CrunchyArtie
