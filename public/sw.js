if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>a(e,t),o={module:{uri:t},exports:i,require:r};s[t]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(n(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Z6snIYE4jMMEgJPj8xTBJ/_buildManifest.js",revision:"6de6c76094bce2e79a51c72f5f88a113"},{url:"/_next/static/Z6snIYE4jMMEgJPj8xTBJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0c428ae2-402f2adfc4ffc68b.js",revision:"402f2adfc4ffc68b"},{url:"/_next/static/chunks/10-57216a681f9aae8c.js",revision:"57216a681f9aae8c"},{url:"/_next/static/chunks/1a48c3c1-08bcc2aa998a58ab.js",revision:"08bcc2aa998a58ab"},{url:"/_next/static/chunks/252f366e-f59f28c9854ccf9f.js",revision:"f59f28c9854ccf9f"},{url:"/_next/static/chunks/263.dc1b55e7c661c4d2.js",revision:"dc1b55e7c661c4d2"},{url:"/_next/static/chunks/31664189-561ddec4b507701b.js",revision:"561ddec4b507701b"},{url:"/_next/static/chunks/57c9cdab-cbb10ac350feb248.js",revision:"cbb10ac350feb248"},{url:"/_next/static/chunks/5c8e84aa-c74f8aa076bd5971.js",revision:"c74f8aa076bd5971"},{url:"/_next/static/chunks/664-cc4eba2c528e125d.js",revision:"cc4eba2c528e125d"},{url:"/_next/static/chunks/764-1ea219de6b8324ef.js",revision:"1ea219de6b8324ef"},{url:"/_next/static/chunks/87.3d12cc060f4aa44f.js",revision:"3d12cc060f4aa44f"},{url:"/_next/static/chunks/c728d871-85808bf35b449997.js",revision:"85808bf35b449997"},{url:"/_next/static/chunks/c858d960-d2ad487ea63b39fb.js",revision:"d2ad487ea63b39fb"},{url:"/_next/static/chunks/d7eeaac4-0158eafafe9ab7ce.js",revision:"0158eafafe9ab7ce"},{url:"/_next/static/chunks/ee9ce975-0c0d4e2210b637fa.js",revision:"0c0d4e2210b637fa"},{url:"/_next/static/chunks/fb7d5399-facb7e4544d4faff.js",revision:"facb7e4544d4faff"},{url:"/_next/static/chunks/framework-ff0cb1de24dfef7d.js",revision:"ff0cb1de24dfef7d"},{url:"/_next/static/chunks/main-365b998a118a31c6.js",revision:"365b998a118a31c6"},{url:"/_next/static/chunks/pages/_app-2947aaa43ccb297e.js",revision:"2947aaa43ccb297e"},{url:"/_next/static/chunks/pages/_error-409f831d3504c8f5.js",revision:"409f831d3504c8f5"},{url:"/_next/static/chunks/pages/index-eb4321ac0acda258.js",revision:"eb4321ac0acda258"},{url:"/_next/static/chunks/pages/login-35681a27adea2c3e.js",revision:"35681a27adea2c3e"},{url:"/_next/static/chunks/pages/reference-66a19673c3f1079f.js",revision:"66a19673c3f1079f"},{url:"/_next/static/chunks/pages/sample-9fdf95567524ed99.js",revision:"9fdf95567524ed99"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-17db528d53d9cb07.js",revision:"17db528d53d9cb07"},{url:"/_next/static/css/2334975ba149ec65.css",revision:"2334975ba149ec65"},{url:"/_next/static/css/981a78e15c5a2693.css",revision:"981a78e15c5a2693"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:s})=>{if(!e)return!1;const a=s.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e,sameOrigin:s})=>!!s&&!e.pathname.startsWith("/api/")),new e.NetworkFirst({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
