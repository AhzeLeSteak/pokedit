export type Location =
    | {location: 'party', pk_index: number}
    | {location: 'box', box_index: number, pk_index: number};
