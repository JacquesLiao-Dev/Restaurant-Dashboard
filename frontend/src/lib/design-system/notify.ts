"use client";

import { toast } from "sonner";

type ToastOptions = {
  description?: string;
};

export const notify = {
  success(title: string, options?: ToastOptions) {
    toast.success(title, {
      description: options?.description,
    });
  },
  error(title: string, options?: ToastOptions) {
    toast.error(title, {
      description: options?.description,
    });
  },
  info(title: string, options?: ToastOptions) {
    toast(title, {
      description: options?.description,
    });
  },
  warning(title: string, options?: ToastOptions) {
    toast.warning(title, {
      description: options?.description,
    });
  },
};
