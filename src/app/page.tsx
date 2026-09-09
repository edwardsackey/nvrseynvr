import type { Metadata } from "next";
import { VideoHero } from "@/components/landing/VideoHero";

export const metadata: Metadata = {
  title: "nvrsëynvr",
  description:
    "Built for the ones who never gave up. The nvrsëynvr film, then the store.",
};

/**
 * The front door: the brand film, one screen, nothing to scroll.
 * The landing page proper lives at /home.
 */
export default function FilmPage() {
  return (
    <div className="h-[100svh] overflow-hidden bg-black">
      <VideoHero />
    </div>
  );
}
