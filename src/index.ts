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


    private checkForWin(): boolean {
        const winPatterns = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],

            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],

            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];
    
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            
            if (this.board[a[1]][a[0]] !== Player.NONE &&
                this.board[a[1]][a[0]] === this.board[b[1]][b[0]] &&
                this.board[a[1]][a[0]] === this.board[c[1]][c[0]]) 
            {
                console.log(`${this.board[a[1]][a[0]]} wins!`);
                return true;
            }
        }

        return false;
    }


    private checkForDraw(): boolean {
        if (this.board.flat().every(cell => cell !== Player.NONE)) {
            console.log("It's a draw!");
            
            return true;
        }

        return false;
    }


    private robotMove(): void {
        let availableMoves: [number, number][] = [];
        
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (this.board[y][x] === Player.NONE) {
                    availableMoves.push([x, y]);
                }
            }
        }

        if (availableMoves.length > 0) {
            const [x, y] = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            this.makeMove(x, y);
        }
    }


    private makeMove(x: number, y: number): void {
        if (this.board[y][x] === Player.NONE) {
            this.board[y][x] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
        }
    }


    private promptReplay(): void {
        console.log("Would you like to play again? (y/n)");
        
        this.rl.on('line', (input: string) => {
            switch (input.trim().toLowerCase()) {
                case 'y':
                    this.reset();
                    this.render();
                    
                    break;

                case 'n':
                    console.log("Thanks for playing!");
                    process.exit(0);

                    break;

                default:
                    console.log("Invalid option. Please enter 'y' or 'n'.");
            }
        });
    }


    private reset(): void {
        this.board = [
            [Player.NONE, Player.NONE, Player.NONE],
            [Player.NONE, Player.NONE, Player.NONE],
            [Player.NONE, Player.NONE, Player.NONE]
        ];
        this.currentPlayer = Player.X;
        this.cursorX = 0;
        this.cursorY = 0;
    }


    private showInstructions(): void {
        console.log("Welcome to Tic-Tac-Toe!");
        console.log("Use 'w', 'a', 's', 'd' to move the cursor.");
        console.log("Press 'e' to make a move.");
        console.log("Press 'q' to quit the game.");
        console.log();
    
        this.setup();
    }    
}



new TicTacToe();