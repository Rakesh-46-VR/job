import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { ResumeData, TemplateType } from "../../types";
import { Printer, Copy, AlertTriangle, ExternalLink, Github, Check } from "lucide-react";
import { useState, useEffect } from "react";

type ColorTheme = "teal" | "navy" | "burgundy" | "forest" | "charcoal";

const COLOR_THEMES = {
    teal: "hsl(168, 60%, 40%)",
    navy: "hsl(220, 60%, 35%)",
    burgundy: "hsl(345, 60%, 35%)",
    forest: "hsl(150, 50%, 30%)",
    charcoal: "hsl(0, 0%, 25%)"
};

interface ResumePreviewProps {
    data: ResumeData;
    template: TemplateType;
    onTemplateChange: (template: TemplateType) => void;
}

export function ResumePreview({ data, template, onTemplateChange }: ResumePreviewProps) {
    const [copySuccess, setCopySuccess] = useState(false);
    const [colorTheme, setColorTheme] = useState<ColorTheme>("teal");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Load color theme from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("resumeColorTheme");
        if (saved && saved in COLOR_THEMES) {
            setColorTheme(saved as ColorTheme);
        }
    }, []);

    // Save color theme to localStorage
    useEffect(() => {
        localStorage.setItem("resumeColorTheme", colorTheme);
    }, [colorTheme]);

    const accentColor = COLOR_THEMES[colorTheme];

    const getTemplateStyles = () => {
        const base = {
            container: "bg-white print:shadow-none print:border-none",
            header: "",
            title: "",
            subtitle: "",
            body: "",
            spacing: "",
            headerStyle: {},
            nameStyle: {}
        };

        switch (template) {
            case "classic":
                return {
                    ...base,
                    header: "text-xs font-bold uppercase mb-2 pb-1",
                    title: "font-bold text-sm text-gray-900",
                    subtitle: "text-xs text-gray-600",
                    body: "text-sm leading-relaxed text-gray-800",
                    spacing: "mb-3",
                    headerStyle: { color: accentColor, borderBottom: `2px solid ${accentColor}` },
                    nameStyle: { color: accentColor }
                };
            case "modern":
                return {
                    ...base,
                    header: "text-sm font-extrabold mb-3 tracking-tight uppercase",
                    title: "font-bold text-sm text-black",
                    subtitle: "text-xs text-gray-500 font-medium",
                    body: "text-sm leading-snug text-gray-700",
                    spacing: "mb-4",
                    headerStyle: { color: accentColor },
                    nameStyle: { color: accentColor }
                };
            case "minimal":
                return {
                    ...base,
                    header: "text-xs font-semibold mb-2 tracking-widest uppercase",
                    title: "font-medium text-sm text-gray-900",
                    subtitle: "text-xs text-gray-400",
                    body: "text-sm leading-loose text-gray-600",
                    spacing: "mb-2",
                    headerStyle: { color: accentColor },
                    nameStyle: { color: accentColor }
                };
            default: return base;
        }
    };

    const styles = getTemplateStyles();

    const handlePrint = () => {
        window.print();
        setToastMessage("PDF export ready! Check your downloads.");
        setShowToast(true);
    };

    const handleCopyText = () => {
        const textParts = [
            data.personalInfo.fullName,
            data.personalInfo.role,
            `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
            data.links.linkedin,
            data.links.github,
            data.links.portfolio,
            "\nSUMMARY",
            data.summary,
            "\nEDUCATION",
            ...data.education.map(e => `${e.degree}, ${e.school} (${e.year})`),
            "\nEXPERIENCE",
            ...data.experience.map(e => `${e.title}, ${e.company} (${e.duration})\n${e.bullets.map(b => `- ${b}`).join('\n')}`),
            "\nPROJECTS",
            ...data.projects.map(p => `${p.title} (${p.techStack.join(', ')})\n${p.description}`),
            "\nSKILLS",
            `Technical: ${data.skills.technical.join(", ")}`,
            `Soft: ${data.skills.soft.join(", ")}`,
            `Tools: ${data.skills.tools.join(", ")}`,
        ].filter(Boolean).join('\n');

        navigator.clipboard.writeText(textParts).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    // Validation Check
    const isMissingName = !data.personalInfo.fullName.trim();
    const isMissingContent = data.experience.length === 0 && data.projects.length === 0;
    const showWarning = isMissingName || isMissingContent;

    return (
        <Card className={`p-0 bg-white shadow-lg overflow-hidden flex flex-col h-full print:shadow-none print:border-none`}>
            {/* Toolbar - Hidden on Print */}
            <div className="p-4 border-b bg-gray-50 flex flex-col gap-4 print:hidden">
                {/* Template Thumbnails */}
                <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Template</p>
                    <div className="flex gap-3">
                        {/* Classic Template */}
                        <button
                            onClick={() => onTemplateChange("classic")}
                            className={`w-30 h-35 border-2 rounded-lg overflow-hidden bg-white transition-all hover:scale-105 ${template === "classic" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                                }`}
                        >
                            <div className="p-2 h-full flex flex-col gap-1">
                                <div className="h-3 bg-gray-300 rounded"></div>
                                <div className="h-0.5 bg-gray-400 w-full"></div>
                                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-0.5 bg-gray-400 w-full mt-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-0.5 bg-gray-400 w-full mt-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                                {template === "classic" && (
                                    <div className="mt-auto flex justify-center">
                                        <Check className="w-5 h-5 text-blue-500" />
                                    </div>
                                )}
                            </div>
                        </button>

                        {/* Modern Template */}
                        <button
                            onClick={() => onTemplateChange("modern")}
                            className={`w-30 h-35 border-2 rounded-lg overflow-hidden bg-white transition-all hover:scale-105 ${template === "modern" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                                }`}
                        >
                            <div className="p-2 h-full flex gap-2">
                                <div className="w-10 bg-gray-300 rounded"></div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="h-3 bg-gray-300 rounded"></div>
                                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-2 bg-gray-200 rounded w-full mt-1"></div>
                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                                    {template === "modern" && (
                                        <div className="mt-auto flex justify-center">
                                            <Check className="w-5 h-5 text-blue-500" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>

                        {/* Minimal Template */}
                        <button
                            onClick={() => onTemplateChange("minimal")}
                            className={`w-30 h-35 border-2 rounded-lg overflow-hidden bg-white transition-all hover:scale-105 ${template === "minimal" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                                }`}
                        >
                            <div className="p-3 h-full flex flex-col gap-2">
                                <div className="h-3 bg-gray-300 rounded"></div>
                                <div className="h-2 bg-gray-200 rounded w-2/3 mt-2"></div>
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-2 bg-gray-200 rounded w-1/2 mt-2"></div>
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-2 bg-gray-200 rounded w-3/4 mt-2"></div>
                                {template === "minimal" && (
                                    <div className="mt-auto flex justify-center">
                                        <Check className="w-5 h-5 text-blue-500" />
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Color Theme Picker */}
                <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Color Theme</p>
                    <div className="flex gap-2">
                        {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((color) => (
                            <button
                                key={color}
                                onClick={() => setColorTheme(color)}
                                className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${colorTheme === color ? "ring-2 ring-offset-2 ring-blue-500" : ""
                                    }`}
                                style={{ backgroundColor: COLOR_THEMES[color] }}
                                title={color.charAt(0).toUpperCase() + color.slice(1)}
                            />
                        ))}
                    </div>
                </div>

                {showWarning && (
                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Your resume looks incomplete. Add Name & Content.</span>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button onClick={handlePrint} size="sm" className="flex-1 gap-2">
                        <Printer className="w-4 h-4" /> Print PDF
                    </Button>
                    <Button
                        onClick={handleCopyText}
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-2"
                    >
                        <Copy className="w-4 h-4" /> {copySuccess ? "Copied!" : "Copy Text"}
                    </Button>
                </div>
            </div>

            {/* Resume Content */}
            <div
                id="resume-content"
                className="p-8 md:p-10 bg-white min-h-200 print:p-0 print:min-h-0 text-black"
            >
                {/* Header */}
                <div className="mb-6 text-center border-b pb-4 border-gray-100">
                    <h1 className="text-3xl font-bold uppercase tracking-wide mb-1" style={styles.nameStyle}>
                        {data.personalInfo.fullName || "Your Name"}
                    </h1>
                    {data.personalInfo.role && (
                        <p className="text-lg text-gray-600 font-medium mb-2">{data.personalInfo.role}</p>
                    )}
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                    </div>
                    {(data.links.linkedin || data.links.github || data.links.portfolio) && (
                        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-500">
                            {data.links.linkedin && <span>LinkedIn: {data.links.linkedin}</span>}
                            {data.links.github && <span>GitHub: {data.links.github}</span>}
                            {data.links.portfolio && <span>Portfolio: {data.links.portfolio}</span>}
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="space-y-6">
                    {data.summary && (
                        <div>
                            <h4 className={styles.header} style={styles.headerStyle}>Summary</h4>
                            <p className={styles.body}>{data.summary}</p>
                        </div>
                    )}

                    {/* New Skills Section */}
                    {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
                        <div>
                            <h4 className={styles.header} style={styles.headerStyle}>Skills</h4>
                            <div className="space-y-2">
                                {data.skills.technical.length > 0 && (
                                    <div className="flex flex-wrap gap-x-2 text-sm">
                                        <span className="font-semibold text-gray-700">Technical:</span>
                                        <span className="text-gray-600">{data.skills.technical.join(" • ")}</span>
                                    </div>
                                )}
                                {data.skills.tools.length > 0 && (
                                    <div className="flex flex-wrap gap-x-2 text-sm">
                                        <span className="font-semibold text-gray-700">Tools:</span>
                                        <span className="text-gray-600">{data.skills.tools.join(" • ")}</span>
                                    </div>
                                )}
                                {data.skills.soft.length > 0 && (
                                    <div className="flex flex-wrap gap-x-2 text-sm">
                                        <span className="font-semibold text-gray-700">Soft Skills:</span>
                                        <span className="text-gray-600">{data.skills.soft.join(" • ")}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div>
                            <h4 className={styles.header} style={styles.headerStyle}>Experience</h4>
                            {data.experience.map((exp, i) => (
                                <div key={i} className={`${styles.spacing} break-inside-avoid page-break-inside-avoid`}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className={styles.title}>{exp.title}</p>
                                        <p className="text-xs font-semibold text-gray-600">{exp.duration}</p>
                                    </div>
                                    <p className={`${styles.subtitle} mb-1 italic`}>{exp.company}</p>
                                    <ul className={`text-sm mt-1 space-y-1 pl-4 ${exp.bulletStyle === "number"
                                            ? "list-decimal"
                                            : "list-disc"
                                        }`}>
                                        {exp.bullets.filter(b => b.trim()).map((bullet, bi) => (
                                            <li key={bi} className="text-gray-700 leading-snug">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* New Projects Section */}
                    {data.projects.length > 0 && (
                        <div>
                            <h4 className={styles.header} style={styles.headerStyle}>Projects</h4>
                            <div className="grid grid-cols-1 gap-3">
                                {data.projects.map((proj, i) => (
                                    <div key={proj.id || i} className={`border border-gray-200 rounded p-3 break-inside-avoid page-break-inside-avoid bg-gray-50/50 print:bg-transparent print:border-gray-200`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className="font-bold text-sm">{proj.title}</h5>
                                            <div className="flex gap-2 print:hidden">
                                                {proj.liveUrl && <ExternalLink className="w-3 h-3 text-gray-400" />}
                                                {proj.githubUrl && <Github className="w-3 h-3 text-gray-400" />}
                                            </div>
                                        </div>
                                        {proj.techStack && proj.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {proj.techStack.map((tech, ti) => (
                                                    <span key={ti} className="text-[10px] uppercase font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded print:bg-transparent print:p-0 print:border print:border-gray-200">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-700 leading-snug">{proj.description}</p>

                                        {/* Print Links (Text Only) */}
                                        <div className="hidden print:block mt-2 text-[10px] text-gray-500 space-x-3">
                                            {proj.liveUrl && <span>Live: {proj.liveUrl}</span>}
                                            {proj.githubUrl && <span>Code: {proj.githubUrl}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div className="break-inside-avoid">
                            <h4 className={styles.header} style={styles.headerStyle}>Education</h4>
                            {data.education.map((edu, i) => (
                                <div key={i} className={styles.spacing}>
                                    <div className="flex justify-between items-baseline">
                                        <p className={styles.title}>{edu.degree}</p>
                                        <p className="text-xs font-semibold text-gray-600">{edu.year}</p>
                                    </div>
                                    <p className={styles.subtitle}>{edu.school}</p>
                                    {edu.gpa && <p className={styles.subtitle}>GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!data.personalInfo.fullName && !data.summary && data.education.length === 0 &&
                    data.experience.length === 0 && data.projects.length === 0 &&
                    data.skills.technical.length === 0 && (
                        <p className="text-sm text-muted-foreground italic text-center py-8 print:hidden">
                            Start filling out the form to see your resume preview
                        </p>
                    )}
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    @page { margin: 0.5in; size: auto; }
                    body * {
                        visibility: hidden;
                    }
                    div[class*="AppLayout"], header, aside, nav {
                        display: none !important;
                    }
                    #resume-content, #resume-content * {
                        visibility: visible;
                    }
                    #resume-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        background: white !important;
                        color: black !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                    .text-muted-foreground {
                        color: #555 !important;
                    }
                    .bg-primary {
                        background-color: transparent !important;
                        color: black !important; 
                    }
                }
            `}</style>

            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </Card>
    );
}
