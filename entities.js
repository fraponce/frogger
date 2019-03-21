var sprites = {
 frog1: { sx: 0, sy: 340, w: 38, h: 43, frames: 3 },
 frog2: { sx: 38, sy: 330, w: 38, h: 43, frames: 3 },
 frog3: { sx: 76, sy: 333, w: 40, h: 48, frames: 3 },
 frog4: {  sx: 116, sy: 333, w: 40, h: 53, frames: 3 },
 frog5: {  sx: 156, sy: 333, w: 40, h: 56, frames: 3 },
 frog6: {  sx: 196, sy: 333, w: 40, h: 45, frames: 3 },
 frog7: {  sx: 236, sy: 333, w: 40, h: 40, frames: 3 },
 titulo: {sx: 0, sy: 390, w: 270, h: 170, frames: 3 },
 fondo: { sx: 500, sy: 0, w: 650, h: 650, frames: 3 },
 car1: { sx: 0, sy: 0, w: 100, h: 53, frames: 3 },
 car2: { sx: 111, sy: 0, w: 100, h: 53, frames: 3 },
 car3: { sx: 211, sy: 0, w: 100, h: 53, frames: 3 },
 truck1: { sx: 0, sy: 53, w: 145, h: 53, frames: 3 },
 truck2: { sx: 145, sy: 53, w: 200, h: 53, frames: 3 },
 wood1: { sx: 0, sy: 108, w: 200, h: 53, frames: 3 },
 wood2: { sx: 0, sy: 163, w: 265, h: 53, frames: 3 },
 wood3: { sx: 265, sy: 163, w: 150, h: 53, frames: 3 },
 leaf1: {sx: 0, sy: 216, w: 50, h: 56, frames: 3 },
 death: {sx: 145, sy: 53, w: 60, h: 53, frames: 3}
};

var OBJECT_PLAYER = 1,
    OBJECT_ENEMY = 2,
    OBJECT_TRUNK = 4,
    OBJECT_HOME = 8;

/// CLASE PADRE SPRITE
var Sprite = function()  
 { };

Sprite.prototype.setup = function(sprite,props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  this.w =  SpriteSheet.map[sprite].w;
  this.h =  SpriteSheet.map[sprite].h;
};

Sprite.prototype.merge = function(props) {
  if(props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
};
Sprite.prototype.draw = function(ctx) {
  SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
};

Sprite.prototype.hit = function(damage) {
  this.board.remove(this);
};

var fondo = function(){
  this.setup('fondo', {x:0 , y:0});
  this.w = Game.width;
  this.h = Game.height;
  this.step = function(dt){};
};

fondo.prototype = new Sprite();

// PLAYER

var water = function(rana){
  this.x =0;
  this.y=53;
  this.w=Game.width; 
  this.h=53*3;
  this.rana = rana;
  this.draw = function(dt){};
};
water.prototype = new Sprite();
water.prototype.type = OBJECT_ENEMY;
water.prototype.step = function(dt){
 
  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    this.hit();
  }
};

water.prototype.hit = function(){
  if(!this.rana.wood()){
     this.board.add(new death(this.x + this.w/2, 
                                   this.y + this.h/2));
  }
};

var wood = function(sprite,x,y, vel, rana){
  this.setup(sprite, { vx: 0, reloadTime: 0.75});
  this.ranita = rana;
  this.x = x;
  this.y = y;
  this.posInitial = x;
  this.vel = vel;
};
wood.prototype = new Sprite();
wood.prototype.type = OBJECT_TRUNK;

wood.prototype.step = function(dt) {
  this.vx = this.vel;
  this.x += this.vx * dt;
  if(this.posInitial == 0){
    if(this.x > Game.width) { 
      this.board.remove(this); 
    }
  }
  else if(this.posInitial == Game.width){
    if(this.x < (0-this.w)) { 
      this.board.remove(this);
    }
  }

  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    this.hit();
  }
};
wood.prototype.hit = function() {
  this.ranita.unwood(this.vx);
};

var frog = function() { 
  this.setup('frog1', { vx: 0, reloadTime: 0.25});

  this.reload = this.reloadTime;
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - this.h;
  this.time = 0;  
};

