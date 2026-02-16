
import Link from "next/link";
import { Code, Video, BarChart, ArrowRight } from "lucide-react";

export default function PlacementLandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-16 sm:py-24 bg-background">
                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-foreground tracking-tight">
                        Ace Your Placement
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Practice, assess, and prepare for your dream job with our comprehensive readiness platform.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/placement/dashboard"
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg text-base sm:text-lg font-semibold hover:brightness-110 transition-all shadow-lg"
                        >
                            Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card border-y border-border">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        {/* Feature 1 */}
                        <div className="p-6 sm:p-8 rounded-xl bg-background border border-border hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold font-serif mb-3 sm:mb-4 text-foreground">Practice Problems</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Master data structures and algorithms with our curated collection of coding challenges.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 sm:p-8 rounded-xl bg-background border border-border hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Video className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold font-serif mb-3 sm:mb-4 text-foreground">Mock Interviews</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Simulate real interview scenarios with AI-driven mock interviews and feedback.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 sm:p-8 rounded-xl bg-background border border-border hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <BarChart className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold font-serif mb-3 sm:mb-4 text-foreground">Track Progress</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Visualize your readiness journey with detailed analytics and performance insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-muted-foreground text-sm bg-background border-t border-border">
                <p>&copy; {new Date().getFullYear()} Vantage Placement Readiness. All rights reserved.</p>
            </footer>
        </div>
    );
}
