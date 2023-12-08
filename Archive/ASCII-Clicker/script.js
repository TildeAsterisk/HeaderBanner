//#region ASCII ART
//UTF-8 SYMBOLS

var combat_hp_bars_ASCII = `<div style="display:inline-block;">
<span style="white-space: pre;">Player<br><span style="background-color:#00FF41;">`+"                    "+`</span><span style="background-color:red;"></span>`+""+`</span>
</div>
<div style="display:inline-block;"><span style="white-space: pre;">Combat Target<br><span style="background-color:#00FF41;">`+"          "+`</span><span style="background-color:red;">`+"          "+`</span></span>
</div>`;
var score_and_button_clicker_ASCII=`<div id="score">0.00&#442</div>
<button id="clicker">Click!</button>`;
var top_bar_ASCII = score_and_button_clicker_ASCII;

var navbarASCII=`+--------------------------------------------+
`+`|<span class="navbar-btn1">        </span>|`+`<span class="navbar-btn2">        </span>|`+`<span class="navbar-btn3">        </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
`+`|<span class="navbar-btn1">  Home  </span>|`+`<span class="navbar-btn2">  Inv   </span>|`+`<span class="navbar-btn3">  Map   </span>|`+`<span class="navbar-btn4">  Shop  </span>|`+`<span class="navbar-btn5">   ???  </span>|`+`
`+`|<span class="navbar-btn1">        </span>|`+`<span class="navbar-btn2">        </span>|`+`<span class="navbar-btn3">        </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
+--------------------------------------------+`;

var currency_symbol = `<span>&#8859;</span>`;

var homeHTMLContent = `|_| _ __  _                
| |(_)|||(/_`;
var inventoryHTMLContent = `___                        
 | __     _ __ _|_ _  __ \\/
_|_| |\\_/(/_| | |_(_) |  / 
`;
var mapHTMLContent = `       _
|V| _ |_)
| |(_||`;
var shopHTMLContent = ` __       _
(_ |_  _ |_)
__)| |(_)|`;

var medium_shade_block_ASCII_char = `&#9618;`;

var game_character_symbol_dict = {
  // name : symbol
  "Player" : "o",
  "Box" :  "&#726372;"
};
// #endregion

// #region variable declarations
//Element Variables
var scoreElem=document.getElementById("score");
var clickerBtn=document.getElementById("clicker");
var gameScreenElem = document.getElementById("div0");
var gameTerminalText = document.getElementById("div1");

// ~~* TOP BAR *~~ \\
var topBarElem = document.getElementById("top-bar");
topBarElem.innerHTML=top_bar_ASCII;

// ~~* NAVBAR *~~ \\
var navBar=document.getElementById("nav-bar");
navBar.innerHTML=navbarASCII;
var navbtn1List = document.querySelectorAll(".navbar-btn1");
var navbtn2List = document.querySelectorAll(".navbar-btn2");
var navbtn3List = document.querySelectorAll(".navbar-btn3");
var navbtn4List = document.querySelectorAll(".navbar-btn4");

