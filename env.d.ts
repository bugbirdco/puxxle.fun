/// <reference types="vite/client" />

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

// declare global {
//     import Bootstrap from "@types/bootstrap"
//
//     interface Window {
//         bootstrap: Bootstrap
//     }
// }