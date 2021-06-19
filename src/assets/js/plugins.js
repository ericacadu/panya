import { Toast, Modal } from 'bootstrap';

export const bsToast = (id) => new Toast(document.getElementById(id));
export const bsModal = (id) => new Modal(document.getElementById(id));
export const scrollTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
