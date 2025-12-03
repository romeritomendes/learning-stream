import type { ReadStream } from 'node:fs';
import { Transform } from 'node:stream';

export class CsvProcessor {
    file: ReadStream;

    constructor({ file }: { file: ReadStream }) {
        this.file = file;
    }

    convertCsvToJSON(separated: string = ',') {
        let csvLine: Object[] = [];
        const transform = new Transform({
            transform(chunk, encoding, callback) {
                const bufLine: string[] = chunk.toString().split('\r\n');;
                console.log(bufLine)

                let headerLine = [''];
                bufLine.forEach((line, idx) => {
                    if(idx === 0) {
                        headerLine = line.split(separated);
                        return;
                    }

                    const rowLine = line.split(separated);
                    const jsonLine: Record<string, string> = {};
                    headerLine.forEach((head, hIdx) => {
                        jsonLine[head] = rowLine[hIdx] as string;
                    });
                    csvLine.push(jsonLine);
                });
                callback(null, JSON.stringify(csvLine));
            }
        });

        this.file.pipe(transform);
        return transform;
    }
}