"use client";

import { useState } from "react";

export default function BlogDetailHeroImage({ src, alt }) {
  const [current, setCurrent] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote API URL + runtime fallback
    <img
      src={current}
      alt={alt}
      className="h-auto max-h-[min(70vh,560px)] w-full object-cover"
      onError={() => setCurrent("/assets/section-2image.jpg")}
    />
  );
}
