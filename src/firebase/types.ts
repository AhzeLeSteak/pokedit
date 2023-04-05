
export type Version =
    'blue' | 'red' | 'yellow' | 'green' |
    'silver' | 'gold' | 'cristal';

export const GENERATIONS: Array<{label: string, versions: Array<{value: Version, label: string}>}> = [
    {
        label: 'Generation 1',
        versions: [
            {value: 'blue', label: 'Blue'},
            {value: 'red', label: 'Red'},
            {value: 'yellow', label: 'Yellow'},
            {value: 'green', label: 'Green'}

        ]
    },
    {
        label: 'Generation 2',
        versions: [
            {value: 'silver', label: 'Silver'},
            {value: 'gold', label: 'Gold'},
            {value: 'cristal', label: 'Cristal'}
        ]
    }
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
