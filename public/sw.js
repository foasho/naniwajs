if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let i={};const r=e=>n(e,a),o={module:{uri:a},exports:i,require:r};s[a]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0c428ae2-8afa4b625177968a.js",revision:"8afa4b625177968a"},{url:"/_next/static/chunks/1a48c3c1-ef4e6a2ec0787710.js",revision:"ef4e6a2ec0787710"},{url:"/_next/static/chunks/248-6077b8e575bb7c18.js",revision:"6077b8e575bb7c18"},{url:"/_next/static/chunks/252f366e-74b519e1cd349ad4.js",revision:"74b519e1cd349ad4"},{url:"/_next/static/chunks/256-4213c65796dd39c5.js",revision:"4213c65796dd39c5"},{url:"/_next/static/chunks/31664189-66543953ebc57efb.js",revision:"66543953ebc57efb"},{url:"/_next/static/chunks/545f34e4-c4f09fb36e9b20d7.js",revision:"c4f09fb36e9b20d7"},{url:"/_next/static/chunks/5c8e84aa-5775dbd158348254.js",revision:"5775dbd158348254"},{url:"/_next/static/chunks/d7eeaac4-2f3e62e08c649c08.js",revision:"2f3e62e08c649c08"},{url:"/_next/static/chunks/ee9ce975-886b610d48dd87b1.js",revision:"886b610d48dd87b1"},{url:"/_next/static/chunks/fb7d5399-df125fa6c2098d37.js",revision:"df125fa6c2098d37"},{url:"/_next/static/chunks/framework-2bb1844fb22814b3.js",revision:"2bb1844fb22814b3"},{url:"/_next/static/chunks/main-81b5e42654a9df9b.js",revision:"81b5e42654a9df9b"},{url:"/_next/static/chunks/pages/_app-71aee333fe981335.js",revision:"71aee333fe981335"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/index-57fcdfaf1e548eb4.js",revision:"57fcdfaf1e548eb4"},{url:"/_next/static/chunks/pages/login-20f5a198c7712063.js",revision:"20f5a198c7712063"},{url:"/_next/static/chunks/pages/reference-119538094e4ec2c4.js",revision:"119538094e4ec2c4"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-2df7a8d27de1794c.js",revision:"2df7a8d27de1794c"},{url:"/_next/static/css/981a78e15c5a2693.css",revision:"981a78e15c5a2693"},{url:"/_next/static/css/d8dedfe28457b4fd.css",revision:"d8dedfe28457b4fd"},{url:"/_next/static/ntk_vJUM-lfLehymR64Bt/_buildManifest.js",revision:"e0d8dc1c25d909e83684127e250bb669"},{url:"/_next/static/ntk_vJUM-lfLehymR64Bt/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:s})=>{if(!e)return!1;const n=s.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e,sameOrigin:s})=>!!s&&!e.pathname.startsWith("/api/")),new e.NetworkFirst({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
