import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/db";

export async function GET() {
  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json({
      success: true,
      data: summary,
      source: "sqlite3_server",
    });
  } catch (err: any) {
    console.error("Analytics summary error:", err);
    return NextResponse.json(
      {
        success: true,
        data: {
          kpis: {
            totalVisitors: 0,
            totalPageViews: 0,
            totalClicks: 0,
            uniqueIps: 0,
            avgDownlinkMbps: 0,
            avgRttMs: 0,
          },
          devicesBreakdown: [],
          screenSizes: [],
          countries: [],
          topClicks: [],
          recentVisitors: [],
          recentClicks: [],
        },
        source: "build_fallback",
      },
      { status: 200 }
    );
  }
}
