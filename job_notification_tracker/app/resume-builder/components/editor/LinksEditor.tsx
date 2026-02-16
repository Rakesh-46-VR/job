import { Card } from "@/components/ui/Card";
import { Github, Linkedin, Globe } from "lucide-react";
import { ResumeData } from "../../types";

interface LinksEditorProps {
    links: ResumeData['links'];
    onUpdate: (key: keyof ResumeData['links'], value: string) => void;
}

export function LinksEditor({ links, onUpdate }: LinksEditorProps) {
    return (
        <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Links</h2>
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-muted-foreground" />
                    <input
                        value={links.github}
                        onChange={(e) => onUpdate("github", e.target.value)}
                        placeholder="GitHub URL"
                        className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-muted-foreground" />
                    <input
                        value={links.linkedin}
                        onChange={(e) => onUpdate("linkedin", e.target.value)}
                        placeholder="LinkedIn URL"
                        className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <input
                        value={links.portfolio}
                        onChange={(e) => onUpdate("portfolio", e.target.value)}
                        placeholder="Portfolio URL (optional)"
                        className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
        </Card>
    );
}
