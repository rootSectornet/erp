export function toCapitalized(input: string): string {
    if (!input) return input;
    input = input.toLocaleLowerCase();
    return input.charAt(0).toUpperCase() + input.slice(1);
}
