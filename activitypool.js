// activityPool.js

const activityPool = {
    fitness: [],
    learning: [],
    productivity: [],
    relaxation: [],
    creativity: [],
    social: [],
    tech: [],
    mindfulness: []
};

const templates = {
    fitness: [
        "Do {n} push-ups",
        "Take a {n}-minute walk",
        "Stretch for {n} minutes",
        "Do jumping jacks for {n} minutes"
    ],
    learning: [
        "Learn {topic} basics",
        "Read about {topic} for {n} minutes",
        "Watch a tutorial on {topic}"
    ],
    productivity: [
        "Clean your workspace",
        "Organize your files",
        "Clear {n} emails"
    ],
    relaxation: [
        "Listen to calm music",
        "Take deep breaths for {n} minutes"
    ],
    creativity: [
        "Sketch for {n} minutes",
        "Write a short story",
        "Create a doodle"
    ],
    social: [
        "Message a friend",
        "Call a family member"
    ],
    tech: [
        "Learn a JavaScript array method",
        "Refactor one function",
        "Solve one coding problem"
    ],
    mindfulness: [
        "Meditate for {n} minutes",
        "Write 3 things you're grateful for"
    ]
};

const topics = [
    "JavaScript", "Python", "CSS", "HTML",
    "AI basics", "Git", "APIs"
];

function generateActivityPool(total = 1000) {
    const numbers = [5, 10, 15, 20, 30];
    const perCategory = Math.floor(total / Object.keys(activityPool).length);

    Object.keys(activityPool).forEach(category => {
        while (activityPool[category].length < perCategory) {
            const template =
                templates[category][Math.floor(Math.random() * templates[category].length)];

            const activity = template
                .replace("{n}", numbers[Math.floor(Math.random() * numbers.length)])
                .replace("{topic}", topics[Math.floor(Math.random() * topics.length)]);

            activityPool[category].push(activity);
        }
    });
}

function getRandomActivity() {
    const categories = Object.keys(activityPool);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const list = activityPool[category];
    return list[Math.floor(Math.random() * list.length)];
}

function getActivityByCategory(category) {
    if (!activityPool[category]) {
        return "No activity found 😕";
    }
    const list = activityPool[category];
    return list[Math.floor(Math.random() * list.length)];
}

export {
    generateActivityPool,
    getRandomActivity,
    getActivityByCategory
};
