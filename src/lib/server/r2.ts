const ALLOWED_TYPES = new Map<string, string>([
    ['image/jpeg', 'jpg'],
    ['image/png', 'png'],
    ['image/webp', 'webp'],
]);

const CERT_ALLOWED_TYPES = new Map<string, string>([
    ['image/jpeg', 'jpg'],
    ['image/png', 'png'],
    ['image/webp', 'webp'],
    ['application/pdf', 'pdf'],
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export function isAllowedImageType(contentType: string): boolean {
    return ALLOWED_TYPES.has(contentType);
}

export function isValidSize(size: number): boolean {
    return size <= MAX_FILE_SIZE;
}

export function isAllowedCertType(contentType: string): boolean {
    return CERT_ALLOWED_TYPES.has(contentType);
}

export function certFileKey(profId: string, certIndex: number, contentType: string): string {
    const ext = CERT_ALLOWED_TYPES.get(contentType) ?? 'pdf';
    return `profs/${profId}/certs/${certIndex}_${crypto.randomUUID()}.${ext}`;
}

export function galleryKey(profId: string, contentType: string): string {
    const ext = ALLOWED_TYPES.get(contentType) ?? 'jpg';
    return `profs/${profId}/gallery/${crypto.randomUUID()}.${ext}`;
}

export function profilePhotoKey(userId: string, contentType: string): string {
    const ext = ALLOWED_TYPES.get(contentType) ?? 'jpg';
    return `users/${userId}/profile.${ext}`;
}

export function bucketPublicUrl(publicBaseUrl: string, key: string): string {
    return `${publicBaseUrl.replace(/\/$/, '')}/${key}`;
}

export async function uploadPhoto(
    bucket: R2Bucket,
    key: string,
    file: File | Blob,
    contentType: string,
): Promise<void> {
    await bucket.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType },
    });
}

export async function deletePhoto(bucket: R2Bucket, key: string): Promise<void> {
    await bucket.delete(key);
}
