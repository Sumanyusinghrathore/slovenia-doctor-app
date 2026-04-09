// src/types/toast-notifications.d.ts

declare module "react-native-toast-notifications" {
    // Extend the types from the package if necessary
    export interface ToastOptions {
      type?: "normal" | "success" | "error";
      position?: "top" | "bottom" | "center";
      duration?: number;
      animationType?: "fade" | "zoom" | "slide-in";
      description?: string;
      style?: object;
      textStyle?: object;
      descriptionStyle?: object;
    }
  
    export interface Toast {
      show: (message: string, options?: ToastOptions) => void;
      hide: () => void;
    }
  
    // The ToastContext that will be provided by the ToastProvider
    export interface ToastProviderProps {
      placement?: "top" | "bottom" | "center";
      duration?: number;
      animationType?: "fade" | "zoom" | "slide-in";
      successColor?: string;
      errorColor?: string;
      normalColor?: string;
      children: React.ReactNode;
    }
  
    // Export ToastProvider component and the useToast hook
    export const ToastProvider: React.FC<ToastProviderProps>;
    export function useToast(): Toast;
  }
  