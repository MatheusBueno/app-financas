import theme from "@app/styles/theme";
import Swal, { SweetAlertOptions } from "sweetalert2";

export const useToast = () => {
  const showSuccess = (options: SweetAlertOptions = {}) => {
    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
      confirmButtonColor: theme.colors.primary,
      ...options,
    });
  };

  return {
    showSuccess,
  };
};
