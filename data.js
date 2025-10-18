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
  // 个人信息 (Personal Information) - 50句
  { "text": "My name is Tom", "difficulty": "easy", "category": "personal" },
  { "text": "I am eight years old", "difficulty": "easy", "category": "personal" },
  { "text": "I was born in London", "difficulty": "medium", "category": "personal" },
  { "text": "My birthday is in June", "difficulty": "medium", "category": "personal" },
  { "text": "I have two brothers", "difficulty": "medium", "category": "personal" },
  { "text": "I am tall and thin", "difficulty": "medium", "category": "personal" },
  { "text": "I have brown hair", "difficulty": "medium", "category": "personal" },
  { "text": "I wear glasses", "difficulty": "medium", "category": "personal" },
  { "text": "This is my photo", "difficulty": "easy", "category": "personal" },
  { "text": "I live in a house", "difficulty": "medium", "category": "personal" },
  { "text": "I am the oldest child", "difficulty": "hard", "category": "personal" },
  { "text": "My phone number is 07700 900123", "difficulty": "hard", "category": "personal" },
  { "text": "I am good at maths", "difficulty": "hard", "category": "personal" },
  { "text": "My hobby is reading", "difficulty": "hard", "category": "personal" },
  { "text": "I love my family", "difficulty": "easy", "category": "personal" },
  { "text": "I am happy at school", "difficulty": "medium", "category": "personal" },
  { "text": "I want to be a doctor", "difficulty": "hard", "category": "personal" },
  { "text": "I like playing football", "difficulty": "medium", "category": "personal" },
  { "text": "I don't like vegetables", "difficulty": "medium", "category": "personal" },
  { "text": "I am wearing a red shirt", "difficulty": "medium", "category": "personal" },
  { "text": "I have a pet dog", "difficulty": "medium", "category": "personal" },
  { "text": "My favorite color is blue", "difficulty": "medium", "category": "personal" },
  { "text": "I can ride a bike", "difficulty": "medium", "category": "personal" },
  { "text": "I can't swim well", "difficulty": "medium", "category": "personal" },
  { "text": "I am going to visit my grandparents", "difficulty": "hard", "category": "personal" },
  { "text": "I am learning to play the piano", "difficulty": "hard", "category": "personal" },
  { "text": "I have a big bedroom", "difficulty": "medium", "category": "personal" },
  { "text": "I get up at seven o'clock", "difficulty": "medium", "category": "personal" },
  { "text": "I go to bed at nine o'clock", "difficulty": "medium", "category": "personal" },
  { "text": "I brush my teeth twice a day", "difficulty": "hard", "category": "personal" },
  { "text": "I walk to school every day", "difficulty": "hard", "category": "personal" },
  { "text": "I wear a school uniform", "difficulty": "medium", "category": "personal" },
  { "text": "I am good at drawing", "difficulty": "medium", "category": "personal" },
  { "text": "I want to learn Spanish", "difficulty": "hard", "category": "personal" },
  { "text": "I am excited about my birthday party", "difficulty": "hard", "category": "personal" },
  { "text": "I feel tired after school", "difficulty": "hard", "category": "personal" },
  { "text": "I dream about flying", "difficulty": "hard", "category": "personal" },
  { "text": "I am the tallest in my class", "difficulty": "hard", "category": "personal" },
  { "text": "My favorite season is summer", "difficulty": "medium", "category": "personal" },
  { "text": "I am scared of spiders", "difficulty": "hard", "category": "personal" },
  { "text": "I am proud of my success", "difficulty": "hard", "category": "personal" },
  { "text": "I am patient and kind", "difficulty": "hard", "category": "personal" },
  { "text": "I feel happy when I play", "difficulty": "hard", "category": "personal" },
  { "text": "I was happy yesterday", "difficulty": "medium", "category": "personal" },
  { "text": "I will be ten next year", "difficulty": "hard", "category": "personal" },
  { "text": "I am the fastest runner", "difficulty": "hard", "category": "personal" },
  { "text": "I am more careful than my brother", "difficulty": "hard", "category": "personal" },
  { "text": "I am as tall as my sister", "difficulty": "hard", "category": "personal" },
  { "text": "I am the most curious student", "difficulty": "hard", "category": "personal" },
  { "text": "I am reading a comic book", "difficulty": "hard", "category": "personal" },

  // 家庭与朋友 (Family & Friends) - 50句
  { "text": "This is my family", "difficulty": "easy", "category": "family" },
  { "text": "I have a big family", "difficulty": "easy", "category": "family" },
  { "text": "My father is a doctor", "difficulty": "medium", "category": "family" },
  { "text": "My mother is a teacher", "difficulty": "medium", "category": "family" },
  { "text": "I have two sisters", "difficulty": "medium", "category": "family" },
  { "text": "My grandfather is old", "difficulty": "medium", "category": "family" },
  { "text": "My grandmother tells stories", "difficulty": "medium", "category": "family" },
  { "text": "My brother is taller than me", "difficulty": "hard", "category": "family" },
  { "text": "My sister has long hair", "difficulty": "medium", "category": "family" },
  { "text": "We live together", "difficulty": "medium", "category": "family" },
  { "text": "We have dinner together", "difficulty": "medium", "category": "family" },
  { "text": "I help my parents", "difficulty": "medium", "category": "family" },
  { "text": "My family goes camping", "difficulty": "medium", "category": "family" },
  { "text": "I love my family very much", "difficulty": "medium", "category": "family" },
  { "text": "My aunt visits us", "difficulty": "medium", "category": "family" },
  { "text": "My uncle works in London", "difficulty": "medium", "category": "family" },
  { "text": "I have a cousin", "difficulty": "easy", "category": "family" },
  { "text": "My cousin is my age", "difficulty": "medium", "category": "family" },
  { "text": "My grandfather is older than my father", "difficulty": "hard", "category": "family" },
  { "text": "My aunt is younger than my mother", "difficulty": "hard", "category": "family" },
  { "text": "I visit my relatives", "difficulty": "medium", "category": "family" },
  { "text": "My grandmother is kind", "difficulty": "medium", "category": "family" },
  { "text": "My grandfather tells jokes", "difficulty": "medium", "category": "family" },
  { "text": "My cousin and I play together", "difficulty": "medium", "category": "family" },
  { "text": "My uncle works hard", "difficulty": "medium", "category": "family" },
  { "text": "I have many friends", "difficulty": "medium", "category": "family" },
  { "text": "My best friend is Alice", "difficulty": "medium", "category": "family" },
  { "text": "We play together", "difficulty": "easy", "category": "family" },
  { "text": "My friend has a pet cat", "difficulty": "medium", "category": "family" },
  { "text": "I share my toys with friends", "difficulty": "hard", "category": "family" },
  { "text": "My friends like my jokes", "difficulty": "hard", "category": "family" },
  { "text": "We are in the same class", "difficulty": "medium", "category": "family" },
  { "text": "I invite my friends to my party", "difficulty": "hard", "category": "family" },
  { "text": "My friends help me with homework", "difficulty": "hard", "category": "family" },
  { "text": "I miss my friends", "difficulty": "medium", "category": "family" },
  { "text": "We are good friends", "difficulty": "medium", "category": "family" },
  { "text": "My friend is more creative than me", "difficulty": "hard", "category": "family" },
  { "text": "I am as friendly as my friend", "difficulty": "hard", "category": "family" },
  { "text": "My friend is the most loyal", "difficulty": "hard", "category": "family" },
  { "text": "My family is going on holiday", "difficulty": "hard", "category": "family" },
  { "text": "We are having fun together", "difficulty": "medium", "category": "family" },
  { "text": "My brother is going to be a pilot", "difficulty": "hard", "category": "family" },
  { "text": "My dad is reading a newspaper", "difficulty": "medium", "category": "family" },
  { "text": "My mom is cooking dinner", "difficulty": "medium", "category": "family" },
  { "text": "My sister is listening to music", "difficulty": "medium", "category": "family" },
  { "text": "My father was a teacher", "difficulty": "hard", "category": "family" },
  { "text": "My mother will go shopping", "difficulty": "hard", "category": "family" },
  { "text": "We were playing in the garden", "difficulty": "hard", "category": "family" },
  { "text": "They will visit us next week", "difficulty": "hard", "category": "family" },
  { "text": "I am the youngest in my family", "difficulty": "medium", "category": "family" },

  // 学校生活 (School Life) - 50句
  { "text": "I go to school", "difficulty": "easy", "category": "school" },
  { "text": "I like my school", "difficulty": "easy", "category": "school" },
  { "text": "My school is big", "difficulty": "easy", "category": "school" },
  { "text": "I have many friends at school", "difficulty": "medium", "category": "school" },
  { "text": "I study English", "difficulty": "medium", "category": "school" },
  { "text": "My teacher is kind", "difficulty": "medium", "category": "school" },
  { "text": "I read books", "difficulty": "easy", "category": "school" },
  { "text": "I write with a pencil", "difficulty": "medium", "category": "school" },
  { "text": "I listen to my teacher", "difficulty": "medium", "category": "school" },
  { "text": "I raise my hand", "difficulty": "medium", "category": "school" },
  { "text": "I do my homework", "difficulty": "medium", "category": "school" },
  { "text": "I play in the playground", "difficulty": "medium", "category": "school" },
  { "text": "I learn new words", "difficulty": "medium", "category": "school" },
  { "text": "I like maths class", "difficulty": "medium", "category": "school" },
  { "text": "Science class is fun", "difficulty": "medium", "category": "school" },
  { "text": "Art class is creative", "difficulty": "hard", "category": "school" },
  { "text": "I have PE class", "difficulty": "medium", "category": "school" },
  { "text": "We sing songs in music class", "difficulty": "medium", "category": "school" },
  { "text": "I use a ruler", "difficulty": "medium", "category": "school" },
  { "text": "I draw pictures", "difficulty": "medium", "category": "school" },
  { "text": "I borrow books from library", "difficulty": "hard", "category": "school" },
  { "text": "The library is quiet", "difficulty": "medium", "category": "school" },
  { "text": "I sit at my desk", "difficulty": "medium", "category": "school" },
  { "text": "We work in groups", "difficulty": "medium", "category": "school" },
  { "text": "I study for tests", "difficulty": "medium", "category": "school" },
  { "text": "I pass the exam", "difficulty": "hard", "category": "school" },
  { "text": "I am good at English", "difficulty": "medium", "category": "school" },
  { "text": "I am better at maths than science", "difficulty": "hard", "category": "school" },
  { "text": "My school starts at nine", "difficulty": "medium", "category": "school" },
  { "text": "School ends at three", "difficulty": "medium", "category": "school" },
  { "text": "I eat lunch at school", "difficulty": "medium", "category": "school" },
  { "text": "There are thirty students in my class", "difficulty": "hard", "category": "school" },
  { "text": "My classroom has blue walls", "difficulty": "medium", "category": "school" },
  { "text": "I have a school bag", "difficulty": "medium", "category": "school" },
  { "text": "I wear a school uniform", "difficulty": "medium", "category": "school" },
  { "text": "I take notes in class", "difficulty": "hard", "category": "school" },
  { "text": "I answer the questions", "difficulty": "medium", "category": "school" },
  { "text": "I clean the blackboard", "difficulty": "hard", "category": "school" },
  { "text": "We do homework together", "difficulty": "medium", "category": "school" },
  { "text": "I ask the teacher for help", "difficulty": "hard", "category": "school" },
  { "text": "I am the class monitor", "difficulty": "hard", "category": "school" },
  { "text": "I will go to high school next year", "difficulty": "hard", "category": "school" },
  { "text": "I was late for school yesterday", "difficulty": "hard", "category": "school" },
  { "text": "I am participating in the debate", "difficulty": "hard", "category": "school" },
  { "text": "We are preparing for the exam", "difficulty": "hard", "category": "school" },
  { "text": "The teacher is explaining the lesson", "difficulty": "medium", "category": "school" },
  { "text": "Students are listening carefully", "difficulty": "medium", "category": "school" },
  { "text": "The bell rings at the end of class", "difficulty": "medium", "category": "school" },
  { "text": "I am learning about ancient history", "difficulty": "hard", "category": "school" },
  { "text": "Mathematics challenges me", "difficulty": "hard", "category": "school" },
  { "text": "I am the smartest student", "difficulty": "hard", "category": "school" },

  // 食物与饮料 (Food & Drink) - 40句
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
  { "text": "I prefer apples to oranges", "difficulty": "hard", "category": "food" },
  { "text": "This pizza is tastier than that one", "difficulty": "hard", "category": "food" },
  { "text": "We are having dinner now", "difficulty": "medium", "category": "food" },
  { "text": "She was eating breakfast when I called", "difficulty": "hard", "category": "food" },
  { "text": "I will cook for you tomorrow", "difficulty": "hard", "category": "food" },
  { "text": "He is the best cook in the family", "difficulty": "hard", "category": "food" },
  { "text": "The cake is as sweet as the cookies", "difficulty": "hard", "category": "food" },
  { "text": "I am eating my lunch", "difficulty": "medium", "category": "food" },
  { "text": "We should eat more vegetables", "difficulty": "hard", "category": "food" },
  { "text": "They have been eating for an hour", "difficulty": "hard", "category": "food" },
  { "text": "If I am hungry, I eat something", "difficulty": "hard", "category": "food" },
  { "text": "I would like some more rice", "difficulty": "hard", "category": "food" },
  { "text": "My favorite food is pasta", "difficulty": "medium", "category": "food" },
  { "text": "Can I have some water, please?", "difficulty": "medium", "category": "food" },
  { "text": "I am not hungry now", "difficulty": "medium", "category": "food" },
  
  // 动物 (Animals) - 40句
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
  { "text": "The dog is chasing the cat", "difficulty": "medium", "category": "animal" },
  { "text": "This elephant is bigger than that one", "difficulty": "hard", "category": "animal" },
  { "text": "I am watching a documentary about animals", "difficulty": "hard", "category": "animal" },
  { "text": "If I were a bird, I would fly everywhere", "difficulty": "hard", "category": "animal" },
  { "text": "We used to have a pet rabbit", "difficulty": "hard", "category": "animal" },
  { "text": "The lion was sleeping under the tree", "difficulty": "medium", "category": "animal" },
  { "text": "Whales are the largest animals in the ocean", "difficulty": "hard", "category": "animal" },
  { "text": "I will visit the zoo tomorrow", "difficulty": "hard", "category": "animal" },
  { "text": "She has been taking care of the injured bird", "difficulty": "hard", "category": "animal" },
  { "text": "The birds are singing beautiful songs", "difficulty": "medium", "category": "animal" },
  { "text": "Cheetahs are the fastest land animals", "difficulty": "hard", "category": "animal" },
  { "text": "Snakes don't have legs", "difficulty": "medium", "category": "animal" },
  { "text": "Polar bears live in the Arctic", "difficulty": "medium", "category": "animal" },
  { "text": "I like animals more than toys", "difficulty": "hard", "category": "animal" },
  { "text": "The monkey is the most playful animal", "difficulty": "hard", "category": "animal" },

  // 天气 (Weather) - 30句
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
  { "text": "It will be sunny tomorrow", "difficulty": "medium", "category": "weather" },
  { "text": "Yesterday was colder than today", "difficulty": "medium", "category": "weather" },
  { "text": "We are having a snow day", "difficulty": "medium", "category": "weather" },
  { "text": "The weather forecast says it will rain", "difficulty": "hard", "category": "weather" },
  { "text": "I hope the weather will be nice for the picnic", "difficulty": "hard", "category": "weather" },

  // 时间 (Time) - 40句
  { "text": "Today is Monday", "difficulty": "easy", "category": "time" },
  { "text": "I go to school on Monday", "difficulty": "medium", "category": "time" },
  { "text": "Tuesday comes after Monday", "difficulty": "medium", "category": "time" },
  { "text": "Wednesday is the middle of the week", "difficulty": "hard", "category": "time" },
  { "text": "Thursday is before Friday", "difficulty": "medium", "category": "time" },
  { "text": "Friday is the last school day", "difficulty": "medium", "category": "time" },
  { "text": "Saturday is fun", "difficulty": "easy", "category": "time" },
  { "text": "Sunday is relaxing", "difficulty": "easy", "category": "time" },
  { "text": "I sleep late on Saturday", "difficulty": "medium", "category": "time" },
  { "text": "Sunday is family day", "difficulty": "medium", "category": "time" },
  { "text": "Monday is the start of the week", "difficulty": "medium", "category": "time" },
  { "text": "The weekend is Saturday and Sunday", "difficulty": "hard", "category": "time" },
  { "text": "I have music class on Tuesday", "difficulty": "medium", "category": "time" },
  { "text": "I watch movies on Friday", "difficulty": "medium", "category": "time" },
  { "text": "Wednesday is hump day", "difficulty": "hard", "category": "time" },
  { "text": "I do homework on Thursday", "difficulty": "medium", "category": "time" },
  { "text": "I play games on weekends", "difficulty": "medium", "category": "time" },
  { "text": "Mondays are busy", "difficulty": "medium", "category": "time" },
  { "text": "Weekends are free", "difficulty": "medium", "category": "time" },
  { "text": "I go shopping on Sunday", "difficulty": "medium", "category": "time" },
  { "text": "Tuesday and Thursday I have piano", "difficulty": "hard", "category": "time" },
  { "text": "Friday night is movie night", "difficulty": "medium", "category": "time" },
  { "text": "Saturday morning is for sports", "difficulty": "medium", "category": "time" },
  { "text": "Sunday we go to the park", "difficulty": "medium", "category": "time" },
  { "text": "Each week has seven days", "difficulty": "hard", "category": "time" },
  { "text": "January is the first month", "difficulty": "medium", "category": "time" },
  { "text": "February has 28 days", "difficulty": "medium", "category": "time" },
  { "text": "March comes after February", "difficulty": "medium", "category": "time" },
  { "text": "April showers bring May flowers", "difficulty": "hard", "category": "time" },
  { "text": "May is a warm month", "difficulty": "medium", "category": "time" },
  { "text": "June has summer vacation", "difficulty": "medium", "category": "time" },
  { "text": "July is very hot", "difficulty": "medium", "category": "time" },
  { "text": "August is the last summer month", "difficulty": "hard", "category": "time" },
  { "text": "September starts school", "difficulty": "medium", "category": "time" },
  { "text": "October has Halloween", "difficulty": "medium", "category": "time" },
  { "text": "November is for Thanksgiving", "difficulty": "hard", "category": "time" },
  { "text": "December ends the year", "difficulty": "medium", "category": "time" },
  { "text": "My birthday is in May", "difficulty": "medium", "category": "time" },
  { "text": "Christmas is in December", "difficulty": "medium", "category": "time" },
  { "text": "New Year is in January", "difficulty": "medium", "category": "time" },

  // 地点与方向 (Places & Directions) - 30句
  { "text": "I live in a house", "difficulty": "medium", "category": "places" },
  { "text": "The park is fun", "difficulty": "medium", "category": "places" },
  { "text": "The school is big", "difficulty": "medium", "category": "places" },
  { "text": "The library is quiet", "difficulty": "medium", "category": "places" },
  { "text": "The hospital helps people", "difficulty": "hard", "category": "places" },
  { "text": "The shop sells toys", "difficulty": "medium", "category": "places" },
  { "text": "The cinema shows movies", "difficulty": "hard", "category": "places" },
  { "text": "The restaurant serves food", "difficulty": "hard", "category": "places" },
  { "text": "The museum has art", "difficulty": "hard", "category": "places" },
  { "text": "The zoo has animals", "difficulty": "medium", "category": "places" },
  { "text": "The bank keeps money", "difficulty": "hard", "category": "places" },
  { "text": "The post office sends letters", "difficulty": "hard", "category": "places" },
  { "text": "The police station helps people", "difficulty": "hard", "category": "places" },
  { "text": "The theatre has plays", "difficulty": "hard", "category": "places" },
  { "text": "The church is a place of worship", "difficulty": "hard", "category": "places" },
  { "text": "The hotel has rooms", "difficulty": "medium", "category": "places" },
  { "text": "The station has trains", "difficulty": "medium", "category": "places" },
  { "text": "The airport has planes", "difficulty": "medium", "category": "places" },
  { "text": "The beach has sand", "difficulty": "medium", "category": "places" },
  { "text": "The mountain is high", "difficulty": "medium", "category": "places" },
  { "text": "The river flows", "difficulty": "medium", "category": "places" },
  { "text": "The forest has trees", "difficulty": "medium", "category": "places" },
  { "text": "The shop is next to the bank", "difficulty": "hard", "category": "places" },
  { "text": "The school is behind the library", "difficulty": "hard", "category": "places" },
  { "text": "The park is in front of my house", "difficulty": "hard", "category": "places" },
  { "text": "The cinema is between the shop and the restaurant", "difficulty": "hard", "category": "places" },
  { "text": "Turn left at the corner", "difficulty": "hard", "category": "places" },
  { "text": "Go straight ahead", "difficulty": "hard", "category": "places" },
  { "text": "The cinema is on the right", "difficulty": "hard", "category": "places" },
  { "text": "The library is on the left", "difficulty": "hard", "category": "places" },

  // 服装与颜色 (Clothes & Colors) - 20句
  { "text": "I wear a shirt", "difficulty": "easy", "category": "clothes" },
  { "text": "She likes her dress", "difficulty": "easy", "category": "clothes" },
  { "text": "He wears jeans", "difficulty": "easy", "category": "clothes" },
  { "text": "I put on my hat", "difficulty": "easy", "category": "clothes" },
  { "text": "She has a red jacket", "difficulty": "medium", "category": "clothes" },
  { "text": "He wears blue shoes", "difficulty": "medium", "category": "clothes" },
  { "text": "I need new socks", "difficulty": "medium", "category": "clothes" },
  { "text": "She bought a skirt", "difficulty": "medium", "category": "clothes" },
  { "text": "T-shirts are casual", "difficulty": "medium", "category": "clothes" },
  { "text": "Winter coats are warm", "difficulty": "medium", "category": "clothes" },
  { "text": "I wear sneakers to run", "difficulty": "medium", "category": "clothes" },
  { "text": "She loves her blue jeans", "difficulty": "medium", "category": "clothes" },
  { "text": "The sweater is soft", "difficulty": "medium", "category": "clothes" },
  { "text": "I take off my shoes", "difficulty": "medium", "category": "clothes" },
  { "text": "She has long pants", "difficulty": "medium", "category": "clothes" },
  { "text": "The sky is blue", "difficulty": "easy", "category": "color" },
  { "text": "Grass is green", "difficulty": "easy", "category": "color" },
  { "text": "Fire is red", "difficulty": "easy", "category": "color" },
  { "text": "Snow is white", "difficulty": "easy", "category": "color" },
  { "text": "The sun is yellow", "difficulty": "easy", "category": "color" },

  // 时态练习 (Tenses) - 80句
  { "text": "I go to school every day", "difficulty": "easy", "category": "tenses" },
  { "text": "She reads books in the evening", "difficulty": "medium", "category": "tenses" },
  { "text": "They play football on weekends", "difficulty": "medium", "category": "tenses" },
  { "text": "He likes ice cream", "difficulty": "easy", "category": "tenses" },
  { "text": "We eat lunch at school", "difficulty": "medium", "category": "tenses" },
  { "text": "I am reading a book now", "difficulty": "medium", "category": "tenses" },
  { "text": "She is watching TV", "difficulty": "medium", "category": "tenses" },
  { "text": "They are playing outside", "difficulty": "medium", "category": "tenses" },
  { "text": "He is listening to music", "difficulty": "medium", "category": "tenses" },
  { "text": "We are having dinner", "difficulty": "medium", "category": "tenses" },
  { "text": "I went to the park yesterday", "difficulty": "medium", "category": "tenses" },
  { "text": "She visited her grandmother last week", "difficulty": "hard", "category": "tenses" },
  { "text": "They watched a movie yesterday", "difficulty": "medium", "category": "tenses" },
  { "text": "He played football last Saturday", "difficulty": "medium", "category": "tenses" },
  { "text": "We cleaned our room yesterday", "difficulty": "medium", "category": "tenses" },
  { "text": "I will go to the party tomorrow", "difficulty": "medium", "category": "tenses" },
  { "text": "She will visit her friends next week", "difficulty": "hard", "category": "tenses" },
  { "text": "They will travel to London next month", "difficulty": "hard", "category": "tenses" },
  { "text": "He will start a new job soon", "difficulty": "hard", "category": "tenses" },
  { "text": "We will have a picnic on Sunday", "difficulty": "medium", "category": "tenses" },
  { "text": "I am going to study abroad next year", "difficulty": "hard", "category": "tenses" },
  { "text": "She is going to visit her friend", "difficulty": "hard", "category": "tenses" },
  { "text": "He was reading when I called", "difficulty": "hard", "category": "tenses" },
  { "text": "They were playing when it started to rain", "difficulty": "hard", "category": "tenses" },
  { "text": "I had finished my homework before dinner", "difficulty": "hard", "category": "tenses" },
  { "text": "She had left before I arrived", "difficulty": "hard", "category": "tenses" },
  { "text": "We will have completed the project by Friday", "difficulty": "hard", "category": "tenses" },
  { "text": "I have lived here for five years", "difficulty": "hard", "category": "tenses" },
  { "text": "She has been studying English for two years", "difficulty": "hard", "category": "tenses" },
  { "text": "They have already eaten", "difficulty": "hard", "category": "tenses" },
  { "text": "I have never traveled abroad", "difficulty": "hard", "category": "tenses" },
  { "text": "He has just arrived", "difficulty": "hard", "category": "tenses" },
  { "text": "I used to play with toys", "difficulty": "hard", "category": "tenses" },
  { "text": "She used to live in the countryside", "difficulty": "hard", "category": "tenses" },
  { "text": "I am used to getting up early", "difficulty": "hard", "category": "tenses" },
  { "text": "If I have time, I will help you", "difficulty": "hard", "category": "tenses" },
  { "text": "If I were rich, I would travel the world", "difficulty": "hard", "category": "tenses" },
  { "text": "I would have called you if I had known", "difficulty": "hard", "category": "tenses" },
  { "text": "I am not going to the party", "difficulty": "hard", "category": "tenses" },
  { "text": "She is always complaining", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been waiting for an hour", "difficulty": "hard", "category": "tenses" },
  { "text": "He will be working when you arrive", "difficulty": "hard", "category": "tenses" },
  { "text": "I was watching TV at 8 o'clock", "difficulty": "hard", "category": "tenses" },
  { "text": "I had been studying for hours when I took a break", "difficulty": "hard", "category": "tenses" },
  { "text": "By next year, I will have finished school", "difficulty": "hard", "category": "tenses" },
  { "text": "I would like to visit Paris", "difficulty": "hard", "category": "tenses" },
  { "text": "I have already finished my homework", "difficulty": "hard", "category": "tenses" },
  { "text": "It was raining when I left home", "difficulty": "hard", "category": "tenses" },
  { "text": "I will call you when I arrive", "difficulty": "hard", "category": "tenses" },
  { "text": "She has just had breakfast", "difficulty": "hard", "category": "tenses" },
  { "text": "I am reading an interesting book", "difficulty": "hard", "category": "tenses" },
  { "text": "I have never seen such beautiful flowers", "difficulty": "hard", "category": "tenses" },
  { "text": "I had finished dinner before the movie started", "difficulty": "hard", "category": "tenses" },
  { "text": "I was sleeping when you called", "difficulty": "hard", "category": "tenses" },
  { "text": "We are going to travel next summer", "difficulty": "hard", "category": "tenses" },
  { "text": "She has been working here since 2010", "difficulty": "hard", "category": "tenses" },
  { "text": "I will have completed this task by tomorrow", "difficulty": "hard", "category": "tenses" },
  { "text": "I am meeting my friend later", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been learning English for three years", "difficulty": "hard", "category": "tenses" },
  { "text": "I will be working late tonight", "difficulty": "hard", "category": "tenses" },
  { "text": "I was going to call you, but I forgot", "difficulty": "hard", "category": "tenses" },
  { "text": "I have already seen that movie", "difficulty": "hard", "category": "tenses" },
  { "text": "She is going to start university next year", "difficulty": "hard", "category": "tenses" },
  { "text": "I had never tried sushi before", "difficulty": "hard", "category": "tenses" },
  { "text": "I am not feeling well today", "difficulty": "hard", "category": "tenses" },
  { "text": "I will have been living here for 10 years next month", "difficulty": "hard", "category": "tenses" },
  { "text": "I was going to the store when I met him", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been wanting to tell you something", "difficulty": "hard", "category": "tenses" },
  { "text": "I would have helped if I had known", "difficulty": "hard", "category": "tenses" },
  { "text": "I had been looking for my keys all morning", "difficulty": "hard", "category": "tenses" },
  { "text": "I hope you will come to my party", "difficulty": "hard", "category": "tenses" },
  { "text": "I wish I could fly", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been thinking about changing jobs", "difficulty": "hard", "category": "tenses" },
  { "text": "I will have been studying for 3 hours by the time you arrive", "difficulty": "hard", "category": "tenses" },
  { "text": "I used to be afraid of the dark", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been to that restaurant many times", "difficulty": "hard", "category": "tenses" },

  // 句型转换 (Sentence Patterns) - 40句
  { "text": "I like ice cream", "difficulty": "easy", "category": "patterns" },
  { "text": "Do you like ice cream?", "difficulty": "easy", "category": "patterns" },
  { "text": "I don't like vegetables", "difficulty": "medium", "category": "patterns" },
  { "text": "Please close the door", "difficulty": "medium", "category": "patterns" },
  { "text": "The cat is sleeping", "difficulty": "easy", "category": "patterns" },
  { "text": "Is the cat sleeping?", "difficulty": "easy", "category": "patterns" },
  { "text": "The cat is not sleeping", "difficulty": "medium", "category": "patterns" },
  { "text": "Don't be late!", "difficulty": "medium", "category": "patterns" },
  { "text": "She goes to school", "difficulty": "easy", "category": "patterns" },
  { "text": "Does she go to school?", "difficulty": "medium", "category": "patterns" },
  { "text": "She does not go to school", "difficulty": "hard", "category": "patterns" },
  { "text": "Don't run in the hallways", "difficulty": "hard", "category": "patterns" },
  { "text": "They are playing games", "difficulty": "medium", "category": "patterns" },
  { "text": "Are they playing games?", "difficulty": "medium", "category": "patterns" },
  { "text": "They are not playing games", "difficulty": "hard", "category": "patterns" },
  { "text": "Please be quiet", "difficulty": "medium", "category": "patterns" },
  { "text": "He has finished his homework", "difficulty": "medium", "category": "patterns" },
  { "text": "Has he finished his homework?", "difficulty": "hard", "category": "patterns" },
  { "text": "He has not finished his homework", "difficulty": "hard", "category": "patterns" },
  { "text": "Don't leave your things here", "difficulty": "hard", "category": "patterns" },
  { "text": "We will visit the museum", "difficulty": "medium", "category": "patterns" },
  { "text": "Will we visit the museum?", "difficulty": "medium", "category": "patterns" },
  { "text": "We will not visit the museum", "difficulty": "hard", "category": "patterns" },
  { "text": "Let's go to the park", "difficulty": "medium", "category": "patterns" },
  { "text": "What is your name?", "difficulty": "easy", "category": "patterns" },
  { "text": "Where do you live?", "difficulty": "medium", "category": "patterns" },
  { "text": "How old are you?", "difficulty": "easy", "category": "patterns" },
  { "text": "Why are you crying?", "difficulty": "medium", "category": "patterns" },
  { "text": "When is your birthday?", "difficulty": "medium", "category": "patterns" },
  { "text": "Who is your best friend?", "difficulty": "medium", "category": "patterns" },
  { "text": "Which book do you like?", "difficulty": "hard", "category": "patterns" },
  { "text": "How many apples do you have?", "difficulty": "medium", "category": "patterns" },
  { "text": "How much does this cost?", "difficulty": "hard", "category": "patterns" },
  { "text": "What time is it?", "difficulty": "medium", "category": "patterns" },
  { "text": "How do you feel?", "difficulty": "medium", "category": "patterns" },
  { "text": "How often do you brush your teeth?", "difficulty": "hard", "category": "patterns" },
  { "text": "How long have you lived here?", "difficulty": "hard", "category": "patterns" },
  { "text": "What are you doing?", "difficulty": "medium", "category": "patterns" },
  { "text": "Where are you going?", "difficulty": "medium", "category": "patterns" },
  { "text": "Why did you come late?", "difficulty": "hard", "category": "patterns" },

  // 形容词与副词 (Adjectives & Adverbs) - 30句
  { "text": "The cat is cute", "difficulty": "easy", "category": "adjectives" },
  { "text": "The dog is big", "difficulty": "easy", "category": "adjectives" },
  { "text": "She runs fast", "difficulty": "easy", "category": "adverbs" },
  { "text": "He speaks loudly", "difficulty": "medium", "category": "adverbs" },
  { "text": "The book is interesting", "difficulty": "medium", "category": "adjectives" },
  { "text": "She sings beautifully", "difficulty": "hard", "category": "adverbs" },
  { "text": "This car is faster than that one", "difficulty": "hard", "category": "adjectives" },
  { "text": "He runs faster than me", "difficulty": "hard", "category": "adverbs" },
  { "text": "This is the most interesting book", "difficulty": "hard", "category": "adjectives" },
  { "text": "She sings the most beautifully", "difficulty": "hard", "category": "adverbs" },
  { "text": "The red ball is bigger than the blue one", "difficulty": "hard", "category": "adjectives" },
  { "text": "She speaks more clearly than him", "difficulty": "hard", "category": "adverbs" },
  { "text": "This is the biggest apple", "difficulty": "hard", "category": "adjectives" },
  { "text": "He works the most carefully", "difficulty": "hard", "category": "adverbs" },
  { "text": "The weather is getting warmer", "difficulty": "hard", "category": "adjectives" },
  { "text": "She is drawing more carefully now", "difficulty": "hard", "category": "adverbs" },
  { "text": "I am taller than my sister", "difficulty": "hard", "category": "adjectives" },
  { "text": "He is driving more slowly", "difficulty": "hard", "category": "adverbs" },
  { "text": "This is as good as that", "difficulty": "hard", "category": "adjectives" },
  { "text": "She sings as beautifully as her mother", "difficulty": "hard", "category": "adverbs" },
  { "text": "The house is very beautiful", "difficulty": "medium", "category": "adjectives" },
  { "text": "He works very hard", "difficulty": "medium", "category": "adverbs" },
  { "text": "The movie was extremely interesting", "difficulty": "hard", "category": "adjectives" },
  { "text": "She dances extremely well", "difficulty": "hard", "category": "adverbs" },
  { "text": "The test was quite difficult", "difficulty": "hard", "category": "adjectives" },
  { "text": "He speaks quite fluently", "difficulty": "hard", "category": "adverbs" },
  { "text": "The children are very happy", "difficulty": "medium", "category": "adjectives" },
  { "text": "She always comes early", "difficulty": "medium", "category": "adverbs" },
  { "text": "The story was really exciting", "difficulty": "hard", "category": "adjectives" },
  { "text": "He never gives up", "difficulty": "medium", "category": "adverbs" },

  // 功能表达 (Functional Expressions) - 50句
  { "text": "Can I have some water?", "difficulty": "medium", "category": "functions" },
  { "text": "Could you help me?", "difficulty": "hard", "category": "functions" },
  { "text": "May I go out to play?", "difficulty": "hard", "category": "functions" },
  { "text": "Would you like some cake?", "difficulty": "hard", "category": "functions" },
  { "text": "Please sit down", "difficulty": "medium", "category": "functions" },
  { "text": "Could you please be quiet?", "difficulty": "hard", "category": "functions" },
  { "text": "Excuse me", "difficulty": "easy", "category": "functions" },
  { "text": "I am sorry", "difficulty": "easy", "category": "functions" },
  { "text": "Thank you very much", "difficulty": "medium", "category": "functions" },
  { "text": "You are welcome", "difficulty": "medium", "category": "functions" },
  { "text": "Good morning", "difficulty": "easy", "category": "functions" },
  { "text": "How are you?", "difficulty": "easy", "category": "functions" },
  { "text": "I am fine, thank you", "difficulty": "easy", "category": "functions" },
  { "text": "What is your name?", "difficulty": "easy", "category": "functions" },
  { "text": "My name is John", "difficulty": "easy", "category": "functions" },
  { "text": "Nice to meet you", "difficulty": "medium", "category": "functions" },
  { "text": "Where do you live?", "difficulty": "medium", "category": "functions" },
  { "text": "I live in a city", "difficulty": "medium", "category": "functions" },
  { "text": "Do you like ice cream?", "difficulty": "medium", "category": "functions" },
  { "text": "Yes, I do", "difficulty": "easy", "category": "functions" },
  { "text": "No, I do not", "difficulty": "easy", "category": "functions" },
  { "text": "I am happy today", "difficulty": "medium", "category": "functions" },
  { "text": "I am sad sometimes", "difficulty": "medium", "category": "functions" },
  { "text": "Let us play together", "difficulty": "medium", "category": "functions" },
  { "text": "See you tomorrow", "difficulty": "medium", "category": "functions" },
  { "text": "Have a good day", "difficulty": "medium", "category": "functions" },
  { "text": "Good night", "difficulty": "easy", "category": "functions" },
  { "text": "I love you", "difficulty": "medium", "category": "functions" },
  { "text": "I miss you", "difficulty": "medium", "category": "functions" },
  { "text": "I agree with you", "difficulty": "hard", "category": "functions" },
  { "text": "I think so too", "difficulty": "medium", "category": "functions" },
  { "text": "I do not think so", "difficulty": "hard", "category": "functions" },
  { "text": "Maybe we can try again", "difficulty": "hard", "category": "functions" },
  { "text": "I hope so", "difficulty": "medium", "category": "functions" },
  { "text": "I am not sure", "difficulty": "medium", "category": "functions" },
  { "text": "That sounds good", "difficulty": "medium", "category": "functions" },
  { "text": "Let me think about it", "difficulty": "hard", "category": "functions" },
  { "text": "I would like to go", "difficulty": "hard", "category": "functions" },
  { "text": "I want to learn English", "difficulty": "hard", "category": "functions" },
  { "text": "I need to finish my homework", "difficulty": "hard", "category": "functions" },
  { "text": "I have to go now", "difficulty": "medium", "category": "functions" },
  { "text": "You must be careful", "difficulty": "hard", "category": "functions" },
  { "text": "You should eat more vegetables", "difficulty": "hard", "category": "functions" },
  { "text": "I have to clean my room", "difficulty": "hard", "category": "functions" },
  { "text": "I should study harder", "difficulty": "hard", "category": "functions" },
  { "text": "You need to drink more water", "difficulty": "hard", "category": "functions" },
  { "text": "Let me help you", "difficulty": "medium", "category": "functions" },
  { "text": "It is time to go", "difficulty": "medium", "category": "functions" },
  { "text": "How about going to the park?", "difficulty": "hard", "category": "functions" },
  { "text": "What do you think?", "difficulty": "medium", "category": "functions" },

  // 交通 (Transportation) - 25句
  { "text": "I ride a bike", "difficulty": "easy", "category": "transportation" },
  { "text": "The bus stops here", "difficulty": "medium", "category": "transportation" },
  { "text": "The train is late", "difficulty": "medium", "category": "transportation" },
  { "text": "I like traveling by car", "difficulty": "medium", "category": "transportation" },
  { "text": "The plane flies high", "difficulty": "medium", "category": "transportation" },
  { "text": "My father drives to work", "difficulty": "medium", "category": "transportation" },
  { "text": "The subway is fast", "difficulty": "medium", "category": "transportation" },
  { "text": "I take the bus to school", "difficulty": "medium", "category": "transportation" },
  { "text": "The taxi is waiting", "difficulty": "medium", "category": "transportation" },
  { "text": "We are going by train", "difficulty": "medium", "category": "transportation" },
  { "text": "The ship is in the harbor", "difficulty": "hard", "category": "transportation" },
  { "text": "I can ride a horse", "difficulty": "medium", "category": "transportation" },
  { "text": "The traffic light is red", "difficulty": "medium", "category": "transportation" },
  { "text": "Stop at the traffic light", "difficulty": "medium", "category": "transportation" },
  { "text": "The airport is far away", "difficulty": "medium", "category": "transportation" },
  { "text": "I will take a taxi", "difficulty": "medium", "category": "transportation" },
  { "text": "The car is fast", "difficulty": "easy", "category": "transportation" },
  { "text": "The bike is green", "difficulty": "easy", "category": "transportation" },
  { "text": "The train is very crowded", "difficulty": "hard", "category": "transportation" },
  { "text": "The bus is comfortable", "difficulty": "medium", "category": "transportation" },
  { "text": "The station is near my house", "difficulty": "medium", "category": "transportation" },
  { "text": "I need to get a ticket", "difficulty": "medium", "category": "transportation" },
  { "text": "The driver is friendly", "difficulty": "medium", "category": "transportation" },
  { "text": "The ticket is expensive", "difficulty": "medium", "category": "transportation" },
  { "text": "The journey takes two hours", "difficulty": "hard", "category": "transportation" },

  // 兴趣爱好 (Hobbies) - 25句
  { "text": "I like collecting stamps", "difficulty": "hard", "category": "hobbies" },
  { "text": "She enjoys reading books", "difficulty": "medium", "category": "hobbies" },
  { "text": "He plays the guitar", "difficulty": "medium", "category": "hobbies" },
  { "text": "We go hiking on weekends", "difficulty": "hard", "category": "hobbies" },
  { "text": "She loves painting pictures", "difficulty": "medium", "category": "hobbies" },
  { "text": "I play computer games", "difficulty": "medium", "category": "hobbies" },
  { "text": "He is good at chess", "difficulty": "hard", "category": "hobbies" },
  { "text": "She likes gardening", "difficulty": "medium", "category": "hobbies" },
  { "text": "I watch movies in my free time", "difficulty": "hard", "category": "hobbies" },
  { "text": "He practices piano every day", "difficulty": "hard", "category": "hobbies" },
  { "text": "We play board games together", "difficulty": "hard", "category": "hobbies" },
  { "text": "She is interested in photography", "difficulty": "hard", "category": "hobbies" },
  { "text": "I enjoy cooking", "difficulty": "medium", "category": "hobbies" },
  { "text": "He likes fishing", "difficulty": "medium", "category": "hobbies" },
  { "text": "She dances ballet", "difficulty": "hard", "category": "hobbies" },
  { "text": "I like taking photographs", "difficulty": "hard", "category": "hobbies" },
  { "text": "He builds model airplanes", "difficulty": "hard", "category": "hobbies" },
  { "text": "We go swimming regularly", "difficulty": "hard", "category": "hobbies" },
  { "text": "She plays tennis", "difficulty": "medium", "category": "hobbies" },
  { "text": "I write stories", "difficulty": "medium", "category": "hobbies" },
  { "text": "He collects coins", "difficulty": "medium", "category": "hobbies" },
  { "text": "She practices yoga", "difficulty": "hard", "category": "hobbies" },
  { "text": "I like bird watching", "difficulty": "hard", "category": "hobbies" },
  { "text": "He plays chess with his grandfather", "difficulty": "hard", "category": "hobbies" },
  { "text": "We make crafts together", "difficulty": "hard", "category": "hobbies" },

  // 节日与庆祝 (Festivals & Celebrations) - 25句
  { "text": "We celebrate Christmas", "difficulty": "medium", "category": "festivals" },
  { "text": "I get presents at Christmas", "difficulty": "medium", "category": "festivals" },
  { "text": "We eat turkey on Christmas", "difficulty": "hard", "category": "festivals" },
  { "text": "I dress up for Halloween", "difficulty": "hard", "category": "festivals" },
  { "text": "We give Easter eggs", "difficulty": "hard", "category": "festivals" },
  { "text": "We light candles on birthdays", "difficulty": "hard", "category": "festivals" },
  { "text": "I have a birthday party", "difficulty": "medium", "category": "festivals" },
  { "text": "I blow out the candles", "difficulty": "hard", "category": "festivals" },
  { "text": "We have fireworks on New Year", "difficulty": "hard", "category": "festivals" },
  { "text": "I make a wish on my birthday", "difficulty": "hard", "category": "festivals" },
  { "text": "We go trick-or-treating", "difficulty": "hard", "category": "festivals" },
  { "text": "We hide Easter eggs", "difficulty": "hard", "category": "festivals" },
  { "text": "I wear a costume for Halloween", "difficulty": "hard", "category": "festivals" },
  { "text": "We decorate the Christmas tree", "difficulty": "hard", "category": "festivals" },
  { "text": "We sing Christmas songs", "difficulty": "hard", "category": "festivals" },
  { "text": "I receive money for Chinese New Year", "difficulty": "hard", "category": "festivals" },
  { "text": "We watch the parade", "difficulty": "medium", "category": "festivals" },
  { "text": "We celebrate with a big meal", "difficulty": "hard", "category": "festivals" },
  { "text": "I make cards for my friends", "difficulty": "hard", "category": "festivals" },
  { "text": "We have a celebration party", "difficulty": "hard", "category": "festivals" },
  { "text": "I like the festival lights", "difficulty": "medium", "category": "festivals" },
  { "text": "We exchange gifts", "difficulty": "hard", "category": "festivals" },
  { "text": "I enjoy the festival", "difficulty": "medium", "category": "festivals" },
  { "text": "We have a special dinner", "difficulty": "medium", "category": "festivals" },
  { "text": "The festival is colorful", "difficulty": "medium", "category": "festivals" },

  // 身体部位 (Body Parts) - 25句
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

  // 购物 (Shopping) - 25句
  { "text": "I go shopping with my mother", "difficulty": "medium", "category": "shopping" },
  { "text": "The shop is open", "difficulty": "medium", "category": "shopping" },
  { "text": "I need to buy clothes", "difficulty": "medium", "category": "shopping" },
  { "text": "The store has many things", "difficulty": "medium", "category": "shopping" },
  { "text": "I like the red shirt", "difficulty": "medium", "category": "shopping" },
  { "text": "How much is this?", "difficulty": "easy", "category": "shopping" },
  { "text": "It costs ten dollars", "difficulty": "medium", "category": "shopping" },
  { "text": "I want to buy that", "difficulty": "medium", "category": "shopping" },
  { "text": "I can afford it", "difficulty": "hard", "category": "shopping" },
  { "text": "I need to compare prices", "difficulty": "hard", "category": "shopping" },
  { "text": "The shop is expensive", "difficulty": "medium", "category": "shopping" },
  { "text": "I have enough money", "difficulty": "medium", "category": "shopping" },
  { "text": "Can I pay by card?", "difficulty": "hard", "category": "shopping" },
  { "text": "I bought a new dress", "difficulty": "medium", "category": "shopping" },
  { "text": "The sale starts tomorrow", "difficulty": "hard", "category": "shopping" },
  { "text": "I like shopping online", "difficulty": "hard", "category": "shopping" },
  { "text": "The store is crowded", "difficulty": "medium", "category": "shopping" },
  { "text": "I will return this later", "difficulty": "hard", "category": "shopping" },
  { "text": "The cashier is friendly", "difficulty": "medium", "category": "shopping" },
  { "text": "I have a shopping list", "difficulty": "medium", "category": "shopping" },
  { "text": "I will check the price", "difficulty": "hard", "category": "shopping" },
  { "text": "I will pay in cash", "difficulty": "hard", "category": "shopping" },
  { "text": "I will take two of them", "difficulty": "hard", "category": "shopping" },
  { "text": "I want to try it on", "difficulty": "hard", "category": "shopping" },
  { "text": "The discount is good", "difficulty": "hard", "category": "shopping" },

  // 数字 (Numbers) - 25句
  { "text": "One plus one equals two", "difficulty": "medium", "category": "numbers" },
  { "text": "I have three apples", "difficulty": "easy", "category": "numbers" },
  { "text": "Ten is bigger than five", "difficulty": "medium", "category": "numbers" },
  { "text": "Twenty comes after nineteen", "difficulty": "medium", "category": "numbers" },
  { "text": "Fifty is half of one hundred", "difficulty": "hard", "category": "numbers" },
  { "text": "I am seven years old", "difficulty": "medium", "category": "numbers" },
  { "text": "There are twelve months", "difficulty": "medium", "category": "numbers" },
  { "text": "One hundred is the biggest number", "difficulty": "medium", "category": "numbers" },
  { "text": "Zero means nothing", "difficulty": "medium", "category": "numbers" },
  { "text": "Nine times nine is eighty-one", "difficulty": "hard", "category": "numbers" },
  { "text": "Thirty minutes is half an hour", "difficulty": "hard", "category": "numbers" },
  { "text": "A dozen means twelve", "difficulty": "hard", "category": "numbers" },
  { "text": "Seventy is ten more than sixty", "difficulty": "hard", "category": "numbers" },
  { "text": "Eight is smaller than ten", "difficulty": "medium", "category": "numbers" },
  { "text": "Twenty-five is a quarter of one hundred", "difficulty": "hard", "category": "numbers" },
  { "text": "I can count to one hundred", "difficulty": "medium", "category": "numbers" },
  { "text": "Six times seven equals forty-two", "difficulty": "hard", "category": "numbers" },
  { "text": "Fifteen is three times five", "difficulty": "hard", "category": "numbers" },
  { "text": "The number forty is between thirty and fifty", "difficulty": "hard", "category": "numbers" },
  { "text": "Ninety is ten less than one hundred", "difficulty": "hard", "category": "numbers" },
  { "text": "Three is less than four", "difficulty": "medium", "category": "numbers" },
  { "text": "Sixty seconds make one minute", "difficulty": "hard", "category": "numbers" },
  { "text": "My house number is forty-five", "difficulty": "medium", "category": "numbers" },
  { "text": "I scored ninety percent", "difficulty": "hard", "category": "numbers" },
  { "text": "The temperature is minus five degrees", "difficulty": "hard", "category": "numbers" },

  // 健康 (Health) - 25句
  { "text": "I brush my teeth twice a day", "difficulty": "hard", "category": "health" },
  { "text": "Exercise is good for health", "difficulty": "hard", "category": "health" },
  { "text": "I sleep eight hours every night", "difficulty": "hard", "category": "health" },
  { "text": "I drink lots of water", "difficulty": "medium", "category": "health" },
  { "text": "I eat healthy food", "difficulty": "medium", "category": "health" },
  { "text": "I should wash my hands", "difficulty": "hard", "category": "health" },
  { "text": "I feel tired today", "difficulty": "medium", "category": "health" },
  { "text": "I have a headache", "difficulty": "medium", "category": "health" },
  { "text": "I need to see the doctor", "difficulty": "hard", "category": "health" },
  { "text": "I take vitamins", "difficulty": "hard", "category": "health" },
  { "text": "Rest is important", "difficulty": "medium", "category": "health" },
  { "text": "I have a cold", "difficulty": "medium", "category": "health" },
  { "text": "I am feeling better", "difficulty": "medium", "category": "health" },
  { "text": "I exercise every day", "difficulty": "medium", "category": "health" },
  { "text": "I have a stomach ache", "difficulty": "medium", "category": "health" },
  { "text": "I need to eat breakfast", "difficulty": "hard", "category": "health" },
  { "text": "I have an allergy", "difficulty": "hard", "category": "health" },
  { "text": "I feel dizzy", "difficulty": "hard", "category": "health" },
  { "text": "I should stay in bed", "difficulty": "hard", "category": "health" },
  { "text": "My throat hurts", "difficulty": "medium", "category": "health" },
  { "text": "I need medicine", "difficulty": "medium", "category": "health" },
  { "text": "I am on a diet", "difficulty": "hard", "category": "health" },
  { "text": "Sleep is essential", "difficulty": "hard", "category": "health" },
  { "text": "Fresh air is good for me", "difficulty": "hard", "category": "health" },
  { "text": "I feel energetic", "difficulty": "hard", "category": "health" },

  // 环境 (Environment) - 25句
  { "text": "We should protect the environment", "difficulty": "hard", "category": "environment" },
  { "text": "Pollution is bad for the earth", "difficulty": "hard", "category": "environment" },
  { "text": "We need to save water", "difficulty": "hard", "category": "environment" },
  { "text": "Recycling helps the environment", "difficulty": "hard", "category": "environment" },
  { "text": "Plastic bags are harmful", "difficulty": "hard", "category": "environment" },
  { "text": "Trees clean the air", "difficulty": "medium", "category": "environment" },
  { "text": "We should use less energy", "difficulty": "hard", "category": "environment" },
  { "text": "The forest is disappearing", "difficulty": "hard", "category": "environment" },
  { "text": "Animals need protection", "difficulty": "medium", "category": "environment" },
  { "text": "The earth is in danger", "difficulty": "hard", "category": "environment" },
  { "text": "We should plant more trees", "difficulty": "hard", "category": "environment" },
  { "text": "The ocean is polluted", "difficulty": "hard", "category": "environment" },
  { "text": "Global warming is a problem", "difficulty": "hard", "category": "environment" },
  { "text": "We should reuse materials", "difficulty": "hard", "category": "environment" },
  { "text": "Solar energy is clean", "difficulty": "hard", "category": "environment" },
  { "text": "We need clean air", "difficulty": "medium", "category": "environment" },
  { "text": "Wildlife is important", "difficulty": "medium", "category": "environment" },
  { "text": "We should reduce waste", "difficulty": "hard", "category": "environment" },
  { "text": "The river is dirty", "difficulty": "medium", "category": "environment" },
  { "text": "Green plants are beautiful", "difficulty": "medium", "category": "environment" },
  { "text": "We should care for nature", "difficulty": "hard", "category": "environment" },
  { "text": "The sky is blue", "difficulty": "easy", "category": "environment" },
  { "text": "The sun gives us light", "difficulty": "medium", "category": "environment" },
  { "text": "Rain helps plants grow", "difficulty": "medium", "category": "environment" },
  { "text": "We live on planet Earth", "difficulty": "medium", "category": "environment" },

  // 比较结构 (Comparison) - 25句
  { "text": "This apple is bigger than that one", "difficulty": "hard", "category": "comparison" },
  { "text": "Dogs are friendlier than cats", "difficulty": "hard", "category": "comparison" },
  { "text": "Running is faster than walking", "difficulty": "hard", "category": "comparison" },
  { "text": "This book is more interesting than that one", "difficulty": "hard", "category": "comparison" },
  { "text": "Winter is colder than spring", "difficulty": "hard", "category": "comparison" },
  { "text": "She is taller than her sister", "difficulty": "hard", "category": "comparison" },
  { "text": "This car is more expensive than that one", "difficulty": "hard", "category": "comparison" },
  { "text": "Math is harder than music", "difficulty": "hard", "category": "comparison" },
  { "text": "This dress is prettier than that one", "difficulty": "hard", "category": "comparison" },
  { "text": "He runs faster than me", "difficulty": "hard", "category": "comparison" },
  { "text": "Today is hotter than yesterday", "difficulty": "hard", "category": "comparison" },
  { "text": "This movie is better than the last one", "difficulty": "hard", "category": "comparison" },
  { "text": "My mom is stricter than my dad", "difficulty": "hard", "category": "comparison" },
  { "text": "This game is more fun than that one", "difficulty": "hard", "category": "comparison" },
  { "text": "The red shirt is more colorful than the blue one", "difficulty": "hard", "category": "comparison" },
  { "text": "She studies harder than her brother", "difficulty": "hard", "category": "comparison" },
  { "text": "This restaurant is more expensive", "difficulty": "hard", "category": "comparison" },
  { "text": "My room is messier than my sister's", "difficulty": "hard", "category": "comparison" },
  { "text": "This song is louder than that one", "difficulty": "hard", "category": "comparison" },
  { "text": "This test was easier than I expected", "difficulty": "hard", "category": "comparison" },
  { "text": "She speaks more clearly than him", "difficulty": "hard", "category": "comparison" },
  { "text": "This path is shorter than the other", "difficulty": "hard", "category": "comparison" },
  { "text": "The teacher is stricter than the assistant", "difficulty": "hard", "category": "comparison" },
  { "text": "This fruit is sweeter than that vegetable", "difficulty": "hard", "category": "comparison" },
  { "text": "My bike is older than my car", "difficulty": "hard", "category": "comparison" },

  // 情态动词 (Modals) - 25句
  { "text": "I can swim", "difficulty": "easy", "category": "modals" },
  { "text": "She can ride a bike", "difficulty": "medium", "category": "modals" },
  { "text": "I cannot run fast", "difficulty": "medium", "category": "modals" },
  { "text": "He could play piano", "difficulty": "hard", "category": "modals" },
  { "text": "I may go to the park", "difficulty": "hard", "category": "modals" },
  { "text": "You might be right", "difficulty": "hard", "category": "modals" },
  { "text": "I must finish my homework", "difficulty": "hard", "category": "modals" },
  { "text": "You should study hard", "difficulty": "hard", "category": "modals" },
  { "text": "We should help others", "difficulty": "hard", "category": "modals" },
  { "text": "I would like some water", "difficulty": "hard", "category": "modals" },
  { "text": "I would go if I had time", "difficulty": "hard", "category": "modals" },
  { "text": "You must be careful", "difficulty": "hard", "category": "modals" },
  { "text": "She can speak English", "difficulty": "medium", "category": "modals" },
  { "text": "I could not understand", "difficulty": "hard", "category": "modals" },
  { "text": "May I come in?", "difficulty": "hard", "category": "modals" },
  { "text": "You might like it", "difficulty": "hard", "category": "modals" },
  { "text": "I must not be late", "difficulty": "hard", "category": "modals" },
  { "text": "You should not eat too much", "difficulty": "hard", "category": "modals" },
  { "text": "We should not waste time", "difficulty": "hard", "category": "modals" },
  { "text": "I would help if I could", "difficulty": "hard", "category": "modals" },
  { "text": "If I were rich, I would travel", "difficulty": "hard", "category": "modals" },
  { "text": "He should have studied more", "difficulty": "hard", "category": "modals" },
  { "text": "I could have helped you", "difficulty": "hard", "category": "modals" },
  { "text": "You must not forget your keys", "difficulty": "hard", "category": "modals" },
  { "text": "I should not have said that", "difficulty": "hard", "category": "modals" },

  // 非谓语动词 (Non-finites) - 25句
  { "text": "I like to read books", "difficulty": "medium", "category": "non-finites" },
  { "text": "She enjoys swimming", "difficulty": "medium", "category": "non-finites" },
  { "text": "I want to learn English", "difficulty": "hard", "category": "non-finites" },
  { "text": "Swimming is good exercise", "difficulty": "medium", "category": "non-finites" },
  { "text": "I saw him running", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am interested in learning", "difficulty": "hard", "category": "non-finites" },
  { "text": "Reading books is fun", "difficulty": "medium", "category": "non-finites" },
  { "text": "I finished doing my homework", "difficulty": "hard", "category": "non-finites" },
  { "text": "He is good at cooking", "difficulty": "hard", "category": "non-finites" },
  { "text": "I need to practice more", "difficulty": "hard", "category": "non-finites" },
  { "text": "To travel is my dream", "difficulty": "hard", "category": "non-finites" },
  { "text": "It is important to study", "difficulty": "hard", "category": "non-finites" },
  { "text": "I hope to see you soon", "difficulty": "hard", "category": "non-finites" },
  { "text": "Learning English is challenging", "difficulty": "hard", "category": "non-finites" },
  { "text": "I saw a cat sleeping", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am excited about visiting", "difficulty": "hard", "category": "non-finites" },
  { "text": "He decided to go", "difficulty": "hard", "category": "non-finites" },
  { "text": "I want to become a teacher", "difficulty": "hard", "category": "non-finites" },
  { "text": "To be kind is important", "difficulty": "hard", "category": "non-finites" },
  { "text": "Playing games is fun", "difficulty": "medium", "category": "non-finites" },
  { "text": "I remembered to call my friend", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am looking forward to seeing you", "difficulty": "hard", "category": "non-finites" },
  { "text": "He was seen running", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am tired of waiting", "difficulty": "hard", "category": "non-finites" },
  { "text": "To understand is to accept", "difficulty": "hard", "category": "non-finites" },

  // 介词 (Prepositions) - 25句
  { "text": "The book is on the table", "difficulty": "medium", "category": "prepositions" },
  { "text": "The cat is under the chair", "difficulty": "medium", "category": "prepositions" },
  { "text": "I go to school", "difficulty": "easy", "category": "prepositions" },
  { "text": "The ball is in the box", "difficulty": "medium", "category": "prepositions" },
  { "text": "I live at home", "difficulty": "medium", "category": "prepositions" },
  { "text": "The bird flies above the tree", "difficulty": "hard", "category": "prepositions" },
  { "text": "I will meet you at three", "difficulty": "medium", "category": "prepositions" },
  { "text": "I was born in 2010", "difficulty": "medium", "category": "prepositions" },
  { "text": "The children are playing outside", "difficulty": "medium", "category": "prepositions" },
  { "text": "The book is next to the lamp", "difficulty": "hard", "category": "prepositions" },
  { "text": "I walked through the park", "difficulty": "hard", "category": "prepositions" },
  { "text": "I will call you after dinner", "difficulty": "hard", "category": "prepositions" },
  { "text": "The cat jumped over the fence", "difficulty": "hard", "category": "prepositions" },
  { "text": "I arrived before the meeting", "difficulty": "hard", "category": "prepositions" },
  { "text": "The school is across the street", "difficulty": "hard", "category": "prepositions" },
  { "text": "I have not seen him since Monday", "difficulty": "hard", "category": "prepositions" },
  { "text": "The store is between the bank and the post office", "difficulty": "hard", "category": "prepositions" },
  { "text": "I will travel during summer", "difficulty": "hard", "category": "prepositions" },
  { "text": "I have been waiting for an hour", "difficulty": "hard", "category": "prepositions" },
  { "text": "She is interested in art", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am good at swimming", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am afraid of spiders", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am looking for my keys", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am thinking about my vacation", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am responsible for the project", "difficulty": "hard", "category": "prepositions" },

  // 固定搭配 (Fixed Expressions) - 25句
  { "text": "It is time to go", "difficulty": "medium", "category": "expressions" },
  { "text": "I have to go now", "difficulty": "medium", "category": "expressions" },
  { "text": "Let us go to the park", "difficulty": "medium", "category": "expressions" },
  { "text": "How are you doing?", "difficulty": "medium", "category": "expressions" },
  { "text": "What is up?", "difficulty": "medium", "category": "expressions" },
  { "text": "It is up to you", "difficulty": "hard", "category": "expressions" },
  { "text": "I am looking forward to it", "difficulty": "hard", "category": "expressions" },
  { "text": "I hope so", "difficulty": "medium", "category": "expressions" },
  { "text": "I do not think so", "difficulty": "hard", "category": "expressions" },
  { "text": "I am not sure", "difficulty": "medium", "category": "expressions" },
  { "text": "That is a good idea", "difficulty": "medium", "category": "expressions" },
  { "text": "How about that?", "difficulty": "medium", "category": "expressions" },
  { "text": "Let me see", "difficulty": "medium", "category": "expressions" },
  { "text": "You are welcome", "difficulty": "medium", "category": "expressions" },
  { "text": "No problem", "difficulty": "medium", "category": "expressions" },
  { "text": "I am sorry", "difficulty": "easy", "category": "expressions" },
  { "text": "Excuse me", "difficulty": "medium", "category": "expressions" },
  { "text": "Thank you very much", "difficulty": "medium", "category": "expressions" },
  { "text": "You are right", "difficulty": "medium", "category": "expressions" },
  { "text": "I am wrong", "difficulty": "medium", "category": "expressions" },
  { "text": "That is correct", "difficulty": "medium", "category": "expressions" },
  { "text": "That is incorrect", "difficulty": "hard", "category": "expressions" },
  { "text": "I agree with you", "difficulty": "hard", "category": "expressions" },
  { "text": "I disagree with you", "difficulty": "hard", "category": "expressions" },
  { "text": "It depends", "difficulty": "medium", "category": "expressions" },

  // 从句 (Clauses) - 25句
  { "text": "I know that you are busy", "difficulty": "hard", "category": "clauses" },
  { "text": "The book that I read is interesting", "difficulty": "hard", "category": "clauses" },
  { "text": "I will call you when I arrive", "difficulty": "hard", "category": "clauses" },
  { "text": "If it rains, we will stay inside", "difficulty": "hard", "category": "clauses" },
  { "text": "The woman who lives next door is kind", "difficulty": "hard", "category": "clauses" },
  { "text": "I remember when I was young", "difficulty": "hard", "category": "clauses" },
  { "text": "I will tell you what I saw", "difficulty": "hard", "category": "clauses" },
  { "text": "The place where we met is special", "difficulty": "hard", "category": "clauses" },
  { "text": "I do not know why he left", "difficulty": "hard", "category": "clauses" },
  { "text": "She studied hard so that she could pass", "difficulty": "hard", "category": "clauses" },
  { "text": "I want to know what happened", "difficulty": "hard", "category": "clauses" },
  { "text": "The house that we bought is big", "difficulty": "hard", "category": "clauses" },
  { "text": "I will go wherever you go", "difficulty": "hard", "category": "clauses" },
  { "text": "As I was walking, I saw a cat", "difficulty": "hard", "category": "clauses" },
  { "text": "He came after I had left", "difficulty": "hard", "category": "clauses" },
  { "text": "I will stay until you return", "difficulty": "hard", "category": "clauses" },
  { "text": "The movie that we watched was good", "difficulty": "hard", "category": "clauses" },
  { "text": "I will give you what you need", "difficulty": "hard", "category": "clauses" },
  { "text": "The reason why I am late is traffic", "difficulty": "hard", "category": "clauses" },
  { "text": "I like the way that you speak", "difficulty": "hard", "category": "clauses" },
  { "text": "Wherever you go, I will follow", "difficulty": "hard", "category": "clauses" },
  { "text": "I will help you if you need it", "difficulty": "hard", "category": "clauses" },
  { "text": "I hope that you will succeed", "difficulty": "hard", "category": "clauses" },
  { "text": "The time when we met was perfect", "difficulty": "hard", "category": "clauses" },
  { "text": "I do not know whether he will come", "difficulty": "hard", "category": "clauses" },

  // 被动语态 (Passive Voice) - 25句
  { "text": "The book was written by him", "difficulty": "hard", "category": "passive" },
  { "text": "The house is cleaned every day", "difficulty": "hard", "category": "passive" },
  { "text": "The test will be graded tomorrow", "difficulty": "hard", "category": "passive" },
  { "text": "The letter was sent yesterday", "difficulty": "hard", "category": "passive" },
  { "text": "The cake was made by my mother", "difficulty": "hard", "category": "passive" },
  { "text": "The movie was watched by many people", "difficulty": "hard", "category": "passive" },
  { "text": "The homework has been finished", "difficulty": "hard", "category": "passive" },
  { "text": "The door is being painted", "difficulty": "hard", "category": "passive" },
  { "text": "The project will be completed next week", "difficulty": "hard", "category": "passive" },
  { "text": "The song was composed by a famous musician", "difficulty": "hard", "category": "passive" },
  { "text": "The room has been decorated", "difficulty": "hard", "category": "passive" },
  { "text": "The car is being washed", "difficulty": "hard", "category": "passive" },
  { "text": "The building was constructed last year", "difficulty": "hard", "category": "passive" },
  { "text": "The decision was made by the committee", "difficulty": "hard", "category": "passive" },
  { "text": "The flowers are watered every morning", "difficulty": "hard", "category": "passive" },
  { "text": "The problem has been solved", "difficulty": "hard", "category": "passive" },
  { "text": "The picture is being drawn", "difficulty": "hard", "category": "passive" },
  { "text": "The book was published in 2020", "difficulty": "hard", "category": "passive" },
  { "text": "The plan was approved by the manager", "difficulty": "hard", "category": "passive" },
  { "text": "The cookies were baked yesterday", "difficulty": "hard", "category": "passive" },
  { "text": "The question is being answered", "difficulty": "hard", "category": "passive" },
  { "text": "The story was told by my grandfather", "difficulty": "hard", "category": "passive" },
  { "text": "The house has been sold", "difficulty": "hard", "category": "passive" },
  { "text": "The movie will be shown tomorrow", "difficulty": "hard", "category": "passive" },
  { "text": "The letter is being written now", "difficulty": "hard", "category": "passive" },

  // 条件句 (Conditionals) - 25句
  { "text": "If I have money, I will buy a car", "difficulty": "hard", "category": "conditionals" },
  { "text": "If it rains, we will stay home", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would go if I had time", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I were rich, I would travel", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would have called if I had known", "difficulty": "hard", "category": "conditionals" },
  { "text": "If you study hard, you will pass", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had studied, I would have passed", "difficulty": "hard", "category": "conditionals" },
  { "text": "I will help you if you need help", "difficulty": "hard", "category": "conditionals" },
  { "text": "If it were sunny, we would go swimming", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had seen you, I would have said hello", "difficulty": "hard", "category": "conditionals" },
  { "text": "If you are hungry, eat something", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would buy a house if I could afford it", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had not been busy, I would have helped", "difficulty": "hard", "category": "conditionals" },
  { "text": "If he were here, he would agree with us", "difficulty": "hard", "category": "conditionals" },
  { "text": "If we had left earlier, we would have caught the train", "difficulty": "hard", "category": "conditionals" },
  { "text": "You will be late if you do not hurry", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I win the game, I will be happy", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I were you, I would accept the offer", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would have told you if I had known", "difficulty": "hard", "category": "conditionals" },
  { "text": "If the weather is good tomorrow, we will go hiking", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had money, I would buy that book", "difficulty": "hard", "category": "conditionals" },
  { "text": "If she had asked me, I would have helped", "difficulty": "hard", "category": "conditionals" },
  { "text": "If you heat ice, it melts", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had known the truth, I would not have believed it", "difficulty": "hard", "category": "conditionals" },
  { "text": "If we save money, we can buy a car", "difficulty": "hard", "category": "conditionals" },

  // 抽象概念 (Abstract Concepts) - 25句
  { "text": "Happiness is important", "difficulty": "medium", "category": "abstract" },
  { "text": "Kindness makes the world better", "difficulty": "hard", "category": "abstract" },
  { "text": "Freedom is valuable", "difficulty": "hard", "category": "abstract" },
  { "text": "Justice is essential", "difficulty": "hard", "category": "abstract" },
  { "text": "Love is powerful", "difficulty": "medium", "category": "abstract" },
  { "text": "Wisdom comes with experience", "difficulty": "hard", "category": "abstract" },
  { "text": "Patience is a virtue", "difficulty": "hard", "category": "abstract" },
  { "text": "Courage helps us face challenges", "difficulty": "hard", "category": "abstract" },
  { "text": "Trust is built over time", "difficulty": "hard", "category": "abstract" },
  { "text": "Respect is mutual", "difficulty": "hard", "category": "abstract" },
  { "text": "Peace is what we all want", "difficulty": "hard", "category": "abstract" },
  { "text": "Equality is a fundamental right", "difficulty": "hard", "category": "abstract" },
  { "text": "Honesty is the best policy", "difficulty": "hard", "category": "abstract" },
  { "text": "Beauty is in the eye of the beholder", "difficulty": "hard", "category": "abstract" },
  { "text": "Success requires effort", "difficulty": "hard", "category": "abstract" },
  { "text": "Failure teaches us lessons", "difficulty": "hard", "category": "abstract" },
  { "text": "Time is precious", "difficulty": "medium", "category": "abstract" },
  { "text": "Change is inevitable", "difficulty": "hard", "category": "abstract" },
  { "text": "Hope sustains us", "difficulty": "hard", "category": "abstract" },
  { "text": "Memory keeps us connected", "difficulty": "hard", "category": "abstract" },
  { "text": "Dreams inspire us", "difficulty": "medium", "category": "abstract" },
  { "text": "Curiosity drives learning", "difficulty": "hard", "category": "abstract" },
  { "text": "Dedication leads to success", "difficulty": "hard", "category": "abstract" },
  { "text": "Tolerance creates harmony", "difficulty": "hard", "category": "abstract" },
  { "text": "Compassion heals", "difficulty": "hard", "category": "abstract" }
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