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

  const showWarning = (options: SweetAlertOptions = {}) => {
    return Swal.fire({
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: "Sim",
      cancelButtonText: "Cancelar",
      confirmButtonColor: theme.colors.negative,
      ...options,
    });
  };

  return {
    showSuccess,
    showWarning,
  };
};
