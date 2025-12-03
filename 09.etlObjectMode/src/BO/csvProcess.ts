import type { ReadStream } from 'node:fs';
import { Transform } from 'node:stream';

type Options = {
    file: ReadStream;
    separated: string;
    newline: string;
}

export class CsvProcessor {
    options: Options;

    constructor({ file, separated = ',', newline = '\n' }: Pick<Options, 'file'> & Partial<Pick<Options, 'newline' | 'separated'>>) {
        this.options = {
            file,
            separated,
            newline
        };
    }

    convertCsvToJSON() {
        let jsonObject: Object[] = [];
        const that = this;
        const transform = new Transform({
            transform(chunk, encoding, callback) {
                const bufLine: string[] = chunk.toString().split(that.options.newline);
                // console.log(bufLine)

                if(!bufLine || bufLine.length < 2) throw new Error('The file need to have more than one line');

                const jsonObject = that.extractItems(bufLine);
                
                callback(null, JSON.stringify(jsonObject));
            }
        });

        this.options.file.pipe(transform);
        return transform;
    }

    extractHeader(line: string) {
        const headerLine = line.split(this.options.separated);
        return headerLine || [''];
    }

    extractItems(lines: string[]) {
        const headerLine = this.extractHeader(lines[0] as string);

        return lines.slice(1).map((line, idx) => {
            const rowLine = line.split(this.options.separated);

            const jsonLine: Record<string, string | number> = {};
            headerLine.forEach((head, hIdx) => {
                switch (head) {
                    case 'email':
                        jsonLine[head] = rowLine[hIdx]?.toLowerCase() as string || '';
                        break;

                    case 'age':
                    case 'number':
                        jsonLine[head] = Number(rowLine[hIdx]) || 0;
                        break;
                
                    default:
                        jsonLine[head] = rowLine[hIdx] as string || '';
                        break;
                }
            });

            return jsonLine;
        });
    }
}