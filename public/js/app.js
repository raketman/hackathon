(function(t){function e(e){for(var o,r,c=e[0],i=e[1],l=e[2],d=0,f=[];d<c.length;d++)r=c[d],s[r]&&f.push(s[r][0]),s[r]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,c=1;c<n.length;c++){var i=n[c];0!==s[i]&&(o=!1)}o&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},s={app:0},a=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=i;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var o=n("64a9"),s=n.n(o);s.a},"2fff":function(t,e,n){},4678:function(t,e,n){var o={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(t){var e=a(t);return n(e)}function a(t){var e=o[t];if(!(e+1)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e}s.keys=function(){return Object.keys(o)},s.resolve=a,t.exports=s,s.id="4678"},"4d77":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container main-app"},[this.$store.getters.GET_ERROR?n("error"):t._e(),t.showRouter?n("router-view"):t._e()],1)},a=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{attrs:{close:t.close}},[n("div",{attrs:{slot:"body"},domProps:{innerHTML:t._s(this.$store.getters.GET_ERROR)},slot:"body"})])},c=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[n("div",{staticClass:"modal-dialog",style:{width:t.width},attrs:{role:"document"}},[n("button-field",{staticClass:"btn-link modal-close",on:{click:t.close}}),n("div",{staticClass:"modal-content"},[n("div",{staticClass:"modal-header"},[n("h5",{staticClass:"big-text",domProps:{innerHTML:t._s(t.title)}})]),n("div",{staticClass:"modal-body"},[t._t("body")],2),n("div",{staticClass:"modal-footer"},[t._t("footer")],2)])],1)])},l=[],u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"btn",attrs:{type:"submit"},on:{click:function(e){return t.$emit("click")}}},[t._v(t._s(t.title))])},d=[],f={name:"Button",props:["title"]},b=f,m=n("2877"),h=Object(m["a"])(b,u,d,!1,null,null,null),p=h.exports,v={name:"Modal",components:{ButtonField:p},props:{title:{type:String,required:!1},width:{type:String,required:!1},close:{type:Function}}},j=v,g=(n("c88d"),Object(m["a"])(j,i,l,!1,null,"1f872727",null)),_=g.exports,E={components:{modal:_},methods:{close:function(){this.$store.commit("FLUSH_ERROR")}}},C=E,O=Object(m["a"])(C,r,c,!1,null,"f208836a",null),T=O.exports,y={name:"App",components:{Error:T},computed:{showRouter:function(){return!this.$store.getters.IS_AUTHORIZED||this.$store.getters.USER}},created:function(){var t=this;this.$store.getters.IS_AUTHORIZED&&this.$store.dispatch("SET_USER",this.$store.getters.GET_TOKEN),this.$store.subscribe(function(e){"AUTHORIZED"===e.type&&t.$store.dispatch("SET_USER",t.$store.getters.GET_TOKEN)})}},k=y,S=(n("034f"),Object(m["a"])(k,s,a,!1,null,null,null)),w=S.exports,R=n("8c4f"),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row flex-column"},[n("title-block",{attrs:{title:"Моя недвижимость"}}),t._l(t.getObjects,function(e){return n("div",{key:e.id,staticClass:"object-item"},[n("button-field",{staticClass:"btn-link btn-dots"}),n("div",{staticClass:"object-head"},[n("label",[n("div",{staticClass:"checkbox-block"},[n("input",{staticClass:"object-checkbox",attrs:{type:"checkbox"},domProps:{checked:e.checked},on:{click:function(n){return t.selectObject(e)}}})]),n("div",{staticClass:"object-name big-text"},[t._v(t._s(e.values.title))]),n("div",{staticClass:"object-contract bold-text"},[t._v("ЛС - "+t._s(e.values.account))])])]),n("counters",{staticClass:"object-body",attrs:{counters:t.getCounters,object:e}})],1)}),n("button-field",{staticClass:"btn-dotted",attrs:{title:"Добавить объект"},on:{click:t.startAdd}}),t.showAddModal?n("modal",{attrs:{close:t.closeAddModal,title:""}},[n("div",{staticClass:"body",attrs:{slot:"body"},slot:"body"},[n("object-add",{attrs:{callback:t.closeAddModal}})],1)]):t._e(),n("div",{staticClass:"payment a-bottom"},[n("button-field",{staticClass:"btn-action",attrs:{title:"Оплатить "+t.getPaymentSum+" ₽"},on:{click:t.startPayment}})],1)],2)},$=[],A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col a-center"},[n("h3",{staticClass:"title col"},[t._v(t._s(t.title))]),this.$store.getters.IS_AUTHORIZED?n("logout"):t._e()],1)},D=[],U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logout"},[n("form",{attrs:{action:"",method:"get"},on:{submit:function(e){return e.preventDefault(),t.logout(e)}}},[n("button-field",{staticClass:"btn-link btn-logout",attrs:{title:"Выход"}})],1)])},I=[],B={name:"Logout",components:{ButtonField:p},methods:{logout:function(){var t=this;this.$store.commit("RESET_OBJECTS"),this.$store.dispatch("LOGOUT").then(function(){t.$router.push({name:"login"})})}}},M=B,N=(n("6cde"),Object(m["a"])(M,U,I,!1,null,"37ed4d3a",null)),P=N.exports,z={name:"Title",components:{Logout:P},props:["title"]},F=z,J=Object(m["a"])(F,A,D,!1,null,"3e3c23d9",null),L=J.exports,H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[t._l(t.getCounters,function(e){return n("div",{key:e.id,staticClass:"counter"},[n("div",{staticClass:"counter-num"},[n("span",{class:"counter-type type_"+e.values[9][0]},[t._v(t._s(e.values.payment_value)+t._s(e.values.tariff[0].recordValues[6]))])]),n("div",{staticClass:"counter-info"},[n("div",{staticClass:"counter-meter"},[t._v(t._s(t.getValueToPay(e))+t._s(e.values.tariff[0].recordValues[6]))]),n("div",{staticClass:"counter-sum"},[t._v(t._s(t.getSumToPay(e))+"руб.")])])],1)}),n("button-field",{staticClass:"btn-link",attrs:{counter:t.currentCounter,title:"Добавить счетчик"},on:{click:t.startAdd}}),t.showAddModal?n("modal",{attrs:{close:t.stopAdd,title:"Добавление нового счетчика"}},[n("div",{staticClass:"body",attrs:{slot:"body"},slot:"body"},[n("counter-add",{attrs:{callback:t.stopAdd,object:t.object}})],1)]):t._e(),t.showChangeModal?n("modal",{attrs:{close:t.stoptChangeValue,title:t.counterTitle}},[n("div",{staticClass:"body",attrs:{slot:"body"},slot:"body"},[n("counter-value",{attrs:{callback:t.stoptChangeValue,counter:t.currentCounter}})],1)]):t._e()],2)},q=[],G=(n("ac6a"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("form",{attrs:{action:"#/",method:"post"},on:{submit:function(e){return e.preventDefault(),t.createNewCounter(e)}}},[n("select-field",{attrs:{name:"type",options:t.getTypes,label:"Тип счетчика"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}}),n("text-field",{attrs:{placeholder:"Номер счетчика",required:""},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}}),n("p",[t._v("\n            После добавления счетчика с вами свяжется специалист\n            для назначения даты для поверки прибора\n        ")]),n("button-field",{staticClass:"btn-action",attrs:{title:"Добавить счетчик"}})],1)])}),V=[],Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("input",{staticClass:"form-ctrl",attrs:{type:t.type},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}})},K=[],Y={name:"Text",props:{value:String,type:{type:String,default:"text"}}},Q=Y,W=Object(m["a"])(Q,Z,K,!1,null,null,null),X=W.exports,tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("select",{staticClass:"form-ctrl",on:{input:function(e){return t.$emit("input",e.target.value)}}},[n("option",{attrs:{value:""}},[t._v(t._s(t.label))]),t._l(t.options,function(e){return n("option",{key:e.id,domProps:{value:e.id}},[t._v("\n        "+t._s(e.title)+"\n    ")])})],2)},et=[],nt={name:"Select",props:["label","options"]},ot=nt,st=Object(m["a"])(ot,tt,et,!1,null,"018780b4",null),at=st.exports,rt={all:function(){return[{id:1,title:"вода"},{id:2,title:"вода горячая"},{id:3,title:"газ"},{id:4,title:"электричество"}]},getTitle:function(t){var e=this.all().filter(function(e){return e.id===parseInt(t)}).pop();return e?'<span class="counter-type type_'+e.id+'">'+e.title+"</span>":null}},ct={components:{ButtonField:p,SelectField:at,TextField:X},props:{callback:{type:Function},object:{type:Object}},data:function(){return{type:"",number:""}},computed:{getTypes:function(){return rt.all()}},methods:{createNewCounter:function(){var t=this;this.$store.dispatch("ADD_COUNTER",{object_id:this.object.id,type:this.type,number:this.number}).then(function(){t.callback()})}}},it=ct,lt=Object(m["a"])(it,G,V,!1,null,"b9afe734",null),ut=lt.exports,dt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("form",{attrs:{action:"#/",method:"post"},on:{submit:function(e){return e.preventDefault(),t.counterChange(e)}}},[n("text-field",{attrs:{type:"number",placeholder:"Введите значение",required:""},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),n("button-field",{staticClass:"btn-action",attrs:{title:"Сохранить"}})],1)])},ft=[],bt={components:{TextField:X,ButtonField:p},props:{counter:{type:Object},callback:{type:Function}},data:function(){return{value:""}},methods:{counterChange:function(){console.log(this.counter),this.callback()}}},mt=bt,ht=Object(m["a"])(mt,dt,ft,!1,null,"c61abbf8",null),pt=ht.exports,vt=n("2f62"),jt=(n("20d6"),n("bc3a")),gt=n.n(jt),_t=n("4328"),Et=n.n(_t),Ct=gt.a.create({paramsSerializer:function(t){return Et.a.stringify(t,{arrayFormat:"brackets"})},baseURL:"http://v132188.hosted-by-vdsina.ru"});Ct.interceptors.request.use(function(t){return null==t.params&&(t.params={}),t});var Ot=Ct,Tt={all:function(){return[{catalog:11,id:14,code:"title"},{catalog:11,id:13,code:"account"},{catalog:13,id:8,code:"number"},{catalog:13,id:9,code:"type"},{catalog:13,id:13,code:"status"},{catalog:13,id:8,code:"number"},{catalog:13,id:11,code:"valid"},{catalog:13,id:2,code:"valid_until"},{catalog:13,id:6,code:"current_value"},{catalog:13,id:18,code:"payment_value"},{catalog:13,id:7,code:"tariff"}]},getCode:function(t,e){var n=this.all().filter(function(n){return n.id==t&&n.catalog==e}).pop();return n?n.code:null}},yt=n("c1df"),kt=n.n(yt),St={state:{number:window.localStorage.getItem("number"),user:null,objects:[],counters:[]},getters:{USER:function(t){return t.user},OBJECTS:function(t){return t.objects},COUNTERS:function(t){return t.counters},COUNTERS_BY_OBJECT:function(t){return function(e){return t.counters[e]?t.counters[e]:[]}}},mutations:{CHANGE_DOC:function(t){t.objects[0].values["title"]="ff"},SET_USER:function(t,e){t.user=e},RESET_USER:function(t){t.user=null},SET_OBJECTS:function(t,e){for(var n in e)e[n].checked=1;t.objects=e},RESET_COUNTERS:function(t){t.counters=[]},RESET_OBJECTS:function(t){t.objects=[]},SET_COUNTERS:function(t,e){for(var n in e.counters)e.counters[n]["object_id"]=e.object_id,t.counters.push(e.counters[n])},ADD_OBJECT:function(t,e){t.objects.push(e)},ADD_COUNTER:function(t,e){t.counters.push(e)},DELETE_OBJECT:function(t,e){t.objects=t.objects.filter(function(t){return t.id!==e})},CHANGE_SELECTED_OBJECT:function(t,e){var n=t.objects.findIndex(function(t){return t.id===e.id});n>-1&&(t.objects[n].checked=t.objects[n].checked?0:1)}},actions:{SET_USER:function(t,e){Ot({method:"get",url:"/proxy/api/v1/catalogs/12/records/"+e}).then(function(e){console.log(e.data),t.commit("SET_USER",e.data)}).catch(function(t){console.warn(t)})},SET_OBJECTS:function(t){var e=11;return Ot({method:"get",url:"/proxy/api/v1/catalogs/"+e+"/records?timezoneOffset=180&filters[0][fieldId]=4&filters[0][value][0][recordId]="+t.state.user.id+"&filters[0][value][0][catalogId]=12&sortField=id&sortType=-1&limit=100"}).then(function(n){console.log(n.data),t.commit("SET_OBJECTS",wt(n.data,e,1))}).catch(function(t){console.warn(t)})},SET_COUNTERS:function(t,e){var n=13;return Ot({method:"get",url:"/proxy/api/v1/catalogs/"+n+"/records?withFieldsAdditional=true&timezoneOffset=180&filters[0][fieldId]=12&filters[0][value][0][recordId]="+e+"&filters[0][value][0][catalogId]=11&sortField=id&sortType=-1&limit=50"}).then(function(o){console.log(o.data),t.commit("SET_COUNTERS",{object_id:e,counters:wt(o.data,n,1)})}).catch(function(t){console.warn(t)})},CREATE_PAYMENT:function(t,e){return Ot({method:"post",url:"/proxy/api/webrequest/pay",data:e}).then(function(t){console.log(t.data)}).catch(function(t){console.warn(t)})},ADD_OBJECT:function(t,e){var n=11,o={4:[{sectionId:"2",catalogId:"12",catalogTitle:"Владельцы",recordId:t.state.user.id}],13:e.account,14:e.title};return Ot({method:"post",url:"/proxy/api/v1/catalogs/"+n+"/records?timezoneOffset=180",data:{values:o}}).then(function(s){console.log(s.data),t.commit("ADD_OBJECT",wt({id:s.data.id,title:e.title,values:o},n))}).catch(function(t){console.warn(t)})},DELETE_OBJECT:function(t,e){var n=11,o=[];for(var s in e.values["4"])e.values["4"][s]["recordId"]!=t.state.user.id&&o.push(e.values["4"][s]);var a={4:o};return Ot({method:"patch",url:"/proxy/api/v1/catalogs/"+n+"/records/"+e.id+"?timezoneOffset=180",data:{values:a}}).then(function(n){console.log(n.data),t.commit("DELETE_OBJECT",e.id)}).catch(function(t){console.warn(t)})},ADD_COUNTER:function(t,e){var n=13,o={8:e.number,9:[e.type],12:[{sectionId:"2",catalogId:"11",catalogTitle:"Объекты",recordId:e.object_id}]};return Ot({method:"post",url:"/proxy/api/v1/catalogs/"+n+"/records?timezoneOffset=180",data:{values:o}}).then(function(s){console.log(s.data),t.commit("ADD_COUNTER",wt({id:s.data.id,object_id:e.object_id,title:e.number,values:o},n))}).catch(function(t){console.warn(t)})}}};function wt(t,e,n){if(n)for(var o in t)t[o]=wt(t[o],e,0);else for(var s in t.values){var a=Tt.getCode(s,e);a&&(t.values[a]=t.values[s])}return t}var Rt={state:{access_token:window.localStorage.getItem("access_token")},getters:{IS_AUTHORIZED:function(t){var e=t.access_token;return!!e},GET_TOKEN:function(t){return t.access_token}},mutations:{AUTHORIZED:function(t,e){t.access_token=e.id,window.localStorage.setItem("access_token",e.id)},LOGOUT:function(t){t.access_token=null,window.localStorage.removeItem("access_token")}},actions:{LOGOUT:function(t,e){return new Promise(function(t,e){t()}).then(function(e){t.commit("LOGOUT"),t.commit("RESET_USER")}).catch(function(t){console.warn(t)})},AUTHORIZED:function(t,e){return Ot({method:"get",url:"/proxy/api/v1/catalogs/12/records?filters[0][fieldId]=4&filters[0][value]="+e}).then(function(e){1!=e.data.length?t.commit("ADD_ERROR","Авторизация не пройдена"):t.commit("AUTHORIZED",e.data[0])}).catch(function(t){console.warn(t)})}}},xt={state:{error:null},getters:{GET_ERROR:function(t){return t.error}},mutations:{ADD_ERROR:function(t,e){t.error=e},FLUSH_ERROR:function(t){t.error=null}}};o["a"].use(vt["a"]);var $t=new vt["a"].Store({modules:{Data:St,Auth:Rt,Error:xt}}),At={getSum:function(t){var e=$t.getters.COUNTERS.filter(function(e){return e.object_id===t.id}),n=0;for(var o in e)n+=this.getCounterSum(e[o]);return Math.round(100*n)/100},getAllSum:function(t){var e=0;for(var n in t)e+=this.getSum(t[n]);return Math.round(100*e)/100},getCounterValue:function(t){return Math.round(100*(parseFloat(t.values.current_value)-parseFloat(t.values.payment_value)))/100},getCounterSum:function(t){return Math.round(this.getCounterValue(t)*t.values.tariff[0].recordValues[3]*100)/100}},Dt={name:"Counters",components:{Modal:_,ButtonField:p,CounterAdd:ut,CounterValue:pt},data:function(){return{showAddModal:!1,showChangeModal:!1,currentCounter:null}},props:{counters:{},object:{}},computed:{getCounters:function(){var t=this;return this.counters.filter(function(e){return e.object_id===t.object.id})},counterTitle:function(){return rt.getTitle(this.currentCounter.values.type[0])}},methods:{getValueToPay:function(t){return At.getCounterValue(t)},getSumToPay:function(t){return At.getCounterSum(t)},startAdd:function(){this.showAddModal=!0},stopAdd:function(){this.showAddModal=!1},startChangeValue:function(t){this.currentCounter=t,this.showChangeModal=!0},stoptChangeValue:function(){this.showChangeModal=!1}}},Ut=Dt,It=(n("f129"),Object(m["a"])(Ut,H,q,!1,null,"5be9319f",null)),Bt=It.exports,Mt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("form",{attrs:{action:"#/",method:"post"},on:{submit:function(e){return e.preventDefault(),t.createNewObject(e)}}},[n("text-field",{attrs:{placeholder:"Название объекта",required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),n("text-field",{attrs:{placeholder:"Лицевой счет",required:""},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),n("button-field",{staticClass:"btn-action",attrs:{title:"Создать объект"}})],1)])},Nt=[],Pt={name:"ObjectAdd",components:{TextField:X,ButtonField:p},props:{callback:{type:Function}},data:function(){return{title:"",account:""}},methods:{createNewObject:function(){var t=this;this.callback(),this.$store.dispatch("ADD_OBJECT",{title:this.title,account:this.account}).then(function(){t.callback()})}}},zt=Pt,Ft=Object(m["a"])(zt,Mt,Nt,!1,null,"65762c0f",null),Jt=Ft.exports,Lt={name:"Object",components:{TitleBlock:L,ObjectAdd:Jt,Counters:Bt,ButtonField:p,Modal:_},data:function(){return{showAddModal:!1,showPaymentModal:!1}},computed:{getPaymentSum:function(){return At.getAllSum(this.getSelectedObject)},getSelectedObject:function(){return this.getObjects.filter(function(t){return t.checked})},getObjects:function(){return this.$store.getters.OBJECTS},getCounters:function(){return this.$store.getters.COUNTERS}},methods:{selectObject:function(t){this.$store.commit("CHANGE_SELECTED_OBJECT",t)},deleteObject:function(t){this.$store.dispatch("DELETE_OBJECT",t)},startPayment:function(){this.$router.push({name:"payment"})},startAdd:function(){this.showAddModal=!0},closeAddModal:function(){this.showAddModal=!1},loadObject:function(){var t=this;this.$store.commit("RESET_OBJECTS"),this.$store.dispatch("SET_OBJECTS").then(function(){for(var e in t.$store.commit("RESET_COUNTERS"),t.$store.getters.OBJECTS)t.$store.dispatch("SET_COUNTERS",t.$store.getters.OBJECTS[e].id)})}},mounted:function(){this.loadObject()}},Ht=Lt,qt=(n("b0be"),Object(m["a"])(Ht,x,$,!1,null,"3a1463fc",null)),Gt=qt.exports,Vt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("div",{domProps:{innerHTML:t._s(t.getNumber)}})])},Zt=[],Kt={name:"Second",computed:{getNumber:function(){return this.$store.getters.NUMBER}}},Yt=Kt,Qt=Object(m["a"])(Yt,Vt,Zt,!1,null,"4409ab8e",null),Wt=Qt.exports,Xt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row cover"},[n("h2",{staticClass:"big-title"},[t._v("Вход в систему")]),t.isPhone?n("form",{attrs:{action:"/login",method:"post"},on:{submit:function(e){return e.preventDefault(),t.authorized(e)}}},[n("phone-field",{attrs:{name:"phone",required:""},model:{value:t.login,callback:function(e){t.login=e},expression:"login"}}),n("button-field",{staticClass:"btn-action",attrs:{title:"Отправить код"}})],1):t._e(),t.isCode?n("form",{attrs:{action:"/login",method:"post"},on:{submit:function(e){return e.preventDefault(),t.checkCode(e)}}},[n("text-field",{attrs:{type:"number",name:"code",placeholder:"Sms код",required:""},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),n("button-field",{staticClass:"btn-action",attrs:{title:"Войти в систему"}}),n("button-field",{staticClass:"btn-action-hollow",attrs:{title:"Указать другой номер"},on:{click:t.showAnotherPhone}})],1):t._e()])},te=[],ee=(n("a481"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("input",{directives:[{name:"mask",rawName:"v-mask",value:"# (###) ###-##-##",expression:"'# (###) ###-##-##'"}],staticClass:"form-ctrl",attrs:{type:"tel",placeholder:"Введите номер телефона"},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}})}),ne=[],oe=n("3a60"),se={name:"Phone",props:{value:String},directives:{mask:oe["mask"]}},ae=se,re=Object(m["a"])(ae,ee,ne,!1,null,null,null),ce=re.exports,ie={name:"Login",components:{PhoneField:ce,ButtonField:p,TextField:X},data:function(){return{code:"",login:"",step:"phone"}},computed:{isPhone:function(){return"phone"==this.step},isCode:function(){return"code"==this.step}},methods:{showAnotherPhone:function(){this.login="",this.step="phone"},authorized:function(){11!==this.login.replace(/\D/gi,"").length?this.$store.commit("ADD_ERROR","Номер телефона введен не верно!"):this.step="code"},checkCode:function(){var t=this;this.$store.dispatch("AUTHORIZED",this.login).then(function(){t.$router.push({name:"start"})})}}},le=ie,ue=Object(m["a"])(le,Xt,te,!1,null,null,null),de=ue.exports,fe=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("title-block",{attrs:{title:"Оплата"}}),n("form",{attrs:{action:"/login",method:"post"},on:{submit:function(e){return e.preventDefault(),t.payment(e)}}},[n("text-field",{attrs:{name:"code",placeholder:"Номер карты",required:""},model:{value:t.card,callback:function(e){t.card=e},expression:"card"}}),n("text-field",{attrs:{name:"valid",placeholder:"Дата валидности",required:""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}}),n("text-field",{attrs:{type:"password",name:"csv",placeholder:"CSV",required:""},model:{value:t.csv,callback:function(e){t.csv=e},expression:"csv"}}),n("button-field",{staticClass:"btn-action",attrs:{title:"Оплатить"}})],1),n("button-field",{attrs:{title:"Назад"},on:{click:t.back}})],1)},be=[],me=(n("5df3"),{name:"Login",components:{ButtonField:p,TextField:X,TitleBlock:L},data:function(){return{csv:"",card:"",valid:""}},computed:{getCheckedObject:function(){return this.$store.getters.OBJECTS.filter(function(t){return t.checked})}},created:function(){0===this.getCheckedObject.length&&this.$router.push({name:"start"})},methods:{back:function(){this.$router.push({name:"start"})},payment:function(){var t=this,e=[],n=[];for(var o in this.getCheckedObject){var s=this.getCheckedObject[o],a=this.$store.getters.COUNTERS.filter(function(t){return t.object_id===s.id});for(var r in a){var c=a[r],i=At.getCounterSum(c);0!==i&&n.push({id:c.id,objectId:s.id,value:i})}}e.push(this.$store.dispatch("CREATE_PAYMENT",{pays:n})),Promise.all(e).then(function(){t.$router.push({name:"start"})}),Promise.all(e).then(function(){t.$router.push({name:"start"})})}}}),he=me,pe=Object(m["a"])(he,fe,be,!1,null,null,null),ve=pe.exports;o["a"].use(R["a"]);var je=function(t,e,n){$t.getters.IS_AUTHORIZED?n("/"):n()},ge=function(t,e,n){$t.getters.IS_AUTHORIZED?n():n("/login")},_e=[{path:"/",component:Gt,name:"start",beforeEnter:ge},{path:"/check",component:Wt,name:"second",beforeEnter:ge},{path:"/login",component:de,name:"login",beforeEnter:je},{path:"/payment",component:ve,name:"payment",beforeEnter:ge}],Ee=new R["a"]({routes:_e,path:"*",redirect:"/"}),Ce=n("31bd");o["a"].config.productionTip=!1,n("957c"),o["a"].use(n("2ead"),{moment:kt.a}),o["a"].config.productionTip=!1,Object(Ce["sync"])($t,Ee),new o["a"]({router:Ee,store:$t,render:function(t){return t(w)}}).$mount("#app")},"64a9":function(t,e,n){},"6c20":function(t,e,n){},"6cde":function(t,e,n){"use strict";var o=n("2fff"),s=n.n(o);s.a},b0be:function(t,e,n){"use strict";var o=n("da26"),s=n.n(o);s.a},c88d:function(t,e,n){"use strict";var o=n("6c20"),s=n.n(o);s.a},da26:function(t,e,n){},f129:function(t,e,n){"use strict";var o=n("4d77"),s=n.n(o);s.a}});
//# sourceMappingURL=app.js.map