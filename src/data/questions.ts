import type { AgeGroup, Question } from '../types';

export const QUESTIONS: Record<AgeGroup, Question[]> = {
  elementary: [
    {
      text: "If you had a completely free afternoon, what would you most want to do?",
      options: [
        { text: "Invite a friend over so nobody is left out", aptitude: "Helper" },
        { text: "Read a book about space, animals, or how things work", aptitude: "Thinker" },
        { text: "Paint, draw, or make up a new game", aptitude: "Creator" },
        { text: "Organize my room or sort my toy collection", aptitude: "Organizer" }
      ]
    },
    {
      text: "When you have to do a group project for class, what is your favorite job?",
      options: [
        { text: "Doing the research and finding the facts", aptitude: "Thinker" },
        { text: "Decorating the poster or making the presentation look good", aptitude: "Creator" },
        { text: "Being the leader and presenting it to the class", aptitude: "Persuader" },
        { text: "Making sure everyone finishes their part on time", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you saw a problem at school, how would you fix it?",
      options: [
        { text: "Use my hands and tools to fix what is broken", aptitude: "Builder" },
        { text: "Comfort anyone who is upset and help them feel better", aptitude: "Helper" },
        { text: "Convince the principal to let us start a new program", aptitude: "Persuader" },
        { text: "Write down a new set of rules so it doesn't happen again", aptitude: "Organizer" }
      ]
    },
    {
      text: "Where would you most want to go on a school field trip?",
      options: [
        { text: "A science museum with interactive experiments", aptitude: "Thinker" },
        { text: "An art museum or theater performance", aptitude: "Creator" },
        { text: "A working farm, zoo, or factory", aptitude: "Builder" },
        { text: "A charity center where we can help people in need", aptitude: "Helper" }
      ]
    },
    {
      text: "When you play a game with friends, what do you like to do?",
      options: [
        { text: "Make up a completely new game from my imagination", aptitude: "Creator" },
        { text: "Be the team captain and pick the strategy", aptitude: "Persuader" },
        { text: "Keep track of the score and make sure rules are followed", aptitude: "Organizer" },
        { text: "Make sure everyone is included and having fun", aptitude: "Helper" }
      ]
    },
    {
      text: "If you could have any magical power, which would you choose?",
      options: [
        { text: "The power to talk to animals and control plants", aptitude: "Builder" },
        { text: "The power to instantly sort and tidy anything I touch", aptitude: "Organizer" },
        { text: "The power to create illusions and change colors", aptitude: "Creator" },
        { text: "The power to heal injuries and take away sadness", aptitude: "Helper" }
      ]
    },
    {
      text: "If you had to pick a weekend chore, which is the best one?",
      options: [
        { text: "Running a lemonade stand to make money", aptitude: "Persuader" },
        { text: "Color-coding my bookshelf or organizing the pantry", aptitude: "Organizer" },
        { text: "Helping fix a broken fence or pulling weeds", aptitude: "Builder" },
        { text: "Doing a science kit experiment for extra credit", aptitude: "Thinker" }
      ]
    },
    {
      text: "Which after-school club sounds the most fun?",
      options: [
        { text: "The school play or art club", aptitude: "Creator" },
        { text: "The peer mediation or volunteer club", aptitude: "Helper" },
        { text: "The student council or debate club", aptitude: "Persuader" },
        { text: "The mathletes or chess club", aptitude: "Thinker" }
      ]
    },
    {
      text: "What would you bring to Show and Tell?",
      options: [
        { text: "A cool robot or model airplane I built", aptitude: "Builder" },
        { text: "A rock collection I sorted and classified", aptitude: "Thinker" },
        { text: "A song I wrote or a painting I made", aptitude: "Creator" },
        { text: "A detailed chart of my daily routine", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you got lost in the woods with friends, what would be your job?",
      options: [
        { text: "Building a shelter out of branches", aptitude: "Builder" },
        { text: "Figuring out which way is North using the sun", aptitude: "Thinker" },
        { text: "Keeping everyone calm and making sure they are okay", aptitude: "Helper" },
        { text: "Taking charge and rationing our snacks", aptitude: "Persuader" }
      ]
    },
    {
      text: "If you had to pick a grown-up job right now, what would it be?",
      options: [
        { text: "An inventor or mechanic", aptitude: "Builder" },
        { text: "An artist, musician, or writer", aptitude: "Creator" },
        { text: "A teacher, doctor, or nurse", aptitude: "Helper" },
        { text: "A boss running a big business", aptitude: "Persuader" }
      ]
    },
    {
      text: "What is your favorite type of puzzle or brain game?",
      options: [
        { text: "A science mystery or math riddle", aptitude: "Thinker" },
        { text: "A creative story puzzle where I invent the ending", aptitude: "Creator" },
        { text: "A game where I have to outsmart an opponent", aptitude: "Persuader" },
        { text: "Sorting things perfectly into the right categories", aptitude: "Organizer" }
      ]
    },
    {
      text: "If your favorite toy broke, what is the first thing you do?",
      options: [
        { text: "Take it apart to see if I can fix the gears", aptitude: "Builder" },
        { text: "Look up a video on exactly how it works", aptitude: "Thinker" },
        { text: "Ask a friend if they want to play with something else", aptitude: "Helper" },
        { text: "Put the broken pieces in a designated repair box", aptitude: "Organizer" }
      ]
    },
    {
      text: "What is the best part of recess?",
      options: [
        { text: "Helping a younger student tie their shoes", aptitude: "Helper" },
        { text: "Convincing the group to play a brand new game", aptitude: "Persuader" },
        { text: "Keeping the playground equipment perfectly organized", aptitude: "Organizer" },
        { text: "Climbing to the very top of the jungle gym", aptitude: "Builder" }
      ]
    },
    {
      text: "What kind of books do you like reading the most?",
      options: [
        { text: "Books about how things are made or surviving in the wild", aptitude: "Builder" },
        { text: "Mysteries, encyclopedias, or science books", aptitude: "Thinker" },
        { text: "Fantasy, poetry, or big adventure stories", aptitude: "Creator" },
        { text: "Biographies about famous leaders and business owners", aptitude: "Persuader" }
      ]
    }
  ],
  jrHigh: [
    {
      text: "If you could choose any elective class, which would it be?",
      options: [
        { text: "Woodshop, metalshop, or robotics", aptitude: "Builder" },
        { text: "Advanced coding or experimental science", aptitude: "Thinker" },
        { text: "Drama, graphic design, or creative writing", aptitude: "Creator" },
        { text: "Peer tutoring or student mentoring", aptitude: "Helper" }
      ]
    },
    {
      text: "When assigned a group project, what is your ideal role?",
      options: [
        { text: "Analyzing the data and doing the deep research", aptitude: "Thinker" },
        { text: "Designing the slides and making the presentation pop", aptitude: "Creator" },
        { text: "Being the main speaker and pitching it to the class", aptitude: "Persuader" },
        { text: "Creating the timeline and keeping the group on schedule", aptitude: "Organizer" }
      ]
    },
    {
      text: "How would you prefer to spend a free Saturday?",
      options: [
        { text: "Fixing up a bike or building something in the garage", aptitude: "Builder" },
        { text: "Volunteering at an animal shelter or local charity", aptitude: "Helper" },
        { text: "Selling old clothes online or starting a side hustle", aptitude: "Persuader" },
        { text: "Deep cleaning and re-organizing my bedroom closet", aptitude: "Organizer" }
      ]
    },
    {
      text: "Which of these school field trips sounds the most interesting?",
      options: [
        { text: "A tour of a high-tech university science lab", aptitude: "Thinker" },
        { text: "Visiting an art gallery or watching a Broadway play", aptitude: "Creator" },
        { text: "A behind-the-scenes tour of a manufacturing plant", aptitude: "Builder" },
        { text: "Visiting a community center to serve meals", aptitude: "Helper" }
      ]
    },
    {
      text: "Which school club would you most likely join?",
      options: [
        { text: "The peer mentoring or community service club", aptitude: "Helper" },
        { text: "The debate team or model UN", aptitude: "Persuader" },
        { text: "The yearbook committee or event planning squad", aptitude: "Organizer" },
        { text: "The photography or digital media club", aptitude: "Creator" }
      ]
    },
    {
      text: "If you have to read a book for fun, what genre do you pick?",
      options: [
        { text: "Sci-fi or manuals on how to build things", aptitude: "Builder" },
        { text: "Non-fiction mysteries or psychology books", aptitude: "Thinker" },
        { text: "Fantasy novels or books of poetry", aptitude: "Creator" },
        { text: "Autobiographies of famous entrepreneurs or leaders", aptitude: "Persuader" }
      ]
    },
    {
      text: "When your friends are arguing, how do you handle it?",
      options: [
        { text: "I analyze the facts and point out who is logically correct", aptitude: "Thinker" },
        { text: "I mediate their feelings and help them apologize", aptitude: "Helper" },
        { text: "I argue my side passionately and try to win the debate", aptitude: "Persuader" },
        { text: "I refer to the rules or suggest a structured compromise", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you were to design a mobile app, what would it do?",
      options: [
        { text: "A tool that connects volunteers with neighbors who need help", aptitude: "Helper" },
        { text: "A complex puzzle or brain-training game", aptitude: "Thinker" },
        { text: "A digital canvas for drawing or making music", aptitude: "Creator" },
        { text: "A highly customizable calendar and study planner", aptitude: "Organizer" }
      ]
    },
    {
      text: "Your school is doing a fundraiser. What is your job?",
      options: [
        { text: "Building the physical booth or set for the event", aptitude: "Builder" },
        { text: "Designing the flyers and promotional posters", aptitude: "Creator" },
        { text: "Pitching the idea to teachers and hyping up the crowd", aptitude: "Persuader" },
        { text: "Managing the cash box and tracking the budget", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you could instantly master a new skill, what would it be?",
      options: [
        { text: "Welding or advanced carpentry", aptitude: "Builder" },
        { text: "A complex programming language like Python", aptitude: "Thinker" },
        { text: "Public speaking and negotiation", aptitude: "Persuader" },
        { text: "Advanced spreadsheet and data management", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you could choose your ultimate summer vacation, it would be:",
      options: [
        { text: "Camping, hiking, and surviving in the wilderness", aptitude: "Builder" },
        { text: "Going on a historical or scientific museum tour", aptitude: "Thinker" },
        { text: "Attending a creative writing or film-making retreat", aptitude: "Creator" },
        { text: "Going on a mission trip to help build homes for people", aptitude: "Helper" }
      ]
    },
    {
      text: "At a career fair, which booth do you visit first?",
      options: [
        { text: "The engineering and robotics technology booth", aptitude: "Builder" },
        { text: "The teaching, counseling, and social work booth", aptitude: "Helper" },
        { text: "The business management and law booth", aptitude: "Persuader" },
        { text: "The accounting and administrative logistics booth", aptitude: "Organizer" }
      ]
    },
    {
      text: "What would be your ideal summer job?",
      options: [
        { text: "Being a camp counselor helping younger kids", aptitude: "Helper" },
        { text: "Working in retail sales to practice selling things", aptitude: "Persuader" },
        { text: "Doing data entry or filing documents in an office", aptitude: "Organizer" },
        { text: "Working in landscaping or outdoor maintenance", aptitude: "Builder" }
      ]
    },
    {
      text: "When you get a brand new piece of technology, what do you do?",
      options: [
        { text: "Examine the hardware and see how it was manufactured", aptitude: "Builder" },
        { text: "Dig into the settings and understand the software logic", aptitude: "Thinker" },
        { text: "Customize the interface to make it look visually stunning", aptitude: "Creator" },
        { text: "Teach my friends or family how to use it patiently", aptitude: "Helper" }
      ]
    },
    {
      text: "If you started a YouTube channel, what would it be about?",
      options: [
        { text: "Creating animated short films or music covers", aptitude: "Creator" },
        { text: "Exploring deep scientific theories or history mysteries", aptitude: "Thinker" },
        { text: "Giving advice on how to be confident and make money", aptitude: "Persuader" },
        { text: "Showing people how to perfectly organize their life", aptitude: "Organizer" }
      ]
    }
  ],
  highSchool: [
    {
      text: "For your senior project, which option sounds the best?",
      options: [
        { text: "Rebuilding a car engine or constructing a greenhouse", aptitude: "Builder" },
        { text: "Conducting a psychology experiment and analyzing the data", aptitude: "Thinker" },
        { text: "Writing, directing, and starring in an original play", aptitude: "Creator" },
        { text: "Organizing a massive charity drive for the community", aptitude: "Helper" }
      ]
    },
    {
      text: "In a corporate team setting, what is your strongest asset?",
      options: [
        { text: "Analyzing complex data to find the root of a problem", aptitude: "Thinker" },
        { text: "Reading the room and making sure every teammate is heard", aptitude: "Helper" },
        { text: "Pitching our ideas to the boss or a client", aptitude: "Persuader" },
        { text: "Managing the timeline and ensuring compliance", aptitude: "Organizer" }
      ]
    },
    {
      text: "How would you most likely spend your free time on the weekend?",
      options: [
        { text: "Hiking, woodworking, or fixing electronics", aptitude: "Builder" },
        { text: "Volunteering at a local hospital or clinic", aptitude: "Helper" },
        { text: "Networking or working a part-time sales job", aptitude: "Persuader" },
        { text: "Budgeting my finances or planning my week", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you had to pick a college major today, what broad category fits you?",
      options: [
        { text: "Engineering, Mechanics, or Agriculture", aptitude: "Builder" },
        { text: "Computer Science, Physics, or Mathematics", aptitude: "Thinker" },
        { text: "Fine Arts, Architecture, or Media Studies", aptitude: "Creator" },
        { text: "Social Work, Nursing, or Education", aptitude: "Helper" }
      ]
    },
    {
      text: "If you were on the board of a club, what position do you want?",
      options: [
        { text: "Secretary/Treasurer (Managing records and money)", aptitude: "Organizer" },
        { text: "President (Leading meetings and being the spokesperson)", aptitude: "Persuader" },
        { text: "Creative Director (Managing the brand and marketing visuals)", aptitude: "Creator" },
        { text: "Technical Director (Handling the equipment and logistics)", aptitude: "Builder" }
      ]
    },
    {
      text: "What is your ideal plan for the summer?",
      options: [
        { text: "Working a hands-on construction or trades apprenticeship", aptitude: "Builder" },
        { text: "Being a research assistant in a university lab", aptitude: "Thinker" },
        { text: "Working as a camp counselor or youth mentor", aptitude: "Helper" },
        { text: "Doing a corporate internship in sales or marketing", aptitude: "Persuader" }
      ]
    },
    {
      text: "When faced with a difficult problem, how do you usually react?",
      options: [
        { text: "I try a hands-on approach and physically tinker with it", aptitude: "Builder" },
        { text: "I hit the books or the internet to research the underlying cause", aptitude: "Thinker" },
        { text: "I brainstorm five different wild ideas to get around it", aptitude: "Creator" },
        { text: "I consult the rulebook or look at the historical data", aptitude: "Organizer" }
      ]
    },
    {
      text: "Which of these pairs of subjects do you enjoy the most?",
      options: [
        { text: "Psychology & Education", aptitude: "Helper" },
        { text: "Literature & Studio Art", aptitude: "Creator" },
        { text: "Business Management & Debate", aptitude: "Persuader" },
        { text: "Accounting & Statistics", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you are hosting a large social event, what are you doing?",
      options: [
        { text: "Setting up the heavy equipment, tables, and sound system", aptitude: "Builder" },
        { text: "Checking in with guests to make sure everyone feels welcome", aptitude: "Helper" },
        { text: "Working the room, making connections, and giving a toast", aptitude: "Persuader" },
        { text: "Managing the guest list, catering schedule, and budget", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you and your friends created a tech startup, what is your role?",
      options: [
        { text: "Running customer support and listening to user feedback", aptitude: "Helper" },
        { text: "Designing the beautiful user interface and logo", aptitude: "Creator" },
        { text: "Seeking out investors and marketing the app", aptitude: "Persuader" },
        { text: "Doing QA testing, writing documentation, and payroll", aptitude: "Organizer" }
      ]
    },
    {
      text: "When you read the news, which section do you check first?",
      options: [
        { text: "Science, Tech, and new discoveries", aptitude: "Thinker" },
        { text: "Arts, Culture, and entertainment", aptitude: "Creator" },
        { text: "Politics, Business, and world leaders", aptitude: "Persuader" },
        { text: "Economy, Markets, and data trends", aptitude: "Organizer" }
      ]
    },
    {
      text: "What does your ideal future workspace look like?",
      options: [
        { text: "A community clinic, classroom, or anywhere I can support people", aptitude: "Helper" },
        { text: "A quiet, state-of-the-art laboratory or library", aptitude: "Thinker" },
        { text: "A vibrant, messy, collaborative art studio", aptitude: "Creator" },
        { text: "A highly structured, clean, and quiet corporate office", aptitude: "Organizer" }
      ]
    },
    {
      text: "If you had to mentor someone, what would you want to teach them?",
      options: [
        { text: "How to physically fix or build something", aptitude: "Builder" },
        { text: "How to understand a complex mathematical theory", aptitude: "Thinker" },
        { text: "How to cope with their emotions and communicate better", aptitude: "Helper" },
        { text: "How to negotiate and interview for a high-paying job", aptitude: "Persuader" }
      ]
    },
    {
      text: "Where would you most like to volunteer your time?",
      options: [
        { text: "Habitat for Humanity (building houses)", aptitude: "Builder" },
        { text: "Tutoring students in advanced math or science", aptitude: "Thinker" },
        { text: "Teaching art therapy to hospitalized children", aptitude: "Creator" },
        { text: "Managing the logistics and donations at a food bank", aptitude: "Organizer" }
      ]
    },
    {
      text: "What kind of legacy would you most want to leave behind?",
      options: [
        { text: "A physical monument or invention that lasts forever", aptitude: "Builder" },
        { text: "A scientific breakthrough that changes how we see the world", aptitude: "Thinker" },
        { text: "A masterpiece of art, music, or literature", aptitude: "Creator" },
        { text: "A highly successful, global company that I built from scratch", aptitude: "Persuader" }
      ]
    }
  ]
};
