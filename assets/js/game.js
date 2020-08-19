// Fight!
var fight = function (enemy) {
    console.log(enemy);

    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask user if they'd liked to fight or run
        var promptFight = window.confirm("Press OK to Fight " + enemy.name + ", Press Cancel to Skip this Round.");

        // keep track of who goes first
        var isPlayerTurn = true;

        // randomly change turn order
        if (Math.random() > 0.5) {
            isPlayerTurn = false;
        }

        // if player choses to fight, then fight
        if (promptFight && isPlayerTurn) {
            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage + " damage. " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // Reward user with between 5 - 15 Bitcoin
                playerInfo.Bitcoin = randomNumber(playerInfo.Bitcoin + 5, playerInfo.Bitcoin + 15);
                console.log(">>> " + playerInfo.name + " defeated " + enemy.name + " with " + playerInfo.health + " health left!");
                console.log(playerInfo.name + " now has " + playerInfo.Bitcoin + " Bitcoin after Winning!");
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
                // Bitcoin = Score in the end, so reduce users score for being dead
                playerInfo.Bitcoin = playerInfo.Bitcoin - 10;
                console.log(playerInfo.name + " lost 10 Bitcoin for being Dead!");
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } else if (promptFight && !isPlayerTurn) {
            // remove player's health by subtracting the amount set in the enemy.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + " for " + damage + " damage. " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                playerInfo.Bitcoin = playerInfo.Bitcoin - 10;
                console.log(playerInfo.name + " lost 10 Bitcoin for being Dead!");
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }

            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage + " damage. " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.Bitcoin = randomNumber(playerInfo.Bitcoin + 5, playerInfo.Bitcoin + 15);
                console.log(">>> " + playerInfo.name + " defeated " + enemy.name + " with " + playerInfo.health + " health left!");
                console.log(playerInfo.name + " now has " + playerInfo.Bitcoin + " Bitcoin after Winning!");
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this round? (cost is 10 Bitcoin)");
            // if yes (true), leave fight
            if (confirmSkip) {
                if (playerInfo.Bitcoin >= 10) {
                    break;
                } else {
                    window.alert("You don't have enough Bitcoin!");
                    fight(enemy);
                }
                window.alert(playerInfo.name + " has decided to skip this fight. 10 Bitcoin has been deducted!");
                // subtract Bitcoin from playerInfo.Bitcoin for skipping
                playerInfo.Bitcoin = Math.max(0, playerInfo.Bitcoin - 10);
                console.log("playerInfo.Bitcoin", playerInfo.Bitcoin);
                break;
            }
            // if no (false), ask question again by running fight() again
            else {
                fight(enemy);
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

            pickedEnemyObj.health = randomNumber(35, 55);

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
    window.alert("The game has now ended. Let's see how you did!");
    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    // if player have more Bitcoin than the high score, player has new high score!
    if (playerInfo.Bitcoin > highScore) {
        localStorage.setItem("highscore", playerInfo.Bitcoin);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.Bitcoin + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        window.stop();
    }
};

// Shop
var shop = function () {
    // ask player what they'd like to do
    var shopOptionPrompt = prompt("Would you like to [1] Refill your health, [2] Upgrade your attack, or [3] Leave the store? Please enter one: '1', '2', or '3' to make a choice.");
    // use switch case to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            console.log(playerInfo.name + " has " + playerInfo.health + " Health after shopping!");
            console.log(playerInfo.name + " has " + playerInfo.Bitcoin + " Bitcoin after shopping!");
            break;
        case 2:
            playerInfo.upgradeAttack();
            console.log(playerInfo.name + " has " + playerInfo.attack + " Attack after shopping!");
            console.log(playerInfo.name + " has " + playerInfo.Bitcoin + " Bitcoin after shopping!");
            break;
        case 3:
            window.alert("Leaving the store.");
            console.log(playerInfo);
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

// function to set name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log(" Your robot's name is " + name);
    return name;
};

// Player Object
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    Bitcoin: 10,
    reset: function () {
        this.health = 100;
        this.Bitcoin = 10;
        this.attack = 10;
    },

    // Refill Player Health
    refillHealth: function () {
        if (this.Bitcoin >= 7) {
            window.alert("Refilling player's health by 30 for 7 Bitcoin.");
            this.health += 30;
            this.Bitcoin -= 7;
            console.log(playerInfo.name + " has " + playerInfo.health + " health!");
        } else {
            window.alert("You don't have enough Bitcoin!");
        }
    },

    // Upgrade Player Attack
    upgradeAttack: function () {
        if (this.Bitcoin >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 Bitcoin.");
            this.attack += 6;
            this.Bitcoin -= 7;
            console.log(playerInfo.name + " has " + playerInfo.health + " health!");
        } else {
            window.alert("You don't have enough Bitcoin!");
        }
    },
};

// Enemy Objects get "Stronger" as you go, thus order NOT randomized
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