frog.prototype = new Sprite();
frog.prototype.type = OBJECT_PLAYER;

frog.prototype.step = function(dt) {
    this.time += dt;
    this.x += this.vx * dt;

    if(this.time > 0.100){
      if(Game.keys['left']) { this.x -= this.w; }
      else if(Game.keys['right']) { this.x += this.w; }
       else if(Game.keys['up']) { this.y -= this.h; }
        else if(Game.keys['down']) { this.y += this.h; }
         else { this.vx = 0; this.vy = 0 }
      this.time = 0;
    }

    if(this.x < 0 ) { this.x = 0; }
    else if(this.x > Game.width - this.w) { 
      this.x = Game.width - this.w;
    }
    if(this.y < 0 ) { this.y = 0; }
    else if(this.y > Game.height - this.h) { 
      this.y = Game.height - this.h;
    }
    var collisionTrunk = this.board.collide(this,OBJECT_TRUNK);
    if(collisionTrunk) {
      collisionTrunk.hit();
    }
    else{
      var collision = this.board.collide(this,OBJECT_ENEMY);
      if(collision) {
        this.hit();
        this.board.remove(this);
      }
    }
    this.vx = 0
  };

  frog.prototype.hit = function() {
    if(this.board.remove(this)) {
      this.board.add(new death(this.x + this.w/2, 
                                   this.y + this.h/2));
    }
  };

  frog.prototype.unwood = function(vwood){
    this.vx = vwood;
  };

  frog.prototype.wood = function(){
     var collisionTrunk = this.board.collide(this,OBJECT_TRUNK);
    return collisionTrunk;
  };

var car = function(sprite,x,y, vel){
  this.setup(sprite, { vx: 0, reloadTime: 0.75});
  this.x = x;
  this.y = y;
  this.posInitial = x;
  this.vel = vel;
};
car.prototype = new Sprite();
car.prototype.type = OBJECT_ENEMY;

car.prototype.step = function(dt) {

  this.vx = this.vel;
  this.x += this.vx * dt;

  if(this.posInitial == 0){
    if(this.x > Game.width) { 
      this.board.remove(this); 
    }
  }
  else if(this.posInitial == Game.width){
    if(this.x < (0-this.w)) { 
      this.board.remove(this);
    }
  }
};

car.prototype.hit = function() {
 // this.health -= damage;
  //if(this.health <=0) {
  if(this.board.remove(this)){
     this.board.add(new death(this.x + this.w/2, 
                                   this.y + this.h/2));
  }
};

var death = function(centerX,centerY) {
  this.setup('death', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

death.prototype = new Sprite();

death.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 4) {
    this.board.remove(this);
    this.finish();
  }

};

death.prototype.finish = function(){
  loseGame();
};

var home = function(){
  this.x =0;
  this.y=0;
  this.w=Game.width; 
  this.h=48;
  this.draw = function(dt){};
};

home.prototype = new Sprite();
home.prototype.type = OBJECT_HOME;
home.prototype.step = function(dt){
 
  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    winGame();
  }
};

home.prototype.hit = function(){
  if(!this.rana.wood()){
     this.board.add(new death(this.x + this.w/2, 
                                   this.y + this.h/2));
  }
};


var Spawner = function (){
  this.time = 0;

};

Spawner.prototype.draw = function(){};
Spawner.prototype.step = function(dt){
  this.time += dt;

  if (this.time >= this.spawnerTime){
    this.time = 0;
    this.board.addInitial(this.getObj());
  }


};


var CarSpawner = function(prototype, time){
  this.spawnerTime = time;

  this.getObj = function(){
    var coche = new car(prototype.sprite,prototype.x, prototype.y, prototype.vel);
    coche.type=prototype.type;
    return coche;

  };

};
CarSpawner.prototype = new Spawner();

var WoodSpawner = function(prototype, time){
  this.spawnerTime = time;

  this.getObj = function(){
    var tronco = new wood(prototype.sprite,prototype.x, prototype.y, prototype.vel, prototype.ranita);

    tronco.type=prototype.type;

    return tronco;
  };

};

WoodSpawner.prototype = new Spawner();