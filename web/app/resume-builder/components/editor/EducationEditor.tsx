import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";
import { ResumeData } from "../../types";

interface EducationEditorProps {
    education: ResumeData['education'];
    onAdd: () => void;
    onUpdate: (index: number, field: string, value: string) => void;
    onRemove: (index: number) => void;
}

export function EducationEditor({ education, onAdd, onUpdate, onRemove }: EducationEditorProps) {
    return (
        <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Education</h2>
                <Button onClick={onAdd} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
            </div>
            {education.map((edu, i) => (
                <div key={i} className="p-4 border border-border rounded-lg space-y-3 relative">
                    <button
                        onClick={() => onRemove(i)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <input
                        value={edu.degree}
                        onChange={(e) => onUpdate(i, "degree", e.target.value)}
                        placeholder="Degree (e.g., B.Tech in Computer Science)"
                        className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        value={edu.school}
                        onChange={(e) => onUpdate(i, "school", e.target.value)}
                        placeholder="School/University"
                        className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            value={edu.year}
                            onChange={(e) => onUpdate(i, "year", e.target.value)}
                            placeholder="Year (e.g., 2020-2024)"
                            className="p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            value={edu.gpa}
                            onChange={(e) => onUpdate(i, "gpa", e.target.value)}
                            placeholder="GPA (optional)"
                            className="p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            ))}
        </Card>
    );
}
