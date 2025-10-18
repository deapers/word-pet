// WordPet - Utilities and Helper Functions

// Application state
let appState = {
    player: {
        level: 1,
        coins: 0,
        stamina: 5,
        maxStamina: 5,
        staminaRechargeTime: 60000, // 1 minute in ms
        lastStaminaUpdate: new Date(),
        totalSentencesCompleted: 0,
        totalMistakesMade: 0,
        currentCombo: 0,
        maxCombo: 0
    },
    settings: {
        volume: 0.8,
        enableTTS: true, // Enable text-to-speech by default
        maxDailyStamina: 10,
        enableAnimations: true,
        language: 'en',
        parentalPin: null
    }
};

// Text-to-Speech utility
const TTSUtil = {
    // Speak text using Web Speech API
    speak: function(text, language = 'en-US') {
        // Check if TTS is enabled in settings
        if (!appState.settings.enableTTS) {
            return;
        }
        
        // Check if speech synthesis is supported
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.volume = appState.settings.volume;
            utterance.rate = 0.6; // Slower rate for children
            utterance.pitch = 1.0;
            
            // Speak the text
            speechSynthesis.speak(utterance);
        } else {
            console.warn('Speech synthesis not supported in this browser');
        }
    },
    
    // Stop all speech
    stop: function() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
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
                
                // Manually copy properties to ensure we update the original object
                if (parsed.player) {
                    appState.player.level = parsed.player.level !== undefined ? parsed.player.level : appState.player.level;
                    appState.player.coins = parsed.player.coins !== undefined ? parsed.player.coins : appState.player.coins;
                    appState.player.stamina = parsed.player.stamina !== undefined ? parsed.player.stamina : appState.player.stamina;
                    appState.player.maxStamina = parsed.player.maxStamina !== undefined ? parsed.player.maxStamina : appState.player.maxStamina;
                    // For backward compatibility: if staminaRechargeTime is the old default (30 minutes), set to the new default (1 minute)
                    appState.player.staminaRechargeTime = parsed.player.staminaRechargeTime !== undefined ? 
                        (parsed.player.staminaRechargeTime === 1800000 ? 60000 : parsed.player.staminaRechargeTime) : 
                        appState.player.staminaRechargeTime;
                    
                    // Handle date conversion for lastStaminaUpdate
                    if (parsed.player.lastStaminaUpdate) {
                        if (typeof parsed.player.lastStaminaUpdate === 'string') {
                            appState.player.lastStaminaUpdate = new Date(parsed.player.lastStaminaUpdate);
                        } else {
                            appState.player.lastStaminaUpdate = parsed.player.lastStaminaUpdate; // Already a Date object
                        }
                    } else {
                        // Default to a very old date (2001-01-01) to ensure full stamina recovery on first load for old saves
                        appState.player.lastStaminaUpdate = new Date('2001-01-01');
                    }
                    
                    appState.player.totalSentencesCompleted = parsed.player.totalSentencesCompleted !== undefined ? parsed.player.totalSentencesCompleted : appState.player.totalSentencesCompleted;
                    appState.player.totalMistakesMade = parsed.player.totalMistakesMade !== undefined ? parsed.player.totalMistakesMade : appState.player.totalMistakesMade;
                    appState.player.currentCombo = parsed.player.currentCombo !== undefined ? parsed.player.currentCombo : appState.player.currentCombo;
                    appState.player.maxCombo = parsed.player.maxCombo !== undefined ? parsed.player.maxCombo : appState.player.maxCombo;
                }
                
                if (parsed.settings) {
                    appState.settings.volume = parsed.settings.volume !== undefined ? parsed.settings.volume : appState.settings.volume;
                    appState.settings.enableTTS = parsed.settings.enableTTS !== undefined ? parsed.settings.enableTTS : appState.settings.enableTTS;
                    appState.settings.maxDailyStamina = parsed.settings.maxDailyStamina !== undefined ? parsed.settings.maxDailyStamina : appState.settings.maxDailyStamina;
                    appState.settings.enableAnimations = parsed.settings.enableAnimations !== undefined ? parsed.settings.enableAnimations : appState.settings.enableAnimations;
                    appState.settings.language = parsed.settings.language !== undefined ? parsed.settings.language : appState.settings.language;
                    appState.settings.parentalPin = parsed.settings.parentalPin !== undefined ? parsed.settings.parentalPin : appState.settings.parentalPin;
                }
                
                // Update the global reference to ensure it reflects the loaded state
                if (window.utils) {
                    window.utils.appState = appState;
                }
            } catch (e) {
                console.error('Error loading state from localStorage:', e);
            }
        }
        return appState;
    },

    // Check if value is an object
    isObject: function(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
    
    resetState: function() {
        localStorage.removeItem('wordpet-state');
        appState = {
            player: {
                level: 1,
                coins: 0,
                stamina: 5,
                maxStamina: 5,
                staminaRechargeTime: 60000, // 1 minute in ms
                lastStaminaUpdate: new Date('2001-01-01'),
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
        
        console.log("Stamina update check - Elapsed:", elapsed, "ms, Interval:", rechargeInterval, "ms");
        
        // If the elapsed time is equal to or greater than the recharge interval
        // and the player's stamina is less than the max, restore all stamina at once
        if (elapsed >= rechargeInterval && appState.player.stamina < appState.player.maxStamina) {
            const oldStamina = appState.player.stamina;
            // Restore all stamina at once when the interval has passed
            appState.player.stamina = appState.player.maxStamina;
            
            console.log("Fully restoring stamina - Old:", oldStamina, "New:", appState.player.stamina);
            
            // Update the last update time to now to reset the timer
            appState.player.lastStaminaUpdate = now;
            
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

// Make utilities available globally for browser (with initial state)
window.utils = {
    StorageUtil,
    TimeUtil,
    ValidationUtil,
    RandomUtil,
    appState
};

// Ensure state is loaded when module is ready
StorageUtil.loadState();

// Update the global appState reference after loading (to ensure it reflects saved data)
window.utils.appState = appState;

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