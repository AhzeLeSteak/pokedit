
export type Version =
    'blue' | 'red' | 'yellow';

export const VERSIONS: Array<{value: Version, label: string}> = [
    {value: 'blue', label: 'Blue'},
    {value: 'red', label: 'Red'},
    {value: 'yellow', label: 'Yellow'},
];

export type Language = 'FR' | 'EN' | 'JP' | 'GR' | 'IT' | 'SP';
export const LANGUAGES: Array<{value: Language, label: string}> = [
    {value: 'FR', label: 'Français'},
    {value: 'EN', label: 'English'},
    {value: 'JP', label: '日本語'},
    {value: 'GR', label: 'Deutch'},
    {value: 'IT', label: 'Italiano'},
    {value: 'SP', label: 'Español'},
];

export interface SaveFile {
    uid: string,
    version : Version,
    name: string,
    language: Language,
    file: number[],
    file_name: string
}
