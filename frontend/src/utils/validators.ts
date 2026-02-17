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
  return null;
}

export function validateHabitTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) return "Title is required";
  if (trimmed.length < 2) return "Title is too short";
  if (trimmed.length > 100) return "Title is too long";
  return null;
}
