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

/**
 * 실제로 업로드된 이미지인지 확인합니다.
 * - base64 이미지 (data:)
 * - 서버에 업로드된 파일 (/uploads/)
 * - 외부 URL 중 placeholder가 아닌 것
 */
export function isUploadedImage(imagePath: string): boolean {
  // base64 이미지
  if (imagePath.startsWith('data:')) {
    return true;
  }

  // 서버에 업로드된 파일
  if (imagePath.startsWith('/uploads/')) {
    return true;
  }

  // 외부 URL 중 placeholder가 아닌 것
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return !imagePath.includes('via.placeholder.com');
  }

  // 로컬 파일 경로 (uploads로 시작하는 경우)
  if (imagePath.includes('uploads/')) {
    return true;
  }

  // 그 외는 기본 데이터로 간주
  return false;
}