// ~ ~ ~ * GAME VARIABLES * ~ ~ ~ \\
var score = 0;
var shopItemList = [
    //Name, Price, ScoreMultiplier
    ['Mechanical arm',100,1.5],
    ['Plunger',5,1.1],
    ['Pile of rocks',1,1.1],
    ['Pebbles',5,1.1],
    ['Hammer',10,1.1],
    ['Mallet',10,1.1],
    ['Rubber chicken',3,1.1],
    ['Robotic finger',80,1.2],
    ['Laser pointer',10,1.1],// or other light-based tool
    ['Suction cup',10,1.1], //or other adhesive device
    ['Pair of nunchucks',30,1.2], // or other martial arts weapon
    ['Pile of sticks',1,1.1],// or other kindling material
    ['Laser beam',10,1.1],
    ['Telekinesis',100,1.2],
    ['VR interface',300,1.2],
    ['Neural implant',99,1.4],
    ['Mini Drone',50,1.3],
    ['Sonic pulse',99,1.4],
    ['Hardlight projection',99,1.5],
    ['BMI Neuralink',999,2],
    ['Gravity field gen',999,2],
    ['magical clicking wand',10,1.1],
    ['team of trained clicker-monkeys',10,1.1],
    ['Finger Machine',10,1.1],
    ['Interdimensional Clone',10,1.1],
    ['Trained Monkey',10,1.1],
    ['Trained Dog',10,1.1],
    ['Trained Bearded Dragon',10,1.1],
    ['Trained Fox',10,1.1],
    ['Trained Cat',10,1.1],
    ['Cat',10,1.1],
    ['Click Portal',10,1.1],
    ['Army of drones',10,1.1],
    ['Time machine',10,1.1],
    ['Genie click wish',10,1.1],
    ['Mechanical clicker',10,1.1],
    ['Clicking potion',10,1.1],
    ['Fast-moving cursor',10,1.1],
    ['Holographic clicker',10,1.1],
    ['Clicking spell',10,1.1],
    ['Super-powered finger',10,1.1],
    ['Clicking automation',10,1.1],
    ['Time-loop clicking',10,1.1],
    ['Clicking clone army',10,1.1],
    ['Button-mashing robot',10,1.1],
    ['Clicking aura',10,1.1],
    ['Instantaneous clicking',10,1.1],
    ['Clicking miracle',10,1.1],
    ['Clicking vortex',10,1.1],
    ['Clicking frenzy',10,1.1],
    ['Clicking frenzy spell',10,1.1],
    ['Clicking charm',10,1.1],
    ['Infinite clicking power',10,1.1],
    ['Arcane clicking power',10,1.1],
    ['Clicking god mode',10,1.1],
    ['Clicking god mode spell',10,1.1],
    ['Clicking force field',10,1.1],
    ['Clicking god mode aura',10,1.1],
    ['Clicking god mode potion',10,1.1],
    ['Mechanical clicking device',50,1.5],
    ['Electric button presser',100,1.1],
    ['Robotic button masher',150,1.1],
    ['High-speed clicking machine',200,1.1],
    ['Superpowered clicking gloves',250,1.5],
    ['Hyperclicking boots',300,1.1],
    ['Ultra-efficient clicking belt',350,1.5],
    ['Infinite clicking staff',400,1.0],
    ['Magical clicking wand',450,1.5],
    ['Divine clicking hammer',500,1.0],
    ['Automated clicking robot',550,1.5],
    ['Hyperspace clicking portal',600,1.0],
    ['Temporal clicking accelerator',650,1.75],
    ['Gravity-defying clicking boots',700,1.80],
    ['Supercomputer-assisted clicking device',750,1.85],
    ['Quantum clicking machine',800,1.90],
    ['Interdimensional clicking portal',850,1.95],
    ['Multiversal clicking staff',900,1.100],
    ['Cosmic clicking gloves',950,1.105],
    ['Divine clicking hammer',1000,1.110]
  ];
var inventory = [];
var inventoryItemList = [];

//revised item system, classes, object, methods

