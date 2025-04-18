
// Static questions collection for different categories
const staticQuestions = {
    tbh: [
      "What's your honest opinion of my profile picture, bro?",
      "What's the first thing you noticed about me, yaar?",
      "What's one thing you'd never guess about me, bhai?",
      "What's a superpower you think would suit me?",
      "What kind of animal do you think I'd be, paglu?",
      "What's a random thought you have about me?",
      "What's a place you think I'd love to visit, yaar?",
      "What's a hobby you could see me having?",
      "What's a movie character you think I'm most like, bro?",
      "What's a song that you think represents my vibe?",
      "What's one thing you'd ask me if we just met, bhai?",
      "What's a quality of mine that stands out to you?",
      "What's a funny nickname you could imagine me having, paglu?",
      "What's a book genre you think I'd enjoy?",
      "What's a type of food you think I'd love, yaar?",
      "What's a small detail about me you appreciate?",
      "What's a social cause you think I care about, bro?",
      "What's a type of humor you think I have?",
      "What's a type of weather that makes you think of me, yaar?",
      "What's a simple pleasure you think I enjoy?",
      "What's a skill you think I'm secretly good at, bhai?",
      "What's a topic you think I could talk about for hours?",
      "What's a way I could brighten someone's day, paglu?",
      "What's a lesson you think I've learned in life?",
      "What's a goal you could see me working towards, yaar?",
      "What's a way I express myself?",
      "What's a type of gift you think I'd appreciate, bro?",
      "What's a way I make people feel?",
      "What's a thing I'm probably good at procrastinating on, bhai?",
      "What's a trend you think I'd either love or hate?",
      "What's a small act of kindness you could see me doing, yaar?",
      "What's a way I might handle a stressful situation?",
      "What's a type of music you wouldn't expect me to like, paglu?",
      "What's a personality trait you think I value in others?",
      "What's a way I might celebrate good news, bro?",
      "What's a type of conversation I enjoy?",
      "What's a way I show I care about someone, yaar?",
      "What's a thing I'm likely to be passionate about?",
      "What's a way I might comfort a friend, bhai?",
      "What's a type of adventure you think I'd enjoy?",
      "What's a way I might spend a free afternoon, paglu?",
      "What's a type of pet you think would suit me?",
      "What's a way I might approach a new challenge, yaar?",
      "What's a type of art you think I'd appreciate?",
      "What's a way I might make a new friend, bro?",
      "What's a type of game you think I'd enjoy?",
      "What's a way I might handle a disagreement, bhai?",
      "What's a type of clothing style you think I have?",
      "What's a way I might inspire others, yaar?",
    ],
    confessions: [
      "I once accidentally walked into the wrong house, yaar.",
      "I have a secret talent that I'm too embarrassed to share, paglu.",
      "I've re-gifted a present without realizing who gave it to me, bro.",
      "I've pretended to understand something I totally didn't.",
      "I've eaten food off the floor when no one was looking, bhai.",
      "I've had a crush on someone my friends didn't approve of.",
      "I've lied about my age (even if it was just by a year), yaar.",
      "I've secretly read someone else's diary or messages.",
      "I've taken credit for someone else's idea, paglu.",
      "I've had a really embarrassing moment in public.",
      "I've snooped through someone's belongings, bro.",
      "I've cried over something really silly.",
      "I've had a vivid dream that felt incredibly real, bhai.",
      "I've accidentally sent a message to the wrong person.",
      "I've judged someone based on their appearance, yaar.",
      "I've pretended to be sick to get out of something.",
      "I've had a secret online persona, paglu.",
      "I've forgotten someone's name immediately after they told me.",
      "I've made up an excuse to avoid a social event, bro.",
      "I've secretly wished for something bad to happen to someone.",
      "I've had a moment where I completely blanked out, bhai.",
      "I've secretly enjoyed something that everyone else hated.",
      "I've said something I immediately regretted, yaar.",
      "I've had a moment of extreme clumsiness in public.",
      "I've secretly practiced a skill no one knows about, paglu.",
      "I've had a moment where I completely misunderstood something.",
      "I've secretly disliked a popular trend, bro.",
      "I've said something nice to someone I didn't really like.",
      "I've had a moment where I felt like an imposter, bhai.",
      "I've secretly hoped for someone else's failure.",
      "I've had a moment where I was completely starstruck, yaar.",
      "I've secretly made fun of someone (in my head).",
      "I've had a moment where I was incredibly proud of myself for something small, paglu.",
      "I've secretly wished I was someone else.",
      "I've had a moment where I felt like I knew what someone was thinking, bro.",
      "I've secretly been jealous of someone else's success.",
      "I've had a moment where I felt completely out of my depth, bhai.",
      "I've secretly looked up someone I haven't seen in years.",
      "I've had a moment where I felt like I was in a movie, yaar.",
      "I've secretly wished for a different life.",
      "I've had a moment where I said the wrong thing at the wrong time, paglu.",
      "I've secretly worried about something that turned out to be nothing.",
      "I've had a moment where I felt a strong connection with a stranger, bro.",
      "I've secretly hoped for a second chance at something.",
      "I've had a moment where I completely misread a situation, bhai.",
      "I've secretly felt like I don't belong.",
      "I've had a moment where I was surprisingly brave, yaar.",
      "I've secretly judged a book by its cover.",
      "I've had a moment where I learned a valuable lesson the hard way, paglu.",
    ],
    askMeAnything: [
      "What's a dream you're actively working towards, bhai?",
      "What's a small thing that always makes you smile, behan?",
      "What's a skill you're currently trying to improve, yaar?",
      "What's a place you've always wanted to visit and why?",
      "What's a food you could eat every day, paglu?",
      "What's a hobby that brings you joy?",
      "What's a book or movie that had a significant impact on you, bro?",
      "What's a piece of advice you've received that you found really helpful?",
      "What's a quality you admire most in others, yaar?",
      "What's a challenge you've overcome that you're proud of?",
      "What's a goal you hope to achieve in the next year, bhai?",
      "What's a simple pleasure you appreciate in life?",
      "What's a cause that you feel strongly about, behan?",
      "What's a type of music that always lifts your spirits?",
      "What's a funny story you love to tell, paglu?",
      "What's a valuable lesson you've learned about friendship?",
      "What's a way you like to relax and de-stress, bro?",
      "What's a creative outlet you enjoy?",
      "What's a thing you're looking forward to, yaar?",
      "What's a belief you hold strongly?",
      "What's a small act of kindness you've witnessed or experienced, bhai?",
      "What's a topic you find endlessly fascinating?",
      "What's a way you like to spend your weekends, behan?",
      "What's a childhood memory that stands out to you?",
      "What's a piece of technology you couldn't live without, paglu?",
      "What's a cultural experience that you found memorable?",
      "What's a way you stay motivated when things get tough, bro?",
      "What's a personal motto or mantra you live by?",
      "What's a type of weather you enjoy the most, yaar?",
      "What's a way you like to celebrate achievements?",
      "What's a skill you wish you had, bhai?",
      "What's a type of art that resonates with you?",
      "What's a way you like to learn new things, behan?",
      "What's a place that feels like home to you?",
      "What's a mistake you've learned from, paglu?",
      "What's a way you like to express your creativity?",
      "What's a tradition you cherish, bro?",
      "What's a type of outdoor activity you enjoy?",
      "What's a way you like to connect with others, yaar?",
      "What's a recent accomplishment you're proud of?",
      "What's a type of animal you find fascinating, bhai?",
      "What's a way you like to give back to your community?",
      "What's a subject you enjoyed learning about, behan?",
      "What's a way you like to challenge yourself?",
      "What's a type of game you enjoy playing, paglu?",
      "What's a way you like to organize your thoughts?",
      "What's a piece of history that interests you, bro?",
      "What's a way you like to wind down before bed?",
      "What's a type of plant or flower you find beautiful, yaar?",
    ],
    neverHaveIEver: [
      "Never have I ever pretended to be someone I'm not to impress someone, bro.",
      "Never have I ever sung karaoke in front of strangers, yaar.",
      "Never have I ever gone skinny dipping, paglu.",
      "Never have I ever lied about my age to get a discount.",
      "Never have I ever accidentally set off a fire alarm, bhai.",
      "Never have I ever had a crush on a fictional character.",
      "Never have I ever stalked someone's social media profile extensively, yaar.",
      "Never have I ever sent a risky text that I immediately regretted.",
      "Never have I ever cheated on a test or assignment, paglu.",
      "Never have I ever pretended to be sick to avoid something I didn't want to do.",
      "Never have I ever gotten lost in a foreign country, bro.",
      "Never have I ever pulled an all-nighter to finish something.",
      "Never have I ever had a wardrobe malfunction in public, bhai.",
      "Never have I ever tried to cook something and completely failed.",
      "Never have I ever accidentally called someone by the wrong name, yaar.",
      "Never have I ever laughed so hard that I cried.",
      "Never have I ever had a paranormal experience, paglu.",
      "Never have I ever faked an injury to get attention.",
      "Never have I ever had a secret admirer, bro.",
      "Never have I ever forgotten someone's birthday.",
      "Never have I ever been caught singing in the shower, bhai.",
      "Never have I ever had a really embarrassing autocorrect moment.",
      "Never have I ever tried to learn a new language and given up quickly, yaar.",
      "Never have I ever had a vivid dream that I thought was real.",
      "Never have I ever accidentally liked an old post on someone's social media, paglu.",
      "Never have I ever had a secret handshake with someone.",
      "Never have I ever tried to fix something and made it worse, bro.",
      "Never have I ever had a moment where I completely spaced out.",
      "Never have I ever tried to dance and realized I have no rhythm, bhai.",
      "Never have I ever had a conversation with an inanimate object.",
      "Never have I ever tried to do a DIY project and failed miserably, yaar.",
      "Never have I ever had a moment where I felt like I was in a movie.",
      "Never have I ever tried to speak in an accent that wasn't mine, paglu.",
      "Never have I ever had a funny encounter with a stranger.",
      "Never have I ever tried to take a sneaky picture of someone, bro.",
      "Never have I ever had a moment where I completely misheard something.",
      "Never have I ever tried to impress someone with a skill I didn't have, bhai.",
      "Never have I ever had a moment where I felt like I knew what someone was thinking.",
      "Never have I ever tried to give someone a secret signal that they didn't understand, yaar.",
      "Never have I ever had a moment where I tripped over my own feet.",
      "Never have I ever tried to write a poem or song and it was terrible, paglu.",
      "Never have I ever had a moment where I accidentally said something really awkward.",
      "Never have I ever tried to do a magic trick and failed, bro.",
      "Never have I ever had a moment where I felt like I was being watched.",
      "Never have I ever tried to impersonate someone, bhai.",
      "Never have I ever had a moment where I completely forgot what I was saying.",
      "Never have I ever tried to pull off a surprise that didn't go as planned, yaar.",
      "Never have I ever had a moment where I realized I was the butt of a joke.",
      "Never have I ever tried to win a silly competition and failed spectacularly, paglu.",
      "Never have I ever had a moment where I thought I saw a ghost.",
    ],
    threeWords: [
      "Describe me in three words, bhai.",
      "What three words come to mind when you think of me, behan?",
      "Sum me up in three words, yaar.",
      "Empathetic, insightful, witty",
      "Adventurous, curious, playful",
      "Reliable, supportive, understanding",
      "Creative, imaginative, innovative",
      "Confident, assertive, determined",
      "Gentle, kind, compassionate",
      "Honest, trustworthy, sincere",
      "Optimistic, cheerful, enthusiastic",
      "Calm, peaceful, serene",
      "Passionate, driven, focused",
      "Eloquent, articulate, thoughtful",
      "Energetic, lively, vibrant",
      "Resourceful, adaptable, clever",
      "Humorous, jovial, lighthearted",
      "Independent, self-reliant, strong",
      "Patient, tolerant, forgiving",
      "Respectful, considerate, polite",
      "Romantic, affectionate, loving",
      "Spontaneous, impulsive, daring",
      "Wise, perceptive, knowledgeable",
      "Artistic, expressive, sensitive",
      "Charismatic, charming, magnetic",
      "Disciplined, organized, meticulous",
      "Down-to-earth, grounded, practical",
      "Idealistic, hopeful, visionary",
      "Intuitive, perceptive, insightful",
      "Modest, humble, unassuming",
      "Nurturing, caring, supportive",
      "Open-minded, accepting, tolerant",
      "Principled, ethical, moral",
      "Reflective, introspective, thoughtful",
      "Sincere, genuine, authentic",
      "Sociable, outgoing, friendly",
      "Steadfast, resolute, unwavering",
      "Tolerant, understanding, accepting",
      "Unique, original, individual",
      "Versatile, flexible, adaptable",
      "Vivacious, spirited, animated",
      "Warmhearted, kind, generous",
      "Whimsical, fanciful, dreamy",
      "Ambitious, goal-oriented, driven",
      "Courageous, fearless, valiant",
      "Diligent, industrious, hardworking",
      "Gracious, courteous, refined",
      "Insightful, perceptive, astute",
      "Joyful, radiant, blissful",
      "Mindful, aware, present",
      "Prudent, cautious, wise",
      "Serene, tranquil, peaceful",
      "Vibrant, dynamic, energetic",
    ],
    wouldYouRather: [
      "Would you rather have the ability to pause time or rewind time, bro?",
      "Would you rather be able to talk to animals or understand any human language, yaar?",
      "Would you rather have a personal chef or a personal cleaner, bhai?",
      "Would you rather live for a thousand years or have ten extra lives?",
      "Would you rather be incredibly famous but constantly criticized or be relatively unknown but admired by a small group, paglu?",
      "Would you rather have perfect memory or perfect pitch?",
      "Would you rather be able to teleport anywhere or have super strength, bro?",
      "Would you rather know the answer to every question ever asked or be able to convince anyone of anything?",
      "Would you rather have a lifetime supply of your favorite food or never have to pay for travel again, yaar?",
      "Would you rather be the funniest person in the room or the smartest person in the room?",
      "Would you rather have the ability to heal any injury or the ability to predict the future, bhai?",
      "Would you rather live in a world without internet or a world without cars?",
      "Would you rather have a pet dragon or a pet unicorn, paglu?",
      "Would you rather be able to control the weather or control plants?",
      "Would you rather have all your clothes fit perfectly or always have the perfect temperature, bro?",
      "Would you rather be able to fall asleep instantly or wake up instantly refreshed?",
      "Would you rather have a house that cleans itself or a garden that takes care of itself, yaar?",
      "Would you rather be able to speak any language fluently or play any musical instrument perfectly?",
      "Would you rather have a job you love that doesn't pay well or a job you dislike that pays very well, bhai?",
      "Would you rather be able to see into the past or see into the future?",
      "Would you rather have a personal robot assistant or a self-driving car, paglu?",
      "Would you rather live in a world where everyone is always honest or a world where everyone is always kind?",
      "Would you rather have the ability to change your appearance at will or have the ability to change your voice at will, bro?",
      "Would you rather have a magic wand that can do small favors or a magic lamp with three wishes?",
      "Would you rather live in a world where it's always day or a world where it's always night, yaar?",
      "Would you rather have the ability to read people's emotions or their thoughts?",
      "Would you rather have a never-ending supply of books or a never-ending supply of movies and TV shows, bhai?",
      "Would you rather be able to slow down time or speed up time?",
      "Would you rather have a personal stylist or a personal fitness trainer, paglu?",
      "Would you rather live in a world where animals can talk or where plants can move?",
      "Would you rather have the ability to fly for short distances or breathe underwater for extended periods, bro?",
      "Would you rather have a device that can translate any language in real-time or a device that can locate anything you've lost?",
      "Would you rather live in a world where everyone has superpowers or no one does, yaar?",
      "Would you rather have a lifetime of good luck or a lifetime of wisdom?",
      "Would you rather be able to communicate with extraterrestrial life or discover a cure for a major disease, bhai?",
      "Would you rather have a home in the mountains or a home by the beach?",
      "Would you rather have the ability to perfectly mimic any sound or perfectly mimic any person's handwriting, paglu?",
      "Would you rather live in a world where all food tastes amazing but is unhealthy or all food is healthy but tastes bland?",
      "Would you rather have a job that allows you to travel the world or a job that allows you to stay in one place with a strong community, bro?",
      "Would you rather be able to control technology with your mind or have incredible athletic abilities?",
      "Would you rather have a detailed map of the entire universe or a detailed history of everything that has ever happened, yaar?",
      "Would you rather live in a world where everyone can sing beautifully or everyone can dance perfectly?",
      "Would you rather have the ability to instantly learn any skill or instantly master any subject, bhai?",
      "Would you rather have a loyal pet that can understand you perfectly or a wild animal that trusts you completely?",
      "Would you rather live in a world where gravity is slightly weaker or slightly stronger, paglu?",
      "Would you rather have a device that can predict the stock market or a device that can predict the outcome of sporting events?",
      "Would you rather have a best friend who is a celebrity or a best friend who is a genius scientist, bro?",
      "Would you rather live in a world where you never have to sleep or you never get sick?",
      "Would you rather have the ability to make anyone laugh or make anyone feel understood, yaar?",
      "Would you rather have a time machine that can only go to the past or one that can only go to the future?",
    ],
    thisOrThat: [
      "Sunrise or Sunset, bhai?",
      "Coffee or Tea, behan?",
      "Summer or Winter, yaar?",
      "Books or Movies, paglu?",
      "Sweet or Salty, bro?",
      "Early Bird or Night Owl?",
      "City Life or Country Life, yaar?",
      "Mountains or Beach, bhai?",
      "Indoors or Outdoors, behan?",
      "Fiction or Non-Fiction, paglu?",
      "Comedy or Drama, bro?",
      "Action or Romance, yaar?",
      "Pop Music or Rock Music, bhai?",
      "Classical Music or Electronic Music, behan?",
      "Pizza or Burgers, paglu?",
      "Pasta or Salad, bro?",
      "Cake or Pie, yaar?",
      "Dogs or Cats, bhai?",
      "Big Party or Small Gathering, behan?",
      "Traveling by Plane or Train, paglu?",
      "Learning by Reading or Doing, bro?",
      "Giving Gifts or Receiving Gifts, yaar?",
      "Public Speaking or Writing, bhai?",
      "Working Alone or Working in a Team, behan?",
      "Being a Leader or Being a Follower, paglu?",
      "Planning Ahead or Being Spontaneous, bro?",
      "Hot Weather or Cold Weather, yaar?",
      "Rainy Days or Sunny Days, bhai?",
      "Staying In or Going Out, behan?",
      "Talking or Listening, paglu?",
      "Texting or Calling, bro?",
      "Watching Sports or Playing Sports, yaar?",
      "Formal Wear or Casual Wear, bhai?",
      "Gold Jewelry or Silver Jewelry, behan?",
      "Big Family or Small Family, paglu?",
      "Having Many Acquaintances or a Few Close Friends, bro?",
      "Learning a New Language or Learning a Musical Instrument, yaar?",
      "Cooking at Home or Eating Out, bhai?",
      "Watching TV Shows or Watching Movies, behan?",
      "Playing Video Games or Playing Board Games, paglu?",
      "Being Rich and Unhappy or Being Poor and Happy, bro?",
      "Having Fame or Having Privacy, yaar?",
      "Being Able to Forgive or Being Able to Forget, bhai?",
      "Having Beauty or Having Intelligence, behan?",
      "Being Fearless or Being Empathetic, paglu?",
      "Having Control or Having Freedom, bro?",
      "Being Perfect or Being Authentic, yaar?",
      "Having Lots of Options or Having Simple Choices, bhai?",
      "Living in the Past or Living in the Future, behan?",
      "Knowing Everything or Understanding Everything, paglu?",
    ],
    opinions: [
      "What's your opinion on the importance of work-life balance, yaar?",
      "What are your thoughts on the future of artificial intelligence, paglu?",
      "What do you believe is the biggest challenge facing our society today, bro?",
      "What's your opinion on the role of social media in our lives?",
      "What are your thoughts on the concept of soulmates, bhai?",
      "What's your take on the importance of mental health awareness?",
      "What do you think about the impact of technology on education, yaar?",
      "What's your opinion on the value of travel and experiencing different cultures?",
      "What are your thoughts on the ethics of genetic engineering, paglu?",
      "What do you believe is the key to a happy and fulfilling life?",
      "What's your opinion on the current state of the environment, bro?",
      "What are your thoughts on the influence of celebrity culture?",
      "What do you believe is the most important quality in a leader, bhai?",
      "What's your opinion on the role of art and creativity in society?",
      "What are your thoughts on the future of work, yaar?",
      "What do you believe is the biggest misconception people have about you?",
      "What's your opinion on the concept of fate versus free will, paglu?",
      "What are your thoughts on the importance of lifelong learning?",
      "What do you believe is the biggest barrier to personal growth, bro?",
      "What's your opinion on the way news is reported today?",
      "What are your thoughts on the impact of globalization, bhai?",
      "What do you believe is the most important thing to teach children?",
      "What's your opinion on the use of animals in research, yaar?",
      "What are your thoughts on the meaning of success?",
      "What do you believe is the biggest threat to our planet, paglu?",
      "What's your opinion on the power of music?",
      "What are your thoughts on the importance of critical thinking, bro?",
      "What do you believe is the key to a strong relationship?",
      "What's your opinion on the value of traditions, bhai?",
      "What are your thoughts on the concept of privacy in the digital age?",
      "What do you believe is the most underrated skill, yaar?",
      "What's your opinion on the impact of advertising?",
      "What are your thoughts on the importance of empathy, paglu?",
      "What do you believe is the biggest adventure someone can take?",
      "What's your opinion on the role of government in society, bro?",
      "What are your thoughts on the evolution of communication?",
      "What do you believe is the most important lesson history teaches us, bhai?",
      "What's your opinion on the concept of beauty?",
      "What are your thoughts on the power of positive thinking, yaar?",
      "What do you believe is the biggest challenge in overcoming prejudice?",
      "What's your opinion on the balance between individual rights and collective responsibility, paglu?",
      "What are your thoughts on the future of transportation?",
      "What do you believe is the most important aspect of self-care, bro?",
      "What's your opinion on the role of humor in life?",
      "What are your thoughts on the impact of social movements, bhai?",
      "What do you believe is the biggest opportunity for innovation?",
      "What's your opinion on the value of failure, yaar?",
      "What are your thoughts on the concept of happiness?",
      "What do you believe is the most important contribution you can make to the world, paglu?",
    ],
    rateMe: [
      "Rate my sense of style from 1 to 10, bro.",
      "Rate my overall vibe, yaar.",
      "Rate how approachable I seem online, bhai.",
      "Rate my level of creativity based on my posts",
      "Rate my taste in music based on what I share, paglu?",
      "Rate how interesting my stories usually are",
      "Rate my ability to tell a good joke, bro.",
      "Rate how friendly I seem",
      "Rate my level of confidence, yaar.",
      "Rate how genuine I appear to be",
      "Rate my level of positivity, bhai.",
      "Rate how well I express myself",
      "Rate my level of intelligence (based on what you've seen), paglu?",
      "Rate how adventurous I seem",
      "Rate my level of maturity, bro.",
      "Rate how well I handle serious topics",
      "Rate my ability to offer good advice, yaar.",
      "Rate how open-minded I seem",
      "Rate my level of enthusiasm, bhai?",
      "Rate how well I fit in with current trends",
      "Rate my level of authenticity, paglu?",
      "Rate how much you enjoy my content",
      "Rate my ability to make you laugh, bro.",
      "Rate how relatable I seem",
      "Rate my level of passion for my interests, yaar.",
      "Rate how well I communicate my thoughts",
      "Rate my level of self-awareness, bhai?",
      "Rate how much you trust my opinions",
      "Rate my level of curiosity, paglu?",
      "Rate how well I handle criticism",
      "Rate my level of independence, bro.",
      "Rate how much you'd want to be friends with me",
      "Rate my ability to stay calm under pressure, yaar.",
      "Rate how well I support others",
      "Rate my level of optimism, bhai?",
      "Rate how well I handle disagreements",
      "Rate my level of empathy, paglu?",
      "Rate how much you admire my resilience",
      "Rate my level of sincerity, bro.",
      "Rate how well I adapt to new situations",
      "Rate my level of gratitude, yaar.",
      "Rate how well I motivate others",
      "Rate my level of patience, bhai?",
      "Rate how much you respect my values",
      "Rate my level of honesty, paglu?",
      "Rate how well I listen to others",
      "Rate my level of determination, bro.",
      "Rate how much you appreciate my presence online",
      "Rate my level of open-mindedness, yaar.",
      "Rate how well I inspire others",
    ],
    compliments: [
      "What's a compliment you think I deserve, bhai?",
      "Tell me something you genuinely appreciate about me, behan?",
      "What's a positive quality that comes to mind when you think of me, yaar?",
      "What's a small thing I do that makes a difference?",
      "What's a strength you see in me, paglu?",
      "What's something I should be proud of?",
      "What's a way I inspire you, bro?",
      "What's a kind thing you've noticed me do?",
      "What's a talent of mine that you admire, yaar?",
      "What's a way I make the world a little better?",
      "What's a positive change you've seen in me, bhai?",
      "What's a way I bring joy to others?",
      "What's a goal you think I'm capable of achieving, behan?",
      "What's a way I show kindness to myself?",
      "What's a unique quality that makes me stand out, paglu?",
      "What's a way I make you feel good?",
      "What's a positive impact I've had on you, bro?",
      "What's a way I demonstrate resilience?",
      "What's a valuable lesson you've learned from me, yaar?",
      "What's a way I make you smile?",
      "What's a way I show my intelligence, bhai?",
      "What's a way I demonstrate my creativity?",
      "What's a way I show my passion, behan?",
      "What's a way I show my determination?",
      "What's a way I show my empathy, paglu?",
      "What's a way I show my honesty?",
      "What's a way I show my loyalty, bro?",
      "What's a way I show my supportiveness?",
      "What's a way I show my understanding, yaar?",
      "What's a way I show my patience?",
      "What's a way I show my respect, bhai?",
      "What's a way I show my gratitude?",
      "What's a way I show my forgiveness, behan?",
      "What's a way I show my optimism?",
      "What's a way I show my courage, paglu?",
      "What's a way I show my authenticity?",
      "What's a way I show my generosity, bro?",
      "What's a way I show my thoughtfulness?",
      "What's a way I show my warmth, yaar?",
      "What's a way I show my humor?",
      "What's a way I show my grace, bhai?",
      "What's a way I show my humility?",
      "What's a way I show my strength, behan?",
      "What's a way I show my vulnerability?",
      "What's a way I show my wisdom, paglu?",
      "What's a way I show my adaptability?",
      "What's a way I show my independence, bro?",
      "What's a way I show my leadership?",
      "What's a way I show my collaboration, yaar?",
      "What's a way I show my mindfulness?",
    ]
  };
  

