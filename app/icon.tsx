import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: "SM" monogram, matching the navbar mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#edece8",
          borderRadius: 14,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        SM
      </div>
    ),
    size
  );
}
