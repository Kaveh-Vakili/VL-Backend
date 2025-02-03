// src/types/mammoth.d.ts
declare module 'mammoth' {
    export interface Options {
        buffer?: Buffer;
        path?: string;
        arrayBuffer?: ArrayBuffer;
    }

    export interface Result {
        value: string;
        messages: any[];
    }

    export function convertToHtml(input: Options): Promise<Result>;
}