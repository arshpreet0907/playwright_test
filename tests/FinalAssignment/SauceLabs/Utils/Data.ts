import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync'; // npm install csv-parse for this to work

export interface UserCredentials {
    username: string;
    password: string;
}

export class CsvReader {
     static readUserCredentialsParse(filePath: string): UserCredentials[] {
        const absolutePath = path.resolve(process.cwd(), filePath);
        
        if (!fs.existsSync(absolutePath)) {
            throw new Error(`CSV file not found`);
        }

        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        
        const records = parse(fileContent, {
            columns: true,           // use first row as column names
            skip_empty_lines: true,  // skip empty lines
            trim: true,              // trim whitespace from values
        }) as UserCredentials[];
        
        return records;
    }
}