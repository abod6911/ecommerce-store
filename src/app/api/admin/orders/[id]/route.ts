import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { shippingStatus, courierName, trackingCode } = body;

    // Simulate backend database update
    return NextResponse.json({
      success: true,
      message: `تم تحديث حالة الطلب ${id} بنجاح.`,
      updatedOrder: {
        id,
        shippingStatus,
        courierName,
        trackingCode,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في تحديث بيانات الطلب" },
      { status: 500 }
    );
  }
}
