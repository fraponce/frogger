# frogger
segunda practica DVI

3.1 Escenario de fondo

Sustituye la carga del archivo de sprites del Galaga por el del Frogger (esto se hace en
la clase SpriteSheet del motor). A continuación configura correctamente la variable
sprites que aparece al principio de game.js para que cargue los sprites del Frogger.

Haz que se comience ejecutando el método playGame (en lugar de comenzar por el
startGame) para evitar la pantalla de título e ir directamente al juego. Finalmente crea
en el método playGame una primera capa (GameBoard) que tan solo contenga un sprite
con la imagen de fondo. Para ello, crea un objeto que hereda de Sprite y que lo único
que haga sea dibujar la imagen del fondo.

3.2 Movimiento de la rana

Crea la clase que Frog, que hereda de Sprite. Implementa su método step, que hace
que la rana se mueva en las cuatro direcciones de manera discreta, es decir, moviéndose
exactamente una casilla en la dirección indicada por el jugador (cada casilla es de 40x48,
ya que el sprite de la rana tiene esas dimensiones). Añade las teclas Arriba (38) y
Abajo (40) a las teclas que el motor controla. No es necesario que la rana se mueva de
manera fluida sino que basta con que se mueva a “saltos” (de casilla en casilla). Controla
también que no se salga de los límites del escenario (el tamaño del juego está disponible
en la clase Game).

Por último, crea en el playGame una segunda capa en la que se va a desarrollar el juego
(distinta de la del fondo del juego) y añade a ésta la rana.

3.3 Coches

Crea la clase Car, que hereda de Sprite y que hace que un coche se mueva en una
dirección, en una fila, de un extremo al otro de la pantalla. Crea esta clase de modo
que puedas crear coches con distinto aspecto, que se mueven en sentidos distintos, en
distintas filas y a distinta velocidad. Haz que los coches se eliminen de la capa al salir
por los bordes de pantalla (recuerda que los límites del juego están en la clase Game).
Añade algunos coches a la capa en la que está la rana para comprobar que se mueven
adecuadamente.

3.4 Colisiones

Haz que la rana sea eliminada de la capa al ser atropellada por un coche comprobando
las colisiones entre los coches y la rana. No es necesario crear ningún tipo de animación
en este momento.

3.5 Troncos

Crea la clase Trunk, que hereda de Sprite, para representar los troncos que hay en la parte
superior de la pantalla. Su comportamiento básico será similar al implementado para los
coches. Añade varios troncos a la capa del juego para poder probar el funcionamiento
de los troncos.

Posteriormente, haz que la rana se desplace a la misma velocidad y en la misma dirección
que el tronco si la rana está colisionando con el tronco. Para implementar esto puedes
hacer lo siguiente:

1. Añade una velocidad horizontal vx a la rana. Inicialmente vale 0 pero tenla
siempre en cuenta a la hora de actualizar la posición de la rana en el método step.

2. Añade un método onTrunk (vt) a la rana que será llamado cuando el tronco
colisiona con la rana. Este método cambiará la velocidad horizontal de la rana y
la pondrá al valor del tronco. Así, la rana se desplazará horizontalmente al estar
sobre el tronco.

3. El sistema de colisiones es muy rudimentario por lo que no tenemos forma de
saber cuándo la rana ha dejado de colisionar con el tronco (y, por tanto, poner
su vx a 0). En este caso, la rana se seguirá desplazando aunque se haya bajado
del tronco. La forma más sencilla de arreglar este problema es inicializar a 0 vx
siempre al final del step.

Si la rana aparece pintada por debajo del tronco cambia el orden en el que los añades a
la capa. Tendrás que tener en cuenta esto un poco más adelante.

3.6 Hojas

Crea las hojas (leafs) de forma similar a los troncos. Aquí puedes utilizar el
tronco como prototipo o utilizar algún tipo de blueprint.

3.7 Agua

Crea la clase Water, que hereda de Sprite, que hace que la rana muera al colisionar con
esta franja de agua (similar a lo implementado para los coches). Puedes reimplementar
su método draw para que no dibuje nada (es decir, que sea un sprite invisible)
Haz que la rana no muera si está sobre un tronco. Para ello puedes hacer algo similar a
lo realizado con la velocidad horizontal de la rana cuando está sobre el tronco. ¡Cuidado!
El orden en el que los objetos se añaden a la escena (agua, troncos y rana) afectan a la
correcta ejecución de este apartado.

3.8 Animación de muerte

Crea la clase Death, que hereda de Sprite y que representa un sprite animado que
aparece en el lugar en el que la rana ha muerto (similar a las explosiones del juego
original).

3.9 Menús y condiciones de finalización

Crea la pantalla de títulos inicial (usando la clase TitleScreen que proporciona el
motor), con el título del juego y que nos indique qué tecla hay que pulsar para empezar
en el método startGame. Vuelve a cambiar el método Game.initialize para que ahora
el juego comience ejecutando el startGame.

Crea otra pantalla de títulos para mostrar el final del juego cuando la rana muere (hemos
perdido la partida).

Finalmente, crea una clase Home (similar a Water) que representa la meta a la que tiene
que llegar la rana (situada en la parte superior de la pantalla. Este objeto mostrará una
pantalla de títulos indicando que hemos ganado la partida cuando la rana colisione con
ella.

Haz que desde las pantallas de fin de partida podamos volver a comenzar una nueva
partida. Como recomendación para implementar esto modificad el motor (engine.js)
de modo que podamos tener inicialmente todas las capas (GameBoard) creadas y que las
podamos activar y desactivar cuando queramos. Una capa desactivada no ejecutará ni
su método step ni su método draw.

3.10 Generadores de coches y troncos

Para hacer un nivel completo y tener la forma de crear múltiples niveles con distintos
coches y troncos vamos a crear una clase Spawner que contiene la lógica para crear
coches o troncos en una determinada fila del juego. Haz que este objeto se pueda
configurar para que genere coches o troncos con unas determinadas características y a
una frecuencia de creación fija.

Para ello os recomendamos que utilicéis un patrón Prototype. El Spawner es inicializado
con un objeto prototípico (un Trunk o un Car) que iremos clonando 1 y añadiendo a la
capa del juego con una determinada frecuencia. Recuerda que no debes usar el método
setInterval para decidir cuándo clonar el objeto prototipo.

Utilizando los Spawners verás que la rana se dibuja por debajo de los troncos cuando
están encima de ellos. Esto se debe a que los sprites se dibujan en el orden en el que se
añaden en la capa (GameBoard) y los objetos creados por el Spawner se añaden después
de la rana (que se creó al principio). Para resolver este problema puedes implementar
alguna de las siguientes alternativas:

• Modifica el motor para que se pueden añadir objetos “al principio” de la lista de
objetos de una capa. De esta forma, los que están al principio se dibujarán antes.

• Modifica el motor para que los Sprites tengan un zIndex. Los sprites se ordenarán
en la capa de acuerdo a este zIndex, de modo que se pintarán antes los que tengan
un valor de zIndex menor.
