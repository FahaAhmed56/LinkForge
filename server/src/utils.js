export function validateUrl(value) {
 try {const u=new URL(value); return ['http:','https:'].includes(u.protocol) && Boolean(u.hostname) && !u.username && !u.password;} catch {return false;}
}
export function normalizeAlias(input) {
 if (!input) return null;
 const alias=String(input).trim();
 if (!/^[a-zA-Z0-9_-]{3,32}$/.test(alias)) throw new Error('Alias must contain 3–32 letters, numbers, underscores or hyphens');
 if (['api','health','favicon.ico'].includes(alias.toLowerCase())) throw new Error('Alias is reserved');
 return alias;
}
