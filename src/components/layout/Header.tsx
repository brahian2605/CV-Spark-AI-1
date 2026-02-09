"use client";

import Link from "next/link";
import { User, LogOut, LayoutDashboard, Languages } from "lucide-react";
import { useTranslation } from "@/context/LanguageProvider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./Logo";

// Mock authentication status
const isAuthenticated = false;
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://picsum.photos/seed/user-avatar/100/100"
};

export function Header() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'es')}>
                  <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t('header.dashboard')}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('header.profile')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('header.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <nav className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">{t('header.login')}</Link>
              </Button>
              <Button asChild>
                <Link href="/register">{t('header.signup')}</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
