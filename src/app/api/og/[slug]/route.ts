// This file is intentionally left without route exports.
// The OG image route handler lives in route.tsx in this same directory.
// Having both route.ts and route.tsx causes a Next.js duplicate route warning;
// all HTTP exports (GET, POST, etc.) must live in exactly one of the two files.
const _placeholder = null;
export { _placeholder };
