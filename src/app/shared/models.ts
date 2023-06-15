export interface Chapter {
    german: string,
    croatian: string,
    chapterNr: string,
    vocables: Vocable[]
}

export interface Vocable {
    german: string,
    croatian: string,
    imagePath: string,
    audioNr: string,
    chapterIndex: number,
    checked: boolean
}

export class MyVocable {
    constructor(
        public croatian: string,
        public german: string,
        public audio: string
    ) { }
}

export interface Wordlist {
    name: string,
    items: {
        german: string,
        croatian:string
    }[]
}