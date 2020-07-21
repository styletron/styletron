declare global {
  interface Window {
    __STYLETRON_DEVTOOLS__: any;
  }
}

export {default as Client} from "./client/client";
export type {
  MultiCache,
  Cache,
  clientOptionsT,
  hydrateT,
} from "./client/client";
export {default as Server} from "./server/server";
export type {sheetT, attrsT, serverOptionsT} from "./server/server";
export type {OnNewCacheFn, OnNewValueFn} from "./cache";
export type {default as SequentialIDGenerator} from "./sequential-id-generator";
