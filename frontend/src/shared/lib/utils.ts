import { clsx, type ClassValue } from 'clsx'
// We can add tailwind-merge later if needed
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}
