/**
 * مكتبة توليد رموز QR للشهادات
 * يتم توليد رابط QR code يحتوي على معلومات الشهادة للتحقق منها
 */

export interface CertificateQRData {
  certificateId: string;
  certificateNumber: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  verificationUrl: string;
}

/**
 * توليد رابط QR Code للشهادة
 * @param data - بيانات الشهادة
 * @returns رابط QR Code
 */
export function generateQRCodeUrl(data: CertificateQRData): string {
  // إنشاء رابط التحقق
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://khatwa-platform.com'}/verify/${data.certificateNumber}`;
  
  // إنشاء بيانات JSON للـ QR Code
  const qrData = JSON.stringify({
    id: data.certificateId,
    number: data.certificateNumber,
    name: data.studentName,
    course: data.courseName,
    date: data.issueDate,
    verify: verificationUrl,
  });

  // استخدام خدمة QR Code Generator
  // يمكن استخدام خدمة خارجية أو مكتبة محلية
  const encodedData = encodeURIComponent(qrData);
  
  // استخدام api.qrserver.com كخدمة مجانية
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
}

/**
 * توليد رابط QR Code مباشر من رقم الشهادة
 * @param certificateNumber - رقم الشهادة
 * @returns رابط QR Code
 */
export function generateQRCodeFromNumber(certificateNumber: string): string {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://khatwa-platform.com'}/verify/${certificateNumber}`;
  const encodedUrl = encodeURIComponent(verificationUrl);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;
}

/**
 * التحقق من صحة بيانات QR Code
 * @param qrData - بيانات QR Code
 * @returns true إذا كانت البيانات صحيحة
 */
export function validateQRData(qrData: string): boolean {
  try {
    const data = JSON.parse(qrData);
    return !!(
      data.id &&
      data.number &&
      data.name &&
      data.course &&
      data.date &&
      data.verify
    );
  } catch {
    return false;
  }
}

/**
 * استخراج بيانات من QR Code
 * @param qrData - بيانات QR Code
 * @returns بيانات الشهادة
 */
export function extractQRData(qrData: string): CertificateQRData | null {
  try {
    const data = JSON.parse(qrData);
    return {
      certificateId: data.id,
      certificateNumber: data.number,
      studentName: data.name,
      courseName: data.course,
      issueDate: data.date,
      verificationUrl: data.verify,
    };
  } catch {
    return null;
  }
}

