import { Injectable } from '@angular/core';
import { LABELS } from '../constants/translations/en-GB';
import { GENRE_MAP } from '../constants/tmdb-map';

@Injectable({ providedIn: 'root' })
export class TranslationsService {
    public labels = LABELS;

    getLabel(category: keyof typeof LABELS, key: string): string {
        return (LABELS[category] as Record<string, string>)[key] ?? key;
    }

    getLabels(category: keyof typeof LABELS, keys: string[]): string[] {
        return keys.map(key => this.getLabel(category, key));
    }

    getYear(date: string): string {
        return date.split('-')[0];
    }

    getDate(date: string): string {
        const dateSplit: string[] = date.split('-');
        const monthLabel=  this.getLabel('month', '06')
        const day = String(Number(dateSplit[2]));
        return `${day} ${monthLabel}, ${dateSplit[0]}`;
    }

    getGenres(genreIds: string[]): string {
        const genreKeys = genreIds
            .map(id => Object.keys(GENRE_MAP).find(key => GENRE_MAP[key] === Number(id)))
            .filter((key): key is keyof typeof LABELS['genres'] => !!key);

        return this.getLabels('genres', genreKeys as string[]).join(', ');
    }
}