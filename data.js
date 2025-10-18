// WordPet - Sentence Data and Management

// Function to create the initial expanded sentence library
function createInitialSentences() {
    return [
        // Food & Drinks (15 sentences)
        { text: "I like apples", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "I drink water", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "We eat lunch", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "Mom cooks dinner", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "I want cookies", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "Dad buys bread", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "We have breakfast", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "He likes pizza", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "She drinks milk", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "I eat bananas", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "We cook rice", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "They buy fruit", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "I love ice cream", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "She makes soup", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "We drink juice", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },

        // Family & Home (15 sentences)
        { text: "Mom loves me", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Dad plays games", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "I hug my sister", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Grandma tells stories", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "I clean my room", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "We watch TV", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "I brush my teeth", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Family eats dinner", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "I make my bed", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Dad drives the car", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Mom cooks food", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "I call my friend", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "We go to bed", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "I wash my hands", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Brother reads books", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },

        // School & Learning (15 sentences)
        { text: "I go to school", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Teacher reads books", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "I write with pencil", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Students sit desks", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "I learn new words", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Kids play at recess", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "I read books", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Teacher explains math", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "I do homework", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "School starts at nine", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "I raise my hand", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "We sing songs", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Art class is fun", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "I study for tests", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Friends share toys", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },

        // Activities & Play (15 sentences)
        { text: "I play with toys", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Kids ride bikes", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "I jump rope", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "We play soccer", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "I build with blocks", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Kids swim at pool", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "I draw pictures", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "We play hide and seek", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "I ride my skateboard", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Kids play on swings", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "I dance to music", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "We fly kites", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "I play video games", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Kids run in park", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "I play with dolls", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },

        // Weather & Outdoors (10 sentences)
        { text: "It is sunny", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "It rains today", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Snow falls down", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "The wind blows", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "It is cold outside", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "I wear a jacket", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "The sun shines bright", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "It is warm today", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "I see a rainbow", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "The clouds are gray", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" }
    ];
}

// Initialize sentence library
let sentences = createInitialSentences();

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
            // If sentence doesn't exist, create it
            sentence = {
                text: text,
                mastery: masteryScore,
                lastReviewed: new Date(),
                incorrectCount: isCorrect === false ? 1 : 0,
                correctCount: isCorrect === true ? 1 : 0,
                difficulty: "medium", // Default difficulty
                category: "general" // Default category
            };
            sentences.push(sentence);
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
        const savedData = localStorage.getItem('wordpet-data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                sentences = parsed.sentences || sentences;
                mistakeBag = parsed.mistakeBag || mistakeBag;
                petData = parsed.petData || petData;
                failedSentences = parsed.failedSentences || failedSentences; // Load failed sentences
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
            sentences,
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
    
    // Select next sentence function (with 30% priority for mistake bag)
    getNextSentence: function() {
        // 30% chance to get a mistake bag sentence
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
                
                // Fallback to a random sentence from the general list
                if (sentences.length > 0) {
                    const randomIndex = Math.floor(Math.random() * sentences.length);
                    return sentences[randomIndex];
                }
                return null;
            }
            
            return sentence;
        }
        
        // 70% chance to get a random sentence from the general list
        if (sentences.length > 0) {
            const randomIndex = Math.floor(Math.random() * sentences.length);
            return sentences[randomIndex];
        }
        return null;
    }
};

// Initialize data when module loads
DataUtil.initializeData();

// Make data available globally for browser
window.data = {
    DataUtil,
    sentences,
    mistakeBag,
    petData
};

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DataUtil,
        sentences,
        mistakeBag,
        petData
    };
}