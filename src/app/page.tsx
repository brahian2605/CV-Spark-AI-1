import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary-foreground" />,
    title: "Modern Templates",
    description: "Choose from a selection of modern, professional, and minimalist templates to best represent you.",
    image: PlaceHolderImages.find(img => img.id === 'template-feature'),
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary-foreground" />,
    title: "AI-Powered Assistant",
    description: "Generate a compelling professional profile with our AI assistant, tailored to your experience and goals.",
    image: PlaceHolderImages.find(img => img.id === 'ai-feature'),
  },
  {
    icon: <Download className="h-8 w-8 text-primary-foreground" />,
    title: "Export to PDF",
    description: "Easily download your finished CV as a high-quality PDF, ready to be shared with recruiters.",
    image: PlaceHolderImages.find(img => img.id === 'pdf-feature'),
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Create your next CV with the power of AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Build a professional CV that stands out. Use our modern templates and AI assistant to craft the perfect resume in minutes.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Create My CV <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={650}
                  height={400}
                  className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
                />
              )}
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Craft Your Future</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CV Spark AI provides all the tools you need to build a CV that opens doors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="p-4 bg-primary rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Land Your Dream Job?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start building your professional CV today. It's fast, easy, and intelligent.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg">
                <Link href="/register">
                  Sign Up for Free
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 CV Spark AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
