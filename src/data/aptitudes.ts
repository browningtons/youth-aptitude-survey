import { Wrench, Brain, Palette, HeartHandshake, Megaphone, ClipboardList } from 'lucide-react';
import type { Aptitude, AptitudeInfo } from '../types';

export const APTITUDE_DETAILS: Record<Aptitude, AptitudeInfo> = {
  Builder: {
    name: "The Builder",
    icon: Wrench,
    description: "You are a practical, hands-on problem solver. You enjoy working with tools, machinery, plants, or animals. Instead of just talking about theories, you prefer to take action and love seeing tangible, real-world results from your hard work.",
    strengths: ["Practicality", "Mechanical Ability", "Physical Coordination", "Problem Solving"],
    careers: [
      {
        title: "Mechanical Engineer",
        courses: [
          { name: "Statics & Dynamics", concept: "How things move and balance" },
          { name: "Thermodynamics", concept: "How heat and energy work" },
          { name: "Fluid Mechanics", concept: "How liquids and gases flow" },
          { name: "Materials Science", concept: "What makes materials break" },
          { name: "Heat Transfer", concept: "Managing and moving heat" },
          { name: "Machine Design", concept: "Inventing and building real parts" }
        ]
      },
      {
        title: "Structural Engineer",
        courses: [
          { name: "Structural Analysis", concept: "Finding how much weight it holds" },
          { name: "Reinforced Concrete", concept: "How building materials bend or break" },
          { name: "Steel Design", concept: "Understanding pushing and pulling forces" },
          { name: "Geotechnical Eng.", concept: "How dirt and rocks support buildings" },
          { name: "Earthquake Eng.", concept: "Making buildings earthquake-proof" },
          { name: "Matrix Analysis", concept: "Using computers to test designs" }
        ]
      },
      {
        title: "Wildlife Conservationist",
        courses: [
          { name: "Population Ecology", concept: "Tracking animal populations" },
          { name: "Conservation Biology", concept: "How nature works together" },
          { name: "Wildlife Management", concept: "Fixing and protecting animal homes" },
          { name: "GIS Mapping", concept: "Making digital nature maps" },
          { name: "Zoology", concept: "How animal bodies work" },
          { name: "Environmental Policy", concept: "Understanding laws that protect nature" }
        ]
      },
      {
        title: "Construction Manager",
        courses: [
          { name: "Const. Estimating", concept: "Guessing exactly how much a building costs" },
          { name: "Project Scheduling", concept: "Planning the daily work schedule" },
          { name: "BIM Modeling", concept: "Drawing the building in 3D" },
          { name: "Construction Law", concept: "Making fair business deals" },
          { name: "OSHA Safety", concept: "Keeping workers safe from accidents" },
          { name: "Structural Systems", concept: "Making sure the building stands up" }
        ]
      },
      {
        title: "Biomedical Engineer",
        courses: [
          { name: "Biomechanics", concept: "How human bodies move like machines" },
          { name: "Biomaterials", concept: "Making parts the body won't reject" },
          { name: "Medical Imaging", concept: "Looking inside the body with machines" },
          { name: "Physiology", concept: "How human organs work" },
          { name: "Bioinstrumentation", concept: "Building tools for doctors" },
          { name: "Quant. Physiology", concept: "Using math to track health" }
        ]
      },
      {
        title: "Civil Engineer",
        courses: [
          { name: "Fluid Mechanics", concept: "Moving water safely through cities" },
          { name: "Transportation Eng.", concept: "Designing safe roads and bridges" },
          { name: "Soil Mechanics", concept: "Building on safe, solid ground" },
          { name: "Environmental Eng.", concept: "Keeping cities clean and safe" },
          { name: "Surveying", concept: "Measuring the land perfectly" },
          { name: "Water Resources", concept: "Building dams and water pipes" }
        ]
      }
    ],
    nextSteps: {
      elementary: ["Focus on introductory math, measurement, and spatial reasoning classes", "Participate in hands-on STEM and physical science labs", "Take introductory coding and physical computing (like micro:bit)"],
      jrHigh: ["Enroll in pre-algebra, geometry, and earth science courses", "Take Shop, Computer-Aided Design (CAD), or introductory drafting electives", "Study basic physics and structural principles in science class"],
      highSchool: ["Take AP Physics and advanced Calculus tracks", "Pursue a B.S. in Mechanical Engineering, Civil Engineering, or Construction Management", "Obtain OSHA certification or complete a vocational trade apprenticeship"]
    }
  },
  Thinker: {
    name: "The Thinker",
    icon: Brain,
    description: "You are driven by curiosity and a deep desire to understand how the world works. You love analyzing data, solving complex puzzles, and conducting research. You are logical, precise, and enjoy intellectual challenges more than anything else.",
    strengths: ["Analytical Thinking", "Observation Skills", "Logic", "Scientific Reasoning"],
    careers: [
      {
        title: "Bioinformatics Scientist",
        courses: [
          { name: "Computational Bio.", concept: "Writing smart math for computers" },
          { name: "Genomics", concept: "Reading and understanding DNA" },
          { name: "Python for Data", concept: "Making computers do the hard work" },
          { name: "Statistical Genetics", concept: "Guessing traits based on family history" },
          { name: "Machine Learning", concept: "Teaching computers to guess answers" },
          { name: "Molecular Biology", concept: "Learning how tiny cells are built" }
        ]
      },
      {
        title: "Aerospace Engineer",
        courses: [
          { name: "Aerodynamics", concept: "How air pushes and pulls objects" },
          { name: "Flight Mechanics", concept: "Calculating the perfect flight path" },
          { name: "Propulsion Systems", concept: "Making rockets go incredibly fast" },
          { name: "Orbital Mechanics", concept: "How things float and move in space" },
          { name: "Aerospace Structures", concept: "How metals handle extreme pressure" },
          { name: "Control Systems", concept: "Teaching machines how to fly themselves" }
        ]
      },
      {
        title: "Data Scientist",
        courses: [
          { name: "Data Structures", concept: "Organizing massive lists of information" },
          { name: "Applied Statistics", concept: "Finding hidden math patterns" },
          { name: "ML Algorithms", concept: "Finding trends no one else sees" },
          { name: "Database Systems", concept: "Asking computers the right questions" },
          { name: "Data Visualization", concept: "Drawing beautiful pictures of data" },
          { name: "Deep Learning", concept: "Making computers think like humans" }
        ]
      },
      {
        title: "Epidemiologist",
        courses: [
          { name: "Prin. of Epidemiology", concept: "Finding where diseases start" },
          { name: "Biostatistics", concept: "Counting who gets sick and why" },
          { name: "Infectious Disease", concept: "How germs spread between people" },
          { name: "Public Health", concept: "Watching over the community's health" },
          { name: "Global Health", concept: "Understanding world health rules" },
          { name: "Study Design", concept: "How to run a really good science study" }
        ]
      },
      {
        title: "Quantum Physicist",
        courses: [
          { name: "Quantum Mechanics", concept: "How the tiniest particles act weirdly" },
          { name: "Electromagnetism", concept: "Invisible forces like magnets and light" },
          { name: "Statistical Mechanics", concept: "How heat and tiny pieces move" },
          { name: "Solid State Physics", concept: "How crystals and metals are built" },
          { name: "Particle Physics", concept: "The hidden rules of the universe" },
          { name: "Mathematical Methods", concept: "Really advanced, complex math" }
        ]
      },
      {
        title: "Cognitive Neuroscientist",
        courses: [
          { name: "Cognitive Psych.", concept: "How we remember and learn things" },
          { name: "Neuroanatomy", concept: "The physical parts of the brain" },
          { name: "Psychopharmacology", concept: "How medicine changes our minds" },
          { name: "Sensation/Perception", concept: "How we see, hear, and feel the world" },
          { name: "Behavioral Neuro.", concept: "Why our brains make us do things" },
          { name: "Neuroimaging", concept: "Taking pictures of people's thoughts" }
        ]
      }
    ],
    nextSteps: {
      elementary: ["Focus on advanced math sequencing and reading comprehension", "Participate in accelerated science and experimental method programs", "Take introductory logic, coding, or critical thinking electives"],
      jrHigh: ["Enroll in advanced life sciences, chemistry, and pre-algebra courses", "Take introductory computer science and algorithmic thinking classes", "Participate in academic decathlons, Science Olympiad, or math competitions"],
      highSchool: ["Take AP Chemistry, AP Biology, and AP Computer Science A", "Plan for a B.S. in Computer Science, Physics, Data Science, or Pre-Med", "Apply for university-sponsored high school research fellowships"]
    }
  },
  Creator: {
    name: "The Creator",
    icon: Palette,
    description: "You are highly expressive, original, and independent. You see the world as a canvas and love bringing new ideas to life through art, writing, music, performance, or design. You value freedom and creativity over strict rules and routines.",
    strengths: ["Imagination", "Innovation", "Self-Expression", "Adaptability"],
    careers: [
      {
        title: "UX/UI Product Designer",
        courses: [
          { name: "Human-Computer Int.", concept: "How people think when they click" },
          { name: "Info. Architecture", concept: "Putting menus in the perfect spot" },
          { name: "Visual Design", concept: "Making apps look really pretty" },
          { name: "Usability Testing", concept: "Watching people use the app to fix it" },
          { name: "Interaction Design", concept: "Drawing the blueprint of the website" },
          { name: "Web Technologies", concept: "The basic code that builds the website" }
        ]
      },
      {
        title: "Architect",
        courses: [
          { name: "Architectural History", concept: "How buildings changed over time" },
          { name: "Design Studio", concept: "Making rooms feel good to be inside" },
          { name: "Building Tech.", concept: "How buildings are actually put together" },
          { name: "Environmental Sys.", concept: "Making eco-friendly, green buildings" },
          { name: "Structural Concepts", concept: "Making sure the roof doesn't fall" },
          { name: "Urban Planning", concept: "Making sure it fits the neighborhood" }
        ]
      },
      {
        title: "Industrial Designer",
        courses: [
          { name: "3D Prototyping", concept: "Making real 3D models you can hold" },
          { name: "Materials & Mfg.", concept: "Knowing what factories can actually build" },
          { name: "Ergonomics", concept: "Making things fit human hands perfectly" },
          { name: "Design Sketching", concept: "Drawing your new ideas quickly" },
          { name: "CAD Systems", concept: "Drawing in 3D on the computer" },
          { name: "Design Research", concept: "Figuring out what people want to buy" }
        ]
      },
      {
        title: "Art Director",
        courses: [
          { name: "Typography", concept: "Picking the best letters and fonts" },
          { name: "Visual Comm.", concept: "Telling a story using only pictures" },
          { name: "Brand Identity", concept: "Creating a company's 'vibe' or style" },
          { name: "Color Theory", concept: "Using colors to make people feel happy/sad" },
          { name: "Digital Media", concept: "Making cool videos and social posts" },
          { name: "Advertising Strategy", concept: "Figuring out how to stand out from the crowd" }
        ]
      },
      {
        title: "Cinematographer",
        courses: [
          { name: "Cinematography", concept: "Operating huge, expensive movie cameras" },
          { name: "Lighting Design", concept: "Using lights to make scenes look scary or sad" },
          { name: "Film History", concept: "Learning how old movies told stories" },
          { name: "Post-Production", concept: "Editing the colors to make the video pop" },
          { name: "Directing", concept: "Telling actors where to stand and move" },
          { name: "Screenwriting", concept: "Writing a really good story with a twist" }
        ]
      },
      {
        title: "Video Game Designer",
        courses: [
          { name: "Engine Architecture", concept: "Building the game's core brain" },
          { name: "Level Design", concept: "Making the game fun, not boring or unfair" },
          { name: "Storytelling", concept: "Writing stories where the player has choices" },
          { name: "3D Animation", concept: "Making characters move naturally" },
          { name: "C++ Programming", concept: "Writing the actual code that runs the game" },
          { name: "Game Physics", concept: "Making sure characters don't walk through walls" }
        ]
      }
    ],
    nextSteps: {
      elementary: ["Take foundational art, music, and creative writing classes", "Study basic color theory, composition, and spatial relationships", "Focus on language arts, vocabulary, and storytelling structures"],
      jrHigh: ["Enroll in digital media, graphic design, or photography electives", "Take advanced English literature and creative composition courses", "Study art history and fundamental design principles"],
      highSchool: ["Take AP Studio Art, AP Art History, or AP Music Theory", "Prepare a professional portfolio for a B.F.A in Design, Architecture, or Fine Arts", "Secure internships at design agencies, marketing firms, or media production companies"]
    }
  },
  Helper: {
    name: "The Helper",
    icon: HeartHandshake,
    description: "You are deeply empathetic and thrive on supporting, teaching, and healing others. You are an excellent communicator who values human connection. Your ultimate goal is usually making a positive, lasting impact on your community and the people around you.",
    strengths: ["Empathy", "Communication", "Patience", "Teamwork"],
    careers: [
      {
        title: "Clinical Psychologist",
        courses: [
          { name: "Abnormal Psych.", concept: "Understanding mental health struggles" },
          { name: "Cognitive Therapy", concept: "Teaching people how to cope with bad days" },
          { name: "Psych Assessment", concept: "Figuring out exactly what is wrong" },
          { name: "Developmental Psych", concept: "How we change from babies to adults" },
          { name: "Research Methods", concept: "How to do safe psychology experiments" },
          { name: "Neuroscience", concept: "How the brain's chemicals affect our mood" }
        ]
      },
      {
        title: "Speech-Language Pathologist",
        courses: [
          { name: "Phonetics", concept: "Helping people make the right mouth sounds" },
          { name: "Language Dev.", concept: "How babies and kids learn to talk" },
          { name: "Audiology", concept: "Understanding how ears work" },
          { name: "Neuroanatomy", concept: "The brain's rules for talking" },
          { name: "Voice Disorders", concept: "Fixing damaged or raspy voices" },
          { name: "Articulation Dis.", concept: "Planning how to move the mouth to speak" }
        ]
      },
      {
        title: "Special Education Teacher",
        courses: [
          { name: "Inclusive Education", concept: "Making sure everyone feels included" },
          { name: "Behavior Management", concept: "Calming kids down when they are upset" },
          { name: "Diff. Instruction", concept: "Changing the lesson to fit the kid's style" },
          { name: "Autism Spectrum", concept: "Understanding how different brains work" },
          { name: "Special Ed Law", concept: "Following the laws that protect students" },
          { name: "Assessment", concept: "Checking to see if they are actually learning" }
        ]
      },
      {
        title: "Medical Social Worker",
        courses: [
          { name: "Human Behavior", concept: "How society and friends affect us" },
          { name: "Social Welfare Policy", concept: "Helping people get food or money help" },
          { name: "Clinical Practice", concept: "Talking people through really hard times" },
          { name: "Healthcare Ethics", concept: "Making tough, fair medical choices" },
          { name: "Crisis Intervention", concept: "Helping people right after an emergency" },
          { name: "Gerontology", concept: "Helping older adults live happily" }
        ]
      },
      {
        title: "Pediatrician (Pre-Med)",
        courses: [
          { name: "Organic Chemistry", concept: "How chemicals mix and react" },
          { name: "Cellular Biology", concept: "Understanding germs and tiny cells" },
          { name: "Human Anatomy", concept: "How the heart, lungs, and stomach work" },
          { name: "Biochemistry", concept: "The chemistry happening inside your body" },
          { name: "Genetics", concept: "What we get from our parents' DNA" },
          { name: "Medical Ethics", concept: "Being a fair, honest, and good doctor" }
        ]
      },
      {
        title: "Occupational Therapist",
        courses: [
          { name: "Anatomy & Kinesiology", concept: "How bodies and muscles move" },
          { name: "Neuroscience", concept: "Fixing damaged nerves after an accident" },
          { name: "Assistive Tech", concept: "Teaching people to use wheelchairs and tools" },
          { name: "Psychosocial Therapy", concept: "Handling life's mental challenges" },
          { name: "Pediatric OT", concept: "Helping kids grow up strong and capable" },
          { name: "Geriatric OT", concept: "Helping older adults live safely at home" }
        ]
      }
    ],
    nextSteps: {
      elementary: ["Focus on reading comprehension, social studies, and communication skills", "Participate in peer mediation or conflict resolution training programs", "Take introductory health, wellness, and community studies classes"],
      jrHigh: ["Enroll in psychology, sociology, or human development electives", "Take advanced communication, foreign language, and public speaking courses", "Participate in community-based service learning or peer-tutoring classes"],
      highSchool: ["Take AP Psychology, AP Sociology, and Anatomy/Physiology", "Plan for a B.S. or B.A. in Nursing, Social Work, Psychology, or Education", "Complete clinical shadowing hours or obtain a CNA (Certified Nursing Assistant) license"]
    }
  },
  Persuader: {
    name: "The Persuader",
    icon: Megaphone,
    description: "You are a natural-born leader and motivator. You enjoy taking risks, starting new projects, and persuading others to achieve a shared goal. You are confident, energetic, and thrive in fast-paced environments where you can take charge.",
    strengths: ["Leadership", "Public Speaking", "Negotiation", "Self-Confidence"],
    careers: [
      {
        title: "Corporate Attorney",
        courses: [
          { name: "Constitutional Law", concept: "Using old rules to win new cases" },
          { name: "Contracts", concept: "Writing business deals that are totally safe" },
          { name: "Torts", concept: "Figuring out exactly who pays for a mistake" },
          { name: "Corporate Law", concept: "Following the rules of big business" },
          { name: "Civil Procedure", concept: "Knowing how a courtroom actually works" },
          { name: "Legal Research", concept: "Building a winning argument from scratch" }
        ]
      },
      {
        title: "Director of Marketing",
        courses: [
          { name: "Consumer Behavior", concept: "Understanding why people buy things" },
          { name: "Marketing Analytics", concept: "Seeing if the commercials made any money" },
          { name: "Brand Management", concept: "Making the company look incredibly cool" },
          { name: "Digital Strategy", concept: "Winning the internet and social media" },
          { name: "Market Research", concept: "Finding the perfect people to buy the product" },
          { name: "Int. Marketing", concept: "Selling your product all around the world" }
        ]
      },
      {
        title: "Venture Capital Analyst",
        courses: [
          { name: "Corporate Finance", concept: "How big companies manage their money" },
          { name: "Financial Modeling", concept: "Guessing how much money they'll make next year" },
          { name: "Entrep. Finance", concept: "Giving money to brand new startup ideas" },
          { name: "Valuation", concept: "Figuring out exactly what a company is worth" },
          { name: "Investment Mgmt.", concept: "Picking the winning companies to invest in" },
          { name: "Microeconomics", concept: "How businesses compete against each other" }
        ]
      },
      {
        title: "Public Relations Exec",
        courses: [
          { name: "Media Relations", concept: "Talking to journalists and the news" },
          { name: "Crisis Comm.", concept: "Fixing a bad reputation after a mistake" },
          { name: "PR Campaigns", concept: "Getting the whole world to talk about you" },
          { name: "Corp. Comm.", concept: "Sending positive messages to employees" },
          { name: "Mass Media Law", concept: "Knowing what you can and cannot say on TV" },
          { name: "Strategic Writing", concept: "Writing exciting official news updates" }
        ]
      },
      {
        title: "Wealth Management Dir.",
        courses: [
          { name: "Portfolio Mgmt.", concept: "Spreading money around so it grows safely" },
          { name: "Tax Planning", concept: "Figuring out how to pay fewer taxes legally" },
          { name: "Estate Planning", concept: "Passing money down to kids and grandkids" },
          { name: "Risk Management", concept: "Protecting money from big market crashes" },
          { name: "Fixed Income Sec.", concept: "Finding super safe ways to grow money" },
          { name: "Behavioral Finance", concept: "Why people make bad choices with their money" }
        ]
      },
      {
        title: "Political Campaign Mgr.",
        courses: [
          { name: "American Gov.", concept: "How a regular idea becomes a real law" },
          { name: "Political Behavior", concept: "Understanding why people vote the way they do" },
          { name: "Public Polling", concept: "Guessing who will win before the election" },
          { name: "Campaign Strategy", concept: "Spending campaign money on the right things" },
          { name: "Media & Politics", concept: "Controlling the story on the news" },
          { name: "Public Policy", concept: "Writing new laws to fix problems" }
        ]
      }
    ],
    nextSteps: {
      elementary: ["Take public speaking, debate, and presentation skills classes", "Study foundational social studies, civics, and early history", "Participate in group leadership and collaborative project management activities"],
      jrHigh: ["Enroll in debate, mock trial, or speech communications electives", "Take introductory business, economics, or student leadership courses", "Study advanced history, government, and persuasive writing"],
      highSchool: ["Take AP Macroeconomics, AP Microeconomics, and AP Government", "Prepare for a degree in Business Administration, Pre-Law, Finance, or Marketing", "Pursue internships in corporate sales, political campaigns, or business management"]
    }
  },
  Organizer: {
    name: "The Organizer",
    icon: ClipboardList,
    description: "You are the glue that holds systems together. You value order, accuracy, and predictability. You are incredibly detail-oriented and excel at managing data, creating routines, and coordinating complex logistics that keep everything running smoothly.",
    strengths: ["Organization", "Attention to Detail", "Reliability", "Time Management"],
    careers: [
      {
        title: "Certified Public Accountant",
        courses: [
          { name: "Financial Accounting", concept: "Tracking every single dollar perfectly" },
          { name: "Managerial Acct.", concept: "Finding exactly where money is being wasted" },
          { name: "Auditing", concept: "Checking the math to make sure no one is lying" },
          { name: "Federal Taxation", concept: "Knowing all the secret rules of the IRS" },
          { name: "Corporate Taxation", concept: "Doing complicated taxes for massive businesses" },
          { name: "Acct. Info Systems", concept: "Using special software to track money easily" }
        ]
      },
      {
        title: "Supply Chain Director",
        courses: [
          { name: "Logistics Mgmt.", concept: "Moving boxes across the country super fast" },
          { name: "Operations Mgmt.", concept: "Making the factory work faster and better" },
          { name: "Procurement", concept: "Negotiating to buy parts for a cheaper price" },
          { name: "Supply Analytics", concept: "Guessing exactly what people will buy next month" },
          { name: "Inventory Mgmt.", concept: "Making sure the warehouse is never empty" },
          { name: "Global Logistics", concept: "Shipping products safely across the ocean" }
        ]
      },
      {
        title: "Info Security Analyst",
        courses: [
          { name: "Network Security", concept: "Building a digital wall to block hackers" },
          { name: "Cryptography", concept: "Scrambling secret messages so no one can read them" },
          { name: "Ethical Hacking", concept: "Trying to hack your own company to find weak spots" },
          { name: "Cyber Strategies", concept: "Knowing exactly what to do when hacked" },
          { name: "Risk Management", concept: "Guessing what hackers will try to do next" },
          { name: "Operating Systems", concept: "Locking down computers so they are totally safe" }
        ]
      },
      {
        title: "Actuary",
        courses: [
          { name: "Probability Theory", concept: "Figuring out the mathematical odds of something happening" },
          { name: "Financial Math", concept: "How money magically grows over a long time" },
          { name: "Actuarial Models", concept: "Guessing how long people will live using math" },
          { name: "Loss Models", concept: "Guessing how much money car crashes will cost" },
          { name: "Time Series", concept: "Spotting future problems by looking at the past" },
          { name: "Statistical Risk", concept: "Deciding exactly what insurance should cost" }
        ]
      },
      {
        title: "Database Administrator",
        courses: [
          { name: "Database Mgmt.", concept: "Building massive digital file cabinets" },
          { name: "SQL & Relational", concept: "Finding one specific file out of a million super fast" },
          { name: "Data Warehousing", concept: "Keeping millions of records organized forever" },
          { name: "Cloud Infrastructure", concept: "Running the computers that make the internet work" },
          { name: "Database Security", concept: "Deciding exactly who gets to see the secret files" },
          { name: "Distributed Sys.", concept: "Managing hundreds of computers at the same time" }
        ]
      },
      {
        title: "Healthcare Compliance",
        courses: [
          { name: "Health Law & Ethics", concept: "Keeping everyone's medical secrets totally private" },
          { name: "Health Policy", concept: "Running the hospital smoothly behind the scenes" },
          { name: "Coding & Billing", concept: "Making sure the insurance companies actually pay" },
          { name: "Quality Management", concept: "Making sure doctors are doing a really good job" },
          { name: "Health Info Systems", concept: "Managing the digital folders for every patient" },
          { name: "Reg. Compliance", concept: "Getting ready for a big government inspection" }
        ]
      }
    ],
    nextSteps: {
      elementary: ["Focus heavily on arithmetic, data sorting, and grammar mechanics", "Take introductory computer literacy, typing, and software application classes", "Participate in structured logic, coding logic, and organizational activities"],
      jrHigh: ["Enroll in pre-algebra, statistics, and data literacy electives", "Take advanced computer applications (spreadsheets/databases) courses", "Study introductory accounting, record-keeping, or library sciences"],
      highSchool: ["Take AP Statistics, AP Computer Science Principles, and Accounting courses", "Plan for a degree in Accounting, Finance, Information Systems, or Business Analytics", "Obtain technical certifications in Excel, SQL, or basic project management (e.g., CAPM)"]
    }
  }
};
