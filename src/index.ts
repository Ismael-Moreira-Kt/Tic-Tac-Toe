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


    private handleInput(input: string): void {
        switch (input.trim()) {
            case 'w':
                if (this.cursorY > 0) this.cursorY--;
                break;

            case 's':
                if (this.cursorY < 2) this.cursorY++;
                break;

            case 'a':
                if (this.cursorX > 0) this.cursorX--;
                break;

            case 'd':
                if (this.cursorX < 2) this.cursorX++;
                break;

            case 'e':
                this.makeMove(this.cursorX, this.cursorY);
                break;

            case 'q':
                process.exit(0);
                break;
        }

        this.render();
    }


    private render(): void {
        console.clear();
        console.log('  0 1 2');

        this.board.forEach((row, y) => {
            process.stdout.write(`${y} `);
            
            row.forEach((cell, x) => {
                if (x === this.cursorX && y === this.cursorY) {
                    process.stdout.write(`[${cell}]`);
                } 
                else {
                    process.stdout.write(` ${cell} `);
                }
                
                if (x < 2) process.stdout.write('|');
            });

            console.log();
            
            if (y < 2) console.log('  ---|---|---');
        });
        
        console.log(`Current Player: ${this.currentPlayer}`);
    }    
}