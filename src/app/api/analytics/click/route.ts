import { NextRequest, NextResponse } from "next/server";
import { recordClickIngest } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = (forwarded ? forwarded.split(",")[0].trim() : (realIp || body.ip || "127.0.0.1"));

    await recordClickIngest({
      sessionId: body.sessionId || "unknown_session",
      ip: clientIp,
      elementId: body.elementId,
      elementText: body.elementText || "Interactive Element",
      elementTag: body.elementTag || "BUTTON",
      targetUrl: body.targetUrl,
      pagePath: body.pagePath || "/",
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Click ingest error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to log click" },
      { status: 500 }
    );
  }
}
