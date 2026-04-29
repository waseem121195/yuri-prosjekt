export function formatNOK(amount: number): string {
  return (
    new Intl.NumberFormat("nb-NO", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + " kr"
  );
}

export function formatUValue(u: number): string {
  return `U-verdi ${u.toString().replace(".", ",")}`;
}

export function formatDimensions(w: number, h: number): string {
  return `${w}×${h} cm`;
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("47") && digits.length === 10) {
    return `+47 ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
