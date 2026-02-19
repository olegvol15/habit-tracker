import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-zinc-950 hover:bg-zinc-200",
  secondary:
    "bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700",
  danger:
    "bg-red-600 text-white hover:bg-red-500",
  ghost:
    "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2.5 sm:py-1.5 text-sm sm:text-xs rounded-md",
  md: "px-4 py-3 sm:py-2.5 text-base sm:text-sm rounded-lg",
  lg: "px-6 py-3.5 sm:py-3 text-base sm:text-sm rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        "font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
