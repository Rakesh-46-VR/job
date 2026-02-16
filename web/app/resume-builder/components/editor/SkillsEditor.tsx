import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { X, Sparkles, Loader2 } from "lucide-react";
import { ResumeData } from "../../types";

interface SkillsEditorProps {
    skills: ResumeData['skills'];
    onUpdate: (category: keyof ResumeData['skills'], skills: string[]) => void;
}

export function SkillsEditor({ skills, onUpdate }: SkillsEditorProps) {
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [inputs, setInputs] = useState({
        technical: "",
        soft: "",
        tools: ""
    });

    const handleKeyDown = (e: React.KeyboardEvent, category: keyof ResumeData['skills']) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = inputs[category].trim();
            if (value && !skills[category].includes(value)) {
                onUpdate(category, [...skills[category], value]);
                setInputs(prev => ({ ...prev, [category]: "" }));
            }
        }
    };

    const removeSkill = (category: keyof ResumeData['skills'], skillToRemove: string) => {
        onUpdate(category, skills[category].filter(s => s !== skillToRemove));
    };

    const handleSuggest = () => {
        setIsSuggesting(true);
        setTimeout(() => {
            const suggestions = {
                technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
                soft: ["Team Leadership", "Problem Solving"],
                tools: ["Git", "Docker", "AWS"]
            };

            // Merge suggestions ensuring uniqueness
            const newTechnical = Array.from(new Set([...skills.technical, ...suggestions.technical]));
            const newSoft = Array.from(new Set([...skills.soft, ...suggestions.soft]));
            const newTools = Array.from(new Set([...skills.tools, ...suggestions.tools]));

            onUpdate("technical", newTechnical);
            onUpdate("soft", newSoft);
            onUpdate("tools", newTools);
            setIsSuggesting(false);
        }, 1000);
    };

    const renderCategory = (category: keyof ResumeData['skills'], label: string) => (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-muted-foreground">{label} ({skills[category].length})</label>
            </div>
            <div className="p-3 border border-border rounded-lg bg-background/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="flex flex-wrap gap-2 mb-2">
                    {skills[category].map((skill, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-primary animate-in fade-in zoom-in duration-200">
                            {skill}
                            <button
                                onClick={() => removeSkill(category, skill)}
                                className="ml-1.5 hover:text-red-500 focus:outline-none"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                    <input
                        value={inputs[category]}
                        onChange={(e) => setInputs(prev => ({ ...prev, [category]: e.target.value }))}
                        onKeyDown={(e) => handleKeyDown(e, category)}
                        placeholder={`Add ${label.toLowerCase()}...`}
                        className="flex-1 min-w-[120px] bg-transparent border-none text-sm focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50"
                    />
                </div>
                <p className="text-[10px] text-muted-foreground select-none">Press Enter to add</p>
            </div>
        </div>
    );

    return (
        <Card className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Skills</h2>
                <Button
                    onClick={handleSuggest}
                    disabled={isSuggesting}
                    variant="outline"
                    size="sm"
                    className="gap-2 text-primary hover:bg-primary/5"
                >
                    {isSuggesting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4" />
                    )}
                    Suggest Skills
                </Button>
            </div>

            <div className="space-y-6">
                {renderCategory("technical", "Technical Skills")}
                {renderCategory("soft", "Soft Skills")}
                {renderCategory("tools", "Tools & Technologies")}
            </div>
        </Card>
    );
}
