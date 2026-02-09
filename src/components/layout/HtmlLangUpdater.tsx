'use client';

import { useTranslation } from '@/context/LanguageProvider';
import { useEffect } from 'react';

export function HtmlLangUpdater() {
    const { language } = useTranslation();
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);
    return null;
}
