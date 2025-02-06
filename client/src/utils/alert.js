import Swal from "sweetalert2";

export const Alert = (title, string, type) => {
  Swal.fire({
    title: title,
    text: string,
    icon: type,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
