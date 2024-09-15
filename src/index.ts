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
}