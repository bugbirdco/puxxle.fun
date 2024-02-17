import{r as ref,c as computed,w as watchEffect,o as onMounted,a as openBlock,b as createElementBlock,F as Fragment,d as renderList,e as createBaseVNode,n as normalizeStyle,f as createCommentVNode,g as defineComponent,h as createBlock,u as unref,i as withDirectives,v as vModelText,j as withKeys,k as normalizeClass,t as toDisplayString,p as pushScopeId,l as popScopeId}from"./index-ELWNEneR.js";const ROTATION_SPEED_MIN=200,ROTATION_SPEED_MAX=800,CRAZY_PARTICLES_FREQUENCY=.1,CRAZY_PARTICLE_CRAZINESS=.3,BEZIER_MEDIAN=.5,FORCE=.5,SIZE=12,FLOOR_HEIGHT=800,FLOOR_WIDTH=1600,PARTICLE_COUNT=150,DURATION=3500,COLORS=["#FFC700","#FF0000","#2E3191","#41BBC7"];var script={props:{particleCount:{type:Number,default:PARTICLE_COUNT},particleSize:{type:Number,default:SIZE},duration:{type:Number,default:DURATION},colors:{type:Array,default:COLORS},force:{type:Number,default:FORCE},stageHeight:{type:Number,default:FLOOR_HEIGHT},stageWidth:{type:Number,default:FLOOR_WIDTH},shouldDestroyAfterDone:{type:Boolean,default:!0}},setup(e){const a=ref(!0),l=(t,n)=>{k(t,{degree:n})},r=computed(()=>C(e.particleCount,e.colors));watchEffect(()=>{e.particleCount>300&&console.log("[VUE-CONFETTI-EXPLOSION] That's a lot of confetti, you sure about that? A lesser number like 200 will still give off the party vibes while still not bricking the device 😉")});const c=computed(()=>M(e.particleCount,e.duration,e.colors,e.particleSize,e.force,e.stageHeight,e.stageWidth));onMounted(async()=>{await E(e.duration),e.shouldDestroyAfterDone&&(a.value=!1)});const C=(t,n)=>{const o=360/t;return Array.from({length:t},(u,d)=>({color:n[d%n.length],degree:d*o}))},E=t=>new Promise(n=>setTimeout(n,t));function m(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return Math.round((t+Number.EPSILON)*10**n)/10**n}function g(t,n){if(t===n)return!0;if(t==null||n==null||t.length!==n.length)return!1;for(let o=0;o<t.length;o++)if(t[o]!==n[o])return!1;return!0}const y=(t,n,o,u,d)=>(t-n)*(d-u)/(o-n)+u,N=(t,n)=>{const o=t+n;return o>360?o-360:o},S=()=>Math.random()>.5,B=[0,0,1],b=[[1,1,0],[1,0,1],[0,1,1],[1,0,0],[0,1,0],B],R=t=>!g(b[t],B)&&S(),h=t=>typeof t>"u",p=t=>{console.error(t)};function M(t,n,o,u,d,v,_){const f=Number.isSafeInteger;return!h(t)&&f(t)&&t<0?(p("particleCount must be a positive integer"),!1):!h(n)&&f(n)&&n<0?(p("duration must be a positive integer"),!1):!h(o)&&!Array.isArray(o)?(p("colors must be an array of strings"),!1):!h(u)&&f(u)&&u<0?(p("particleSize must be a positive integer"),!1):!h(d)&&f(d)&&(d<0||d>1)?(p("force must be a positive integer and should be within 0 and 1"),!1):!h(v)&&typeof v=="number"&&f(v)&&v<0?(p("floorHeight must be a positive integer"),!1):!h(_)&&typeof _=="number"&&f(_)&&_<0?(p("floorWidth must be a positive integer"),!1):!0}function k(t,n){let{degree:o}=n;const u=y(Math.abs(N(o,90)-180),0,180,-e.stageWidth/2,e.stageWidth/2),d=Math.random()*(ROTATION_SPEED_MAX-ROTATION_SPEED_MIN)+ROTATION_SPEED_MIN,v=Math.round(Math.random()*(b.length-1)),_=e.duration-Math.round(Math.random()*1e3),f=Math.random()<CRAZY_PARTICLES_FREQUENCY,x=R(v),I=f?m(Math.random()*CRAZY_PARTICLE_CRAZINESS,2):0,A=I*-1,O=I,T=m(Math.abs(y(Math.abs(N(o,90)-180),0,180,-1,1)),4),w=m(Math.random()*BEZIER_MEDIAN,4),D=m(Math.random()*e.force*(S()?1:-1),4),F=BEZIER_MEDIAN,V=m(Math.max(y(Math.abs(o-180),0,180,e.force,-e.force),0),4),s=(L,z)=>t==null?void 0:t.style.setProperty(L,z+"");s("--x-landing-point",`${u}px`),s("--duration-chaos",`${_}ms`),s("--x1",`${I}`),s("--x2",`${A}`),s("--x3",`${O}`),s("--x4",`${T}`),s("--y1",`${w}`),s("--y2",`${D}`),s("--y3",`${F}`),s("--y4",`${V}`),s("--width",`${x?e.particleSize:Math.round(Math.random()*4)+e.particleSize/2}px`),s("--height",(x?e.particleSize:Math.round(Math.random()*2)+e.particleSize)+"px"),s("--rotation",`${b[v].join()}`),s("--rotation-duration",`${d}ms`),s("--border-radius",`${x?"50%":"0"}`)}return{isVisible:a,isValid:c,stageHeight:e.stageHeight,particles:r,setItemRef:l}}};function render(e,a,l,r,c,C){return r.isVisible&&r.isValid?(openBlock(),createElementBlock("div",{key:0,class:"confetti-container",style:normalizeStyle(`--floor-height: ${r.stageHeight}px;`)},[(openBlock(!0),createElementBlock(Fragment,null,renderList(r.particles,E=>{let{color:m,degree:g}=E;return openBlock(),createElementBlock("div",{key:g,class:"particle",ref:y=>r.setItemRef(y,g)},[createBaseVNode("div",{style:normalizeStyle(`--bgcolor: ${m};`)},null,4)],512)}),128))],4)):createCommentVNode("",!0)}function styleInject(e,a){a===void 0&&(a={});var l=a.insertAt;if(!(!e||typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.type="text/css",l==="top"&&r.firstChild?r.insertBefore(c,r.firstChild):r.appendChild(c),c.styleSheet?c.styleSheet.cssText=e:c.appendChild(document.createTextNode(e))}}var css_248z=`
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
`;styleInject(css_248z);script.render=render;script.__scopeId="data-v-4ff796ae";var entry_esm=(()=>{const e=script;return e.install=a=>{a.component("ConfettiExplosion",e)},e})();const _withScopeId=e=>(pushScopeId("data-v-2768292d"),e=e(),popScopeId(),e),_hoisted_1={class:"mt-5"},_hoisted_2=_withScopeId(()=>createBaseVNode("h1",{class:"text-center mb-4"},"Solve for X",-1)),_hoisted_3={class:"d-flex justify-content-center py-2 px-4"},_hoisted_4={class:"mx-4 px-3 mt-2"},_hoisted_5={class:"row g-2"},_hoisted_6={class:"col col-9 d-flex flex-column align-items-center"},_hoisted_7=["disabled"],_hoisted_8={class:"col"},_hoisted_9=["disabled"],_sfc_main=defineComponent({__name:"game",setup(__props){const input=ref([1,2,3,4,5]),output=ref([2,4,6,8,10]),attempts=ref([]),prompt=ref("x"),hasWon=ref(!1),attempt=computed(()=>{const values=[];for(let i in input.value)try{let response=eval(`((x) => {
        return ${prompt.value}
      })
      (${JSON.stringify(input.value[i])})`);response=response?response.toString().substring(0,3):"";const isMatch=response==output.value[i];values.push({value:response,is_match:isMatch,is_partial:isMatch||output.value.reduce((e,a)=>e||a==response,!1),is_invalid:!1})}catch(e){console.error(e),values.push({value:"",is_match:!1,is_partial:!1,is_invalid:!0})}return values}),lines=computed(()=>{if(hasWon.value)return attempts.value;const e={input:prompt.value,output:attempt.value,is_attempt:!1};return[...attempts.value,e]});function itemClass(e,a){return e.is_attempt?{"is-match":a.is_match,"is-partial":!a.is_match&&a.is_partial,"is-invalid":a.is_invalid}:{"is-invalid":a.is_invalid}}function add(){attempts.value.push({input:prompt.value,output:[...attempt.value],is_attempt:!0}),hasWon.value=attempt.value.reduce((e,a)=>e&&a.is_match,!0)}return(e,a)=>(openBlock(),createElementBlock("div",_hoisted_1,[_hoisted_2,createBaseVNode("div",null,[(openBlock(!0),createElementBlock(Fragment,null,renderList(lines.value,l=>(openBlock(),createElementBlock("div",_hoisted_3,[(openBlock(!0),createElementBlock(Fragment,null,renderList(l.output,r=>(openBlock(),createElementBlock("div",{class:normalizeClass(["item mx-1",itemClass(l,r)])},toDisplayString(r.value),3))),256))]))),256)),createBaseVNode("div",_hoisted_4,[createBaseVNode("div",_hoisted_5,[createBaseVNode("div",_hoisted_6,[hasWon.value?(openBlock(),createBlock(unref(entry_esm),{key:0,force:.7})):createCommentVNode("",!0),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":a[0]||(a[0]=l=>prompt.value=l),disabled:hasWon.value,class:"form-control form-control-lg",onKeydown:withKeys(add,["enter"])},null,40,_hoisted_7),[[vModelText,prompt.value]])]),createBaseVNode("div",_hoisted_8,[createBaseVNode("button",{type:"button",disabled:hasWon.value,class:"btn btn-primary btn-lg w-100 h-100",onClick:add},"Go",8,_hoisted_9)])])])])]))}}),_export_sfc=(e,a)=>{const l=e.__vccOpts||e;for(const[r,c]of a)l[r]=c;return l},game=_export_sfc(_sfc_main,[["__scopeId","data-v-2768292d"]]);export{game as default};
