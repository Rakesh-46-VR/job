
import { Code2, ArrowRight } from "lucide-react";

export default function PracticePage() {
    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-foreground">Practice Problems</h1>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg hover:brightness-110 transition-colors shadow-sm text-sm sm:text-base">New Problem</button>
                    <button className="flex-1 sm:flex-none px-4 py-2 border border-primary text-primary rounded-lg hover:bg-secondary/20 transition-colors text-sm sm:text-base">Filter</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                <Code2 className="w-6 h-6" />
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-primary bg-secondary/50 rounded-full border border-border">
                                Easy
                            </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            Two Sum Is Easy? {i}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                        </p>
                        <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                            Start Solving <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
