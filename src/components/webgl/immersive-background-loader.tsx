"use client";

import dynamic from "next/dynamic";

const ImmersiveBackground = dynamic(
  () => import("./immersive-background").then((module) => module.ImmersiveBackground),
  {
    ssr: false,
    loading: () => <div className="webgl-background webgl-background--fallback" aria-hidden="true" />,
  },
);

export function ImmersiveBackgroundLoader() {
  return <ImmersiveBackground />;
}
