(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[783],{4972:function(e,t,n){"use strict";n.d(t,{NL:function(){return M},z5:function(){return U},FE:function(){return V},ed:function(){return q}});var r=n(5861),s=n(7462),a=n(3366),o=n(7757),c=n.n(o),i=n(7294),u=n(1744);function l(e,t){return p.apply(this,arguments)}function p(){return(p=(0,r.Z)(c().mark((function e(t,n){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.getDefaultProvider(n));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e,t,n){return h.apply(this,arguments)}function h(){return(h=(0,r.Z)(c().mark((function e(t,n,r){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.Wallet.fromEthSigner(n,r));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e,t){return m.apply(this,arguments)}function m(){return(m=(0,r.Z)(c().mark((function e(t,n){var r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Registering the "+t.address()+" account on zksyncType"),e.next=3,t.isSigningKeySet();case 3:if(e.sent){e.next=15;break}return e.next=6,t.getAccountId();case 6:if(e.t0=e.sent,e.t1=void 0,e.t0!==e.t1){e.next=10;break}throw new Error("Unknown account");case 10:return e.next=12,t.setSigningKey(n);case 12:return r=e.sent,e.next=15,r.awaitReceipt();case 15:console.log("Account "+t.address()+" registered");case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e,t,n){return k.apply(this,arguments)}function k(){return(k=(0,r.Z)(c().mark((function e(t,n,r){var s;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.depositToSyncFromEthereum({depositTo:t.address(),token:n,amount:u.parseEther(r)});case 2:return s=e.sent,e.prev=3,e.next=6,s.awaitReceipt();case 6:e.next=12;break;case 8:e.prev=8,e.t0=e.catch(3),console.log("Error while awaiting confirmation from the zksyncType operators."),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[3,8]])})))).apply(this,arguments)}function v(e,t,n,r,s,a){return g.apply(this,arguments)}function g(){return(g=(0,r.Z)(c().mark((function e(t,n,r,s,a,o){var i,l,p,d;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.utils.closestPackableTransactionAmount(u.parseEther(s)),l=t.utils.closestPackableTransactionFee(u.parseEther(a)),e.next=4,n.syncTransfer({to:r,token:o,amount:i,fee:l.mul(10)});case 4:return p=e.sent,e.next=7,p.awaitReceipt();case 7:return d=e.sent,console.log("Got transfer receipt"),console.log(d),e.abrupt("return",d);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e,t,n,r){return x.apply(this,arguments)}function x(){return(x=(0,r.Z)(c().mark((function e(t,n,r,s){var a;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.getTransactionFee(t,n,r);case 2:return a=e.sent,e.abrupt("return",u.formatEther(a.totalFee.toString()));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e,t,n,r,s){return E.apply(this,arguments)}function E(){return(E=(0,r.Z)(c().mark((function e(t,n,r,s,a){var o,i,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.utils.closestPackableTransactionAmount(u.parseEther(r)),i=t.utils.closestPackableTransactionFee(u.parseEther(s)),e.next=4,n.withdrawFromSyncToEthereum({ethAddress:n.address(),token:a,amount:o,fee:i});case 4:return l=e.sent,e.next=7,l.awaitVerifyReceipt();case 7:console.log("ZKP verification is complete");case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return T.apply(this,arguments)}function T(){return(T=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getAccountState();case 2:(n=e.sent).committed.balances.ETH?console.log("Committed ETH balance for "+t.address()+": "+u.formatEther(n.committed.balances.ETH)):console.log("Committed ETH balance for "+t.address()+": 0"),n.verified.balances.ETH?console.log("Verified ETH balance for "+t.address()+": "+u.formatEther(n.verified.balances.ETH)):console.log("Verified ETH balance for "+t.address()+": 0");case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Z,z,C,A,P,H=function(){function e(e,t,n,r){this.zksync=e,this.networkName=t,this.ethersProvider=n,this.ethersSigner=r}var t=e.prototype;return t.init=function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return void 0===t&&(t="ETH"),t&&(this.token=t),n={feeToken:this.token,ethAuthType:"ECDSA"},e.prev=3,e.next=6,this.ethersSigner.getAddress();case 6:return this.address=e.sent,e.next=9,l(this.zksync,this.networkName);case 9:return this.zkSyncProvider=e.sent,e.next=12,d(this.zksync,this.ethersSigner,this.zkSyncProvider);case 12:return this.zkSyncWallet=e.sent,e.next=15,f(this.zkSyncWallet,n);case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(3),console.error(e.t0.message);case 20:case"end":return e.stop()}}),e,this,[[3,17]])})));return function(t){return e.apply(this,arguments)}}(),t.deposit=function(){var e=(0,r.Z)(c().mark((function e(t){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y(this.zkSyncWallet,this.token,t);case 3:return e.next=5,S(this.zkSyncWallet);case 5:e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),console.error(e.t0.message);case 11:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),t.transfer=function(){var e=(0,r.Z)(c().mark((function e(t,n){var r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w("Transfer",this.address,this.token,this.zkSyncProvider);case 2:return r=e.sent,e.prev=3,e.next=6,v(this.zksync,this.zkSyncWallet,t,n,r,this.token);case 6:e.next=12;break;case 8:e.prev=8,e.t0=e.catch(3),console.log(e.t0),console.error(e.t0.message);case 12:case"end":return e.stop()}}),e,this,[[3,8]])})));return function(t,n){return e.apply(this,arguments)}}(),t.withdraw=function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w("Withdraw",this.address,this.token,this.zkSyncProvider);case 2:return n=e.sent,e.prev=3,e.next=6,b(this.zksync,this.zkSyncWallet,t,n,this.token);case 6:e.next=12;break;case 8:e.prev=8,e.t0=e.catch(3),console.log(e.t0),console.error(e.t0.message);case 12:case"end":return e.stop()}}),e,this,[[3,8]])})));return function(t){return e.apply(this,arguments)}}(),e}(),W=function(){function e(e,t,n,r){this.zksync=e,this.networkName=t,this.ethersProvider=n,this.ethersSigner=r}var t=e.prototype;return t.init=function(){var e=(0,r.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.ethersSigner.getAddress();case 3:return this.address=e.sent,e.next=6,l(this.zksync,this.networkName);case 6:return this.zkSyncProvider=e.sent,e.next=9,d(this.zksync,this.ethersSigner,this.zkSyncProvider);case 9:this.zkSyncWallet=e.sent,e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0.message);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(){return e.apply(this,arguments)}}(),t.displayZkSyncBalance=function(){var e=(0,r.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S(this.zkSyncWallet);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),e}(),K=n(241),N=function(){function e(e){this.provider=new K.Q(e),this.signer=this.provider.getSigner()}return e.prototype.getProvider=function(){return this.provider},e}(),R=["display"],D=["display","onClick"],I=["display","onClick"],B=["display","onClick"],F=["display","onClick"];function L(e,t,n){return void 0===t&&(t=void 0),void 0===n&&(n=void 0),i.createElement("form",null,i.createElement("label",null,e,":",i.createElement("br",null),i.createElement("input",{id:t,type:"text",defaultValue:n})))}function _(e){var t=e.display,n=(0,a.Z)(e,R);return i.createElement("div",{className:"alert alert--primary",role:"alert"},i.createElement("button",{"aria-label":"Close",className:"clean-btn close",type:"button"},i.createElement("span",(0,s.Z)({},n,{"aria-hidden":"true"}))),t)}function M(e){var t=i.useState(!1),o=(t[0],t[1]),u=i.useState("Address : "),l=u[0],p=u[1],d=e.display,h=(e.onClick,(0,a.Z)(e,D)),f={display:l},m=_(f),y=function(){var e=(0,r.Z)(c().mark((function e(){var t,r,s;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n(150),Z=new N(window.ethereum),z=Z.getProvider(),e.next=5,z.send("eth_requestAccounts",[]);case 5:if(z.getSigner(),!d.toLowerCase().includes("sender")){e.next=24;break}return Z=new N(window.ethereum),z=Z.getProvider(),e.next=11,z.send("eth_requestAccounts",[]);case 11:return r=z.getSigner(),A=new H(t,"ropsten",z,r),e.next=15,A.init();case 15:return e.next=17,r.getAddress();case 17:e.t0=e.sent,f.display="Address : "+e.t0,p(f.display),console.log(A),console.log(f.display),e.next=39;break;case 24:if(!d.toLowerCase().includes("receiver")){e.next=39;break}return Z=new N(window.ethereum),C=Z.getProvider(),e.next=29,C.send("eth_requestAccounts",[]);case 29:return s=C.getSigner(),(P=new W(t,"ropsten",C,s)).init(),e.next=34,s.getAddress();case 34:e.t1=e.sent,f.display="Address : "+e.t1,p(f.display),console.log(P),console.log(f.display);case 39:m=_(f),o(!0);case 41:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return i.createElement("div",null,i.createElement("button",(0,s.Z)({},h,{onClick:y}),d),m)}function U(e){var t=e.display,n=(e.onClick,(0,a.Z)(e,I)),o=function(){var e=(0,r.Z)(c().mark((function e(){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("amountToDeposit").value,e.next=3,A.deposit(t);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return i.createElement("div",null,i.createElement("button",(0,s.Z)({},n,{onClick:o}),t),L("Amount to Deposit","amountToDeposit"))}function V(e){var t=e.display,n=(e.onClick,(0,a.Z)(e,B)),o=function(){var e=(0,r.Z)(c().mark((function e(){var t,n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("amountToTransfer").value,n=document.getElementById("toAddress").value,e.next=4,A.transfer(n,t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return i.createElement("div",null,i.createElement("button",(0,s.Z)({},n,{onClick:o}),t),L("Amount to Transfer","amountToTransfer"),L("To address","toAddress"))}function q(e){var t=e.display,n=(e.onClick,(0,a.Z)(e,F)),o=function(){var e=(0,r.Z)(c().mark((function e(){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("amountToWithdraw").value,e.next=3,A.withdraw(t);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return i.createElement("div",null,i.createElement("button",(0,s.Z)({},n,{onClick:o}),t),L("Amount to Withdraw","amountToWithdraw"))}},4954:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return u},metadata:function(){return l},assets:function(){return p},toc:function(){return d},default:function(){return f}});var r=n(7462),s=n(3366),a=(n(7294),n(3905)),o=n(4972),c=["components"],i={slug:"zksync-handson",title:"Zksync handson",authors:"HyoungsungKim"},u=void 0,l={permalink:"/blog/zksync-handson",editUrl:"https://github.com/HyoungsungKim/HyoungsungKim.github.io/blog/2022-01-04-zksync-handson/index.mdx",source:"@site/blog/2022-01-04-zksync-handson/index.mdx",title:"Zksync handson",description:"Connect Sender",date:"2022-01-04T00:00:00.000Z",formattedDate:"January 4, 2022",tags:[],readingTime:.305,truncated:!0,authors:[{name:"Hyoungsung Kim",title:"Resarcher@KETI",url:"https://github.com/hyoungsungkim",imageURL:"https://github.com/hyoungsungkim.png",key:"HyoungsungKim"}],frontMatter:{slug:"zksync-handson",title:"Zksync handson",authors:"HyoungsungKim"},nextItem:{title:"Handling metamask on web",permalink:"/blog/Handling-metamask-on-web"}},p={authorsImageUrls:[void 0]},d=[{value:"Connect Sender",id:"connect-sender",children:[],level:2},{value:"Connect Receiver",id:"connect-receiver",children:[],level:2}],h={toc:d};function f(e){var t=e.components,n=(0,s.Z)(e,c);return(0,a.kt)("wrapper",(0,r.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"zksync-handson"},"ZKsync handson"),(0,a.kt)("h2",{id:"connect-sender"},"Connect Sender"),(0,a.kt)(o.NL,{display:"Sender",className:"button button--primary",mdxType:"ConnectButton"}),(0,a.kt)("h2",{id:"connect-receiver"},"Connect Receiver"),(0,a.kt)(o.NL,{display:"Receiver",className:"button button--primary",mdxType:"ConnectButton"}))}f.isMDXComponent=!0},6601:function(){}}]);