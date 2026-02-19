export function validateEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) return "Email is required";

  const atIndex = trimmed.indexOf("@");

  if (
    atIndex <= 0 ||
    atIndex !== trimmed.lastIndexOf("@") ||
    atIndex === trimmed.length - 1
  ) {
    return "Email format is invalid";
  }

  const domain = trimmed.slice(atIndex + 1);

  if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) {
    return "Email format is invalid";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character";
  return null;
}

export function validateHabitTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) return "Title is required";
  if (trimmed.length < 2) return "Title is too short";
  if (trimmed.length > 100) return "Title is too long";
  return null;
}


export function calculatePasswordStrength(password: string): "Weak" | "Medium" | "Strong" | "Very Strong" {
    if (password.length < 8) return "Weak";

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 3) return "Weak";
    if (score === 4) return "Medium";
    if (score === 5) return "Strong";
    return "Very Strong";
}