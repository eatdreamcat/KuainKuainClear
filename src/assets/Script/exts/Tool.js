function seededRandom(t,n,e){return n+(t=(9301*t+49297)%233280)/233280*(e-n)}console.log=function(...t){},CMath={},CMath.Clamp=function(t,n,e){return Math.max(Math.min(t,n),e)},CMath.Distance=function(t,n){return Math.sqrt((t.x-n.x)*(t.x-n.x)+(t.y-n.y)*(t.y-n.y))},CMath.isInRange=function(t,n,e){return t.x>=n.x&&t.y>=n.y&&t.x<=e.x&&t.y<=e.y},CMath.NumberFormat=function(t){let n=t.toString().split("."),e=n[0].split("").reverse(),a="";for(let t=0;t<e.length;t++)a=e[t]+a,t%3==2&&t<e.length-1&&(a=","+a);return n[1]&&(a+="."+n[1]),a},CMath.TimeFormat=function(t){let n=Math.floor(t/60),e=Math.floor(t%60);return e<10&&(e="0"+e),n+":"+e},CMath.randomSeed=0,CMath.getRandom=function(t,n){const e=CMath.randomSeed,a=seededRandom(e,t=t||0,n=n||1);return CMath.randomSeed+=Math.floor(seededRandom(e,1,1e5)),a};