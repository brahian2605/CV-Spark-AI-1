'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/layout/Logo";
import { useTranslation } from "@/context/LanguageProvider";
import { useAuth, useUser, initiateEmailSignIn, initiateGoogleSignIn } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.26.58 4.45 1.62l2.46-2.38C18.25.96 15.48 0 12.48 0 5.88 0 .81 5.22.81 12s5.07 12 11.67 12c3.4 0 6.33-1.15 8.44-3.35 2.15-2.2 2.76-5.4 2.76-8.52 0-.75-.08-1.48-.2-2.18h-11Z"
      />
    </svg>
  );

export default function LoginPage() {
  const { t } = useTranslation();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleAuthError = (error: any) => {
    let description = t('errors.unknown');
    
    if (error.code) {
      switch (error.code) {
        case 'auth/wrong-password':
          description = t('errors.wrongPassword');
          break;
        case 'auth/user-not-found':
          description = t('errors.userNotFound');
          break;
        case 'auth/email-already-in-use':
          description = t('errors.emailAlreadyInUse');
          break;
        case 'auth/operation-not-allowed':
          description = t('errors.operationNotAllowed');
          break;
        case 'auth/weak-password':
          description = t('errors.weakPassword');
          break;
        case 'auth/popup-closed-by-user':
          description = t('errors.popupClosed');
          break;
        case 'auth/cancelled-popup-request':
            description = t('errors.popupCancelled');
            break;
        default:
          description = `${t('errors.unknown')} (${error.code})`;
          break;
      }
    }
    toast({
      variant: "destructive",
      title: t('errors.authFailedTitle'),
      description: description,
    });
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    initiateEmailSignIn(auth, email, password)
      .catch((error) => {
        handleAuthError(error);
        setIsLoading(false);
      });
  };
  
  const handleGoogleLogin = () => {
    setIsLoading(true);
    initiateGoogleSignIn(auth)
      .catch((error) => {
        handleAuthError(error);
        setIsLoading(false);
      });
  };
  
  if (isUserLoading || user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="w-full max-w-md p-4">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-headline">{t('login.welcome')}</CardTitle>
            <CardDescription>
              {t('login.credentials')}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleEmailLogin}>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="w-full" type="button" onClick={handleGoogleLogin}>
                <GoogleIcon className="mr-2 h-4 w-4" />
                {t('login.google')}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {t('login.orContinue')}
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('login.emailLabel')}</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('login.passwordLabel')}</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    {t('login.forgotPassword')}
                  </Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('login.loginButton')}
              </Button>
              <div className="text-center text-sm">
                {t('login.noAccount')}{" "}
                <Link href="/register" className="underline">
                  {t('login.signupLink')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
