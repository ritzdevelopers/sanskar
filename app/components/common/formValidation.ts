const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/** Indian mobile: optional +91 / 91, optional leading 0, then 10 digits starting with 6–9 */
export function isValidIndianMobile(value: string): boolean {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
}

export function isValidEmail(value: string): boolean {
  const t = value.trim();
  return t.length <= 254 && EMAIL_RE.test(t);
}

/** Letters (Unicode), spaces, hyphen, apostrophe, dot; length bounds */
export function isValidNamePart(value: string): boolean {
  const t = value.trim();
  if (t.length < 1 || t.length > 60) return false;
  return /^[\p{L}][\p{L}\s'.-]*$/u.test(t);
}

export function isValidFullName(value: string): boolean {
  const t = value.trim();
  if (t.length < 2 || t.length > 120) return false;
  return /^[\p{L}][\p{L}\s'.-]*$/u.test(t);
}

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/** `value` = HTML date input value `YYYY-MM-DD`; must be today or later (local calendar). */
export function isValidVisitDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value.trim())) return false;
  const [y, m, d] = value.split("-").map(Number);
  const picked = new Date(y, m - 1, d);
  if (
    picked.getFullYear() !== y ||
    picked.getMonth() !== m - 1 ||
    picked.getDate() !== d
  ) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  picked.setHours(0, 0, 0, 0);
  return picked >= today;
}

export function validateResumeFile(file: File): string | null {
  if (!file || file.size === 0) return "Please choose a resume file.";
  if (file.size > RESUME_MAX_BYTES) {
    return "File must be 5 MB or smaller.";
  }
  const byType = file.type && RESUME_TYPES.has(file.type);
  const byName = /\.(pdf|doc|docx)$/i.test(file.name);
  if (!byType && !byName) {
    return "Please upload a PDF or Word (.doc, .docx) file.";
  }
  return null;
}
