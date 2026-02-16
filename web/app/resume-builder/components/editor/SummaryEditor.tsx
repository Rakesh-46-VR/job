import { Card } from "@/components/ui/Card";

interface SummaryEditorProps {
    summary: string;
    onChange: (value: string) => void;
}

export function SummaryEditor({ summary, onChange }: SummaryEditorProps) {
    return (
        <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Professional Summary</h2>
            <textarea
                value={summary}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Write a 40-120 word summary highlighting your key strengths..."
                className="w-full min-h-[120px] p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground">
                {summary.trim().split(/\s+/).filter(w => w.length > 0).length} words
            </p>
        </Card>
    );
}
