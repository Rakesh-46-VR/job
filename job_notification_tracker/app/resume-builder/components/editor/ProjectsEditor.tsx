import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, ChevronDown, ChevronUp, X, Github, Globe } from "lucide-react";
import { ResumeData } from "../../types";

interface ProjectsEditorProps {
    projects: ResumeData['projects'];
    onAdd: () => void;
    onUpdate: (index: number, field: keyof ResumeData['projects'][0], value: any) => void;
    onRemove: (index: number) => void;
}

export function ProjectsEditor({ projects, onAdd, onUpdate, onRemove }: ProjectsEditorProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
    const [tagInput, setTagInput] = useState<string>("");

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleTagKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = tagInput.trim();
            if (val) {
                const currentTags = projects[index].techStack || [];
                if (!currentTags.includes(val)) {
                    onUpdate(index, "techStack", [...currentTags, val]);
                }
                setTagInput("");
            }
        }
    };

    const removeTag = (projectIndex: number, tagToRemove: string) => {
        const currentTags = projects[projectIndex].techStack || [];
        onUpdate(projectIndex, "techStack", currentTags.filter(t => t !== tagToRemove));
    };

    return (
        <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Projects</h2>
                <Button onClick={onAdd} size="sm" variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" /> Add Project
                </Button>
            </div>

            <div className="space-y-4">
                {projects.map((proj, i) => (
                    <div key={proj.id || i} className="border border-border rounded-lg overflow-hidden bg-card transition-all duration-200">
                        {/* Header */}
                        <div
                            className="bg-muted/30 p-4 flex justify-between items-center cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => toggleExpand(i)}
                        >
                            <div className="font-medium truncate flex-1 pr-4">
                                {proj.title || `Project ${i + 1}`}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(i);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                {expandedIndex === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                        </div>

                        {/* Body */}
                        {expandedIndex === i && (
                            <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">Project Title</label>
                                    <input
                                        value={proj.title}
                                        onChange={(e) => onUpdate(i, "title", e.target.value)}
                                        placeholder="e.g. E-Commerce Dashboard"
                                        className="w-full p-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <label className="text-xs font-medium text-muted-foreground">Description</label>
                                        <span className={`text-[10px] ${(proj.description?.length || 0) > 200 ? "text-red-500" : "text-muted-foreground"}`}>
                                            {proj.description?.length || 0}/200
                                        </span>
                                    </div>
                                    <textarea
                                        value={proj.description}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 200) {
                                                onUpdate(i, "description", e.target.value);
                                            }
                                        }}
                                        placeholder="Briefly describe what you built and the impact..."
                                        className="w-full p-2 min-h-[80px] border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Tech Stack</label>
                                    <div className="p-2 border border-border rounded-md bg-background focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {proj.techStack?.map((tag, tagIdx) => (
                                                <span key={tagIdx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                                                    {tag}
                                                    <button onClick={() => removeTag(i, tag)} className="ml-1 hover:text-red-500">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <input
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => handleTagKeyDown(e, i)}
                                            placeholder="Type tech & press Enter..."
                                            className="w-full bg-transparent border-none text-sm focus:outline-none p-0"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="relative">
                                        <Globe className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                                        <input
                                            value={proj.liveUrl || ""}
                                            onChange={(e) => onUpdate(i, "liveUrl", e.target.value)}
                                            placeholder="Live URL"
                                            className="w-full pl-9 p-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Github className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                                        <input
                                            value={proj.githubUrl || ""}
                                            onChange={(e) => onUpdate(i, "githubUrl", e.target.value)}
                                            placeholder="GitHub URL"
                                            className="w-full pl-9 p-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-border rounded-lg text-muted-foreground bg-muted/10">
                        No projects added yet
                    </div>
                )}
            </div>
        </Card>
    );
}
