if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>a(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(n(...e),i)))}}define(["./workbox-83b758e3"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5fMD3ak7PGbCxQia8oatS/_buildManifest.js",revision:"a5ed5c673a4cf63b64a4ad12c8de127c"},{url:"/_next/static/5fMD3ak7PGbCxQia8oatS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/13f37dd2.a3f233b9b3a8a479.js",revision:"a3f233b9b3a8a479"},{url:"/_next/static/chunks/225.15c7d54b66d1b433.js",revision:"15c7d54b66d1b433"},{url:"/_next/static/chunks/263.dc1b55e7c661c4d2.js",revision:"dc1b55e7c661c4d2"},{url:"/_next/static/chunks/274-e872d868dbc2043b.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/2e3a737e.a1641d9b9a37da01.js",revision:"a1641d9b9a37da01"},{url:"/_next/static/chunks/3607f7cb.1ad3918c659790ae.js",revision:"1ad3918c659790ae"},{url:"/_next/static/chunks/39e496c1.39df7e174f3f72d6.js",revision:"39df7e174f3f72d6"},{url:"/_next/static/chunks/539bbe41.6c7e2fb68bc48d79.js",revision:"6c7e2fb68bc48d79"},{url:"/_next/static/chunks/651.c8cc46ec43621bdb.js",revision:"c8cc46ec43621bdb"},{url:"/_next/static/chunks/6ab6b39f.d5f0e48851b0dc3e.js",revision:"d5f0e48851b0dc3e"},{url:"/_next/static/chunks/751-3c814e68e385a288.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/7c806026.f0bbd41fd0e78c8a.js",revision:"f0bbd41fd0e78c8a"},{url:"/_next/static/chunks/8-950a67d9017a4016.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/839-797515159dc481f5.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/87.3d12cc060f4aa44f.js",revision:"3d12cc060f4aa44f"},{url:"/_next/static/chunks/8e5a698c-42ddd25410ef5bd8.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/9dbc26f1.35548e6f7a3b7c89.js",revision:"35548e6f7a3b7c89"},{url:"/_next/static/chunks/app/layout-cc6394ae079ad656.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/app/login/page-19b6c4c0bf4475d5.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/app/page-3f4cfd56c67dfefb.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/app/reference/page-b030ff3d58c54298.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/bce60fc1-b5a1fb092cf1cc5c.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/be24f01c.373144b60a45cfce.js",revision:"373144b60a45cfce"},{url:"/_next/static/chunks/db3fc406.117bd55350f93423.js",revision:"117bd55350f93423"},{url:"/_next/static/chunks/e218cc02.899a8562fa562b1f.js",revision:"899a8562fa562b1f"},{url:"/_next/static/chunks/ff48af57.ce3cb13ebb7734b3.js",revision:"ce3cb13ebb7734b3"},{url:"/_next/static/chunks/framework-2780ee35c3367164.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/main-19ca96e12dd693d7.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/main-app-9c419d3a8ba7f35f.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/pages/_app-4e72088c2da7d84b.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/pages/_error-87afbe7e3d327810.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-7a225bfd446224ad.js",revision:"5fMD3ak7PGbCxQia8oatS"},{url:"/_next/static/css/6c6ff2b4e87df781.css",revision:"6c6ff2b4e87df781"},{url:"/_next/static/css/f1550bd08b718cba.css",revision:"f1550bd08b718cba"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
