
export type TemplateType = "classic" | "modern" | "minimal";

export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        role?: string;
    };
    summary: string;
    education: Array<{
        degree: string;
        school: string;
        year: string;
        gpa: string;
    }>;
    experience: Array<{
        title: string;
        company: string;
        duration: string;
        bullets: string[];
        bulletStyle: "bullet" | "number";
    }>;
    projects: Array<{
        id: string;
        title: string;
        description: string;
        techStack: string[];
        liveUrl?: string;
        githubUrl?: string;
    }>;
    skills: {
        technical: string[];
        soft: string[];
        tools: string[];
    };
    links: {
        github: string;
        linkedin: string;
        portfolio: string;
    };
}
