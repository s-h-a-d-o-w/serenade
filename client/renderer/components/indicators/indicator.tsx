import React from "react";
import classNames from "classnames";

export const Indicator = ({ children, onClick, className }: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}) => (
  <a
    href="#"
    className={classNames("flex items-center gap-0.5 text-slate-600 bg-gray-200 rounded text-xs px-1 py-0.5 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-neutral-100 dark:hover:bg-gray-700", className)}
    onClick={onClick}
  >
    {children}
  </a>
);