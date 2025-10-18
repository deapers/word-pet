// WordPet - Core Game Logic

// Initialize game state
let gameState = {
    currentSentence: null,
    scrambledWords: [],
    userSelection: [],
    isGameActive: false,
    lastFeedback: null,
    feedbackTimeout: null
};

// Main game functions
const GameManager = {
    // Start a new sentence puzzle
    startSentencePuzzle: function() {
        // Check if player has stamina
        utils.TimeUtil.updateStamina(); // Update stamina based on elapsed time
        if (utils.appState.player.stamina <= 0) {
            this.showFeedback("You're out of stamina! Wait for it to recharge or check back later.", "error");
            return false;
        }
        
        // Get next sentence (with 30% priority for mistake bag items)
        const sentence = data.DataUtil.getNextSentence();
        if (!sentence) {
            this.showFeedback("No sentences available! Try adding more.", "error");
            return false;
        }
        
        gameState.currentSentence = sentence;
        
        // Update stamina (decrease by 1)
        utils.appState.player.stamina = Math.max(0, utils.appState.player.stamina - 1);
        utils.StorageUtil.saveState();
        
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
        const currentMastery = data.DataUtil.getSentenceMastery(gameState.currentSentence.text);
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
                this.showFeedback(`Great job reviewing this sentence! You earned ${baseCoins} coins and ${baseExp} XP.`, "success");
            } else {
                this.showFeedback(`Correct! You earned ${baseCoins} coins and ${baseExp} XP. Combo: ${utils.appState.player.currentCombo}!`, "success");
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
            data.PetManager.addExperience(expGain);
            
            // Update sentence mastery - correct
            data.DataUtil.updateSentenceMastery(
                gameState.currentSentence.text, 
                newMastery, 
                true // isCorrect
            );
            
            // If mastery is now high enough, remove from mistake bag
            if (newMastery >= 0.8 && isMistakeReview) {
                data.DataUtil.removeSentenceFromMistakeBag(gameState.currentSentence.text);
                data.DataUtil.saveData(); // Save the updated mistake bag
            }
        } else {
            // Decrease mastery on incorrect answer
            newMastery = Math.max(0.0, currentMastery - 0.05);
            
            // Still give minimal reward to maintain engagement (low-friction learning)
            utils.appState.player.coins += 1;
            utils.appState.player.totalMistakesMade += 1;
            
            // Add to mistake bag if mastery is low
            if (newMastery < 0.8) {
                data.DataUtil.addSentenceToMistakeBag(gameState.currentSentence.text);
            }
            
            // Update sentence mastery - incorrect
            data.DataUtil.updateSentenceMastery(
                gameState.currentSentence.text, 
                newMastery, 
                false // isCorrect
            );
            
            this.showFeedback(`Almost! The correct sentence was: "${gameState.currentSentence.text}". You still earned 1 coin.`, "error");
            
            // Reset combo on mistake
            utils.appState.player.currentCombo = 0;
        }
        
        // Save updated state
        utils.StorageUtil.saveState();
        data.DataUtil.saveData();
        
        // Update the player stats display
        this.updatePlayerStats();
        
        // Update pet display
        data.PetManager.updatePetDisplay();
        
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
            <h3>Arrange the words to form a correct sentence:</h3>
            <div id="sentence-target" class="sentence-display">
                <p>Drag words here to form your sentence</p>
            </div>
            <div id="sentence-words" class="sentence-words-container">
            </div>
            <button id="check-sentence-btn" class="btn-primary">Check Answer</button>
            <button id="skip-sentence-btn" class="btn-secondary">Skip Sentence</button>
        `;
        
        // Add the scrambled words
        const wordsContainer = document.getElementById('sentence-words');
        gameState.scrambledWords.forEach((word, index) => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word-tile';
            wordElement.textContent = word;
            wordElement.draggable = true;
            wordElement.setAttribute('data-word', word);
            wordElement.id = `word-${index}`;
            
            // Add drag event listeners
            wordElement.addEventListener('dragstart', this.handleDragStart);
            wordElement.addEventListener('dragend', this.handleDragEnd);
            
            wordsContainer.appendChild(wordElement);
        });
        
        // Add drop targets for the sentence
        const sentenceTarget = document.getElementById('sentence-target');
        sentenceTarget.addEventListener('dragover', this.handleDragOver);
        sentenceTarget.addEventListener('drop', this.handleDrop);
        
        // Add event listeners for buttons
        document.getElementById('check-sentence-btn').addEventListener('click', () => {
            this.checkCurrentSentence();
        });
        
        document.getElementById('skip-sentence-btn').addEventListener('click', () => {
            this.skipCurrentSentence();
        });
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
    
    // Check the current sentence arrangement
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
            const currentMastery = data.DataUtil.getSentenceMastery(gameState.currentSentence.text);
            // Slightly reduce mastery when skipping
            data.DataUtil.updateSentenceMastery(
                gameState.currentSentence.text, 
                Math.max(0.0, currentMastery - 0.02), 
                null // No correctness info for skip
            );
            
            // Add to mistake bag if mastery is low
            if (currentMastery < 0.8) {
                data.DataUtil.addSentenceToMistakeBag(gameState.currentSentence.text);
            }
            
            data.DataUtil.saveData();
            this.showFeedback("Sentence skipped.", "error");
        }
        
        // Move to next sentence after a delay
        setTimeout(() => {
            this.showNextSentence();
        }, 1500);
    },
    
    // Show next sentence (return to home screen)
    showNextSentence: function() {
        // Switch back to home screen
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('home-screen').classList.add('active');
        
        // Update the home screen display
        this.updateHomeScreen();
    },
    
    // Update player stats display
    updatePlayerStats: function() {
        const statsContainer = document.getElementById('player-stats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <div class="stat">Level: ${utils.appState.player.level}</div>
                    <div class="stat">Coins: ${utils.appState.player.coins}</div>
                    <div class="stat">Stamina: ${utils.appState.player.stamina}/${utils.appState.player.maxStamina}</div>
                </div>
                <div class="stat-item">
                    <div class="stat">Combo: ${utils.appState.player.currentCombo}</div>
                    <div class="stat">Max Combo: ${utils.appState.player.maxCombo}</div>
                    <div class="stat">Completed: ${utils.appState.player.totalSentencesCompleted}</div>
                </div>
            `;
        }
    },
    
    // Update home screen display
    updateHomeScreen: function() {
        // Update player stats
        this.updatePlayerStats();
        
        // Update pet display
        data.PetManager.updatePetDisplay();
        
        // Update the home screen buttons
        document.getElementById('start-practice-btn').addEventListener('click', () => {
            this.startSentencePuzzle();
        });
        
        document.getElementById('review-btn').addEventListener('click', () => {
            this.startMistakeReview();
        });
        
        document.getElementById('pet-care-btn').addEventListener('click', () => {
            this.showPetCare();
        });
        
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showSettings();
        });
    },
    
    // Start mistake review
    startMistakeReview: function() {
        const mistakeSentences = data.DataUtil.getMistakeBagSentences();
        
        if (mistakeSentences.length === 0) {
            this.showFeedback("No sentences to review! Complete more sentences to fill your mistake bag.", "error");
            return;
        }
        
        // Show a random sentence from the mistake bag
        const randomIndex = Math.floor(Math.random() * mistakeSentences.length);
        gameState.currentSentence = mistakeSentences[randomIndex];
        
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
    
    // Show feedback message
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
    },
    
    // Initialize the game
    init: function() {
        // Load saved state
        utils.StorageUtil.loadState();
        
        // Initialize pet system
        data.PetManager.init();
        
        // Set up initial screen
        document.getElementById('home-screen').classList.add('active');
        document.getElementById('game-screen').classList.remove('active');
        
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
    GameManager.init();
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