class game_character_object{
  constructor(name,lore,position,health,attack,defence){
    this.name = name;
    this.lore = lore;
    this.position = position;
    this.health = health;
    this.max_health = health;
    this.attack = attack;
    this.defence = defence;
    this.equippedWeaponItem = {};
    this.id=NewGameObjIndex();
  }
  SpawnGameObj(spawnpos){
    //Set random position
    var spawnpos = [Math.floor(Math.random() * yrange), Math.floor(Math.random() * xrange)];
    this.position[0] = spawnpos[0];
    this.position[1] = spawnpos[1];
    //Add to active objs list
    active_game_objs.push(this);
    console.log("Spawning Game Object:\n"+this.name+this.id+"\nPos: "+this.position);
    return this.position;
  }
  AttackObject(target){
    target.health -= this.attack;
    if(target.health<=0){
      var deadname=this.name;
      target.Die();
      setTimeout(function() {
        if(!writing){terminal(gameTerminalText,deadname+" has killed "+target.name+".",false);}
    }, 700 );
    GenerateTopBarHTMLElem("nocombat");
    var returnstring="killed";
    }
    //update combat GUI window
    GenerateTopBarHTMLElem(target);
    return returnstring;
  }
  Die(){
    //find id in active game obj list
    if(!writing){terminal(gameScreenArray,this.name+","+this.id+" has been destroyed.",false);}
    var tmptxt="";
    active_game_objs.forEach(gameObject => {
      tmptxt+=gameObject.name+":"+gameObject.id+",";
      if(gameObject.id == this.id){
        console.log("Destroying "+this.name+" GameObjID: "+this.id);
        active_game_objs.splice(active_game_objs.indexOf(gameObject.name),1);

        //spawn new one before destroying
        new game_character_object("Box",null,[0,0],15,0,1).SpawnGameObj();

        RedrawGameScreen();
      }

    });
    console.log("ActiveGameObjs:\n"+tmptxt);
  }
}

class game_item{
  constructor(name,price,damage,damage_type,addpts){
    this.name = name;
    this.price = price;
    this.damage = damage;
    this.damage_type = damage_type,
    this.addpts = addpts;
  }
}

/*
{
  //[y,x]
  name:"Player",
  position:[18,0],
  health:100,
  attack:5,
  equippedWeaponItem:{}
}
*/

//Name, Price, damage, damagetype, defence, addpts
var playerItemList = [
  new game_item("Stick",10,0.5,"melee",null),
  new game_item("Sling",25,1.5,"ranged",null)
];

//working list to store entities active in game
var ActiveGameObjIndexCounter = 0;
var active_game_objs = [];

var playerCharacterStats = active_game_objs[0];

const yrange = 20;
const xrange = 80;
var gameScreenArray = Array2DConstructor();

// #endregion

// #region Functions
function UpdateScoreElementHTML(){
  //score_and_button_clicker_ASCII=`<div id="score">`+score.toFixed(2)+`&#442</div><button id="clicker">Click!</button>`;
  //topBarElem.innerHTML=score_and_button_clicker_ASCII;
  GenerateTopBarHTMLElem();
}

// 0 = Home, 1 = Inventory, 2 = Map
function NavBarSelect(dest){
  var navBtnsColours = ["","","","",""];
  switch (dest){
    case 0:
      //Go to Home
      // Show selected in navbar
      navBtnsColours[0]="#333333";
      navBtnsColours[1]="initial";
      navBtnsColours[2]="initial";
      navBtnsColours[3]="initial";
      // Write to gametext element
      terminal(gameTerminalText,"Home");
      gameScreenElem.innerHTML=GenerateGameDisplayFromArray(gameScreenArray);
      gameScreenElem.onclick = function (){/* Do nothing */};
      //playanim
      //var anim1 = ASCIIAnimation(animArray1, 200, gameScreenElem);
      break;
    case 1:
      //show Inventory      
      navBtnsColours[0]="initial";
      navBtnsColours[1]="#333333";
      navBtnsColours[2]="initial";
      navBtnsColours[3]="initial";
      terminal(gameTerminalText,"Inventory");
      GenerateInventoryElementHTML();
      //gameScreenElem.innerHTML=inventoryHTMLContent;
      break;
    case 2:
      //Map
      navBtnsColours[0]="initial";
      navBtnsColours[1]="initial";
      navBtnsColours[2]="#333333";
      navBtnsColours[3]="initial";
      terminal(gameTerminalText,"Atlas");
      gameScreenElem.innerHTML=mapHTMLContent;
      break;
  case 3:
    //Shop
    navBtnsColours[0]="initial";
    navBtnsColours[1]="initial";
    navBtnsColours[2]="initial";
    navBtnsColours[3]="#333333";
    terminal(gameTerminalText,"Shop");
    GenerateShopElementHTML();
    gameScreenElem.onclick=function(){
      if(score>=shopItem[1]){
        BuyItem();
        GenerateShopElementHTML();
        UpdateScoreElementHTML();
      }
      else{
        if(!writing) {terminal(gameTerminalText,"You don't have enough mate, sorry.");}
      }
    };
    break;
  }
  navbtn1List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[0];
    spantag.style.cursor = "pointer";
  });
  navbtn2List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[1];
    spantag.style.cursor = "pointer";
  });
  navbtn3List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[2];
    spantag.style.cursor = "pointer";
  });
    navbtn4List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[3];
    spantag.style.cursor = "pointer";
  });
}

