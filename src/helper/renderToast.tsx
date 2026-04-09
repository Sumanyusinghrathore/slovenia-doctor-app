import { COLORS, FONTS, genericStyles } from "../constants";

type ToastType = "normal" | "success" | "danger" | "info";

const renderToast = (
  toast: any,
  msg: string,
  type: ToastType = "normal",
  duration: number = 3000
): void => {
  if (!toast || !msg) return;

  // ✅ SAFE: check method existence
  if (typeof toast.hideAll === "function") {
    toast.hideAll();
  }

  if (typeof toast.show === "function") {
    toast.show(msg, {
      type,
      placement: "bottom",
      duration,
      offset: 30,
      textStyle: [
        genericStyles.title600,
        {
          color: COLORS.white,
          fontFamily: FONTS.AxiformaMedium,
        },
      ],
      normalColor: COLORS.secondary,
      successColor: "#55BB62",
      animationType: "zoom-in",
    });
  }
};

export default renderToast;
