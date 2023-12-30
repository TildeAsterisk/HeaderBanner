var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "black";
var ctx = canvas.getContext("2d");

function DrawFloor(){
  ctx.fillStyle = "darkgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw something on the canvas
DrawFloor();

class Character {
  constructor(name, health, attack, defense, speed, range, position, size, direction, colour, text, enemyTypes) {
    this.name           = name;
    this.text           = text;
    this.health         = health;
    this.attack         = attack;
    this.defense        = defense;
    this.speed          = speed;
    this.range          = range;
    this.position       = [position[0],position[1]];
    this.size           = size;
    this.colour         = colour;
    this.defaultColour  = this.colour;
    this.direction      = direction;
    this.focus          = undefined;
    this.enemyTypes     = enemyTypes;
  }

  DrawCharacter(){
    //Check if selected.
    if (UserData.selected==this){
      ctx.fillStyle = "lightgreen";
    }
    else{
      ctx.fillStyle = this.colour;
    }

    // Set font size and type
    const fontSize = this.size[0];
    ctx.font = `${fontSize}px Arial`;

    // Calculate the position to center the emoji inside the box
    const textWidth = ctx.measureText(this.text).width;
    const textHeight = fontSize; // Assuming the height of the emoji is the same as the font size

    const centerX = this.position[0] + (this.size[0] - textWidth) / 2;
    const centerY = this.position[1] + (this.size[1] + textHeight) / 2;

    // Use fillText to display emoji
    ctx.fillText(this.text, centerX, centerY);

    // Uncomment the following line if you still want to draw a rectangle around the emoji
    //ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);
  }

  isMouseOver(mouseX, mouseY) {
    return (
      mouseX >= this.position[0] &&
      mouseX <= this.position[0] + this.size[0] &&
      mouseY >= this.position[1] &&
      mouseY <= this.position[1] + this.size[1]
    );
  }

  SpawnCharacter() {
    // Initialization code here
    this.DrawCharacter();

    //Add isMouseOver event listener
    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.isMouseOver(mouseX, mouseY)) {
        //console.log("Mouse is over the character!");
        this.colour="lightgreen";
        this.DrawCharacter();
      }
      else{
        this.colour=this.defaultColour;
        player.DrawCharacter(); 
      }
    });

    canvas.addEventListener("click", (event) => {
      const rect   = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.isMouseOver(mouseX, mouseY)) {
        console.log("Mouse clicked on a character named "+this.name+".");
        UserData.selected=this;
        this.colour="lightgreen";
        player.DrawCharacter(); 
      }
      else{
        console.log("Nothing Selected.");
        UserData.selected=undefined;
        this.colour=this.defaultColour;
        player.DrawCharacter(); 
      }
    });

    //Push character to active spawned character list
    ActiveCharactersArray.push(this);
    //console.log("Character "+this.name+" initialized.");
  }

  //#region Movement Methods
  Movement_DVDBounce() {
    // Update position based on speed and direction
    this.position[0] += this.speed * Math.cos(this.direction);
    this.position[1] += this.speed * Math.sin(this.direction);

    // Bounce off walls
    if (this.position[0] < 0 || this.position[0] > canvas.width - this.size[0]) {
      this.direction = Math.PI - this.direction;
    }
    if (this.position[1] < 0 || this.position[1] > canvas.height - this.size[1]) {
      this.direction = -this.direction;
    }
  }
  generateRandomDestinationWithinRange() {
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = Math.random() * this.range * 2;

    // Calculate the random position within the specified radius
    const destinationX = this.position[0] + randomDistance * Math.cos(randomAngle);
    const destinationY = this.position[1] + randomDistance * Math.sin(randomAngle);

    return [destinationX, destinationY];
  }
  //#endregion
  Movement_MoveToTarget(target) {
    if (!target) {
      // No target, do nothing
      console.log("No Target to move to.");
      return;
    }

    // First, check to see if the character has reached the target
    const distanceToTarget = Math.sqrt(Math.pow(target.position[0] - this.position[0], 2) + Math.pow(target.position[1] - this.position[1], 2));
    if (distanceToTarget < (this.size[0]+5) ) {
      // The character is close enough to the target, consider it reached
      console.log(`${this.name} reached ${this.focus.name}! Distance: ${distanceToTarget}`);
      //if Character Focus is a random destination (wandering), reset focus
      if(this.focus.name.includes("Random Desination")){
        this.focus=undefined;
      }
      //Interract with target
      //this.Interact(target);
      return;
    }

    //Move to Target
    const angleToTarget = Math.atan2(target.position[1] - this.position[1], target.position[0] - this.position[0]);
    // Calculate the movement components
    const dx = this.speed * Math.cos(angleToTarget);
    const dy = this.speed * Math.sin(angleToTarget);
    // Calculate the new position
    const newPositionX = this.position[0] + dx;
    const newPositionY = this.position[1] + dy;

    // Check if the new position is within the canvas boundaries
    if (isPositionOnCanvas(newPositionX, newPositionY)) {
      // Update the character's position towards target
      this.position[0] = newPositionX;
      this.position[1] = newPositionY;
    } else {
      // Optionally handle the case where the new position is outside the canvas
      console.log("Character cannot move outside the canvas.");
      //reset focus
      this.focus=undefined;
    }

  }

  UpdatePosition(){
    // Check for nearby targets and set character focus
    if(this.focus=== undefined){
      this.focus = this.FindTargetInRange();
    }

    if(this.focus){
      //move to target#
      //console.log("Moving to target "+this.focus.name);
      //console.log(this.focus);
      this.Movement_MoveToTarget(this.focus);
    }
    else{
      //set temp desination focus
      //Random decision to tak
      if( [Math.round(Math.random()*5)] != 1){
        return;
      }
      var randomPos = this.generateRandomDestinationWithinRange();
      var tmpDestFocus = new Focus("Random Desination", [randomPos[0], randomPos[1]]);
      this.focus=tmpDestFocus;
      //console.log(this.focus);
      //console.log("moving to random");
      this.Movement_MoveToTarget(tmpDestFocus);
    }
    
  }

  FindTargetInRange() {
    const targets = ActiveCharactersArray.filter((target) => {
      // Exclude self
      if (target === this)  {
        return false;
      }
      //if enemytypes do not match exclude
      if (!target.name.includes(this.enemyTypes))  {
        return false;
      }

      // Calculate distance between characters
      const distance = Math.sqrt(
        Math.pow(target.position[0] - this.position[0], 2) +
        Math.pow(target.position[1] - this.position[1], 2)
      );

      // Check if the target is within range
      return distance <= this.range;
    });

    // Return the first target found, or null if no target is in range
    return targets.length > 0 ? targets[0] : null;
  }

  Interact(target){
    //if enemy then attack, if ally then group up
  }

  //END OF CHARACTER CLASS
}

