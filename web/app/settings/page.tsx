"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { useState, useEffect } from "react";
import { UserPreferences } from "@/utils/matchScore";

export default function Settings() {
    const [prefs, setPrefs] = useState<UserPreferences>({
        roleKeywords: [],
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: "Entry Level (0-2 years)",
        skills: [],
        minMatchScore: 40
    });

    const [message, setMessage] = useState("");

    const COMMON_ROLES = [
        "Frontend Developer", "Backend Developer", "Full Stack Developer",
        "Mobile Developer", "DevOps Engineer", "Data Scientist",
        "Product Manager", "UI/UX Designer", "Software Engineer"
    ];

    const COMMON_LOCATIONS = [
        "Remote", "Bangalore", "Mumbai", "Delhi", "Hyderabad",
        "Pune", "Chennai", "San Francisco", "New York", "London", "Berlin"
    ];

    const COMMON_SKILLS = [
        "React", "Node.js", "TypeScript", "Python", "Java",
        "AWS", "Docker", "Kubernetes", "SQL", "GraphQL",
        "Next.js", "Tailwind CSS", "Go", "Rust", "C++"
    ];

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            const parsed = JSON.parse(saved);
            setPrefs(parsed);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setMessage("Preferences saved successfully!");
        setTimeout(() => setMessage(""), 3000);
    };

    const toggleMode = (mode: string) => {
        setPrefs(prev => {
            const exists = prev.preferredMode.includes(mode);
            return {
                ...prev,
                preferredMode: exists
                    ? prev.preferredMode.filter(m => m !== mode)
                    : [...prev.preferredMode, mode]
            };
        });
    };


    const handleDelete = () => {
        if (confirm("Are you sure you want to delete your preferences?")) {
            localStorage.removeItem('jobTrackerPreferences');
            setPrefs({
                roleKeywords: [],
                preferredLocations: [],
                preferredMode: [],
                experienceLevel: "Entry Level (0-2 years)",
                skills: [],
                minMatchScore: 40
            });
            setMessage("Preferences deleted successfully.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
                <ContextHeader
                    title="Tracking Preferences"
                    description="Define exactly what you're looking for. We filter out the noise."
                />

                <div className="space-y-6">
                    <Card>
                        <h3 className="text-lg font-serif font-semibold mb-4 text-foreground">Role Configuration</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Role Keywords</label>
                                <MultiSelect
                                    value={prefs.roleKeywords}
                                    onChange={(newVal) => setPrefs({ ...prefs, roleKeywords: newVal })}
                                    options={COMMON_ROLES}
                                    placeholder="Select or type role keywords..."
                                />
                                <p className="text-xs text-muted-foreground">Select roles or type to add custom ones.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Experience Level</label>
                                <select
                                    className="w-full p-2 border border-border rounded-md bg-background"
                                    value={prefs.experienceLevel}
                                    onChange={(e) => setPrefs({ ...prefs, experienceLevel: e.target.value })}
                                >
                                    <option value="Internship">Internship</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="0-1 Years">0-1 Years</option>
                                    <option value="1-3 Years">1-3 Years</option>
                                    <option value="3-5 Years">3-5 Years</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Skills</label>
                                <MultiSelect
                                    value={prefs.skills}
                                    onChange={(newVal) => setPrefs({ ...prefs, skills: newVal })}
                                    options={COMMON_SKILLS}
                                    placeholder="Select or type skills..."
                                />
                                <p className="text-xs text-muted-foreground">Select skills or type to add custom ones.</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-serif font-semibold mb-4 text-foreground">Location & Type</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Preferred Locations</label>
                                <MultiSelect
                                    value={prefs.preferredLocations}
                                    onChange={(newVal) => setPrefs({ ...prefs, preferredLocations: newVal })}
                                    options={COMMON_LOCATIONS}
                                    placeholder="Select or type locations..."
                                />
                                <p className="text-xs text-muted-foreground">Select locations or type to add custom ones.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Work Mode</label>
                                <div className="flex gap-4 pt-1">
                                    {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                        <label key={mode} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredMode.includes(mode)}
                                                onChange={() => toggleMode(mode)}
                                                className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                                            />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-muted-foreground">Minimum Match Score Threshold</label>
                                    <span className="text-sm font-bold text-primary">{prefs.minMatchScore}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={prefs.minMatchScore}
                                    onChange={(e) => setPrefs({ ...prefs, minMatchScore: Number(e.target.value) })}
                                    className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
                        <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full md:w-auto"
                            onClick={handleDelete}
                        >
                            Delete Preferences
                        </Button>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                            {message && <span className="text-sm text-green-600 font-medium animate-in fade-in transition-all">{message}</span>}
                            <div className="flex gap-3">
                                <Button variant="secondary" onClick={() => window.location.reload()}>Reset</Button>
                                <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
