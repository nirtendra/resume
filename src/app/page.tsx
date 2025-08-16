import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot, Download, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">ResuMaster AI</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-gray-900 dark:text-white">
            Craft Your Perfect Resume with AI
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            ResuMaster AI helps you build modern, ATS-friendly resumes effortlessly. Get AI-powered suggestions and prepare for your next interview like a pro.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Build Your Resume Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="bg-white dark:bg-card py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-headline font-bold">Why Choose ResuMaster AI?</h3>
              <p className="mt-2 text-muted-foreground">Everything you need to land your dream job.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h4 className="mt-4 text-xl font-headline font-semibold">ATS-Friendly Templates</h4>
                <p className="mt-2 text-muted-foreground">
                  Choose from a variety of professionally designed templates that are optimized to pass through applicant tracking systems.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h4 className="mt-4 text-xl font-headline font-semibold">AI-Powered Interview Prep</h4>
                <p className="mt-2 text-muted-foreground">
                  Analyze job descriptions to get tailored interview questions and talking points, helping you prepare with confidence.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h4 className="mt-4 text-xl font-headline font-semibold">Multiple Download Formats</h4>
                <p className="mt-2 text-muted-foreground">
                  Easily download your finished resume in PDF format, ready to be sent to recruiters and hiring managers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ResuMaster AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
