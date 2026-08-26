export interface WatermarkData {
  userId: string;
  userName: string;
  userPhone: string;
  ipMasked: string;
  timestamp: string;
  sessionToken: string;
}

export function generateWatermarkData(
  user = {
    id: "ALSHAWA-USER-77291",
    name: "مشترك منصة أحمد الشوا",
    phone: "+966 50 *** 4567",
    ip: "188.54.120.***"
  }
): WatermarkData {
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return {
    userId: user.id,
    userName: user.name,
    userPhone: user.phone,
    ipMasked: user.ip,
    timestamp: timeFormatted,
    sessionToken: `DRM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
  };
}

export function getWatermarkCoordinates(containerWidth: number, containerHeight: number) {
  const marginX = 80;
  const marginY = 60;
  const maxX = Math.max(marginX, containerWidth - 250);
  const maxY = Math.max(marginY, containerHeight - 120);

  const x = Math.floor(Math.random() * (maxX - marginX) + marginX);
  const y = Math.floor(Math.random() * (maxY - marginY) + marginY);

  return { x, y };
}

export function setupDRMProtectionListeners(
  onSecurityWarning?: (warning: string) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (onSecurityWarning) {
      onSecurityWarning("تم تعطيل النقر بزر الفأرة لحماية حقوق الملكية الفكرية الرقمية.");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, PrintScreen
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) ||
      (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S")) ||
      e.key === "PrintScreen"
    ) {
      e.preventDefault();
      if (onSecurityWarning) {
        onSecurityWarning("إجراء محظور: المنظومة محمية بنظام مكافحة القرصنة والعلامة المائية المباشرة.");
      }
    }
  };

  window.addEventListener("contextmenu", handleContextMenu);
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("contextmenu", handleContextMenu);
    window.removeEventListener("keydown", handleKeyDown);
  };
}
