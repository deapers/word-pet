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
        maxCombo: 0,
        avatar: '😊', // Default avatar
        avatarLevel: 1 // Track avatar level separately if needed
    },
    settings: {
        volume: 0.8,
        enableTTS: true, // Enable text-to-speech by default
        maxDailyStamina: 10,
        enableAnimations: true,
        language: 'en',
        parentalPin: null
    },
    ttsConfig: {
        enabled: true,
        volume: 0.8, // Default volume level (0.0 to 1.0)
        rate: 0.6,   // Speech rate (0.1 to 2.0, default 0.6 for children)
        pitch: 1.0   // Voice pitch (0.0 to 2.0, default 1.0)
    },
    userInteractionState: {
        currentAudioPlaying: false,
        audioQueue: [],
        lastWordClick: null,
        translationVisible: false
    }
};

// Sound effects management
const SoundEffectManager = {
    // Define sound effects
    soundEffects: {
        success: {
            id: 'success-chime',
            name: 'Success Chime',
            // Using Web Audio API to generate simple success sound
            generateAudio: function() {
                if (typeof window.AudioContext !== 'undefined' || typeof window.webkitAudioContext !== 'undefined') {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
                    
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                } else {
                    // Fallback: try using TTS to say "Success"
                    if (typeof window.utils !== 'undefined' && window.utils.TTSUtil) {
                        window.utils.TTSUtil.speak('Success');
                    }
                }
            }
        }
    },
    
    // Play a specific sound effect
    play: function(effectId) {
        const effect = this.soundEffects[effectId];
        if (effect) {
            effect.generateAudio();
        } else {
            console.warn(`Sound effect with ID '${effectId}' not found`);
        }
    }
};

