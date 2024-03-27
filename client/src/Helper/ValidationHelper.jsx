import toast from "react-hot-toast";
class ValidationHelper {
  IsEmpty(value) {
    if (value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  ErrorToast(msg) {
    toast.error(msg, { position: "bottom-center" });
  }
  SuccessToast(msg) {
    toast.success(msg, { position: "bottom-center" });
  }
}

export const { IsEmpty, ErrorToast, SuccessToast } = new ValidationHelper();
