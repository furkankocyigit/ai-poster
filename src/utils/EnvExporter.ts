export class EnvExporter {
    static export(env: string): string {
        const envValue = process.env[env];
        if (!envValue) throw new Error(`Environment variable ${env} not found`);
        return envValue;
    }
}
