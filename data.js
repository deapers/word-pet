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
  { "text": "My name is Tom", "translation": "我的名字是汤姆", "difficulty": "easy", "category": "personal" },
  { "text": "I am eight years old", "translation": "我八岁了", "difficulty": "easy", "category": "personal" },
  { "text": "I was born in London", "translation": "我出生在伦敦", "difficulty": "medium", "category": "personal" },
  { "text": "My birthday is in June", "translation": "我的生日在六月", "difficulty": "medium", "category": "personal" },
  { "text": "I have two brothers", "translation": "我有两个兄弟", "difficulty": "medium", "category": "personal" },
  { "text": "I am tall and thin", "translation": "我又高又瘦", "difficulty": "medium", "category": "personal" },
  { "text": "I have brown hair", "translation": "我有棕色头发", "difficulty": "medium", "category": "personal" },
  { "text": "I wear glasses", "translation": "我戴眼镜", "difficulty": "medium", "category": "personal" },
  { "text": "This is my photo", "translation": "这是我的照片", "difficulty": "easy", "category": "personal" },
  { "text": "I live in a house", "translation": "我住在一所房子里", "difficulty": "medium", "category": "personal" },
  { "text": "I am the oldest child", "translation": "我是家里最大的孩子", "difficulty": "hard", "category": "personal" },
  { "text": "My phone number is 07700 900123", "translation": "我的电话号码是07700 900123", "difficulty": "hard", "category": "personal" },
  { "text": "I am good at maths", "translation": "我擅长数学", "difficulty": "hard", "category": "personal" },
  { "text": "My hobby is reading", "translation": "我的爱好是阅读", "difficulty": "hard", "category": "personal" },
  { "text": "I love my family", "translation": "我爱我的家人", "difficulty": "easy", "category": "personal" },
  { "text": "I am happy at school", "translation": "我在学校很快乐", "difficulty": "medium", "category": "personal" },
  { "text": "I want to be a doctor", "translation": "我想成为一名医生", "difficulty": "hard", "category": "personal" },
  { "text": "I like playing football", "translation": "我喜欢踢足球", "difficulty": "medium", "category": "personal" },
  { "text": "I don't like vegetables", "translation": "我不喜欢蔬菜", "difficulty": "medium", "category": "personal" },
  { "text": "I am wearing a red shirt", "translation": "我穿着一件红衬衫", "difficulty": "medium", "category": "personal" },
  { "text": "I have a pet dog", "translation": "我有一只宠物狗", "difficulty": "medium", "category": "personal" },
  { "text": "My favorite color is blue", "translation": "我最喜欢的颜色是蓝色", "difficulty": "medium", "category": "personal" },
  { "text": "I can ride a bike", "translation": "我会骑自行车", "difficulty": "medium", "category": "personal" },
  { "text": "I can't swim well", "translation": "我游泳游得不好", "difficulty": "medium", "category": "personal" },
  { "text": "I am going to visit my grandparents", "translation": "我将要去拜访我的祖父母", "difficulty": "hard", "category": "personal" },
  { "text": "I am learning to play the piano", "translation": "我正在学弹钢琴", "difficulty": "hard", "category": "personal" },
  { "text": "I have a big bedroom", "translation": "我有一间大卧室", "difficulty": "medium", "category": "personal" },
  { "text": "I get up at seven o'clock", "translation": "我在七点起床", "difficulty": "medium", "category": "personal" },
  { "text": "I go to bed at nine o'clock", "translation": "我在九点睡觉", "difficulty": "medium", "category": "personal" },
  { "text": "I brush my teeth twice a day", "translation": "我一天刷两次牙", "difficulty": "hard", "category": "personal" },
  { "text": "I walk to school every day", "translation": "我每天走路去学校", "difficulty": "hard", "category": "personal" },
  { "text": "I wear a school uniform", "translation": "我穿校服", "difficulty": "medium", "category": "personal" },
  { "text": "I am good at drawing", "translation": "我擅长画画", "difficulty": "medium", "category": "personal" },
  { "text": "I want to learn Spanish", "translation": "我想学西班牙语", "difficulty": "hard", "category": "personal" },
  { "text": "I am excited about my birthday party", "translation": "我对我的生日派对感到兴奋", "difficulty": "hard", "category": "personal" },
  { "text": "I feel tired after school", "translation": "放学后我感到疲倦", "difficulty": "hard", "category": "personal" },
  { "text": "I dream about flying", "translation": "我梦见飞翔", "difficulty": "hard", "category": "personal" },
  { "text": "I am the tallest in my class", "translation": "我是班上最高的", "difficulty": "hard", "category": "personal" },
  { "text": "My favorite season is summer", "translation": "我最喜欢的季节是夏天", "difficulty": "medium", "category": "personal" },
  { "text": "I am scared of spiders", "translation": "我害怕蜘蛛", "difficulty": "hard", "category": "personal" },
  { "text": "I am proud of my success", "translation": "我为我的成功感到自豪", "difficulty": "hard", "category": "personal" },
  { "text": "I am patient and kind", "translation": "我有耐心且善良", "difficulty": "hard", "category": "personal" },
  { "text": "I feel happy when I play", "translation": "我玩的时候很开心", "difficulty": "hard", "category": "personal" },
  { "text": "I was happy yesterday", "translation": "我昨天很开心", "difficulty": "medium", "category": "personal" },
  { "text": "I will be ten next year", "translation": "我明年就十岁了", "difficulty": "hard", "category": "personal" },
  { "text": "I am the fastest runner", "translation": "我是跑得最快的", "difficulty": "hard", "category": "personal" },
  { "text": "I am more careful than my brother", "translation": "我比我兄弟更小心", "difficulty": "hard", "category": "personal" },
  { "text": "I am as tall as my sister", "translation": "我和我姐姐一样高", "difficulty": "hard", "category": "personal" },
  { "text": "I am the most curious student", "translation": "我是最好奇的学生", "difficulty": "hard", "category": "personal" },
  { "text": "I am reading a comic book", "translation": "我正在看漫画书", "difficulty": "hard", "category": "personal" },

  // 家庭与朋友 (Family & Friends) - 50句
  { "text": "This is my family", "translation": "这是我的家庭", "difficulty": "easy", "category": "family" },
  { "text": "I have a big family", "translation": "我有一个大家庭", "difficulty": "easy", "category": "family" },
  { "text": "My father is a doctor", "translation": "我父亲是一名医生", "difficulty": "medium", "category": "family" },
  { "text": "My mother is a teacher", "translation": "我母亲是一名教师", "difficulty": "medium", "category": "family" },
  { "text": "I have two sisters", "translation": "我有两个姐妹", "difficulty": "medium", "category": "family" },
  { "text": "My grandfather is old", "translation": "我爷爷很老了", "difficulty": "medium", "category": "family" },
  { "text": "My grandmother tells stories", "translation": "我奶奶讲故事", "difficulty": "medium", "category": "family" },
  { "text": "My brother is taller than me", "translation": "我哥哥比我高", "difficulty": "hard", "category": "family" },
  { "text": "My sister has long hair", "translation": "我姐姐有长发", "difficulty": "medium", "category": "family" },
  { "text": "We live together", "translation": "我们住在一起", "difficulty": "medium", "category": "family" },
  { "text": "We have dinner together", "translation": "我们一起吃晚餐", "difficulty": "medium", "category": "family" },
  { "text": "I help my parents", "translation": "我帮助我的父母", "difficulty": "medium", "category": "family" },
  { "text": "My family goes camping", "translation": "我的家人去露营", "difficulty": "medium", "category": "family" },
  { "text": "I love my family very much", "translation": "我非常爱我的家人", "difficulty": "medium", "category": "family" },
  { "text": "My aunt visits us", "translation": "我的阿姨来看我们", "difficulty": "medium", "category": "family" },
  { "text": "My uncle works in London", "translation": "我的叔叔在伦敦工作", "difficulty": "medium", "category": "family" },
  { "text": "I have a cousin", "translation": "我有一个堂兄弟/堂姐妹", "difficulty": "easy", "category": "family" },
  { "text": "My cousin is my age", "translation": "我的堂兄弟/堂姐妹和我同龄", "difficulty": "medium", "category": "family" },
  { "text": "My grandfather is older than my father", "translation": "我爷爷比我父亲年纪大", "difficulty": "hard", "category": "family" },
  { "text": "My aunt is younger than my mother", "translation": "我的阿姨比我母亲年轻", "difficulty": "hard", "category": "family" },
  { "text": "I visit my relatives", "translation": "我拜访我的亲戚", "difficulty": "medium", "category": "family" },
  { "text": "My grandmother is kind", "translation": "我的奶奶很善良", "difficulty": "medium", "category": "family" },
  { "text": "My grandfather tells jokes", "translation": "我的爷爷讲笑话", "difficulty": "medium", "category": "family" },
  { "text": "My cousin and I play together", "translation": "我和我的堂兄弟/堂姐妹一起玩", "difficulty": "medium", "category": "family" },
  { "text": "My uncle works hard", "translation": "我的叔叔工作努力", "difficulty": "medium", "category": "family" },
  { "text": "I have many friends", "translation": "我有很多朋友", "difficulty": "medium", "category": "family" },
  { "text": "My best friend is Alice", "translation": "我最好的朋友是爱丽丝", "difficulty": "medium", "category": "family" },
  { "text": "We play together", "translation": "我们一起玩", "difficulty": "easy", "category": "family" },
  { "text": "My friend has a pet cat", "translation": "我的朋友有一只宠物猫", "difficulty": "medium", "category": "family" },
  { "text": "I share my toys with friends", "translation": "我和朋友们分享我的玩具", "difficulty": "hard", "category": "family" },
  { "text": "My friends like my jokes", "translation": "我的朋友们喜欢我的笑话", "difficulty": "hard", "category": "family" },
  { "text": "We are in the same class", "translation": "我们在同一个班", "difficulty": "medium", "category": "family" },
  { "text": "I invite my friends to my party", "translation": "我邀请我的朋友参加我的派对", "difficulty": "hard", "category": "family" },
  { "text": "My friends help me with homework", "translation": "我的朋友们帮助我做作业", "difficulty": "hard", "category": "family" },
  { "text": "I miss my friends", "translation": "我想念我的朋友们", "difficulty": "medium", "category": "family" },
  { "text": "We are good friends", "translation": "我们是好朋友", "difficulty": "medium", "category": "family" },
  { "text": "My friend is more creative than me", "translation": "我的朋友比我更有创造力", "difficulty": "hard", "category": "family" },
  { "text": "I am as friendly as my friend", "translation": "我和我的朋友一样友善", "difficulty": "hard", "category": "family" },
  { "text": "My friend is the most loyal", "translation": "我的朋友是最忠诚的", "difficulty": "hard", "category": "family" },
  { "text": "My family is going on holiday", "translation": "我的家人要去度假", "difficulty": "hard", "category": "family" },
  { "text": "We are having fun together", "translation": "我们在一起很开心", "difficulty": "medium", "category": "family" },
  { "text": "My brother is going to be a pilot", "translation": "我的哥哥要成为一名飞行员", "difficulty": "hard", "category": "family" },
  { "text": "My dad is reading a newspaper", "translation": "我爸爸正在看报纸", "difficulty": "medium", "category": "family" },
  { "text": "My mom is cooking dinner", "translation": "我妈妈正在做晚餐", "difficulty": "medium", "category": "family" },
  { "text": "My sister is listening to music", "translation": "我姐姐正在听音乐", "difficulty": "medium", "category": "family" },
  { "text": "My father was a teacher", "translation": "我的父亲以前是一名教师", "difficulty": "hard", "category": "family" },
  { "text": "My mother will go shopping", "translation": "我母亲将要去购物", "difficulty": "hard", "category": "family" },
  { "text": "We were playing in the garden", "translation": "我们刚才在花园里玩", "difficulty": "hard", "category": "family" },
  { "text": "They will visit us next week", "translation": "他们下周会来看我们", "difficulty": "hard", "category": "family" },
  { "text": "I am the youngest in my family", "translation": "我是家里最小的", "difficulty": "medium", "category": "family" },

  // 学校生活 (School Life) - 50句
  { "text": "I go to school", "translation": "我去上学", "difficulty": "easy", "category": "school" },
  { "text": "I like my school", "translation": "我喜欢我的学校", "difficulty": "easy", "category": "school" },
  { "text": "My school is big", "translation": "我的学校很大", "difficulty": "easy", "category": "school" },
  { "text": "I have many friends at school", "translation": "我在学校有很多朋友", "difficulty": "medium", "category": "school" },
  { "text": "I study English", "translation": "我学英语", "difficulty": "medium", "category": "school" },
  { "text": "My teacher is kind", "translation": "我的老师很友善", "difficulty": "medium", "category": "school" },
  { "text": "I read books", "translation": "我看书", "difficulty": "easy", "category": "school" },
  { "text": "I write with a pencil", "translation": "我用铅笔写", "difficulty": "medium", "category": "school" },
  { "text": "I listen to my teacher", "translation": "我听老师讲课", "difficulty": "medium", "category": "school" },
  { "text": "I raise my hand", "translation": "我举手", "difficulty": "medium", "category": "school" },
  { "text": "I do my homework", "translation": "我做作业", "difficulty": "medium", "category": "school" },
  { "text": "I play in the playground", "translation": "我在操场上玩", "difficulty": "medium", "category": "school" },
  { "text": "I learn new words", "translation": "我学新单词", "difficulty": "medium", "category": "school" },
  { "text": "I like maths class", "translation": "我喜欢数学课", "difficulty": "medium", "category": "school" },
  { "text": "Science class is fun", "translation": "科学课很有趣", "difficulty": "medium", "category": "school" },
  { "text": "Art class is creative", "translation": "美术课很有创意", "difficulty": "hard", "category": "school" },
  { "text": "I have PE class", "translation": "我有体育课", "difficulty": "medium", "category": "school" },
  { "text": "We sing songs in music class", "translation": "我们在音乐课上唱歌", "difficulty": "medium", "category": "school" },
  { "text": "I use a ruler", "translation": "我使用尺子", "difficulty": "medium", "category": "school" },
  { "text": "I draw pictures", "translation": "我画画", "difficulty": "medium", "category": "school" },
  { "text": "I borrow books from library", "translation": "我从图书馆借书", "difficulty": "hard", "category": "school" },
  { "text": "The library is quiet", "translation": "图书馆很安静", "difficulty": "medium", "category": "school" },
  { "text": "I sit at my desk", "translation": "我坐在我的课桌旁", "difficulty": "medium", "category": "school" },
  { "text": "We work in groups", "translation": "我们分组工作", "difficulty": "medium", "category": "school" },
  { "text": "I study for tests", "translation": "我为考试学习", "difficulty": "medium", "category": "school" },
  { "text": "I pass the exam", "translation": "我通过了考试", "difficulty": "hard", "category": "school" },
  { "text": "I am good at English", "translation": "我擅长英语", "difficulty": "medium", "category": "school" },
  { "text": "I am better at maths than science", "translation": "我数学比科学好", "difficulty": "hard", "category": "school" },
  { "text": "My school starts at nine", "translation": "我的学校九点开始上课", "difficulty": "medium", "category": "school" },
  { "text": "School ends at three", "translation": "学校三点放学", "difficulty": "medium", "category": "school" },
  { "text": "I eat lunch at school", "translation": "我在学校吃午餐", "difficulty": "medium", "category": "school" },
  { "text": "There are thirty students in my class", "translation": "我们班有三十个学生", "difficulty": "hard", "category": "school" },
  { "text": "My classroom has blue walls", "translation": "我的教室有蓝色的墙", "difficulty": "medium", "category": "school" },
  { "text": "I have a school bag", "translation": "我有一个书包", "difficulty": "medium", "category": "school" },
  { "text": "I wear a school uniform", "translation": "我穿校服", "difficulty": "medium", "category": "school" },
  { "text": "I take notes in class", "translation": "我在课堂上记笔记", "difficulty": "hard", "category": "school" },
  { "text": "I answer the questions", "translation": "我回答问题", "difficulty": "medium", "category": "school" },
  { "text": "I clean the blackboard", "translation": "我擦黑板", "difficulty": "hard", "category": "school" },
  { "text": "We do homework together", "translation": "我们一起做作业", "difficulty": "medium", "category": "school" },
  { "text": "I ask the teacher for help", "translation": "我向老师寻求帮助", "difficulty": "hard", "category": "school" },
  { "text": "I am the class monitor", "translation": "我是班长", "difficulty": "hard", "category": "school" },
  { "text": "I will go to high school next year", "translation": "我明年将上高中", "difficulty": "hard", "category": "school" },
  { "text": "I was late for school yesterday", "translation": "我昨天上学迟到了", "difficulty": "hard", "category": "school" },
  { "text": "I am participating in the debate", "translation": "我正在参加辩论", "difficulty": "hard", "category": "school" },
  { "text": "We are preparing for the exam", "translation": "我们正在准备考试", "difficulty": "hard", "category": "school" },
  { "text": "The teacher is explaining the lesson", "translation": "老师正在讲解课程", "difficulty": "medium", "category": "school" },
  { "text": "Students are listening carefully", "translation": "学生们在认真听讲", "difficulty": "medium", "category": "school" },
  { "text": "The bell rings at the end of class", "translation": "下课铃响了", "difficulty": "medium", "category": "school" },
  { "text": "I am learning about ancient history", "translation": "我正在学习古代历史", "difficulty": "hard", "category": "school" },
  { "text": "Mathematics challenges me", "translation": "数学对我来说是个挑战", "difficulty": "hard", "category": "school" },
  { "text": "I am the smartest student", "translation": "我是最聪明的学生", "difficulty": "hard", "category": "school" },

  // 食物与饮料 (Food & Drink) - 40句
  { "text": "I like apples", "translation": "我喜欢苹果", "difficulty": "easy", "category": "food" },
  { "text": "I drink water", "translation": "我喝水", "difficulty": "easy", "category": "food" },
  { "text": "We eat lunch", "translation": "我们吃午餐", "difficulty": "easy", "category": "food" },
  { "text": "Mom cooks dinner", "translation": "妈妈做晚餐", "difficulty": "easy", "category": "food" },
  { "text": "I want cookies", "translation": "我想要饼干", "difficulty": "easy", "category": "food" },
  { "text": "Dad buys bread", "translation": "爸爸买面包", "difficulty": "easy", "category": "food" },
  { "text": "We have breakfast", "translation": "我们吃早餐", "difficulty": "easy", "category": "food" },
  { "text": "He likes pizza", "translation": "他喜欢披萨", "difficulty": "easy", "category": "food" },
  { "text": "She drinks milk", "translation": "她喝牛奶", "difficulty": "easy", "category": "food" },
  { "text": "I eat bananas", "translation": "我吃香蕉", "difficulty": "easy", "category": "food" },
  { "text": "We cook rice", "translation": "我们煮米饭", "difficulty": "easy", "category": "food" },
  { "text": "They buy fruit", "translation": "他们买水果", "difficulty": "easy", "category": "food" },
  { "text": "I love ice cream", "translation": "我爱冰淇淋", "difficulty": "easy", "category": "food" },
  { "text": "She makes soup", "translation": "她做汤", "difficulty": "easy", "category": "food" },
  { "text": "We drink juice", "translation": "我们喝果汁", "difficulty": "easy", "category": "food" },
  { "text": "I eat oranges", "translation": "我吃橙子", "difficulty": "easy", "category": "food" },
  { "text": "He likes sandwiches", "translation": "他喜欢三明治", "difficulty": "easy", "category": "food" },
  { "text": "She bakes cakes", "translation": "她烤蛋糕", "difficulty": "easy", "category": "food" },
  { "text": "I drink tea", "translation": "我喝茶", "difficulty": "easy", "category": "food" },
  { "text": "We eat vegetables", "translation": "我们吃蔬菜", "difficulty": "easy", "category": "food" },
  { "text": "He eats meat", "translation": "他吃肉", "difficulty": "easy", "category": "food" },
  { "text": "She drinks coffee", "translation": "她喝咖啡", "difficulty": "easy", "category": "food" },
  { "text": "I like chocolate", "translation": "我喜欢巧克力", "difficulty": "easy", "category": "food" },
  { "text": "We have soup", "translation": "我们喝汤", "difficulty": "easy", "category": "food" },
  { "text": "He cooks pasta", "translation": "他做意大利面", "difficulty": "easy", "category": "food" },
  { "text": "I prefer apples to oranges", "translation": "我更喜欢苹果而不是橙子", "difficulty": "hard", "category": "food" },
  { "text": "This pizza is tastier than that one", "translation": "这个披萨比那个更美味", "difficulty": "hard", "category": "food" },
  { "text": "We are having dinner now", "translation": "我们现在正在吃晚餐", "difficulty": "medium", "category": "food" },
  { "text": "She was eating breakfast when I called", "translation": "我打电话时她正在吃早餐", "difficulty": "hard", "category": "food" },
  { "text": "I will cook for you tomorrow", "translation": "我明天为你做饭", "difficulty": "hard", "category": "food" },
  { "text": "He is the best cook in the family", "translation": "他是家里最好的厨师", "difficulty": "hard", "category": "food" },
  { "text": "The cake is as sweet as the cookies", "translation": "蛋糕和饼干一样甜", "difficulty": "hard", "category": "food" },
  { "text": "I am eating my lunch", "translation": "我正在吃午餐", "difficulty": "medium", "category": "food" },
  { "text": "We should eat more vegetables", "translation": "我们应该多吃蔬菜", "difficulty": "hard", "category": "food" },
  { "text": "They have been eating for an hour", "translation": "他们已经吃了一个小时", "difficulty": "hard", "category": "food" },
  { "text": "If I am hungry, I eat something", "translation": "如果我饿了，我会吃点东西", "difficulty": "hard", "category": "food" },
  { "text": "I would like some more rice", "translation": "我想要再要一些米饭", "difficulty": "hard", "category": "food" },
  { "text": "My favorite food is pasta", "translation": "我最喜欢的食物是意大利面", "difficulty": "medium", "category": "food" },
  { "text": "Can I have some water, please?", "translation": "请问我可以喝点水吗？", "difficulty": "medium", "category": "food" },
  { "text": "I am not hungry now", "translation": "我现在不饿", "difficulty": "medium", "category": "food" },
  
  // 动物 (Animals) - 40句
  { "text": "Dogs bark loudly", "translation": "狗大声叫", "difficulty": "easy", "category": "animal" },
  { "text": "Cats purr softly", "translation": "猫轻柔地呼噜", "difficulty": "easy", "category": "animal" },
  { "text": "Birds fly in the sky", "translation": "鸟儿在天空中飞翔", "difficulty": "easy", "category": "animal" },
  { "text": "Fish swim in water", "translation": "鱼儿在水中游泳", "difficulty": "easy", "category": "animal" },
  { "text": "Rabbits hop quickly", "translation": "兔子快速跳跃", "difficulty": "easy", "category": "animal" },
  { "text": "Elephants are big", "translation": "大象很大", "difficulty": "easy", "category": "animal" },
  { "text": "Monkeys like bananas", "translation": "猴子喜欢香蕉", "difficulty": "easy", "category": "animal" },
  { "text": "Lions are strong", "translation": "狮子很强壮", "difficulty": "easy", "category": "animal" },
  { "text": "Tigers have stripes", "translation": "老虎有条纹", "difficulty": "easy", "category": "animal" },
  { "text": "Horses run fast", "translation": "马跑得快", "difficulty": "easy", "category": "animal" },
  { "text": "Dolphins play in the sea", "translation": "海豚在海里玩", "difficulty": "medium", "category": "animal" },
  { "text": "Bears hibernate in winter", "translation": "熊在冬天冬眠", "difficulty": "hard", "category": "animal" },
  { "text": "Butterflies are colorful", "translation": "蝴蝶五彩斑斓", "difficulty": "easy", "category": "animal" },
  { "text": "Bees make honey", "translation": "蜜蜂酿蜜", "difficulty": "easy", "category": "animal" },
  { "text": "Wolves live in packs", "translation": "狼成群生活", "difficulty": "medium", "category": "animal" },
  { "text": "Snakes can be long", "translation": "蛇可以很长", "difficulty": "easy", "category": "animal" },
  { "text": "Frogs jump and swim", "translation": "青蛙会跳和游泳", "difficulty": "easy", "category": "animal" },
  { "text": "Spiders make webs", "translation": "蜘蛛织网", "difficulty": "medium", "category": "animal" },
  { "text": "Kangaroos can jump high", "translation": "袋鼠能跳得很高", "difficulty": "easy", "category": "animal" },
  { "text": "Penguins live in cold places", "translation": "企鹅生活在寒冷的地方", "difficulty": "medium", "category": "animal" },
  { "text": "Owls are wise", "translation": "猫头鹰很聪明", "difficulty": "medium", "category": "animal" },
  { "text": "Bats fly at night", "translation": "蝙蝠在夜间飞行", "difficulty": "medium", "category": "animal" },
  { "text": "Giraffes have long necks", "translation": "长颈鹿有长脖子", "difficulty": "easy", "category": "animal" },
  { "text": "Zebras have black and white stripes", "translation": "斑马有黑白条纹", "difficulty": "medium", "category": "animal" },
  { "text": "Deer live in forests", "translation": "鹿生活在森林里", "difficulty": "medium", "category": "animal" },
  { "text": "The dog is chasing the cat", "translation": "狗在追猫", "difficulty": "medium", "category": "animal" },
  { "text": "This elephant is bigger than that one", "translation": "这头大象比那头大", "difficulty": "hard", "category": "animal" },
  { "text": "I am watching a documentary about animals", "translation": "我正在看一部关于动物的纪录片", "difficulty": "hard", "category": "animal" },
  { "text": "If I were a bird, I would fly everywhere", "translation": "如果我是一只鸟，我会飞遍各处", "difficulty": "hard", "category": "animal" },
  { "text": "We used to have a pet rabbit", "translation": "我们以前有一只宠物兔", "difficulty": "hard", "category": "animal" },
  { "text": "The lion was sleeping under the tree", "translation": "狮子在树下睡觉", "difficulty": "medium", "category": "animal" },
  { "text": "Whales are the largest animals in the ocean", "translation": "鲸鱼是海洋中最大的动物", "difficulty": "hard", "category": "animal" },
  { "text": "I will visit the zoo tomorrow", "translation": "我明天将去动物园", "difficulty": "hard", "category": "animal" },
  { "text": "She has been taking care of the injured bird", "translation": "她一直在照顾那只受伤的鸟", "difficulty": "hard", "category": "animal" },
  { "text": "The birds are singing beautiful songs", "translation": "鸟儿在唱美丽的歌", "difficulty": "medium", "category": "animal" },
  { "text": "Cheetahs are the fastest land animals", "translation": "猎豹是最快的陆地动物", "difficulty": "hard", "category": "animal" },
  { "text": "Snakes don't have legs", "translation": "蛇没有腿", "difficulty": "medium", "category": "animal" },
  { "text": "Polar bears live in the Arctic", "translation": "北极熊生活在北极", "difficulty": "medium", "category": "animal" },
  { "text": "I like animals more than toys", "translation": "我比起玩具更喜欢动物", "difficulty": "hard", "category": "animal" },
  { "text": "The monkey is the most playful animal", "translation": "猴子是最爱玩的动物", "difficulty": "hard", "category": "animal" },

  // 天气 (Weather) - 30句
  { "text": "It is sunny", "translation": "今天是晴天", "difficulty": "easy", "category": "weather" },
  { "text": "It rains today", "translation": "今天下雨", "difficulty": "easy", "category": "weather" },
  { "text": "Snow falls down", "translation": "雪往下落", "difficulty": "easy", "category": "weather" },
  { "text": "The wind blows", "translation": "风吹", "difficulty": "easy", "category": "weather" },
  { "text": "It is cold outside", "translation": "外面很冷", "difficulty": "easy", "category": "weather" },
  { "text": "I wear a jacket", "translation": "我穿一件夹克", "difficulty": "easy", "category": "weather" },
  { "text": "The sun shines bright", "translation": "阳光明亮", "difficulty": "easy", "category": "weather" },
  { "text": "It is warm today", "translation": "今天很暖和", "difficulty": "easy", "category": "weather" },
  { "text": "I see a rainbow", "translation": "我看到彩虹", "difficulty": "easy", "category": "weather" },
  { "text": "The clouds are gray", "translation": "云是灰色的", "difficulty": "easy", "category": "weather" },
  { "text": "It is stormy", "translation": "天气暴风雨", "difficulty": "medium", "category": "weather" },
  { "text": "A typhoon is coming", "translation": "台风要来了", "difficulty": "hard", "category": "weather" },
  { "text": "The weather is nice", "translation": "天气很好", "difficulty": "medium", "category": "weather" },
  { "text": "It is foggy", "translation": "起雾了", "difficulty": "medium", "category": "weather" },
  { "text": "The temperature is cold", "translation": "温度很低", "difficulty": "medium", "category": "weather" },
  { "text": "It is hot in summer", "translation": "夏天很热", "difficulty": "medium", "category": "weather" },
  { "text": "It is cool in fall", "translation": "秋天很凉爽", "difficulty": "medium", "category": "weather" },
  { "text": "Spring is warm", "translation": "春天很温暖", "difficulty": "medium", "category": "weather" },
  { "text": "Winter is the coldest season", "translation": "冬天是最冷的季节", "difficulty": "hard", "category": "weather" },
  { "text": "The weather changes", "translation": "天气在变化", "difficulty": "medium", "category": "weather" },
  { "text": "Rain is good for plants", "translation": "雨水对植物有益", "difficulty": "medium", "category": "weather" },
  { "text": "Sunshine makes me happy", "translation": "阳光让我快乐", "difficulty": "medium", "category": "weather" },
  { "text": "Strong wind can break branches", "translation": "强风能折断树枝", "difficulty": "hard", "category": "weather" },
  { "text": "Weather affects our mood", "translation": "天气影响我们的情绪", "difficulty": "hard", "category": "weather" },
  { "text": "I like sunny days more than rainy days", "translation": "我更喜欢晴天而不是雨天", "difficulty": "hard", "category": "weather" },
  { "text": "It will be sunny tomorrow", "translation": "明天会是晴天", "difficulty": "medium", "category": "weather" },
  { "text": "Yesterday was colder than today", "translation": "昨天比今天冷", "difficulty": "medium", "category": "weather" },
  { "text": "We are having a snow day", "translation": "我们有一个下雪天", "difficulty": "medium", "category": "weather" },
  { "text": "The weather forecast says it will rain", "translation": "天气预报说会下雨", "difficulty": "hard", "category": "weather" },
  { "text": "I hope the weather will be nice for the picnic", "translation": "我希望野餐那天天气会很好", "difficulty": "hard", "category": "weather" },

  // 时间 (Time) - 40句
  { "text": "Today is Monday", "translation": "今天是星期一", "difficulty": "easy", "category": "time" },
  { "text": "I go to school on Monday", "translation": "我星期一去上学", "difficulty": "medium", "category": "time" },
  { "text": "Tuesday comes after Monday", "translation": "星期二在星期一之后", "difficulty": "medium", "category": "time" },
  { "text": "Wednesday is the middle of the week", "translation": "星期三是周中", "difficulty": "hard", "category": "time" },
  { "text": "Thursday is before Friday", "translation": "星期四在星期五之前", "difficulty": "medium", "category": "time" },
  { "text": "Friday is the last school day", "translation": "星期五是最后一个上学日", "difficulty": "medium", "category": "time" },
  { "text": "Saturday is fun", "translation": "星期六很有趣", "difficulty": "easy", "category": "time" },
  { "text": "Sunday is relaxing", "translation": "星期日很放松", "difficulty": "easy", "category": "time" },
  { "text": "I sleep late on Saturday", "translation": "我星期六睡懒觉", "difficulty": "medium", "category": "time" },
  { "text": "Sunday is family day", "translation": "星期日是家庭日", "difficulty": "medium", "category": "time" },
  { "text": "Monday is the start of the week", "translation": "星期一是周的开始", "difficulty": "medium", "category": "time" },
  { "text": "The weekend is Saturday and Sunday", "translation": "周末是星期六和星期日", "difficulty": "hard", "category": "time" },
  { "text": "I have music class on Tuesday", "translation": "我星期二有音乐课", "difficulty": "medium", "category": "time" },
  { "text": "I watch movies on Friday", "translation": "我星期五看电影", "difficulty": "medium", "category": "time" },
  { "text": "Wednesday is hump day", "translation": "星期三是周中", "difficulty": "hard", "category": "time" },
  { "text": "I do homework on Thursday", "translation": "我星期四做作业", "difficulty": "medium", "category": "time" },
  { "text": "I play games on weekends", "translation": "我周末玩游戏", "difficulty": "medium", "category": "time" },
  { "text": "Mondays are busy", "translation": "星期一很忙", "difficulty": "medium", "category": "time" },
  { "text": "Weekends are free", "translation": "周末有空", "difficulty": "medium", "category": "time" },
  { "text": "I go shopping on Sunday", "translation": "我星期日去购物", "difficulty": "medium", "category": "time" },
  { "text": "Tuesday and Thursday I have piano", "translation": "星期二和星期四我有钢琴课", "difficulty": "hard", "category": "time" },
  { "text": "Friday night is movie night", "translation": "星期五晚上是电影夜", "difficulty": "medium", "category": "time" },
  { "text": "Saturday morning is for sports", "translation": "星期六上午是运动时间", "difficulty": "medium", "category": "time" },
  { "text": "Sunday we go to the park", "translation": "星期日我们去公园", "difficulty": "medium", "category": "time" },
  { "text": "Each week has seven days", "translation": "每周有七天", "difficulty": "hard", "category": "time" },
  { "text": "January is the first month", "translation": "一月是第一个月", "difficulty": "medium", "category": "time" },
  { "text": "February has 28 days", "translation": "二月有28天", "difficulty": "medium", "category": "time" },
  { "text": "March comes after February", "translation": "三月在二月之后", "difficulty": "medium", "category": "time" },
  { "text": "April showers bring May flowers", "translation": "四月春雨带来五月花开", "difficulty": "hard", "category": "time" },
  { "text": "May is a warm month", "translation": "五月是一个温暖的月份", "difficulty": "medium", "category": "time" },
  { "text": "June has summer vacation", "translation": "六月有暑假", "difficulty": "medium", "category": "time" },
  { "text": "July is very hot", "translation": "七月很热", "difficulty": "medium", "category": "time" },
  { "text": "August is the last summer month", "translation": "八月是最后一个夏天的月份", "difficulty": "hard", "category": "time" },
  { "text": "September starts school", "translation": "九月开始上学", "difficulty": "medium", "category": "time" },
  { "text": "October has Halloween", "translation": "十月份有万圣节", "difficulty": "medium", "category": "time" },
  { "text": "November is for Thanksgiving", "translation": "十一月是感恩节", "difficulty": "hard", "category": "time" },
  { "text": "December ends the year", "translation": "十二月是一年的结束", "difficulty": "medium", "category": "time" },
  { "text": "My birthday is in May", "translation": "我的生日在五月", "difficulty": "medium", "category": "time" },
  { "text": "Christmas is in December", "translation": "圣诞节在十二月", "difficulty": "medium", "category": "time" },
  { "text": "New Year is in January", "translation": "新年在一月", "difficulty": "medium", "category": "time" },

  // 地点与方向 (Places & Directions) - 30句
  { "text": "I live in a house", "translation": "我住在一所房子里", "difficulty": "medium", "category": "places" },
  { "text": "The park is fun", "translation": "公园很有趣", "difficulty": "medium", "category": "places" },
  { "text": "The school is big", "translation": "学校很大", "difficulty": "medium", "category": "places" },
  { "text": "The library is quiet", "translation": "图书馆很安静", "difficulty": "medium", "category": "places" },
  { "text": "The hospital helps people", "translation": "医院帮助人们", "difficulty": "hard", "category": "places" },
  { "text": "The shop sells toys", "translation": "商店卖玩具", "difficulty": "medium", "category": "places" },
  { "text": "The cinema shows movies", "translation": "电影院放映电影", "difficulty": "hard", "category": "places" },
  { "text": "The restaurant serves food", "translation": "餐厅提供食物", "difficulty": "hard", "category": "places" },
  { "text": "The museum has art", "translation": "博物馆有艺术品", "difficulty": "hard", "category": "places" },
  { "text": "The zoo has animals", "translation": "动物园有动物", "difficulty": "medium", "category": "places" },
  { "text": "The bank keeps money", "translation": "银行存钱", "difficulty": "hard", "category": "places" },
  { "text": "The post office sends letters", "translation": "邮局寄信", "difficulty": "hard", "category": "places" },
  { "text": "The police station helps people", "translation": "警察局帮助人们", "difficulty": "hard", "category": "places" },
  { "text": "The theatre has plays", "translation": "剧院有戏剧", "difficulty": "hard", "category": "places" },
  { "text": "The church is a place of worship", "translation": "教堂是礼拜的地方", "difficulty": "hard", "category": "places" },
  { "text": "The hotel has rooms", "translation": "酒店有房间", "difficulty": "medium", "category": "places" },
  { "text": "The station has trains", "translation": "车站有火车", "difficulty": "medium", "category": "places" },
  { "text": "The airport has planes", "translation": "机场有飞机", "difficulty": "medium", "category": "places" },
  { "text": "The beach has sand", "translation": "海滩有沙子", "difficulty": "medium", "category": "places" },
  { "text": "The mountain is high", "translation": "山很高", "difficulty": "medium", "category": "places" },
  { "text": "The river flows", "translation": "河流流动", "difficulty": "medium", "category": "places" },
  { "text": "The forest has trees", "translation": "森林有树木", "difficulty": "medium", "category": "places" },
  { "text": "The shop is next to the bank", "translation": "商店在银行旁边", "difficulty": "hard", "category": "places" },
  { "text": "The school is behind the library", "translation": "学校在图书馆后面", "difficulty": "hard", "category": "places" },
  { "text": "The park is in front of my house", "translation": "公园在我家前面", "difficulty": "hard", "category": "places" },
  { "text": "The cinema is between the shop and the restaurant", "translation": "电影院在商店和餐厅之间", "difficulty": "hard", "category": "places" },
  { "text": "Turn left at the corner", "translation": "在拐角处左转", "difficulty": "hard", "category": "places" },
  { "text": "Go straight ahead", "translation": "直行", "difficulty": "hard", "category": "places" },
  { "text": "The cinema is on the right", "translation": "电影院在右边", "difficulty": "hard", "category": "places" },
  { "text": "The library is on the left", "translation": "图书馆在左边", "difficulty": "hard", "category": "places" },

  // 服装与颜色 (Clothes & Colors) - 20句
  { "text": "I wear a shirt", "translation": "我穿一件衬衫", "difficulty": "easy", "category": "clothes" },
  { "text": "She likes her dress", "translation": "她喜欢她的连衣裙", "difficulty": "easy", "category": "clothes" },
  { "text": "He wears jeans", "translation": "他穿牛仔裤", "difficulty": "easy", "category": "clothes" },
  { "text": "I put on my hat", "translation": "我戴上帽子", "difficulty": "easy", "category": "clothes" },
  { "text": "She has a red jacket", "translation": "她有一件红色夹克", "difficulty": "medium", "category": "clothes" },
  { "text": "He wears blue shoes", "translation": "他穿蓝色鞋子", "difficulty": "medium", "category": "clothes" },
  { "text": "I need new socks", "translation": "我需要新袜子", "difficulty": "medium", "category": "clothes" },
  { "text": "She bought a skirt", "translation": "她买了一条裙子", "difficulty": "medium", "category": "clothes" },
  { "text": "T-shirts are casual", "translation": "T恤很休闲", "difficulty": "medium", "category": "clothes" },
  { "text": "Winter coats are warm", "translation": "冬大衣很暖和", "difficulty": "medium", "category": "clothes" },
  { "text": "I wear sneakers to run", "translation": "我穿运动鞋跑步", "difficulty": "medium", "category": "clothes" },
  { "text": "She loves her blue jeans", "translation": "她爱她的蓝色牛仔裤", "difficulty": "medium", "category": "clothes" },
  { "text": "The sweater is soft", "translation": "毛衣很软", "difficulty": "medium", "category": "clothes" },
  { "text": "I take off my shoes", "translation": "我脱掉鞋子", "difficulty": "medium", "category": "clothes" },
  { "text": "She has long pants", "translation": "她有长裤", "difficulty": "medium", "category": "clothes" },
  { "text": "The sky is blue", "translation": "天空是蓝色的", "difficulty": "easy", "category": "color" },
  { "text": "Grass is green", "translation": "草是绿色的", "difficulty": "easy", "category": "color" },
  { "text": "Fire is red", "translation": "火是红色的", "difficulty": "easy", "category": "color" },
  { "text": "Snow is white", "translation": "雪是白色的", "difficulty": "easy", "category": "color" },
  { "text": "The sun is yellow", "translation": "太阳是黄色的", "difficulty": "easy", "category": "color" },

  // 时态练习 (Tenses) - 80句
  { "text": "I go to school every day", "translation": "我每天去上学", "difficulty": "easy", "category": "tenses" },
  { "text": "She reads books in the evening", "translation": "她晚上读书", "difficulty": "medium", "category": "tenses" },
  { "text": "They play football on weekends", "translation": "他们周末踢足球", "difficulty": "medium", "category": "tenses" },
  { "text": "He likes ice cream", "translation": "他喜欢冰淇淋", "difficulty": "easy", "category": "tenses" },
  { "text": "We eat lunch at school", "translation": "我们在学校吃午餐", "difficulty": "medium", "category": "tenses" },
  { "text": "I am reading a book now", "translation": "我现在正在读书", "difficulty": "medium", "category": "tenses" },
  { "text": "She is watching TV", "translation": "她正在看电视", "difficulty": "medium", "category": "tenses" },
  { "text": "They are playing outside", "translation": "他们正在外面玩", "difficulty": "medium", "category": "tenses" },
  { "text": "He is listening to music", "translation": "他正在听音乐", "difficulty": "medium", "category": "tenses" },
  { "text": "We are having dinner", "translation": "我们正在吃晚餐", "difficulty": "medium", "category": "tenses" },
  { "text": "I went to the park yesterday", "translation": "我昨天去了公园", "difficulty": "medium", "category": "tenses" },
  { "text": "She visited her grandmother last week", "translation": "她上周拜访了她的奶奶", "difficulty": "hard", "category": "tenses" },
  { "text": "They watched a movie yesterday", "translation": "他们昨天看了电影", "difficulty": "medium", "category": "tenses" },
  { "text": "He played football last Saturday", "translation": "他上周六踢了足球", "difficulty": "medium", "category": "tenses" },
  { "text": "We cleaned our room yesterday", "translation": "我们昨天打扫了房间", "difficulty": "medium", "category": "tenses" },
  { "text": "I will go to the party tomorrow", "translation": "我明天将去参加派对", "difficulty": "medium", "category": "tenses" },
  { "text": "She will visit her friends next week", "translation": "她下周将拜访她的朋友", "difficulty": "hard", "category": "tenses" },
  { "text": "They will travel to London next month", "translation": "他们下个月将去伦敦旅行", "difficulty": "hard", "category": "tenses" },
  { "text": "He will start a new job soon", "translation": "他很快将开始一份新工作", "difficulty": "hard", "category": "tenses" },
  { "text": "We will have a picnic on Sunday", "translation": "我们将在星期日野餐", "difficulty": "medium", "category": "tenses" },
  { "text": "I am going to study abroad next year", "translation": "我明年将去国外学习", "difficulty": "hard", "category": "tenses" },
  { "text": "She is going to visit her friend", "translation": "她将去拜访她的朋友", "difficulty": "hard", "category": "tenses" },
  { "text": "He was reading when I called", "translation": "我打电话时他正在读书", "difficulty": "hard", "category": "tenses" },
  { "text": "They were playing when it started to rain", "translation": "开始下雨时他们正在玩", "difficulty": "hard", "category": "tenses" },
  { "text": "I had finished my homework before dinner", "translation": "我在晚餐前完成了家庭作业", "difficulty": "hard", "category": "tenses" },
  { "text": "She had left before I arrived", "translation": "在我到达之前她已经离开了", "difficulty": "hard", "category": "tenses" },
  { "text": "We will have completed the project by Friday", "translation": "我们将在周五前完成项目", "difficulty": "hard", "category": "tenses" },
  { "text": "I have lived here for five years", "translation": "我在这里住了五年", "difficulty": "hard", "category": "tenses" },
  { "text": "She has been studying English for two years", "translation": "她学英语已经两年了", "difficulty": "hard", "category": "tenses" },
  { "text": "They have already eaten", "translation": "他们已经吃过了", "difficulty": "hard", "category": "tenses" },
  { "text": "I have never traveled abroad", "translation": "我从未出国旅行过", "difficulty": "hard", "category": "tenses" },
  { "text": "He has just arrived", "translation": "他刚到", "difficulty": "hard", "category": "tenses" },
  { "text": "I used to play with toys", "translation": "我过去常常玩玩具", "difficulty": "hard", "category": "tenses" },
  { "text": "She used to live in the countryside", "translation": "她过去住在乡下", "difficulty": "hard", "category": "tenses" },
  { "text": "I am used to getting up early", "translation": "我习惯了早起", "difficulty": "hard", "category": "tenses" },
  { "text": "If I have time, I will help you", "translation": "如果我有时间，我会帮你", "difficulty": "hard", "category": "tenses" },
  { "text": "If I were rich, I would travel the world", "translation": "如果我有钱，我会环游世界", "difficulty": "hard", "category": "tenses" },
  { "text": "I would have called you if I had known", "translation": "如果我知道的话，我就会给你打电话", "difficulty": "hard", "category": "tenses" },
  { "text": "I am not going to the party", "translation": "我不打算去参加派对", "difficulty": "hard", "category": "tenses" },
  { "text": "She is always complaining", "translation": "她总是在抱怨", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been waiting for an hour", "translation": "我已经等了一个小时", "difficulty": "hard", "category": "tenses" },
  { "text": "He will be working when you arrive", "translation": "你到达时他将在工作", "difficulty": "hard", "category": "tenses" },
  { "text": "I was watching TV at 8 o'clock", "translation": "我八点正在看电视", "difficulty": "hard", "category": "tenses" },
  { "text": "I had been studying for hours when I took a break", "translation": "我学习了好几个小时才休息了一下", "difficulty": "hard", "category": "tenses" },
  { "text": "By next year, I will have finished school", "translation": "到明年，我将完成学业", "difficulty": "hard", "category": "tenses" },
  { "text": "I would like to visit Paris", "translation": "我想去巴黎", "difficulty": "hard", "category": "tenses" },
  { "text": "I have already finished my homework", "translation": "我已经完成了家庭作业", "difficulty": "hard", "category": "tenses" },
  { "text": "It was raining when I left home", "translation": "我离开家时正在下雨", "difficulty": "hard", "category": "tenses" },
  { "text": "I will call you when I arrive", "translation": "我到达时会给你打电话", "difficulty": "hard", "category": "tenses" },
  { "text": "She has just had breakfast", "translation": "她刚吃完早餐", "difficulty": "hard", "category": "tenses" },
  { "text": "I am reading an interesting book", "translation": "我正在读一本有趣的书", "difficulty": "hard", "category": "tenses" },
  { "text": "I have never seen such beautiful flowers", "translation": "我从未见过如此美丽的花朵", "difficulty": "hard", "category": "tenses" },
  { "text": "I had finished dinner before the movie started", "translation": "电影开始前我已经吃完晚饭了", "difficulty": "hard", "category": "tenses" },
  { "text": "I was sleeping when you called", "translation": "你打电话时我正在睡觉", "difficulty": "hard", "category": "tenses" },
  { "text": "We are going to travel next summer", "translation": "我们将在明年夏天旅行", "difficulty": "hard", "category": "tenses" },
  { "text": "She has been working here since 2010", "translation": "她从2010年开始就在这里工作", "difficulty": "hard", "category": "tenses" },
  { "text": "I will have completed this task by tomorrow", "translation": "我将在明天前完成这个任务", "difficulty": "hard", "category": "tenses" },
  { "text": "I am meeting my friend later", "translation": "我稍后要见我的朋友", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been learning English for three years", "translation": "我学英语已经三年了", "difficulty": "hard", "category": "tenses" },
  { "text": "I will be working late tonight", "translation": "我今晚将工作到很晚", "difficulty": "hard", "category": "tenses" },
  { "text": "I was going to call you, but I forgot", "translation": "我本来要给你打电话的，但我忘了", "difficulty": "hard", "category": "tenses" },
  { "text": "I have already seen that movie", "translation": "我已经看过那部电影了", "difficulty": "hard", "category": "tenses" },
  { "text": "She is going to start university next year", "translation": "她明年将上大学", "difficulty": "hard", "category": "tenses" },
  { "text": "I had never tried sushi before", "translation": "我以前从未吃过寿司", "difficulty": "hard", "category": "tenses" },
  { "text": "I am not feeling well today", "translation": "我今天感觉不舒服", "difficulty": "hard", "category": "tenses" },
  { "text": "I will have been living here for 10 years next month", "translation": "到下个月，我将在这里住了10年", "difficulty": "hard", "category": "tenses" },
  { "text": "I was going to the store when I met him", "translation": "我去商店时遇到了他", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been wanting to tell you something", "translation": "我一直想告诉你一些事情", "difficulty": "hard", "category": "tenses" },
  { "text": "I would have helped if I had known", "translation": "如果我知道的话，我就会帮忙", "difficulty": "hard", "category": "tenses" },
  { "text": "I had been looking for my keys all morning", "translation": "我整个早上都在找钥匙", "difficulty": "hard", "category": "tenses" },
  { "text": "I hope you will come to my party", "translation": "我希望你能来我的派对", "difficulty": "hard", "category": "tenses" },
  { "text": "I wish I could fly", "translation": "我希望我能飞", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been thinking about changing jobs", "translation": "我一直在考虑换工作", "difficulty": "hard", "category": "tenses" },
  { "text": "I will have been studying for 3 hours by the time you arrive", "translation": "你到达时，我将已经学习了3个小时", "difficulty": "hard", "category": "tenses" },
  { "text": "I used to be afraid of the dark", "translation": "我以前害怕黑暗", "difficulty": "hard", "category": "tenses" },
  { "text": "I have been to that restaurant many times", "translation": "我去过那家餐厅很多次", "difficulty": "hard", "category": "tenses" },

  // 句型转换 (Sentence Patterns) - 40句
  { "text": "I like ice cream", "translation": "我喜欢冰淇淋", "difficulty": "easy", "category": "patterns" },
  { "text": "Do you like ice cream?", "translation": "你喜欢冰淇淋吗？", "difficulty": "easy", "category": "patterns" },
  { "text": "I don't like vegetables", "translation": "我不喜欢蔬菜", "difficulty": "medium", "category": "patterns" },
  { "text": "Please close the door", "translation": "请关门", "difficulty": "medium", "category": "patterns" },
  { "text": "The cat is sleeping", "translation": "猫在睡觉", "difficulty": "easy", "category": "patterns" },
  { "text": "Is the cat sleeping?", "translation": "猫在睡觉吗？", "difficulty": "easy", "category": "patterns" },
  { "text": "The cat is not sleeping", "translation": "猫没有在睡觉", "difficulty": "medium", "category": "patterns" },
  { "text": "Don't be late!", "translation": "不要迟到！", "difficulty": "medium", "category": "patterns" },
  { "text": "She goes to school", "translation": "她去上学", "difficulty": "easy", "category": "patterns" },
  { "text": "Does she go to school?", "translation": "她去上学吗？", "difficulty": "medium", "category": "patterns" },
  { "text": "She does not go to school", "translation": "她不去上学", "difficulty": "hard", "category": "patterns" },
  { "text": "Don't run in the hallways", "translation": "不要在走廊里跑", "difficulty": "hard", "category": "patterns" },
  { "text": "They are playing games", "translation": "他们正在玩游戏", "difficulty": "medium", "category": "patterns" },
  { "text": "Are they playing games?", "translation": "他们正在玩游戏吗？", "difficulty": "medium", "category": "patterns" },
  { "text": "They are not playing games", "translation": "他们没有在玩游戏", "difficulty": "hard", "category": "patterns" },
  { "text": "Please be quiet", "translation": "请安静", "difficulty": "medium", "category": "patterns" },
  { "text": "He has finished his homework", "translation": "他已经完成了家庭作业", "difficulty": "medium", "category": "patterns" },
  { "text": "Has he finished his homework?", "translation": "他完成了家庭作业吗？", "difficulty": "hard", "category": "patterns" },
  { "text": "He has not finished his homework", "translation": "他没有完成家庭作业", "difficulty": "hard", "category": "patterns" },
  { "text": "Don't leave your things here", "translation": "不要把你的东西留在这里", "difficulty": "hard", "category": "patterns" },
  { "text": "We will visit the museum", "translation": "我们将参观博物馆", "difficulty": "medium", "category": "patterns" },
  { "text": "Will we visit the museum?", "translation": "我们将参观博物馆吗？", "difficulty": "medium", "category": "patterns" },
  { "text": "We will not visit the museum", "translation": "我们不会参观博物馆", "difficulty": "hard", "category": "patterns" },
  { "text": "Let's go to the park", "translation": "我们去公园吧", "difficulty": "medium", "category": "patterns" },
  { "text": "What is your name?", "translation": "你叫什么名字？", "difficulty": "easy", "category": "patterns" },
  { "text": "Where do you live?", "translation": "你住在哪里？", "difficulty": "medium", "category": "patterns" },
  { "text": "How old are you?", "translation": "你多大了？", "difficulty": "easy", "category": "patterns" },
  { "text": "Why are you crying?", "translation": "你为什么哭？", "difficulty": "medium", "category": "patterns" },
  { "text": "When is your birthday?", "translation": "你什么时候生日？", "difficulty": "medium", "category": "patterns" },
  { "text": "Who is your best friend?", "translation": "你最好的朋友是谁？", "difficulty": "medium", "category": "patterns" },
  { "text": "Which book do you like?", "translation": "你喜欢哪本书？", "difficulty": "hard", "category": "patterns" },
  { "text": "How many apples do you have?", "translation": "你有多少个苹果？", "difficulty": "medium", "category": "patterns" },
  { "text": "How much does this cost?", "translation": "这个多少钱？", "difficulty": "hard", "category": "patterns" },
  { "text": "What time is it?", "translation": "现在几点了？", "difficulty": "medium", "category": "patterns" },
  { "text": "How do you feel?", "translation": "你感觉怎么样？", "difficulty": "medium", "category": "patterns" },
  { "text": "How often do you brush your teeth?", "translation": "你多久刷一次牙？", "difficulty": "hard", "category": "patterns" },
  { "text": "How long have you lived here?", "translation": "你在这里住了多久了？", "difficulty": "hard", "category": "patterns" },
  { "text": "What are you doing?", "translation": "你在做什么？", "difficulty": "medium", "category": "patterns" },
  { "text": "Where are you going?", "translation": "你要去哪里？", "difficulty": "medium", "category": "patterns" },
  { "text": "Why did you come late?", "translation": "你为什么来晚了？", "difficulty": "hard", "category": "patterns" },

  // 形容词与副词 (Adjectives & Adverbs) - 30句
  { "text": "The cat is cute", "translation": "这只猫很可爱", "difficulty": "easy", "category": "adjectives" },
  { "text": "The dog is big", "translation": "这只狗很大", "difficulty": "easy", "category": "adjectives" },
  { "text": "She runs fast", "translation": "她跑得快", "difficulty": "easy", "category": "adverbs" },
  { "text": "He speaks loudly", "translation": "他大声说话", "difficulty": "medium", "category": "adverbs" },
  { "text": "The book is interesting", "translation": "这本书很有趣", "difficulty": "medium", "category": "adjectives" },
  { "text": "She sings beautifully", "translation": "她唱得很美", "difficulty": "hard", "category": "adverbs" },
  { "text": "This car is faster than that one", "translation": "这辆车比那辆车快", "difficulty": "hard", "category": "adjectives" },
  { "text": "He runs faster than me", "translation": "他跑得比我快", "difficulty": "hard", "category": "adverbs" },
  { "text": "This is the most interesting book", "translation": "这是最有趣的书", "difficulty": "hard", "category": "adjectives" },
  { "text": "She sings the most beautifully", "translation": "她唱得最美", "difficulty": "hard", "category": "adverbs" },
  { "text": "The red ball is bigger than the blue one", "translation": "红球比蓝球大", "difficulty": "hard", "category": "adjectives" },
  { "text": "She speaks more clearly than him", "translation": "她说话比他更清楚", "difficulty": "hard", "category": "adverbs" },
  { "text": "This is the biggest apple", "translation": "这是最大的苹果", "difficulty": "hard", "category": "adjectives" },
  { "text": "He works the most carefully", "translation": "他工作最认真", "difficulty": "hard", "category": "adverbs" },
  { "text": "The weather is getting warmer", "translation": "天气变得越来越暖和", "difficulty": "hard", "category": "adjectives" },
  { "text": "She is drawing more carefully now", "translation": "她现在画得更仔细了", "difficulty": "hard", "category": "adverbs" },
  { "text": "I am taller than my sister", "translation": "我比我姐姐高", "difficulty": "hard", "category": "adjectives" },
  { "text": "He is driving more slowly", "translation": "他开得更慢了", "difficulty": "hard", "category": "adverbs" },
  { "text": "This is as good as that", "translation": "这个和那个一样好", "difficulty": "hard", "category": "adjectives" },
  { "text": "She sings as beautifully as her mother", "translation": "她唱得和她母亲一样美", "difficulty": "hard", "category": "adverbs" },
  { "text": "The house is very beautiful", "translation": "这房子非常漂亮", "difficulty": "medium", "category": "adjectives" },
  { "text": "He works very hard", "translation": "他工作非常努力", "difficulty": "medium", "category": "adverbs" },
  { "text": "The movie was extremely interesting", "translation": "这部电影极其有趣", "difficulty": "hard", "category": "adjectives" },
  { "text": "She dances extremely well", "translation": "她跳得极好", "difficulty": "hard", "category": "adverbs" },
  { "text": "The test was quite difficult", "translation": "测试相当难", "difficulty": "hard", "category": "adjectives" },
  { "text": "He speaks quite fluently", "translation": "他讲得相当流利", "difficulty": "hard", "category": "adverbs" },
  { "text": "The children are very happy", "translation": "孩子们很开心", "difficulty": "medium", "category": "adjectives" },
  { "text": "She always comes early", "translation": "她总是来得很早", "difficulty": "medium", "category": "adverbs" },
  { "text": "The story was really exciting", "translation": "故事真令人兴奋", "difficulty": "hard", "category": "adjectives" },
  { "text": "He never gives up", "translation": "他从不放弃", "difficulty": "medium", "category": "adverbs" },

  // 功能表达 (Functional Expressions) - 50句
  { "text": "Can I have some water?", "translation": "我可以喝点水吗？", "difficulty": "medium", "category": "functions" },
  { "text": "Could you help me?", "translation": "你能帮我吗？", "difficulty": "hard", "category": "functions" },
  { "text": "May I go out to play?", "translation": "我可以出去玩吗？", "difficulty": "hard", "category": "functions" },
  { "text": "Would you like some cake?", "translation": "你想要一些蛋糕吗？", "difficulty": "hard", "category": "functions" },
  { "text": "Please sit down", "translation": "请坐", "difficulty": "medium", "category": "functions" },
  { "text": "Could you please be quiet?", "translation": "请你安静一下好吗？", "difficulty": "hard", "category": "functions" },
  { "text": "Excuse me", "translation": "打扰一下", "difficulty": "easy", "category": "functions" },
  { "text": "I am sorry", "translation": "对不起", "difficulty": "easy", "category": "functions" },
  { "text": "Thank you very much", "translation": "非常感谢", "difficulty": "medium", "category": "functions" },
  { "text": "You are welcome", "translation": "不客气", "difficulty": "medium", "category": "functions" },
  { "text": "Good morning", "translation": "早上好", "difficulty": "easy", "category": "functions" },
  { "text": "How are you?", "translation": "你好吗？", "difficulty": "easy", "category": "functions" },
  { "text": "I am fine, thank you", "translation": "我很好，谢谢", "difficulty": "easy", "category": "functions" },
  { "text": "What is your name?", "translation": "你叫什么名字？", "difficulty": "easy", "category": "functions" },
  { "text": "My name is John", "translation": "我叫约翰", "difficulty": "easy", "category": "functions" },
  { "text": "Nice to meet you", "translation": "很高兴见到你", "difficulty": "medium", "category": "functions" },
  { "text": "Where do you live?", "translation": "你住在哪里？", "difficulty": "medium", "category": "functions" },
  { "text": "I live in a city", "translation": "我住在城市里", "difficulty": "medium", "category": "functions" },
  { "text": "Do you like ice cream?", "translation": "你喜欢冰淇淋吗？", "difficulty": "medium", "category": "functions" },
  { "text": "Yes, I do", "translation": "是的，我喜欢", "difficulty": "easy", "category": "functions" },
  { "text": "No, I do not", "translation": "不，我不喜欢", "difficulty": "easy", "category": "functions" },
  { "text": "I am happy today", "translation": "我今天很高兴", "difficulty": "medium", "category": "functions" },
  { "text": "I am sad sometimes", "translation": "我有时会难过", "difficulty": "medium", "category": "functions" },
  { "text": "Let us play together", "translation": "我们一起玩吧", "difficulty": "medium", "category": "functions" },
  { "text": "See you tomorrow", "translation": "明天见", "difficulty": "medium", "category": "functions" },
  { "text": "Have a good day", "translation": "祝你今天愉快", "difficulty": "medium", "category": "functions" },
  { "text": "Good night", "translation": "晚安", "difficulty": "easy", "category": "functions" },
  { "text": "I love you", "translation": "我爱你", "difficulty": "medium", "category": "functions" },
  { "text": "I miss you", "translation": "我想念你", "difficulty": "medium", "category": "functions" },
  { "text": "I agree with you", "translation": "我同意你的看法", "difficulty": "hard", "category": "functions" },
  { "text": "I think so too", "translation": "我也这么认为", "difficulty": "medium", "category": "functions" },
  { "text": "I do not think so", "translation": "我不这么认为", "difficulty": "hard", "category": "functions" },
  { "text": "Maybe we can try again", "translation": "也许我们可以再试一次", "difficulty": "hard", "category": "functions" },
  { "text": "I hope so", "translation": "我希望如此", "difficulty": "medium", "category": "functions" },
  { "text": "I am not sure", "translation": "我不确定", "difficulty": "medium", "category": "functions" },
  { "text": "That sounds good", "translation": "那听起来不错", "difficulty": "medium", "category": "functions" },
  { "text": "Let me think about it", "translation": "让我想想", "difficulty": "hard", "category": "functions" },
  { "text": "I would like to go", "translation": "我想去", "difficulty": "hard", "category": "functions" },
  { "text": "I want to learn English", "translation": "我想学英语", "difficulty": "hard", "category": "functions" },
  { "text": "I need to finish my homework", "translation": "我需要完成家庭作业", "difficulty": "hard", "category": "functions" },
  { "text": "I have to go now", "translation": "我现在必须走了", "difficulty": "medium", "category": "functions" },
  { "text": "You must be careful", "translation": "你必须小心", "difficulty": "hard", "category": "functions" },
  { "text": "You should eat more vegetables", "translation": "你应该多吃蔬菜", "difficulty": "hard", "category": "functions" },
  { "text": "I have to clean my room", "translation": "我必须打扫我的房间", "difficulty": "hard", "category": "functions" },
  { "text": "I should study harder", "translation": "我应该更努力学习", "difficulty": "hard", "category": "functions" },
  { "text": "You need to drink more water", "translation": "你需要多喝水", "difficulty": "hard", "category": "functions" },
  { "text": "Let me help you", "translation": "让我来帮你", "difficulty": "medium", "category": "functions" },
  { "text": "It is time to go", "translation": "该走了", "difficulty": "medium", "category": "functions" },
  { "text": "How about going to the park?", "translation": "去公园怎么样？", "difficulty": "hard", "category": "functions" },
  { "text": "What do you think?", "translation": "你怎么想？", "difficulty": "medium", "category": "functions" },

  // 交通 (Transportation) - 25句
  { "text": "I ride a bike", "translation": "我骑自行车", "difficulty": "easy", "category": "transportation" },
  { "text": "The bus stops here", "translation": "公共汽车在这里停", "difficulty": "medium", "category": "transportation" },
  { "text": "The train is late", "translation": "火车晚点了", "difficulty": "medium", "category": "transportation" },
  { "text": "I like traveling by car", "translation": "我喜欢坐汽车旅行", "difficulty": "medium", "category": "transportation" },
  { "text": "The plane flies high", "translation": "飞机飞得高", "difficulty": "medium", "category": "transportation" },
  { "text": "My father drives to work", "translation": "我父亲开车去上班", "difficulty": "medium", "category": "transportation" },
  { "text": "The subway is fast", "translation": "地铁很快", "difficulty": "medium", "category": "transportation" },
  { "text": "I take the bus to school", "translation": "我坐公共汽车去学校", "difficulty": "medium", "category": "transportation" },
  { "text": "The taxi is waiting", "translation": "出租车在等待", "difficulty": "medium", "category": "transportation" },
  { "text": "We are going by train", "translation": "我们将坐火车去", "difficulty": "medium", "category": "transportation" },
  { "text": "The ship is in the harbor", "translation": "船在港湾里", "difficulty": "hard", "category": "transportation" },
  { "text": "I can ride a horse", "translation": "我会骑马", "difficulty": "medium", "category": "transportation" },
  { "text": "The traffic light is red", "translation": "交通灯是红色的", "difficulty": "medium", "category": "transportation" },
  { "text": "Stop at the traffic light", "translation": "在红绿灯处停下", "difficulty": "medium", "category": "transportation" },
  { "text": "The airport is far away", "translation": "机场很远", "difficulty": "medium", "category": "transportation" },
  { "text": "I will take a taxi", "translation": "我将坐出租车", "difficulty": "medium", "category": "transportation" },
  { "text": "The car is fast", "translation": "汽车很快", "difficulty": "easy", "category": "transportation" },
  { "text": "The bike is green", "translation": "自行车是绿色的", "difficulty": "easy", "category": "transportation" },
  { "text": "The train is very crowded", "translation": "火车非常拥挤", "difficulty": "hard", "category": "transportation" },
  { "text": "The bus is comfortable", "translation": "公共汽车很舒适", "difficulty": "medium", "category": "transportation" },
  { "text": "The station is near my house", "translation": "车站在我家附近", "difficulty": "medium", "category": "transportation" },
  { "text": "I need to get a ticket", "translation": "我需要买票", "difficulty": "medium", "category": "transportation" },
  { "text": "The driver is friendly", "translation": "司机很友好", "difficulty": "medium", "category": "transportation" },
  { "text": "The ticket is expensive", "translation": "票很贵", "difficulty": "medium", "category": "transportation" },
  { "text": "The journey takes two hours", "translation": "旅程需要两个小时", "difficulty": "hard", "category": "transportation" },

  // 兴趣爱好 (Hobbies) - 25句
  { "text": "I like collecting stamps", "translation": "我喜欢集邮", "difficulty": "hard", "category": "hobbies" },
  { "text": "She enjoys reading books", "translation": "她喜欢读书", "difficulty": "medium", "category": "hobbies" },
  { "text": "He plays the guitar", "translation": "他弹吉他", "difficulty": "medium", "category": "hobbies" },
  { "text": "We go hiking on weekends", "translation": "我们周末去远足", "difficulty": "hard", "category": "hobbies" },
  { "text": "She loves painting pictures", "translation": "她喜欢画画", "difficulty": "medium", "category": "hobbies" },
  { "text": "I play computer games", "translation": "我玩电脑游戏", "difficulty": "medium", "category": "hobbies" },
  { "text": "He is good at chess", "translation": "他擅长下棋", "difficulty": "hard", "category": "hobbies" },
  { "text": "She likes gardening", "translation": "她喜欢园艺", "difficulty": "medium", "category": "hobbies" },
  { "text": "I watch movies in my free time", "translation": "我在空闲时间看电影", "difficulty": "hard", "category": "hobbies" },
  { "text": "He practices piano every day", "translation": "他每天练习钢琴", "difficulty": "hard", "category": "hobbies" },
  { "text": "We play board games together", "translation": "我们一起玩棋盘游戏", "difficulty": "hard", "category": "hobbies" },
  { "text": "She is interested in photography", "translation": "她对摄影感兴趣", "difficulty": "hard", "category": "hobbies" },
  { "text": "I enjoy cooking", "translation": "我喜欢烹饪", "difficulty": "medium", "category": "hobbies" },
  { "text": "He likes fishing", "translation": "他喜欢钓鱼", "difficulty": "medium", "category": "hobbies" },
  { "text": "She dances ballet", "translation": "她跳芭蕾舞", "difficulty": "hard", "category": "hobbies" },
  { "text": "I like taking photographs", "translation": "我喜欢拍照", "difficulty": "hard", "category": "hobbies" },
  { "text": "He builds model airplanes", "translation": "他制作飞机模型", "difficulty": "hard", "category": "hobbies" },
  { "text": "We go swimming regularly", "translation": "我们定期去游泳", "difficulty": "hard", "category": "hobbies" },
  { "text": "She plays tennis", "translation": "她打网球", "difficulty": "medium", "category": "hobbies" },
  { "text": "I write stories", "translation": "我写故事", "difficulty": "medium", "category": "hobbies" },
  { "text": "He collects coins", "translation": "他收集硬币", "difficulty": "medium", "category": "hobbies" },
  { "text": "She practices yoga", "translation": "她练习瑜伽", "difficulty": "hard", "category": "hobbies" },
  { "text": "I like bird watching", "translation": "我喜欢观鸟", "difficulty": "hard", "category": "hobbies" },
  { "text": "He plays chess with his grandfather", "translation": "他和爷爷下棋", "difficulty": "hard", "category": "hobbies" },
  { "text": "We make crafts together", "translation": "我们一起做手工", "difficulty": "hard", "category": "hobbies" },

  // 节日与庆祝 (Festivals & Celebrations) - 25句
  { "text": "We celebrate Christmas", "translation": "我们庆祝圣诞节", "difficulty": "medium", "category": "festivals" },
  { "text": "I get presents at Christmas", "translation": "我在圣诞节收到礼物", "difficulty": "medium", "category": "festivals" },
  { "text": "We eat turkey on Christmas", "translation": "我们圣诞节吃火鸡", "difficulty": "hard", "category": "festivals" },
  { "text": "I dress up for Halloween", "translation": "我为万圣节打扮", "difficulty": "hard", "category": "festivals" },
  { "text": "We give Easter eggs", "translation": "我们送复活节彩蛋", "difficulty": "hard", "category": "festivals" },
  { "text": "We light candles on birthdays", "translation": "我们生日时点亮蜡烛", "difficulty": "hard", "category": "festivals" },
  { "text": "I have a birthday party", "translation": "我有一个生日派对", "difficulty": "medium", "category": "festivals" },
  { "text": "I blow out the candles", "translation": "我吹灭蜡烛", "difficulty": "hard", "category": "festivals" },
  { "text": "We have fireworks on New Year", "translation": "新年我们放烟花", "difficulty": "hard", "category": "festivals" },
  { "text": "I make a wish on my birthday", "translation": "我生日时许愿", "difficulty": "hard", "category": "festivals" },
  { "text": "We go trick-or-treating", "translation": "我们去要糖果", "difficulty": "hard", "category": "festivals" },
  { "text": "We hide Easter eggs", "translation": "我们藏复活节彩蛋", "difficulty": "hard", "category": "festivals" },
  { "text": "I wear a costume for Halloween", "translation": "我为万圣节穿服装", "difficulty": "hard", "category": "festivals" },
  { "text": "We decorate the Christmas tree", "translation": "我们装饰圣诞树", "difficulty": "hard", "category": "festivals" },
  { "text": "We sing Christmas songs", "translation": "我们唱圣诞歌曲", "difficulty": "hard", "category": "festivals" },
  { "text": "I receive money for Chinese New Year", "translation": "我在春节收到红包", "difficulty": "hard", "category": "festivals" },
  { "text": "We watch the parade", "translation": "我们观看游行", "difficulty": "medium", "category": "festivals" },
  { "text": "We celebrate with a big meal", "translation": "我们用大餐庆祝", "difficulty": "hard", "category": "festivals" },
  { "text": "I make cards for my friends", "translation": "我为朋友们制作卡片", "difficulty": "hard", "category": "festivals" },
  { "text": "We have a celebration party", "translation": "我们有一个庆祝派对", "difficulty": "hard", "category": "festivals" },
  { "text": "I like the festival lights", "translation": "我喜欢节日灯饰", "difficulty": "medium", "category": "festivals" },
  { "text": "We exchange gifts", "translation": "我们互换礼物", "difficulty": "hard", "category": "festivals" },
  { "text": "I enjoy the festival", "translation": "我喜欢这个节日", "difficulty": "medium", "category": "festivals" },
  { "text": "We have a special dinner", "translation": "我们有一顿特别的晚餐", "difficulty": "medium", "category": "festivals" },
  { "text": "The festival is colorful", "translation": "节日很丰富多彩", "difficulty": "medium", "category": "festivals" },

  // 身体部位 (Body Parts) - 25句
  { "text": "I have two eyes", "translation": "我有两只眼睛", "difficulty": "easy", "category": "body" },
  { "text": "My nose is in the middle of my face", "translation": "我的鼻子在我脸的中央", "difficulty": "medium", "category": "body" },
  { "text": "I hear with my ears", "translation": "我用耳朵听", "difficulty": "medium", "category": "body" },
  { "text": "I speak with my mouth", "translation": "我用嘴说话", "difficulty": "medium", "category": "body" },
  { "text": "I have ten fingers", "translation": "我有十根手指", "difficulty": "medium", "category": "body" },
  { "text": "I walk with my feet", "translation": "我用脚走路", "difficulty": "medium", "category": "body" },
  { "text": "I think with my brain", "translation": "我用大脑思考", "difficulty": "hard", "category": "body" },
  { "text": "I breathe with my lungs", "translation": "我用肺呼吸", "difficulty": "hard", "category": "body" },
  { "text": "My heart beats fast", "translation": "我的心跳得很快", "difficulty": "medium", "category": "body" },
  { "text": "I kick with my leg", "translation": "我用腿踢", "difficulty": "medium", "category": "body" },
  { "text": "I carry with my arms", "translation": "我用胳膊拿东西", "difficulty": "medium", "category": "body" },
  { "text": "My hair grows long", "translation": "我的头发长得很长", "difficulty": "medium", "category": "body" },
  { "text": "My teeth are white", "translation": "我的牙齿是白色的", "difficulty": "medium", "category": "body" },
  { "text": "My skin is soft", "translation": "我的皮肤很柔软", "difficulty": "medium", "category": "body" },
  { "text": "I dream with my head", "translation": "我用头脑做梦", "difficulty": "hard", "category": "body" },
  { "text": "My hands are smaller than my feet", "translation": "我的手比我的脚小", "difficulty": "hard", "category": "body" },
  { "text": "Eyes are more important than ears", "translation": "眼睛比耳朵更重要", "difficulty": "hard", "category": "body" },
  { "text": "Legs are stronger than arms", "translation": "腿比胳膊更强壮", "difficulty": "hard", "category": "body" },
  { "text": "The heart works harder than the brain", "translation": "心脏比大脑工作更辛苦", "difficulty": "hard", "category": "body" },
  { "text": "My head is the biggest part", "translation": "我的头是最大的部分", "difficulty": "medium", "category": "body" },
  { "text": "I touch with my hands", "translation": "我用手触摸", "difficulty": "medium", "category": "body" },
  { "text": "My neck connects my head and body", "translation": "我的脖子连接头部和身体", "difficulty": "hard", "category": "body" },
  { "text": "Shoulders are wider than wrists", "translation": "肩膀比手腕宽", "difficulty": "hard", "category": "body" },
  { "text": "I smell with my nose", "translation": "我用鼻子闻", "difficulty": "medium", "category": "body" },
  { "text": "My back is behind my chest", "translation": "我的背部在我胸前的后面", "difficulty": "hard", "category": "body" },

  // 购物 (Shopping) - 25句
  { "text": "I go shopping with my mother", "translation": "我和妈妈一起去购物", "difficulty": "medium", "category": "shopping" },
  { "text": "The shop is open", "translation": "商店开门了", "difficulty": "medium", "category": "shopping" },
  { "text": "I need to buy clothes", "translation": "我需要买衣服", "difficulty": "medium", "category": "shopping" },
  { "text": "The store has many things", "translation": "商店有很多东西", "difficulty": "medium", "category": "shopping" },
  { "text": "I like the red shirt", "translation": "我喜欢这件红衬衫", "difficulty": "medium", "category": "shopping" },
  { "text": "How much is this?", "translation": "这个多少钱？", "difficulty": "easy", "category": "shopping" },
  { "text": "It costs ten dollars", "translation": "它要十美元", "difficulty": "medium", "category": "shopping" },
  { "text": "I want to buy that", "translation": "我想买那个", "difficulty": "medium", "category": "shopping" },
  { "text": "I can afford it", "translation": "我买得起", "difficulty": "hard", "category": "shopping" },
  { "text": "I need to compare prices", "translation": "我需要比较价格", "difficulty": "hard", "category": "shopping" },
  { "text": "The shop is expensive", "translation": "这家店很贵", "difficulty": "medium", "category": "shopping" },
  { "text": "I have enough money", "translation": "我有足够的钱", "difficulty": "medium", "category": "shopping" },
  { "text": "Can I pay by card?", "translation": "我可以刷卡付款吗？", "difficulty": "hard", "category": "shopping" },
  { "text": "I bought a new dress", "translation": "我买了一条新裙子", "difficulty": "medium", "category": "shopping" },
  { "text": "The sale starts tomorrow", "translation": "促销明天开始", "difficulty": "hard", "category": "shopping" },
  { "text": "I like shopping online", "translation": "我喜欢在线购物", "difficulty": "hard", "category": "shopping" },
  { "text": "The store is crowded", "translation": "商店很拥挤", "difficulty": "medium", "category": "shopping" },
  { "text": "I will return this later", "translation": "我稍后会退货", "difficulty": "hard", "category": "shopping" },
  { "text": "The cashier is friendly", "translation": "收银员很友好", "difficulty": "medium", "category": "shopping" },
  { "text": "I have a shopping list", "translation": "我有一张购物清单", "difficulty": "medium", "category": "shopping" },
  { "text": "I will check the price", "translation": "我会查看价格", "difficulty": "hard", "category": "shopping" },
  { "text": "I will pay in cash", "translation": "我会用现金支付", "difficulty": "hard", "category": "shopping" },
  { "text": "I will take two of them", "translation": "我要买两个", "difficulty": "hard", "category": "shopping" },
  { "text": "I want to try it on", "translation": "我想试穿一下", "difficulty": "hard", "category": "shopping" },
  { "text": "The discount is good", "translation": "折扣很好", "difficulty": "hard", "category": "shopping" },

  // 数字 (Numbers) - 25句
  { "text": "One plus one equals two", "translation": "一加一等于二", "difficulty": "medium", "category": "numbers" },
  { "text": "I have three apples", "translation": "我有三个苹果", "difficulty": "easy", "category": "numbers" },
  { "text": "Ten is bigger than five", "translation": "十大于五", "difficulty": "medium", "category": "numbers" },
  { "text": "Twenty comes after nineteen", "translation": "二十在十九之后", "difficulty": "medium", "category": "numbers" },
  { "text": "Fifty is half of one hundred", "translation": "五十是一百的一半", "difficulty": "hard", "category": "numbers" },
  { "text": "I am seven years old", "translation": "我七岁了", "difficulty": "medium", "category": "numbers" },
  { "text": "There are twelve months", "translation": "一年有十二个月", "difficulty": "medium", "category": "numbers" },
  { "text": "One hundred is the biggest number", "translation": "一百是最大的数字", "difficulty": "medium", "category": "numbers" },
  { "text": "Zero means nothing", "translation": "零表示什么都没有", "difficulty": "medium", "category": "numbers" },
  { "text": "Nine times nine is eighty-one", "translation": "九乘以九等于八十一", "difficulty": "hard", "category": "numbers" },
  { "text": "Thirty minutes is half an hour", "translation": "三十分钟是半小时", "difficulty": "hard", "category": "numbers" },
  { "text": "A dozen means twelve", "translation": "一打表示十二个", "difficulty": "hard", "category ": "numbers" },
  { "text": "Seventy is ten more than sixty", "translation": "七十比六十多十", "difficulty": "hard", "category": "numbers" },
  { "text": "Eight is smaller than ten", "translation": "八比十小", "difficulty": "medium", "category": "numbers" },
  { "text": "Twenty-five is a quarter of one hundred", "translation": "二十五是一百的四分之一", "difficulty": "hard", "category": "numbers" },
  { "text": "I can count to one hundred", "translation": "我可以数到一百", "difficulty": "medium", "category": "numbers" },
  { "text": "Six times seven equals forty-two", "translation": "六乘以七等于四十二", "difficulty": "hard", "category": "numbers" },
  { "text": "Fifteen is three times five", "translation": "十五是三乘以五", "difficulty": "hard", "category": "numbers" },
  { "text": "The number forty is between thirty and fifty", "translation": "数字四十在三十和五十之间", "difficulty": "hard", "category": "numbers" },
  { "text": "Ninety is ten less than one hundred", "translation": "九十比一百少十", "difficulty": "hard", "category": "numbers" },
  { "text": "Three is less than four", "translation": "三小于四", "difficulty": "medium", "category": "numbers" },
  { "text": "Sixty seconds make one minute", "translation": "六十秒为一分钟", "difficulty": "hard", "category": "numbers" },
  { "text": "My house number is forty-five", "translation": "我家的号码是四十五", "difficulty": "medium", "category": "numbers" },
  { "text": "I scored ninety percent", "translation": "我得了百分之九十", "difficulty": "hard", "category": "numbers" },
  { "text": "The temperature is minus five degrees", "translation": "温度是零下五度", "difficulty": "hard", "category": "numbers" },

  // 健康 (Health) - 25句
  { "text": "I brush my teeth twice a day", "translation": "我一天刷两次牙", "difficulty": "hard", "category": "health" },
  { "text": "Exercise is good for health", "translation": "锻炼有益健康", "difficulty": "hard", "category": "health" },
  { "text": "I sleep eight hours every night", "translation": "我每晚睡八个小时", "difficulty": "hard", "category": "health" },
  { "text": "I drink lots of water", "translation": "我喝很多水", "difficulty": "medium", "category": "health" },
  { "text": "I eat healthy food", "translation": "我吃健康食品", "difficulty": "medium", "category": "health" },
  { "text": "I should wash my hands", "translation": "我应该洗手", "difficulty": "hard", "category": "health" },
  { "text": "I feel tired today", "translation": "我今天感到疲倦", "difficulty": "medium", "category": "health" },
  { "text": "I have a headache", "translation": "我头痛", "difficulty": "medium", "category": "health" },
  { "text": "I need to see the doctor", "translation": "我需要看医生", "difficulty": "hard", "category": "health" },
  { "text": "I take vitamins", "translation": "我吃维生素", "difficulty": "hard", "category": "health" },
  { "text": "Rest is important", "translation": "休息很重要", "difficulty": "medium", "category": "health" },
  { "text": "I have a cold", "translation": "我感冒了", "difficulty": "medium", "category": "health" },
  { "text": "I am feeling better", "translation": "我感觉好多了", "difficulty": "medium", "category": "health" },
  { "text": "I exercise every day", "translation": "我每天锻炼", "difficulty": "medium", "category": "health" },
  { "text": "I have a stomach ache", "translation": "我胃痛", "difficulty": "medium", "category": "health" },
  { "text": "I need to eat breakfast", "translation": "我需要吃早餐", "difficulty": "hard", "category": "health" },
  { "text": "I have an allergy", "translation": "我有过敏症", "difficulty": "hard", "category": "health" },
  { "text": "I feel dizzy", "translation": "我感到头晕", "difficulty": "hard", "category": "health" },
  { "text": "I should stay in bed", "translation": "我应该卧床休息", "difficulty": "hard", "category": "health" },
  { "text": "My throat hurts", "translation": "我喉咙痛", "difficulty": "medium", "category": "health" },
  { "text": "I need medicine", "translation": "我需要药物", "difficulty": "medium", "category": "health" },
  { "text": "I am on a diet", "translation": "我在节食", "difficulty": "hard", "category": "health" },
  { "text": "Sleep is essential", "translation": "睡眠是必需的", "difficulty": "hard", "category": "health" },
  { "text": "Fresh air is good for me", "translation": "新鲜空气对我有好处", "difficulty": "hard", "category": "health" },
  { "text": "I feel energetic", "translation": "我感到精力充沛", "difficulty": "hard", "category": "health" },

  // 环境 (Environment) - 25句
  { "text": "We should protect the environment", "translation": "我们应该保护环境", "difficulty": "hard", "category": "environment" },
  { "text": "Pollution is bad for the earth", "translation": "污染对地球有害", "difficulty": "hard", "category": "environment" },
  { "text": "We need to save water", "translation": "我们需要节约用水", "difficulty": "hard", "category": "environment" },
  { "text": "Recycling helps the environment", "translation": "回收利用有助于环境", "difficulty": "hard", "category": "environment" },
  { "text": "Plastic bags are harmful", "translation": "塑料袋有害", "difficulty": "hard", "category": "environment" },
  { "text": "Trees clean the air", "translation": "树木净化空气", "difficulty": "medium", "category": "environment" },
  { "text": "We should use less energy", "translation": "我们应该少用能源", "difficulty": "hard", "category": "environment" },
  { "text": "The forest is disappearing", "translation": "森林正在消失", "difficulty": "hard", "category": "environment" },
  { "text": "Animals need protection", "translation": "动物需要保护", "difficulty": "medium", "category": "environment" },
  { "text": "The earth is in danger", "translation": "地球处于危险之中", "difficulty": "hard", "category": "environment" },
  { "text": "We should plant more trees", "translation": "我们应该种植更多的树", "difficulty": "hard", "category": "environment" },
  { "text": "The ocean is polluted", "translation": "海洋受到污染", "difficulty": "hard", "category": "environment" },
  { "text": "Global warming is a problem", "translation": "全球变暖是一个问题", "difficulty": "hard", "category": "environment" },
  { "text": "We should reuse materials", "translation": "我们应该重复利用材料", "difficulty": "hard", "category": "environment" },
  { "text": "Solar energy is clean", "translation": "太阳能是清洁能源", "difficulty": "hard", "category": "environment" },
  { "text": "We need clean air", "translation": "我们需要清洁的空气", "difficulty": "medium", "category": "environment" },
  { "text": "Wildlife is important", "translation": "野生动物很重要", "difficulty": "medium", "category": "environment" },
  { "text": "We should reduce waste", "translation": "我们应该减少浪费", "difficulty": "hard", "category": "environment" },
  { "text": "The river is dirty", "translation": "河流很脏", "difficulty": "medium", "category": "environment" },
  { "text": "Green plants are beautiful", "translation": "绿色植物很美", "difficulty": "medium", "category": "environment" },
  { "text": "We should care for nature", "translation": "我们应该关爱自然", "difficulty": "hard", "category": "environment" },
  { "text": "The sky is blue", "translation": "天空是蓝色的", "difficulty": "easy", "category": "environment" },
  { "text": "The sun gives us light", "translation": "太阳给我们光明", "difficulty": "medium", "category": "environment" },
  { "text": "Rain helps plants grow", "translation": "雨水帮助植物生长", "difficulty": "medium", "category": "environment" },
  { "text": "We live on planet Earth", "translation": "我们生活在地球上", "difficulty": "medium", "category": "environment" },

  // 比较结构 (Comparison) - 25句
  { "text": "This apple is bigger than that one", "translation": "这个苹果比那个大", "difficulty": "hard", "category": "comparison" },
  { "text": "Dogs are friendlier than cats", "translation": "狗比猫更友好", "difficulty": "hard", "category": "comparison" },
  { "text": "Running is faster than walking", "translation": "跑步比走路快", "difficulty": "hard", "category": "comparison" },
  { "text": "This book is more interesting than that one", "translation": "这本书比那本书更有趣", "difficulty": "hard", "category": "comparison" },
  { "text": "Winter is colder than spring", "translation": "冬天比春天冷", "difficulty": "hard", "category": "comparison" },
  { "text": "She is taller than her sister", "translation": "她比她姐姐高", "difficulty": "hard", "category": "comparison" },
  { "text": "This car is more expensive than that one", "translation": "这辆车比那辆车更贵", "difficulty": "hard", "category": "comparison" },
  { "text": "Math is harder than music", "translation": "数学比音乐难", "difficulty": "hard", "category": "comparison" },
  { "text": "This dress is prettier than that one", "translation": "这条裙子比那条更漂亮", "difficulty": "hard", "category": "comparison" },
  { "text": "He runs faster than me", "translation": "他比我跑得快", "difficulty": "hard", "category": "comparison" },
  { "text": "Today is hotter than yesterday", "translation": "今天比昨天热", "difficulty": "hard", "category": "comparison" },
  { "text": "This movie is better than the last one", "translation": "这部电影比上一部更好", "difficulty": "hard", "category": "comparison" },
  { "text": "My mom is stricter than my dad", "translation": "我妈妈比爸爸更严格", "difficulty": "hard", "category": "comparison" },
  { "text": "This game is more fun than that one", "translation": "这个游戏比那个更有趣", "difficulty": "hard", "category": "comparison" },
  { "text": "The red shirt is more colorful than the blue one", "translation": "红衬衫比蓝衬衫更丰富多彩", "difficulty": "hard", "category": "comparison" },
  { "text": "She studies harder than her brother", "translation": "她比她兄弟更努力学习", "difficulty": "hard", "category": "comparison" },
  { "text": "This restaurant is more expensive", "translation": "这家餐厅更贵", "difficulty": "hard", "category": "comparison" },
  { "text": "My room is messier than my sister's", "translation": "我的房间比姐姐的更乱", "difficulty": "hard", "category": "comparison" },
  { "text": "This song is louder than that one", "translation": "这首歌比那首声音更大", "difficulty": "hard", "category": "comparison" },
  { "text": "This test was easier than I expected", "translation": "这次考试比我预期的容易", "difficulty": "hard", "category": "comparison" },
  { "text": "She speaks more clearly than him", "translation": "她说话比他更清楚", "difficulty": "hard", "category": "comparison" },
  { "text": "This path is shorter than the other", "translation": "这条路比另一条短", "difficulty": "hard", "category": "comparison" },
  { "text": "The teacher is stricter than the assistant", "translation": "老师比助教更严格", "difficulty": "hard", "category": "comparison" },
  { "text": "This fruit is sweeter than that vegetable", "translation": "这个水果比那个蔬菜更甜", "difficulty": "hard", "category": "comparison" },
  { "text": "My bike is older than my car", "translation": "我的自行车比我的汽车更旧", "difficulty": "hard", "category": "comparison" },

  // 情态动词 (Modals) - 25句
  { "text": "I can swim", "translation": "我会游泳", "difficulty": "easy", "category": "modals" },
  { "text": "She can ride a bike", "translation": "她会骑自行车", "difficulty": "medium", "category": "modals" },
  { "text": "I cannot run fast", "translation": "我跑不快", "difficulty": "medium", "category": "modals" },
  { "text": "He could play piano", "translation": "他会弹钢琴", "difficulty": "hard", "category": "modals" },
  { "text": "I may go to the park", "translation": "我可能会去公园", "difficulty": "hard", "category": "modals" },
  { "text": "You might be right", "translation": "你可能是对的", "difficulty": "hard", "category": "modals" },
  { "text": "I must finish my homework", "translation": "我必须完成家庭作业", "difficulty": "hard", "category": "modals" },
  { "text": "You should study hard", "translation": "你应该努力学习", "difficulty": "hard", "category": "modals" },
  { "text": "We should help others", "translation": "我们应该帮助他人", "difficulty": "hard", "category": "modals" },
  { "text": "I would like some water", "translation": "我想要一些水", "difficulty": "hard", "category": "modals" },
  { "text": "I would go if I had time", "translation": "如果有时间我会去", "difficulty": "hard", "category": "modals" },
  { "text": "You must be careful", "translation": "你必须小心", "difficulty": "hard", "category": "modals" },
  { "text": "She can speak English", "translation": "她会说英语", "difficulty": "medium", "category": "modals" },
  { "text": "I could not understand", "translation": "我不明白", "difficulty": "hard", "category": "modals" },
  { "text": "May I come in?", "translation": "我可以进来吗？", "difficulty": "hard", "category": "modals" },
  { "text": "You might like it", "translation": "你可能会喜欢它", "difficulty": "hard", "category": "modals" },
  { "text": "I must not be late", "translation": "我不能迟到", "difficulty": "hard", "category": "modals" },
  { "text": "You should not eat too much", "translation": "你不应该吃得太多", "difficulty": "hard", "category": "modals" },
  { "text": "We should not waste time", "translation": "我们不应该浪费时间", "difficulty": "hard", "category": "modals" },
  { "text": "I would help if I could", "translation": "如果我可以的话，我会帮忙", "difficulty": "hard", "category": "modals" },
  { "text": "If I were rich, I would travel", "translation": "如果我有钱，我会去旅行", "difficulty": "hard", "category": "modals" },
  { "text": "He should have studied more", "translation": "他应该多学习", "difficulty": "hard", "category": "modals" },
  { "text": "I could have helped you", "translation": "我本可以帮助你的", "difficulty": "hard", "category": "modals" },
  { "text": "You must not forget your keys", "translation": "你不能忘记你的钥匙", "difficulty": "hard", "category": "modals" },
  { "text": "I should not have said that", "translation": "我不应该说那些话", "difficulty": "hard", "category": "modals" },

  // 非谓语动词 (Non-finites) - 25句
  { "text": "I like to read books", "translation": "我喜欢读书", "difficulty": "medium", "category": "non-finites" },
  { "text": "She enjoys swimming", "translation": "她喜欢游泳", "difficulty": "medium", "category": "non-finites" },
  { "text": "I want to learn English", "translation": "我想学英语", "difficulty": "hard", "category": "non-finites" },
  { "text": "Swimming is good exercise", "translation": "游泳是很好的锻炼", "difficulty": "medium", "category": "non-finites" },
  { "text": "I saw him running", "translation": "我看见他跑步", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am interested in learning", "translation": "我有兴趣学习", "difficulty": "hard", "category": "non-finites" },
  { "text": "Reading books is fun", "translation": "读书很有趣", "difficulty": "medium", "category": "non-finites" },
  { "text": "I finished doing my homework", "translation": "我完成了做作业", "difficulty": "hard", "category": "non-finites" },
  { "text": "He is good at cooking", "translation": "他擅长做饭", "difficulty": "hard", "category": "non-finites" },
  { "text": "I need to practice more", "translation": "我需要多练习", "difficulty": "hard", "category": "non-finites" },
  { "text": "To travel is my dream", "translation": "旅行是我的梦想", "difficulty": "hard", "category": "non-finites" },
  { "text": "It is important to study", "translation": "学习很重要", "difficulty": "hard", "category": "non-finites" },
  { "text": "I hope to see you soon", "translation": "我希望很快见到你", "difficulty": "hard", "category": "non-finites" },
  { "text": "Learning English is challenging", "translation": "学英语很有挑战性", "difficulty": "hard", "category": "non-finites" },
  { "text": "I saw a cat sleeping", "translation": "我看到一只猫在睡觉", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am excited about visiting", "translation": "我为参观感到兴奋", "difficulty": "hard", "category": "non-finites" },
  { "text": "He decided to go", "translation": "他决定去", "difficulty": "hard", "category": "non-finites" },
  { "text": "I want to become a teacher", "translation": "我想成为老师", "difficulty": "hard", "category": "non-finites" },
  { "text": "To be kind is important", "translation": "善良很重要", "difficulty": "hard", "category": "non-finites" },
  { "text": "Playing games is fun", "translation": "玩游戏很有趣", "difficulty": "medium", "category": "non-finites" },
  { "text": "I remembered to call my friend", "translation": "我记得要给朋友打电话", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am looking forward to seeing you", "translation": "我期待见到你", "difficulty": "hard", "category": "non-finites" },
  { "text": "He was seen running", "translation": "有人看到他在跑步", "difficulty": "hard", "category": "non-finites" },
  { "text": "I am tired of waiting", "translation": "我厌倦了等待", "difficulty": "hard", "category": "non-finites" },
  { "text": "To understand is to accept", "translation": "理解就是接受", "difficulty": "hard", "category": "non-finites" },

  // 介词 (Prepositions) - 25句
  { "text": "The book is on the table", "translation": "书在桌子上", "difficulty": "medium", "category": "prepositions" },
  { "text": "The cat is under the chair", "translation": "猫在椅子下面", "difficulty": "medium", "category": "prepositions" },
  { "text": "I go to school", "translation": "我去上学", "difficulty": "easy", "category": "prepositions" },
  { "text": "The ball is in the box", "translation": "球在盒子里", "difficulty": "medium", "category": "prepositions" },
  { "text": "I live at home", "translation": "我住在家里", "difficulty": "medium", "category": "prepositions" },
  { "text": "The bird flies above the tree", "translation": "鸟在树上面飞", "difficulty": "hard", "category": "prepositions" },
  { "text": "I will meet you at three", "translation": "我三点钟和你见面", "difficulty": "medium", "category": "prepositions" },
  { "text": "I was born in 2010", "translation": "我2010年出生", "difficulty": "medium", "category": "prepositions" },
  { "text": "The children are playing outside", "translation": "孩子们在外面玩", "difficulty": "medium", "category": "prepositions" },
  { "text": "The book is next to the lamp", "translation": "书在灯旁边", "difficulty": "hard", "category": "prepositions" },
  { "text": "I walked through the park", "translation": "我穿过公园走", "difficulty": "hard", "category": "prepositions" },
  { "text": "I will call you after dinner", "translation": "我晚饭后给你打电话", "difficulty": "hard", "category": "prepositions" },
  { "text": "The cat jumped over the fence", "translation": "猫跳过栅栏", "difficulty": "hard", "category": "prepositions" },
  { "text": "I arrived before the meeting", "translation": "我在会议前到达", "difficulty": "hard", "category": "prepositions" },
  { "text": "The school is across the street", "translation": "学校在街对面", "difficulty": "hard", "category": "prepositions" },
  { "text": "I have not seen him since Monday", "translation": "我自星期一以来就没见过他", "difficulty": "hard", "category": "prepositions" },
  { "text": "The store is between the bank and the post office", "translation": "商店在银行和邮局之间", "difficulty": "hard", "category": "prepositions" },
  { "text": "I will travel during summer", "translation": "我将在夏天旅行", "difficulty": "hard", "category": "prepositions" },
  { "text": "I have been waiting for an hour", "translation": "我已经等了一个小时", "difficulty": "hard", "category": "prepositions" },
  { "text": "She is interested in art", "translation": "她对艺术感兴趣", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am good at swimming", "translation": "我擅长游泳", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am afraid of spiders", "translation": "我害怕蜘蛛", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am looking for my keys", "translation": "我在找我的钥匙", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am thinking about my vacation", "translation": "我在想我的假期", "difficulty": "hard", "category": "prepositions" },
  { "text": "I am responsible for the project", "translation": "我负责这个项目", "difficulty": "hard", "category": "prepositions" },

  // 固定搭配 (Fixed Expressions) - 25句
  { "text": "It is time to go", "translation": "该走了", "difficulty": "medium", "category": "expressions" },
  { "text": "I have to go now", "translation": "我现在必须走了", "difficulty": "medium", "category": "expressions" },
  { "text": "Let us go to the park", "translation": "我们去公园吧", "difficulty": "medium", "category": "expressions" },
  { "text": "How are you doing?", "translation": "你好吗？", "difficulty": "medium", "category": "expressions" },
  { "text": "What is up?", "translation": "怎么了？", "difficulty": "medium", "category": "expressions" },
  { "text": "It is up to you", "translation": "由你决定", "difficulty": "hard", "category": "expressions" },
  { "text": "I am looking forward to it", "translation": "我期待着它", "difficulty": "hard", "category": "expressions" },
  { "text": "I hope so", "translation": "我希望如此", "difficulty": "medium", "category": "expressions" },
  { "text": "I do not think so", "translation": "我不这么认为", "difficulty": "hard", "category": "expressions" },
  { "text": "I am not sure", "translation": "我不确定", "difficulty": "medium", "category": "expressions" },
  { "text": "That is a good idea", "translation": "那是个好主意", "difficulty": "medium", "category": "expressions" },
  { "text": "How about that?", "translation": "那怎么样？", "difficulty": "medium", "category": "expressions" },
  { "text": "Let me see", "translation": "让我看看", "difficulty": "medium", "category": "expressions" },
  { "text": "You are welcome", "translation": "不客气", "difficulty": "medium", "category": "expressions" },
  { "text": "No problem", "translation": "没问题", "difficulty": "medium", "category": "expressions" },
  { "text": "I am sorry", "translation": "对不起", "difficulty": "easy", "category": "expressions" },
  { "text": "Excuse me", "translation": "打扰一下", "difficulty": "medium", "category": "expressions" },
  { "text": "Thank you very much", "translation": "非常感谢", "difficulty": "medium", "category": "expressions" },
  { "text": "You are right", "translation": "你是对的", "difficulty": "medium", "category": "expressions" },
  { "text": "I am wrong", "translation": "我错了", "difficulty": "medium", "category": "expressions" },
  { "text": "That is correct", "translation": "那是正确的", "difficulty": "medium", "category": "expressions" },
  { "text": "That is incorrect", "translation": "那是错误的", "difficulty": "hard", "category": "expressions" },
  { "text": "I agree with you", "translation": "我同意你的看法", "difficulty": "hard", "category": "expressions" },
  { "text": "I disagree with you", "translation": "我不同意你的看法", "difficulty": "hard", "category": "expressions" },
  { "text": "It depends", "translation": "看情况", "difficulty": "medium", "category": "expressions" },

  // 从句 (Clauses) - 25句
  { "text": "I know that you are busy", "translation": "我知道你很忙", "difficulty": "hard", "category": "clauses" },
  { "text": "The book that I read is interesting", "translation": "我读的那本书很有趣", "difficulty": "hard", "category": "clauses" },
  { "text": "I will call you when I arrive", "translation": "我到了会给你打电话", "difficulty": "hard", "category": "clauses" },
  { "text": "If it rains, we will stay inside", "translation": "如果下雨，我们就待在室内", "difficulty": "hard", "category": "clauses" },
  { "text": "The woman who lives next door is kind", "translation": "住在隔壁的那位女士很善良", "difficulty": "hard", "category": "clauses" },
  { "text": "I remember when I was young", "translation": "我记得我年轻的时候", "difficulty": "hard", "category": "clauses" },
  { "text": "I will tell you what I saw", "translation": "我会告诉你我看到了什么", "difficulty": "hard", "category": "clauses" },
  { "text": "The place where we met is special", "translation": "我们见面的那个地方很特别", "difficulty": "hard", "category": "clauses" },
  { "text": "I do not know why he left", "translation": "我不知道他为什么离开", "difficulty": "hard", "category": "clauses" },
  { "text": "She studied hard so that she could pass", "translation": "她努力学习以便能够通过", "difficulty": "hard", "category": "clauses" },
  { "text": "I want to know what happened", "translation": "我想知道发生了什么事", "difficulty": "hard", "category": "clauses" },
  { "text": "The house that we bought is big", "translation": "我们买的那栋房子很大", "difficulty": "hard", "category": "clauses" },
  { "text": "I will go wherever you go", "translation": "你去哪里我就去哪里", "difficulty": "hard", "category": "clauses" },
  { "text": "As I was walking, I saw a cat", "translation": "我走路时看到了一只猫", "difficulty": "hard", "category": "clauses" },
  { "text": "He came after I had left", "translation": "我离开后他才来", "difficulty": "hard", "category": "clauses" },
  { "text": "I will stay until you return", "translation": "我会等到你回来", "difficulty": "hard", "category": "clauses" },
  { "text": "The movie that we watched was good", "translation": "我们看的那部电影很好", "difficulty": "hard", "category": "clauses" },
  { "text": "I will give you what you need", "translation": "我会给你需要的", "difficulty": "hard", "category": "clauses" },
  { "text": "The reason why I am late is traffic", "translation": "我迟到的原因是交通", "difficulty": "hard", "category": "clauses" },
  { "text": "I like the way that you speak", "translation": "我喜欢你说话的方式", "difficulty": "hard", "category": "clauses" },
  { "text": "Wherever you go, I will follow", "translation": "无论你去哪里，我都会跟随", "difficulty": "hard", "category": "clauses" },
  { "text": "I will help you if you need it", "translation": "如果你需要我会帮助你", "difficulty": "hard", "category": "clauses" },
  { "text": "I hope that you will succeed", "translation": "我希望你能成功", "difficulty": "hard", "category": "clauses" },
  { "text": "The time when we met was perfect", "translation": "我们见面的时间很完美", "difficulty": "hard", "category": "clauses" },
  { "text": "I do not know whether he will come", "translation": "我不知道他是否会来", "difficulty": "hard", "category": "clauses" },

  // 被动语态 (Passive Voice) - 25句
  { "text": "The book was written by him", "translation": "这本书是他写的", "difficulty": "hard", "category": "passive" },
  { "text": "The house is cleaned every day", "translation": "房子每天都被打扫", "difficulty": "hard", "category": "passive" },
  { "text": "The test will be graded tomorrow", "translation": "考试明天会被评分", "difficulty": "hard", "category": "passive" },
  { "text": "The letter was sent yesterday", "translation": "这封信昨天被发送了", "difficulty": "hard", "category": "passive" },
  { "text": "The cake was made by my mother", "translation": "蛋糕是我妈妈做的", "difficulty": "hard", "category": "passive" },
  { "text": "The movie was watched by many people", "translation": "许多人观看了这部电影", "difficulty": "hard", "category": "passive" },
  { "text": "The homework has been finished", "translation": "作业已经完成了", "difficulty": "hard", "category": "passive" },
  { "text": "The door is being painted", "translation": "门正在被刷漆", "difficulty": "hard", "category": "passive" },
  { "text": "The project will be completed next week", "translation": "该项目下周将完成", "difficulty": "hard", "category": "passive" },
  { "text": "The song was composed by a famous musician", "translation": "这首歌是一位著名音乐家创作的", "difficulty": "hard", "category": "passive" },
  { "text": "The room has been decorated", "translation": "房间已经被装饰了", "difficulty": "hard", "category": "passive" },
  { "text": "The car is being washed", "translation": "车正在被清洗", "difficulty": "hard", "category": "passive" },
  { "text": "The building was constructed last year", "translation": "这栋楼去年建造的", "difficulty": "hard", "category": "passive" },
  { "text": "The decision was made by the committee", "translation": "这个决定是由委员会做出的", "difficulty": "hard", "category": "passive" },
  { "text": "The flowers are watered every morning", "translation": "花每天早上都会被浇水", "difficulty": "hard", "category": "passive" },
  { "text": "The problem has been solved", "translation": "问题已经解决了", "difficulty": "hard", "category": "passive" },
  { "text": "The picture is being drawn", "translation": "图片正在被画", "difficulty": "hard", "category": "passive" },
  { "text": "The book was published in 2020", "translation": "这本书于2020年出版", "difficulty": "hard", "category": "passive" },
  { "text": "The plan was approved by the manager", "translation": "计划被经理批准了", "difficulty": "hard", "category": "passive" },
  { "text": "The cookies were baked yesterday", "translation": "饼干是昨天烤的", "difficulty": "hard", "category": "passive" },
  { "text": "The question is being answered", "translation": "问题正在被回答", "difficulty": "hard", "category": "passive" },
  { "text": "The story was told by my grandfather", "translation": "故事是我爷爷讲的", "difficulty": "hard", "category": "passive" },
  { "text": "The house has been sold", "translation": "房子已经卖掉了", "difficulty": "hard", "category": "passive" },
  { "text": "The movie will be shown tomorrow", "translation": "电影明天会放映", "difficulty": "hard", "category": "passive" },
  { "text": "The letter is being written now", "translation": "信现在正在被写", "difficulty": "hard", "category": "passive" },

  // 条件句 (Conditionals) - 25句
  { "text": "If I have money, I will buy a car", "translation": "如果我有钱，我会买车", "difficulty": "hard", "category": "conditionals" },
  { "text": "If it rains, we will stay home", "translation": "如果下雨，我们就待在家里", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would go if I had time", "translation": "如果我有时间，我会去", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I were rich, I would travel", "translation": "如果我有钱，我会去旅行", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would have called if I had known", "translation": "如果我知道的话，我就打电话了", "difficulty": "hard", "category": "conditionals" },
  { "text": "If you study hard, you will pass", "translation": "如果你努力学习，你就能通过", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had studied, I would have passed", "translation": "如果我学了，我就能通过了", "difficulty": "hard", "category": "conditionals" },
  { "text": "I will help you if you need help", "translation": "如果你需要帮助，我会帮你", "difficulty": "hard", "category": "conditionals" },
  { "text": "If it were sunny, we would go swimming", "translation": "如果天气晴朗，我们就去游泳", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had seen you, I would have said hello", "translation": "如果我看到你了，我会打招呼的", "difficulty": "hard", "category": "conditionals" },
  { "text": "If you are hungry, eat something", "translation": "如果你饿了，吃点东西", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would buy a house if I could afford it", "translation": "如果我买得起，我会买房子", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had not been busy, I would have helped", "translation": "如果我不忙，我就会帮忙", "difficulty": "hard", "category": "conditionals" },
  { "text": "If he were here, he would agree with us", "translation": "如果他在场，他会同意我们的意见", "difficulty": "hard", "category": "conditionals" },
  { "text": "If we had left earlier, we would have caught the train", "translation": "如果我们早点出发，就能赶上火车了", "difficulty": "hard", "category": "conditionals" },
  { "text": "You will be late if you do not hurry", "translation": "如果你不快点，你会迟到", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I win the game, I will be happy", "translation": "如果我赢了比赛，我会很开心", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I were you, I would accept the offer", "translation": "如果我是你，我会接受这个提议", "difficulty": "hard", "category": "conditionals" },
  { "text": "I would have told you if I had known", "translation": "如果我知道，我就会告诉你", "difficulty": "hard", "category": "conditionals" },
  { "text": "If the weather is good tomorrow, we will go hiking", "translation": "如果明天天气好，我们就去徒步", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had money, I would buy that book", "translation": "如果我有钱，我会买那本书", "difficulty": "hard", "category": "conditionals" },
  { "text": "If she had asked me, I would have helped", "translation": "如果她问我，我会帮忙的", "difficulty": "hard", "category": "conditionals" },
  { "text": "If you heat ice, it melts", "translation": "如果你加热冰，它就会融化", "difficulty": "hard", "category": "conditionals" },
  { "text": "If I had known the truth, I would not have believed it", "translation": "如果我知道真相，我不会相信", "difficulty": "hard", "category": "conditionals" },
  { "text": "If we save money, we can buy a car", "translation": "如果我们省钱，我们就能买车", "difficulty": "hard", "category": "conditionals" },

  // 抽象概念 (Abstract Concepts) - 25句
  { "text": "Happiness is important", "translation": "幸福很重要", "difficulty": "medium", "category": "abstract" },
  { "text": "Kindness makes the world better", "translation": "善良让世界更美好", "difficulty": "hard", "category": "abstract" },
  { "text": "Freedom is valuable", "translation": "自由是宝贵的", "difficulty": "hard", "category": "abstract" },
  { "text": "Justice is essential", "translation": "正义是必要的", "difficulty": "hard", "category": "abstract" },
  { "text": "Love is powerful", "translation": "爱是强大的", "difficulty": "medium", "category": "abstract" },
  { "text": "Wisdom comes with experience", "translation": "智慧来自经验", "difficulty": "hard", "category": "abstract" },
  { "text": "Patience is a virtue", "translation": "耐心是一种美德", "difficulty": "hard", "category": "abstract" },
  { "text": "Courage helps us face challenges", "translation": "勇气帮助我们面对挑战", "difficulty": "hard", "category": "abstract" },
  { "text": "Trust is built over time", "translation": "信任是随着时间建立的", "difficulty": "hard", "category": "abstract" },
  { "text": "Respect is mutual", "translation": "尊重是相互的", "difficulty": "hard", "category": "abstract" },
  { "text": "Peace is what we all want", "translation": "和平是我们都想要的", "difficulty": "hard", "category": "abstract" },
  { "text": "Equality is a fundamental right", "translation": "平等是一项基本权利", "difficulty": "hard", "category": "abstract" },
  { "text": "Honesty is the best policy", "translation": "诚实是最好的策略", "difficulty": "hard", "category": "abstract" },
  { "text": "Beauty is in the eye of the beholder", "translation": "美在于观察者的眼中", "difficulty": "hard", "category": "abstract" },
  { "text": "Success requires effort", "translation": "成功需要努力", "difficulty": "hard", "category": "abstract" },
  { "text": "Failure teaches us lessons", "translation": "失败给我们教训", "difficulty": "hard", "category": "abstract" },
  { "text": "Time is precious", "translation": "时间是珍贵的", "difficulty": "medium", "category": "abstract" },
  { "text": "Change is inevitable", "translation": "变化是不可避免的", "difficulty": "hard", "category": "abstract" },
  { "text": "Hope sustains us", "translation": "希望支撑着我们", "difficulty": "hard", "category": "abstract" },
  { "text": "Memory keeps us connected", "translation": "记忆让我们保持联系", "difficulty": "hard", "category": "abstract" },
  { "text": "Dreams inspire us", "translation": "梦想激励我们", "difficulty": "medium", "category": "abstract" },
  { "text": "Curiosity drives learning", "translation": "好奇心驱动学习", "difficulty": "hard", "category": "abstract" },
  { "text": "Dedication leads to success", "translation": "奉献精神通向成功", "difficulty": "hard", "category": "abstract" },
  { "text": "Tolerance creates harmony", "translation": "宽容创造和谐", "difficulty": "hard", "category": "abstract" },
  { "text": "Compassion heals", "translation": "同情心治愈", "difficulty": "hard", "category": "abstract" }
];

        // Add default state properties to each sentence
        sentences = jsonData.map(sentence => ({
            text: sentence.text,
            translation: sentence.translation || "",  // Translation in child-friendly language
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
        
        // Sort the valid mistake sentences by difficulty (easy -> medium -> hard) first, then by mastery (ascending - lowest mastery first)
        const sortedValidMistakeSentences = validMistakeSentences.sort((a, b) => {
            // Define difficulty order: easy=0, medium=1, hard=2
            const difficultyOrder = { "easy": 0, "medium": 1, "hard": 2 };
            
            // Compare difficulty first
            if (difficultyOrder[a.difficulty] !== difficultyOrder[b.difficulty]) {
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            }
            
            // If difficulty is the same, compare mastery (lower mastery first)
            return a.mastery - b.mastery;
        });
        
        console.log("getMistakeBagSentences result:", sortedValidMistakeSentences);
        return sortedValidMistakeSentences;
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
            // Get all mistake bag sentences and sort them by difficulty and mastery
            const mistakeSentences = mistakeBag.sentences.map(text => this.getSentenceByText(text)).filter(Boolean);
            
            if (mistakeSentences.length > 0) {
                // Sort mistake sentences by difficulty (easy -> medium -> hard) first, then by mastery (ascending - lowest mastery first)
                const sortedMistakeSentences = mistakeSentences.sort((a, b) => {
                    // Define difficulty order: easy=0, medium=1, hard=2
                    const difficultyOrder = { "easy": 0, "medium": 1, "hard": 2 };
                    
                    // Compare difficulty first
                    if (difficultyOrder[a.difficulty] !== difficultyOrder[b.difficulty]) {
                        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                    }
                    
                    // If difficulty is the same, compare mastery (lower mastery first)
                    return a.mastery - b.mastery;
                });
                
                // Return the first (easiest and lowest mastery) sentence from the sorted mistake bag
                return sortedMistakeSentences[0];
            } else {
                // If no valid sentences in mistake bag, clean up and fallback to general list
                mistakeBag.sentences = [];
                this.saveData();
                return this.getNextLowMasterySentence();
            }
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
            // Sort all sentences by difficulty (easy -> medium -> hard) first, then by mastery (ascending - lowest mastery first)
            const sortedSentences = [...sentences].sort((a, b) => {
                // Define difficulty order: easy=0, medium=1, hard=2
                const difficultyOrder = { "easy": 0, "medium": 1, "hard": 2 };
                
                // Compare difficulty first
                if (difficultyOrder[a.difficulty] !== difficultyOrder[b.difficulty]) {
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                }
                
                // If difficulty is the same, compare mastery (lower mastery first)
                return a.mastery - b.mastery;
            });
            return sortedSentences[0];
        } else {
            // Sort available sentences by difficulty (easy -> medium -> hard) first, then by mastery (ascending - lowest mastery first)
            const sortedSentences = [...availableSentences].sort((a, b) => {
                // Define difficulty order: easy=0, medium=1, hard=2
                const difficultyOrder = { "easy": 0, "medium": 1, "hard": 2 };
                
                // Compare difficulty first
                if (difficultyOrder[a.difficulty] !== difficultyOrder[b.difficulty]) {
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                }
                
                // If difficulty is the same, compare mastery (lower mastery first)
                return a.mastery - b.mastery;
            });
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