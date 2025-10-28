export const normalizeWhitespace = str => str.trim().replace(/\n/g, ' ').replace(/(\s){2,}/g, '$1');
