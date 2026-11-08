import { useState, type ImgHTMLAttributes } from 'react';
/** Preserve the original photo, with a clearly identified illustration if its host is unavailable. */
export default function PropertyImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSource, setFailedSource] = useState<string>();
  const failed = failedSource === src;
  return <img {...props} src={failed ? `${process.env.PUBLIC_URL}/home-placeholder.svg` : src} alt={failed ? `Illustration — photo unavailable: ${alt}` : alt} onError={() => setFailedSource(src)} />;
}
