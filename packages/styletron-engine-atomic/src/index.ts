declare global {
  interface Window {
    __STYLETRON_DEVTOOLS__: any;
  }
}

export {default as Client} from "./client/client";
export {default as Server} from "./server/server";
