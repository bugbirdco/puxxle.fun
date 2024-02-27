import{r as ref,c as computed,w as watchEffect,o as onMounted,a as openBlock,b as createElementBlock,F as Fragment,d as renderList,e as createBaseVNode,n as normalizeStyle,f as createCommentVNode,g as defineComponent,u as useAppStore,h as onBeforeMount,i as createBlock,j as unref,k as withDirectives,v as vModelText,l as withKeys,m as normalizeClass,t as toDisplayString}from"./index-BTEEBfWs.js";const ROTATION_SPEED_MIN=200,ROTATION_SPEED_MAX=800,CRAZY_PARTICLES_FREQUENCY=.1,CRAZY_PARTICLE_CRAZINESS=.3,BEZIER_MEDIAN=.5,FORCE=.5,SIZE=12,FLOOR_HEIGHT=800,FLOOR_WIDTH=1600,PARTICLE_COUNT=150,DURATION=3500,COLORS=["#FFC700","#FF0000","#2E3191","#41BBC7"];var script={props:{particleCount:{type:Number,default:PARTICLE_COUNT},particleSize:{type:Number,default:SIZE},duration:{type:Number,default:DURATION},colors:{type:Array,default:COLORS},force:{type:Number,default:FORCE},stageHeight:{type:Number,default:FLOOR_HEIGHT},stageWidth:{type:Number,default:FLOOR_WIDTH},shouldDestroyAfterDone:{type:Boolean,default:!0}},setup(e){const n=ref(!0),i=(t,a)=>{k(t,{degree:a})},r=computed(()=>N(e.particleCount,e.colors));watchEffect(()=>{e.particleCount>300&&console.log("[VUE-CONFETTI-EXPLOSION] That's a lot of confetti, you sure about that? A lesser number like 200 will still give off the party vibes while still not bricking the device 😉")});const l=computed(()=>R(e.particleCount,e.duration,e.colors,e.particleSize,e.force,e.stageHeight,e.stageWidth));onMounted(async()=>{await E(e.duration),e.shouldDestroyAfterDone&&(n.value=!1)});const N=(t,a)=>{const o=360/t;return Array.from({length:t},(d,c)=>({color:a[c%a.length],degree:c*o}))},E=t=>new Promise(a=>setTimeout(a,t));function f(t){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return Math.round((t+Number.EPSILON)*10**a)/10**a}function g(t,a){if(t===a)return!0;if(t==null||a==null||t.length!==a.length)return!1;for(let o=0;o<t.length;o++)if(t[o]!==a[o])return!1;return!0}const y=(t,a,o,d,c)=>(t-a)*(c-d)/(o-a)+d,B=(t,a)=>{const o=t+a;return o>360?o-360:o},I=()=>Math.random()>.5,S=[0,0,1],b=[[1,1,0],[1,0,1],[0,1,1],[1,0,0],[0,1,0],S],A=t=>!g(b[t],S)&&I(),m=t=>typeof t>"u",p=t=>{console.error(t)};function R(t,a,o,d,c,h,_){const u=Number.isSafeInteger;return!m(t)&&u(t)&&t<0?(p("particleCount must be a positive integer"),!1):!m(a)&&u(a)&&a<0?(p("duration must be a positive integer"),!1):!m(o)&&!Array.isArray(o)?(p("colors must be an array of strings"),!1):!m(d)&&u(d)&&d<0?(p("particleSize must be a positive integer"),!1):!m(c)&&u(c)&&(c<0||c>1)?(p("force must be a positive integer and should be within 0 and 1"),!1):!m(h)&&typeof h=="number"&&u(h)&&h<0?(p("floorHeight must be a positive integer"),!1):!m(_)&&typeof _=="number"&&u(_)&&_<0?(p("floorWidth must be a positive integer"),!1):!0}function k(t,a){let{degree:o}=a;const d=y(Math.abs(B(o,90)-180),0,180,-e.stageWidth/2,e.stageWidth/2),c=Math.random()*(ROTATION_SPEED_MAX-ROTATION_SPEED_MIN)+ROTATION_SPEED_MIN,h=Math.round(Math.random()*(b.length-1)),_=e.duration-Math.round(Math.random()*1e3),u=Math.random()<CRAZY_PARTICLES_FREQUENCY,x=A(h),C=u?f(Math.random()*CRAZY_PARTICLE_CRAZINESS,2):0,M=C*-1,O=C,T=f(Math.abs(y(Math.abs(B(o,90)-180),0,180,-1,1)),4),w=f(Math.random()*BEZIER_MEDIAN,4),z=f(Math.random()*e.force*(I()?1:-1),4),D=BEZIER_MEDIAN,F=f(Math.max(y(Math.abs(o-180),0,180,e.force,-e.force),0),4),s=(V,L)=>t==null?void 0:t.style.setProperty(V,L+"");s("--x-landing-point",`${d}px`),s("--duration-chaos",`${_}ms`),s("--x1",`${C}`),s("--x2",`${M}`),s("--x3",`${O}`),s("--x4",`${T}`),s("--y1",`${w}`),s("--y2",`${z}`),s("--y3",`${D}`),s("--y4",`${F}`),s("--width",`${x?e.particleSize:Math.round(Math.random()*4)+e.particleSize/2}px`),s("--height",(x?e.particleSize:Math.round(Math.random()*2)+e.particleSize)+"px"),s("--rotation",`${b[h].join()}`),s("--rotation-duration",`${c}ms`),s("--border-radius",`${x?"50%":"0"}`)}return{isVisible:n,isValid:l,stageHeight:e.stageHeight,particles:r,setItemRef:i}}};function render(e,n,i,r,l,N){return r.isVisible&&r.isValid?(openBlock(),createElementBlock("div",{key:0,class:"confetti-container",style:normalizeStyle(`--floor-height: ${r.stageHeight}px;`)},[(openBlock(!0),createElementBlock(Fragment,null,renderList(r.particles,E=>{let{color:f,degree:g}=E;return openBlock(),createElementBlock("div",{key:g,class:"particle",ref:y=>r.setItemRef(y,g)},[createBaseVNode("div",{style:normalizeStyle(`--bgcolor: ${f};`)},null,4)],512)}),128))],4)):createCommentVNode("",!0)}function styleInject(e,n){n===void 0&&(n={});var i=n.insertAt;if(!(!e||typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css",i==="top"&&r.firstChild?r.insertBefore(l,r.firstChild):r.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}var css_248z=`
@keyframes y-axis-4ff796ae {
to {
    transform: translate3d(0, var(--floor-height), 0);
}
}
@keyframes x-axis-4ff796ae {
to {
    transform: translate3d(var(--x-landing-point), 0, 0);
}
}
@keyframes rotation-4ff796ae {
to {
    transform: rotate3d(var(--rotation), 360deg);
}
}
.confetti-container[data-v-4ff796ae] {
  width: 0;
  height: 0;
  overflow: visible;
  position: relative;
  transform: translate3d(var(--x, 0), var(--y, 0), 0);
  z-index: 1200;
}
.confetti-container > .particle[data-v-4ff796ae] {
  animation: x-axis-4ff796ae var(--duration-chaos) forwards cubic-bezier(var(--x1), var(--x2), var(--x3), var(--x4));
}
.confetti-container > .particle div[data-v-4ff796ae] {
  position: absolute;
  top: 0;
  left: 0;
  animation: y-axis-4ff796ae var(--duration-chaos) forwards cubic-bezier(var(--y1), var(--y2), var(--y3), var(--y4));
  width: var(--width);
  height: var(--height);
}
.confetti-container > .particle div[data-v-4ff796ae]:before {
  display: block;
  height: 100%;
  width: 100%;
  content: "";
  background-color: var(--bgcolor);
  animation: rotation-4ff796ae var(--rotation-duration) infinite linear;
  border-radius: var(--border-radius);
}
`;styleInject(css_248z);script.render=render;script.__scopeId="data-v-4ff796ae";var entry_esm=(()=>{const e=script;return e.install=n=>{n.component("ConfettiExplosion",e)},e})();const _hoisted_1={class:"mt-5"},_hoisted_2={class:"d-flex justify-content-center py-2 px-4"},_hoisted_3={class:"mx-4 px-3 mt-2"},_hoisted_4={class:"row g-2"},_hoisted_5={class:"col col-9 d-flex flex-column align-items-center"},_hoisted_6=["disabled"],_hoisted_7={class:"col"},_hoisted_8=["disabled"],_sfc_main=defineComponent({__name:"game",props:{edition:{}},setup(__props){const props=__props,appStore=useAppStore(),edition=ref(),input=ref(),prompt=ref("x"),attempts=ref([]),hasWon=ref(!1),attempt=computed(()=>{if(!edition.value||!input.value)return null;const transformed=input.value.map(v=>{try{let response=eval(`((x) => {
        return ${prompt.value}
      })
      (${JSON.stringify(v)})`);return response?response.toString().substring(0,3):""}catch(e){return console.error(e),null}});return edition.value.check(transformed.map(e=>e||"")).map((e,n)=>({value:transformed[n]||"",is_match:e=="valid",is_partial:e=="partial",is_invalid:transformed[n]==null}))}),lines=computed(()=>{if(!attempt.value)return[];if(hasWon.value)return attempts.value;const e={input:prompt.value,output:attempt.value,is_attempt:!1};return[...attempts.value,e]});onBeforeMount(()=>{(props.edition?appStore.universle.edition(props.edition):appStore.universle.latestEdition()).then(n=>{edition.value=n,input.value=n.payload.input,prompt.value=n.payload.prompt})});function itemClass(e,n){return e.is_attempt?{"is-match":n.is_match,"is-partial":!n.is_match&&n.is_partial,"is-invalid":n.is_invalid}:{"is-invalid":n.is_invalid}}function add(){attempt.value&&(attempts.value.push({input:prompt.value,output:[...attempt.value],is_attempt:!0}),hasWon.value=attempt.value.reduce((e,n)=>e&&n.is_match,!0))}return(e,n)=>(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",null,[(openBlock(!0),createElementBlock(Fragment,null,renderList(lines.value,i=>(openBlock(),createElementBlock("div",_hoisted_2,[(openBlock(!0),createElementBlock(Fragment,null,renderList(i.output,r=>(openBlock(),createElementBlock("div",{class:normalizeClass(["item mx-1",itemClass(i,r)])},toDisplayString(r.value),3))),256))]))),256)),createBaseVNode("div",_hoisted_3,[createBaseVNode("div",_hoisted_4,[createBaseVNode("div",_hoisted_5,[hasWon.value?(openBlock(),createBlock(unref(entry_esm),{key:0,force:.7})):createCommentVNode("",!0),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":n[0]||(n[0]=i=>prompt.value=i),disabled:hasWon.value,class:"form-control form-control-lg",onKeydown:withKeys(add,["enter"])},null,40,_hoisted_6),[[vModelText,prompt.value]])]),createBaseVNode("div",_hoisted_7,[createBaseVNode("button",{type:"button",disabled:hasWon.value,class:"btn btn-primary btn-lg w-100 h-100",onClick:add},"Go",8,_hoisted_8)])])])])]))}}),_export_sfc=(e,n)=>{const i=e.__vccOpts||e;for(const[r,l]of n)i[r]=l;return i},game=_export_sfc(_sfc_main,[["__scopeId","data-v-9c50e3d1"]]);export{game as default};
