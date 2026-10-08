import { ImageResponse } from "next/og";
import { hero, siteMeta } from "@/data/config";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0a",
          color: "#edece8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          backgroundImage: "radial-gradient(rgba(237,236,232,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                background: "#edece8",
                color: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              SM
            </div>
            <div style={{ fontSize: "26px" }}>{siteMeta.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
              color: "#9e9c95",
              border: "1px solid rgba(237,236,232,0.15)",
              borderRadius: "999px",
              padding: "8px 18px",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "999px", background: "#4ade80" }} />
            {hero.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "84px", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1 }}>
            {hero.headline.before}
          </div>
          <div style={{ fontSize: "84px", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1, color: "#ff6a3d" }}>
            {hero.headline.accent}
          </div>
          <div style={{ fontSize: "84px", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1 }}>
            that holds up.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", color: "#9e9c95" }}>
          <div>{`${hero.role} · ${hero.location}`}</div>
          <div>{siteMeta.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
