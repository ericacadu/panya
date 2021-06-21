import {
  Toast,
  Modal,
  Tooltip,
} from 'bootstrap';

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
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
  const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  return `${year}-${month}-${day}`;
};
export const getTime = (date) => {
  const newDate = new Date(date * 1000);
  const hour = newDate.getHours();
  const min = newDate.getMinutes();
  const sec = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds();

  return `${hour}:${min}:${sec}`;
};
