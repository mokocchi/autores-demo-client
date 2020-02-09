import md5 from 'md5'
export function getRandomSlug() {
    const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return md5(rand);
}

export function expired(expiresAt) {
    return Date.now() > expiresAt;
}

export function expiresAt(expiresIn) {
    return Date.now() + expiresIn * 1000;
}