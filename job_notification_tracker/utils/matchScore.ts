import { Job } from "@/types/job";

export interface UserPreferences {
    roleKeywords: string[];
    preferredLocations: string[];
    preferredMode: string[];
    experienceLevel: string;
    skills: string[];
    minMatchScore: number;
}

export function calculateMatchScore(job: Job, prefs: UserPreferences): number {
    let score = 0;

    // +25 if any roleKeyword appears in job.title (case-insensitive)
    const titleMatch = prefs.roleKeywords.some(keyword =>
        keyword.trim() && job.title.toLowerCase().includes(keyword.trim().toLowerCase())
    );
    if (titleMatch) score += 25;

    // +15 if any roleKeyword appears in job.description
    const descMatch = prefs.roleKeywords.some(keyword =>
        keyword.trim() && job.description.toLowerCase().includes(keyword.trim().toLowerCase())
    );
    if (descMatch) score += 15;

    // +15 if job.location matches preferredLocations (exact or partial match)
    // Assuming simple partial match for flexibility
    const locationMatch = prefs.preferredLocations.some(loc =>
        loc.trim() && job.location.toLowerCase().includes(loc.trim().toLowerCase())
    );
    if (locationMatch) score += 15;

    // +10 if job.mode matches preferredMode
    if (prefs.preferredMode.includes(job.mode)) score += 10;

    // +10 if job.experience matches experienceLevel
    if (job.experience === prefs.experienceLevel) score += 10;

    // +15 if overlap between job.skills and user.skills (any match)
    const skillsOverlap = job.skills.some(skill =>
        prefs.skills.some(userSkill =>
            userSkill.trim() && skill.toLowerCase() === userSkill.trim().toLowerCase()
        )
    );
    if (skillsOverlap) score += 15;

    // +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) score += 5;

    // +5 if source is LinkedIn
    if (job.source === 'LinkedIn') score += 5;

    // Cap score at 100
    return Math.min(score, 100);
}

export function getMatchScoreColor(score: number): string {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (score >= 40) return 'bg-gray-100 text-gray-800 border-gray-200';
    return 'bg-secondary text-muted-foreground border-transparent opacity-70';
}
