import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function padStep(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  let rest = digits;
  if (rest.startsWith("8")) rest = `7${rest.slice(1)}`;
  if (!rest.startsWith("7")) rest = `7${rest}`;
  const d = rest.slice(1);
  const parts = ["+7"];
  if (d.length > 0) parts.push(" (", d.slice(0, 3));
  if (d.length >= 3) parts.push(") ", d.slice(3, 6));
  if (d.length >= 6) parts.push("-", d.slice(6, 8));
  if (d.length >= 8) parts.push("-", d.slice(8, 10));
  return parts.join("");
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}
