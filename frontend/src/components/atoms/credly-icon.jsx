import * as React from "react";

export function CredlyIcon({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.004 4.5a7.5 7.5 0 0 1 5.302 2.198l-1.415 1.415a5.514 5.514 0 0 0-3.887-1.613 5.5 5.5 0 1 0 3.887 9.387l1.415 1.415A7.5 7.5 0 1 1 11.996 4.5z" />
    </svg>
  );
}
