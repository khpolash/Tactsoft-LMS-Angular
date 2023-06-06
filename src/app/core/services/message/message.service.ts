import Swal, {SweetAlertIcon} from "sweetalert2";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MessageService {

  private toastConfig: any;

  constructor() {
    this.toastConfig = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      // iconColor: 'white',
      // customClass: {
      //   popup: 'colored-toast'
      // },
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }

  show(message: string, icon: SweetAlertIcon) {
    Swal.fire({
      position: 'top-end',
      icon,
      title: message,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  success(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  error(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  warn(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  confirm(message?: string) {
    return Swal.fire({
      text: message ? message : "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });
  }

  inputValue(message: string, title: string) {
    return Swal.fire({
      title,
      input: "number",
      text: message,
      showConfirmButton: true,
      showCloseButton: true,
      showCancelButton: true
    });
  }

  toast = (message: string, icon: SweetAlertIcon): void => {
    this.toastConfig.fire({
      icon,
      text: message,
    });
  };

  toastSuccess = (message: string): void => {
    this.toastConfig.fire({
      icon:'success',
      text: message,
    });
  };
  toastWarning = (message: string): void => {
    this.toastConfig.fire({
      icon:'warning',
      text: message,
    });
  };
  toastError = (message: string): void => {
    this.toastConfig.fire({
      icon:'error',
      text: message,
    });
  };
  toastConfirm = (message: string): void => {
    this.toastConfig.fire({
      icon:'question',
      text: message,
    });
  };

}
