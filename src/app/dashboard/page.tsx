import Link from "next/link";
import Image from "next/image";
import { PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header } from "@/components/layout/Header";
import { cvs } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function DashboardPage() {
  const cvPreviews = {
    "1": PlaceHolderImages.find((i) => i.id === "cv-preview-1"),
    "2": PlaceHolderImages.find((i) => i.id === "cv-preview-2"),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-headline">My CVs</h1>
            <Button asChild>
              <Link href="/editor/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New CV
              </Link>
            </Button>
          </div>

          {cvs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cvs.map((cv) => {
                const previewImage = cvPreviews[cv.id as keyof typeof cvPreviews];
                return (
                  <Card key={cv.id} className="group flex flex-col">
                    <CardHeader className="flex-row items-start justify-between">
                      <div className="space-y-1.5">
                        <CardTitle>{cv.title}</CardTitle>
                        <CardDescription>
                          Updated {new Date(cv.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center p-2">
                        {previewImage && (
                            <Image
                                src={previewImage.imageUrl}
                                alt={`Preview of ${cv.title}`}
                                data-ai-hint={previewImage.imageHint}
                                width={300}
                                height={424}
                                className="rounded-md object-contain border border-muted"
                            />
                        )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="secondary" className="w-full as-child">
                         <Link href={`/editor/${cv.id}`}>Edit CV</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">No CVs Yet</h2>
              <p className="text-muted-foreground mb-4">
                Click the button to create your first professional CV.
              </p>
              <Button asChild>
                <Link href="/editor/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New CV
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
