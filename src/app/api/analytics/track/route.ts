import { NextRequest, NextResponse } from "next/server";
import { recordVisitorIngest, VisitorIngestData } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Extract real client IP through proxy chains and cloud CDNs
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip");

    let serverDetectedIp = "127.0.0.1";
    if (forwarded) {
      serverDetectedIp = forwarded.split(",")[0].trim();
    } else if (realIp) {
      serverDetectedIp = realIp.trim();
    } else if (cfConnectingIp) {
      serverDetectedIp = cfConnectingIp.trim();
    }

    // If server sees loopback (local dev) but client fetched their public IP, use client public IP
    const clientProvidedIp = body.ip;
    const finalIp =
      serverDetectedIp && serverDetectedIp !== "127.0.0.1" && serverDetectedIp !== "::1"
        ? serverDetectedIp
        : clientProvidedIp || serverDetectedIp || "127.0.0.1";

    const payload: VisitorIngestData = {
      sessionId: body.sessionId || "sess_" + Math.random().toString(36).substring(2, 9),
      ip: finalIp,
      ipType: finalIp.includes(":") ? "IPv6" : "IPv4",
      city: body.city || "Unknown",
      region: body.region || "",
      country: body.country || "Unknown",
      countryCode: body.countryCode || "UN",
      flagEmoji: body.flagEmoji || "🌐",
      org: body.org || "Direct Broadband",
      deviceType: body.deviceType || "Desktop",
      browser: body.browser || "Unknown",
      browserVersion: body.browserVersion || "",
      os: body.os || "Unknown",
      screenWidth: Number(body.screenWidth) || 0,
      screenHeight: Number(body.screenHeight) || 0,
      screenResolution: body.screenResolution || `${body.screenWidth || 0}x${body.screenHeight || 0}`,
      viewportSize: body.viewportSize || "",
      devicePixelRatio: Number(body.devicePixelRatio) || 1,
      screenOrientation: body.screenOrientation || "landscape",
      colorDepth: Number(body.colorDepth) || 24,
      touchSupport: body.touchSupport ? 1 : 0,
      networkType: body.networkType || "Broadband",
      effectiveType: body.effectiveType || "4g",
      downlinkMbps: Number(body.downlinkMbps) || 0,
      rttMs: Number(body.rttMs) || 0,
      saveData: body.saveData ? 1 : 0,
      cpuCores: Number(body.cpuCores) || 0,
      ramGb: body.ramGb || "Unknown",
      timezone: body.timezone || "UTC",
      language: body.language || "en",
      referrer: body.referrer || "Direct",
      referrerDomain: body.referrerDomain || "Direct",
      landingPage: body.landingPage || body.currentPath || "/",
      currentPath: body.currentPath || body.landingPage || "/",
      pageTitle: body.pageTitle || "",
    };

    await recordVisitorIngest(payload);

    return NextResponse.json({
      success: true,
      sessionId: payload.sessionId,
      ip: payload.ip,
      recordedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Telemetry ingestion error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to ingest telemetry" },
      { status: 500 }
    );
  }
}
