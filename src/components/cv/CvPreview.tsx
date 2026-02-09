'use client';

import type { CvData, CvTemplate } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ModernTemplate } from './templates/ModernTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';

interface CvPreviewProps {
  data: Partial<CvData>;
  onTemplateChange: (template: CvTemplate) => void;
}

const templates: { value: CvTemplate; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'professional', label: 'Professional' },
  { value: 'minimalist', label: 'Minimalist' },
];

export function CvPreview({ data, onTemplateChange }: CvPreviewProps) {
  const renderTemplate = () => {
    switch (data.template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center gap-6">
      <div className="w-full max-w-xs">
        <Select
          defaultValue={data.template}
          onValueChange={(value: CvTemplate) => onTemplateChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.value} value={template.value}>
                {template.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full max-w-[8.5in] aspect-[8.5/11] bg-white shadow-lg rounded-md overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
}
