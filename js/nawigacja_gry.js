/**
 * Created by Konrad on 2016-03-10.
 */
var $game = $('#game');
var $table;
var $row;
var $cell;
var board = [];

//1. tworzenie planszy do gry z zaznaczeiem komorki startowej:
function CreateTable(height, width) {
    $table = $('<table>');
    for (y = 0; y < height; y++) {
        $row = $('<tr>');
        for (x = 0; x < width; x++) {
            $cell = $('<td>');
            if (y == 0 && x == 0) {
                $cell.addClass('selectedCellNew selectedCell');
                //$cell.html('Ruszaj!');
            }
            $row.append($cell);
        }

        $table.append($row);
    }
    return $table;
}

$game.append(CreateTable(8, 8));

//2. podczepienie tablicy ze współrzędnymi pod planszę

//function initiateCells(size) {
//    board = new Array(size);
//    for (var x = 0; x < size; x++) {
//        board[x] = [];
//        for (var y = 0; y < size; y++) {
//            board[x][y] = {};
//        }
//    }
//    //
//    //board[3][4] = { player: 1 };
//
//}
//
//initiateCells(8);

//2. funkcja pobierająca wartości indexu/współrzędne dla kliniętej komórki
var $selectedCell = {
    row_index: 0,
    col_index: 0
};

function getIndexClick() {
    $table.on('click', 'td', function () {
        $selectedCell.row_index = $(this).parent().index();
        $selectedCell.col_index = $(this).index();
    });
}
getIndexClick();

function getIndexKeydown() {
    $selectedCell.row_index = $(this).first().parent().index();
    $selectedCell.col_index = $(this).first().index();
}
//getIndexKeydown.call(firstCell);

var currentCell = $('td').first();
var currrentRow = $('tr').first();


function interactiveMouse() {
    $table.on('click', 'td', function () {
        $(this).addClass('selectedCell');
        //firstCell.addClass('selectedCell');
        $score += 1;
        $playerScore.text('TWÓJ WYNIK TO:' + ' ' + $score + ' ' + 'pkt');
        $distance -= 1;
        $distanceBoard.text('ZOSTAŁO :' + ' ' + $distance + ' ' + 'km');
        //wywolaj funkcje ktora odejmie 1km od tablicy distance
    });
}
//interactiveMouse();
//getIndexKeydown();

//3. interaktywność dla ruchów klawiatury jesli nacisniesz strzalke to wykonaj ruch chyba ze dane miejsce ma juz klase selectedCell

//funkcja aktualizaujaca tablice z wynikami
function showScore() {
    $score += 1;
    $playerScore.text('TWÓJ WYNIK TO:' + ' ' + $score + ' ' + 'pkt');
    $distance -= 1;
    $distanceBoard.text('ZOSTAŁO :' + ' ' + $distance + ' ' + 'km');
// spr czy wartosc po lewej stronie == wartosc po prawej stronie
    if ($distance == 0) {
        $(document).off('keydown');
        alert('GAME OVER!');
    }
}

function interactiveKeyboard() {
    $(document).on('keydown', function (e) {
        e.preventDefault();

        if (e.keyCode == 39)  // right
        {
            var currentCellTmp = currentCell.next();
            if (currentCellTmp.length === 1 && !currentCellTmp.hasClass('selectedCell') ) {
                currentCell = currentCellTmp;
                $('.selectedCellNew').removeClass('selectedCellNew');
                currentCell.addClass('selectedCell selectedCellNew');
                showScore();
            }
        }

        else if (e.keyCode == 40) // down
        {
            var currentCellTmp = currentCell.parent().next().find('td:eq(' + currentCell.index() + ')');
            if (currentCellTmp.length === 1 && !currentCellTmp.hasClass('selectedCell')) {
                currentCell = currentCellTmp;
                $('.selectedCellNew').removeClass('selectedCellNew');
                currentCell.addClass('selectedCell selectedCellNew');
                showScore();
            }
        }

        else if (e.keyCode == 37) //left
        {
            var currentCellTmp = currentCell.prev();
            if (currentCellTmp.length === 1 && !currentCellTmp.hasClass('selectedCell')) {
                currentCell = currentCellTmp;
                $('.selectedCellNew').removeClass('selectedCellNew');
                currentCell.addClass('selectedCell selectedCellNew');
                showScore();
            }
        }

        else if (e.keyCode == 38)    //up
        {
            var currentCellTmp = currentCell.parent().prev().find('td:eq(' + currentCell.index() + ')');
            if (currentCellTmp.length === 1 && !currentCellTmp.hasClass('selectedCell')) {
                currentCell = currentCellTmp;
                $('.selectedCellNew').removeClass('selectedCellNew');
                currentCell.addClass('selectedCell selectedCellNew');
                showScore();
            }
        }

        if( currentCellTmp && currentCellTmp.length === 1 &&
            currentCellTmp.children().length > 0 ){
            var points = {targetImage_1: 10, targetImage_2: 5, targetImage_3: 10, targetImage_4: 20, targetImage_5: 40};
            $score += parseInt( points[ currentCellTmp.children().eq(0).attr('id') ] );
            currentCellTmp.children().eq(0).remove();

            $playerScore.text('TWÓJ WYNIK TO:' + ' ' + $score + ' ' + 'pkt');
        }
    });
}






