export class StringUtils {
    public static apenasNumeros(str: string): string {
        return str.replace(/\D/g, '');
    }
}
