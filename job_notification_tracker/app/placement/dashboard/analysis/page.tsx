
"use client";

import { useState, useEffect } from "react";
import { analyzeJobDescription, AnalysisResult } from "@/utils/placement-analysis";
import { Card } from "@/components/ui/Card";
import {
    ArrowRight,
    BarChart,
    CheckCircle2,
    History,
    PlusCircle,
    Target,
    FileText,
    CalendarDays,
    ListChecks,
    HelpCircle,
    Briefcase,
    Copy,
    Download,
    AlertCircle,
    Building2,
    Users
} from "lucide-react";

export default function AnalysisPage() {
    const [activeTab, setActiveTab] = useState<"new" | "history" | "result">("new");
    const [history, setHistory] = useState<AnalysisResult[]>([]);
    const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
    const [copiedState, setCopiedState] = useState<string | null>(null);

    // Form State
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [jdText, setJdText] = useState("");
    const [jdError, setJdError] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Load History on Mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("placement_analysis_history");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Basic validation to check for a valid array
                    if (Array.isArray(parsed)) {
                        setHistory(parsed);
                    }
                } catch (e) {
                    console.error("Failed to parse history", e);
                    // If corrupted, we just leave history empty or could clear it
                    // localStorage.removeItem("placement_analysis_history");
                }
            }
        }
    }, []);

    // Save updated history
    const updateHistory = (updatedItem: AnalysisResult) => {
        const newHistory = history.map(item => item.id === updatedItem.id ? updatedItem : item);
        setHistory(newHistory);
        localStorage.setItem("placement_analysis_history", JSON.stringify(newHistory));
        setCurrentAnalysis(updatedItem);
    };

    // Save analysis
    const handleAnalyze = () => {
        if (jdText.length < 200) {
            setJdError("This JD is too short to analyze deeply. Paste full JD for better output.");
            return;
        }
        setJdError("");
        setIsAnalyzing(true);
        setTimeout(() => {
            const result = analyzeJobDescription(company, role, jdText);
            setCurrentAnalysis(result);

            const updatedHistory = [result, ...history];
            setHistory(updatedHistory);
            localStorage.setItem("placement_analysis_history", JSON.stringify(updatedHistory));

            setIsAnalyzing(false);
            setActiveTab("result");
        }, 1500);
    };

    // Select history item
    const handleSelectHistory = (item: AnalysisResult) => {
        setCurrentAnalysis(item);
        setActiveTab("result");
    };

    const startNew = () => {
        setCompany("");
        setRole("");
        setJdText("");
        setActiveTab("new");
    };

    // Skill Interaction Handlers
    const handleSkillToggle = (skill: string) => {
        if (!currentAnalysis || !currentAnalysis.skillConfidenceMap) return;

        const currentStatus = currentAnalysis.skillConfidenceMap[skill];
        const newStatus: "know" | "practice" = currentStatus === "know" ? "practice" : "know";

        // Calculate Score Diff
        let scoreDiff = 0;
        if (newStatus === "know") scoreDiff = 4; // - -2 (remove penalty) + +2 (add bonus) = +4 equivalent shift
        else scoreDiff = -4;

        // Recalibrated Score Logic
        // "Know" = +3 confident points
        // "Practice" = 0 points (neutral/to-do state) or slight penalty if reverting

        let scoreChange = 0;

        if (newStatus === "know") {
            // Moving Practice -> Know
            scoreChange = 3;
        } else {
            // Moving Know -> Practice
            scoreChange = -3;
        }

        const newMap: Record<string, "know" | "practice"> = { ...currentAnalysis.skillConfidenceMap, [skill]: newStatus };

        // Bounds check 0-100
        let newScore = currentAnalysis.readinessScore + scoreChange;
        newScore = Math.max(0, Math.min(100, newScore));

        const updatedAnalysis: AnalysisResult = {
            ...currentAnalysis,
            skillConfidenceMap: newMap,
            readinessScore: newScore,
            updatedAt: new Date().toISOString()
        };
        updateHistory(updatedAnalysis);
    };

    // Export Tools
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedState(label);
        setTimeout(() => setCopiedState(null), 2000);
    };

    const downloadTxt = () => {
        if (!currentAnalysis) return;
        const content = `
ANALYSIS REPORT FOR: ${currentAnalysis.role} at ${currentAnalysis.company}
Date: ${new Date(currentAnalysis.createdAt).toLocaleString()}
Readiness Score: ${currentAnalysis.readinessScore}/100
--------------------------------------------------

KEY SKILLS:
${Object.entries(currentAnalysis.extractedSkills).map(([cat, skills]) => `${cat}: ${skills.join(", ")}`).join("\n")}

7-DAY STRATEGY PLAN:
${currentAnalysis.plan.map(d => `[${d.day}] ${d.focus}\n${d.tasks.map(t => `  - ${t}`).join("\n")}`).join("\n\n")}

ROUND CHECKLIST:
${Object.entries(currentAnalysis.checklist).map(([r, items]) => `${r}:\n${items.map(i => `  [ ] ${i}`).join("\n")}`).join("\n\n")}

LIKELY QUESTIONS:
${currentAnalysis.questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
    `;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Analysis_${currentAnalysis.role.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const getWeakSkills = () => {
        if (!currentAnalysis?.skillConfidenceMap) return [];
        return Object.entries(currentAnalysis.skillConfidenceMap)
            .filter(([_, status]) => status === "practice")
            .map(([skill]) => skill)
            .slice(0, 3);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Job Description Analysis</h1>
                    <p className="text-gray-500 mt-1">Get an AI-powered breakdown of your target role.</p>
                </div>
                <div className="flex gap-2">
                    {activeTab === 'result' && (
                        <button
                            onClick={downloadTxt}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                        >
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                    )}
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'history' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <History className="w-4 h-4" /> History
                    </button>
                    <button
                        onClick={startNew}
                        className={`flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:brightness-110 shadow-sm transition-all`}
                    >
                        <PlusCircle className="w-4 h-4" /> New Analysis
                    </button>
                </div>
            </div>

            {activeTab === "new" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="max-w-3xl mx-auto p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Enter Job Details
                        </h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="e.g. Google, Amazon, Startup Inc."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role Title</label>
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="e.g. Frontend Engineer, SDE-1"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description (JD)</label>
                                <textarea
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                    placeholder="Paste the full job description here..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-64 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
                                />
                                {jdError && <p className="text-sm text-red-500 mt-2 font-medium">{jdError}</p>}
                                <p className={`text-xs mt-2 text-right ${jdText.length < 200 ? 'text-orange-500' : 'text-gray-500'}`}>
                                    {jdText.length} characters (min 200)
                                </p>
                            </div>
                            <button
                                onClick={handleAnalyze}
                                disabled={!jdText.trim() || isAnalyzing}
                                className="w-full py-3 bg-primary text-white rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex justify-center items-center gap-2"
                            >
                                {isAnalyzing ? (
                                    <>Analyzing...</>
                                ) : (
                                    <>Analyze Readiness <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === "history" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    {history.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No analysis history found. Start a new scan!</p>
                        </div>
                    ) : (
                        history.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleSelectHistory(item)}
                                className="group cursor-pointer bg-white p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-5 h-5 text-primary -translate-x-2 group-hover:translate-x-0 transition-transform" />
                                </div>
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg text-gray-900 truncate pr-8">{item.role || "Unknown Role"}</h3>
                                    <p className="text-sm text-gray-500">{item.company || "Unknown Company"}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className={`text-2xl font-bold ${getScoreColor(item.readinessScore)}`}>
                                            {item.readinessScore}
                                        </span>
                                        <span className="text-xs font-medium text-gray-500 mb-1">% Match</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "result" && currentAnalysis && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    {/* Header Summary */}
                    <div className="bg-white p-6 rounded-xl border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-2xl font-bold font-serif text-foreground">{currentAnalysis.role || "Analysis Results"}</h2>
                                {currentAnalysis.company && (
                                    <span className="px-3 py-1 bg-secondary text-foreground text-sm font-medium rounded-full">
                                        {currentAnalysis.company}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">Analyzed on {new Date(currentAnalysis.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-4 bg-secondary/30 px-6 py-3 rounded-lg border border-border">
                                <div className="text-right">
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Readiness Score</div>
                                    <div className={`text-3xl font-bold ${getScoreColor(currentAnalysis.readinessScore)}`}>
                                        {currentAnalysis.readinessScore}/100
                                    </div>
                                </div>
                                <Target className={`w-10 h-10 ${getScoreColor(currentAnalysis.readinessScore)}`} />
                            </div>
                            <p className="text-xs text-muted-foreground">*Updates live as you check skills</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Skills & Questions */}
                        <div className="space-y-8 lg:col-span-2">

                            {/* Company Intel Card */}
                            {currentAnalysis.companyIntel && (
                                <section className="card-intel bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                                    <div className="bg-primary/5 px-6 py-4 border-b border-border flex justify-between items-center">
                                        <h3 className="text-lg font-bold font-serif text-primary flex items-center gap-2">
                                            <Building2 className="w-5 h-5" /> Company Intelligence
                                        </h3>
                                        <span className="px-3 py-1 bg-white text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wide">
                                            {currentAnalysis.companyIntel.type}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Industry</p>
                                                <p className="text-foreground font-medium">{currentAnalysis.companyIntel.industry}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Hiring Focus</p>
                                                <p className="text-foreground font-medium text-sm">{currentAnalysis.companyIntel.hiringFocus}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Detected Skills */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold font-serif text-foreground flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary" /> Key Skills Extracted
                                    </h3>
                                    <span className="text-xs text-muted-foreground bg-white px-2 py-1 border rounded">Tap to toggle confidence</span>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                                    <div className="flex flex-wrap gap-4">
                                        {(Object.entries(currentAnalysis.extractedSkills) as [string, string[]][]).map(([category, skills]) => (
                                            <div key={category} className="flex-1 min-w-[200px]">
                                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 border-b pb-1">{category}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.map(skill => {
                                                        const status = currentAnalysis.skillConfidenceMap?.[skill] ?? "practice";
                                                        const isKnown = status === "know";
                                                        return (
                                                            <button
                                                                key={skill}
                                                                onClick={() => handleSkillToggle(skill)}
                                                                className={`px-3 py-1 text-sm font-medium rounded-md border transition-all ${isKnown
                                                                    ? "bg-primary/10 text-primary border-primary/20"
                                                                    : "bg-secondary/10 text-muted-foreground border-border hover:bg-secondary/30"
                                                                    }`}
                                                            >
                                                                {skill}
                                                                {isKnown && <span className="ml-1 text-xs">✓</span>}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* 7 Day Plan */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold font-serif text-foreground flex items-center gap-2">
                                        <CalendarDays className="w-5 h-5 text-primary" /> 7-Day Strategy Plan
                                    </h3>
                                    <button
                                        onClick={() => copyToClipboard(currentAnalysis.plan.map(d => `${d.day}: ${d.focus}`).join("\n"), "Plan")}
                                        className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                                    >
                                        {copiedState === "Plan" ? (
                                            <>
                                                <CheckCircle2 className="w-3 h-3 text-green-600" />
                                                <span className="text-green-600">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3 h-3" /> Copy
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {currentAnalysis.plan.map((day, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="px-3 py-1 bg-secondary text-primary text-xs font-bold rounded uppercase tracking-wide">
                                                    {day.day}
                                                </span>
                                                <span className="text-sm font-semibold text-foreground">
                                                    Focus: {day.focus}
                                                </span>
                                            </div>
                                            <ul className="space-y-2">
                                                {day.tasks.map((task, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5" />
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Action Next */}
                            <section className="bg-primary/5 border border-primary/10 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h4 className="text-lg font-bold font-serif text-foreground flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-5 h-5 text-primary" /> Recommended Actions
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Based on your assessment, you should prioritize:
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {getWeakSkills().map(s => (
                                            <span key={s} className="px-2 py-1 bg-white border border-border text-primary text-xs font-bold rounded">
                                                {s}
                                            </span>
                                        ))}
                                        {getWeakSkills().length === 0 ? <span className="text-sm font-medium">Everything looks good! Review basics.</span> : null}
                                    </div>
                                </div>
                                <button className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:brightness-110 transition-colors whitespace-nowrap">
                                    Start Day 1 Plan
                                </button>
                            </section>

                        </div>

                        {/* Right Column: Checklist & Questions */}
                        <div className="space-y-8">

                            {/* Round Mapping */}
                            {currentAnalysis.roundMapping && (
                                <section>
                                    <h3 className="text-lg font-bold font-serif text-foreground mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" /> Interview Rounds
                                    </h3>
                                    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                                        <div className="relative border-l-2 border-primary/20 ml-3 space-y-8">
                                            {currentAnalysis.roundMapping.map((round, idx) => (
                                                <div key={idx} className="relative pl-8">
                                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                                                    <h4 className="text-sm font-bold text-foreground">{round.roundName}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{round.description}</p>
                                                    <div className="mt-2 text-xs bg-secondary/20 text-muted-foreground p-2 rounded border border-border italic">
                                                        <span className="font-semibold not-italic text-primary">Why this round: </span>
                                                        {round.whyItMatters}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Round Checklist */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold font-serif text-foreground flex items-center gap-2">
                                        <ListChecks className="w-5 h-5 text-primary" /> Round Preparation
                                    </h3>
                                    <button
                                        onClick={() => copyToClipboard(JSON.stringify(currentAnalysis.checklist, null, 2), "Checklist")}
                                        className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                                    >
                                        {copiedState === "Checklist" ? (
                                            <>
                                                <CheckCircle2 className="w-3 h-3 text-green-600" />
                                                <span className="text-green-600">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3 h-3" /> Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {Object.entries(currentAnalysis.checklist).map(([round, items]) => (
                                        <div key={round} className="bg-white p-4 rounded-lg border border-border">
                                            <h4 className="font-bold text-foreground text-sm mb-3">{round}</h4>
                                            <ul className="space-y-2">
                                                {items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                                        <input type="checkbox" className="mt-0.5 rounded text-primary focus:ring-primary" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Likely Questions */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold font-serif text-foreground flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" /> Likely Questions
                                    </h3>
                                    <button
                                        onClick={() => copyToClipboard(currentAnalysis.questions.join("\n"), "Questions")}
                                        className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                                    >
                                        {copiedState === "Questions" ? (
                                            <>
                                                <CheckCircle2 className="w-3 h-3 text-green-600" />
                                                <span className="text-green-600">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3 h-3" /> Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="bg-white p-0 overflow-hidden rounded-xl border border-border">
                                    <ul className="divide-y divide-border">
                                        {currentAnalysis.questions.map((q, i) => (
                                            <li key={i} className="p-4 text-sm text-gray-700 hover:bg-secondary/10 flex gap-3">
                                                <span className="font-bold text-primary min-w-[20px]">{i + 1}.</span>
                                                {q}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'result' && (
                <p className="text-center text-xs text-muted-foreground mt-8 pb-4">
                    Demo Mode: Company intel generated heuristically. Data is simulated for demonstration.
                </p>
            )}
        </div>
    );
}

function getScoreColor(score: number) {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-500";
}
