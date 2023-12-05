import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function translateOp(op: 'i' | 'u' | 'd' | 'c') {
   switch (op) {
      case 'i':
         return 'Insert'
      case 'u':
         return 'Update'
      case 'd':
         return 'Delete'
      case 'c':
         return 'Command'
   }
}
