import * as readline from 'readline';



enum Player {
    NONE = ' ',
    X = 'X',
    O = 'O'
}



class TicTacToe {
    private board: Player[][] = [
        [Player.NONE, Player.NONE, Player.NONE],
        [Player.NONE, Player.NONE, Player.NONE],
        [Player.NONE, Player.NONE, Player.NONE]
    ];
    private currentPlayer: Player = Player.X;
    private cursorX: number = 0;
    private cursorY: number = 0;
    private rl: readline.Interface;


    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        this.setup();
    }


    private setup(): void {
        this.rl.on('line', (input: string) => this.handleInput(input));
        this.render();
    }
}