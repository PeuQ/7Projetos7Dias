// INITIAL DATA
//copy of what's happening in the board
let board = // its an object.
{
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
    
};
// game data:
let player = '';
let warning = '';
let playing = false;

reset(); // blanks the board in script initialization

// EVENTS
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item=> // iterates every html element with the 'item' class.
    {
        item.addEventListener('click', itemClick); // executes itemClick over every item.
    });

// FUNCTIONS (auxiliam os eventos)
function reset()
{
    warning = '';
    
    let random = Math.floor(Math.random() * 2); // generates random number

    if (random === 0)
        player = 'x';
    else
        player = 'o';
// player = (random === 0) ? 'x' : 'o';

    for(let i in board)
    {
        board[i] = ''; // 'board.i' also works
    }

    playing = true;

    renderBoard();
    renderInfo();
}

// renderizes the blank board at program initialization, and after each turn
function renderBoard()
{
    for(let i in board)
    {
        //console.log("ITEM: ", i);
        let item = document.querySelector(`div[data-item=${i}]`); // if board[i] == ''
        item.innerHTML = board[i]; // if board[i] != ''
    }

    checkGame();
}

// renderizes the info below the board.
function renderInfo()
{
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function itemClick(event)
{
    let item = event.target.getAttribute('data-item');

    if(playing && board[item] === '')
    {
        board[item] = player;
        renderBoard();
        togglePlayer();
    }
}

// alternates between players.
function togglePlayer()
{
    if(player === 'x')  
        player = 'o';
    else
        player = 'x';
// player = (player === 'x') ? 'o' : 'x';

    renderInfo();
}

// checks the game victory conditions,
function checkGame()
{
    if(checkWinnerFor('x'))
    {
        warning = 'O "x" venceu!';
        playing = false;
    }
    else if(checkWinnerFor('o'))
    {
        warning = 'O "o" venceu!';
        playing = false;
    }
    else if(isFull())
    {
        warning = 'Deu empate!';
        playing = false;
    }
}

// checks for victory conditions of each player.
function checkWinnerFor(player)
{
    // all victory possibilities.
    let victoryPossibilities =
    [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    // making array of each possibility
    for(let j in victoryPossibilities)
    {
        let vicArray = victoryPossibilities[j].split(',');
        
        // veryfies if every part of the board is filled with 'x' or 'o'. / see function 'every' in JS documentation.
        let victory = vicArray.every(option => board[option] === player);

        if(victory)
            return true;
    }
    return false;
}

// checks for a Tie.
function isFull()
{
    for(let i in board)
    {
        if(board[i] === '')
            return false
    }
    
    return true;
}