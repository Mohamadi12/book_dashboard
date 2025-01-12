import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ") // 1. Sépare le nom en parties (par exemple, "John Doe" devient ["John", "Doe"])
    .map((part) => part[0]) // 2. Prend la première lettre de chaque partie du nom (par exemple, ["John", "Doe"] devient ["J", "D"])
    .join("") // 3. Rejoint les lettres pour former une chaîne (par exemple, ["J", "D"] devient "JD")
    .toUpperCase() // 4. Convertit la chaîne en majuscules (par exemple, "jd" devient "JD")
    .slice(0, 2); // 5. Ne garde que les 2 premiers caractères (utile pour les cas où le nom est très long, par exemple "John Jacob Jingleheimer Schmidt" devient "JJ")
