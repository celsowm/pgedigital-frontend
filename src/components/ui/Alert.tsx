import classNames from "classnames";
import { ReactNode } from "react";

type AlertProps = {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
};

const baseStyles =
  "rounded-lg border px-4 py-3 text-sm shadow-sm flex items-start gap-2";

const variants: Record<NonNullable<AlertProps["type"]>, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-red-200 bg-red-50 text-red-800",
};

export function Alert({ type = "info", title, children }: AlertProps) {
  return (
    <div className={classNames(baseStyles, variants[type])}>
      <div className="flex flex-col">
        {title && <p className="font-semibold">{title}</p>}
        <div className="leading-snug">{children}</div>
      </div>
    </div>
  );
}
