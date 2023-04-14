import {Language, Version} from "../firebase/types";
import {Gen1SaveReader} from "./Gen1/Gen1SaveReader";
import {Gen2SaveReader} from "./Gen2/Gen2SaveReader";

export function get_reader(version: Version, language: Language, buffer: Uint8Array){
    switch (version) {
        case "yellow":
        case "blue":
        case "red":
        case "green":
            return new Gen1SaveReader(buffer, language);
        case "cristal":
        case "gold":
        case "silver":
            return new Gen2SaveReader(buffer, language, version);
        default:
            throw new Error('Unsupported game version');
    }
}
