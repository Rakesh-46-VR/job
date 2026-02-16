export type JobMode = 'Remote' | 'Hybrid' | 'Onsite';
export type JobExperience = 'Fresher' | '0-1 Years' | '1-3 Years' | '3-5 Years' | 'Internship';
export type JobSource = 'LinkedIn' | 'Naukri' | 'Indeed' | 'Company Site';

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    mode: JobMode;
    experience: JobExperience;
    skills: string[];
    source: JobSource;
    postedDaysAgo: number;
    salaryRange: string;
    applyUrl: string;
    description: string;
}
