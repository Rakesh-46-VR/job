
import { BookOpen, ExternalLink, PlayCircle } from "lucide-react";

export default function ResourcesPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold font-serif text-foreground">Learning Resources</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Video Tutorials */}
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <PlayCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Video Tutorials</h2>
                    </div>
                    <ul className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="group">
                                <a href="#" className="flex items-center justify-between hover:bg-secondary/10 p-2 rounded-lg transition-colors">
                                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">System Design Crash Course Part {i}</span>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Documentation */}
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Essential Reading</h2>
                    </div>
                    <ul className="space-y-4">
                        <li className="group">
                            <a href="#" className="flex items-center justify-between hover:bg-secondary/10 p-2 rounded-lg transition-colors">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">The Art of Computer Programming</span>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                        </li>
                        <li className="group">
                            <a href="#" className="flex items-center justify-between hover:bg-secondary/10 p-2 rounded-lg transition-colors">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">Clean Code Principles</span>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