var writing = false;
function terminal(gameTextElement, txt, printSpeed,clear) {
  var gameTextElement = gameTextElement || gameTerminalText;
  var clear = clear || true;
  if(clear){gameTextElement.innerHTML = "";}
  else{gameTextElement.innerHTML+="\n";}
  var txt = txt || [notes[0].intro, notes[0].que].join('\n').split('');
  var printSpeed = printSpeed || 20;
  var i = 0;
  (function display() {
    if(i < txt.length) {
      writing=true;
      //minigameElement.onclick = function (){/* Do nothing */};
      gameTextElement.innerHTML += txt[i].replace('\n', '<br />');
      ++i;
      setTimeout(function() {
        display();
      }, printSpeed);
    }
    else{
      writing=false;
      //terminalbuffertxt="";
      //minigameElement.onclick = function (){ terminal(gameTextElement, txt, printSpeed);  }
    }
   })
  ();
}

function ASCIIAnimation(animArray, speed, DOMtarget) {
  var currentFrame = 0;
	for(var i = 0; i < animArray.length; i++) {
		animArray[i] = animArray[i].replace(/ /g,"&nbsp;");
		//animArray[i] = "<pre>" + animArray[i] + "</pre>";
    animArray[i] = animArray[i];
	}
	DOMtarget.innerHTML = animArray[0];
	currentFrame++;
	this.animation = setInterval(function() {
		DOMtarget.innerHTML = animArray[currentFrame];
		currentFrame++;
		if(currentFrame >= animArray.length) currentFrame = animArray.length-1;
	}, speed);
	this.getCurrentFrame = function() {
		return currentFrame;
	}
}
ASCIIAnimation.prototype.stopAnimation = function() {
	clearInterval(this.animation);
}

function GenerateShopElementHTML(){
  //Generate a new item in the shop
  shopItem=shopItemList[Math.floor(Math.random() * shopItemList.length)];
  shopItemOutput_ASCII = `
+--------- - - - - -
| Buy:
| `+shopItem[0]+`
| `+shopItem[1]+`<span>&#442;</span> `+shopItem[2]+currency_symbol+`
+--------- - - - - -`;
  shopItemOutput_ASCII = "<span style='cursor:pointer;'>"+shopItemOutput_ASCII+"</span>";
  //add shop title to shop item
  return gameScreenElem.innerHTML=shopHTMLContent+shopItemOutput_ASCII;
}

function BuyItem(){
  score = score-shopItem[1];
  //store item in inventory
  inventory.push(`<br>`+shopItem[0]);
  inventoryItemList.push(shopItem);

  terminal(gameTerminalText, "You bought the "+shopItem[0]+".");
}

function GenerateInventoryElementHTML(){
  
  if (inventory.length==0){
    return gameScreenElem.innerHTML=inventoryHTMLContent+`========================`+inventory+`<br> . . .`;
  }

  return gameScreenElem.innerHTML=inventoryHTMLContent+`========================`+inventory+`<br>========================<br>`+CalculateTotalAutoPoints().toFixed(2)+currency_symbol;
}

function GenerateMainElementHTML(){
  return gameScreenElem.innerHTML=homeHTMLContent;
}

function CalculateTotalAutoPoints(){
  var autopoints=1;
  for (i in inventoryItemList){
    autopoints += inventoryItemList[i][2];
  }
  return autopoints;
}

