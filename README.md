![](https://i.imgur.com/8aE1ZEr.jpg)

# パンヤ PANYA 手感烘焙
> 麵包烘焙電商網站

Demo：[https://ericacadu.github.io/panya/](https://ericacadu.github.io/panya/)

## 設計概念
**創作理念：** 麵包 <small>(パン)</small> ＋ 吃太多 ＝ 胖呀 <small>(パンヤ)</small><br>
**主要風格：** 日系、簡單、溫暖<br>
**色系搭配：**
<img src="https://i.imgur.com/zhl1w8O.png" width="350" />

**圖片來源：**
[Pexels](https://www.pexels.com/)、
[Unsplash](https://unsplash.com/)、
[flaticon](http://www.flaticon.com/)

## 專案說明
* 網站主要使用 `Vue.js` 和 `Vue Cli` 架設而成
* 引入 `Vue Router` 與 `Vue Axios` 等套件
* 引入 `Bootstrap 5` 樣式
* 開發後台管理系統
* 加入 `ESLint Airbnb` 風格
* 統一管理 API 路徑
* 透過 `mitt` 傳遞跨元件資料
* Layout 使用 `Bootstrap 5` 結合 `Sass` 切版
* 使用 `Font Awesome**`、`Material icons`

### 前台
* 電商展示：首頁、商品列表、商品介紹等
* 購物車：刪除、修改商品數量
* 優惠券
* 結帳


### 後台
* 管理者登入
* 商品管理
* 優惠券管理
* 訂單管理
* 文章管理

## 使用技術
* Vue3
* Vue Cli
* Vue Component
* Vue Router
* Vue Axios
* Vee Validation
* V-Calendar
* CKEditor 5
* Swiper
* mitt
* Bootstrap 5
* Font Awesome
* Material icons


## 前端介紹
### 首頁
![Image](https://i.imgur.com/p0Bm6pj.png)
<br>

### 商品列表
![Image](https://i.imgur.com/aENPGfN.png)

<br>

### 商品介紹
![Image](https://i.imgur.com/eabMCHM.png)

<br>

### 搜尋商品 (Auto Complete 可使用鍵盤操作)
<img src="https://raw.githubusercontent.com/ericacadu/panya/master/public/images/auto-complete.gif" width="360">

<br>

### 可購數量最大值
限制各商品可購買數量最大值 (預設 30)，避免使用者超買，可在購物車 / 商品介紹頁進行操作
<br>
當可購買數量超過 30，則不可再加入購物車

<img src="https://raw.githubusercontent.com/ericacadu/panya/master/public/images/cartqty.gif" width="360">

<img src="https://raw.githubusercontent.com/ericacadu/panya/master/public/images/productqty.gif" width="360">



## 後台介紹
### 商品管理
* 商品列表可依照類別分類
* 個別商品可上傳圖片連結網址，或上傳圖片檔案

![Image](https://i.imgur.com/80dQium.png)
![Image](https://i.imgur.com/2fU7C5P.png)
![Image](https://i.imgur.com/9Jd0vab.png)

<br>

### 訂單管理
![Image](https://i.imgur.com/ZAVf8IR.png)

1. 模擬實際電商後台，未付款訂單會產生付款連結
2. 可分別修改訂單資訊及訂單內容，並需完成修改才可更新訂單
3. 修改訂單後會產生最後修改時間以供查閱

<br>

### 文章管理
* 文章編輯器使用 `CKEditor 5` 套件
* 日期選擇使用 `V-Calendar` 日期選取套件
* 可自行輸入標籤內容，按下 ENTER 產生標籤

![Image](https://i.imgur.com/Pvfb6dw.png)

<br>

## 網站動畫
### 按鈕讀取效果
<img src="https://raw.githubusercontent.com/ericacadu/panya/master/public/images/loading.gif" width="150">

<br>

### 轉場動畫
<img src="https://raw.githubusercontent.com/ericacadu/panya/master/public/images/transition.gif" width="360">

<br>

### 404 小精靈吃餅乾動畫
Demo：[404 頁面](https://ericacadu.github.io/panya/#/404)

<img src="https://raw.githubusercontent.com/ericacadu/panya/master/public/images/error-page.gif" width="360">

<br>
<hr>

其餘更多細節部分，歡迎至 Demo 網站觀看 [https://ericacadu.github.io/panya/](https://ericacadu.github.io/panya/)