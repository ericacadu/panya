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
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};
export const getTime = (date) => {
  const newDate = new Date(date);
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

export const navigator = (page, data) => {
  const newData = data;
  const newArray = [];
  const per = 9;
  const pages = {
    total_pages: Math.ceil(newData.length / per),
    current_page: Number(page),
    has_pre: false,
    has_next: false,
    maxData: page * per,
    minData: (page - 1) * per + 1,
  };
  newData.forEach((item, idx) => {
    if (idx + 1 >= pages.minData
      && idx + 1 <= pages.maxData) {
      newArray.push(item);
    }
  });
  if (page > 1) {
    pages.has_pre = true;
  }
  if (page < pages.total_pages) {
    pages.has_next = true;
  }
  return {
    pages,
    newArray,
  };
};

export const cash = (x) => {
  const str = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${str}`;
};
