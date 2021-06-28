import { apiUploadFile } from '@/scripts/api';

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then((file) => new Promise((resolve) => {
        this.sendRequest(file, resolve);
      }));
  }

  sendRequest(file, resolve) {
    this.data = new FormData();
    this.data.append('upload', file);
    apiUploadFile(this.data)
      .then((res) => {
        this.loader.imageUrl = res.data.imageUrl;
        resolve({ default: res.data.imageUrl });
      });
  }
}
