import * as React from "react";
import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Imagen robusta: si la carga falla, muestra un placeholder accesible que
 * conserva el layout (misma `className`) en lugar de un ícono de imagen rota.
 * Acepta las mismas props que <img> (src, width, height, loading, etc.).
 */
const SafeImage = React.forwardRef(
  ({ className, alt = "", fallbackClassName, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false);

    if (failed) {
      return (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "flex items-center justify-center bg-secondary text-muted-foreground",
            className,
            fallbackClassName,
          )}
        >
          <ImageOff className="h-8 w-8 opacity-60" aria-hidden />
        </div>
      );
    }

    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        decoding="async"
        {...props}
        onError={() => setFailed(true)}
      />
    );
  },
);
SafeImage.displayName = "SafeImage";

export { SafeImage };
