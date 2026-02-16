import { Card } from "@/components/ui/Card";

interface AtsScoreCardProps {
    score: number;
    suggestions: string[];
    improvements: string[];
}

export function AtsScoreCard({ score, suggestions, improvements }: AtsScoreCardProps) {
    const getScoreData = () => {
        if (score >= 71) {
            return {
                color: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                strokeColor: "#16a34a",
                label: "Strong Resume"
            };
        }
        if (score >= 41) {
            return {
                color: "text-amber-600",
                bgColor: "bg-amber-50",
                borderColor: "border-amber-200",
                strokeColor: "#d97706",
                label: "Getting There"
            };
        }
        return {
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            strokeColor: "#dc2626",
            label: "Needs Work"
        };
    };

    const scoreData = getScoreData();
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <>
            {/* ATS Score with Circular Progress */}
            <Card className={`p-6 space-y-4 border-2 ${scoreData.bgColor} ${scoreData.borderColor}`}>
                <h3 className="text-sm font-bold uppercase tracking-wider">ATS Readiness Score</h3>
                
                {/* Circular Progress */}
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                            {/* Background circle */}
                            <circle
                                cx="64"
                                cy="64"
                                r="45"
                                stroke="#e5e7eb"
                                strokeWidth="8"
                                fill="none"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="64"
                                cy="64"
                                r="45"
                                stroke={scoreData.strokeColor}
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-500 ease-out"
                            />
                        </svg>
                        {/* Score display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-bold ${scoreData.color}`}>{score}</span>
                            <span className="text-xs text-gray-500">/100</span>
                        </div>
                    </div>
                    <p className={`mt-3 text-sm font-bold ${scoreData.color}`}>{scoreData.label}</p>
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <div className="pt-4 border-t border-current/20 space-y-2">
                        <p className="text-xs font-bold uppercase">Quick Wins</p>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto">
                            {suggestions.slice(0, 5).map((s, i) => (
                                <p key={i} className="text-xs">• {s}</p>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            {/* Top 3 Improvements */}
            {improvements.length > 0 && (
                <Card className="p-6 space-y-3 bg-blue-50/50 border-blue-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900">Top 3 Improvements</h3>
                    <div className="space-y-2">
                        {improvements.map((imp, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold shrink-0">{i + 1}.</span>
                                <p className="text-sm text-blue-900">{imp}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </>
    );
}
