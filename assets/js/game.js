// Fight!
var fight = function (enemy) {
    console.log(enemy);
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask user if they'd liked to fight or run
        var promptFight = window.confirm("Press OK to Fight " + enemy.name + ", Press Cancel to Skip this Round.");

        // if player choses to fight, then fight
        if (promptFight) {
            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage + " damage. " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                console.log(">>> " + playerInfo.name + " defeated " + enemy.name + " with " + playerInfo.health + " health left!");
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            // remove player's health by subtracting the amount set in the enemy.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + " for " + damage + " damage. " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
            // if player choses to skip
        } else {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this round? (cost is 10 ₿itcoin)");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. 10 ₿itcoin has been deducted!");
                // subtract Bitcoin from playerInfo.Bitcoin for skipping
                playerInfo.Bitcoin = Math.max(0, playerInfo.Bitcoin - 10);
                console.log("playerInfo.Bitcoin", playerInfo.Bitcoin);
                break;
            }
            // if no (false), ask question again by running fight() again
            else {
                break;
            }
        }
    }
};

// function to start a new game
var startGame = function () {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);
            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            endGame();
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.Bitcoin + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        window.stop();
    }
};

var shop = function () {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// Player Object
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    Bitcoin: 10,
    reset: function () {
        this.health = 100;
        this.Bitcoin = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
};

// Enemy Object
var enemyInfo = [
    {
        name: "Omnidroid",
        attack: randomNumber(9, 13),
    },
    {
        name: "SID 6.7",
        attack: randomNumber(10, 14),
    },
    {
        name: "Megatron",
        attack: randomNumber(11, 15),
    },
    {
        name: "Master Control Program",
        attack: randomNumber(12, 16),
    },
];

startGame();
