import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, zoomMeetingUrl } = body;

    return NextResponse.json({
      success: true,
      message: `تم تحديث حالة الجلسة الاستشارية ${id} بنجاح.`,
      updatedConsultation: {
        id,
        status,
        zoomMeetingUrl,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في تحديث موعد الاستشارة" },
      { status: 500 }
    );
  }
}
