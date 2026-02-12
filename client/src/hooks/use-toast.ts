import { toast } from "sonner";

/**
 * Compatibility shim for admin components that import useToast.
 * The project uses sonner for toast notifications.
 */
export function useToast() {
  return {
    toast: ({
      title,
      description,
      variant,
    }: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      const message = title || description || "";
      if (variant === "destructive") {
        toast.error(message);
      } else {
        toast.success(message);
      }
    },
  };
}
