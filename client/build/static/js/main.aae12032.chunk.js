(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{34:function(e,t,a){e.exports=a(75)},39:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(31),s=a.n(r),o=(a(39),a(19)),l=a(3),i=a(8),u=a(1),m=Object(n.createContext)({token:"",name:"",expiry:""}),p=function(e){var t=e.logOutUser,a=Object(n.useContext)(m).user,r=Object(u.f)();return c.a.createElement("div",null,c.a.createElement(c.a.Fragment,null,a&&a.access_token?c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",{className:"App__welcome"},"Welcome, ",a&&a.name,"."),c.a.createElement("button",{className:"App__logout",onClick:function(){t(),r.push("/")}},"Log Out")):c.a.createElement("section",{className:"App"},c.a.createElement("h2",{className:"App__prompt"},"Welcome! Please log in to your Spotify Account."),c.a.createElement("a",{className:"App__anchor",href:"/login"},c.a.createElement("button",{className:"Auth__button"},"Log In")))))},f=function(){return c.a.createElement("nav",{className:"Header"},c.a.createElement("ul",{className:"Header__nav"},c.a.createElement("li",null,c.a.createElement(i.b,{className:"Header__item",to:"/"},"Home")),c.a.createElement("li",null,c.a.createElement(i.b,{className:"Header__item",to:"/about"},"About")),c.a.createElement("li",null,c.a.createElement(i.b,{className:"Header__item",to:"/toplist"},"Your Top Tracks"))))},b=function(e){var t=e.children;return c.a.createElement(c.a.Fragment,null,c.a.createElement(f,null),c.a.createElement("div",{className:"Layout"},c.a.createElement("div",{className:"Layout__container"},t)))},_=function(){return c.a.createElement("p",{className:"About__text"},"Made by Filip Cordas (https://github.com/atfilipcc) with React, Express, and the Spotify API.")},d=a(11),g=a.n(d),E=a(13),h=a(10),k=a.n(h),v=new k.a,y=function(){var e=Object(n.useContext)(m),t=e.user,a=(e.setUser,Object(n.useState)({})),r=Object(l.a)(a,2),s=r[0],o=r[1],i=Object(n.useState)(""),u=Object(l.a)(i,2),p=u[0],f=u[1];function b(){return(b=Object(E.a)(g.a.mark((function e(){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.getMyCurrentPlaybackState(t.access_token).catch((function(e){return f(e.response)}));case 3:if(!(a=e.sent)){e.next=8;break}o({name:a.item.name,image:a.item.album.images[0].url}),e.next=9;break;case 8:return e.abrupt("return",c.a.createElement("p",null,"Nothing found!"));case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}return t.access_token&&v.setAccessToken(t.access_token),c.a.createElement("div",{className:"Current"},p,c.a.createElement("h2",{className:"Current__name"},"Currently Playing: ",s.name),c.a.createElement("button",{onClick:function(){return b.apply(this,arguments)}},"Check Playback"),c.a.createElement("img",{className:"Current__img",alt:"album-art",src:s.image}))},O=new k.a,N=function(e){var t=e.getRefreshToken,a=Object(n.useContext)(m),r=a.user,s=(a.setUser,Object(n.useState)([])),o=Object(l.a)(s,2),i=o[0],u=o[1],p=Object(n.useState)([]),f=Object(l.a)(p,2),b=f[0],_=f[1],d=Object(n.useState)({}),g=Object(l.a)(d,2),E=g[0],h=g[1],k=Object(n.useState)(""),v=Object(l.a)(k,2),y=v[0],N=v[1],j=function(e){N({message:e}),setTimeout((function(){N("")}),3e3)},T=function(e){return r.access_token&&c.a.createElement("button",{id:e,className:"TopList__buttons--button",onClick:function(a){!function(e){O.setAccessToken(r.access_token),O.getMyTopTracks({limit:30,time_range:e}).then((function(e){u(Object.values(e)[0])})).catch((function(e){401===e.status&&(t(),j("Please try again."))}))}(e),function(e){for(var t=document.getElementsByClassName("TopList__buttons--button"),a=0;a<t.length;a++)t[a].disabled=!1;e.target.disabled=!0}(a)}},e.replace(e[0],e[0].toUpperCase()).replace("_"," "))};return c.a.createElement("div",{className:"TopList"},c.a.createElement("h1",{className:"TopList__title"},"Your Top Tracks"),!r.access_token&&c.a.createElement("p",{className:"message"},"Please log in to use this functionality."),c.a.createElement("section",{className:"TopList__buttons"},T("long_term"),T("medium_term"),T("short_term")),i.length>0&&c.a.createElement("button",{className:"TopList__createButton",onClick:function(e){!function(e){var t=e.target;t.disabled=!0,setTimeout((function(){t.disabled=!1}),3e3)}(e),function(){var e=i.map((function(e){return e.uri}));O.createPlaylist(r.id,{name:"Your Top Tracks",public:!0,collaborative:!1,description:"Your most listened to songs."},(function(t,a){if(t)return h({error:t});a.id&&O.addTracksToPlaylist(a.id,e).catch((function(e){return console.log(e.response)}))}))}(),j("Playlist created!")}},"Create playlist"),E&&c.a.createElement("p",{className:"message"},E.error),y&&c.a.createElement("p",{className:"message"},y.message),c.a.createElement("ul",{className:"TopList__list"},i&&i.map((function(e,t){return c.a.createElement("article",{key:"".concat(e.name," ").concat(e.id),className:"TopList__song--wrapper"},null!==e.preview_url&&c.a.createElement("div",{className:"TopList__playpause--wrapper"},c.a.createElement("div",{className:"playpause ".concat(e.name.replace(/ /g,""))},c.a.createElement("input",{onClick:function(e){return function(e){var t=e.target.nextSibling.nextSibling;if(0!==b.length){var a=document.getElementById("playpause ".concat(b.id));t!==b&&b.pause(),a.checked=!0}t.volume=.1,t.paused?(t.play(),_(t)):(t.pause(),_([]))}(e)},type:"checkbox",defaultChecked:!0,value:"None",id:"playpause ".concat(e.name),name:"check"}),c.a.createElement("label",{onClick:void 0,htmlFor:"playpause ".concat(e.name),tabIndex:"1",id:"label ".concat(e.name)}),c.a.createElement("audio",{loop:!0,volume:"0.1",id:"".concat(e.name),key:"playback ".concat(e.name),src:e.preview_url}))),c.a.createElement("div",{className:"TopList__content"},c.a.createElement("li",{key:e.name,className:"TopList__song"},"".concat(t+1," - ").concat(e.artists[0].name," - ").concat(e.name))),c.a.createElement("img",{className:"TopList__image",alt:e.name,src:e.album.images[1].url}))}))),c.a.createElement("div",{id:"mobile-detector"}))},j=new k.a,T=function(){var e=Object(n.useContext)(m),t=e.user,a=(e.setUser,Object(n.useState)("")),r=Object(l.a)(a,2),s=r[0],o=(r[1],Object(n.useState)("")),i=Object(l.a)(o,2),u=(i[0],i[1],Object(n.useState)("")),p=Object(l.a)(u,2);p[0],p[1];t.access_token&&j.setAccessToken(t.access_token);var f=function(){var e=Object(E.a)(g.a.mark((function e(){var a,n,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.next=3,j.getUserPlaylists(t.id,{limit:30});case 3:return n=e.sent,e.next=6,n.items.map((function(e){return e.id}));case 6:return c=e.sent,e.next=9,c.forEach((function(e){return j.getPlaylistTracks(e).then((function(e){return a.push(e)}))}));case 9:return e.next=11,console.log(a);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return c.a.createElement("div",{className:"Sorter"},s,c.a.createElement("button",{onClick:f},"Get Playlists"))},x=a(33),w=a.n(x),C=a(18),S=a.n(C),L=new Date,A=function(){var e={access_token:"",refresh_token:"",name:"",id:"",expiry:""},t=Object(n.useState)(e),a=Object(l.a)(t,2),r=a[0],s=a[1],f=Object(n.useMemo)((function(){return{user:r,setUser:s}}),[r,s]);Object(n.useEffect)((function(){var e=w.a.parse(window.location.search);e.access_token&&!r.name.length&&S.a.get("https://api.spotify.com/v1/me",{headers:{Authorization:"Bearer "+e.access_token}}).then((function(t){console.log(t),s({access_token:e.access_token,refresh_token:e.refresh_token,name:t.data.display_name,id:t.data.id,expiry:L.getTime()})}))}),[]),Object(n.useEffect)((function(){var e=localStorage.getItem("userToken"),t=JSON.parse(e);s(t)}),[]),Object(n.useEffect)((function(){var e=JSON.stringify(r);localStorage.setItem("userToken",e)}),[r]);var d=function(t){localStorage.removeItem("userToken"),s(e)},g=function(){S.a.get("/refresh_token?refresh_token=".concat(r.refresh_token)).then((function(e){return s(Object(o.a)(Object(o.a)({},r),{},{access_token:e.data.access_token}))}))};return c.a.createElement(m.Provider,{value:f},c.a.createElement(i.a,null,c.a.createElement(b,null,c.a.createElement(c.a.Fragment,null,c.a.createElement(u.c,null,c.a.createElement(u.a,{path:"/",exact:!0},c.a.createElement(p,{logOutUser:d})),c.a.createElement(u.a,{path:"/callback",exact:!0,component:p}),c.a.createElement(u.a,{path:"/about",component:_}),c.a.createElement(u.a,{path:"/current",component:y}),c.a.createElement(u.a,{path:"/toplist"},c.a.createElement(N,{getRefreshToken:g,logOutUser:d})),c.a.createElement(u.a,{path:"/sorter"},c.a.createElement(T,{getRefreshToken:g,logOutUser:d})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[34,1,2]]]);
//# sourceMappingURL=main.aae12032.chunk.js.map