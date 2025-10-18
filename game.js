// WordPet - Core Game Logic

// Initialize game state
let gameState = {
    currentSentence: null,
    scrambledWords: [],
    userSelection: [],
    isGameActive: false,
    lastFeedback: null,
    feedbackTimeout: null,
    sentencesCompleted: 0, // Track sentences completed in continuous mode
    sentencesSkipped: 0,  // Track sentences skipped in current session
    isInContinuousMode: false // Track if in continuous mode
};

// Event handler references to prevent duplicate listeners
let _startPracticeHandler = null;
let _reviewHandler = null;
let _petCareHandler = null;
let _settingsHandler = null;

// Main game functions
const GameManager = {
    // Start a new sentence puzzle
    startSentencePuzzle: function() {
        // Reset the skip counter when starting a new game session
        gameState.sentencesSkipped = 0;
        
        // Check if player has stamina
        if (typeof utils !== 'undefined' && utils.TimeUtil) {
            utils.TimeUtil.updateStamina(); // Update stamina based on elapsed time
            if (utils.appState.player.stamina <= 0) {
                // Calculate when the next stamina will be available
                const lastUpdate = new Date(utils.appState.player.lastStaminaUpdate);
                const nextStaminaTime = new Date(lastUpdate.getTime() + utils.appState.player.staminaRechargeTime);
                const now = new Date();
                
                if (now < nextStaminaTime) {
                    // Calculate time until next stamina
                    const timeToWait = nextStaminaTime - now; // in milliseconds
                    const minutes = Math.ceil(timeToWait / 60000); // convert to minutes and round up
                    this.showFeedback(`You're out of stamina! Next stamina in about ${minutes} minute(s). Come back later!`, "error");
                } else {
                    // If we've waited long enough, we should have at least 1 stamina
                    this.showFeedback("You're out of stamina! Your stamina is recharging. Wait a moment or check back later.", "error");
                }
                return false;
            }
        } else {
            console.error("Utils module not loaded properly");
            this.showFeedback("System not ready yet. Please refresh the page.", "error");
            return false;
        }
        
        // Get next sentence (with 30% priority for mistake bag items)
        const sentence = data.DataUtil.getNextSentence();
        if (!sentence) {
            this.showFeedback("No sentences available! Try adding more.", "error");
            return false;
        }
        
        gameState.currentSentence = sentence;
        
        // Update stamina (reduce by 1 when starting the puzzle for "Start Practice" mode)
        if (typeof utils !== 'undefined' && utils.StorageUtil) {
            utils.appState.player.stamina = Math.max(0, utils.appState.player.stamina - 1);
            utils.StorageUtil.saveState();
        } else {
            console.error("Utils module not loaded properly");
        }
        
        // Update UI to show updated stamina
        this.updatePlayerStats();
        
        // Scramble the sentence words
        this.scrambleSentence(sentence.text);
        
        // Display the game interface
        this.displaySentencePuzzle();
        
        // Update game state
        gameState.isGameActive = true;
        
        return true;
    },
    
    // Scramble a sentence into words
    scrambleSentence: function(sentenceText) {
        // Split the sentence into words
        const words = sentenceText.split(' ');
        
        // Shuffle the words
        gameState.scrambledWords = utils.RandomUtil.shuffleArray([...words]);
    },
    
    // Check if sentence is correctly formed
    checkSentenceAnswer: function(wordsArray) {
        if (!gameState.currentSentence) {
            return false;
        }
        
        // Join the user's arrangement
        const userSentence = wordsArray.join(' ');
        
        // Compare with the original sentence
        const isCorrect = userSentence === gameState.currentSentence.text;
        
        // Update sentence mastery based on result
        const currentMastery = (typeof data !== 'undefined' && data.DataUtil) ? 
            data.DataUtil.getSentenceMastery(gameState.currentSentence.text) : 0.0;
        let newMastery = currentMastery;
        
        if (isCorrect) {
            // Increase mastery on correct answer
            newMastery = Math.min(1.0, currentMastery + 0.15);
            
            // Base rewards: coins and experience
            let baseCoins = 5;
            let baseExp = 10;
            
            // Check if this is a mistake bag sentence for extra rewards
            const isMistakeReview = data.DataUtil.isMistakeBagSentence(gameState.currentSentence.text);
            if (isMistakeReview) {
                // Extra rewards for reviewing mistake bag sentences
                baseCoins = 8; // 60% more coins
                baseExp = 15;  // 50% more experience
                const feedbackMessage = this.getCorrectFeedbackMessage(utils.appState.player.currentCombo);
                this.showFeedback(`${feedbackMessage} Great job reviewing this sentence! You earned ${baseCoins} coins and ${baseExp} XP.`, "success");
            } else {
                const feedbackMessage = this.getCorrectFeedbackMessage(utils.appState.player.currentCombo);
                this.showFeedback(`${feedbackMessage} You earned ${baseCoins} coins and ${baseExp} XP. Combo: ${utils.appState.player.currentCombo}!`, "success");
            }
            
            // Give rewards: coins and experience
            utils.appState.player.coins += baseCoins;
            utils.appState.player.totalSentencesCompleted += 1;
            
            // Combo reward
            utils.appState.player.currentCombo += 1;
            if (utils.appState.player.currentCombo > utils.appState.player.maxCombo) {
                utils.appState.player.maxCombo = utils.appState.player.currentCombo;
            }
            
            // Add combo bonus coins if applicable
            const comboBonus = Math.min(5, utils.appState.player.currentCombo); // Max 5 bonus coins
            utils.appState.player.coins += comboBonus;
            
            // Add experience to player and pet
            const expGain = baseExp + comboBonus;
            utils.appState.player.level = this.calculatePlayerLevel(expGain);
            if (typeof data !== 'undefined' && data.PetManager) {
                data.PetManager.addExperience(expGain);
            }
            
            // Update sentence mastery - correct
            if (typeof data !== 'undefined' && data.DataUtil) {
                data.DataUtil.updateSentenceMastery(
                    gameState.currentSentence.text, 
                    newMastery, 
                    true // isCorrect
                );
            }
            
            // If mastery is now high enough, remove from mistake bag
            if (newMastery >= 0.8 && isMistakeReview) {
                data.DataUtil.removeSentenceFromMistakeBag(gameState.currentSentence.text);
                data.DataUtil.saveData(); // Save the updated mistake bag
            }
            
            // Also remove from failed sentences list when mastered
            if (newMastery >= 0.8) {
                data.DataUtil.removeSentenceFromFailedList(gameState.currentSentence.text);
            }
        } else {
            // Decrease mastery on incorrect answer
            newMastery = Math.max(0.0, currentMastery - 0.05);
            
            // Still give minimal reward to maintain engagement (low-friction learning)
            utils.appState.player.coins += 1;
            utils.appState.player.totalMistakesMade += 1;
            
            // Add to mistake bag if mastery is low
            if (newMastery < 0.8) {
                if (typeof data !== 'undefined' && data.DataUtil) {
                    data.DataUtil.addSentenceToMistakeBag(gameState.currentSentence.text);
                }
            }
            
            // Also add to failed sentences list
            if (typeof data !== 'undefined' && data.DataUtil) {
                data.DataUtil.addSentenceToFailedList(gameState.currentSentence.text);
            }
            
            // Update sentence mastery - incorrect
            if (typeof data !== 'undefined' && data.DataUtil) {
                data.DataUtil.updateSentenceMastery(
                    gameState.currentSentence.text, 
                    newMastery, 
                    false // isCorrect
                );
            }
            
            // Show encouraging feedback for incorrect answer
            const feedbackMessage = this.getIncorrectFeedbackMessage();
            this.showFeedback(`${feedbackMessage} The correct sentence was: "${gameState.currentSentence.text}". You still earned 1 coin.`, "error");
            
            // Reset combo on mistake
            utils.appState.player.currentCombo = 0;
        }
        
        // Save updated state
        if (typeof utils !== 'undefined' && utils.StorageUtil) {
            utils.StorageUtil.saveState();
        }
        if (typeof data !== 'undefined' && data.DataUtil) {
            data.DataUtil.saveData();
        }
        
        // Update the player stats display
        this.updatePlayerStats();
        
        // Update pet display
        if (typeof data !== 'undefined' && data.PetManager) {
            data.PetManager.updatePetDisplay();
        }
        
        return isCorrect;
    },
    
    // Calculate player level based on experience
    calculatePlayerLevel: function(expGain) {
        // For now, just add the experience - in a real implementation, 
        // you'd have player leveling rules
        // For simplicity, we're not implementing player levels separately from pet levels
        
        // Update player experience
        utils.appState.player.level = Math.floor((utils.appState.player.totalSentencesCompleted + utils.appState.player.totalMistakesMade) / 10) + 1;
        
        return utils.appState.player.level;
    },
    
    // Display the sentence puzzle interface
    displaySentencePuzzle: function() {
        // Switch to game screen
        document.getElementById('home-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        const container = document.getElementById('sentence-puzzle-container');
        
        // Create the puzzle interface
        container.innerHTML = `
            <h3>Tap words to form a correct sentence:</h3>
            <div id="sentence-target" class="sentence-display">
                <!-- Words will be placed here by clicking -->
            </div>
            <div id="sentence-words" class="sentence-words-container">
            </div>
            <div id="game-controls">
                <button id="commit-btn" class="btn-primary">Commit Answer</button>
                <button id="skip-btn" class="btn-secondary">Skip Sentence</button>
                <button id="back-home-btn" class="btn-secondary">Back to Home</button>
            </div>
        `;
        
        // Add the scrambled words that can be clicked
        const wordsContainer = document.getElementById('sentence-words');
        gameState.scrambledWords.forEach((word, index) => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word-tile';
            wordElement.textContent = word;
            wordElement.setAttribute('data-word', word);
            wordElement.id = `word-${index}`;
            
            // Add click event to place word in sentence target
            wordElement.addEventListener('click', this.handleWordClick);
            
            wordsContainer.appendChild(wordElement);
        });
        
        // Add event listeners for buttons
        document.getElementById('commit-btn').addEventListener('click', () => {
            this.commitCurrentSentence();
        });
        
        document.getElementById('skip-btn').addEventListener('click', () => {
            this.skipCurrentSentence();
        });
        
        document.getElementById('back-home-btn').addEventListener('click', () => {
            this.returnToHome();
        });
        
        // Update player XP display
        this.updatePlayerXPDisplay();
    },
    
    // Handle drag start
    handleDragStart: function(e) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-word'));
        e.target.classList.add('dragging');
    },
    
    // Handle drag end
    handleDragEnd: function(e) {
        e.target.classList.remove('dragging');
    },
    
    // Handle drag over
    handleDragOver: function(e) {
        e.preventDefault(); // Necessary to allow drop
    },
    
    // Handle drop
    handleDrop: function(e) {
        e.preventDefault();
        
        const word = e.dataTransfer.getData('text/plain');
        const sentenceTarget = e.currentTarget;
        
        // Add the word to the sentence target
        const wordSpan = document.createElement('span');
        wordSpan.className = 'sentence-word';
        wordSpan.textContent = word;
        wordSpan.setAttribute('data-word', word);
        
        // Add event listener to allow removing words by clicking
        wordSpan.addEventListener('click', function() {
            if (gameState.isGameActive) {
                wordSpan.remove();
            }
        });
        
        sentenceTarget.appendChild(wordSpan);
    },
    
    // Handle word click (new click-based interaction)
    handleWordClick: function(e) {
        const word = e.target.getAttribute('data-word');
        const sentenceTarget = document.getElementById('sentence-target');
        
        // Speak the word when clicked
        if (typeof utils !== 'undefined' && utils.TTSUtil) {
            utils.TTSUtil.speak(word);
        }
        
        // Create a word element in the sentence target
        const wordSpan = document.createElement('span');
        wordSpan.className = 'sentence-word';
        wordSpan.textContent = word;
        wordSpan.setAttribute('data-word', word);
        
        // Add event listener to allow removing words by clicking
        wordSpan.addEventListener('click', function() {
            if (gameState.isGameActive) {
                // Remove from sentence target and return to word bank
                wordSpan.remove();
                // Find the original word in the word bank and make it visible again
                const wordBank = document.getElementById('sentence-words');
                if (wordBank) {
                    // Create a new word tile in the word bank
                    const wordTile = document.createElement('div');
                    wordTile.className = 'word-tile';
                    wordTile.textContent = word;
                    wordTile.setAttribute('data-word', word);
                    wordTile.addEventListener('click', GameManager.handleWordClick);
                    wordBank.appendChild(wordTile);
                }
            }
        });
        
        sentenceTarget.appendChild(wordSpan);
        
        // Remove the clicked word from the word bank
        e.target.remove();
    },
    
    // Add keyboard navigation support for accessibility
    setupKeyboardNavigation: function() {
        // Add keyboard event listeners for accessibility
        document.addEventListener('keydown', function(e) {
            // Handle keyboard shortcuts for game actions
            if (e.target.id === 'check-sentence-btn' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                GameManager.checkCurrentSentence();
            }
            if (e.target.id === 'skip-sentence-btn' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                GameManager.skipCurrentSentence();
            }
            
            // Add keyboard support for navigating word tiles
            if (gameState.isGameActive) {
                const wordTiles = document.querySelectorAll('.word-tile');
                if (wordTiles.length > 0) {
                    // Simple keyboard navigation through word tiles could be implemented here
                    // For now, focusing on core functionality
                }
            }
        });
    },
    
    // Commit the current sentence arrangement
    commitCurrentSentence: function() {
        if (!gameState.isGameActive) return;
        
        const sentenceTarget = document.getElementById('sentence-target');
        const wordElements = sentenceTarget.querySelectorAll('.sentence-word');
        const wordsArray = Array.from(wordElements).map(el => el.getAttribute('data-word'));
        
        const isCorrect = this.checkSentenceAnswer(wordsArray);
        
        if (isCorrect) {
            // For correct answer, give positive feedback but don't return to home automatically
            // The only ways to return to home are: 
            // 1. Clicking the "Back to Home" button
            // 2. Skipping 5 times
            // 3. Reaching sentence limit in continuous mode
            
            if (gameState.isInContinuousMode) {
                // In continuous mode, move to next sentence
                setTimeout(() => {
                    this.moveToNextSentence();
                }, 1500);
            } else {
                // In normal mode, provide option to continue with a new sentence
                // without automatically returning home
                this.showFeedback("Correct! Great job! You can continue with another sentence.", "success");
                
                // Optionally get a new sentence in normal mode without returning home
                setTimeout(() => {
                    // Get next sentence (with 30% priority for mistake bag items)
                    const sentence = data.DataUtil.getNextSentence();
                    if (!sentence) {
                        this.showFeedback("No more sentences available!", "error");
                        this.returnToHome();
                        return;
                    }
                    
                    gameState.currentSentence = sentence;
                    
                    // Scramble the sentence words
                    this.scrambleSentence(sentence.text);
                    
                    // Display the game interface with the new sentence
                    this.displaySentencePuzzle();
                    
                    // Keep game state active
                    gameState.isGameActive = true;
                    
                    // Provide feedback about the new sentence (but don't use the continuous mode format)
                    this.showFeedback("New sentence loaded. Arrange the words to form a correct sentence.", "success");
                }, 1500);
            }
        } else {
            // Show error but keep game active so user can try again
            this.showFeedback("Try again! Arrange the words to form the correct sentence.", "error");
        }
    },
    
    // Check the current sentence arrangement (original function)
    checkCurrentSentence: function() {
        if (!gameState.isGameActive) return;
        
        const sentenceTarget = document.getElementById('sentence-target');
        const wordElements = sentenceTarget.querySelectorAll('.sentence-word');
        const wordsArray = Array.from(wordElements).map(el => el.getAttribute('data-word'));
        
        const isCorrect = this.checkSentenceAnswer(wordsArray);
        
        // Disable further interaction until next sentence
        gameState.isGameActive = false;
        
        if (isCorrect) {
            // After a delay, move to next sentence
            setTimeout(() => {
                this.showNextSentence();
            }, 2500);
        } else {
            // Allow retry after incorrect answer
            // The feedback was already shown in checkSentenceAnswer
        }
    },
    
    // Skip the current sentence
    skipCurrentSentence: function() {
        // Add to mistake bag with lower mastery
        if (gameState.currentSentence) {
            const currentMastery = (typeof data !== 'undefined' && data.DataUtil) ? 
                data.DataUtil.getSentenceMastery(gameState.currentSentence.text) : 0.0;
            // Slightly reduce mastery when skipping
            if (typeof data !== 'undefined' && data.DataUtil) {
                data.DataUtil.updateSentenceMastery(
                    gameState.currentSentence.text, 
                    Math.max(0.0, currentMastery - 0.02), 
                    null // No correctness info for skip
                );
            }
            
            // Add to mistake bag if mastery is low
            if (currentMastery < 0.8) {
                if (typeof data !== 'undefined' && data.DataUtil) {
                    data.DataUtil.addSentenceToMistakeBag(gameState.currentSentence.text);
                }
            }
            
            if (typeof data !== 'undefined' && data.DataUtil) {
                data.DataUtil.saveData();
            }
            this.showFeedback("Sentence skipped.", "error");
        }
        
        // Increment the skip counter
        gameState.sentencesSkipped++;
        
        if (gameState.sentencesSkipped >= 5) {
            // After 5 skips, return to home screen
            this.showFeedback("You've skipped 5 sentences. Returning to home.", "error");
            setTimeout(() => {
                this.showNextSentence();  // This returns to home screen
            }, 1500);
        } else {
            // Otherwise, get a new sentence
            setTimeout(() => {
                // Get next sentence (with 30% priority for mistake bag items)
                const sentence = data.DataUtil.getNextSentence();
                if (!sentence) {
                    this.showFeedback("No sentences available! Try adding more.", "error");
                    this.showNextSentence(); // Return to home screen
                    return;
                }
                
                gameState.currentSentence = sentence;
                
                // Scramble the sentence words
                this.scrambleSentence(sentence.text);
                
                // Display the game interface with the new sentence
                this.displaySentencePuzzle();
                
                // Show progress if in continuous mode
                if (gameState.isInContinuousMode) {
                    this.showFeedback(`Sentence ${gameState.sentencesCompleted + 1}/50`, "success");
                }
            }, 1500);
        }
    },
    
    // Show next sentence (return to home screen)
    showNextSentence: function() {
        // Reset the skip counter when returning to home screen
        gameState.sentencesSkipped = 0;
        
        // Reset continuous mode flag when returning to home screen
        gameState.isInContinuousMode = false;
        
        // Switch back to home screen
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('home-screen').classList.add('active');
        
        // Update the home screen display
        this.updateHomeScreen();
    },
    
    // Move to next sentence in continuous mode
    moveToNextSentence: function() {
        // Check if we've reached the sentence limit (50 sentences)
        if (gameState.sentencesCompleted >= 50) {
            this.endContinuousMode();
            return;
        }
        
        // Increment counter
        gameState.sentencesCompleted++;
        
        // Show next sentence
        this.showNextSentenceInContinuousMode();
    },
    

    
    // Show next sentence in continuous mode
    showNextSentenceInContinuousMode: function() {
        // Get next sentence (with 30% priority for mistake bag items)
        const sentence = data.DataUtil.getNextSentence();
        if (!sentence) {
            this.showFeedback("No more sentences available!", "error");
            this.returnToHome();
            return;
        }
        
        gameState.currentSentence = sentence;
        
        // Scramble the sentence words
        this.scrambleSentence(sentence.text);
        
        // Display the game interface
        this.displaySentencePuzzle();
        
        // Update game state
        gameState.isGameActive = true;
        
        // Show progress
        this.showFeedback(`Sentence ${gameState.sentencesCompleted + 1}/50`, "success");
    },
    
    // Start continuous game mode
    startContinuousMode: function() {
        // Check if player has stamina
        if (typeof utils !== 'undefined' && utils.TimeUtil) {
            utils.TimeUtil.updateStamina(); // Update stamina based on elapsed time
            if (utils.appState.player.stamina <= 0) {
                // Calculate when the next stamina will be available
                const lastUpdate = new Date(utils.appState.player.lastStaminaUpdate);
                const nextStaminaTime = new Date(lastUpdate.getTime() + utils.appState.player.staminaRechargeTime);
                const now = new Date();
                
                if (now < nextStaminaTime) {
                    // Calculate time until next stamina
                    const timeToWait = nextStaminaTime - now; // in milliseconds
                    const minutes = Math.ceil(timeToWait / 60000); // convert to minutes and round up
                    this.showFeedback(`You're out of stamina! Next stamina in about ${minutes} minute(s). Come back later!`, "error");
                } else {
                    // If we've waited long enough, we should have at least 1 stamina
                    this.showFeedback("You're out of stamina! Your stamina is recharging. Wait a moment or check back later.", "error");
                }
                return false;
            }
        } else {
            console.error("Utils module not loaded properly");
            this.showFeedback("System not ready yet. Please refresh the page.", "error");
            return false;
        }
        
        // Reset sentence counter
        gameState.sentencesCompleted = 0;
        
        // Reset skip counter when starting continuous mode
        gameState.sentencesSkipped = 0;
        
        // Set continuous mode flag
        gameState.isInContinuousMode = true;
        
        // Update stamina (reduce by 1 when starting the continuous mode session)
        if (typeof utils !== 'undefined' && utils.StorageUtil) {
            utils.appState.player.stamina = Math.max(0, utils.appState.player.stamina - 1);
            utils.StorageUtil.saveState();
        } else {
            console.error("Utils module not loaded properly");
        }
        
        // Update UI to show updated stamina
        this.updatePlayerStats();
        
        // Show first sentence
        this.showNextSentenceInContinuousMode();
    },
    
    // End continuous mode
    endContinuousMode: function() {
        this.showFeedback(`Congratulations! You've completed ${gameState.sentencesCompleted} sentences!`, "success");
        setTimeout(() => {
            this.returnToHome();
        }, 3000);
    },
    
    // Return to home screen
    returnToHome: function() {
        // Reset the skip counter when returning to home screen
        gameState.sentencesSkipped = 0;
        
        // Reset continuous mode flag when returning to home screen
        gameState.isInContinuousMode = false;
        
        console.log("Returning to home - Current player state:", utils.appState.player);
        
        // Update stamina based on elapsed time when returning to home
        if (typeof utils !== 'undefined' && utils.TimeUtil) {
            utils.TimeUtil.updateStamina(); // Update stamina based on elapsed time
        }
        
        // Switch back to home screen
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('home-screen').classList.add('active');
        
        // Update the home screen display
        this.updateHomeScreen();
        
        console.log("After returning to home - Player state:", utils.appState.player);
    },
    
    // Update player stats display
    updatePlayerStats: function() {
        if (typeof utils === 'undefined') {
            console.error("Utils module not loaded");
            return;
        }
        
        console.log("Updating player stats - Current state:", utils.appState.player);
        
        const statsContainer = document.getElementById('player-stats');
        if (statsContainer) {
            // Highlight low stamina with special styling
            const staminaClass = utils.appState.player.stamina <= 0 ? 'stat stat-low' : 'stat';
            const staminaDisplay = `<div class="${staminaClass}">Stamina: ${utils.appState.player.stamina}/${utils.appState.player.maxStamina}</div>`;
            
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <div class="stat">Level: ${utils.appState.player.level}</div>
                    <div class="stat">Coins: ${utils.appState.player.coins}</div>
                    ${staminaDisplay}
                </div>
                <div class="stat-item">
                    <div class="stat">Combo: ${utils.appState.player.currentCombo}</div>
                    <div class="stat">Max Combo: ${utils.appState.player.maxCombo}</div>
                    <div class="stat">Completed: ${utils.appState.player.totalSentencesCompleted}</div>
                </div>
            `;
        }
        
        // Also update the player XP display on game screen
        this.updatePlayerXPDisplay();
    },
    
    // Update player XP display on game screen
    updatePlayerXPDisplay: function() {
        if (typeof utils === 'undefined') {
            console.error("Utils module not loaded");
            return;
        }
        
        const xpDisplay = document.getElementById('player-xp-display');
        if (xpDisplay) {
            xpDisplay.innerHTML = `
                <h3>Your Learning Progress</h3>
                <div class="xp-stats">
                    <div class="xp-stat">Level: ${utils.appState.player.level}</div>
                    <div class="xp-stat">XP: ${utils.appState.player.totalSentencesCompleted * 10}</div>
                    <div class="xp-stat">Coins: ${utils.appState.player.coins}</div>
                    <div class="xp-stat">Combo: ${utils.appState.player.currentCombo}</div>
                    <div class="xp-stat">Stamina: ${utils.appState.player.stamina}/${utils.appState.player.maxStamina}</div>
                    <div class="xp-stat">Completed: ${utils.appState.player.totalSentencesCompleted}</div>
                </div>
            `;
        }
    },
    
    // Update home screen display
    updateHomeScreen: function() {
        console.log("Updating home screen - Player state:", utils.appState.player);
        
        // Update player stats
        this.updatePlayerStats();
        
        // Update pet display
        data.PetManager.updatePetDisplay();
        
        // Remove existing event listeners to prevent duplicates
        const startBtn = document.getElementById('start-practice-btn');
        const reviewBtn = document.getElementById('review-btn');
        const petCareBtn = document.getElementById('pet-care-btn');
        const settingsBtn = document.getElementById('settings-btn');
        
        // Update the home screen buttons
        if (startBtn) {
            startBtn.removeEventListener('click', this._startPracticeHandler);
            this._startPracticeHandler = () => {
                this.startContinuousMode();
            };
            startBtn.addEventListener('click', this._startPracticeHandler);
            
            // Disable the button if stamina is 0
            if (utils.appState.player.stamina <= 0) {
                startBtn.disabled = true;
                startBtn.title = "Out of stamina! Come back later.";
            } else {
                startBtn.disabled = false;
                startBtn.title = "";
            }
        }
        

        
        if (reviewBtn) {
            reviewBtn.removeEventListener('click', this._reviewHandler);
            this._reviewHandler = () => {
                console.log("Review button clicked");
                this.startMistakeReview();
            };
            reviewBtn.addEventListener('click', this._reviewHandler);
            
            // Review button should always be enabled, regardless of stamina
            reviewBtn.disabled = false;
            reviewBtn.title = "";
        }
        
        if (petCareBtn) {
            petCareBtn.removeEventListener('click', this._petCareHandler);
            this._petCareHandler = () => {
                this.showPetCare();
            };
            petCareBtn.addEventListener('click', this._petCareHandler);
        }
        
        if (settingsBtn) {
            settingsBtn.removeEventListener('click', this._settingsHandler);
            this._settingsHandler = () => {
                this.showSettings();
            };
            settingsBtn.addEventListener('click', this._settingsHandler);
        }
    },
    
    // Start mistake review
    startMistakeReview: function() {
        console.log("startMistakeReview called");
        if (typeof data === 'undefined' || !data.DataUtil) {
            this.showFeedback("System not ready yet. Please refresh the page.", "error");
            return;
        }
        const mistakeSentences = data.DataUtil.getMistakeBagSentences();
        console.log("Mistake sentences retrieved:", mistakeSentences, "Length:", mistakeSentences.length);
        
        if (mistakeSentences.length === 0) {
            this.showFeedback("No sentences to review! Complete more sentences to fill your mistake bag.", "error");
            return;
        }
        
        // Show a random sentence from the mistake bag
        const randomIndex = Math.floor(Math.random() * mistakeSentences.length);
        gameState.currentSentence = mistakeSentences[randomIndex];
        
        // For mistake review, we do NOT consume stamina when starting the review
        // (This is a special mode to practice difficult sentences without stamina cost)
        
        // Proceed with the review (same as normal sentence puzzle for now)
        this.scrambleSentence(gameState.currentSentence.text);
        this.displaySentencePuzzle();
        
        // Update game state
        gameState.isGameActive = true;
        
        this.showFeedback("Reviewing sentences from your mistake bag! Get these right for bonus rewards!", "success");
    },
    
    // Show pet care screen 
    showPetCare: function() {
        // Switch to a pet care view
        document.getElementById('home-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        const container = document.getElementById('sentence-puzzle-container');
        container.innerHTML = `
            <h3>Pet Care Center</h3>
            <div id="pet-care-display">
                <div class="pet-avatar">${data.petData.type === 'dog' ? '🐶' : '🐶'}</div>
                <div class="pet-info">
                    <h3>Pet Level: ${data.petData.level}</h3>
                    <p>Experience: ${data.petData.exp}/${data.petData.expToNextLevel}</p>
                </div>
            </div>
            <div id="pet-care-actions">
                <button id="feed-pet-btn" class="btn-primary">Feed Pet 🦴</button>
                <button id="play-with-pet-btn" class="btn-secondary">Play with Pet 🎾</button>
                <button id="back-to-home-btn" class="btn-secondary">Back to Home</button>
            </div>
        `;
        
        // Add event listeners for pet care actions
        document.getElementById('feed-pet-btn').addEventListener('click', () => {
            // Feeding gives a small experience boost to the pet
            data.PetManager.addExperience(5);
            this.showFeedback("Yum! Pet enjoyed the snack and gained 5 XP!", "success");
        });
        
        document.getElementById('play-with-pet-btn').addEventListener('click', () => {
            // Playing gives moderate experience boost
            data.PetManager.addExperience(10);
            this.showFeedback("Fun time! Pet played and gained 10 XP!", "success");
        });
        
        document.getElementById('back-to-home-btn').addEventListener('click', () => {
            // Return to home screen
            document.getElementById('game-screen').classList.remove('active');
            document.getElementById('home-screen').classList.add('active');
            
            // Update the home screen display
            this.updateHomeScreen();
        });
    },
    
    // Show settings screen (placeholder)
    showSettings: function() {
        this.showFeedback("Settings screen coming soon!", "success");
    },
    
    // Show feedback message with encouraging messages
    showFeedback: function(message, type) {
        // Clear any existing feedback
        if (gameState.feedbackTimeout) {
            clearTimeout(gameState.feedbackTimeout);
        }
        
        const feedbackContainer = document.getElementById('feedback-container');
        if (!feedbackContainer) return;
        
        // Create feedback element
        const feedbackEl = document.createElement('div');
        feedbackEl.className = `feedback-message feedback-${type}`;
        feedbackEl.textContent = message;
        
        // Clear container and add new feedback
        feedbackContainer.innerHTML = '';
        feedbackContainer.appendChild(feedbackEl);
        
        // Auto-remove after 3 seconds
        gameState.feedbackTimeout = setTimeout(() => {
            if (feedbackContainer.contains(feedbackEl)) {
                feedbackContainer.removeChild(feedbackEl);
            }
        }, 3000);
        
        // Speak the feedback message if TTS is enabled
        if (typeof utils !== 'undefined' && utils.TTSUtil) {
            utils.TTSUtil.speak(message);
        }
    },
    
    // Get encouraging feedback message for correct answers
    getCorrectFeedbackMessage: function(combo) {
        const messages = [
            "Great job! 🎉",
            "Awesome! 👍",
            "Well done! ✨",
            "Excellent! 🌟",
            "Fantastic! 🎈",
            "Super! 💪",
            "Brilliant! 🌈",
            "Wonderful! 🎊"
        ];
        
        // Add combo-specific messages for higher combos
        if (combo >= 5) {
            messages.push("Amazing combo! 🔥");
        }
        if (combo >= 10) {
            messages.push("Incredible streak! ⚡");
        }
        if (combo >= 15) {
            messages.push("Legendary combo! 🏆");
        }
        
        // Return a random encouraging message
        return messages[Math.floor(Math.random() * messages.length)];
    },
    
    // Get encouraging feedback message for incorrect answers
    getIncorrectFeedbackMessage: function() {
        const messages = [
            "Almost! Try again! 💪",
            "So close! You can do it! ✨",
            "Keep trying! You're learning! 🌱",
            "Nice effort! One more time! 👍",
            "You're getting there! 🎯",
            "Don't give up! Practice makes progress! 🌟",
            "Good try! Learning takes time! ⏳",
            "That's okay! Try again! 🔄"
        ];
        
        // Return a random encouraging message
        return messages[Math.floor(Math.random() * messages.length)];
    },
    
    // Initialize the game
    init: function() {
        // Check dependencies
        if (typeof utils === 'undefined' || !utils.StorageUtil) {
            console.error("Utils module not loaded properly");
            return;
        }
        
        if (typeof data === 'undefined' || !data.PetManager || !data.DataUtil) {
            console.error("Data module not loaded properly");
            return;
        }
        
        // Load saved state
        utils.StorageUtil.loadState();
        console.log("Initial player state loaded:", utils.appState.player);
        
        // Update stamina to account for any time passed since last session
        if (typeof utils !== 'undefined' && utils.TimeUtil) {
            utils.TimeUtil.updateStamina();
        }
        
        // Initialize pet system
        data.PetManager.init();
        
        // Set up initial screen
        const homeScreen = document.getElementById('home-screen');
        const gameScreen = document.getElementById('game-screen');
        
        if (homeScreen) homeScreen.classList.add('active');
        if (gameScreen) gameScreen.classList.remove('active');
        
        // Update player stats
        this.updatePlayerStats();
        
        // Update pet display
        data.PetManager.updatePetDisplay();
        
        // Set up keyboard navigation for accessibility
        this.setupKeyboardNavigation();
        
        // Set up home screen buttons
        this.updateHomeScreen();
    }
};

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data first to ensure saved data is loaded
    if (typeof data !== 'undefined' && data.DataUtil) {
        data.DataUtil.initializeData();
    }
    
    // Wait for all dependencies to load
    const checkDependencies = setInterval(function() {
        if (typeof utils !== 'undefined' && typeof data !== 'undefined') {
            clearInterval(checkDependencies);
            GameManager.init();
        } else {
            console.log("Waiting for dependencies...");
        }
    }, 100);
});

// If running in browser environment, attach to window
if (typeof window !== 'undefined') {
    window.GameManager = GameManager;
}

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GameManager,
        gameState
    };
}