import { apiUploadFile } from '@/scripts/api';

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then((file) => new Promise(() => {
        this.sendRequest(file);
      }));
  }

  sendRequest(file) {
    this.data = new FormData();
    this.data.append('upload', file);
    apiUploadFile(this.data)
      .then((res) => {
        this.loader.imageUrl = res.data.imageUrl;
        console.log(this.loader);
        // return res.data.imageUrl;
      });
  }
}
