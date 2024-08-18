//  ///////// variables 

let currentRound = 1;         //// current round
let horde = [];
let p1Turn = true;
let gameActive = false;
const maxRounds = 5;   //// max numbers of round
let ussAssembly = null;


///// random number 

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;


/////class represent player and aliens 


class Player {
    constructor(name, hull, firepower, accuracy ) {
        this.name = name;  /// name of ship
        this.hull = hull; /// health points of ship
        this.firepower = firepower;  /// damage points the ship can deal
        this.firepower = accuracy; /// probability of a successful attack
    }
    attack(target) {
        return Math.random() < this.accuracy; /// true if attack hits , false otherwise
    }
}



/// function to create aliens ship for the current round

 
const createAliens  = (numAliens) => {
    horde = [];  //reset the horde for the new round
    for (let i = 1; i <= numAliens; i++) {
        let alien = new Player (
            `Alien${i}`,  
            generateRandomNumber(3, 6), // random hull value
            generateRandomNumber(2, 4), // random firepower value
            generateRandomNumber(0.6, 0.8) /// random accuracy value
        );
        horde.push(alien);       //// add the allien to the horde
    } 
    displayAliens(); // update the display to show the new aliens
};