function Array2DConstructor(){
  let arr = new Array(yrange); // create an empty array of length n
  for (var x = 0; x < yrange; x++) {
    arr[x] = new Array(xrange).fill(medium_shade_block_ASCII_char); // make each element an array
  }
  //console.log(arr);
  return arr;
}

function GenerateGameDisplayFromArray(screenArray){
  var output_txt="";
  var tempScreenArray = screenArray;
  for(var x=0;x<tempScreenArray.length;x++){
    tempScreenArray[x][xrange+1]="<br>";
    output_txt+=tempScreenArray[x].join("");
  }
  return output_txt;
}

//Move character on plane
function CharacterMovement(move_vector){
  if( 
    playerCharacterStats.position[0] + move_vector[0] >= 0 && (playerCharacterStats.position[0] + move_vector[0] < yrange) &&
    playerCharacterStats.position[1] + move_vector[1] >= 0 && (playerCharacterStats.position[1] + move_vector[1] < xrange)
    )
  {
    playerCharacterStats.position[0] += move_vector[0];
    playerCharacterStats.position[1] += move_vector[1];
    //console.log("Moved to ",playerCharacter.position);
  }
  else{
    console.log("You cannot move off the screen "+playerCharacterStats.position);
  }
  
  RedrawGameScreen();
}

function RedrawGameScreen(){
  //Draw Background
  for (var x = 0; x < yrange; x++) {
    gameScreenArray[x].fill(medium_shade_block_ASCII_char); // make each element an array
  }
  //Draw each active object
  active_game_objs.forEach(entity => {
    //draw entity at position
    gameScreenArray[entity.position[0]] [entity.position[1]] = game_character_symbol_dict[entity.name];
    //draw character from object dict { name:"symbol" }
  });
  //gameScreenArray[playerCharacterStats.position[0]] [playerCharacterStats.position[1]] = game_character_symbol_dict["Player"]; //stick figure &#129989;
  gameScreenElem.innerHTML=GenerateGameDisplayFromArray(gameScreenArray);
}

function PlayerAction(){
  //attack
  switch (playerCharacterStats.equippedWeaponItem.damage_type){
    case "melee":
      //Play Melee attack anim
      PlayMeleeAnim();
      break;
    case "ranged":
      //Shoot projectile
      break;
    default:
      //play melee attack anim
      PlayMeleeAnim();
  }

  //interact or Attack with item in range
  active_game_objs.forEach(gameObj => {
    //Interact

    //Attack
    var attackposcoords = [ [playerCharacterStats.position[0],playerCharacterStats.position[1]+1] , [playerCharacterStats.position[0],playerCharacterStats.position[1]-1]];
    attackposcoords.forEach(hitbox => {
      if(hitbox[0] == gameObj.position[0] && hitbox[1] == gameObj.position[1]){
        //Target found, attack gameObj
        if(playerCharacterStats.AttackObject(gameObj)=="killed"){
          score+=10;
        }
        if(!writing){terminal(gameTerminalText, "You attack the "+gameObj.name+".\n"+gameObj.name+" Health:"+gameObj.health,20,false);}
        console.log("You attack the "+gameObj.name+".\n"+gameObj.name+" Health:"+gameObj.health);
      }
    });
  });
}

function PlayMeleeAnim(){
  //get player coords
  var playerPosyx = playerCharacterStats.position;
  //Store char behind melee anim to replace when done
  var behindchar = gameScreenArray[playerPosyx[0]][playerPosyx[1]+1];
  //Display attacking symbol
  gameScreenArray[playerPosyx[0]][playerPosyx[1]+1]="/";
  gameScreenArray[playerPosyx[0]][playerPosyx[1]-1]="\\";
  //Reset symbol back to background
  setTimeout(function(){
    //update screen
    RedrawGameScreen();
  },500);
  gameScreenElem.innerHTML=GenerateGameDisplayFromArray(gameScreenArray);
}

