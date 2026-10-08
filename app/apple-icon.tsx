import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon. */
export default function AppleIcon() {
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
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        SM
        <span style={{ color: "#ff6a3d" }}>.</span>
      </div>
    ),
    size
  );
}
