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
        this.accuracy = accuracy; /// probability of a successful attack
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
 
 ////////////////////
 


////////////////////////////////////////


////// function to display the alien ships 

const displayAliens = () => {
    let playerStage = document.querySelector(".p1")    ///find the stage for aliens
    playerStage.innerHTML = "";   /// clear existing aliens

    horde.forEach( alien => {
        let new_enemy = document.createElement("div");
        new_enemy.className = "ufo";     /// assign a class to the alien

        /// create an img element for the alien image 
        let image = document.createElement("img")
        image.src = "https://www.bing.com/th/id/OGC.cff3e5275135e796ed81ef0cea6dfb1d?pid=1.7&rurl=https%3a%2f%2fi.gifer.com%2forigin%2f0f%2f0fb4d1a5937461d0009324f8afcbbdb5.gif&ehk=vD9IEjRbJcPJS%2f0jMwuGLlQtnuCAgKdPMUquQfexapY%3d" ; // Alien GIF URL
        image.className = "alienImage"; // Assign a class to the image

        // ////////// append the image to the new_enemy div
        new_enemy.append(image);


        //// add the new enemy div to the playerStage
        playerStage.append(new_enemy);

    });

};
 

const displayPlayer = () => {
    let nameHolder = document.querySelector(".kobe");
    nameHolder.innerHTML = ussAssembly.name; // Display player name

    let playerHealthBar = document.querySelector(".playerHealth");
    playerHealthBar.style.width = `${ussAssembly.hull * 10}px`; // Set health bar width

    let playerStage = document.querySelector(".p2");
    playerStage.innerHTML = ""; // Clear existing content

    let image = document.createElement("img");
    image.src = "https://media4.giphy.com/media/jds2a7BEHgpqu5uVDB/giphy.webp?cid=ecf05e47h4g78at2p1nnn6bcjavcxb1g3nl7w3gkm3sd4zlq&ep=v1_gifs_search&rid=giphy.webp&ct=g";
    image.className = "playerImage"; // Assign a class to the image

    playerStage.append(image); // Append the image to the playerStage
};



///////////////////////////// function to update the oracle game status

const updateOracle = (message) => {
    let oracle = document.querySelector(".oracle"); ////// find the oracleelemnt 
    oracle.innerHTML = message; //// set the oracle text to the provided message
};



 
const startGame = () => {
    
    if (gameActive) return; 
    ussAssembly = new Player("USS Assembly", 20, 5, 0.7 ); 
    resetGame(); 
    createAliens(1); 
    updateOracle("Player's Turn") 
    gameActive = true;
    enableButtons(); 
};
 




const resetGame = () => {
    currentRound = 1; 
    p1Turn = true;
    horde = [];
    document.querySelector(".rndCnt").innerHTML = currentRound;
    document.querySelector(".p1").innerHTML = "";
    displayPlayer();
    enableButtons();
};

 
/////// function to add a new round 


const  addRound = () => {
    if (currentRound < maxRounds) {
        currentRound++; 
        document.querySelector(".rndCnt").innerHTML = currentRound;   /// update the round counter in ui
        createAliens(currentRound);  // create new aliens for the current round
        updateOracle("Player's Turn");  /// indicate it's the players turn

    } else {
        ///// random the winner after 5 rounds 
        if (Math.random() < 0.5) {
            ussAssemblyWins();  //// player wind
        } else {
            alienWins()      /// alien win
        }
    }
};
 
 
 
// Function to handle the player's fire action

const fire = () => {
    if (!gameActive || !p1Turn) return ///// if game isn't active or its not player turn, do nothing
    if (horde.length === 0) return;  /// if no aliens , do nothing

    let targetAlien = horde[0]; /// target the first alien in the horde 
    updateOracle("Player makes a shot!");    /// indicate  player is shooting
    if (ussAssembly.attack(targetAlien)) {
        targetAlien.hull -= ussAssembly.firepower;  /// reduce aliens hull if hit 


        if (targetAlien.hull <= 0) {
            horde.shift();    /// remove alien if its hull is 0 or less
            displayAliens(); /// update alien display
            
            if (horde.length === 0) {
                addRound(); // move to the next round if no aliens left
                return;
            }
        }
        updateAlienHealth(targetAlien);    /// update alien's health bar

    }  else {
        updateOracle("Player missed!");   /// indicate a miss
    }

    toggleTurn();            /// switch turns to te alien
    setTimeout(alienAttack, 1000);       /// wait 1 second before alien attacks   
};

/// function to update the aliens health bar


 
const updateAlienHealth = (alien) => {
    let alienElements = document.querySelectorAll(".p1 .ufo .alienHealth");
    alienElements.forEach((element, index) => {
        if (index === 0) { // Assuming we update the first alien health only
            element.style.width = `${alien.hull * 10}px`;
        }
    });
};


// func to handle the alien's attack

const alienAttack = () => {
    if (!gameActive || p1Turn || horde.length === 0) return; /// if game isn't active it's player turn or no aliens , do nothing

    let attackingAlien = horde[0]; // alien to attack is the first in the horde
    updateOracle("Alien makes a shot!");  /// indicate alien is shooting


    if (attackingAlien.attack(ussAssembly)) {
        ussAssembly.hull -= attackingAlien.firepower;  //// reduce player hull if fit

        if (ussAssembly.hull <= 0) {
            alienWins();       /// aliens win if player hull is 0 or less
            return;
        }
        updatePlayerHealth();  /// update player health bar
    }else {
        updateOracle("Alien missed!");  // indicate a miss
    }

    toggleTurn();  /// switch turns to the player
    updateOracle("Player Turn");  /// indicate it's the player turn
};


///function to update the player health bar

const updatePlayerHealth = () => {
    let playerHealthBar = document.querySelector(".playerHealth");  //// find player health bar
    playerHealthBar.style.width = `${ussAssembly.hull * 10}px`;  /// update the width based on hull 
};
const toggleTurn = () => {
    p1Turn = !p1Turn;
};

// func to declare the player as the winner

const ussAssemblyWins = () => {
    updateOracle("USS Assembly Wins th Game!");  // display win message
    endGame();   /// end the game
};

const alienWins = () => {
    updateOracle("Aliens Win the Game!");  /// display loss message
    endGame(); 
}


const endGame = () => {
    gameActive = false;   /// mark the game as inactive
    
}
// const enableButtons = () => {
//     document.querySelector("#startGame").disabled = !gameActive;
//     document.querySelector("#fire").disabled = !gameActive || !p1Turn;
//     document.querySelector("#restartGame").disabled = !gameActive;
// };
const enableButtons = () => {
    document.getElementById("startGame").style.display = "block";
    document.getElementById("fire").style.display = "block";
    document.getElementById("restartGame").style.display = "block";
};

const restartGame = () => {
    if (gameActive) return; /// if the game is active do nothing
    resetGame();  /// reset the game state
    startGame(); /// start a new game
}

////
 


//initialize the game



// Initialize game
document.querySelector("#startGame").addEventListener("click", startGame);
document.querySelector("#fire").addEventListener("click", fire);
document.querySelector("#restartGame").addEventListener("click", restartGame);

 

startGame();
 
////////////////////////////////
