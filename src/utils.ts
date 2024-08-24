export const regex: Record<string, RegExp> = {
    word_only: /^[a-zA-Z]+$/,
    alpha: /[a-zA-Z ]$/,
    num: /^[0-9.]+$/,
};

export function time_created_on(): string {
    return new Date().toUTCString();
};