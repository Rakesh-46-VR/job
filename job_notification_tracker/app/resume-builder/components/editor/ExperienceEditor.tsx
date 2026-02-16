import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, AlertCircle } from "lucide-react";
import { ResumeData } from "../../types";
import { checkBulletQuality } from "../../utils";

interface ExperienceEditorProps {
    experience: ResumeData['experience'];
    onAdd: () => void;
    onUpdate: (index: number, field: string, value: any) => void;
    onRemove: (index: number) => void;
    onAddBullet: (index: number) => void;
    onUpdateBullet: (expIndex: number, bulletIndex: number, value: string) => void;
    onRemoveBullet: (expIndex: number, bulletIndex: number) => void;
    onToggleStyle: (index: number) => void;
}

export function ExperienceEditor({
    experience,
    onAdd,
    onUpdate,
    onRemove,
    onAddBullet,
    onUpdateBullet,
    onRemoveBullet,
    onToggleStyle
}: ExperienceEditorProps) {
    return (
        <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Experience</h2>
                <Button onClick={onAdd} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
            </div>
            {experience.map((exp, i) => (
                <div key={i} className="p-4 border border-border rounded-lg space-y-3 relative">
                    <button
                        onClick={() => onRemove(i)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <input
                        value={exp.title}
                        onChange={(e) => onUpdate(i, "title", e.target.value)}
                        placeholder="Job Title"
                        className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        value={exp.company}
                        onChange={(e) => onUpdate(i, "company", e.target.value)}
                        placeholder="Company Name"
                        className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        value={exp.duration}
                        onChange={(e) => onUpdate(i, "duration", e.target.value)}
                        placeholder="Duration (e.g., Jan 2023 - Present)"
                        className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    {/* Bullet Style Toggle */}
                    <div className="flex items-center gap-2 py-2">
                        <span className="text-xs text-muted-foreground">List style:</span>
                        <div className="flex gap-1">
                            <button
                                onClick={() => onToggleStyle(i)}
                                className={`px-3 py-1 text-xs rounded border transition-colors ${exp.bulletStyle === "bullet"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                • Bullets
                            </button>
                            <button
                                onClick={() => onToggleStyle(i)}
                                className={`px-3 py-1 text-xs rounded border transition-colors ${exp.bulletStyle === "number"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                1. Numbers
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {exp.bullets.map((bullet, bi) => {
                            const quality = checkBulletQuality(bullet);
                            return (
                                <div key={bi} className="space-y-1">
                                    <div className="flex gap-2">
                                        <input
                                            value={bullet}
                                            onChange={(e) => onUpdateBullet(i, bi, e.target.value)}
                                            placeholder="Achievement bullet point (use numbers!)"
                                            className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {exp.bullets.length > 1 && (
                                            <button
                                                onClick={() => onRemoveBullet(i, bi)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    {bullet.trim() && !quality.hasActionVerb && (
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <span className="flex items-center gap-1 text-amber-600">
                                                <AlertCircle className="w-3 h-3" />
                                                Start with a strong action verb
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <Button onClick={() => onAddBullet(i)} size="sm" variant="ghost">
                            + Add Bullet
                        </Button>
                    </div>
                </div>
            ))}
        </Card>
    );
}
