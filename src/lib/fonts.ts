import { Fraunces } from "next/font/google";

// Display serif for headlines only (docs3/design3.md §4). Body copy keeps
// using the existing Inter <link> setup in layout.tsx — untouched.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
