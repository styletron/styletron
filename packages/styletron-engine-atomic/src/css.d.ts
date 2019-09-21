export declare function atomicSelector(id: string, pseudo: string): string;
export declare function keyframesToBlock(keyframes: {
    [x: string]: any;
}): string;
export declare function declarationsToBlock(style: any): string;
export declare function keyframesBlockToRule(id: string, block: string): string;
export declare function fontFaceBlockToRule(id: string, block: string): string;
export declare function styleBlockToRule(selector: string, block: string): string;
