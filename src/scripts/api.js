import axios from 'axios';

const api = process.env.VUE_APP_API;
const path = process.env.VUE_APP_PATH;
const adminPath = `${api}/api/${path}/admin`;

// 後台相關 (需驗證)
export const apiUserLogin = (data) => axios.post(`${api}/admin/signin`, data);
export const apiUserLogout = () => axios.post(`${api}/logout`);
export const apiUserCheck = () => axios.post(`${api}/api/user/check`);

// 商品管理
export const apiGetAllProducts = () => axios.get(
  `${adminPath}/products/all`,
);
export const apiGetProducts = (page = 1) => axios.get(
  `${adminPath}/products?page=${page}`,
);
export const apiUpdateProducts = (method, data, id) => axios[method](
  `${adminPath}/product/${id}`, data,
);
export const apiDeleteProducts = (id) => axios.delete(
  `${adminPath}/product/${id}`,
);
export const apiUploadFile = (data) => axios.post(
  `${adminPath}/upload`, data,
);

// 優惠券
export const apiGetCoupons = (page = 1) => axios.get(
  `${adminPath}/coupons?page=${page}`,
);
export const apiUpdateCoupon = (method, data, id) => axios[method](
  `${adminPath}/coupon/${id}`, data,
);
export const apiDeleteCoupon = (id) => axios.delete(
  `${adminPath}/coupon/${id}`,
);

// 訂單管理
export const apiGetOrders = (page = 1) => axios.get(
  `${adminPath}/orders?page=${page}`,
);
export const apiUpdateOrder = (id, data) => axios.put(
  `${adminPath}/order/${id}`, data,
);
export const apiDeleteOrder = (id) => axios.delete(
  `${adminPath}/order/${id}`,
);
export const apiDeleteOrders = () => axios.delete(
  `${adminPath}/orders/all`,
);

// 文章管理
export const apiGetArticles = (page = 1) => axios.get(
  `${adminPath}/articles?page=${page}`,
);
export const apiGetArticle = (id) => axios.get(
  `${adminPath}/article/${id}`,
);
export const apiUpdateArticle = (method, data, id) => axios[method](
  `${adminPath}/article/${id}`, data,
);
export const apiDeleteArticle = (id) => axios.delete(
  `${adminPath}/article/${id}`,
);

// 前台相關

// 商品
export const apiAllProducts = () => axios.get(
  `${api}/api/${path}/products/all`,
);
export const apiProducts = (page = 1) => axios.get(
  `${api}/api/${path}/products?page=${page}`,
);
export const apiGetProduct = (id) => axios.get(
  `${api}/api/${path}/product/${id}`,
);

// 購物車
export const apiGetCart = () => axios.get(
  `${api}/api/${path}/cart`,
);
export const apiAddCart = (data) => axios.post(
  `${api}/api/${path}/cart`, data,
);
export const apiUpdateCart = (id, data) => axios.put(
  `${api}/api/${path}/cart/${id}`, data,
);
export const apiClearCart = () => axios.delete(
  `${api}/api/${path}/carts`,
);
export const apiDeleteCart = (id) => axios.delete(
  `${api}/api/${path}/cart/${id}`,
);

// 訂單
export const apiCheckout = (data) => axios.post(
  `${api}/api/${path}/order`, data,
);
export const apiGetOrder = (id) => axios.get(
  `${api}/api/${path}/order/${id}`,
);
export const apiPayOrder = (id) => axios.post(
  `${api}/api/${path}/pay/${id}`,
);

// 優惠券
export const apiPostCoupon = (data) => axios.post(
  `${api}/api/${path}/coupon`, data,
);

// 文章
export const apiGetAllArticles = (page = 1) => axios.get(
  `${api}/api/${path}/articles?page=${page}`,
);

export const apiGetArticleContent = (id) => axios.get(
  `${api}/api/${path}/article/${id}`,
);
