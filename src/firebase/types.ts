
export type Version =
    'blue' | 'red' | 'yellow';

export interface SaveFile {
    uid: string,
    version : Version,
    name: string,
    file: number[]
}
