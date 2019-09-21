import { StyleObject } from "styletron-standard";
import { MultiCache } from "./cache";
export default function injectStylePrefixed(styleCache: MultiCache<{
    pseudo: string;
    block: string;
}>, styles: StyleObject, media: string, pseudo: string): string;
