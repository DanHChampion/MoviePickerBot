import { Injectable } from '@angular/core';
import { LABELS } from '../constants/translations/en-GB';

@Injectable({ providedIn: 'root' })
export class TranslationsService {
    public labels = LABELS;

    getLabel(category: keyof typeof LABELS, key: string): string {
        return (LABELS[category] as Record<string, string>)[key] ?? key;
    }

    getLabels(category: keyof typeof LABELS, keys: string[]): string[] {
        return keys.map(key => this.getLabel(category, key));
    }
}