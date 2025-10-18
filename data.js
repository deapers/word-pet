// WordPet - Data Management and Sentence Library

// Initialize data structures
let sentences = [
    { text: "I like apples", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
    { text: "It is sunny today", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
    { text: "I have a red ball", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "toys" },
    { text: "My cat is black", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
    { text: "I go to school", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
    { text: "I eat breakfast", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
    { text: "The sky is blue", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
    { text: "I love my family", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
    { text: "I play with toys", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
    { text: "I drink water", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" }
];

let mistakeBag = {
    sentences: [],
    lastReviewDate: null,
    reviewPriority: 0.3 // 30% chance of showing mistake bag sentences
};

let petData = {
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    decorations: [],
    lastGrowthUpdate: new Date(),
    offlineExpGain: 10, // Exp gained while offline per hour
    type: "dog"
};

// Data access functions
const DataUtil = {
    // Sentence-related functions
    getSentenceByText: function(text) {
        return sentences.find(sentence => sentence.text === text);
    },
    
    getSentenceMastery: function(text) {
        const sentence = this.getSentenceByText(text);
        return sentence ? sentence.mastery : 0.0;
    },
    
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
    
    // Mistake bag functions
    addSentenceToMistakeBag: function(text) {
        if (!mistakeBag.sentences.includes(text)) {
            mistakeBag.sentences.push(text);
            this.saveData();
        }
    },
    
    removeSentenceFromMistakeBag: function(text) {
        mistakeBag.sentences = mistakeBag.sentences.filter(item => item !== text);
        this.saveData();
    },
    
    getMistakeBagSentences: function() {
        return mistakeBag.sentences.map(text => this.getSentenceByText(text)).filter(Boolean);
    },
    
    isMistakeBagSentence: function(text) {
        return mistakeBag.sentences.includes(text);
    },
    
    // Pet data functions
    getPetData: function() {
        return petData;
    },
    
    updatePetExp: function(expGain) {
        petData.exp += expGain;
        
        // Check for level up
        if (petData.exp >= petData.expToNextLevel) {
            petData.level += 1;
            const newExp = petData.exp - petData.expToNextLevel;
            petData.exp = newExp;
            
            // Increase exp needed for next level
            petData.expToNextLevel = 100 + (petData.level * 50);
            
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
            } catch (e) {
                console.error('Error loading data from localStorage:', e);
            }
        }
        return { sentences, mistakeBag, petData };
    },
    
    saveData: function() {
        const dataToSave = {
            sentences,
            mistakeBag,
            petData
        };
        localStorage.setItem('wordpet-data', JSON.stringify(dataToSave));
    },
    
    resetData: function() {
        localStorage.removeItem('wordpet-data');
        sentences = [
            { text: "I like apples", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
            { text: "It is sunny today", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
            { text: "I have a red ball", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "toys" },
            { text: "My cat is black", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "animals" },
            { text: "I go to school", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "school" },
            { text: "I eat breakfast", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" },
            { text: "The sky is blue", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "weather" },
            { text: "I love my family", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "family" },
            { text: "I play with toys", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "play" },
            { text: "I drink water", mastery: 0.0, lastReviewed: null, incorrectCount: 0, correctCount: 0, difficulty: "easy", category: "food" }
        ];
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
        
        // Otherwise, pick a random sentence from the main collection
        // Prefer sentences with lower mastery scores
        const lowMasterySentences = sentences.filter(s => s.mastery < 0.5);
        if (lowMasterySentences.length > 0) {
            const randomIndex = Math.floor(Math.random() * lowMasterySentences.length);
            return lowMasterySentences[randomIndex];
        }
        
        // If no low mastery sentences, pick any random sentence
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