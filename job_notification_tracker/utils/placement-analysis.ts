
export interface AnalysisResult {
    id: string;
    createdAt: string;
    company: string;
    role: string;
    jdText: string;
    extractedSkills: Record<string, string[]>;
    plan: Array<{ day: string; focus: string; tasks: string[] }>;
    checklist: Record<string, string[]>;
    questions: string[];
    readinessScore: number; // This acts as 'finalScore' for UI compatibility
    baseScore?: number;
    skillConfidenceMap?: Record<string, "know" | "practice">;
    companyIntel?: CompanyIntel;
    roundMapping?: RoundInfo[];
    updatedAt?: string;
}

export interface ExtractedSkills {
    "Core CS": string[];
    "Languages": string[];
    "Web": string[];
    "Data": string[];
    "Cloud/DevOps": string[];
    "Testing": string[];
    "Other": string[];
    [key: string]: string[]; // Index signature for UI mapping
}

export interface CompanyIntel {
    name: string;
    industry: string;
    type: "Startup" | "Mid-size" | "Enterprise";
    hiringFocus: string;
}

export interface RoundInfo {
    roundName: string;
    description: string;
    whyItMatters: string;
}

const KNOWN_ENTERPRISES = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Adobe", "Salesforce", "TCS", "Infosys", "Wipro", "Accenture", "IBM", "Oracle", "Cisco", "Intel", "Samsung", "Deloitte", "Cognizant", "Capgemini"];

