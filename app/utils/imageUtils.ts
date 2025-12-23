/**
 * 이미지 경로를 정규화합니다.
 * - base64나 외부 URL은 그대로 반환
 * - 로컬 파일 경로는 `/`로 시작하도록 보장
 */
export function normalizeImagePath(imagePath: string): string {
  // base64 이미지
  if (imagePath.startsWith('data:')) {
    return imagePath;
  }

  // 외부 URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // 로컬 파일 경로 - `/`로 시작하지 않으면 추가
  if (!imagePath.startsWith('/')) {
    return `/${imagePath}`;
  }

  return imagePath;
}

