import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

// Sonner defaults to bottom-right — no position config needed. Used for
// real-time notification pop-ups (e.g. a studio receiving a new
// application) with a one-click jump to the Inbox.
export const showNotificationToast = (message: string, onView: () => void) => {
  toast(message, { action: { label: 'View', onClick: onView } });
};