const KEYWORDS: Record<string, string[]> = {
    "Core CS": ["DSA", "Data Structures", "Algorithms", "OOP", "Object Oriented", "DBMS", "Database Management", "OS", "Operating Systems", "Computer Networks", "CN", "System Design"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Golang", "Go", "Ruby", "Swift", "Kotlin", "Rust", "PHP"],
    "Web": ["React", "React.js", "Next.js", "Node.js", "Express", "Node", "Angular", "Vue", "HTML", "CSS", "Tailwind", "Bootstrap", "REST", "GraphQL", "API"],
    "Data": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "NoSQL", "Redis", "Elasticsearch", "Cassandra", "Kafka", "Spark", "Hadoop"],
    "Cloud/DevOps": ["AWS", "Amazon Web Services", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes", "K8s", "CI/CD", "Jenkins", "Git", "GitHub", "GitLab", "Linux", "Bash", "Shell"],
    "Testing": ["Selenium", "Cypress", "Playwright", "Jest", "Mocha", "JUnit", "PyTest", "TestNG", "Manual Testing", "Automation"]
};

const QUESTIONS_DB: Record<string, string[]> = {
    "Java": ["Explain the internal working of HashMap in Java.", "Difference between Abstract Class and Interface in Java 8+.", "How does Garbage Collection work?", "Explain SOLID principles with Java examples."],
    "Python": ["Explain decorators and generators in Python.", "Difference between list and tuple.", "How is memory managed in Python?", "Explain GIL (Global Interpreter Lock)."],
    "JavaScript": ["Explain the Event Loop.", "Difference between var, let, and const.", "What are closures?", "Explain Prototypal Inheritance."],
    "React": ["Difference between Virtual DOM and Real DOM.", "Explain React Lifecycle methods (or Hooks flow).", "What is Prop Drilling and how to avoid it?", "Explain Context API vs Redux."],
    "SQL": ["Explain ACID properties.", "Difference between Clustered and Non-Clustered Index.", "Write a query to find the second highest salary.", "Explain Normalization forms."],
    "DSA": ["How would you detect a cycle in a linked list?", "Explain QuickSort vs MergeSort complexity.", "Implement a stack using queues.", "Find the longest common subsequence."],
    "System Design": ["How would you design a URL shortener?", "Explain Load Balancing techniques.", "CAP Theorem explained.", "Horizontal vs Vertical Scaling."],
    "General": ["Tell me about a challenging project you worked on.", "Where do you see yourself in 5 years?", "Why do you want to join this company?", "Describe a conflict you resolved in a team."]
};

const PLAN_TEMPLATE = [
    { day: "Day 1-2", focus: "Basics & Core CS", tasks: ["Revise OOP Guidelines", "Brush up on DBMS Constraints & SQL Basics", "OS: Process Management & Threads"] },
    { day: "Day 3-4", focus: "DSA & Coding", tasks: ["Solve 5 Array/String problems", "Practice Linked List & Tree traversals", "Revise Time Complexity analysis"] },
    { day: "Day 5", focus: "Project & Stack", tasks: ["Review project architecture", "Prepare answers for 'Challenges Faced'", "Deep dive into {TOP_SKILL} concepts"] },
    { day: "Day 6", focus: "Mock Interviews", tasks: ["Practice behavioral questions (STAR method)", "Peer mock interview for System Design", "Review {WEAK_AREA} concepts"] },
    { day: "Day 7", focus: "Final Revision", tasks: ["Review cheat sheets", "Sleep well & relax", "Go through resume logic one last time"] }
];

export function analyzeJobDescription(company: string, role: string, jdText: string): AnalysisResult {
    const lowerJD = jdText.toLowerCase();
    const extractedSkills: ExtractedSkills = {
        "Core CS": [], "Languages": [], "Web": [], "Data": [], "Cloud/DevOps": [], "Testing": [], "Other": []
    };
    let totalSkills = 0;
    let detectedCategories = 0;

    // 1. Extract Skills
    Object.keys(KEYWORDS).forEach(category => {
        const found = KEYWORDS[category].filter(keyword =>
            lowerJD.includes(keyword.toLowerCase())
        );
        if (found.length > 0) {
            extractedSkills[category] = found;
            totalSkills += found.length;
            detectedCategories++;
        }
    });

    // Default behavior if no skills detected
    if (totalSkills === 0) {
        extractedSkills["Other"] = ["Communication", "Problem Solving", "Basic Coding", "Projects"];
        totalSkills = 4;
        detectedCategories = 1;
    }

    // 2. Calculate Readiness Score
    // RECALIBRATED: Heavier weight on actual skills, lower base.
    let score = 10; // Base (Resume ready)

    score += detectedCategories * 5; // +5 per distinct category (Breadth)
    score += Math.min(30, totalSkills * 2); // +2 per skill, capped at 30 (Depth)

    if (company.trim().length > 0) score += 5; // Context bonus
    if (role.trim().length > 0) score += 5;    // Context bonus
    if (jdText.length > 800) score += 5;       // Detail bonus

    // Cap initial automated score at 70 to leave room for user interaction
    if (score > 70) score = 70;

    // 3. Generate Questions
    let questions: string[] = [];
    const allDetectedSkills = Object.values(extractedSkills).flat();

    // Try to find specific questions for detected skills
    allDetectedSkills.forEach(skill => {
        // fuzzy match or direct match
        const key = Object.keys(QUESTIONS_DB).find(k => k.toLowerCase() === skill.toLowerCase() || skill.toLowerCase().includes(k.toLowerCase()));
        if (key && QUESTIONS_DB[key]) {
            questions.push(...QUESTIONS_DB[key]);
        }
    });

    // Fallback if low on questions
    if (questions.length < 5) {
        if (detectedCategories > 0 && extractedSkills["Core CS"]) questions.push(...QUESTIONS_DB["DSA"]);
        if (detectedCategories > 0 && extractedSkills["Data"]) questions.push(...QUESTIONS_DB["SQL"]);
    }

    // Shuffle and slice to 10
    questions = Array.from(new Set(questions)); // Dedup
    questions.sort(() => 0.5 - Math.random());

    // Ensure we have at least some generic ones if completely empty
    if (questions.length < 5) {
        questions.push(...QUESTIONS_DB["General"]);
    }

    questions = questions.slice(0, 10);

    // 4. Generate Checklist
    const checklist = {
        "Round 1: Aptitude & Basics": ["Quantitative Aptitude (Time & Work, Percentages)", "Logical Reasoning (Puzzles, Series)", "Verbal Ability Check", "Resume Walkthrough Preparation"],
        "Round 2: DSA & Core CS": ["Revise standard DSA sheets (Easy/Medium)", "Practice 2 coding problems/day", "Review DBMS Normalization & ACID", "Review OS Concepts (Paging, Deadlocks)"],
        "Round 3: Tech Interview": ["Prepare Project Deep-dive", ...allDetectedSkills.slice(0, 3).map(s => `Revise advanced ${s} concepts`), "System Design Basics (if applicable)"],
        "Round 4: Managerial / HR": ["Research about " + (company || "the company"), "Prepare 'Why this role?'", "Salary negotiation prep", "Prepare questions for the interviewer"]
    };

    // 5. Generate Plan
    // Customize logic: if Web is heavy, add Web tasks. If DSA is heavy, focus there.
    const plan = JSON.parse(JSON.stringify(PLAN_TEMPLATE)); // Deep copy based template

    const dominantCategory = Object.keys(extractedSkills).reduce((a, b) => extractedSkills[a]?.length > extractedSkills[b]?.length ? a : b, "Core CS");
    const topSkill = extractedSkills[dominantCategory]?.[0] || "Core Skills";

    plan[2].tasks[2] = plan[2].tasks[2].replace("{TOP_SKILL}", topSkill);
    plan[3].tasks[2] = plan[3].tasks[2].replace("{WEAK_AREA}", "weak/uncommon");

    // Adapt based on specific skills
    if (extractedSkills["Web"]) {
        plan[2].tasks.push("Build/Refactor a small feature using " + extractedSkills["Web"][0]);
    }
    if (extractedSkills["Data"]) {
        plan[0].tasks.push("Write 5 complex SQL queries");
    }

    // 6. Initialize Confidence Map
    const skillConfidenceMap: Record<string, "know" | "practice"> = {};
    allDetectedSkills.forEach(skill => {
        skillConfidenceMap[skill] = "practice";
    });

    // 7. Company Intel Generation
    const isEnterprise = KNOWN_ENTERPRISES.some(ent => company.toLowerCase().includes(ent.toLowerCase()));

    const companyIntel: CompanyIntel = {
        name: company || "Target Company",
        industry: isEnterprise ? "Technology Services" : "Tech Product / Startup",
        type: isEnterprise ? "Enterprise" : "Startup",
        hiringFocus: isEnterprise
            ? "Strong emphasis on DSA, CS Fundamentals (OS, DBMS, Networks), and Problem Solving."
            : "Focus on practical development skills, framework knowledge, and ability to ship code."
    };

    // 8. Round Mapping Logic
    let roundMapping: RoundInfo[] = [];

    if (companyIntel.type === "Enterprise") {
        const techStack = extractedSkills["Languages"]?.join("/") || "Core CS";
        roundMapping = [
            { roundName: "Round 1: Online Assessment", description: "Aptitude + DSA (2-3 coding problems).", whyItMatters: "Filters candidates on basic problem-solving speed." },
            { roundName: "Round 2: Technical Interview I", description: `DSA & ${techStack} concepts.`, whyItMatters: "Validates deep understanding of algorithms and data structures." },
            { roundName: "Round 3: Technical Interview II", description: "System Design (LLD) or Project deep dive.", whyItMatters: "Tests ability to write scalable, maintainable code." },
            { roundName: "Round 4: HR / Managerial", description: "Behavioral & Cultural fit.", whyItMatters: "Ensures alignment with company values." }
        ];
    } else {
        // Startup Flow
        const webStack = extractedSkills["Web"]?.join(", ") || "Full Stack";
        const dbStack = extractedSkills["Data"]?.[0] || "Database";

        roundMapping = [
            { roundName: "Round 1: Screening / Task", description: `Take-home assignment or Live Coding (${webStack} focus).`, whyItMatters: "Pragmatic test of 'Can you build this?'." },
            { roundName: "Round 2: Technical Discussion", description: `Code review of task + ${dbStack} & System Design.`, whyItMatters: "Assesses code quality and framework mastery." },
            { roundName: "Round 3: Culture & Founder Round", description: "Vision alignment & adaptability.", whyItMatters: "CRITICAL: Startups hire for attitude and ownership." }
        ];
    }

    // Customize checklist keys to match rounds for consistency if needed, but keeping separate for now

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        plan,
        checklist,
        questions,
        readinessScore: score, // Initial final score
        baseScore: score,      // Persisted base score
        skillConfidenceMap,
        companyIntel,
        roundMapping
    };
}
