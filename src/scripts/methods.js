import {
  Toast,
  Modal,
  Tooltip,
} from 'bootstrap';
import mitt from '@/scripts/mitt';

export const bsToast = (id) => new Toast(document.getElementById(id));
export const bsModal = (id) => new Modal(document.getElementById(id));
export const bsTooltip = () => {
  Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
    (tooltipNode) => new Tooltip(tooltipNode),
  );
};
export const scrollTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
export const getDate = (date) => {
  const newDate = new Date(date * 1000);
  return newDate.toLocaleDateString();
};
export const getTime = (date) => {
  const newDate = new Date(date * 1000);
  return newDate.toLocaleTimeString('it-IT');
};

export const pushMessageState = (response, message) => {
  if (response && response.data.success) {
    mitt.emit('push-message', {
      style: 'success',
      content: response.data.message || message,
    });
  } else {
    mitt.emit('push-message', {
      style: 'danger',
      content: message || response.data.message,
    });
  }
};
