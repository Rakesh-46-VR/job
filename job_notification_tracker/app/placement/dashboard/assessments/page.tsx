
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function AssessmentsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold font-serif text-foreground">Your Assessments</h1>

            <div className="space-y-6">
                {/* Active Assessment */}
                <div className="bg-card border-l-4 border-l-primary p-6 rounded-r-lg shadow-sm border border-border">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                Frontend React Evaluation
                                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-full animate-pulse">
                                    Live
                                </span>
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">Due in 2 days • 45 mins • 20 Questions</p>
                        </div>
                        <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:brightness-110 transition-colors shadow-sm">
                            Start Now
                        </button>
                    </div>
                </div>

                {/* Past Assessments */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">History</h2>
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-background p-4 rounded-lg flex items-center justify-between border border-border hover:bg-secondary/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <div>
                                    <h4 className="font-medium text-foreground">Algorithms Basics {i}</h4>
                                    <p className="text-xs text-muted-foreground">Completed on Feb 10, 2026</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold text-foreground">8/10</span>
                                <p className="text-xs text-primary font-medium">Passed</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
