import { cn } from "@/lib/utils";

interface GradientBadgeProps {
  label: string;
  variant?: "indigo" | "cyan" | "violet" | "success" | "warning" | "danger";
  className?: string;
}

export default function GradientBadge({ label, variant = "indigo", className }: GradientBadgeProps) {
  const variantStyles = {
    indigo: "from-brand-indigo to-brand-violet text-white",
    cyan: "from-brand-cyan to-brand-indigo text-white",
    violet: "from-brand-violet to-brand-indigo text-white",
    success: "from-success to-emerald-400 text-white",
    warning: "from-warning to-amber-300 text-white",
    danger: "from-danger to-rose-400 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r shadow-sm",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
