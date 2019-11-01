/**
 * 插件脚本，可以做一些拓展功能
 */
if (!CC_DEBUG) {
  console.log = function(...args) {};
  console.warn = function(...args) {};
  console.error = function(...args) {};
}
CMath = {};
CMath.Clamp = function(val, max, min) {
  return Math.max(Math.min(val, max), min);
};

CMath.Distance = function(p1, p2) {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  );
};

CMath.isInRange = function(val, min, max) {
  return val.x >= min.x && val.y >= min.y && val.x <= max.x && val.y <= max.y;
};

CMath.NumberFormat = function(val) {
  let strArr = val.toString().split(".");
  let strValArr = strArr[0].split("").reverse();
  let resStr = "";
  for (let i = 0; i < strValArr.length; i++) {
    resStr = strValArr[i] + resStr;
    if (i % 3 == 2 && i < strValArr.length - 1) {
      resStr = "," + resStr;
    }
  }

  if (strArr[1]) {
    resStr += "." + strArr[1];
  }

  return resStr;
};

CMath.TimeFormat = function(time) {
  let min = Math.floor(time / 60);
  //if (min < 10) min = "0" + min;
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + "/" + sec;
};

/** 随机种子 */
CMath.randomSeed = 0;

function seededRandom(seed, min, max) {
  seed = (seed * 9301 + 49297) % 233280;
  //if (seed == 0) seed = 233280;
  const rand = seed / 233280;
  return min + rand * (max - min);
}

CMath.getRandom = function(min, max) {
  const seed = CMath.randomSeed;
  min = min || 0;
  max = max || 1;
  const result = seededRandom(seed, min, max);
  CMath.randomSeed += Math.floor(seededRandom(seed, 1, 100000));
  return result;
};

if (CC_DEBUG) {
  cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, event => {
    switch (event.keyCode) {
      case cc.macro.KEY.f11:
        if (cc.game.isPaused()) {
          cc.game.resume();
          console.log("------------------resume-----------------");
        } else {
          console.log("---------------------pause----------------------");
          cc.game.pause();
        }
        break;
      case cc.macro.KEY.f10:
        if (cc.game.isPaused()) {
          console.log(" -------------- step --------------------");
          cc.game.step();
        }
        break;
    }
  });
}