// Text-to-Speech utility
const TTSUtil = {
    // Check if TTS is supported and available
    isTTSAvailable: function() {
        return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    },
    
    // Check if voices are loaded and available
    checkVoicesAvailability: function() {
        if (!this.isTTSAvailable()) {
            return false;
        }
        
        // Get voices immediately
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            console.log(`TTSUtil.checkVoicesAvailability() - Voices available: ${voices.length}`);
            return true;
        }
        
        // If no voices immediately, set up listener to wait for voices
        return new Promise((resolve) => {
            const handleVoicesChanged = () => {
                const voices = speechSynthesis.getVoices();
                console.log(`TTSUtil.checkVoicesAvailability() - Voices loaded: ${voices.length}`);
                speechSynthesis.onvoiceschanged = null;
                
                if (voices.length > 0) {
                    resolve(true);
                } else {
                    console.warn('TTSUtil.checkVoicesAvailability() - No voices available even after voiceschanged event');
                    resolve(false);
                }
            };
            
            speechSynthesis.onvoiceschanged = handleVoicesChanged;
            
            // Trigger voice loading by calling getVoices again
            speechSynthesis.getVoices();
            
            // Timeout after 2 seconds to prevent hanging
            setTimeout(() => {
                speechSynthesis.onvoiceschanged = null;
                console.warn('TTSUtil.checkVoicesAvailability() - Timeout waiting for voices');
                resolve(false);
            }, 2000);
        });
    },
    
    // Preload voices to ensure they're available, with promise-based callback
    init: function() {
        return new Promise((resolve) => {
            console.log('TTSUtil.init() called');
            
            if (!this.isTTSAvailable()) {
                console.warn('TTSUtil.init() - speechSynthesis not supported in this browser');
                resolve(false);
                return;
            }
            
            // Load voices early to make them available
            const voices = speechSynthesis.getVoices();
            console.log(`TTSUtil.init() - Initial voices count: ${voices.length}`);
            
            if (voices.length > 0) {
                // Voices are already available
                console.log('TTSUtil.init() - Voices already available');
                resolve(true);
            } else {
                // Add listener to capture when voices are loaded
                const handleVoicesChanged = () => {
                    const voices = speechSynthesis.getVoices();
                    console.log(`TTSUtil - Voices after change: ${voices.length}`);
                    speechSynthesis.onvoiceschanged = null;
                    
                    if (voices.length > 0) {
                        console.log('TTSUtil.init() - Voices loaded successfully');
                        resolve(true);
                    } else {
                        console.warn('TTSUtil.init() - No voices available after voiceschanged event');
                        resolve(false);
                    }
                };
                
                speechSynthesis.onvoiceschanged = handleVoicesChanged;
                
                // Trigger voice loading by calling getVoices again
                speechSynthesis.getVoices();
                
                // Timeout after 2 seconds to prevent hanging
                setTimeout(() => {
                    if (speechSynthesis.onvoiceschanged === handleVoicesChanged) {
                        speechSynthesis.onvoiceschanged = null;
                        console.warn('TTSUtil.init() - Timeout waiting for voices during initialization');
                        resolve(false);
                    }
                }, 2000);
            }
        });
    },
    
    // Speak text using Web Speech API with concurrency management
    speak: function(text, language = 'en-US') {
        console.log(`TTSUtil.speak() called with text: "${text}", language: ${language}`);
        
        // Check if TTS is enabled in settings
        if (!appState.settings.enableTTS) {
            console.log('TTSUtil.speak() - TTS is disabled in settings');
            return;
        }
        
        if ('speechSynthesis' in window) {
            // Create utterance with TTS config parameters
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.volume = appState.ttsConfig.volume;
            utterance.rate = appState.ttsConfig.rate;
            utterance.pitch = appState.ttsConfig.pitch;
            
            // Add event listeners to update interaction state
            utterance.onstart = () => {
                console.log(`TTSUtterance started: "${text}"`);
                appState.userInteractionState.currentAudioPlaying = true;
            };
            
            utterance.onend = () => {
                console.log(`TTSUtterance ended: "${text}"`);
                appState.userInteractionState.currentAudioPlaying = false;
                
                // Process next item in queue if exists
                if (appState.userInteractionState.audioQueue.length > 0) {
                    const nextItem = appState.userInteractionState.audioQueue.shift();
                    setTimeout(() => {
                        this.speak(nextItem.text, nextItem.language);
                    }, 100); // Small delay to ensure clean transition
                }
            };
            
            utterance.onerror = (event) => {
                console.error(`TTSUtterance error:`, event);
                appState.userInteractionState.currentAudioPlaying = false;
            };
            
            // Handle concurrency: either cancel and play immediately or queue
            if (appState.userInteractionState.currentAudioPlaying) {
                // Current audio is playing, so queue this request
                appState.userInteractionState.audioQueue.push({ text, language });
                console.log(`TTSUtil.speak() - Queued request for: "${text}", queue length: ${appState.userInteractionState.audioQueue.length}`);
            } else {
                // No audio currently playing, so play immediately
                speechSynthesis.cancel(); // Cancel any remaining speech
                speechSynthesis.speak(utterance);
                console.log(`TTSUtil.speak() - Speaking: "${text}"`);
            }
        } else {
            console.warn('Speech synthesis not supported in this browser');
        }
    },
    
    // Speak word with specific parameters for child learning with concurrency management
    speakWord: function(word) {
        console.log(`TTSUtil.speakWord() called for word: "${word}"`);
        
        // Check if TTS is enabled
        if (!appState.ttsConfig.enabled) {
            console.log('TTSUtil.speakWord() - TTS is disabled in config');
            return;
        }
        
        // Check if browser supports speech synthesis
        if (!('speechSynthesis' in window)) {
            console.warn('TTSUtil.speakWord() - Speech synthesis not supported in this browser');
            return;
        }
        
        // Log browser information for debugging
        console.log('TTSUtil.speakWord() - Browser supports speechSynthesis');
        
        // Get available voices for debugging
        const voices = speechSynthesis.getVoices();
        console.log(`TTSUtil.speakWord() - Available voices: ${voices.length}`);
        
        if (voices.length === 0) {
            // Voices might not be loaded yet, listen for them
            console.log('TTSUtil.speakWord() - No voices available yet, waiting for voiceschanged event');
            
            const handleVoicesChanged = () => {
                const loadedVoices = speechSynthesis.getVoices();
                console.log(`TTSUtil.speakWord() - Voices loaded: ${loadedVoices.length}`);
                
                if (loadedVoices.length > 0) {
                    // Try speaking again now that voices are loaded
                    console.log('TTSUtil.speakWord() - Retrying speak with loaded voices');
                    speechSynthesis.onvoiceschanged = null;
                    this.speakWord(word); // Recursive call with loaded voices
                } else {
                    console.warn('TTSUtil.speakWord() - Still no voices available after voiceschanged event');
                    speechSynthesis.onvoiceschanged = null;
                }
            };
            
            speechSynthesis.onvoiceschanged = handleVoicesChanged;
            
            // Trigger voice loading by calling getVoices again
            speechSynthesis.getVoices();
            return;
        }
        
        // Log voice details
        const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
        console.log(`TTSUtil.speakWord() - English voices available: ${englishVoices.length}`);
        if (englishVoices.length > 0) {
            console.log(`TTSUtil.speakWord() - First English voice: ${englishVoices[0].name} (${englishVoices[0].lang})`);
        }
        
        // Create utterance for word pronunciation
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.volume = appState.ttsConfig.volume;
        utterance.rate = appState.ttsConfig.rate; // Using config rate for consistency
        utterance.pitch = appState.ttsConfig.pitch;
        
        // Log utterance settings
        console.log(`TTSUtil.speakWord() - Utterance settings:`, {
            text: word,
            lang: utterance.lang,
            volume: utterance.volume,
            rate: utterance.rate,
            pitch: utterance.pitch
        });
        
        // Add event listeners to update interaction state
        utterance.onstart = () => {
            console.log(`TTSUtterance word started: "${word}"`);
            appState.userInteractionState.currentAudioPlaying = true;
        };
        
        utterance.onend = () => {
            console.log(`TTSUtterance word ended: "${word}"`);
            appState.userInteractionState.currentAudioPlaying = false;
            
            // Process next item in queue if exists
            if (appState.userInteractionState.audioQueue.length > 0) {
                const nextItem = appState.userInteractionState.audioQueue.shift();
                console.log(`TTSUtil.speakWord() - Processing next item in queue: "${nextItem.text}"`);
                setTimeout(() => {
                    this.speak(nextItem.text, nextItem.language);
                }, 100); // Small delay to ensure clean transition
            }
        };
        
        utterance.onerror = (event) => {
            console.error(`TTSUtterance word error:`, event);
            console.error(`TTSUtterance word error details:`, {
                error: event.error,
                charIndex: event.charIndex,
                elapsedTime: event.elapsedTime,
                name: event.name
            });
            appState.userInteractionState.currentAudioPlaying = false;
        };
        
        utterance.onpause = () => {
            console.log(`TTSUtterance word paused: "${word}"`);
        };
        
        utterance.onresume = () => {
            console.log(`TTSUtterance word resumed: "${word}"`);
        };
        
        // Handle concurrency: either cancel and play immediately or queue
        if (appState.userInteractionState.currentAudioPlaying) {
            // Current audio is playing, so queue this request
            appState.userInteractionState.audioQueue.push({ text: word, language: 'en-US' });
            console.log(`TTSUtil.speakWord() - Queued word: "${word}", queue length: ${appState.userInteractionState.audioQueue.length}`);
        } else {
            // No audio currently playing, so play immediately
            console.log('TTSUtil.speakWord() - Cancelling any existing speech and speaking new utterance');
            speechSynthesis.cancel(); // Cancel any remaining speech
            
            // Add a small delay to ensure clean transition
            setTimeout(() => {
                try {
                    speechSynthesis.speak(utterance);
                    console.log(`TTSUtil.speakWord() - Speaking word: "${word}"`);
                } catch (error) {
                    console.error(`TTSUtil.speakWord() - Error speaking word "${word}":`, error);
                }
            }, 50);
        }
    },
    
    // Stop all speech and clear queue
    stop: function() {
        console.log('TTSUtil.stop() called');
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            appState.userInteractionState.currentAudioPlaying = false;
            appState.userInteractionState.audioQueue = []; // Clear the queue
            console.log('TTSUtil.stop() - Speech cancelled and queue cleared');
        }
    },
    
    // Check if TTS is working properly
    testTTS: async function() {
        console.log('TTSUtil.testTTS() called');
        
        // Check if TTS is available and voices are loaded
        if (!this.isTTSAvailable()) {
            console.warn('TTSUtil.testTTS() - TTS not available in this browser');
            return false;
        }
        
        const voicesAvailable = await this.checkVoicesAvailability();
        if (!voicesAvailable) {
            console.warn('TTSUtil.testTTS() - No voices available for TTS');
            return false;
        }
        
        // Try to speak a simple test phrase
        try {
            this.speak('Testing TTS functionality');
            console.log('TTSUtil.testTTS() - TTS test successful');
            return true;
        } catch (error) {
            console.error('TTSUtil.testTTS() - TTS test failed:', error);
            return false;
        }
    },
    
    // Clear the audio queue without stopping current speech
    clearQueue: function() {
        console.log('TTSUtil.clearQueue() called');
        appState.userInteractionState.audioQueue = [];
        console.log('TTSUtil.clearQueue() - Queue cleared, items removed');
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
                    
                    // Load avatar fields with backward compatibility
                    appState.player.avatar = parsed.player.avatar !== undefined ? parsed.player.avatar : '😊';
                    appState.player.avatarLevel = parsed.player.avatarLevel !== undefined ? parsed.player.avatarLevel : 1;
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
                maxCombo: 0,
                avatar: '😊', // Default avatar
                avatarLevel: 1 // Track avatar level separately if needed
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

// Player avatar management
const AvatarManager = {
    // Define avatar stages based on player level
    getAvatarForLevel: function(level) {
        if (level >= 20) {
            // Advanced level: superhero or crown
            return ['🦸‍♂️', '🦸‍♀️', '👑'][Math.min(level - 20, 2)];
        } else if (level >= 10) {
            // Intermediate level: cool expressions
            return ['😎', '🤩', '🥳'][Math.min(level - 10, 2)];
        } else {
            // Initial level: basic smiley faces
            return ['😊', '😄', '😆'][Math.min(level - 1, 2)];
        }
    },
    
    // Update player avatar based on current level
    updatePlayerAvatar: function() {
        console.log('AvatarManager.updatePlayerAvatar() called - using ULTRA SAFE version');
        const currentLevel = utils.appState.player.level;
        utils.appState.player.avatar = this.getAvatarForLevel(currentLevel);
        
        // Save updated state
        utils.StorageUtil.saveState();
        
        // Update UI to reflect avatar change - directly update pet display
        console.log('AvatarManager.updatePlayerAvatar() - directly updating pet display');
        if (window.PetManager && typeof window.PetManager.updatePetDisplay === 'function') {
            try {
                window.PetManager.updatePetDisplay();
                console.log('AvatarManager.updatePlayerAvatar() - pet display updated successfully');
            } catch (error) {
                console.warn('Failed to update pet display:', error);
            }
        } else {
            console.log('AvatarManager.updatePlayerAvatar() - PetManager not available');
        }
        
        // Return the new avatar for potential use
        return utils.appState.player.avatar;
    }
};

// Make utilities available globally for browser (with initial state)
window.utils = {
    StorageUtil,
    TimeUtil,
    ValidationUtil,
    RandomUtil,
    AvatarManager,
    TTSUtil,  // Add TTSUtil to the global utils object
    appState
};

// Ensure state is loaded when module is ready
StorageUtil.loadState();

// Initialize TTSUtil after window.utils is set
if (window.utils && window.utils.TTSUtil) {
    window.utils.TTSUtil.init();
}

// Update the global appState reference after loading (to ensure it reflects saved data)
window.utils.appState = appState;

// Initialize player avatar based on current level
if (window.utils && window.utils.AvatarManager) {
    window.utils.AvatarManager.updatePlayerAvatar();
}

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StorageUtil,
        TimeUtil,
        ValidationUtil,
        RandomUtil,
        TTSUtil,
        appState
    };
}

// Initialize TTSUtil when document is loaded to ensure browser compatibility
document.addEventListener('DOMContentLoaded', function() {
    // Initialize TTSUtil after page is fully loaded
    if (window.utils && window.utils.TTSUtil) {
        window.utils.TTSUtil.init();
    }
});