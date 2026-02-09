'use client';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { PlusCircle, MoreVertical, Edit, Trash2, Loader2 } from "lucide-react";
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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useTranslation } from "@/context/LanguageProvider";
import { useUser, useCollection, useFirestore, useMemoFirebase, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import type { CvData } from "@/lib/types";
import { useEffect } from "react";

export default function DashboardPage() {
  const { t, language } = useTranslation();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const cvsCollectionQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, 'users', user.uid, 'cvs');
  }, [firestore, user]);

  const { data: cvs, isLoading: cvsLoading } = useCollection<CvData>(cvsCollectionQuery);

  const cvPreviews = {
    "cv-preview-1": PlaceHolderImages.find((i) => i.id === "cv-preview-1"),
    "cv-preview-2": PlaceHolderImages.find((i) => i.id === "cv-preview-2"),
  };
  
  const formatDate = (date: Date | { seconds: number, nanoseconds: number }) => {
    let d: Date;
    if (date instanceof Date) {
        d = date;
    } else if (date && typeof date.seconds === 'number') {
        d = new Date(date.seconds * 1000);
    } else {
        return 'N/A';
    }
    return d.toLocaleDateString(language);
  };
  
  const handleDelete = (cvId: string) => {
    if(!user) return;
    const docRef = doc(firestore, 'users', user.uid, 'cvs', cvId);
    deleteDocumentNonBlocking(docRef);
  };
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || cvsLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-8 flex items-center justify-center">
           <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-headline">{t('dashboard.title')}</h1>
            <Button asChild>
              <Link href="/editor/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('dashboard.createButton')}
              </Link>
            </Button>
          </div>

          {cvs && cvs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cvs.map((cv, index) => {
                const previewImageKey = index % 2 === 0 ? "cv-preview-1" : "cv-preview-2";
                const previewImage = cvPreviews[previewImageKey as keyof typeof cvPreviews];
                return (
                  <Card key={cv.id} className="group flex flex-col">
                    <CardHeader className="flex-row items-start justify-between">
                      <div className="space-y-1.5">
                        <CardTitle>{cv.title}</CardTitle>
                        <CardDescription>
                          {t('dashboard.updated')} {formatDate(cv.updatedAt)}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/editor/${cv.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              {t('dashboard.edit')}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(cv.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('dashboard.delete')}
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
                         <Link href={`/editor/${cv.id}`}>{t('dashboard.editCv')}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{t('dashboard.emptyTitle')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('dashboard.emptyDescription')}
              </p>
              <Button asChild>
                <Link href="/editor/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t('dashboard.createButton')}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