// Cache interface
interface CacheEntry {
    response: string;
    timestamp: number;
  }
  
  // Response cache with 1-minute expiry
  class ResponseCache {
    private cache: Map<string, CacheEntry[]>;
    private readonly CACHE_EXPIRY = 60000; // 1 minute in milliseconds
    private readonly MAX_CACHED_RESPONSES = 10; // Maximum number of responses to cache per question
  
    constructor() {
      this.cache = new Map();
    }
  
    private cleanExpiredEntries(questionId: string) {
      const now = Date.now();
      const entries = this.cache.get(questionId);
      if (entries) {
        const validEntries = entries.filter(
          entry => now - entry.timestamp < this.CACHE_EXPIRY
        );
        if (validEntries.length === 0) {
          this.cache.delete(questionId);
        } else {
          this.cache.set(questionId, validEntries);
        }
      }
    }
  
    isResponseRecent(questionId: string, response: string): boolean {
      this.cleanExpiredEntries(questionId);
      const entries = this.cache.get(questionId);
      return entries?.some(entry => entry.response === response) ?? false;
    }
  
    addResponse(questionId: string, response: string) {
      this.cleanExpiredEntries(questionId);
      const entries = this.cache.get(questionId) || [];
      entries.push({ response, timestamp: Date.now() });
      
      // Keep only the most recent responses if we exceed the maximum
      if (entries.length > this.MAX_CACHED_RESPONSES) {
        entries.shift(); // Remove the oldest entry
      }
      
      this.cache.set(questionId, entries);
    }
  }
  
  // Create a singleton instance of the cache
  const responseCache = new ResponseCache();
  
  
  // Function to get a random item from an array
  function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  // Function to get static question based on title
  function getStaticQuestion(title: string): string | null {
    const normalizedTitle = title.toLowerCase().replace(/\s+/g, '');
    const categoryMap: { [key: string]: string[] } = {
      'tbh': staticQuestions.tbh,
      'confessions': staticQuestions.confessions,
      'askmeanything': staticQuestions.askMeAnything,
      'neverhaveiever': staticQuestions.neverHaveIEver,
      '3words': staticQuestions.threeWords
    };
  
    const questions = categoryMap[normalizedTitle];
    return questions ? getRandomItem(questions) : null;
  }

  export { getStaticQuestion, responseCache };