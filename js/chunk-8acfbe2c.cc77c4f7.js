(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8acfbe2c"],{"1dde":function(t,e,n){var c=n("d039"),o=n("b622"),a=n("2d00"),r=o("species");t.exports=function(t){return a>=51||!c((function(){var e=[],n=e.constructor={};return n[r]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"4de4":function(t,e,n){"use strict";var c=n("23e7"),o=n("b727").filter,a=n("1dde"),r=a("filter");c({target:"Array",proto:!0,forced:!r},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"99af":function(t,e,n){"use strict";var c=n("23e7"),o=n("da84"),a=n("d039"),r=n("e8b5"),i=n("861d"),u=n("7b0b"),s=n("07fa"),l=n("8418"),d=n("65f0"),f=n("1dde"),m=n("b622"),p=n("2d00"),b=m("isConcatSpreadable"),g=9007199254740991,v="Maximum allowed index exceeded",h=o.TypeError,w=p>=51||!a((function(){var t=[];return t[b]=!1,t.concat()[0]!==t})),O=f("concat"),j=function(t){if(!i(t))return!1;var e=t[b];return void 0!==e?!!e:r(t)},x=!w||!O;c({target:"Array",proto:!0,arity:1,forced:x},{concat:function(t){var e,n,c,o,a,r=u(this),i=d(r,0),f=0;for(e=-1,c=arguments.length;e<c;e++)if(a=-1===e?r:arguments[e],j(a)){if(o=s(a),f+o>g)throw h(v);for(n=0;n<o;n++,f++)n in a&&l(i,f,a[n])}else{if(f>=g)throw h(v);l(i,f++,a)}return i.length=f,i}})},a397:function(t,e,n){"use strict";n.d(e,"D",(function(){return u})),n.d(e,"E",(function(){return s})),n.d(e,"C",(function(){return l})),n.d(e,"l",(function(){return d})),n.d(e,"A",(function(){return f})),n.d(e,"j",(function(){return m})),n.d(e,"B",(function(){return p})),n.d(e,"q",(function(){return b})),n.d(e,"y",(function(){return g})),n.d(e,"g",(function(){return v})),n.d(e,"s",(function(){return h})),n.d(e,"z",(function(){return w})),n.d(e,"h",(function(){return O})),n.d(e,"i",(function(){return j})),n.d(e,"o",(function(){return x})),n.d(e,"m",(function(){return y})),n.d(e,"w",(function(){return E})),n.d(e,"e",(function(){return k})),n.d(e,"b",(function(){return N})),n.d(e,"t",(function(){return B})),n.d(e,"p",(function(){return V})),n.d(e,"a",(function(){return S})),n.d(e,"x",(function(){return F})),n.d(e,"d",(function(){return T})),n.d(e,"f",(function(){return C})),n.d(e,"c",(function(){return A})),n.d(e,"r",(function(){return D})),n.d(e,"u",(function(){return z})),n.d(e,"v",(function(){return H})),n.d(e,"k",(function(){return I})),n.d(e,"n",(function(){return L}));n("99af");var c=n("bc3a"),o=n.n(c),a="https://vue3-course-api.hexschool.io",r="panya",i="".concat(a,"/api/").concat(r,"/admin"),u=function(t){return o.a.post("".concat(a,"/admin/signin"),t)},s=function(){return o.a.post("".concat(a,"/logout"))},l=function(){return o.a.post("".concat(a,"/api/user/check"))},d=function(){return o.a.get("".concat(i,"/products/all"))},f=function(t,e,n){return o.a[t]("".concat(i,"/product/").concat(n),e)},m=function(t){return o.a.delete("".concat(i,"/product/").concat(t))},p=function(t){return o.a.post("".concat(i,"/upload"),t)},b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return o.a.get("".concat(i,"/coupons?page=").concat(t))},g=function(t,e,n){return o.a[t]("".concat(i,"/coupon/").concat(n),e)},v=function(t){return o.a.delete("".concat(i,"/coupon/").concat(t))},h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return o.a.get("".concat(i,"/orders?page=").concat(t))},w=function(t,e){return o.a.put("".concat(i,"/order/").concat(t),e)},O=function(t){return o.a.delete("".concat(i,"/order/").concat(t))},j=function(){return o.a.delete("".concat(i,"/orders/all"))},x=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return o.a.get("".concat(i,"/articles?page=").concat(t))},y=function(t){return o.a.get("".concat(i,"/article/").concat(t))},E=function(t,e,n){return o.a[t]("".concat(i,"/article/").concat(n),e)},k=function(t){return o.a.delete("".concat(i,"/article/").concat(t))},N=function(){return o.a.get("".concat(a,"/api/").concat(r,"/products/all"))},B=function(t){return o.a.get("".concat(a,"/api/").concat(r,"/product/").concat(t))},V=function(){return o.a.get("".concat(a,"/api/").concat(r,"/cart"))},S=function(t){return o.a.post("".concat(a,"/api/").concat(r,"/cart"),t)},F=function(t,e){return o.a.put("".concat(a,"/api/").concat(r,"/cart/").concat(t),e)},T=function(){return o.a.delete("".concat(a,"/api/").concat(r,"/carts"))},C=function(t){return o.a.delete("".concat(a,"/api/").concat(r,"/cart/").concat(t))},A=function(t){return o.a.post("".concat(a,"/api/").concat(r,"/order"),t)},D=function(t){return o.a.get("".concat(a,"/api/").concat(r,"/order/").concat(t))},z=function(t){return o.a.post("".concat(a,"/api/").concat(r,"/pay/").concat(t))},H=function(t){return o.a.post("".concat(a,"/api/").concat(r,"/coupon"),t)},I=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return o.a.get("".concat(a,"/api/").concat(r,"/articles?page=").concat(t))},L=function(t){return o.a.get("".concat(a,"/api/").concat(r,"/article/").concat(t))}},a63e:function(t,e,n){"use strict";n("d3b7"),n("159b");var c={methods:{fadeInOnLoad:function(){var t=document.querySelectorAll(".fade-out"),e=document.getElementById("target").offsetTop,n=window,c=n.innerHeight;t.forEach((function(t){c-t.offsetTop>=c-e&&t.classList.add("fade-in")}))},fadeInOnScroll:function(){var t=document.querySelectorAll(".fade-out"),e=document.getElementById("target").offsetTop,n=window,c=n.innerHeight,o=window.scrollY;t.forEach((function(t){o+e-t.offsetTop>=c-e&&t.classList.add("fade-in")}))}},mounted:function(){window.addEventListener("scroll",this.fadeInOnScroll)},unmounted:function(){window.removeEventListener("scroll",this.fadeInOnScroll)}};const o=c;e["a"]=o},ec5a:function(t,e,n){"use strict";n.r(e);var c=n("7a23"),o={class:"container-fluid"},a={class:"bg-cover banner"},r={class:"container row g-2"},i=Object(c["createElementVNode"])("h1",{class:"col-12 fs-5 fs-md-3 ls-md-5 fw-normal text-white text-center"}," 用天然食材，做出溫暖人心的麵包 ",-1),u=Object(c["createTextVNode"])("探索美味"),s={class:"container px-3"},l=Object(c["createStaticVNode"])('<h2 class="fs-4 text-center p-5">只有用心，才能暖心</h2><div class="row g-3 mb-5 fade-out"><div class="col-12 col-md-6"><img class="img-fluid" src="https://storage.googleapis.com/vue-course-api.appspot.com/panya/1627475381663.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=SJCl4Zi3QL1cXkZ8n%2FRnLN3Wx4YbNsjz516AP9H3HCSTt8nY0uRVdEh2JBPU2HE1l7%2F0rDyh1fmpuuUsx%2Fn5JSETzLhxlKEnufiHLNhAcvqASys0gV8Qcr8%2FNbx6S6EWfJblnzROTJbfe%2B5Hwpqcbqlbub2cm12VB0gTno%2BfRGFiyD505k1xuVVf274%2F9QK%2ByLBTtcdyFE8sVTCd6q05loHI8yzakl8GCmDQn3tsylP1J5OZXLUeQYHyrrI2v3nTtg7gxvV1JwAD0%2FkKmNqQ8dONo338%2BYZXhLsKmtQzHveeXHIYV%2Bh%2Beb5wTa9wJsUSyAoYU3Zcdlfzw7lr%2BX9dTA%3D%3D" alt=""></div><div class="col-12 col-md-6 p-3 p-md-5 d-flex justify-content-center align-items-center flex-column text-center lh-lg"><h4 class="fs-5 text-primary">堅持天然食材</h4> 我們堅持使用在地小農種植的天然食材 <br> 選用當季新鮮水果及優質麵粉 <br> 不使用人工香料及膨鬆劑等添加物 <p class="mt-3"><i class="fas fa-lg fa-cookie cookie"></i><i class="fas fa-lg fa-cookie-bite cookie mx-3"></i><i class="fas fa-lg fa-cookie-bite cookie"></i></p></div></div><div class="row g-3 mb-5 flex-md-row-reverse fade-out"><div class="col-12 col-md-6"><img class="img-fluid" src="https://storage.googleapis.com/vue-course-api.appspot.com/panya/1627475396914.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=FheeG0HUO7LM0l0AbBvH3W15wlHc0vN0CeYnRIgG4K3Pv8hxF83wFlrqKefPuQwNTWiYXok1VUpJXkl3aiw8uMwGJXfNpXCET64iFhTeeKMCn09RXcZORPfPNtn%2BrKbtISSmOQqf%2BaOrAxSK%2FbmAjdcNmTy4BGxRy9lZ%2BNKUj19wdy04PEJo4vUTzd1HXn0RI9z5N%2Fo5b7GwoMDMt0nPtuFBUTtiMiedISpGzCNZ8WIngB%2F%2B%2BuuTgZALpQmGk3BcGl%2BEqcbhfy7%2F3eZHC7RCFNvjSFPlG8eAZyG%2FxZrlr7ME7cw5Ue5F8SUPBoUHgt%2Brkt4ePzPsZBE%2B%2F1gjbMF45g%3D%3D" alt=""></div><div class="col-12 col-md-6 p-3 p-md-5 d-flex justify-content-center align-items-center flex-column text-center lh-lg"><h4 class="fs-5 text-primary">沒有負擔的美味</h4> 使用低卡奶油，嚴格把關麵包熱量 <br> 尋找健康食材替代高熱量原料 <br> 好吃不怕胖，美味也可以零負擔 <p class="mt-3"><i class="fas fa-lg fa-cookie-bite cookie"></i><i class="fas fa-lg fa-cookie cookie mx-3"></i><i class="fas fa-lg fa-cookie-bite cookie"></i></p></div></div>',3),d={class:"bg-cover booking text-light flex-column"},f=Object(c["createElementVNode"])("h3",{class:"fs-5 ls-2 fw-normal mb-4"},"訂閱最新消息",-1),m={class:"col-12 col-md-8 col-lg-5 m-0 me-md-2"},p=["disabled"],b=Object(c["createTextVNode"])(" 訂閱 "),g={key:0,class:"text-warning ls-2 fade",ref:"done"},v=Object(c["createElementVNode"])("i",{class:"far fa-check-circle"},null,-1),h=Object(c["createElementVNode"])("div",{id:"target",class:"position-fixed vw-100 bottom-50"},null,-1);function w(t,e,n,w,O,j){var x=Object(c["resolveComponent"])("router-link"),y=Object(c["resolveComponent"])("FrontSwiper"),E=Object(c["resolveComponent"])("Field"),k=Object(c["resolveComponent"])("ErrorMessage"),N=Object(c["resolveComponent"])("Spinner"),B=Object(c["resolveComponent"])("Form");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",o,[Object(c["createElementVNode"])("div",a,[Object(c["createElementVNode"])("div",r,[i,Object(c["createVNode"])(x,{to:"/products?category=all&page=1",class:"col-2 btn btn-outline-light px-5 mx-auto mt-3"},{default:Object(c["withCtx"])((function(){return[u]})),_:1})])]),Object(c["createElementVNode"])("div",s,[l,Object(c["createVNode"])(y,{class:"fade-out",datas:O.promote,"is-disabled":n.isDisabled,title:"熱銷商品"},null,8,["datas","is-disabled"])]),Object(c["createElementVNode"])("div",d,[f,Object(c["createVNode"])(B,{class:Object(c["normalizeClass"])(["container row g-2 g-md-0 px-5 w-md-60 d-md-flex justify-content-md-center",O.show?"":"d-none d-md-none"]),onSubmit:j.onSubmit,id:"subscribe"},{default:Object(c["withCtx"])((function(t){var n=t.errors;return[Object(c["createElementVNode"])("p",m,[Object(c["createVNode"])(E,{type:"email",id:"email",name:"Email",class:Object(c["normalizeClass"])(["form-control ls-2 ms-auto",{"is-invalid":n["Email"]}]),disabled:O.idDisabled,placeholder:"customer@panya.io",rules:"email|required",inputmode:"email",modelValue:O.email,"onUpdate:modelValue":e[0]||(e[0]=function(t){return O.email=t})},null,8,["class","disabled","modelValue"]),Object(c["createVNode"])(k,{name:"Email",class:"invalid-feedback position-md-absolute"})]),Object(c["createElementVNode"])("button",{type:"submit",class:"btn btn-primary col-12 col-md-3 col-lg-2",disabled:O.idDisabled,onSubmit:e[1]||(e[1]=function(){return j.onSubmit&&j.onSubmit.apply(j,arguments)})},[b,Object(c["createVNode"])(N,{"spin-item":O.email},null,8,["spin-item"])],40,p)]})),_:1},8,["class","onSubmit"]),O.email?(Object(c["openBlock"])(),Object(c["createElementBlock"])("p",g,[Object(c["createTextVNode"])(Object(c["toDisplayString"])(O.email)+" 已訂閱電子報 ",1),v],512)):Object(c["createCommentVNode"])("",!0)]),h])}n("4de4"),n("d3b7");var O=n("a397"),j=n("a0bc"),x=n("a63e"),y={emits:["page-loading","push-message","toggle-spinner"],props:["isDisabled"],components:{FrontSwiper:j["a"]},data:function(){return{products:[],promote:[],email:"",idDisabled:!1,show:!0}},mixins:[x["a"]],methods:{getAllProducts:function(){var t=this;Object(O["b"])().then((function(e){e.data.success||t.$pushMessage(e),t.products=e.data.products.reverse(),t.promote=t.products.filter((function(t){return t.is_promote})),setTimeout((function(){t.$emitter.emit("page-loading",!1),t.fadeInOnLoad()}),1e3)})).catch((function(e){t.$emitter.emit("page-loading",!1),t.$pushMessage(e)}))},onSubmit:function(){var t=this;this.idDisabled=!0,this.$emitter.emit("toggle-spinner",this.email),setTimeout((function(){t.idDisabled=!1,t.$emitter.emit("toggle-spinner",!1),t.$refs.done.classList.add("show"),t.show=!1}),1500)}},created:function(){this.getAllProducts(),this.$emitter.emit("page-loading",!0)}},E=n("6b0d"),k=n.n(E);const N=k()(y,[["render",w]]);e["default"]=N}}]);
//# sourceMappingURL=chunk-8acfbe2c.cc77c4f7.js.map