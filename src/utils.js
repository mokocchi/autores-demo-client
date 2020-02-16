import sha256 from 'js-sha256';

export function getRandomSlug() {
    const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return sha256(rand);
}

export function expired(expiresAt) {
    return Date.now() > expiresAt;
}

export function expiresAt(expiresIn) {
    return Date.now() + expiresIn * 1000;
}