import { useState, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackClassName?: string;
};

/**
 * Image with graceful fallback: if the remote image fails to load,
 * shows a soft gradient placeholder instead of a broken image icon.
 * Defaults: lazy loading + async decoding for performance.
 */
export function SafeImage({ src, alt, className, fallbackClassName, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={fallbackClassName ?? className}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.93 0.04 20), oklch(0.88 0.07 25))",
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