class Focus {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
}

function RandomSpawnPoint(){
  return randomSpawn=[(Math.random()*canvas.width), (Math.random()*canvas.height)];
}

// Function to spawn a character at the clicked position
function spawnCharacterOnClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Create a new character at the clicked position
  const newCharacter = new Character(
    "Ally",
    basicStats.health,
    basicStats.attack,
    basicStats.defense,
    basicStats.speed,
    basicStats.range,
    [mouseX, mouseY], // Set position to the clicked coordinates
    basicStats.size,
    basicStats.direction,
    basicStats.colour,
    basicStats.text,
    basicStats.enemyTypes
  );

  // Spawn the new character
  newCharacter.SpawnCharacter();
}

function isPositionOnCanvas(x, y) {
  return x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height;
}

const basicStats = {
  health    : 100,
  attack    : 10,
  defense   : 5,
  speed     : 1,
  range     : 70,
  position  : [50,50],
  size      : [15,15],
  direction : 1,
  colour    : "black",
  text      : "😐",
  enemyTypes: "Enemy"
};
const enemybasicStats = {
  health    : 100,
  attack    : 10,
  defense   : 2,
  speed     : 1,
  range     : 70,
  position  : RandomSpawnPoint(),
  size      : [15,15],
  direction : 2,
  colour    : "darkred",
  text      : "😈",
  enemyTypes: "Ally"
};

const UserData={
  selected:undefined,
  building:false
}

//====~* START HERE *~====\\
var ActiveCharactersArray = [];
// Add a click event listener to the canvas to spawn a character on click
canvas.addEventListener("click", spawnCharacterOnClick);

//Spawn Characters
const player = new Character("Player", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, basicStats.position, basicStats.size, basicStats.direction, basicStats.colour,basicStats.text);
player.SpawnCharacter();

new Character("Ally1", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally2", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally3", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally4", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally1", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally2", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally3", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally4", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();

new Character("Enemy1", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy2", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy3", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy4", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy1", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy2", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy3", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy4", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();

/* will execture function once every tdelay ms
var tdelay = 100;
window.setInterval(function(){Main()}, tdelay);*/

function Main(){
  DrawFloor(); //Draw background

  //For each active character in game...
  ActiveCharactersArray.forEach(char => {
    //Update each character logic
    char.UpdatePosition();

    //Draw each character on screen
    char.DrawCharacter();
  });

}


var lastTime = performance.now();
var deltaTime = 0;
var interval = 16; // 60 fps

function gameLoop() {
  var now = performance.now();
  deltaTime += now - lastTime;
  lastTime = now;

  while (deltaTime >= interval) {
    // update the game state
    deltaTime -= interval;
  }

  Main();

  // render the game graphics
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

/* TO DO LIST: *\
- Character Combat

*/