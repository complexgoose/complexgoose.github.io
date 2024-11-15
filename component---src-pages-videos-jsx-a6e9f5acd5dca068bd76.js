"use strict";(self.webpackChunkjstro_io=self.webpackChunkjstro_io||[]).push([[41],{8192:function(e,t,n){n.r(t),n.d(t,{default:function(){return B}});var r=n(6540),i=n(8697),o=n(4675),a=n(9067),s=n(4155),c=n(4073),l=n(8587),p=n(8168),u=n(4164),m=n(9452),d=n(9599),f=n(5659),g=n(1848),w=n(5669);var b=r.createContext(),h=n(8413),x=n(1609);function v(e){return(0,x.Ay)("MuiGrid",e)}const $=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];var k=(0,h.A)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map((e=>`spacing-xs-${e}`)),...["column-reverse","column","row-reverse","row"].map((e=>`direction-xs-${e}`)),...["nowrap","wrap-reverse","wrap"].map((e=>`wrap-xs-${e}`)),...$.map((e=>`grid-xs-${e}`)),...$.map((e=>`grid-sm-${e}`)),...$.map((e=>`grid-md-${e}`)),...$.map((e=>`grid-lg-${e}`)),...$.map((e=>`grid-xl-${e}`))]),S=n(4848);const N=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function W(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function y({breakpoints:e,values:t}){let n="";Object.keys(t).forEach((e=>{""===n&&0!==t[e]&&(n=e)}));const r=Object.keys(e).sort(((t,n)=>e[t]-e[n]));return r.slice(0,r.indexOf(n))}const A=(0,g.Ay)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:r,direction:i,item:o,spacing:a,wrap:s,zeroMinWidth:c,breakpoints:l}=n;let p=[];r&&(p=function(e,t,n={}){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[n[`spacing-xs-${String(e)}`]];const r=[];return t.forEach((t=>{const i=e[t];Number(i)>0&&r.push(n[`spacing-${t}-${String(i)}`])})),r}(a,l,t));const u=[];return l.forEach((e=>{const r=n[e];r&&u.push(t[`grid-${e}-${String(r)}`])})),[t.root,r&&t.container,o&&t.item,c&&t.zeroMinWidth,...p,"row"!==i&&t[`direction-xs-${String(i)}`],"wrap"!==s&&t[`wrap-xs-${String(s)}`],...u]}})((({ownerState:e})=>(0,p.A)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap})),(function({theme:e,ownerState:t}){const n=(0,m.kW)({values:t.direction,breakpoints:e.breakpoints.values});return(0,m.NI)({theme:e},n,(e=>{const t={flexDirection:e};return 0===e.indexOf("column")&&(t[`& > .${k.item}`]={maxWidth:"none"}),t}))}),(function({theme:e,ownerState:t}){const{container:n,rowSpacing:r}=t;let i={};if(n&&0!==r){const t=(0,m.kW)({values:r,breakpoints:e.breakpoints.values});let n;"object"==typeof t&&(n=y({breakpoints:e.breakpoints.values,values:t})),i=(0,m.NI)({theme:e},t,((t,r)=>{var i;const o=e.spacing(t);return"0px"!==o?{marginTop:`-${W(o)}`,[`& > .${k.item}`]:{paddingTop:W(o)}}:null!=(i=n)&&i.includes(r)?{}:{marginTop:0,[`& > .${k.item}`]:{paddingTop:0}}}))}return i}),(function({theme:e,ownerState:t}){const{container:n,columnSpacing:r}=t;let i={};if(n&&0!==r){const t=(0,m.kW)({values:r,breakpoints:e.breakpoints.values});let n;"object"==typeof t&&(n=y({breakpoints:e.breakpoints.values,values:t})),i=(0,m.NI)({theme:e},t,((t,r)=>{var i;const o=e.spacing(t);return"0px"!==o?{width:`calc(100% + ${W(o)})`,marginLeft:`-${W(o)}`,[`& > .${k.item}`]:{paddingLeft:W(o)}}:null!=(i=n)&&i.includes(r)?{}:{width:"100%",marginLeft:0,[`& > .${k.item}`]:{paddingLeft:0}}}))}return i}),(function({theme:e,ownerState:t}){let n;return e.breakpoints.keys.reduce(((r,i)=>{let o={};if(t[i]&&(n=t[i]),!n)return r;if(!0===n)o={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===n)o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const a=(0,m.kW)({values:t.columns,breakpoints:e.breakpoints.values}),s="object"==typeof a?a[i]:a;if(null==s)return r;const c=Math.round(n/s*1e8)/1e6+"%";let l={};if(t.container&&t.item&&0!==t.columnSpacing){const n=e.spacing(t.columnSpacing);if("0px"!==n){const e=`calc(${c} + ${W(n)})`;l={flexBasis:e,maxWidth:e}}}o=(0,p.A)({flexBasis:c,flexGrow:0,maxWidth:c},l)}return 0===e.breakpoints.values[i]?Object.assign(r,o):r[e.breakpoints.up(i)]=o,r}),{})}));const E=e=>{const{classes:t,container:n,direction:r,item:i,spacing:o,wrap:a,zeroMinWidth:s,breakpoints:c}=e;let l=[];n&&(l=function(e,t){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[`spacing-xs-${String(e)}`];const n=[];return t.forEach((t=>{const r=e[t];if(Number(r)>0){const e=`spacing-${t}-${String(r)}`;n.push(e)}})),n}(o,c));const p=[];c.forEach((t=>{const n=e[t];n&&p.push(`grid-${t}-${String(n)}`)}));const u={root:["root",n&&"container",i&&"item",s&&"zeroMinWidth",...l,"row"!==r&&`direction-xs-${String(r)}`,"wrap"!==a&&`wrap-xs-${String(a)}`,...p]};return(0,f.A)(u,v,t)},M=r.forwardRef((function(e,t){const n=(0,w.b)({props:e,name:"MuiGrid"}),{breakpoints:i}=(0,o.A)(),a=(0,d.A)(n),{className:s,columns:c,columnSpacing:m,component:f="div",container:g=!1,direction:h="row",item:x=!1,rowSpacing:v,spacing:$=0,wrap:k="wrap",zeroMinWidth:W=!1}=a,y=(0,l.A)(a,N),M=v||$,j=m||$,z=r.useContext(b),G=g?c||12:z,T={},C=(0,p.A)({},y);i.keys.forEach((e=>{null!=y[e]&&(T[e]=y[e],delete C[e])}));const B=(0,p.A)({},a,{columns:G,container:g,direction:h,item:x,rowSpacing:M,columnSpacing:j,wrap:k,zeroMinWidth:W,spacing:$},T,{breakpoints:i.keys}),I=E(B);return(0,S.jsx)(b.Provider,{value:G,children:(0,S.jsx)(A,(0,p.A)({ownerState:B,className:(0,u.A)(I.root,s),as:f,ref:t},C))})}));var j=M,z=n(4977);var G=e=>{let{video:t}=e;return r.createElement(z.A,{className:"EmbedCard VideoCard"},r.createElement("iframe",{className:"Embed",src:`https://www.youtube.com/embed/${t}`,title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0}))};const T=["U0YMazTRb_I","RiJYQp1-wdQ","jLxmaGGeulg"];var C=()=>{(0,o.A)();return r.createElement(a.A,{className:"Videos"},r.createElement(s.A,{className:"Section",elevation:24},r.createElement(c.A,{className:"SectionTitle",variant:"h2",gutterBottom:!0},"Videos"),r.createElement(j,{container:!0,spacing:5,className:"VideoGrid"},T.map((e=>r.createElement(j,{className:"VideoGridItem",item:!0,xs:"12"},r.createElement(G,{video:e})))))))};var B=()=>r.createElement(i.A,null,r.createElement(C,null))}}]);
//# sourceMappingURL=component---src-pages-videos-jsx-a6e9f5acd5dca068bd76.js.map