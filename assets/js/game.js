var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Omnidroid", "SID 6.7", "Megatron", "Master Control Program"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        // ask user if they'd liked to fight or run
        var promptFight = window.confirm("Press OK to Fight " + enemyName + ", Press Cancel to Skip this Round.");

        // if player choses to fight, then fight
        if (promptFight) {
            // remove enemy's health by subtracting the amount set in the playerAttack variable
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerAttack - 3, playerAttack);
            enemyHealth = Math.max(0, enemyHealth - damage);
            console.log(playerName + " attacked " + enemyName + " for " + damage + " damage. " + enemyName + " now has " + enemyHealth + " health remaining.");

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                console.log(">>> " + playerName + " defeated " + enemyName + " with " + playerHealth + " health left!");
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // remove player's health by subtracting the amount set in the enemyAttack variable
            var damage = randomNumber(enemyAttack - 3, enemyAttack);
            playerHealth = Math.max(0, playerHealth - damage);
            console.log(enemyName + " attacked " + playerName + " for " + damage + " damage. " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
            // if player choses to skip
        } else {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this round? (cost is 10 ₿itcoin)");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. 10 ₿itcoin has been deducted!");
                // subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
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
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyName = enemyNames[i];

            enemyHealth = randomNumber(40, 60);

            fight(pickedEnemyName);
            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
        case "REFILL": // new case
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 ₿itcoin.");

                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough ₿itcoin!");
            }

            break;
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 ₿itcoin.");

                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough ₿itcoin!");
            }

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

startGame();
