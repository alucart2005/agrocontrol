// Security utilities for AgroControl

// Generate CSRF token (for future use)
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Validate CSRF token (for future use)
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken
}

// Sanitize HTML to prevent XSS
export function sanitizeHTML(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Colombian format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+57|57)?[1-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validate Colombian ID (Cédula)
export function isValidCedula(cedula: string): boolean {
  // Basic validation: 6-10 digits
  const cedulaRegex = /^\d{6,10}$/
  return cedulaRegex.test(cedula)
}

// Generate random string for API keys
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Hash password (for future use with authentication)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// Verify password (for future use)
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Rate limit configuration
export const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
  maxPosts: 30, // 30 POST requests per minute
}

// Input length limits
export const INPUT_LIMITS = {
  short: 50,
  medium: 200,
  long: 500,
  description: 1000,
}
