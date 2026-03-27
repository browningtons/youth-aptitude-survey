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
      elementary: {
        books: [
          { title: "Rosie Revere, Engineer by Andrea Beaty", why: "A girl who loves building inventions learns that failure is part of the process" },
          { title: "The Most Magnificent Thing by Ashley Spires", why: "Shows how persistence and tinkering lead to creating something great" }
        ],
        people: [
          { name: "Simone Biles", why: "Shows how physical coordination and hard work produce incredible results" },
          { name: "Steve Irwin", why: "Loved animals and nature, spent his life working hands-on with wildlife" }
        ],
        activities: [
          "Build something with LEGO Technic or K'NEX — follow the instructions, then design your own",
          "Start a small garden or take care of a class pet to practice responsibility",
          "Take apart an old broken appliance (with an adult) to see how the pieces fit together"
        ],
        interests: [
          "Watch Mark Rober on YouTube — he builds incredible contraptions and explains the engineering",
          "Try Minecraft in survival mode — you have to gather resources and build structures to survive",
          "Visit a local farm, construction site (from outside), or nature center on the weekend"
        ]
      },
      jrHigh: {
        books: [
          { title: "The Boy Who Harnessed the Wind by William Kamkwamba", why: "A teen in Malawi built a windmill from scrap to save his village — true story" },
          { title: "Hatchet by Gary Paulsen", why: "A boy survives alone in the wilderness using only his hands and brain" }
        ],
        people: [
          { name: "Elon Musk", why: "Started building rockets and electric cars by thinking about problems differently" },
          { name: "Temple Grandin", why: "Revolutionized livestock handling by thinking visually and building better systems" }
        ],
        activities: [
          "Join a robotics club (FIRST Robotics or VEX) — you'll build, wire, and program real machines",
          "Learn basic woodworking or metalworking through a community shop class",
          "Volunteer with Habitat for Humanity or help on a family DIY home project"
        ],
        interests: [
          "Learn to 3D print — many libraries have free printers you can use with Tinkercad designs",
          "Watch Practical Engineering on YouTube — explains how bridges, dams, and roads actually work",
          "Try soldering a simple electronics kit (like a flashlight or radio) from a hobby store"
        ]
      },
      highSchool: {
        books: [
          { title: "Structures: Or Why Things Don't Fall Down by J.E. Gordon", why: "Fascinating look at how everything from bridges to bones stays together" },
          { title: "Shop Class as Soulcraft by Matthew Crawford", why: "Makes the case that working with your hands is deeply fulfilling and intellectually rich" }
        ],
        people: [
          { name: "Boyan Slat", why: "Started The Ocean Cleanup at age 18 — engineered a system to remove plastic from the ocean" },
          { name: "Lonnie Johnson", why: "NASA engineer who also invented the Super Soaker — creativity meets engineering" }
        ],
        activities: [
          "Get a paid apprenticeship or summer job in construction, auto repair, or landscaping",
          "Build a personal project: a go-kart, a trebuchet, a piece of furniture, or an Arduino-powered gadget",
          "Shadow a professional engineer, electrician, or mechanic for a day"
        ],
        interests: [
          "Take free courses on Khan Academy in physics and engineering principles",
          "Watch Stuff Made Here on YouTube — a former engineer builds wild inventions in his garage",
          "Explore CAD software like Fusion 360 (free for students) — design parts you can actually 3D print"
        ]
      }
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
      elementary: {
        books: [
          { title: "Ada Twist, Scientist by Andrea Beaty", why: "A curious girl who never stops asking 'Why?' — just like you" },
          { title: "Hidden Figures (Young Readers' Edition) by Margot Lee Shetterly", why: "True story of brilliant women mathematicians who helped send astronauts to space" }
        ],
        people: [
          { name: "Marie Curie", why: "Discovered radioactivity through relentless curiosity and experimentation" },
          { name: "Neil deGrasse Tyson", why: "Makes the biggest mysteries of the universe fun and understandable" }
        ],
        activities: [
          "Start a science journal — observe something in nature every day and write or draw what you notice",
          "Do kitchen experiments: make volcanoes, grow crystals, test which liquids freeze fastest",
          "Join a math league or Science Olympiad team at school"
        ],
        interests: [
          "Watch SciShow Kids or National Geographic Kids on YouTube for real science you can understand",
          "Play logic puzzle games like Rush Hour, SET, or Mastermind",
          "Visit a science museum or planetarium — ask the staff your hardest questions"
        ]
      },
      jrHigh: {
        books: [
          { title: "A Short History of Nearly Everything by Bill Bryson", why: "Makes all of science — from atoms to the universe — surprisingly entertaining" },
          { title: "The Martian by Andy Weir", why: "An astronaut uses chemistry, physics, and botany to survive alone on Mars" }
        ],
        people: [
          { name: "Jane Goodall", why: "Spent decades patiently observing chimpanzees — turned observation into world-changing science" },
          { name: "Terence Tao", why: "One of the greatest living mathematicians — was solving university math problems as a teenager" }
        ],
        activities: [
          "Learn Python with free resources like Codecademy or Scratch — start automating things that interest you",
          "Enter a science fair with an original hypothesis you actually want to test",
          "Start a weather station, ant farm, or plant growth experiment and track data over weeks"
        ],
        interests: [
          "Watch Veritasium or 3Blue1Brown on YouTube — they make complex math and physics visual and exciting",
          "Try Brilliant.org puzzles for logic, math, and science problem-solving",
          "Listen to the Radiolab podcast — explores wild scientific questions in story form"
        ]
      },
      highSchool: {
        books: [
          { title: "Thinking, Fast and Slow by Daniel Kahneman", why: "Reveals how your brain actually makes decisions — full of surprising research" },
          { title: "The Gene by Siddhartha Mukherjee", why: "Epic story of genetics from Mendel to CRISPR — reads like a thriller" }
        ],
        people: [
          { name: "Katalin Karikó", why: "Spent 40 years on mRNA research that everyone ignored — until it saved millions of lives as the COVID vaccine" },
          { name: "Richard Feynman", why: "Nobel-winning physicist famous for explaining the hardest ideas simply and playfully" }
        ],
        activities: [
          "Reach out to a local university professor and ask to shadow their lab for a day",
          "Build a real data project: scrape weather data, sports stats, or census data and find patterns",
          "Compete in AMC/MATHCOUNTS, Science Olympiad, or a hackathon"
        ],
        interests: [
          "Take free MIT OpenCourseWare or Coursera courses in subjects that fascinate you",
          "Watch Two Minute Papers on YouTube — covers cutting-edge AI and physics research",
          "Read scientific preprints on arXiv.org in a field you're curious about — even if you only understand half of it"
        ]
      }
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
      elementary: {
        books: [
          { title: "The Dot by Peter H. Reynolds", why: "A girl who thinks she can't draw discovers that creativity starts with one small mark" },
          { title: "Crenshaw by Katherine Applegate", why: "A beautifully imaginative story about a boy and his giant invisible cat friend" }
        ],
        people: [
          { name: "Walt Disney", why: "Started drawing cartoons as a kid — built an empire from his imagination" },
          { name: "Misty Copeland", why: "Didn't start ballet until age 13 and became a principal dancer through creative dedication" }
        ],
        activities: [
          "Keep a sketchbook or creative journal — draw, doodle, write stories, paste in things that inspire you",
          "Put on a play, puppet show, or talent show with friends or family",
          "Try a new art form every month: watercolors, clay, collage, photography with a phone"
        ],
        interests: [
          "Watch Art for Kids Hub on YouTube — guided drawing sessions you can follow along with",
          "Play creative sandbox games like Minecraft Creative Mode or Roblox Studio",
          "Visit a local art gallery or mural walk — take photos of pieces that make you feel something"
        ]
      },
      jrHigh: {
        books: [
          { title: "Steal Like an Artist by Austin Kleon", why: "Short, visual book about how all creative people learn by remixing ideas" },
          { title: "The Hobbit by J.R.R. Tolkien", why: "One of the most imaginative worlds ever created — shows what storytelling can do" }
        ],
        people: [
          { name: "Hayao Miyazaki", why: "Japanese animator who hand-draws entire films — proof that patience + vision = magic" },
          { name: "Billie Eilish", why: "Created a completely original musical identity as a teenager from her bedroom" }
        ],
        activities: [
          "Learn a digital tool: Procreate for drawing, GarageBand for music, Canva for design, or CapCut for video",
          "Write and illustrate a short comic book or zine and share it with friends",
          "Join a school drama club, art club, band, or start a creative YouTube/TikTok channel"
        ],
        interests: [
          "Watch Nerdwriter1 or Every Frame a Painting on YouTube — they break down why great art works",
          "Try Blender (free 3D software) — follow a beginner donut tutorial and make your first 3D scene",
          "Start noticing design everywhere: logos, movie posters, album covers, app interfaces — ask yourself why they work"
        ]
      },
      highSchool: {
        books: [
          { title: "The War of Art by Steven Pressfield", why: "About overcoming creative resistance — every artist, writer, and designer needs this" },
          { title: "Ways of Seeing by John Berger", why: "Changes how you look at visual culture, advertising, and art forever" }
        ],
        people: [
          { name: "Virgil Abloh", why: "Architect turned fashion designer who became creative director of Louis Vuitton — blurred every boundary" },
          { name: "Ava DuVernay", why: "Self-taught filmmaker who became one of Hollywood's most important directors" }
        ],
        activities: [
          "Build a portfolio: collect your 10 best pieces of any medium and present them on a free site like Behance",
          "Enter a creative competition: Scholastic Art & Writing Awards, film festivals, or design challenges",
          "Collaborate with someone in a different medium — if you draw, find a musician; if you write, find a filmmaker"
        ],
        interests: [
          "Take free design courses on Skillshare or watch The Futur on YouTube for design career advice",
          "Study the creative process of someone you admire — read interviews, watch documentaries about how they work",
          "Explore generative AI tools like Midjourney or Runway as creative collaborators, not replacements"
        ]
      }
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
      elementary: {
        books: [
          { title: "Each Kindness by Jacqueline Woodson", why: "A powerful story about the impact of small acts of kindness — and what happens when we miss the chance" },
          { title: "Wonder by R.J. Palacio", why: "Shows how empathy and acceptance can change an entire school community" }
        ],
        people: [
          { name: "Mr. Rogers", why: "Spent his life teaching children they are special exactly as they are" },
          { name: "Ruby Bridges", why: "At just 6 years old, showed incredible bravery standing up for what's right" }
        ],
        activities: [
          "Volunteer to be a reading buddy or peer tutor for younger students",
          "Help organize a food drive, toy drive, or supply collection for a local shelter",
          "Practice active listening: ask a friend about their day and really focus on understanding how they feel"
        ],
        interests: [
          "Watch Dodo Kids on YouTube — heartwarming animal rescue and kindness stories",
          "Start a kindness journal — write down one nice thing you did or noticed each day",
          "Learn basic sign language from YouTube — it helps you communicate with more people"
        ]
      },
      jrHigh: {
        books: [
          { title: "The Boy Who Was Raised as a Dog by Bruce Perry", why: "A child psychiatrist shares true stories about how childhood experiences shape who we become" },
          { title: "I Am Malala (Young Readers' Edition) by Malala Yousafzai", why: "A teenager who risked her life fighting for every child's right to education" }
        ],
        people: [
          { name: "Dolly Parton", why: "Built a free book program that has given over 200 million books to children worldwide" },
          { name: "Patch Adams", why: "A doctor who believes laughter and human connection heal as much as medicine" }
        ],
        activities: [
          "Become a mentor or tutor through a school or community program",
          "Volunteer at an animal shelter, senior center, or children's hospital",
          "Start or join a student council, anti-bullying campaign, or peer mediation program"
        ],
        interests: [
          "Watch TED Talks by Brené Brown on vulnerability and human connection",
          "Take a free online course on psychology basics from Khan Academy",
          "Listen to The Happiness Lab podcast — uses research to explain what actually makes people feel better"
        ]
      },
      highSchool: {
        books: [
          { title: "Man's Search for Meaning by Viktor Frankl", why: "A psychologist's account of finding purpose in the hardest circumstances imaginable" },
          { title: "Educated by Tara Westover", why: "A memoir about the transformative power of education and self-advocacy" }
        ],
        people: [
          { name: "Paul Farmer", why: "Doctor who devoted his career to providing healthcare to the world's poorest communities" },
          { name: "Bryan Stevenson", why: "Lawyer who fights for wrongly imprisoned people — founded the Equal Justice Initiative" }
        ],
        activities: [
          "Shadow a nurse, therapist, social worker, or teacher for a day to see the work firsthand",
          "Get CPR/First Aid certified through the Red Cross — it's practical and looks great on applications",
          "Lead a community service project: organize a tutoring program, wellness event, or mentoring circle"
        ],
        interests: [
          "Watch the documentary 'Paper Tigers' — about a school that transformed by understanding trauma",
          "Explore Coursera's free courses in psychology, public health, or social work",
          "Read about different therapy approaches (CBT, DBT, art therapy) to see which resonates with you"
        ]
      }
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
      elementary: {
        books: [
          { title: "Kid President's Guide to Being Awesome by Robby Novak", why: "Written by a kid who inspired millions — shows that young people can lead right now" },
          { title: "The Lemonade War by Jacqueline Davies", why: "Two siblings compete to sell the most lemonade — teaches business, strategy, and persuasion" }
        ],
        people: [
          { name: "Kid President (Robby Novak)", why: "A kid who made viral videos inspiring millions of adults to be better" },
          { name: "Greta Thunberg", why: "Started speaking up about climate change at age 15 — showed that one voice can move the world" }
        ],
        activities: [
          "Run for a class officer position or volunteer to lead a group project",
          "Start a small business: lemonade stand, craft sale, or bake sale — practice pitching to customers",
          "Organize a class debate or persuasive speech contest with friends"
        ],
        interests: [
          "Watch Shark Tank (kid-friendly episodes) — see how entrepreneurs pitch and negotiate",
          "Play strategy board games like Monopoly, Risk, or Settlers of Catan",
          "Practice telling stories out loud — great leaders are great storytellers"
        ]
      },
      jrHigh: {
        books: [
          { title: "How to Win Friends and Influence People (Teen Edition) by Dale Carnegie", why: "The classic guide to building relationships and persuading people — adapted for teens" },
          { title: "Start Something That Matters by Blake Mycoskie", why: "How the founder of TOMS Shoes turned a simple idea into a global movement" }
        ],
        people: [
          { name: "Oprah Winfrey", why: "Built a media empire from nothing through authenticity, communication, and relentless drive" },
          { name: "Mark Cuban", why: "Sold garbage bags door-to-door as a kid — now owns NBA teams and invests in startups" }
        ],
        activities: [
          "Join a debate team, mock trial club, or Model United Nations",
          "Start a real micro-business: resell items, offer services like lawn care or tutoring, or sell something you make",
          "Organize a school event, fundraiser, or awareness campaign from scratch"
        ],
        interests: [
          "Watch How I Built This podcast/YouTube — founders tell the real story of how they started their companies",
          "Follow entrepreneurs your age on social media — many teens are already building businesses",
          "Study how ads work: pick 5 commercials and figure out exactly what psychological trick each one uses"
        ]
      },
      highSchool: {
        books: [
          { title: "Influence by Robert Cialdini", why: "The science of persuasion — six principles that explain why people say yes" },
          { title: "Shoe Dog by Phil Knight", why: "The founder of Nike tells the raw, honest story of building a global brand from scratch" }
        ],
        people: [
          { name: "Alexandria Ocasio-Cortez", why: "Won a congressional race at 29 with no political connections — pure grassroots persuasion" },
          { name: "Sara Blakely", why: "Invented Spanx with $5,000 and no business experience — became the youngest self-made female billionaire" }
        ],
        activities: [
          "Launch a real side business or freelance service and track your revenue",
          "Intern at a marketing agency, law office, political campaign, or local business",
          "Lead a club, team, or organization — practice managing people, budgets, and deadlines"
        ],
        interests: [
          "Take a free Coursera course on negotiation from Yale or marketing from Wharton",
          "Read the business section of a major newspaper every week — understand what moves markets",
          "Listen to The Tim Ferriss Show podcast — interviews with world-class performers across every field"
        ]
      }
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
      elementary: {
        books: [
          { title: "If You Give a Mouse a Cookie by Laura Numeroff", why: "A fun chain-reaction story that shows how one thing leads to another — systems thinking for kids" },
          { title: "The Checklist Manifesto (adapted concept) by Atul Gawande", why: "Shows how simple checklists save lives in hospitals and cockpits — organization matters" }
        ],
        people: [
          { name: "Marie Kondo", why: "Turned organizing into a worldwide movement — proves that order creates calm and joy" },
          { name: "Katherine Johnson", why: "NASA mathematician whose precise calculations helped land astronauts on the Moon" }
        ],
        activities: [
          "Organize your room, desk, or backpack with a real system — label everything and keep it up for a month",
          "Create a weekly planner or calendar and track your homework, activities, and goals",
          "Help a teacher organize the classroom library, supply closet, or bulletin board"
        ],
        interests: [
          "Try coding with Scratch — programming is literally giving a computer organized, step-by-step instructions",
          "Play puzzle games that reward planning: Sudoku, chess, or flow-style puzzle apps",
          "Start a collection (cards, rocks, coins, stamps) and build a real catalog or inventory system for it"
        ]
      },
      jrHigh: {
        books: [
          { title: "Atomic Habits by James Clear", why: "Explains how tiny organized routines compound into massive results over time" },
          { title: "The Phantom Tollbooth by Norton Juster", why: "An adventure through a world where numbers, words, and logic rule — perfect for organized thinkers" }
        ],
        people: [
          { name: "Tim Cook", why: "Apple's CEO isn't a flashy inventor — he's the operations genius who makes everything run on time" },
          { name: "Reshma Saujani", why: "Founded Girls Who Code by creating organized systems to teach millions of girls to program" }
        ],
        activities: [
          "Learn to use a spreadsheet (Google Sheets or Excel) — track something real like spending, grades, or workout progress",
          "Manage a club's budget, schedule, or event logistics as the treasurer or secretary",
          "Create a personal website or digital portfolio — organizing content teaches information architecture"
        ],
        interests: [
          "Learn basic SQL or Python with free resources — databases are the ultimate organizational tool",
          "Watch Ali Abdaal on YouTube — he's built an entire brand around productivity systems and organization",
          "Try Notion or Trello to build a personal productivity system for school and extracurriculars"
        ]
      },
      highSchool: {
        books: [
          { title: "Thinking in Systems by Donella Meadows", why: "The definitive guide to understanding how complex systems work — from ecosystems to economies" },
          { title: "The Goal by Eliyahu Goldratt", why: "A business novel about optimizing a factory — surprisingly gripping and teaches operations management" }
        ],
        people: [
          { name: "Sheryl Sandberg", why: "COO of Meta — the operational mastermind behind one of the world's largest companies" },
          { name: "Grace Hopper", why: "Pioneer of computer programming who literally helped create the systems that run the modern world" }
        ],
        activities: [
          "Get an Excel or Google certification — it's free, looks great on resumes, and you'll use it everywhere",
          "Intern at an accounting firm, logistics company, IT department, or hospital during the summer",
          "Run the logistics for a real event: prom, fundraiser, or community project — manage budget, timeline, and vendors"
        ],
        interests: [
          "Take a free Coursera course in project management, data analytics, or cybersecurity fundamentals",
          "Watch Wendover Productions on YouTube — explains the hidden logistics behind everyday things like shipping and airlines",
          "Explore cybersecurity challenges on TryHackMe or HackTheBox — organized thinking is the core of security"
        ]
      }
    }
  }
};
