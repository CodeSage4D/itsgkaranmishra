import { NextResponse } from "next/server";
import { purgeAnalytics } from "@/lib/db";

export async function POST() {
  try {
    await purgeAnalytics();
    return NextResponse.json({
      success: true,
      message: "Analytics database tables cleared successfully.",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to purge database" },
      { status: 500 }
    );
  }
}
