import { ACTION_VERBS } from "./constants";

export const checkBulletQuality = (bullet: string): { hasActionVerb: boolean; hasNumbers: boolean } => {
    const trimmed = bullet.trim().toLowerCase();
    const firstWord = trimmed.split(/\s+/)[0];
    const hasActionVerb = ACTION_VERBS.includes(firstWord);
    const hasNumbers = /\d/.test(bullet);
    return { hasActionVerb, hasNumbers };
};
