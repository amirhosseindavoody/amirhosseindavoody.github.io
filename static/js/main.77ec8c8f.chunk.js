(this["webpackJsonppomodoro-tracker-app"]=this["webpackJsonppomodoro-tracker-app"]||[]).push([[0],{135:function(e,t,n){},136:function(e,t,n){},150:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),a=n(44),c=n.n(a),o=(n(135),n(136),n(17)),l=n(0),s=n.n(l),u=n(5),j=n(108),d=n(27),b=n(43),m=Object(j.a)({apiKey:"AIzaSyDyf1hO8T29xILZPtDaZEHf8FR5EkTCHw8",authDomain:"angular-theorem-170815.firebaseapp.com",databaseURL:"https://angular-theorem-170815-default-rtdb.firebaseio.com",projectId:"angular-theorem-170815",storageBucket:"angular-theorem-170815.appspot.com",messagingSenderId:"466053256382",appId:"1:466053256382:web:2e08585e9cd0db7f0c3aef"}),h=Object(d.e)(m),O=Object(b.e)(m),f=new b.a,p=new b.b,g=new b.c,x=n(206),v=n(208),T=n(207),y=n(6),w=function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(b.g)(O,b.d).then((function(){return Object(b.h)(O,t).then((function(e){return e.user})).catch((function(e){return e}))})).catch((function(e){return e})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function D(){return Object(y.jsx)(x.a,{variant:"outlined",onClick:function(){O.signOut()},size:"small",children:"Sign out"})}function k(){var e=Object(r.useState)("Anonymous"),t=Object(o.a)(e,2),n=t[0],i=t[1],a=Object(r.useState)(""),c=Object(o.a)(a,2),l=c[0],s=c[1];return Object(b.f)(O,(function(){O.currentUser?(i(O.currentUser.email),s(O.currentUser.photoURL)):(i("Anonymous"),s(""))})),Object(y.jsxs)(T.a,{variant:"body1",component:"div",gutterBottom:!0,children:[Object(y.jsx)("img",{src:l,alt:l,style:{height:"2em"}})," ",n]})}function S(){var e=function(e){w(e).then((function(e){console.log(e)}))};return Object(y.jsxs)("div",{children:[Object(y.jsx)(T.a,{variant:"h2",component:"div",gutterBottom:!0,children:"Login"}),Object(y.jsxs)(v.a,{size:"small",variant:"outlined",children:[Object(y.jsx)(x.a,{onClick:function(){return e(f)},children:"Facebook"}),Object(y.jsx)(x.a,{onClick:function(){return e(p)},children:"Github"}),Object(y.jsx)(x.a,{onClick:function(){return e(g)},children:"Google"})]})]})}var C=n(28),P=n(111),I=n(209),F=n(204),M=n(57),L="timerStarted",R="timerPaused",U="timerReseted",B="labelChanged";function E(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();return{type:R,payload:{time:e}}}function z(){return{type:U}}var H=n(112),A=n.n(H),G=n(201),J=n(202),W=n(115),Z=10,q=["work","personal"],K={timer:{isPlaying:!1,totalDuration:Z,remainingTime:Z,elapsedTime:0,initialStartTime:null,lastStartTime:null,pauseTime:null,interrupted:!1,key:0},pomodoro:{label:null,comment:null}};var N=Object(W.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case L:if(!0===e.timer.isPlaying)return e;var n=null===e.timer.initialStartTime?t.payload.time:e.timer.initialStartTime;return Object(C.a)(Object(C.a)({},e),{},{timer:Object(C.a)(Object(C.a)({},e.timer),{},{isPlaying:!0,lastStartTime:t.payload.time,initialStartTime:n})});case R:if(!1===e.timer.isPlaying)return e;var r=e.timer.elapsedTime+(t.payload.pauseTime-e.timer.lastStartTime)/1e3;return r=r<=e.timer.totalDuration?r:e.timer.totalDuration,Object(C.a)(Object(C.a)({},e),{},{timer:Object(C.a)(Object(C.a)({},e.timer),{},{isPlaying:!1,lastStartTime:null,pauseTime:t.payload.pauseTime,remainingTime:e.timer.totalDuration-r,elapsedTime:r,interrupted:!0})});case U:return Object(C.a)(Object(C.a)({},e),{},{timer:Object(C.a)(Object(C.a)({},e.timer),{},{isPlaying:!1,remainingTime:e.timer.totalDuration,elapsedTime:0,initialStartTime:null,lastStartTime:null,pauseTime:null,key:e.timer.key+1})});case B:return console.log(t.payload.label),Object(C.a)(Object(C.a)({},e),{},{pomodoro:Object(C.a)(Object(C.a)({},e.pomodoro),{},{label:t.payload.label})});default:return K}})),Q=N,V=function(){var e=Object(d.f)(Object(d.c)(h,"users/".concat(O.currentUser.uid,"/pomodors")),Object(d.g)("createdTime",">=",d.a.fromDate(new Date(2021,5))));Object(d.d)(e).then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data().createdTime.toDate().toString())}))})).catch((function(e){console.log("Failed to read userDoc",e)}))},X=function(){return Object(y.jsx)(x.a,{variant:"outlined",onClick:function(){console.log("Populating the database");var e=[0,1,2,3,4,5,6,7,8,9,10,11];e.forEach((function(e){Object(d.b)(Object(d.c)(h,"users/".concat(O.currentUser.uid,"/pomodors")),{createdTime:d.a.fromDate(new Date(2021,e,Math.floor(30*Math.random())))}).then((function(){console.log("Write completed")})).catch((function(e){console.log("Faile to write to database",e)}))})),e.forEach((function(e){Object(d.b)(Object(d.c)(h,"users/user1/pomodors"),{createdTime:d.a.fromDate(new Date(2021,e,Math.floor(30*Math.random())))})})),e.forEach((function(e){Object(d.b)(Object(d.c)(h,"users/user2/pomodors"),{createdTime:d.a.fromDate(new Date(2021,e,Math.floor(30*Math.random())))})}))},children:"Populate with dummy data"})},Y=function(){return Object(y.jsx)(x.a,{variant:"outlined",onClick:V,children:"Read Records"})};function $(){var e=Q.getState();if(!(e.timer.elapsedTime<=0)){var t={startTime:d.a.fromMillis(e.timer.initialStartTime),endTime:d.a.fromDate(new Date),interrupted:e.timer.interrupted,label:e.pomodoro.label,comment:e.pomodoro.comment,duration:e.timer.elapsedTime};Object(d.b)(Object(d.c)(h,"users/".concat(O.currentUser.uid,"/pomodors")),t).then((function(){console.log(t)})).catch((function(e){console.log("Faile to write to database",e)}))}}var _=function(){var e=Object(M.c)((function(e){return e.timer})),t=e.isPlaying,n=e.totalDuration,r=e.remainingTime,i=e.key,a=Object(M.b)();return Object(y.jsx)(P.CountdownCircleTimer,{isPlaying:t,duration:n,colors:[["#004777",1]],strokeWidth:25,initialRemainingTime:r,size:300,onComplete:function(){a(E()),$(),a(z())},children:function(e){var t=e.remainingTime,n=Math.floor(t/60),r=t%60,i="".concat(n,":").concat(r);return Object(y.jsx)(T.a,{variant:"h4",component:"div",gutterBottom:!0,children:i})}},i)},ee=function(){var e=Object(M.b)();return Object(y.jsx)(I.a,{children:Object(y.jsxs)(v.a,{variant:"outlined",children:[Object(y.jsx)(x.a,{onClick:function(){e(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();return{type:L,payload:{time:e}}}(Date.now()))},startIcon:Object(y.jsx)(A.a,{}),children:"Start"}),Object(y.jsx)(x.a,{onClick:function(){e(E(Date.now())),$(),e(z())},children:"Reset"}),Object(y.jsx)(x.a,{onClick:function(){e(E(Date.now())),e(z(Date.now()))},children:"Squash"})]})})},te=function(){var e=Object(M.b)();return Object(y.jsx)(G.a,{freeSolo:!0,options:q,renderInput:function(e){return Object(y.jsx)(J.a,Object(C.a)(Object(C.a)({},e),{},{label:"Label"}))},onChange:function(t,n){e({type:B,payload:{label:n}})}})},ne=function(){return Object(y.jsxs)("div",{children:[Object(y.jsx)(T.a,{variant:"h2",component:"div",gutterBottom:!0,children:"Timer"}),Object(y.jsxs)(F.a,{container:!0,justifyContent:"center",direction:"column",alignItems:"center",spacing:3,children:[Object(y.jsx)(F.a,{item:!0,sx:{width:300},children:Object(y.jsx)(te,{})}),Object(y.jsx)(F.a,{item:!0,children:Object(y.jsx)(_,{})}),Object(y.jsx)(F.a,{item:!0,children:Object(y.jsx)(ee,{})}),Object(y.jsxs)(F.a,{item:!0,children:[Object(y.jsx)(X,{}),Object(y.jsx)(Y,{})]})]})]})},re=n(205),ie=n(73),ae=n(26),ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"white",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Object(y.jsx)("hr",{style:{color:e,backgroundColor:e,height:t,width:"100%",left:0}})};function oe(){return Object(y.jsx)("h2",{children:"Home"})}var le=function(){return Object(y.jsx)(re.a,{children:Object(y.jsxs)(ie.a,{children:[Object(y.jsx)(k,{}),Object(y.jsx)(D,{}),Object(y.jsx)(ce,{}),Object(y.jsxs)("div",{children:[Object(y.jsx)("nav",{children:Object(y.jsxs)("ul",{children:[Object(y.jsx)("li",{children:Object(y.jsx)(ie.b,{to:"/",children:"Home"})}),Object(y.jsx)("li",{children:Object(y.jsx)(ie.b,{to:"/login",children:"Login"})}),Object(y.jsx)("li",{children:Object(y.jsx)(ie.b,{to:"/timer",children:"Timer"})})]})}),Object(y.jsxs)(ae.c,{children:[Object(y.jsx)(ae.a,{path:"/login",children:Object(y.jsx)(S,{})}),Object(y.jsx)(ae.a,{path:"/timer",children:Object(y.jsx)(ne,{})}),Object(y.jsx)(ae.a,{path:"/",children:Object(y.jsx)(oe,{})})]})]})]})})},se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,211)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),i(e),a(e),c(e)}))},ue=function(){return Object(y.jsx)(M.a,{store:Q,children:Object(y.jsx)(le,{})})};c.a.render(Object(y.jsx)(i.a.StrictMode,{children:Object(y.jsx)(ue,{})}),document.getElementById("root")),se()}},[[150,1,2]]]);
//# sourceMappingURL=main.77ec8c8f.chunk.js.map