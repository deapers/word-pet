// WordPet - Utilities and Helper Functions

// Application state
let appState = {
    player: {
        level: 1,
        coins: 0,
        stamina: 5,
        maxStamina: 5,
        staminaRechargeTime: 1800000, // 30 minutes in ms
        lastStaminaUpdate: new Date(),
        totalSentencesCompleted: 0,
        totalMistakesMade: 0,
        currentCombo: 0,
        maxCombo: 0
    },
    settings: {
        volume: 0.8,
        enableTTS: true,
        maxDailyStamina: 10,
        enableAnimations: true,
        language: 'en',
        parentalPin: null
    }
};

// Utility functions for data persistence
const StorageUtil = {
    saveState: function() {
        localStorage.setItem('wordpet-state', JSON.stringify(appState));
    },
    
    loadState: function() {
        const saved = localStorage.getItem('wordpet-state');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with default state to handle missing properties
                appState = { ...appState, ...parsed };
            } catch (e) {
                console.error('Error loading state from localStorage:', e);
            }
        }
        return appState;
    },
    
    resetState: function() {
        localStorage.removeItem('wordpet-state');
        appState = {
            player: {
                level: 1,
                coins: 0,
                stamina: 5,
                maxStamina: 5,
                staminaRechargeTime: 1800000,
                lastStaminaUpdate: new Date(),
                totalSentencesCompleted: 0,
                totalMistakesMade: 0,
                currentCombo: 0,
                maxCombo: 0
            },
            settings: {
                volume: 0.8,
                enableTTS: true,
                maxDailyStamina: 10,
                enableAnimations: true,
                language: 'en',
                parentalPin: null
            }
        };
        this.saveState();
    }
};

// Time-based calculations for offline progress
const TimeUtil = {
    // Calculate elapsed time in milliseconds
    calculateElapsedTime: function(startTime, endTime = new Date()) {
        return endTime.getTime() - new Date(startTime).getTime();
    },
    
    // Update stamina based on elapsed time
    updateStamina: function() {
        const now = new Date();
        const elapsed = this.calculateElapsedTime(appState.player.lastStaminaUpdate, now);
        const rechargeInterval = appState.player.staminaRechargeTime;
        
        // Calculate how many stamina points to restore
        const staminaPointsToRestore = Math.floor(elapsed / rechargeInterval);
        
        if (staminaPointsToRestore > 0) {
            // Add stamina but not beyond max
            appState.player.stamina = Math.min(
                appState.player.maxStamina,
                appState.player.stamina + staminaPointsToRestore
            );
            
            // Update the last update time
            const remainingMs = elapsed % rechargeInterval;
            appState.player.lastStaminaUpdate = new Date(now.getTime() - remainingMs);
            
            // Save updated state
            StorageUtil.saveState();
        }
        
        // Return the current stamina amount
        return appState.player.stamina;
    },
    
    // Format time for display
    formatTime: function(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }
};

// Validation utilities
const ValidationUtil = {
    isValidEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    isValidPin: function(pin) {
        return pin && pin.length === 4 && /^\d+$/.test(pin);
    }
};

// Random utilities
const RandomUtil = {
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StorageUtil,
        TimeUtil,
        ValidationUtil,
        RandomUtil,
        appState
    };
}