function NewGameObjIndex(){ActiveGameObjIndexCounter+=1;return ActiveGameObjIndexCounter-1;}

function GenerateHPBarsASCII(gameObject){
  var hpbarmaxlength=20;
  var greenHPbartxt="";
  //Generate hp bars
  for(var i = 0;i<((gameObject.health/gameObject.max_health)*20).toFixed();i++){
    greenHPbartxt+=" ";
  }
  var redHPbartxt="";
  for(var i = 0;i<(hpbarmaxlength-((gameObject.health/gameObject.max_health)*20)).toFixed();i++){
    redHPbartxt+=" ";
  }
  var out = [greenHPbartxt,redHPbartxt];
  //console.log(gameObject.name,(gameObject.health/hpbarmaxlength).toFixed(),(hpbarmaxlength-gameObject.health).toFixed());
  return out;
}

function GenerateTopBarHTMLElem(targetObj){
  var targetObj = targetObj || null;
  score_and_button_clicker_ASCII=`<div id="score">`+score.toFixed(2)+`&#442</div>
<button id="clicker">Click!</button>`;
  switch(targetObj){
    case(null):
    return;
    case("nocombat"):
      console.log("combat ended");
      break;
    default:
      combat_hp_bars_ASCII = `
  <div style="display:inline-block;">
    <span style="white-space: pre;">Player<br><span style="background-color:#00FF41;">`+GenerateHPBarsASCII(playerCharacterStats)[0]+`</span><span style="background-color:red;">`+GenerateHPBarsASCII(playerCharacterStats)[1]+`</span></span>
  </div>
  <div style="display:inline-block;">
  <span style="white-space: pre;">`+targetObj.name+targetObj.id+`<br><span style="background-color:#00FF41;">`+GenerateHPBarsASCII(targetObj)[0]+`</span><span style="background-color:red;">`+GenerateHPBarsASCII(targetObj)[1]+`</span></span>
  </div>`;
    top_bar_ASCII = combat_hp_bars_ASCII+" |  "+score_and_button_clicker_ASCII;
    topBarElem.innerHTML=top_bar_ASCII;
    }
}

//#endregion ~~~* End of functions *~~~

//~~~* MAIN LOOP *~~\\
function Main(){
  score+=CalculateTotalAutoPoints();
  UpdateScoreElementHTML();
}

// ~~~* INITIALIZE *~~~ \\
//Set onclick function for each spantag of id in navbar
navbtn1List.forEach(navbtn => { navbtn.onclick = () => NavBarSelect(0); });
navbtn2List.forEach(navbtn => { navbtn.onclick = () => NavBarSelect(1); });
navbtn3List.forEach(navbtn => { navbtn.onclick = () => NavBarSelect(2); });
navbtn4List.forEach(navbtn => { navbtn.onclick = () => NavBarSelect(3); });

clicker.onclick= function (){
  score+=1;
  UpdateScoreElementHTML();
}

//Set up inputs
document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    case 37:
      console.log("Left Arrow");
      CharacterMovement([0,-1]);
      break;
    case 38:
      console.log("Up Arrow");
      CharacterMovement([-1,0]);
      break;
    case 39:
      console.log("Right Arrow");
      CharacterMovement([0,1]);
      break;
    case 40:
      console.log("Down Arrow");
      CharacterMovement([1,0]);
      break;
    case 32:
      console.log("Spacebar");
      PlayerAction();
  }
});

//Start with home selected in navbar
NavBarSelect(0);

//spawn Player
var playerCharacterStats= new game_character_object("Player",null,[18,0],100,5,0);
playerCharacterStats.SpawnGameObj(playerCharacterStats.position);
//spawn the first non player game object active entity
var firstNPC = new game_character_object("Box","Maybe there's an item inside. Maybe not.",[4,4],10,0,0);
firstNPC.SpawnGameObj(); //spawn in random pos

// will execture function once every tdelay ms
var tdelay = 1000;
window.setInterval(function(){Main()}, tdelay);
