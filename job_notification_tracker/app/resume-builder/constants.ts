import { ResumeData } from "./types";

export const EMPTY_RESUME: ResumeData = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        role: ""
    },
    summary: "",
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    },
    links: { github: "", linkedin: "", portfolio: "" }
};

export const ACTION_VERBS = [
    "built", "developed", "designed", "implemented", "led", "improved",
    "created", "optimized", "automated", "managed", "delivered", "achieved",
    "launched", "established", "architected", "engineered", "streamlined",
    "enhanced", "coordinated", "drove", "executed", "initiated"
];
