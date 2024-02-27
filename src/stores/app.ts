import {defineStore} from "pinia"
import {Universle} from "@universle/sdk/src";

export const useAppStore = defineStore('app', {
    state: () => ({
        universle: new Universle(import.meta.env.VITE_UNIVERSLE_PUZZLE, import.meta.env.VITE_UNIVERSLE_URL)
    })
})