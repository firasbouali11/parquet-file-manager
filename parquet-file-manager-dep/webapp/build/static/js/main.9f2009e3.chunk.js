(this["webpackJsonpparq-file-manager-gui"]=this["webpackJsonpparq-file-manager-gui"]||[]).push([[0],{140:function(e,t,a){},142:function(e,t,a){},177:function(e,t,a){},178:function(e,t,a){},179:function(e,t,a){},180:function(e,t,a){},186:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),s=a.n(c),i=(a(140),a(10)),o=a.n(i),l=a(16),u=a(13),d=(a(142),a(37)),b=a(117),j=a(107),m=a.n(j),p=a(228),h=a(21),f=a(250),x=a(254),g=a(251),O=a(189),y=a(252),v=a(53),k=a(69),S=a(4),C=a(12),N=a(242),T=a(246),w=a(245),D=a(241),A=a(243),L=a(263),B=a(244),I=a(261),J=a(247),P=a(188),F=a(258),E=a(119),H=a(262),R=a(248),z=a(249),U=a(113),q=a.n(U),W=a(112),M=a.n(W),Z=a(239),V=a(255),G="";G="http://".concat("localhost",":").concat("5050","/parqfile/");var Y=a(259),K=a(232),Q=a(231),X=a(109),$=a.n(X),_=a(233),ee=a(267),te=a(11),ae=a.n(te),ne=a(2),re=Object(p.a)((function(e){return{root:{width:"100%"},heading:{fontSize:e.typography.pxToRem(15),flexBasis:"33.33%",flexShrink:0},secondaryHeading:{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary}}})),ce={};function se(){var e,t=re(),a=r.a.useState(!1),n=Object(u.a)(a,2),c=n[0],s=n[1],i=r.a.useContext(_e),d=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,r,c,s,l,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(i.setLoading(!0),t=Object.keys(ce),a=Object.values(ce),n=0;n<t.length;n++)""===a[n]&&delete ce[t[n]];return console.log(ce),e.next=7,fetch(G+"one",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file"),selector:Object.keys(ce),selectorValue:Object.values(ce)})});case 7:return r=e.sent,e.next=10,r.json();case 10:if(0!==(c=e.sent).length){e.next=15;break}ae.a.fire({position:"center",icon:"warning",title:"there is no data",showConfirmButton:!1,timer:2e3}),e.next=23;break;case 15:if("error"!==c[0].status){e.next=19;break}ae.a.fire({position:"center",icon:c[0].status,title:c[0].message,showConfirmButton:!1,timer:2e3}),e.next=23;break;case 19:if(!(c.length>0)){e.next=23;break}return e.next=22,i.setData(c);case 22:ae.a.fire({position:"center",icon:"success",title:"Here is your data !",showConfirmButton:!1,timer:2e3});case 23:ce={},s=document.querySelectorAll(".textfield1 input"),l=Object(v.a)(s);try{for(l.s();!(u=l.n()).done;)u.value.value=null}catch(o){l.e(o)}finally{l.f()}i.setLoading(!1);case 28:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(ne.jsxs)("div",{className:t.root,children:[Object(ne.jsxs)(Y.a,{expanded:"panel1"===c,onChange:(e="panel1",function(t,a){s(!!a&&e)}),children:[Object(ne.jsx)(Q.a,{expandIcon:Object(ne.jsx)($.a,{}),"aria-controls":"panel1bh-content",id:"panel1bh-header",children:Object(ne.jsx)(O.a,{className:t.heading,children:"Custom Search"})}),Object(ne.jsx)(K.a,{children:Object(ne.jsx)(_.a,{container:!0,children:i.columns.map((function(e){return Object(ne.jsx)(_.a,{item:!0,md:3,children:Object(ne.jsx)("center",{children:Object(ne.jsx)(ee.a,{className:"textfield1",label:e,onChange:function(t){ce[e]=t.target.value}})})},e)}))})}),Object(ne.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:30,marginBottom:30},children:Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",style:{display:i.btnActive?"block":"none"},onClick:d,children:"Search"})})]}),Object(ne.jsx)("br",{})]})}var ie=a(110),oe=a.n(ie),le=a(257),ue=a(240),de=a(190),be=Object(p.a)((function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center",margin:"0 10%"},paper:{backgroundColor:e.palette.background.paper,border:"1px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3),maxHeight:800,maxWidth:"80%"},table:{maxHeight:600,maxWidth:300}}}));function je(e){var t=e.open,a=e.setOpen,n=e.data,r=e.deleteData,c=be(),s=function(){a(!1)},i=Object.keys(JSON.parse(n[0]));return Object(ne.jsx)("div",{children:Object(ne.jsx)(le.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",className:c.modal,open:t,onClose:s,closeAfterTransition:!0,BackdropComponent:ue.a,BackdropProps:{timeout:500},children:Object(ne.jsx)(de.a,{in:t,children:Object(ne.jsxs)("div",{className:c.paper,children:[Object(ne.jsxs)("h1",{id:"transition-modal-title",children:["You have ",n.length," records to remove! are you sure ?"]}),Object(ne.jsx)(D.a,{style:{maxHeight:600},component:P.a,children:Object(ne.jsxs)(N.a,{stickyHeader:!0,className:c.table,"aria-label":"simple table",children:[Object(ne.jsx)(A.a,{children:Object(ne.jsx)(B.a,{children:i.map((function(e){return Object(ne.jsx)(w.a,{children:e})}))})}),Object(ne.jsx)(T.a,{children:n.map((function(e,t){return Object(ne.jsx)(B.a,{children:i.map((function(t){return Object(ne.jsx)(w.a,{align:"right",children:JSON.parse(e)[t]})}))},t)}))})]})}),Object(ne.jsxs)("center",{children:[Object(ne.jsx)("br",{}),Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",onClick:function(){s(),r()},children:"Delete"})]})]})})})})}function me(e,t,a){return t[a]<e[a]?-1:t[a]>e[a]?1:0}function pe(e,t){return"desc"===e?function(e,a){return me(e,a,t)}:function(e,a){return-me(e,a,t)}}function he(e,t){var a=e.map((function(e,t){return[e,t]}));return a.sort((function(e,a){var n=t(e[0],a[0]);return 0!==n?n:e[1]-a[1]})),a.map((function(e){return e[0]}))}function fe(e){var t=e.classes,a=e.onSelectAllClick,n=e.order,r=e.orderBy,c=e.numSelected,s=e.rowCount,i=e.onRequestSort,o=e.columns;return Object(ne.jsx)(A.a,{children:Object(ne.jsxs)(B.a,{children:[Object(ne.jsx)(w.a,{padding:"checkbox",children:Object(ne.jsx)(F.a,{indeterminate:c>0&&c<s,checked:s>0&&c===s,onChange:a,inputProps:{"aria-label":"select all desserts"}})}),o.map((function(e){return Object(ne.jsx)(w.a,{align:"left",padding:e?"none":"normal",sortDirection:r===e&&n,children:Object(ne.jsxs)(I.a,{active:r===e,direction:r===e?n:"asc",onClick:(a=e,function(e){i(e,a)}),children:[e,r===e?Object(ne.jsx)("span",{className:t.visuallyHidden,children:"desc"===n?"sorted descending":"sorted ascending"}):null]})},e);var a}))]})})}var xe=Object(p.a)((function(e){return{root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(C.d)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%"}}})),ge=function(e){var t=xe(),a=e.numSelected,n=e.name,r=e.setOpen,c=e.getData,s=e.selected,i=e.btnActive,o=e.downloadParquetFile,l=e.setTabNumber,u=e.sendSelected,d=e.saveToADL;return Object(ne.jsxs)(J.a,{className:Object(S.a)(t.root,Object(k.a)({},t.highlight,a>0)),children:[a>0?Object(ne.jsxs)(O.a,{className:t.title,color:"inherit",variant:"subtitle1",component:"div",children:[a," selected"]}):Object(ne.jsxs)(O.a,{className:t.title,variant:"h6",id:"tableTitle",component:"div",children:[n,Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",style:{marginLeft:45,display:i?"":"none"},onClick:function(){return c(localStorage.getItem("file"))},children:Object(ne.jsx)(oe.a,{})}),Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",style:{display:i?"":"none",marginLeft:30},onClick:o,children:"Download"}),Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",style:{display:i?"":"none",marginLeft:30},onClick:d,children:"Save to ADL"})]}),Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)(H.a,{title:"update",children:Object(ne.jsx)(E.a,{disabled:1!==a,children:Object(ne.jsx)(M.a,{onClick:function(){l(3),u(JSON.parse(s[0]))}})})}),Object(ne.jsx)(H.a,{title:"Delete",children:Object(ne.jsx)(E.a,{"aria-label":"delete",disabled:0===a,children:Object(ne.jsx)(q.a,{onClick:function(){return r(!0)}})})})]})]})},Oe=Object(p.a)((function(e){return{root:{width:"100%"},paper:{width:"100%",marginBottom:e.spacing(2)},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}}));function ye(){var e=Oe(),t=r.a.useState("asc"),a=Object(u.a)(t,2),n=a[0],c=a[1],s=r.a.useState("calories"),i=Object(u.a)(s,2),d=i[0],b=i[1],j=r.a.useState([]),m=Object(u.a)(j,2),p=m[0],h=m[1],f=r.a.useState(0),x=Object(u.a)(f,2),g=x[0],O=x[1],y=r.a.useState(!1),k=Object(u.a)(y,2),S=k[0],C=k[1],A=r.a.useState(10),I=Object(u.a)(A,2),J=I[0],E=I[1],H=r.a.useState(!1),U=Object(u.a)(H,2),q=U[0],W=U[1],M=Object(V.a)(),Z=r.a.useContext(_e),Y=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z.setLoading(!0),e.prev=1,e.next=4,fetch(G+"dl/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file"),container:Z.container,adlfilepath:Z.url})});case 4:return t=e.sent,e.next=7,t.json();case 7:if(a=e.sent,console.log(a),"success"!==a.status){e.next=13;break}ae.a.fire({icon:a.status,title:a.message,showConfirmButton:!1,timer:2e3}),e.next=15;break;case 13:return Z.setLoading(!1),e.abrupt("return",ae.a.fire({icon:"error",title:"You can't save to the data lake ! Check for errors !",showConfirmButton:!1,timer:2e3}));case 15:Z.setData([]),Z.setBtnActive(!1),Z.setColumns([]),Z.setName("No Data !"),e.next=24;break;case 21:e.prev=21,e.t0=e.catch(1),ae.a.fire({icon:"error",title:e.t0,showConfirmButton:!1,timer:2e3});case 24:Z.setLoading(!1);case 25:case"end":return e.stop()}}),e,null,[[1,21]])})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(l.a)(o.a.mark((function e(t){var a,n,r,c,s,i,l,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=JSON.parse(t),r=[],c=[],s=Object.keys(n),i=Object.values(n),l=0;l<s.length;l++)null===i[l]||void 0===i[l]?console.log("ok"):!1===Z.schema[s[l]].includes("Array")&&(r.push(s[l]+""),c.push(i[l]+""),console.log(r[l]+":"+c[l]));return console.log(JSON.stringify({filename:localStorage.getItem("file"),selector:r,selectorValue:c,many:!1})),e.next=9,fetch(G,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file"),selector:r,selectorValue:c,many:!1})});case 9:return u=e.sent,e.next=12,u.json();case 12:return a=e.sent,e.abrupt("return",a);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z.setLoading(!0),e.next=3,fetch(G+"download",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file")})});case 3:return t=e.sent,e.next=6,t.blob();case 6:return a=e.sent,console.log(a),n=window.URL.createObjectURL(a),(r=document.createElement("a")).href=n,r.setAttribute("download","result.zip"),r.click(),e.next=15,fetch(G+"clean",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file")})});case 15:Z.setData([]),Z.setBtnActive(!1),Z.setColumns([]),Z.setName("No Data !"),Z.setLoading(!1);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,r,c,s,i,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[],Z.setLoading(!0),a=Object(v.a)(p),e.prev=3,a.s();case 5:if((n=a.n()).done){e.next=13;break}return r=n.value,e.next=9,K(r);case 9:c=e.sent,t.push(c);case 11:e.next=5;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:s=0,i=t;case 22:if(!(s<i.length)){e.next=30;break}if("success"===(l=i[s])[0].status){e.next=27;break}return ae.a.fire({icon:l[0].status,title:l[0].message}),e.abrupt("break",30);case 27:s++,e.next=22;break;case 30:ae.a.fire({icon:t[0][0].status,title:t[0][0].message,showConfirmButton:!1,timer:2e3}),h([]),Z.getData(localStorage.getItem("file")),Z.setLoading(!1);case 34:case"end":return e.stop()}}),e,null,[[3,15,18,21]])})));return function(){return e.apply(this,arguments)}}();return Object(ne.jsxs)("div",{className:e.root,children:[Object(ne.jsx)(se,{}),Object(ne.jsxs)(P.a,{className:e.paper,children:[Object(ne.jsx)(ge,{numSelected:p.length,name:Z.name,selected:p,setOpen:W,getData:Z.getData,history:M,btnActive:Z.btnActive,downloadParquetFile:Q,setTabNumber:Z.setTabNumber,sendSelected:Z.setSelected,saveToADL:Y}),Object(ne.jsx)(D.a,{style:{maxHeight:500},children:Object(ne.jsxs)(N.a,{stickyHeader:!0,className:e.table,"aria-labelledby":"tableTitle",size:S?"small":"medium","aria-label":"enhanced table",children:[Object(ne.jsx)(fe,{classes:e,numSelected:p.length,order:n,orderBy:d,onSelectAllClick:function(e){if(e.target.checked){var t=Z.data.map((function(e){return JSON.stringify(e)}));h(t)}else h([])},onRequestSort:function(e,t){c(d===t&&"asc"===n?"desc":"asc"),b(t)},rowCount:Z.data.length,columns:Z.columns}),Object(ne.jsx)(T.a,{children:he(Z.data,pe(n,d)).slice(g*J,g*J+J).map((function(e,t){var a,n=(a=JSON.stringify(e),-1!==p.indexOf(a)),r="enhanced-table-checkbox-".concat(t);return Object(ne.jsxs)(B.a,{hover:!0,onClick:function(t){return function(e,t){var a=p.indexOf(t),n=[];-1===a?n=n.concat(p,t):0===a?n=n.concat(p.slice(1)):a===p.length-1?n=n.concat(p.slice(0,-1)):a>0&&(n=n.concat(p.slice(0,a),p.slice(a+1))),h(n)}(0,JSON.stringify(e))},role:"checkbox","aria-checked":n,tabIndex:-1,selected:n,children:[Object(ne.jsx)(w.a,{padding:"checkbox",children:Object(ne.jsx)(F.a,{checked:n,color:"primary",inputProps:{"aria-labelledby":r}})}),Object.keys(Z.data[0]).map((function(t,a){return Object(ne.jsx)(w.a,{align:"left",children:"object"==typeof e[t]?JSON.stringify(e[t]):e[t].toString()},a)}))]},t)}))})]})}),Object(ne.jsx)(L.a,{rowsPerPageOptions:[5],component:"div",count:Z.data.length,rowsPerPage:J,page:g,onPageChange:function(e,t){O(t)},onRowsPerPageChange:function(e){E(parseInt(e.target.value,10)),O(0)}})]}),Object(ne.jsx)(R.a,{control:Object(ne.jsx)(z.a,{checked:S,onChange:function(e){C(e.target.checked)},color:"primary"}),label:"Dense padding"}),q&&Object(ne.jsx)(je,{open:q,setOpen:W,data:p,deleteData:X})]})}var ve=Object(p.a)({table:{width:"100%"},tableWrapper:{width:"50%",margin:"20px auto",maxHeight:500}});function ke(){var e=ve(),t=r.a.useContext(_e);return Object(ne.jsx)(D.a,{className:e.tableWrapper,component:P.a,children:Object(ne.jsxs)(N.a,{stickyHeader:!0,className:e.table,"aria-label":"simple table",children:[Object(ne.jsx)(A.a,{children:Object(ne.jsxs)(B.a,{children:[Object(ne.jsx)(w.a,{children:"Columns"}),Object(ne.jsx)(w.a,{align:"center",children:"Types"})]})}),Object(ne.jsx)(T.a,{children:Object.keys(t.schema).map((function(e,a){return Object(ne.jsxs)(B.a,{children:[Object(ne.jsx)(w.a,{component:"th",scope:"row",children:e}),Object(ne.jsx)(w.a,{align:"center",children:Object.values(t.schema)[a]})]},e.name)}))})]})})}a(177);var Se=a(260),Ce=a(264),Ne=a(236),Te=a(253),we=Object(p.a)((function(e){return{formControl:{width:"100%"},selectEmpty:{marginTop:e.spacing(2)}}}));var De=function(){var e=we(),t=r.a.useState(""),a=Object(u.a)(t,2),n=a[0],c=a[1],s=r.a.useState(""),i=Object(u.a)(s,2),d=i[0],b=i[1],j=r.a.useState(""),m=Object(u.a)(j,2),p=m[0],h=m[1],f=r.a.useState(""),x=Object(u.a)(f,2),g=x[0],O=x[1],y=r.a.useState(!1),v=Object(u.a)(y,2),k=v[0],S=v[1],C=r.a.useContext(_e),N=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(C.setLoading(!0),c=p,"not a boolean"!==(t="Integer"===d?parseInt(c):"Double"===d?parseFloat(c):"Boolean"===d?"false"!==c.toLowerCase()&&("true"===c.toLowerCase()||"not a boolean"):"Array"===d?"Integer"===g?c.split(",").map((function(e){return parseInt(e)})):"Double"===g?c.split(",").map((function(e){return parseFloat(e)})):"Boolean"===g?"false"===c.toLowerCase()||"true"===c.toLowerCase()?c.split(",").map((function(e){return!1})):"not a boolean":c.split(","):c)){e.next=7;break}return C.setLoading(!1),e.abrupt("return",ae.a.fire({icon:"error",title:"Boolean values should be 'true' or 'false'"}));case 7:if(!isNaN(t)||"Array"===d||"String"===d){e.next=10;break}return C.setLoading(!1),e.abrupt("return",ae.a.fire({icon:"error",title:"Make sure you add a numerical value to the default value"}));case 10:return e.next=12,fetch(G+"col",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file"),col:n,default:t,valueType:g})});case 12:return a=e.sent,e.next=15,a.json();case 15:r=e.sent,200===a.status?(C.getData(localStorage.getItem("file")),C.getSchema(),ae.a.fire({icon:r[0].status,title:r[0].message,showConfirmButton:!1,timer:2e3}),C.setTabNumber(0)):ae.a.fire({icon:r[0].status,title:r[0].message}),C.setLoading(!1);case 18:case"end":return e.stop()}var c}),e)})));return function(){return e.apply(this,arguments)}}();return Object(ne.jsx)(P.a,{elevation:3,className:"paper",children:Object(ne.jsxs)("center",{children:[Object(ne.jsx)("h1",{className:"title",children:"Add a column"}),Object(ne.jsxs)("div",{className:"holder",children:[Object(ne.jsx)(ee.a,{className:"textfield",id:"colnameadd",label:"Column Name",value:n,onChange:function(e){return c(e.target.value)}}),Object(ne.jsx)("br",{}),Object(ne.jsxs)(Ne.a,{className:e.formControl,children:[Object(ne.jsx)(Se.a,{id:"demo-simple-select-label",children:"Type"}),Object(ne.jsx)(Te.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:d,onChange:function(e){b(e.target.value),"Array"===e.target.value?S(!0):S(!1)},children:["Integer","Double","String","Array","Boolean"].map((function(e){return Object(ne.jsx)(Ce.a,{value:e,children:e})}))})]}),Object(ne.jsxs)(Ne.a,{className:e.formControl,style:{display:!0===k?"flex":"none"},children:[Object(ne.jsx)(Se.a,{id:"demo-simple-select-label",children:"Array Type"}),Object(ne.jsx)(Te.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:g,onChange:function(e){return O(e.target.value)},children:["Integer","Double","String","Boolean"].map((function(e){return Object(ne.jsx)(Ce.a,{value:e,children:e})}))})]}),Object(ne.jsx)(ee.a,{className:"textfield",id:"defaultval",label:"Default value",value:p,onChange:function(e){return h(e.target.value)}})]}),Object(ne.jsx)("div",{className:"buttons",children:Object(ne.jsx)(Z.a,{style:{marginLeft:30},variant:"contained",color:"primary",size:"large",onClick:N,disabled:""===d,children:"Add"})})]})})};a(178);var Ae=function(){var e=r.a.useState(""),t=Object(u.a)(e,2),a=t[0],n=t[1],c=r.a.useContext(_e),s=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ae.a.fire({title:"Do you confirm the deletion of the column ".concat(a," ?"),showDenyButton:!1,showCancelButton:!0,confirmButtonText:"Delete"}).then(function(){var e=Object(l.a)(o.a.mark((function e(t){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isConfirmed){e.next=10;break}return c.setLoading(!0),e.next=4,fetch(G+"col",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file"),col:a})});case 4:return n=e.sent,e.next=7,n.json();case 7:r=e.sent,200===n.status?(c.getData(localStorage.getItem("file")),c.getSchema(),ae.a.fire({icon:r[0].status,title:r[0].message,showConfirmButton:!1,timer:2e3}),c.setTabNumber(0)):ae.a.fire({icon:r[0].status,title:r[0].message}),c.setLoading(!1);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(ne.jsx)(P.a,{elevation:3,className:"paper",children:Object(ne.jsxs)("center",{children:[Object(ne.jsx)("h1",{className:"title",children:"Delete a column"}),Object(ne.jsx)(Te.a,{style:{width:"80%"},labelId:"demo-simple-select-label",id:"demo-simple-select",value:a,onChange:function(e){return n(e.target.value)},children:Object.keys(c.data[0]).map((function(e){return Object(ne.jsx)(Ce.a,{value:e,children:e})}))}),Object(ne.jsx)("div",{className:"buttons",children:Object(ne.jsx)(Z.a,{color:"primary",variant:"contained",size:"large",onClick:s,disabled:""===a,children:"Delete"})})]})})};var Le=function(){var e,t=r.a.useContext(_e),a={filename:localStorage.getItem("file")},n=Object(v.a)(t.columns);try{for(n.s();!(e=n.n()).done;){var c=e.value;a[c]=null}}catch(i){n.e(i)}finally{n.f()}var s=function(){var e=Object(l.a)(o.a.mark((function e(){var n,r,c,s,i,l,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=/[0-9]+-[0-9]+-[0-9]+[T* ][0-9]+:[0-9]+:[0-9]+Z*/,r=Object.values(a),c=Object.keys(a),console.log(r),s=1;case 5:if(!(s<r.length)){e.next=28;break}if("TimestampType"!==t.schema[c[s]]||n.test(r[s])||null==r[s]){e.next=10;break}return e.abrupt("return",ae.a.fire({icon:"error",title:c[s]+" : Timestamp format 'yyyy-mm-dd hh:mm:ss' "}));case 10:if(!isNaN(r[s])||"DoubleType"!==t.schema[c[s]]&&"IntegerType"!==t.schema[c[s]]){e.next=14;break}return e.abrupt("return",ae.a.fire({icon:"error",title:c[s]+": Make sure you add a numerical value to a numerical filed"}));case 14:if(!t.schema[c[s]].includes("Map")){e.next=24;break}e.prev=15,a[c[s]]=JSON.parse(a[c[s]]),e.next=22;break;case 19:return e.prev=19,e.t0=e.catch(15),e.abrupt("return",ae.a.fire({icon:"error",title:"Check if JSON data is in the right format"}));case 22:e.next=25;break;case 24:t.schema[c[s]].includes("ArrayType(String")?a[c[s]]=a[c[s]].split(","):t.schema[c[s]].includes("ArrayType(Integer")||t.schema[c[s]].includes("ArrayType(Long")?a[c[s]]=a[c[s]].split(",").map((function(e){return parseInt(e)})):(t.schema[c[s]].includes("ArrayType(Double")||t.schema[c[s]].includes("ArrayType(Float"))&&(a[c[s]]=a[c[s]].split(",").map((function(e){return parseFloat(e)+0})));case 25:s++,e.next=5;break;case 28:return t.setLoading(!0),e.prev=29,e.next=32,fetch(G,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 32:if(200!==(i=e.sent).status){e.next=40;break}return e.next=36,i.json();case 36:"success"===(l=e.sent)[0].status&&(ae.a.fire({icon:"success",title:l[0].message,showConfirmButton:!1,timer:2e3}),t.getData(localStorage.getItem("file")),t.setTabNumber(0)),e.next=45;break;case 40:if(400!==i.status){e.next=45;break}return e.next=43,i.json();case 43:"error"===(u=e.sent)[0].status&&ae.a.fire({icon:u[0].status,title:u[0].message});case 45:e.next=50;break;case 47:e.prev=47,e.t1=e.catch(29),ae.a.fire({icon:"error",title:e.t1});case 50:t.setLoading(!1);case 51:case"end":return e.stop()}}),e,null,[[15,19],[29,47]])})));return function(){return e.apply(this,arguments)}}();return Object(ne.jsxs)("div",{children:[Object(ne.jsx)(_.a,{container:!0,style:{padding:"0 100px"},children:t.columns.map((function(e){return Object(ne.jsx)(_.a,{item:!0,md:4,style:{marginTop:15},children:Object(ne.jsx)("center",{children:Object(ne.jsx)(ee.a,{className:"textfield1",label:e,onChange:function(n){return function(e,n){"IntegerType"===t.schema[n]||"LongType"===t.schema[n]?a[n]=parseInt(e.target.value):"DoubleType"===t.schema[n]||"FloatType"===t.schema[n]?a[n]=parseFloat(e.target.value)+0:""===e.target.value?a[n]=null:"TimestampType"===t.schema[n]?a[n]=e.target.value.replace("Z","").replace("T"," "):a[n]=e.target.value,console.log(a)}(n,e)}})})},e)}))}),Object(ne.jsx)("center",{style:{marginTop:50},children:Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",onClick:s,children:"Add"})})]})};var Be=function(){for(var e,t=r.a.useContext(_e),a=Object.keys(t.selected),n=Object.values(t.selected),c={},s=0;s<a.length;s++)JSON.stringify(n[s]).includes("{")&&"object"==typeof n[s]?(n[s]=JSON.stringify(n[s]),c[a[s]]=n[s]):c[a[s]]=n[s];console.log(c),e=document.getElementsByClassName("fields"),r.a.useEffect((function(){for(var t=0;t<n.length;t++)e[t].getElementsByTagName("input")[0].value=n[t]}),[e]);var i=function(){var r=Object(l.a)(o.a.mark((function r(){var s,i,l,u,d,b;return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:t.setLoading(!0),c.filename=localStorage.getItem("file"),s=[],i=[],l=0;case 5:if(!(l<n.length)){r.next=33;break}if(null!==n[l]&&void 0!==n[l]){r.next=9;break}r.next=30;break;case 9:if(r.prev=9,"TimestampType"!==t.schema[a[l]]){r.next=18;break}if(/[0-9]+-[0-9]+-[0-9]+[T* ][0-9]+:[0-9]+:[0-9]+Z*/.test(c[a[l]])){r.next=15;break}return t.setLoading(!1),r.abrupt("return",ae.a.fire({icon:"error",title:a[l]+" : Timestamp format 'yyyy-mm-dd hh:mm:ss' "}));case 15:c[a[l]]=c[a[l]].replaceAll("T"," ").replaceAll("Z",""),r.next=19;break;case 18:"DoubleType"===t.schema[a[l]]||"FloatType"===t.schema[a[l]]?c[a[l]]=parseFloat(c[a[l]])+0:"IntegerType"===t.schema[a[l]]||"LongType"===t.schema[a[l]]?c[a[l]]=parseInt(c[a[l]]):t.schema[a[l]].includes("ArrayType(String")&&"object"!==typeof c[a[l]]?c[a[l]]=c[a[l]].split(","):(t.schema[a[l]].includes("ArrayType(Integer")||t.schema[a[l]].includes("ArrayType(Long"))&&"object"!==typeof c[a[l]]?(console.log(c[a[l]]),c[a[l]]=c[a[l]].split(",").map((function(e){return parseInt(e)}))):(t.schema[a[l]].includes("ArrayType(Double")||t.schema[a[l]].includes("ArrayType(Float"))&&"object"!==typeof c[a[l]]?c[a[l]]=c[a[l]].split(",").map((function(e){return parseFloat(e)})):t.schema[a[l]].includes("Map")&&"object"!==typeof c[a[l]]&&(c[a[l]]=JSON.parse(c[a[l]]));case 19:if(t.schema[a[l]].includes("Array")||t.schema[a[l]].includes("Map")||(s.push(n[l]+""),i.push(a[l]+"")),!isNaN(c[a[l]])||"DoubleType"!==t.schema[a[l]]&&"IntegerType"!==t.schema[a[l]]&&"LongType"!==t.schema[a[l]]){r.next=24;break}for(t.setLoading(!1),u=0;u<n.length;u++)e[u].getElementsByTagName("input")[0].value=n[u];return r.abrupt("return",ae.a.fire({icon:"error",title:a[l]+": Make sure you add a numerical value to a numerical filed"}));case 24:r.next=30;break;case 26:return r.prev=26,r.t0=r.catch(9),t.setLoading(!1),r.abrupt("return",ae.a.fire({icon:"error",title:"Check the format of JSON data"}));case 30:l++,r.next=5;break;case 33:return c.selector=i,c.selectorValue=s,r.next=37,fetch(G,{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});case 37:return d=r.sent,r.next=40,d.json();case 40:b=r.sent,t.setLoading(!1),ae.a.fire({icon:b[0].status,title:b[0].message,showConfirmButton:!1,timer:2e3}),t.getData(localStorage.getItem("file")),t.setTabNumber(0),t.setSelected("");case 46:case"end":return r.stop()}}),r,null,[[9,26]])})));return function(){return r.apply(this,arguments)}}();return Object(ne.jsxs)("div",{children:[Object(ne.jsx)(_.a,{container:!0,style:{padding:"0 100px"},children:a.map((function(a,n){return Object(ne.jsx)(_.a,{item:!0,md:4,style:{marginTop:15},children:Object(ne.jsx)("center",{children:Object(ne.jsx)(ee.a,{className:"fields",label:a,onChange:function(r){!function(a,n,r){"IntegerType"===t.schema[r]||"LongType"===t.schema[r]?c[r]=parseInt(e[n].getElementsByTagName("input")[0].value):"DoubleType"===t.schema[r]||"FloatType"===t.schema[r]?c[r]=parseFloat(e[n].getElementsByTagName("input")[0].value)+0:""===e[n].getElementsByTagName("input")[0].value?c[r]=null:"TimestampType"===t.schema[r]?c[r]=e[n].getElementsByTagName("input")[0].value.replace("T"," ").replace("Z",""):c[r]=e[n].getElementsByTagName("input")[0].value,console.log(c)}(0,n,a)}})})},n)}))}),Object(ne.jsx)("center",{style:{marginTop:50},children:Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",onClick:i,children:"Update"})})]})},Ie=["children","value","index"];function Je(e){var t=e.children,a=e.value,n=e.index,r=Object(b.a)(e,Ie);return Object(ne.jsx)("div",Object(d.a)(Object(d.a)({role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},r),{},{children:a===n&&Object(ne.jsx)(y.a,{p:3,children:Object(ne.jsx)(O.a,{children:t})})}))}function Pe(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}var Fe=Object(p.a)((function(e){return{root:{backgroundColor:e.palette.background.paper,width:"100%"}}}));function Ee(){var e=Fe(),t=Object(h.a)(),a=r.a.useContext(_e);return Object(ne.jsxs)("div",{className:e.root,children:[Object(ne.jsx)(f.a,{position:"static",color:"default",children:Object(ne.jsxs)(x.a,{value:a.tabNumber,onChange:function(e,t){a.setTabNumber(t)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"full width tabs example",children:[Object(ne.jsx)(g.a,Object(d.a)({disabled:!a.btnActive,label:"Columns"},Pe(0))),Object(ne.jsx)(g.a,Object(d.a)({disabled:!a.btnActive,label:"Schema"},Pe(1))),Object(ne.jsx)(g.a,Object(d.a)({disabled:!a.btnActive,label:"Add"},Pe(2))),Object(ne.jsx)(g.a,Object(d.a)({disabled:!a.btnActive||a.disbaleUpdateBtn,label:"Update"},Pe(3))),Object(ne.jsx)(g.a,Object(d.a)({disabled:!a.btnActive,label:"Add Columns"},Pe(4))),Object(ne.jsx)(g.a,Object(d.a)({disabled:!a.btnActive,label:"Delete Columns"},Pe(5)))]})}),Object(ne.jsxs)(m.a,{axis:"rtl"===t.direction?"x-reverse":"x",index:a.tabNumber,onChangeIndex:function(e){a.setTabNumber(e)},children:[Object(ne.jsx)(Je,{value:a.tabNumber,index:0,dir:t.direction,children:Object(ne.jsx)(ye,{})}),Object(ne.jsx)(Je,{value:a.tabNumber,index:1,dir:t.direction,children:Object(ne.jsx)(ke,{})}),Object(ne.jsx)(Je,{value:a.tabNumber,index:2,dir:t.direction,children:Object(ne.jsx)(Le,{})}),Object(ne.jsx)(Je,{value:a.tabNumber,index:3,dir:t.direction,children:Object(ne.jsx)(Be,{})}),Object(ne.jsx)(Je,{value:a.tabNumber,index:4,dir:t.direction,children:Object(ne.jsx)(De,{})}),Object(ne.jsx)(Je,{value:a.tabNumber,index:5,dir:t.direction,children:Object(ne.jsx)(Ae,{})})]})]})}var He=a(114),Re=a.n(He),ze=Object(p.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function Ue(){var e=ze();return Object(ne.jsx)("div",{className:e.root,children:Object(ne.jsx)(f.a,{position:"sticky",children:Object(ne.jsxs)(J.a,{children:[Object(ne.jsx)(O.a,{variant:"h6",className:e.title,children:"Parquet File Manager"}),Object(ne.jsx)(E.a,{edge:"end",className:e.menuButton,color:"inherit","aria-label":"menu",children:Object(ne.jsx)(Re.a,{})})]})})})}var qe=a(256),We=a(265);a(179);function Me(){var e=r.a.useContext(_e),t=Object(n.useState)("local"),a=Object(u.a)(t,2),c=a[0],s=a[1],i=Object(n.useRef)(null),d=function(){var t=Object(l.a)(o.a.mark((function t(){var a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setLoading(!0),t.next=3,fetch(G+"dl",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({container:e.container,adlfilepath:e.url})});case 3:return a=t.sent,t.next=6,a.json();case 6:if(n=t.sent,console.log(n),"error"===n.status||200!==a.status){t.next=20;break}return localStorage.setItem("file",n.filename),t.next=12,e.setData(n.data);case 12:return t.next=14,e.getSchema();case 14:e.setColumns(Object.keys(n.data[0])),e.setBtnActive(!0),e.setName("Data from datalake"),ae.a.fire({position:"center",icon:"success",title:"Data fetched successfully from the Datalake",showConfirmButton:!1,timer:2e3}),t.next=21;break;case 20:ae.a.fire({position:"center",icon:n.status,title:n.message,showConfirmButton:!1,timer:2e3});case 21:e.setLoading(!1);case 22:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),b=function(){var t=Object(l.a)(o.a.mark((function t(a){var n,r,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.setLoading(!0),(n=new FormData).append("file",a.target.files[0]),t.next=6,fetch(G+"upload",{method:"POST",body:n});case 6:return r=t.sent,t.next=9,r.json();case 9:return c=t.sent,localStorage.setItem("file",c.filename),t.next=13,e.getData(c.filename);case 13:return t.next=15,e.getSchema();case 15:e.setName(a.target.files[0].name),ae.a.fire({position:"center",icon:"success",title:"The file is uplaoded successfully",showConfirmButton:!1,timer:2e3}),t.next=22;break;case 19:t.prev=19,t.t0=t.catch(0),ae.a.fire({position:"center",icon:"error",title:t.t0,showConfirmButton:!1,timer:2e3});case 22:e.setLoading(!1);case 23:case"end":return t.stop()}}),t,null,[[0,19]])})));return function(e){return t.apply(this,arguments)}}();return Object(ne.jsxs)(_.a,{className:"wrapper",container:!0,justifyContent:"space-around",children:[Object(ne.jsx)("input",{type:"file",onChange:b,ref:i,name:"",id:"",style:{display:"none"}}),Object(ne.jsx)(_.a,{item:!0,children:Object(ne.jsx)(Ne.a,{component:"fieldset",disabled:e.btnActive,children:Object(ne.jsxs)(We.a,{row:!0,"aria-label":"method",name:"method",value:c,onChange:function(e){s(e.target.value)},children:[Object(ne.jsx)(R.a,{value:"local",control:Object(ne.jsx)(qe.a,{color:"primary"}),label:"Local"}),Object(ne.jsx)(R.a,{value:"azure",control:Object(ne.jsx)(qe.a,{color:"primary"}),label:"Azure"})]})})}),Object(ne.jsx)(_.a,{item:!0,children:"local"===c?Object(ne.jsx)(Z.a,{className:"loadButton",variant:"contained",disabled:e.btnActive,color:"primary",onClick:function(){return i.current.click()},children:"Load File"}):Object(ne.jsxs)("div",{style:{display:"flex"},children:[Object(ne.jsx)(ee.a,{className:"urlField",fullWidth:!0,label:"Container of the datalake",variant:"outlined",disabled:e.btnActive,value:e.container,onChange:function(t){return e.setContainer(t.target.value)}}),Object(ne.jsx)(ee.a,{className:"urlField",fullWidth:!0,label:"Url of the azure datalake file",variant:"outlined",value:e.url,disabled:e.btnActive,onChange:function(t){return e.setUrl(t.target.value)}}),Object(ne.jsx)(Z.a,{variant:"contained",color:"primary",onClick:d,disabled:e.btnActive,children:"Read"})]})})]})}var Ze,Ve=function(){return Object(ne.jsxs)("div",{children:[Object(ne.jsx)(Ue,{}),Object(ne.jsx)("br",{}),Object(ne.jsx)(Me,{}),Object(ne.jsx)("br",{})]})},Ge=a(115),Ye=a(89),Ke=a(116),Qe=a.n(Ke),Xe=(a(180),Object(Ye.css)(Ze||(Ze=Object(Ge.a)(["\n  display: block;\n  margin: 0 auto;\n  border-color: blue;\n"]))));var $e=function(e){var t=e.loading;return Object(ne.jsx)("div",{className:"spinner-wrapper",style:{display:t?"flex":"none"},children:Object(ne.jsx)(Qe.a,{color:"blue",loading:t,css:Xe,size:150})})},_e=r.a.createContext(null);var et=function(){var e=r.a.useState([]),t=Object(u.a)(e,2),a=t[0],n=t[1],c=r.a.useState({}),s=Object(u.a)(c,2),i=s[0],d=s[1],b=r.a.useState([]),j=Object(u.a)(b,2),m=j[0],p=j[1],h=r.a.useState("No Data !"),f=Object(u.a)(h,2),x=f[0],g=f[1],O=r.a.useState(!1),y=Object(u.a)(O,2),v=y[0],k=y[1],S=r.a.useState(!1),C=Object(u.a)(S,2),N=C[0],T=C[1],w=r.a.useState(0),D=Object(u.a)(w,2),A=D[0],L=D[1],B=r.a.useState(""),I=Object(u.a)(B,2),J=I[0],P=I[1],F=r.a.useState(!0),E=Object(u.a)(F,2),H=E[0],R=E[1],z=r.a.useState(""),U=Object(u.a)(z,2),q=U[0],W=U[1],M=r.a.useState(""),Z=Object(u.a)(M,2),V=Z[0],Y=Z[1],K=function(){var e=Object(l.a)(o.a.mark((function e(t){var a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(G+"all",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:t})});case 2:return a=e.sent,e.next=5,a.json();case 5:if(r=e.sent,n(r),console.log(r),0!==r.length){e.next=10;break}return e.abrupt("return",alert("all data are deleted"));case 10:p(Object.keys(r[0])),k(!0);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(l.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(G+"schema",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filename:localStorage.getItem("file")})});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,X.setSchema(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X={data:a,setData:n,schema:i,setSchema:d,setColumns:p,columns:m,name:x,setName:g,btnActive:v,setBtnActive:k,getData:K,getSchema:Q,setLoading:T,tabNumber:A,setTabNumber:L,selected:J,setSelected:P,disbaleUpdateBtn:H,setDisabledUpdatedBtn:R,container:q,setContainer:W,url:V,setUrl:Y};return Object(ne.jsxs)(_e.Provider,{value:X,children:[Object(ne.jsx)($e,{loading:N}),Object(ne.jsx)(Ve,{}),Object(ne.jsx)(Ee,{})]})},tt=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,269)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))};s.a.render(Object(ne.jsx)(ne.Fragment,{children:Object(ne.jsx)(et,{})}),document.getElementById("root")),tt()}},[[186,1,2]]]);
//# sourceMappingURL=main.9f2009e3.chunk.js.map