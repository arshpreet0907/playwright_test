import * as fs from 'fs';
import * as path from 'path';

export class Credentials {
    private static instance: Credentials;
    private properties: Map<string, string> = new Map();
    private propertiesFilePath: string=path.join(__dirname, '..', 'Properties', 'credentials.properties');

    private constructor() {
        this.loadProperties();
    }

    public static getInstance(): Credentials {
        if (!Credentials.instance) {
            Credentials.instance = new Credentials();
        }
        return Credentials.instance;
    }

    private loadProperties(): void {
        try {
            if (!fs.existsSync(this.propertiesFilePath)) {
                return;
            }
            const fileContent = fs.readFileSync(this.propertiesFilePath, 'utf-8');

            const lines = fileContent.split('\n');
            
            for (const line of lines) {
                const trimmedLine = line.trim();
                
                if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith('//')) {
                    continue;
                }

                const separatorIndex = trimmedLine.indexOf('=');
                if (separatorIndex !== -1) {
                    const key = trimmedLine.substring(0, separatorIndex).trim();
                    const value = trimmedLine.substring(separatorIndex + 1).trim();
                    this.properties.set(key, value);
                }
            }

            console.log('Credentials loaded successfully from properties file');

        } catch (error) {
            console.error('Error loading credentials.properties file:', error);
        }
    }

    private getProperty(key: string, defaultValue: string = ''): string {
       
        if (this.properties.has(key)) {
            return this.properties.get(key)!;
        }
        
        return defaultValue;
    }

    public getUrl(): string {
        return this.getProperty('box.url', '');
    }

    public getEmail(): string {
        const email = this.getProperty('box.email', '');
        
        if (!email) {
            console.warn('Email not configured in credentials.properties');
        }
        return email;
    }

    public getPassword(): string {
        const password = this.getProperty('box.password', '');
        
        if (!password) {
            console.warn('Password not configured in credentials.properties');
        }
        
        return password;
    }


   
}

export function getUrl(): string {
    return Credentials.getInstance().getUrl();
}

export function getEmail(): string {
    return Credentials.getInstance().getEmail();
}

export function getPassword(): string {
    return Credentials.getInstance().getPassword();
}
