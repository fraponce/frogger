


// Especifica lo que se debe pintar al cargar el juego
var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();
  Game.setBoard(3,new TitleScreen("Frog Game", 
                                  "Press space to start playing",
                                  playGame));
};

var playGame = function() {
  var base = new GameBoard();
  var board = new GameBoard();
  base.add(new fondo());
  var rana = new frog();

  board.add(new home());

  board.add(new CarSpawner(new car('car1',-48, Game.height/2, 70), 5));
  board.add(new CarSpawner(new car('truck2',Game.width, Game.height/2+53, -60), 7));
  board.add(new CarSpawner(new car('car3',-96, Game.height/2+(53*2), 60), 5));
  board.add(new CarSpawner(new car('car2',Game.width, Game.height/2+(53*4), -70), 5));
  board.add(new CarSpawner(new car('truck1',-48, Game.height/2+(53*3), 60), 7));

  board.add(new water(rana));

  board.add(new WoodSpawner(new wood('wood1',-142, Game.height/2-(53*2), 50, rana), 5));
  board.add(new WoodSpawner(new wood('wood2',Game.width, Game.height/2-(53*3), -55, rana), 7));
  board.add(new WoodSpawner(new wood('wood3',-142, Game.height/2-(53*4), 60, rana), 6));
  board.add(new WoodSpawner(new wood('leaf1',Game.width, Game.height/2-(53*5), -55, rana), 3));
  board.add(rana);
  Game.setBoard(2,base);
  Game.setBoard(3,board);

};

var winGame = function() {
  Game.setBoard(3,new TitleScreen("You win!", 
                                  "Press space to play again",
                                  playGame));
};

var loseGame = function() {
  Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press space to play again",
                                  playGame));
};


// Indica que se llame al método de inicialización una vez
// se haya terminado de cargar la página HTML
// y este después de realizar la inicialización llamará a
// startGame
window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});
