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
  // Food & Drinks (25 sentences)
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
  { "text": "I eat oranges", "difficulty": "easy", "category": "food" },
  { "text": "He likes sandwiches", "difficulty": "easy", "category": "food" },
  { "text": "She bakes cakes", "difficulty": "easy", "category": "food" },
  { "text": "I drink tea", "difficulty": "easy", "category": "food" },
  { "text": "We eat vegetables", "difficulty": "easy", "category": "food" },
  { "text": "He eats meat", "difficulty": "easy", "category": "food" },
  { "text": "She drinks coffee", "difficulty": "easy", "category": "food" },
  { "text": "I like chocolate", "difficulty": "easy", "category": "food" },
  { "text": "We have soup", "difficulty": "easy", "category": "food" },
  { "text": "He cooks pasta", "difficulty": "easy", "category": "food" },

  // Fruits (25 sentences)
  { "text": "I like apples", "difficulty": "easy", "category": "fruit" },
  { "text": "I eat oranges", "difficulty": "easy", "category": "fruit" },
  { "text": "She likes bananas", "difficulty": "easy", "category": "fruit" },
  { "text": "He eats grapes", "difficulty": "easy", "category": "fruit" },
  { "text": "We buy strawberries", "difficulty": "easy", "category": "fruit" },
  { "text": "They grow apples", "difficulty": "medium", "category": "fruit" },
  { "text": "She picks berries", "difficulty": "medium", "category": "fruit" },
  { "text": "He eats watermelon", "difficulty": "easy", "category": "fruit" },
  { "text": "I prefer oranges to apples", "difficulty": "hard", "category": "fruit" },
  { "text": "Bananas are yellow", "difficulty": "easy", "category": "fruit" },
  { "text": "Strawberries are red", "difficulty": "easy", "category": "fruit" },
  { "text": "Grapes can be green", "difficulty": "easy", "category": "fruit" },
  { "text": "Apples are sweet", "difficulty": "easy", "category": "fruit" },
  { "text": "Oranges taste good", "difficulty": "easy", "category": "fruit" },
  { "text": "Grapes are small", "difficulty": "easy", "category": "fruit" },
  { "text": "Pineapples are sour", "difficulty": "easy", "category": "fruit" },
  { "text": "Watermelons are big", "difficulty": "easy", "category": "fruit" },
  { "text": "Peaches are soft", "difficulty": "easy", "category": "fruit" },
  { "text": "Pears are juicy", "difficulty": "easy", "category": "fruit" },
  { "text": "Kiwi tastes tangy", "difficulty": "easy", "category": "fruit" },
  { "text": "Cherries are small and red", "difficulty": "medium", "category": "fruit" },
  { "text": "Mango tastes sweet", "difficulty": "easy", "category": "fruit" },
  { "text": "Papaya is yellow", "difficulty": "easy", "category": "fruit" },
  { "text": "Plums are purple", "difficulty": "easy", "category": "fruit" },
  { "text": "Lemons are sour", "difficulty": "easy", "category": "fruit" },

  // Animals (25 sentences)
  { "text": "Dogs bark loudly", "difficulty": "easy", "category": "animal" },
  { "text": "Cats purr softly", "difficulty": "easy", "category": "animal" },
  { "text": "Birds fly in the sky", "difficulty": "easy", "category": "animal" },
  { "text": "Fish swim in water", "difficulty": "easy", "category": "animal" },
  { "text": "Rabbits hop quickly", "difficulty": "easy", "category": "animal" },
  { "text": "Elephants are big", "difficulty": "easy", "category": "animal" },
  { "text": "Monkeys like bananas", "difficulty": "easy", "category": "animal" },
  { "text": "Lions are strong", "difficulty": "easy", "category": "animal" },
  { "text": "Tigers have stripes", "difficulty": "easy", "category": "animal" },
  { "text": "Horses run fast", "difficulty": "easy", "category": "animal" },
  { "text": "Dolphins play in the sea", "difficulty": "medium", "category": "animal" },
  { "text": "Bears hibernate in winter", "difficulty": "hard", "category": "animal" },
  { "text": "Butterflies are colorful", "difficulty": "easy", "category": "animal" },
  { "text": "Bees make honey", "difficulty": "easy", "category": "animal" },
  { "text": "Wolves live in packs", "difficulty": "medium", "category": "animal" },
  { "text": "Snakes can be long", "difficulty": "easy", "category": "animal" },
  { "text": "Frogs jump and swim", "difficulty": "easy", "category": "animal" },
  { "text": "Spiders make webs", "difficulty": "medium", "category": "animal" },
  { "text": "Kangaroos can jump high", "difficulty": "easy", "category": "animal" },
  { "text": "Penguins live in cold places", "difficulty": "medium", "category": "animal" },
  { "text": "Owls are wise", "difficulty": "medium", "category": "animal" },
  { "text": "Bats fly at night", "difficulty": "medium", "category": "animal" },
  { "text": "Giraffes have long necks", "difficulty": "easy", "category": "animal" },
  { "text": "Zebras have black and white stripes", "difficulty": "medium", "category": "animal" },
  { "text": "Deer live in forests", "difficulty": "medium", "category": "animal" },

  // Days of the week (25 sentences)
  { "text": "Today is Monday", "difficulty": "easy", "category": "day" },
  { "text": "I go to school on Monday", "difficulty": "medium", "category": "day" },
  { "text": "Tuesday comes after Monday", "difficulty": "medium", "category": "day" },
  { "text": "Wednesday is the middle of the week", "difficulty": "hard", "category": "day" },
  { "text": "Thursday is before Friday", "difficulty": "medium", "category": "day" },
  { "text": "Friday is the last school day", "difficulty": "medium", "category": "day" },
  { "text": "Saturday is fun", "difficulty": "easy", "category": "day" },
  { "text": "Sunday is relaxing", "difficulty": "easy", "category": "day" },
  { "text": "I sleep late on Saturday", "difficulty": "medium", "category": "day" },
  { "text": "Sunday is family day", "difficulty": "medium", "category": "day" },
  { "text": "Monday is the start of the week", "difficulty": "medium", "category": "day" },
  { "text": "The weekend is Saturday and Sunday", "difficulty": "hard", "category": "day" },
  { "text": "I have music class on Tuesday", "difficulty": "medium", "category": "day" },
  { "text": "I watch movies on Friday", "difficulty": "medium", "category": "day" },
  { "text": "Wednesday is hump day", "difficulty": "hard", "category": "day" },
  { "text": "I do homework on Thursday", "difficulty": "medium", "category": "day" },
  { "text": "I play games on weekends", "difficulty": "medium", "category": "day" },
  { "text": "Mondays are busy", "difficulty": "medium", "category": "day" },
  { "text": "Weekends are free", "difficulty": "medium", "category": "day" },
  { "text": "I go shopping on Sunday", "difficulty": "medium", "category": "day" },
  { "text": "Tuesday and Thursday I have piano", "difficulty": "hard", "category": "day" },
  { "text": "Friday night is movie night", "difficulty": "medium", "category": "day" },
  { "text": "Saturday morning is for sports", "difficulty": "medium", "category": "day" },
  { "text": "Sunday we go to the park", "difficulty": "medium", "category": "day" },
  { "text": "Each week has seven days", "difficulty": "hard", "category": "day" },

  // Colors (25 sentences)
  { "text": "The sky is blue", "difficulty": "easy", "category": "color" },
  { "text": "Grass is green", "difficulty": "easy", "category": "color" },
  { "text": "Fire is red", "difficulty": "easy", "category": "color" },
  { "text": "Snow is white", "difficulty": "easy", "category": "color" },
  { "text": "The sun is yellow", "difficulty": "easy", "category": "color" },
  { "text": "My shirt is blue", "difficulty": "easy", "category": "color" },
  { "text": "Her dress is pink", "difficulty": "easy", "category": "color" },
  { "text": "The car is black", "difficulty": "easy", "category": "color" },
  { "text": "The flowers are orange", "difficulty": "medium", "category": "color" },
  { "text": "I like purple", "difficulty": "easy", "category": "color" },
  { "text": "Brown is like wood", "difficulty": "medium", "category": "color" },
  { "text": "Gray clouds are dark", "difficulty": "medium", "category": "color" },
  { "text": "Silver is shiny", "difficulty": "medium", "category": "color" },
  { "text": "Gold is bright yellow", "difficulty": "medium", "category": "color" },
  { "text": "Rainbow has many colors", "difficulty": "medium", "category": "color" },
  { "text": "The apple is red and green", "difficulty": "medium", "category": "color" },
  { "text": "My favorite color is blue", "difficulty": "medium", "category": "color" },
  { "text": "Colors make the world beautiful", "difficulty": "hard", "category": "color" },
  { "text": "Red is warmer than blue", "difficulty": "hard", "category": "color" },
  { "text": "Orange is between red and yellow", "difficulty": "hard", "category": "color" },
  { "text": "Purple is a mix of red and blue", "difficulty": "hard", "category": "color" },
  { "text": "Black and white are opposites", "difficulty": "hard", "category": "color" },
  { "text": "Pink is light red", "difficulty": "medium", "category": "color" },
  { "text": "Brown is dark orange", "difficulty": "medium", "category": "color" },
  { "text": "I can see many colors", "difficulty": "medium", "category": "color" },

  // Clothing (25 sentences)
  { "text": "I wear a shirt", "difficulty": "easy", "category": "clothing" },
  { "text": "She likes her dress", "difficulty": "easy", "category": "clothing" },
  { "text": "He wears jeans", "difficulty": "easy", "category": "clothing" },
  { "text": "I put on my hat", "difficulty": "easy", "category": "clothing" },
  { "text": "She has a red jacket", "difficulty": "medium", "category": "clothing" },
  { "text": "He wears blue shoes", "difficulty": "medium", "category": "clothing" },
  { "text": "I need new socks", "difficulty": "medium", "category": "clothing" },
  { "text": "She bought a skirt", "difficulty": "medium", "category": "clothing" },
  { "text": "T-shirts are casual", "difficulty": "medium", "category": "clothing" },
  { "text": "Winter coats are warm", "difficulty": "medium", "category": "clothing" },
  { "text": "I wear sneakers to run", "difficulty": "medium", "category": "clothing" },
  { "text": "She loves her blue jeans", "difficulty": "medium", "category": "clothing" },
  { "text": "The sweater is soft", "difficulty": "medium", "category": "clothing" },
  { "text": "I take off my shoes", "difficulty": "medium", "category": "clothing" },
  { "text": "She has long pants", "difficulty": "medium", "category": "clothing" },
  { "text": "Socks keep feet warm", "difficulty": "hard", "category": "clothing" },
  { "text": "The shirt is too big", "difficulty": "medium", "category": "clothing" },
  { "text": "The shirt is smaller than the dress", "difficulty": "hard", "category": "clothing" },
  { "text": "I prefer shorts to pants", "difficulty": "hard", "category": "clothing" },
  { "text": "The jacket is the warmest", "difficulty": "hard", "category": "clothing" },
  { "text": "I have more shirts than dresses", "difficulty": "hard", "category": "clothing" },
  { "text": "Dresses are prettier than shirts", "difficulty": "hard", "category": "clothing" },
  { "text": "Jeans are more popular than slacks", "difficulty": "hard", "category": "clothing" },
  { "text": "Sneakers are better for sports than sandals", "difficulty": "hard", "category": "clothing" },
  { "text": "Winter clothes are thicker than summer clothes", "difficulty": "hard", "category": "clothing" },

  // Body parts (25 sentences)
  { "text": "I have two eyes", "difficulty": "easy", "category": "body" },
  { "text": "My nose is in the middle of my face", "difficulty": "medium", "category": "body" },
  { "text": "I hear with my ears", "difficulty": "medium", "category": "body" },
  { "text": "I speak with my mouth", "difficulty": "medium", "category": "body" },
  { "text": "I have ten fingers", "difficulty": "medium", "category": "body" },
  { "text": "I walk with my feet", "difficulty": "medium", "category": "body" },
  { "text": "I think with my brain", "difficulty": "hard", "category": "body" },
  { "text": "I breathe with my lungs", "difficulty": "hard", "category": "body" },
  { "text": "My heart beats fast", "difficulty": "medium", "category": "body" },
  { "text": "I kick with my leg", "difficulty": "medium", "category": "body" },
  { "text": "I carry with my arms", "difficulty": "medium", "category": "body" },
  { "text": "My hair grows long", "difficulty": "medium", "category": "body" },
  { "text": "My teeth are white", "difficulty": "medium", "category": "body" },
  { "text": "My skin is soft", "difficulty": "medium", "category": "body" },
  { "text": "I dream with my head", "difficulty": "hard", "category": "body" },
  { "text": "My hands are smaller than my feet", "difficulty": "hard", "category": "body" },
  { "text": "Eyes are more important than ears", "difficulty": "hard", "category": "body" },
  { "text": "Legs are stronger than arms", "difficulty": "hard", "category": "body" },
  { "text": "The heart works harder than the brain", "difficulty": "hard", "category": "body" },
  { "text": "My head is the biggest part", "difficulty": "medium", "category": "body" },
  { "text": "I touch with my hands", "difficulty": "medium", "category": "body" },
  { "text": "My neck connects my head and body", "difficulty": "hard", "category": "body" },
  { "text": "Shoulders are wider than wrists", "difficulty": "hard", "category": "body" },
  { "text": "I smell with my nose", "difficulty": "medium", "category": "body" },
  { "text": "My back is behind my chest", "difficulty": "hard", "category": "body" },

  // Sports (25 sentences)
  { "text": "I play soccer", "difficulty": "easy", "category": "sport" },
  { "text": "He runs fast", "difficulty": "easy", "category": "sport" },
  { "text": "She swims well", "difficulty": "easy", "category": "sport" },
  { "text": "We play basketball", "difficulty": "easy", "category": "sport" },
  { "text": "They like tennis", "difficulty": "easy", "category": "sport" },
  { "text": "I ride a bike", "difficulty": "easy", "category": "sport" },
  { "text": "He kicks the ball", "difficulty": "medium", "category": "sport" },
  { "text": "She jumps high", "difficulty": "medium", "category": "sport" },
  { "text": "We practice every day", "difficulty": "medium", "category": "sport" },
  { "text": "They win the game", "difficulty": "medium", "category": "sport" },
  { "text": "I throw the ball", "difficulty": "medium", "category": "sport" },
  { "text": "She is on the team", "difficulty": "medium", "category": "sport" },
  { "text": "He scores a goal", "difficulty": "medium", "category": "sport" },
  { "text": "We wear sports shoes", "difficulty": "medium", "category": "sport" },
  { "text": "They practice swimming", "difficulty": "medium", "category": "sport" },
  { "text": "Running is good exercise", "difficulty": "medium", "category": "sport" },
  { "text": "Soccer is more popular than tennis", "difficulty": "hard", "category": "sport" },
  { "text": "Swimming is better than running", "difficulty": "hard", "category": "sport" },
  { "text": "Basketball courts are bigger than tennis courts", "difficulty": "hard", "category": "sport" },
  { "text": "I prefer football to baseball", "difficulty": "hard", "category": "sport" },
  { "text": "Volleyball needs a net", "difficulty": "medium", "category": "sport" },
  { "text": "Gymnastics requires flexibility", "difficulty": "hard", "category": "sport" },
  { "text": "Baseball has nine players", "difficulty": "hard", "category": "sport" },
  { "text": "I can run faster than my friend", "difficulty": "hard", "category": "sport" },
  { "text": "Athletes train the hardest", "difficulty": "hard", "category": "sport" },

  // Months (25 sentences)
  { "text": "January is the first month", "difficulty": "medium", "category": "month" },
  { "text": "February has 28 days", "difficulty": "medium", "category": "month" },
  { "text": "March comes after February", "difficulty": "medium", "category": "month" },
  { "text": "April showers bring May flowers", "difficulty": "hard", "category": "month" },
  { "text": "May is a warm month", "difficulty": "medium", "category": "month" },
  { "text": "June has summer vacation", "difficulty": "medium", "category": "month" },
  { "text": "July is very hot", "difficulty": "medium", "category": "month" },
  { "text": "August is the last summer month", "difficulty": "hard", "category": "month" },
  { "text": "September starts school", "difficulty": "medium", "category": "month" },
  { "text": "October has Halloween", "difficulty": "medium", "category": "month" },
  { "text": "November is for Thanksgiving", "difficulty": "hard", "category": "month" },
  { "text": "December ends the year", "difficulty": "medium", "category": "month" },
  { "text": "My birthday is in May", "difficulty": "medium", "category": "month" },
  { "text": "Christmas is in December", "difficulty": "medium", "category": "month" },
  { "text": "New Year is in January", "difficulty": "medium", "category": "month" },
  { "text": "Spring starts in March", "difficulty": "medium", "category": "month" },
  { "text": "Summer begins in June", "difficulty": "medium", "category": "month" },
  { "text": "Autumn starts in September", "difficulty": "hard", "category": "month" },
  { "text": "Winter comes in December", "difficulty": "medium", "category": "month" },
  { "text": "July is hotter than January", "difficulty": "hard", "category": "month" },
  { "text": "May is more beautiful than February", "difficulty": "hard", "category": "month" },
  { "text": "September is cooler than August", "difficulty": "hard", "category": "month" },
  { "text": "January is the coldest month", "difficulty": "hard", "category": "month" },
  { "text": "There are twelve months in a year", "difficulty": "hard", "category": "month" },
  { "text": "April is the month of flowers", "difficulty": "medium", "category": "month" },

  // Numbers (25 sentences)
  { "text": "One plus one equals two", "difficulty": "medium", "category": "number" },
  { "text": "I have three apples", "difficulty": "easy", "category": "number" },
  { "text": "Ten is bigger than five", "difficulty": "medium", "category": "number" },
  { "text": "Twenty comes after nineteen", "difficulty": "medium", "category": "number" },
  { "text": "Fifty is half of one hundred", "difficulty": "hard", "category": "number" },
  { "text": "I am seven years old", "difficulty": "medium", "category": "number" },
  { "text": "There are twelve months", "difficulty": "medium", "category": "number" },
  { "text": "One hundred is the biggest number", "difficulty": "medium", "category": "number" },
  { "text": "Zero means nothing", "difficulty": "medium", "category": "number" },
  { "text": "Nine times nine is eighty-one", "difficulty": "hard", "category": "number" },
  { "text": "Thirty minutes is half an hour", "difficulty": "hard", "category": "number" },
  { "text": "A dozen means twelve", "difficulty": "hard", "category": "number" },
  { "text": "Seventy is ten more than sixty", "difficulty": "hard", "category": "number" },
  { "text": "Eight is smaller than ten", "difficulty": "medium", "category": "number" },
  { "text": "Twenty-five is a quarter of one hundred", "difficulty": "hard", "category": "number" },
  { "text": "I can count to one hundred", "difficulty": "medium", "category": "number" },
  { "text": "Six times seven equals forty-two", "difficulty": "hard", "category": "number" },
  { "text": "Fifteen is three times five", "difficulty": "hard", "category": "number" },
  { "text": "The number forty is between thirty and fifty", "difficulty": "hard", "category": "number" },
  { "text": "Ninety is ten less than one hundred", "difficulty": "hard", "category": "number" },
  { "text": "Three is less than four", "difficulty": "medium", "category": "number" },
  { "text": "Sixty seconds make one minute", "difficulty": "hard", "category": "number" },
  { "text": "My house number is forty-five", "difficulty": "medium", "category": "number" },
  { "text": "I scored ninety percent", "difficulty": "hard", "category": "number" },
  { "text": "The temperature is minus five degrees", "difficulty": "hard", "category": "number" },

  // Family (25 sentences) - Additional family sentences to reach target
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
  { "text": "Grandpa reads newspaper", "difficulty": "medium", "category": "family" },
  { "text": "Uncle works in office", "difficulty": "medium", "category": "family" },
  { "text": "Aunt bakes cookies", "difficulty": "medium", "category": "family" },
  { "text": "Cousin visits on weekends", "difficulty": "medium", "category": "family" },
  { "text": "I help my parents", "difficulty": "medium", "category": "family" },
  { "text": "Our family goes camping", "difficulty": "medium", "category": "family" },
  { "text": "Mom is taller than Dad", "difficulty": "hard", "category": "family" },
  { "text": "Grandma is the oldest in family", "difficulty": "hard", "category": "family" },
  { "text": "I look like my father", "difficulty": "medium", "category": "family" },
  { "text": "We take family photos", "difficulty": "medium", "category": "family" },

  // Relatives (25 sentences)
  { "text": "My grandfather is old", "difficulty": "medium", "category": "relative" },
  { "text": "My grandmother tells stories", "difficulty": "medium", "category": "relative" },
  { "text": "I have an uncle", "difficulty": "easy", "category": "relative" },
  { "text": "My aunt bakes cakes", "difficulty": "medium", "category": "relative" },
  { "text": "I have a cousin", "difficulty": "easy", "category": "relative" },
  { "text": "My cousin is my age", "difficulty": "medium", "category": "relative" },
  { "text": "My grandfather is older than my father", "difficulty": "hard", "category": "relative" },
  { "text": "My aunt is younger than my mother", "difficulty": "hard", "category": "relative" },
  { "text": "My uncle is taller than my dad", "difficulty": "hard", "category": "relative" },
  { "text": "I visit my relatives", "difficulty": "medium", "category": "relative" },
  { "text": "My grandmother is kind", "difficulty": "medium", "category": "relative" },
  { "text": "My grandfather tells jokes", "difficulty": "medium", "category": "relative" },
  { "text": "My cousin and I play together", "difficulty": "medium", "category": "relative" },
  { "text": "My uncle works hard", "difficulty": "medium", "category": "relative" },
  { "text": "My aunt is good at cooking", "difficulty": "medium", "category": "relative" },
  { "text": "My great-grandmother is very old", "difficulty": "hard", "category": "relative" },
  { "text": "My great-grandfather lived long ago", "difficulty": "hard", "category": "relative" },
  { "text": "My cousin is better at math than me", "difficulty": "hard", "category": "relative" },
  { "text": "My aunt has two children", "difficulty": "medium", "category": "relative" },
  { "text": "My uncle likes to tell stories", "difficulty": "medium", "category": "relative" },
  { "text": "My grandmother has gray hair", "difficulty": "medium", "category": "relative" },
  { "text": "My grandfather walks slowly", "difficulty": "medium", "category": "relative" },
  { "text": "My aunt has long hair", "difficulty": "medium", "category": "relative" },
  { "text": "My cousin is shorter than me", "difficulty": "medium", "category": "relative" },
  { "text": "I am the youngest in my family", "difficulty": "medium", "category": "relative" },

  // Comparatives (25 sentences)
  { "text": "This apple is bigger than that one", "difficulty": "hard", "category": "comparative" },
  { "text": "Dogs are friendlier than cats", "difficulty": "hard", "category": "comparative" },
  { "text": "Running is faster than walking", "difficulty": "hard", "category": "comparative" },
  { "text": "This book is more interesting than that one", "difficulty": "hard", "category": "comparative" },
  { "text": "Winter is colder than spring", "difficulty": "hard", "category": "comparative" },
  { "text": "She is taller than her sister", "difficulty": "hard", "category": "comparative" },
  { "text": "This car is more expensive than that one", "difficulty": "hard", "category": "comparative" },
  { "text": "Math is harder than music", "difficulty": "hard", "category": "comparative" },
  { "text": "This dress is prettier than that one", "difficulty": "hard", "category": "comparative" },
  { "text": "He runs faster than me", "difficulty": "hard", "category": "comparative" },
  { "text": "Today is hotter than yesterday", "difficulty": "hard", "category": "comparative" },
  { "text": "This movie is better than the last one", "difficulty": "hard", "category": "comparative" },
  { "text": "My mom is stricter than my dad", "difficulty": "hard", "category": "comparative" },
  { "text": "This game is more fun than that one", "difficulty": "hard", "category": "comparative" },
  { "text": "The red shirt is more colorful than the blue one", "difficulty": "hard", "category": "comparative" },
  { "text": "She studies harder than her brother", "difficulty": "hard", "category": "comparative" },
  { "text": "This restaurant is more expensive", "difficulty": "hard", "category": "comparative" },
  { "text": "My room is messier than my sister's", "difficulty": "hard", "category": "comparative" },
  { "text": "This song is louder than that one", "difficulty": "hard", "category": "comparative" },
  { "text": "This test was easier than I expected", "difficulty": "hard", "category": "comparative" },
  { "text": "She speaks more clearly than him", "difficulty": "hard", "category": "comparative" },
  { "text": "This path is shorter than the other", "difficulty": "hard", "category": "comparative" },
  { "text": "The teacher is stricter than the assistant", "difficulty": "hard", "category": "comparative" },
  { "text": "This fruit is sweeter than that vegetable", "difficulty": "hard", "category": "comparative" },
  { "text": "My bike is older than my car", "difficulty": "hard", "category": "comparative" },

  // Daily expressions (25 sentences)
  { "text": "Good morning", "difficulty": "easy", "category": "daily" },
  { "text": "How are you?", "difficulty": "easy", "category": "daily" },
  { "text": "I am fine, thank you", "difficulty": "easy", "category": "daily" },
  { "text": "What is your name?", "difficulty": "easy", "category": "daily" },
  { "text": "My name is John", "difficulty": "easy", "category": "daily" },
  { "text": "Nice to meet you", "difficulty": "medium", "category": "daily" },
  { "text": "Where do you live?", "difficulty": "medium", "category": "daily" },
  { "text": "I live in a city", "difficulty": "medium", "category": "daily" },
  { "text": "Do you like ice cream?", "difficulty": "medium", "category": "daily" },
  { "text": "Yes, I do", "difficulty": "easy", "category": "daily" },
  { "text": "No, I do not", "difficulty": "easy", "category": "daily" },
  { "text": "I am happy today", "difficulty": "medium", "category": "daily" },
  { "text": "I am sad sometimes", "difficulty": "medium", "category": "daily" },
  { "text": "Let us play together", "difficulty": "medium", "category": "daily" },
  { "text": "Thank you very much", "difficulty": "medium", "category": "daily" },
  { "text": "You are welcome", "difficulty": "medium", "category": "daily" },
  { "text": "I am sorry", "difficulty": "medium", "category": "daily" },
  { "text": "Excuse me", "difficulty": "medium", "category": "daily" },
  { "text": "I do not know", "difficulty": "medium", "category": "daily" },
  { "text": "See you tomorrow", "difficulty": "medium", "category": "daily" },
  { "text": "Have a good day", "difficulty": "medium", "category": "daily" },
  { "text": "Good night", "difficulty": "easy", "category": "daily" },
  { "text": "I love you", "difficulty": "medium", "category": "daily" },
  { "text": "I miss you", "difficulty": "medium", "category": "daily" },
  { "text": "I agree with you", "difficulty": "hard", "category": "daily" },

  // Weather (25 sentences)
  { "text": "It is sunny", "difficulty": "easy", "category": "weather" },
  { "text": "It rains today", "difficulty": "easy", "category": "weather" },
  { "text": "Snow falls down", "difficulty": "easy", "category": "weather" },
  { "text": "The wind blows", "difficulty": "easy", "category": "weather" },
  { "text": "It is cold outside", "difficulty": "easy", "category": "weather" },
  { "text": "I wear a jacket", "difficulty": "easy", "category": "weather" },
  { "text": "The sun shines bright", "difficulty": "easy", "category": "weather" },
  { "text": "It is warm today", "difficulty": "easy", "category": "weather" },
  { "text": "I see a rainbow", "difficulty": "easy", "category": "weather" },
  { "text": "The clouds are gray", "difficulty": "easy", "category": "weather" },
  { "text": "It is stormy", "difficulty": "medium", "category": "weather" },
  { "text": "A typhoon is coming", "difficulty": "hard", "category": "weather" },
  { "text": "The weather is nice", "difficulty": "medium", "category": "weather" },
  { "text": "It is foggy", "difficulty": "medium", "category": "weather" },
  { "text": "The temperature is cold", "difficulty": "medium", "category": "weather" },
  { "text": "It is hot in summer", "difficulty": "medium", "category": "weather" },
  { "text": "It is cool in fall", "difficulty": "medium", "category": "weather" },
  { "text": "Spring is warm", "difficulty": "medium", "category": "weather" },
  { "text": "Winter is the coldest season", "difficulty": "hard", "category": "weather" },
  { "text": "The weather changes", "difficulty": "medium", "category": "weather" },
  { "text": "Rain is good for plants", "difficulty": "medium", "category": "weather" },
  { "text": "Sunshine makes me happy", "difficulty": "medium", "category": "weather" },
  { "text": "Strong wind can break branches", "difficulty": "hard", "category": "weather" },
  { "text": "Weather affects our mood", "difficulty": "hard", "category": "weather" },
  { "text": "I like sunny days more than rainy days", "difficulty": "hard", "category": "weather" },

  // Singular and Plural (25 sentences)
  { "text": "One cat chases mice", "difficulty": "medium", "category": "plural" },
  { "text": "Many children play together", "difficulty": "medium", "category": "plural" },
  { "text": "A book has many pages", "difficulty": "medium", "category": "plural" },
  { "text": "Books help us learn", "difficulty": "medium", "category": "plural" },
  { "text": "The child runs fast", "difficulty": "medium", "category": "plural" },
  { "text": "The children run fast", "difficulty": "medium", "category": "plural" },
  { "text": "One apple is red", "difficulty": "medium", "category": "plural" },
  { "text": "Many apples are red", "difficulty": "medium", "category": "plural" },
  { "text": "A dog barks loudly", "difficulty": "medium", "category": "plural" },
  { "text": "Dogs bark loudly", "difficulty": "medium", "category": "plural" },
  { "text": "The sheep is white", "difficulty": "medium", "category": "plural" },
  { "text": "The sheep are white", "difficulty": "medium", "category": "plural" },
  { "text": "One tooth is white", "difficulty": "hard", "category": "plural" },
  { "text": "Many teeth are white", "difficulty": "hard", "category": "plural" },
  { "text": "A mouse runs quickly", "difficulty": "medium", "category": "plural" },
  { "text": "Mice run quickly", "difficulty": "medium", "category": "plural" },
  { "text": "A man works hard", "difficulty": "medium", "category": "plural" },
  { "text": "Men work hard", "difficulty": "medium", "category": "plural" },
  { "text": "A woman cooks dinner", "difficulty": "medium", "category": "plural" },
  { "text": "Women cook dinner", "difficulty": "medium", "category": "plural" },
  { "text": "A child studies", "difficulty": "medium", "category": "plural" },
  { "text": "Children study", "difficulty": "medium", "category": "plural" },
  { "text": "A toothbrush cleans teeth", "difficulty": "hard", "category": "plural" },
  { "text": "Toothbrushes clean teeth", "difficulty": "hard", "category": "plural" },
  { "text": "One foot is smaller than two feet", "difficulty": "hard", "category": "plural" },

  // School & Learning (25 sentences)
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
  { "text": "I use a ruler", "difficulty": "medium", "category": "school" },
  { "text": "She likes science class", "difficulty": "medium", "category": "school" },
  { "text": "He is good at math", "difficulty": "medium", "category": "school" },
  { "text": "We have a test today", "difficulty": "medium", "category": "school" },
  { "text": "The library is quiet", "difficulty": "medium", "category": "school" },
  { "text": "I borrow books from library", "difficulty": "hard", "category": "school" },
  { "text": "Learning is important", "difficulty": "hard", "category": "school" },
  { "text": "Teachers help students", "difficulty": "hard", "category": "school" },
  { "text": "School is for learning", "difficulty": "medium", "category": "school" },
  { "text": "I like to learn new things", "difficulty": "medium", "category": "school" },

  // Activities & Play (25 sentences)
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
  { "text": "I play board games", "difficulty": "medium", "category": "play" },
  { "text": "She practices piano", "difficulty": "medium", "category": "play" },
  { "text": "He plays guitar", "difficulty": "medium", "category": "play" },
  { "text": "We watch cartoons", "difficulty": "medium", "category": "play" },
  { "text": "I collect stamps", "difficulty": "medium", "category": "play" },
  { "text": "They enjoy reading", "difficulty": "medium", "category": "play" },
  { "text": "Playing is fun", "difficulty": "medium", "category": "play" },
  { "text": "Hobbies are relaxing", "difficulty": "hard", "category": "play" },
  { "text": "Playing with friends is best", "difficulty": "hard", "category": "play" },
  { "text": "I have many activities", "difficulty": "medium", "category": "play" }
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