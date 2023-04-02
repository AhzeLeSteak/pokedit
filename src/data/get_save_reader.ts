import {Language, Version} from "../firebase/types";
import {Gen1SaveReader} from "./Gen1/Gen1SaveReader";

export function get_reader(version: Version, language: Language, buffer: Uint8Array){
    switch (version) {
        case "yellow":
        case "blue":
        case "red":
            return new Gen1SaveReader(buffer, language);
        default:
            throw new Error('Unsupported game version');
    }
}