import { T } from "../theme";

export const revenueTrend = [
  { m: "Mar", v: 312000 }, { m: "Apr", v: 358000 }, { m: "May", v: 401000 },
  { m: "Jun", v: 372000 }, { m: "Jul", v: 445000 }, { m: "Aug", v: 486500 },
];

export const bookingStatus = [
  { label: "Pending", count: 12 },
  { label: "Confirmed", count: 18 },
  { label: "Ready", count: 7 },
  { label: "Rented", count: 34 },
  { label: "Returned", count: 96 },
];

export const dresses = [
  { name: "Aurora Pearl Gown", code: "GLM-2201", cat: "Bridal", sizes: "S · M · L", price: 18500, status: "available", grad: ["#4B2761", "#220F30"] },
  { name: "Royal Rose Evening Dress", code: "GLM-2214", cat: "Evening", sizes: "M · L", price: 12000, status: "rented", grad: ["#764591", "#4B2761"] },
  { name: "Celeste Bridal Gown", code: "GLM-2233", cat: "Bridal", sizes: "S · M", price: 24000, status: "available", grad: ["#3F1D59", "#1E0D2B"] },
  { name: "Midnight Elegance", code: "GLM-2240", cat: "Formal", sizes: "M · L · XL", price: 9500, status: "cleaning", grad: ["#220F30", "#110517"] },
  { name: "Blush Garden Dress", code: "GLM-2255", cat: "Party", sizes: "S · M", price: 7200, status: "available", grad: ["#522774", "#2A1140"] },
  { name: "Sapphire Evening Gown", code: "GLM-2262", cat: "Evening", sizes: "M · L", price: 14500, status: "reserved", grad: ["#7A3B99", "#3F1D59"] },
];

export const statusMeta = {
  available: { label: "Available", bg: T.successBg, fg: T.success },
  rented: { label: "Rented", bg: T.infoBg, fg: T.info },
  reserved: { label: "Reserved", bg: T.warningBg, fg: T.warning },
  cleaning: { label: "Needs Cleaning", bg: T.dangerBg, fg: T.danger },
  pending: { label: "Pending", bg: T.warningBg, fg: T.warning },
  confirmed: { label: "Confirmed", bg: T.infoBg, fg: T.info },
  overdue: { label: "Overdue", bg: T.dangerBg, fg: T.danger },
  returned: { label: "Returned", bg: T.successBg, fg: T.success },
};

export const bookings = [
  { id: "BK-1042", customer: "Sarah Fernando", dress: "Aurora Pearl Gown", event: "12 Sep 2026", requested: "05 Sep 2026", status: "pending" },
  { id: "BK-1041", customer: "Dinithi Perera", dress: "Sapphire Evening Gown", event: "14 Sep 2026", requested: "04 Sep 2026", status: "confirmed" },
  { id: "BK-1039", customer: "Amaya Silva", dress: "Celeste Bridal Gown", event: "20 Sep 2026", requested: "02 Sep 2026", status: "rented" },
  { id: "BK-1035", customer: "Nethmi Jayawardena", dress: "Royal Rose Evening Dress", event: "01 Sep 2026", requested: "24 Aug 2026", status: "overdue" },
  { id: "BK-1031", customer: "Kavindi Perera", dress: "Blush Garden Dress", event: "28 Aug 2026", requested: "20 Aug 2026", status: "returned" },
];
