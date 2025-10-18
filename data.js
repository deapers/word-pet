// WordPet - Sentence Data and Management

// Initialize sentence library
let sentences = [];

// Mistake bag structure (separate from main sentences)
let mistakeBag = {
    sentences: [],
    lastReviewDate: null,
    reviewPriority: 0.3 // 30% chance of showing mistake bag sentences
};

// Separate structure for failed sentences (distinct from mistake bag)
let failedSentences = {
    sentences: [], // List of sentences the user got wrong
    failureCounts: {}, // Track how many times each sentence was failed
    lastFailedDate: {} // Track when each sentence was last failed
};

// Pet data
let petData = {
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    decorations: [],
    lastGrowthUpdate: new Date(),
    offlineExpGain: 10, // Exp gained while offline per hour
    type: "dog"
};

// Load sentences from embedded data
function loadSentencesFromJSON() {
    try {
        // Embedded sentence data to avoid CORS issues when loading from file://
        const jsonData = [
  // Food & Drinks (15 sentences)
  { "text": "I like apples", "difficulty": "easy", "category": "food" },
  { "text": "I drink water", "difficulty": "easy", "category": "food" },
  { "text": "We eat lunch", "difficulty": "easy", "category": "food" },
  { "text": "Mom cooks dinner", "difficulty": "easy", "category": "food" },
  { "text": "I want cookies", "difficulty": "easy", "category": "food" },
  { "text": "Dad buys bread", "difficulty": "easy", "category": "food" },
  { "text": "We have breakfast", "difficulty": "easy", "category": "food" },
  { "text": "He likes pizza", "difficulty": "easy", "category": "food" },
  { "text": "She drinks milk", "difficulty": "easy", "category": "food" },
  { "text": "I eat bananas", "difficulty": "easy", "category": "food" },
  { "text": "We cook rice", "difficulty": "easy", "category": "food" },
  { "text": "They buy fruit", "difficulty": "easy", "category": "food" },
  { "text": "I love ice cream", "difficulty": "easy", "category": "food" },
  { "text": "She makes soup", "difficulty": "easy", "category": "food" },
  { "text": "We drink juice", "difficulty": "easy", "category": "food" },

  // Family & Home (15 sentences)
  { "text": "Mom loves me", "difficulty": "easy", "category": "family" },
  { "text": "Dad plays games", "difficulty": "easy", "category": "family" },
  { "text": "I hug my sister", "difficulty": "easy", "category": "family" },
  { "text": "Grandma tells stories", "difficulty": "easy", "category": "family" },
  { "text": "I clean my room", "difficulty": "easy", "category": "family" },
  { "text": "We watch TV", "difficulty": "easy", "category": "family" },
  { "text": "I brush my teeth", "difficulty": "easy", "category": "family" },
  { "text": "Family eats dinner", "difficulty": "easy", "category": "family" },
  { "text": "I make my bed", "difficulty": "easy", "category": "family" },
  { "text": "Dad drives the car", "difficulty": "easy", "category": "family" },
  { "text": "Mom cooks food", "difficulty": "easy", "category": "family" },
  { "text": "I call my friend", "difficulty": "easy", "category": "family" },
  { "text": "We go to bed", "difficulty": "easy", "category": "family" },
  { "text": "I wash my hands", "difficulty": "easy", "category": "family" },
  { "text": "Brother reads books", "difficulty": "easy", "category": "family" },

  // School & Learning (15 sentences)
  { "text": "I go to school", "difficulty": "easy", "category": "school" },
  { "text": "Teacher reads books", "difficulty": "easy", "category": "school" },
  { "text": "I write with pencil", "difficulty": "easy", "category": "school" },
  { "text": "Students sit desks", "difficulty": "easy", "category": "school" },
  { "text": "I learn new words", "difficulty": "easy", "category": "school" },
  { "text": "Kids play at recess", "difficulty": "easy", "category": "school" },
  { "text": "I read books", "difficulty": "easy", "category": "school" },
  { "text": "Teacher explains math", "difficulty": "easy", "category": "school" },
  { "text": "I do homework", "difficulty": "easy", "category": "school" },
  { "text": "School starts at nine", "difficulty": "easy", "category": "school" },
  { "text": "I raise my hand", "difficulty": "easy", "category": "school" },
  { "text": "We sing songs", "difficulty": "easy", "category": "school" },
  { "text": "Art class is fun", "difficulty": "easy", "category": "school" },
  { "text": "I study for tests", "difficulty": "easy", "category": "school" },
  { "text": "Friends share toys", "difficulty": "easy", "category": "school" },

  // Activities & Play (15 sentences)
  { "text": "I play with toys", "difficulty": "easy", "category": "play" },
  { "text": "Kids ride bikes", "difficulty": "easy", "category": "play" },
  { "text": "I jump rope", "difficulty": "easy", "category": "play" },
  { "text": "We play soccer", "difficulty": "easy", "category": "play" },
  { "text": "I build with blocks", "difficulty": "easy", "category": "play" },
  { "text": "Kids swim at pool", "difficulty": "easy", "category": "play" },
  { "text": "I draw pictures", "difficulty": "easy", "category": "play" },
  { "text": "We play hide and seek", "difficulty": "easy", "category": "play" },
  { "text": "I ride my skateboard", "difficulty": "easy", "category": "play" },
  { "text": "Kids play on swings", "difficulty": "easy", "category": "play" },
  { "text": "I dance to music", "difficulty": "easy", "category": "play" },
  { "text": "We fly kites", "difficulty": "easy", "category": "play" },
  { "text": "I play video games", "difficulty": "easy", "category": "play" },
  { "text": "Kids run in park", "difficulty": "easy", "category": "play" },
  { "text": "I play with dolls", "difficulty": "easy", "category": "play" },

  // Weather & Outdoors (10 sentences)
  { "text": "It is sunny", "difficulty": "easy", "category": "weather" },
  { "text": "It rains today", "difficulty": "easy", "category": "weather" },
  { "text": "Snow falls down", "difficulty": "easy", "category": "weather" },
  { "text": "The wind blows", "difficulty": "easy", "category": "weather" },
  { "text": "It is cold outside", "difficulty": "easy", "category": "weather" },
  { "text": "I wear a jacket", "difficulty": "easy", "category": "weather" },
  { "text": "The sun shines bright", "difficulty": "easy", "category": "weather" },
  { "text": "It is warm today", "difficulty": "easy", "category": "weather" },
  { "text": "I see a rainbow", "difficulty": "easy", "category": "weather" },
  { "text": "The clouds are gray", "difficulty": "easy", "category": "weather" }
];

        // Add default state properties to each sentence
        sentences = jsonData.map(sentence => ({
            text: sentence.text,
            mastery: 0.0,           // Default mastery
            lastReviewed: null,     // Last review time
            incorrectCount: 0,      // Number of incorrect attempts
            correctCount: 0,        // Number of correct attempts
            difficulty: sentence.difficulty || "easy",  // Preserve difficulty or default to easy
            category: sentence.category || "general"    // Preserve category or default to general
        }));
        
        console.log(`Loaded and initialized ${sentences.length} sentences from embedded data`);
        return sentences;
    } catch (error) {
        console.error('Error loading sentences:', error);
        // Fallback: create basic sentences if loading fails
        sentences = [
            { text: "I like apples", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
            { text: "I drink water", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
            { text: "We eat lunch", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" }
        ];
        return sentences;
    }
}

// Data utility functions
const DataUtil = {
    // Get sentence by text
    getSentenceByText: function(text) {
        return sentences.find(sentence => sentence.text === text);
    },
    
    // Get sentence mastery level
    getSentenceMastery: function(text) {
        const sentence = this.getSentenceByText(text);
        return sentence ? sentence.mastery : 0.0;
    },
    
    // Update sentence mastery
    updateSentenceMastery: function(text, masteryScore, isCorrect = null) {
        let sentence = this.getSentenceByText(text);
        
        if (!sentence) {
            // If sentence doesn't exist in the predefined list, log an error
            // This should not happen in normal operation since all sentences are preloaded
            console.error(`Sentence not found in predefined list: ${text}`);
            return null;
        } else {
            sentence.mastery = masteryScore;
            sentence.lastReviewed = new Date();
            
            if (isCorrect !== null) {
                if (isCorrect) {
                    sentence.correctCount += 1;
                } else {
                    sentence.incorrectCount += 1;
                }
            }
        }
        
        // Keep mastery between 0.0 and 1.0
        sentence.mastery = Math.max(0.0, Math.min(1.0, sentence.mastery));

        // Check if sentence should be in mistake bag
        if (sentence.mastery < 0.8 && !mistakeBag.sentences.includes(text)) {
            mistakeBag.sentences.push(text);
        } else if (sentence.mastery >= 0.8 && mistakeBag.sentences.includes(text)) {
            mistakeBag.sentences = mistakeBag.sentences.filter(item => item !== text);
        }
        
        // Save updated data
        this.saveData();
        
        return sentence;
    },
    
    getSentencesByCategory: function(category) {
        return sentences.filter(sentence => sentence.category === category);
    },
    
    getSentencesByDifficulty: function(difficulty) {
        return sentences.filter(sentence => sentence.difficulty === difficulty);
    },
    
    // Failed sentences functions
    addSentenceToFailedList: function(text) {
        if (!failedSentences.sentences.includes(text)) {
            failedSentences.sentences.push(text);
            
            // Initialize failure count if not already set
            if (!failedSentences.failureCounts[text]) {
                failedSentences.failureCounts[text] = 0;
            }
            failedSentences.failureCounts[text]++;
            
            // Update last failed date
            failedSentences.lastFailedDate[text] = new Date().toISOString();
        } else {
            // Increment failure count
            failedSentences.failureCounts[text]++;
            failedSentences.lastFailedDate[text] = new Date().toISOString();
        }
        
        // Save updated data
        this.saveData();
    },
    
    // Get failed sentences
    getFailedSentences: function() {
        return failedSentences.sentences.map(text => this.getSentenceByText(text)).filter(Boolean);
    },
    
    // Get failure count for a sentence
    getFailureCount: function(text) {
        return failedSentences.failureCounts[text] || 0;
    },
    
    // Remove sentence from failed list
    removeSentenceFromFailedList: function(text) {
        failedSentences.sentences = failedSentences.sentences.filter(item => item !== text);
        delete failedSentences.failureCounts[text];
        delete failedSentences.lastFailedDate[text];
        
        // Save updated data
        this.saveData();
    },
    
    // Mistake bag functions
    addSentenceToMistakeBag: function(text) {
        console.log("Adding sentence to mistake bag:", text);
        console.log("Current mistake bag before adding:", mistakeBag.sentences);
        if (!mistakeBag.sentences.includes(text)) {
            mistakeBag.sentences.push(text);
            console.log("Sentence added to mistake bag. Current bag:", mistakeBag.sentences);
            this.saveData();
        } else {
            console.log("Sentence already in mistake bag:", text);
        }
    },
    
    removeSentenceFromMistakeBag: function(text) {
        mistakeBag.sentences = mistakeBag.sentences.filter(item => item !== text);
        this.saveData();
    },
    
    getMistakeBagSentences: function() {
        console.log("getMistakeBagSentences called - Current mistake bag:", mistakeBag.sentences);
        
        // Filter out any sentences that no longer exist in the main sentences array
        const validMistakeSentences = [];
        const sentencesToRemove = [];
        
        mistakeBag.sentences.forEach(text => {
            const sentence = this.getSentenceByText(text);
            if (sentence) {
                validMistakeSentences.push(sentence);
            } else {
                // Mark for removal from mistake bag
                sentencesToRemove.push(text);
            }
        });
        
        // Clean up mistake bag by removing references to non-existent sentences
        if (sentencesToRemove.length > 0) {
            mistakeBag.sentences = mistakeBag.sentences.filter(text => !sentencesToRemove.includes(text));
            this.saveData(); // Persist the cleaned-up mistake bag
        }
        
        console.log("getMistakeBagSentences result:", validMistakeSentences);
        return validMistakeSentences;
    },
    
    isMistakeBagSentence: function(text) {
        return mistakeBag.sentences.includes(text);
    },
    
    // Pet data functions
    getPetData: function() {
        return petData;
    },
    
    setPetData: function(data) {
        petData = { ...petData, ...data };
        this.saveData();
        return petData;
    },
    
    updatePetExp: function(expGain) {
        petData.exp += expGain;
        
        // Check for level up
        if (petData.exp >= petData.expToNextLevel) {
            petData.level++;
            petData.exp = petData.exp - petData.expToNextLevel; // Carry over remaining exp
            petData.expToNextLevel = Math.floor(petData.expToNextLevel * 1.5); // Increase exp needed
            
            // Level up feedback could be triggered here
            console.log(`Pet leveled up to level ${petData.level}!`);
        }
        
        this.saveData();
        return petData;
    },
    
    // Core data operations
    initializeData: function() {
        // First, load the base sentence library from embedded data
        loadSentencesFromJSON();
        
        const savedData = localStorage.getItem('wordpet-data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                
                // Update sentences array - merge saved mastery data with loaded sentences
                if (parsed.sentences && sentences && sentences.length > 0) {
                    // Create a map of saved sentences by text
                    const savedSentenceMap = {};
                    parsed.sentences.forEach(s => {
                        savedSentenceMap[s.text] = s;
                    });
                    
                    // Update the loaded sentences with saved mastery data
                    sentences.forEach((sentence, index) => {
                        const savedSentence = savedSentenceMap[sentence.text];
                        if (savedSentence) {
                            // Only update the mastery-related fields, keep text, difficulty, and category
                            sentence.mastery = savedSentence.mastery || 0.0;
                            sentence.lastReviewed = savedSentence.lastReviewed || null;
                            sentence.incorrectCount = savedSentence.incorrectCount || 0;
                            sentence.correctCount = savedSentence.correctCount || 0;
                        }
                        // If sentence is not in saved data, it will keep the default values we set when loading
                    });
                    
                    // Handle any new sentences that were added to the JSON after user data was saved
                    // Add any missing sentences from the JSON file with default values
                    // (This is already handled by the map approach)
                }
                
                // Update mistakeBag properties in place
                if (parsed.mistakeBag) {
                    // Manually copy properties to ensure we update the original object
                    mistakeBag.sentences = parsed.mistakeBag.sentences || mistakeBag.sentences;
                    mistakeBag.lastReviewDate = parsed.mistakeBag.lastReviewDate || mistakeBag.lastReviewDate;
                    mistakeBag.reviewPriority = parsed.mistakeBag.reviewPriority || mistakeBag.reviewPriority;
                }
                
                // Update petData properties in place and handle date conversion
                if (parsed.petData) {
                    // Manually copy properties to ensure we update the original object
                    petData.level = parsed.petData.level || petData.level;
                    petData.exp = parsed.petData.exp || petData.exp;
                    petData.expToNextLevel = parsed.petData.expToNextLevel || petData.expToNextLevel;
                    petData.decorations = parsed.petData.decorations || petData.decorations;
                    petData.offlineExpGain = parsed.petData.offlineExpGain || petData.offlineExpGain;
                    petData.type = parsed.petData.type || petData.type;
                    
                    // Convert lastGrowthUpdate back to Date object if it exists and is a string
                    if (parsed.petData.lastGrowthUpdate) {
                        if (typeof parsed.petData.lastGrowthUpdate === 'string') {
                            petData.lastGrowthUpdate = new Date(parsed.petData.lastGrowthUpdate);
                        } else {
                            petData.lastGrowthUpdate = parsed.petData.lastGrowthUpdate; // Already a Date object
                        }
                    }
                }
                
                // Update failedSentences properties in place
                if (parsed.failedSentences) {
                    // Manually copy properties to ensure we update the original object
                    failedSentences.sentences = parsed.failedSentences.sentences || failedSentences.sentences;
                    failedSentences.failureCounts = parsed.failedSentences.failureCounts || failedSentences.failureCounts;
                    failedSentences.lastFailedDate = parsed.failedSentences.lastFailedDate || failedSentences.lastFailedDate;
                }
            } catch (e) {
                console.error('Error loading data from localStorage:', e);
                // If loading fails, reset to default values
                this.resetData();
            }
        }
        return { sentences, mistakeBag, petData, failedSentences }; // Return failed sentences too
    },
    
    saveData: function() {
        const dataToSave = {
            sentences, // This will include all sentence data with mastery info
            mistakeBag,
            petData,
            failedSentences // Include failed sentences in saved data
        };
        localStorage.setItem('wordpet-data', JSON.stringify(dataToSave));
    },
    
    resetData: function() {
        sentences = createInitialSentences(); // Use the function to get fresh sentences
        mistakeBag = {
            sentences: [],
            lastReviewDate: null,
            reviewPriority: 0.3
        };
        petData = {
            level: 1,
            exp: 0,
            expToNextLevel: 100,
            decorations: [],
            lastGrowthUpdate: new Date(),
            offlineExpGain: 10,
            type: "dog"
        };
        failedSentences = {
            sentences: [],
            failureCounts: {},
            lastFailedDate: {}
        };
        this.saveData();
    },
    
    // Select next sentence function (with priority for low mastery sentences)
    getNextSentence: function() {
        // First, check if we should get a mistake bag sentence (30% chance)
        if (mistakeBag.sentences.length > 0 && Math.random() < mistakeBag.reviewPriority) {
            // Pick a random sentence from the mistake bag
            const randomIndex = Math.floor(Math.random() * mistakeBag.sentences.length);
            const sentenceText = mistakeBag.sentences[randomIndex];
            const sentence = this.getSentenceByText(sentenceText);
            
            // If sentence doesn't exist in main array, create it temporarily but prioritize it
            if (!sentence) {
                // Clean up the mistake bag by removing reference to non-existent sentence
                mistakeBag.sentences = mistakeBag.sentences.filter(item => item !== sentenceText);
                this.saveData();
                
                // Fallback to a low mastery sentence from the general list
                return this.getNextLowMasterySentence();
            }
            
            return sentence;
        }
        
        // 70% chance: get a sentence based on mastery (low mastery first)
        return this.getNextLowMasterySentence();
    },
    
    // Get the next sentence with the lowest mastery
    getNextLowMasterySentence: function() {
        if (sentences.length === 0) {
            return null;
        }
        
        // Filter sentences that are not in the mistake bag to avoid over-prioritizing
        // (This prevents low-mastery sentences from appearing too frequently)
        const availableSentences = sentences.filter(sentence => {
            return !mistakeBag.sentences.includes(sentence.text);
        });
        
        // If all sentences are in mistake bag or no filtered results, use all sentences
        if (availableSentences.length === 0) {
            // Sort all sentences by mastery (ascending - lowest mastery first)
            const sortedSentences = [...sentences].sort((a, b) => a.mastery - b.mastery);
            return sortedSentences[0];
        } else {
            // Sort available sentences by mastery (ascending - lowest mastery first)
            const sortedSentences = [...availableSentences].sort((a, b) => a.mastery - b.mastery);
            return sortedSentences[0];
        }
    }
};

// Make data available globally for browser
// Note: This creates initial references to the default data objects
window.data = {
    DataUtil,
    sentences,
    mistakeBag,
    petData
};

// Initialize data when module loads (this will update the local variables with saved data in place)
DataUtil.initializeData();

// Update the global data object to ensure it reflects loaded data
window.data.sentences = sentences;
window.data.mistakeBag = mistakeBag;
window.data.petData = petData;

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DataUtil,
        sentences,
        mistakeBag,
        petData
    };
}