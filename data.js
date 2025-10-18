// WordPet - Sentence Data and Management

// Function to create the initial expanded sentence library
function createInitialSentences() {
    return [
        // Food (15 sentences)
        { text: "I like apples", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "She eats bananas", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "He drinks milk", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "We eat bread", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "They like oranges", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "I want cookies", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "She buys eggs", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "He cooks rice", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "We drink juice", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "They eat chicken", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "I love pizza", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "She makes salad", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "He likes cheese", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "We buy fruit", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
        { text: "They drink tea", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },

        // Animals (15 sentences)
        { text: "The cat is cute", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "A dog runs fast", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Birds fly high", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Fish swim in water", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Elephants are big", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Monkeys climb trees", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Lions roar loudly", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Bears sleep winter", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Rabbits hop quickly", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Snakes slither ground", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Frogs jump ponds", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Horses run fast", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Cows eat grass", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Pigs roll mud", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
        { text: "Sheep have wool", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },

        // Weather (15 sentences)
        { text: "It is sunny", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Rain falls softly", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Snow is cold", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Wind blows leaves", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Clouds float sky", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Thunder rumbles loudly", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Lightning flashes bright", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Hail bounces ground", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Fog hides mountains", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Dew sparkles morning", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Frost covers windows", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Heat makes tired", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Cool air feels nice", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Storm brings wind", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
        { text: "Sun shines brightly", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },

        // Family (15 sentences)
        { text: "Mom loves me", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Dad plays games", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Brother shares toys", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Sister draws pictures", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Grandma tells stories", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Grandpa reads books", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Uncle visits weekends", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Aunt bakes cookies", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Cousins play together", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Family eats dinner", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Parents help homework", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Kids do chores", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Baby sleeps crib", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Teenager studies hard", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
        { text: "Family goes vacation", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },

        // School (15 sentences)
        { text: "I go to school", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Teacher explains lessons", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Students raise hands", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Books sit desks", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Pencils write paper", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Bell rings lunch", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Children play recess", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Homework due Friday", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Math problems challenging", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Reading improves vocabulary", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Science experiments fun", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Art class creative", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Music makes happy", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "Friends help study", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
        { text: "School bus yellow", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },

        // Toys & Play (15 sentences)
        { text: "I play with toys", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Blocks stack tall", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Dolls wear dresses", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Cars race fast", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Puzzles challenge minds", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Balls bounce walls", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Teddy bears soft", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Games teach skills", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Toys bring joy", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Children laugh playfully", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Kites fly windy", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Sandcastles wash waves", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Swings go high", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Slides are slippery", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
        { text: "Hide seek fun", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },

        // Transportation (10 sentences)
        { text: "Cars drive roads", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Trains travel tracks", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Planes fly sky", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Boats sail water", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Bikes ride paths", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Buses carry people", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Trucks haul goods", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Helicopters hover air", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Subway moves underground", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" },
        { text: "Motorcycles zoom streets", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "transportation" }
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
        const result = mistakeBag.sentences.map(text => this.getSentenceByText(text)).filter(Boolean);
        console.log("getMistakeBagSentences result:", result);
        return result;
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
            return this.getSentenceByText(mistakeBag.sentences[randomIndex]);
        }
        
        // 70% chance to get a random sentence from the general list
        const randomIndex = Math.floor(Math.random() * sentences.length);
        return sentences[randomIndex];
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