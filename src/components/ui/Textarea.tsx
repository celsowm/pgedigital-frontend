import classNames from "classnames";
import { ReactNode, TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: ReactNode;
  helperText?: string;
  error?: string;
};

export function Textarea({
  label,
  helperText,
  error,
  className,
  ...props
}: TextareaProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="font-medium">{label}</span>
      <textarea
        className={classNames(
          "w-full rounded-lg border px-3 py-2 text-sm transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40",
          error ? "border-red-300" : "border-slate-200",
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="text-xs text-red-600">{error}</span>
      ) : (
        helperText && <span className="text-xs text-slate-500">{helperText}</span>
      )}
    </label>
  );
}
