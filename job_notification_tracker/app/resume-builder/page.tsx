"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ResumeData, TemplateType } from "./types";
import { EMPTY_RESUME } from "./constants";
import { PersonalInfoEditor } from "./components/editor/PersonalInfoEditor";
import { SummaryEditor } from "./components/editor/SummaryEditor";
import { EducationEditor } from "./components/editor/EducationEditor";
import { ExperienceEditor } from "./components/editor/ExperienceEditor";
import { ProjectsEditor } from "./components/editor/ProjectsEditor";
import { SkillsEditor } from "./components/editor/SkillsEditor";
import { LinksEditor } from "./components/editor/LinksEditor";
import { AtsScoreCard } from "./components/preview/AtsScoreCard";
import { ResumePreview } from "./components/preview/ResumePreview";

export default function ResumeBuilderPage() {
    const [resumeData, setResumeData] = useState<ResumeData>(EMPTY_RESUME);
    const [atsScore, setAtsScore] = useState(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [template, setTemplate] = useState<TemplateType>("classic");
    const [improvements, setImprovements] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data on mount
    useEffect(() => {
        const saved = localStorage.getItem("resumeBuilderData");
        if (saved) {
            try {
                const loaded = JSON.parse(saved);

                // MIGRATION LOGIC
                // 1. Ensure personalInfo exists
                if (!loaded.personalInfo) {
                    loaded.personalInfo = {
                        fullName: loaded.name || "",
                        email: "",
                        phone: "",
                        location: "",
                        role: ""
                    };
                }

                // 2. Ensure skills is object (technical, soft, tools)
                if (Array.isArray(loaded.skills)) {
                    loaded.skills = {
                        technical: loaded.skills, // Default old skills to technical
                        soft: [],
                        tools: []
                    };
                }

                // 3. Ensure projects match new schema (title, description, techStack)
                if (loaded.projects) {
                    loaded.projects = loaded.projects.map((proj: any) => ({
                        id: proj.id || crypto.randomUUID(),
                        title: proj.title || proj.name || "",
                        description: proj.description || proj.bullets?.join('. ') || "",
                        techStack: proj.techStack || (proj.tech ? proj.tech.split(',').map((t: string) => t.trim()) : []),
                        liveUrl: proj.liveUrl || "",
                        githubUrl: proj.githubUrl || ""
                    }));
                }

                setResumeData({ ...EMPTY_RESUME, ...loaded });
            } catch (e) {
                console.error("Failed to load resume data", e);
            }
        }
        setIsLoaded(true);

        const savedTemplate = localStorage.getItem("resumeTemplate");
        if (savedTemplate) {
            setTemplate(savedTemplate as TemplateType);
        }
    }, []);

    // Auto-save + recalculate score on data change
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
        calculateATS();
    }, [resumeData, isLoaded]);

    // Persist template choice
    useEffect(() => {
        localStorage.setItem("resumeTemplate", template);
    }, [template]);

    const calculateATS = () => {
        let score = 0;
        const newSuggestions: string[] = [];
        const newImprovements: string[] = [];

        // +10 if name provided
        if (resumeData.personalInfo?.fullName?.trim()) {
            score += 10;
        } else {
            newSuggestions.push("Add your full name (+10 points)");
            newImprovements.push("Add your full name to personalize your resume.");
        }

        // +10 if email provided
        if (resumeData.personalInfo?.email?.trim()) {
            score += 10;
        } else {
            newSuggestions.push("Add your email address (+10 points)");
            newImprovements.push("Add a professional email address for contact.");
        }

        // +10 if summary > 50 chars
        if (resumeData.summary.trim().length > 50) {
            score += 10;
        } else {
            newSuggestions.push("Write a professional summary (50+ characters) (+10 points)");
            newImprovements.push("Add a compelling professional summary (aim for 50-150 characters).");
        }

        // +15 if at least 1 experience entry with bullets
        const hasExperienceWithBullets = resumeData.experience.some(
            exp => exp.title?.trim() && exp.bullets.some(b => b.trim())
        );
        if (hasExperienceWithBullets) {
            score += 15;
        } else {
            newSuggestions.push("Add at least 1 work experience with bullet points (+15 points)");
            newImprovements.push("Add work experience with specific accomplishments in bullet points.");
        }

        // +10 if at least 1 education entry
        if (resumeData.education.some(edu => edu.degree?.trim() && edu.school?.trim())) {
            score += 10;
        } else {
            newSuggestions.push("Add your education details (+10 points)");
            newImprovements.push("Include your educational background (degree and institution).");
        }

        // +10 if at least 5 skills added
        const totalSkills = resumeData.skills.technical.length + 
                           resumeData.skills.soft.length + 
                           resumeData.skills.tools.length;
        if (totalSkills >= 5) {
            score += 10;
        } else {
            newSuggestions.push(`Add ${5 - totalSkills} more skill(s) (+10 points)`);
            newImprovements.push("List at least 5 relevant skills across technical, soft, and tools.");
        }

        // +10 if at least 1 project added
        if (resumeData.projects.some(proj => proj.title?.trim() && proj.description?.trim())) {
            score += 10;
        } else {
            newSuggestions.push("Add at least 1 project (+10 points)");
            newImprovements.push("Showcase your work with at least one detailed project.");
        }

        // +5 if phone provided
        if (resumeData.personalInfo?.phone?.trim()) {
            score += 5;
        } else {
            newSuggestions.push("Add your phone number (+5 points)");
        }

        // +5 if LinkedIn provided
        if (resumeData.links?.linkedin?.trim()) {
            score += 5;
        } else {
            newSuggestions.push("Add your LinkedIn profile (+5 points)");
        }

        // +5 if GitHub provided
        if (resumeData.links?.github?.trim()) {
            score += 5;
        } else {
            newSuggestions.push("Add your GitHub profile (+5 points)");
        }

        // +10 if summary contains action verbs
        const actionVerbs = ['built', 'led', 'designed', 'improved', 'developed', 'created', 
                            'managed', 'implemented', 'achieved', 'launched', 'optimized', 
                            'increased', 'reduced', 'established', 'spearheaded'];
        const summaryLower = resumeData.summary.toLowerCase();
        const hasActionVerbs = actionVerbs.some(verb => summaryLower.includes(verb));
        if (hasActionVerbs) {
            score += 10;
        } else {
            newSuggestions.push("Use action verbs in summary (built, led, designed, etc.) (+10 points)");
            newImprovements.push("Start sentences with strong action verbs to demonstrate impact.");
        }

        setAtsScore(Math.min(score, 100));
        setSuggestions(newSuggestions);
        setImprovements(newImprovements.slice(0, 3));
    };

    const updateField = (field: keyof ResumeData, value: any) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

    // --- Personal Info Handlers ---
    const updatePersonalInfo = (key: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [key]: value }
        }));
    };

    // --- Education Handlers ---
    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { degree: "", school: "", year: "", gpa: "" }]
        }));
    };

    const updateEducation = (index: number, field: string, value: string) => {
        const updated = [...resumeData.education];
        updated[index] = { ...updated[index], [field]: value };
        updateField("education", updated);
    };

    const removeEducation = (index: number) => {
        updateField("education", resumeData.education.filter((_, i) => i !== index));
    };

    // --- Experience Handlers ---
    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { title: "", company: "", duration: "", bullets: [""], bulletStyle: "bullet" }]
        }));
    };

    const updateExperience = (index: number, field: string, value: any) => {
        const updated = [...resumeData.experience];
        updated[index] = { ...updated[index], [field]: value };
        updateField("experience", updated);
    };

    const removeExperience = (index: number) => {
        updateField("experience", resumeData.experience.filter((_, i) => i !== index));
    };

    const toggleExperienceBulletStyle = (index: number) => {
        const updated = [...resumeData.experience];
        updated[index].bulletStyle = updated[index].bulletStyle === "bullet" ? "number" : "bullet";
        updateField("experience", updated);
    };

    const addBullet = (type: "experience", index: number) => {
        const updated = [...resumeData.experience];
        updated[index].bullets = [...updated[index].bullets, ""];
        updateField("experience", updated);
    };

    const updateBullet = (type: "experience", itemIndex: number, bulletIndex: number, value: string) => {
        const updated = [...resumeData.experience];
        updated[itemIndex].bullets[bulletIndex] = value;
        updateField("experience", updated);
    };

    const removeBullet = (type: "experience", itemIndex: number, bulletIndex: number) => {
        const updated = [...resumeData.experience];
        updated[itemIndex].bullets = updated[itemIndex].bullets.filter((_, i) => i !== bulletIndex);
        updateField("experience", updated);
    };

    // --- New Project Handlers ---
    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                id: crypto.randomUUID(),
                title: "",
                description: "",
                techStack: []
            }]
        }));
    };

    const updateProject = (index: number, field: keyof ResumeData['projects'][0], value: any) => {
        const updated = [...resumeData.projects];
        updated[index] = { ...updated[index], [field]: value };
        updateField("projects", updated);
    };

    const removeProject = (index: number) => {
        updateField("projects", resumeData.projects.filter((_, i) => i !== index));
    };

    // --- New Skill Handlers ---
    const updateSkills = (category: keyof ResumeData['skills'], skills: string[]) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: skills
            }
        }));
        // Remove from old generic skills list if we are migrating logic inside setResumeData? 
        // No, we rely on the state object structure.
    };

    // --- Link Handlers ---
    const updateLink = (key: keyof typeof resumeData.links, value: string) => {
        updateField("links", { ...resumeData.links, [key]: value });
    };

    if (!isLoaded) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

    return (
        <AppLayout>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-40 print:hidden">
                    <div className="container flex h-14 items-center justify-between px-6">
                        <span className="font-serif font-bold text-lg text-primary">AI Resume Builder</span>
                        <span className="text-sm text-muted-foreground">Auto-saved</span>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 flex gap-8">
                    {/* Left: Editor - Hidden on Print */}
                    <div className="flex-1 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] pb-12 print:hidden scrollbar-thin scrollbar-thumb-gray-200">

                        <PersonalInfoEditor
                            data={resumeData.personalInfo}
                            onChange={updatePersonalInfo}
                        />

                        <SummaryEditor
                            summary={resumeData.summary}
                            onChange={(val) => updateField("summary", val)}
                        />

                        <EducationEditor
                            education={resumeData.education}
                            onAdd={addEducation}
                            onUpdate={updateEducation}
                            onRemove={removeEducation}
                        />

                        <ExperienceEditor
                            experience={resumeData.experience}
                            onAdd={addExperience}
                            onUpdate={updateExperience}
                            onRemove={removeExperience}
                            onAddBullet={(idx) => addBullet("experience", idx)}
                            onUpdateBullet={(idx, bIdx, val) => updateBullet("experience", idx, bIdx, val)}
                            onRemoveBullet={(idx, bIdx) => removeBullet("experience", idx, bIdx)}
                            onToggleStyle={toggleExperienceBulletStyle}
                        />

                        <ProjectsEditor
                            projects={resumeData.projects}
                            onAdd={addProject}
                            onUpdate={updateProject}
                            onRemove={removeProject}
                        />

                        <SkillsEditor
                            skills={resumeData.skills}
                            onUpdate={updateSkills}
                        />

                        <LinksEditor
                            links={resumeData.links}
                            onUpdate={updateLink}
                        />

                    </div>

                    {/* Right: Preview + ATS Score */}
                    {/* On print, this becomes full width and the only visible item via global styles in ResumePreview */}
                    <div className="w-112.5 space-y-6 sticky top-20 h-fit print:w-full print:static print:h-auto">

                        <div className="print:hidden">
                            <AtsScoreCard
                                score={atsScore}
                                suggestions={suggestions}
                                improvements={improvements}
                            />
                        </div>

                        <ResumePreview
                            data={resumeData}
                            template={template}
                            onTemplateChange={setTemplate}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
