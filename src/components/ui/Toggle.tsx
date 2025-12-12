import classNames from "classnames";
import { InputHTMLAttributes, ReactNode } from "react";

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Toggle({ label, className, ...props }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
      <span className="font-medium">{label}</span>
      <input
        type="checkbox"
        className={classNames(
          "h-5 w-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary",
          className,
        )}
        {...props}
      />
    </label>
  );
}
