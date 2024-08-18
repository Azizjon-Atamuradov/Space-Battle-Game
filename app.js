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


////// function to display the alien ships 

const displayAliens = () => {
    let playerStage = document.querySelector(".p1")    ///find the stage for aliens
    playerStage.innerHTML = "";   /// clear existing aliens

    horde.forEach( alien => {
        let new_enemy = document.createElement("div");
        new_enemy.className = "ufo";     /// assign a class to the alien

        /// create an img element for the alien image 
        let image = document.createElement("img")
        image.src = "https://www.bing.com/th/id/OGC.cff3e5275135e796ed81ef0cea6dfb1d?pid=1.7&rurl=https%3a%2f%2fi.gifer.com%2forigin%2f0f%2f0fb4d1a5937461d0009324f8afcbbdb5.gif&ehk=vD9IEjRbJcPJS%2f0jMwuGLlQtnuCAgKdPMUquQfexapY%3d"; // Alien GIF URL
        image.className = "alienImage"; // Assign a class to the image

        // ////////// append the image to the new_enemy div
        new_enemy.append(image);


        //// add the new enemy div to the playerStage
        playerStage.append(new_enemy);

    });

};




