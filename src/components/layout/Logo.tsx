'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/context/LanguageProvider';

export function Logo() {
  const { t } = useTranslation();
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Sparkles className="h-6 w-6 text-primary-foreground fill-primary" />
      <span className="font-bold font-headline text-lg">{t('logo.appName')}</span>
    </Link>
  );
}
