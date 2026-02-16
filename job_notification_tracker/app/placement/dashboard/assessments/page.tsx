
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function AssessmentsPage() {
    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-foreground">Your Assessments</h1>

            <div className="space-y-4 sm:space-y-6">
                {/* Active Assessment */}
                <div className="bg-card border-l-4 border-l-primary p-4 sm:p-6 rounded-r-lg shadow-sm border border-border">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground flex flex-wrap items-center gap-2">
                                Frontend React Evaluation
                                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-full animate-pulse">
                                    Live
                                </span>
                            </h3>
                            <p className="text-muted-foreground text-xs sm:text-sm mt-1">Due in 2 days • 45 mins • 20 Questions</p>
                        </div>
                        <button className="w-full sm:w-auto px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:brightness-110 transition-colors shadow-sm text-sm sm:text-base">
                            Start Now
                        </button>
                    </div>
                </div>

                {/* Past Assessments */}
                <div className="space-y-4">
                    <h2 className="text-base sm:text-lg font-semibold text-foreground">History</h2>
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-background p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-border hover:bg-secondary/10 transition-colors">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-foreground text-sm sm:text-base">Algorithms Basics {i}</h4>
                                    <p className="text-xs text-muted-foreground">Completed on Feb 10, 2026</p>
                                </div>
                            </div>
                            <div className="text-left sm:text-right pl-8 sm:pl-0">
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
