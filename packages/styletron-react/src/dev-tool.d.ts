export declare function addDebugMetadata(instance: any, stackIndex: any): void;
export declare const setupDevtoolsExtension: () => void;
declare class BrowserDebugEngine {
    private worker;
    private counter;
    constructor(worker: any);
    debug({ stackIndex, stackInfo }: {
        stackIndex: any;
        stackInfo: any;
    }): string;
}
declare class NoopDebugEngine {
    debug(): void;
}
declare global {
    var __BROWSER__: boolean;
}
export declare const DebugEngine: typeof BrowserDebugEngine | typeof NoopDebugEngine;
export {};
