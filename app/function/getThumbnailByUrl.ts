export function getThumbnailByUrl(url?: string): string | undefined {
  if (!url) return undefined;

  // YouTube
  const youtubeMatch =
    url.match(/youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?]+)/);

  if (youtubeMatch?.[1]) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
  }

  // 그 외 URL은 썸네일 없음
  return undefined;
}
