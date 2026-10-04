import { NextRequest, NextResponse } from "next/server";
import { getDatabase, dbAll } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get("format") || "json";

    const db = getDatabase();
    const visitors = await dbAll(db, `SELECT * FROM visitors ORDER BY last_seen_at DESC`);
    const clicks = await dbAll(db, `SELECT * FROM click_events ORDER BY created_at DESC`);

    if (format === "csv") {
      const headers = [
        "Session ID",
        "IP",
        "Country",
        "City",
        "Device",
        "Screen Resolution",
        "Viewport",
        "Browser",
        "OS",
        "Network Type",
        "Downlink Mbps",
        "RTT ms",
        "Pageviews",
        "Clicks",
        "Referrer",
        "Landing Page",
        "First Seen",
        "Last Seen",
      ];

      const rows = (visitors || []).map((v) => [
        `"${v.session_id}"`,
        `"${v.ip || ""}"`,
        `"${v.country || ""}"`,
        `"${v.city || ""}"`,
        `"${v.device_type || ""}"`,
        `"${v.screen_resolution || ""}"`,
        `"${v.viewport_size || ""}"`,
        `"${v.browser || ""}"`,
        `"${v.os || ""}"`,
        `"${v.network_type || ""}"`,
        v.downlink_mbps || 0,
        v.rtt_ms || 0,
        v.page_views_count || 1,
        v.clicks_count || 0,
        `"${v.referrer || ""}"`,
        `"${v.landing_page || ""}"`,
        `"${v.first_seen_at || ""}"`,
        `"${v.last_seen_at || ""}"`,
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="aurxon_portfolio_analytics_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({
      exportedAt: new Date().toISOString(),
      visitorsCount: (visitors || []).length,
      clicksCount: (clicks || []).length,
      visitors: visitors || [],
      clicks: clicks || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Export failed" },
      { status: 500 }
    );
  }
}
