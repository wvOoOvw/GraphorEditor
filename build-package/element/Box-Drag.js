!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r(require("React"));else if("function"==typeof define&&define.amd)define(["React"],r);else{var t="object"==typeof exports?r(require("React")):r(e.React);for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(self,(e=>(()=>{"use strict";var r={24:r=>{r.exports=e}},t={};function n(e){var o=t[e];if(void 0!==o)return o.exports;var a=t[e]={exports:{}};return r[e](a,a.exports,n),a.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{n.r(o);var e=n(24),r=n.n(e);function t(){return t=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},t.apply(this,arguments)}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var f,l={Render:function(e){var n=e.env,o=(e.update,e.devParams),a=e.property,c=e.style,u=(e.monitor,e.trigger),f=e.children,l=(e.element,e.prop),p={onDrag:function(e){u&&u.onDrag&&u.onDrag(void 0,e)},onDragStart:function(e){u&&u.onDragStart&&u.onDragStart(void 0,e)},onDragLeave:function(e){u&&u.onDragLeave&&u.onDragLeave(void 0,e)},onDragOver:function(e){u&&u.onDragOver&&u.onDragOver(void 0,e)},onDragEnter:function(e){u&&u.onDragEnter&&u.onDragEnter(void 0,e)},onDragEnd:function(e){u&&u.onDragEnd&&u.onDragEnd(void 0,e)},onDrop:function(e){u&&u.onDrop&&u.onDrop(void 0,e)},draggable:a.draggable};return"dev"===n?r().createElement("div",t({},o,f.content.devParams,{style:i({},c.content)}),f.content(l)):"prod"===n?r().createElement("div",t({style:i({},c.content)},p),f.content(l)):void 0},license:{key:"Box-Drag"}};window.graphElement=window.graphElement?[].concat(function(e){if(Array.isArray(e))return u(e)}(f=window.graphElement)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(f)||function(e,r){if(e){if("string"==typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}}(f)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[l]):[l]})(),o})()));