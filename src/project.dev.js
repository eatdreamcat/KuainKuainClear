window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AniRemove: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8a6aVfgeRFg5ULu5zx5Igf", "AniRemove");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        type: {
          default: 0,
          displayName: "\u52a8\u753b\u7c7b\u578b",
          type: cc.Enum({
            "\u6d41\u661f": 0,
            "\u96fe": 1,
            "\u661f\u661f": 2,
            "\u98de\u789f": 3,
            "\u767d\u4e91": 4,
            "\u8fde\u51fb\u7279\u6548": 5
          })
        }
      },
      onLoad: function onLoad() {
        var ani = this.node.getComponent(cc.Animation);
        this.node.x = 0;
        switch (this.type) {
         case 0:
         case 1:
          ani && ani.once("finished", this.remove, this);
          break;

         case 2:
         case 3:
          break;

         case 4:
          ani && ani.once("finished", this.remove, this);
        }
        ani && ani.play();
      },
      remove: function remove() {
        this.node.removeFromParent(true);
      },
      start: function start() {
        var rand = new Date().getSeconds() / 60;
        switch (this.type) {
         case 4:
         case 2:
         case 1:
          if (rand < .25) {
            this.node.scaleX = -.5;
            this.node.scaleY = -.5;
          } else if (rand < .5) {
            this.node.scaleX = -.5;
            this.node.scaleY = .5;
          } else if (rand < .75) {
            this.node.scaleX = .5;
            this.node.scaleY = -.5;
          } else {
            this.node.scaleX = .5;
            this.node.scaleY = .5;
          }
          break;

         case 3:
          this.node.scaleX = rand < .5 ? -.4 : .4;
        }
      },
      update: function update(dt) {
        2 != this.type && 3 != this.type && 5 != this.type || this.node.convertToWorldSpace(this.node.position).y < -800 && this.remove();
      }
    });
    cc._RF.pop();
  }, {} ],
  Bird: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "273baYj5nZF96xONv7M6SF5", "Bird");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        moveSpeed: 1.2,
        animation: "am_penican",
        birdAudio: {
          default: null,
          type: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.moveAction = this.setMoveAction();
        this.node.runAction(this.moveAction);
        this.moving = true;
        var animationComponet = this.getComponent(cc.Animation);
        var animState = animationComponet.play(this.animation);
        animState.speed = .25;
        animState.repeatCount = Infinity;
        cc.audioEngine.playEffect(this.birdAudio, false);
      },
      setMoveAction: function setMoveAction() {
        var moveAction = cc.moveBy(cc.winSize.width / this.moveSpeed / 150, cc.v2(2 * -this.node.position.x, 0));
        return moveAction;
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        this.game.gameOver();
      },
      update: function update(dt) {
        if (this.moveAction.isDone() && this.moving) {
          this.moving = false;
          this.game.birdStoped(this);
          this.node.destroy();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Canvas: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e439uzFENNgbliJKpXMaTr", "Canvas");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bgNode: {
          type: cc.Node,
          default: null
        },
        bgSkyPrefab: {
          type: cc.Prefab,
          default: null
        },
        bgNightPrefab: {
          type: cc.Prefab,
          default: null
        },
        bgSpacePrefab: {
          type: cc.Prefab,
          default: null
        }
      },
      onLoad: function onLoad() {
        var rand = new Date().getSeconds() / 60;
        this.bgNode.removeAllChildren(true);
        rand < 1 / 3 ? this.bgNode.addChild(cc.instantiate(this.bgSkyPrefab), 0, "bgPrefab") : rand < 2 / 3 ? this.bgNode.addChild(cc.instantiate(this.bgNightPrefab), 0, "bgPrefab") : this.bgNode.addChild(cc.instantiate(this.bgSpacePrefab), 0, "bgPrefab");
      }
    });
    cc._RF.pop();
  }, {} ],
  ComboEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f503nV3KFKnLc49hzxboTr", "ComboEffect");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        frame: cc.Node
      },
      start: function start() {},
      setHeight: function setHeight(height) {
        this.frame.height = height;
      }
    });
    cc._RF.pop();
  }, {} ],
  HeroControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "339d2dg1QpEKKxBJBzHiDJ0", "HeroControl");
    "use strict";
    var _celerx = require("../../../lib/celerx");
    var _celerx2 = _interopRequireDefault(_celerx);
    var _random = require("../Utils/random");
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(2e3, 2e3),
        gravity: -1e3,
        drag: 1e3,
        direction: 0,
        isSuper: false,
        jumpSpeed: 300,
        scoreDisplay: {
          default: null,
          type: cc.Label
        },
        stop1Sprite: {
          default: null,
          type: cc.Sprite
        },
        stop2Sprite: {
          default: null,
          type: cc.Sprite
        },
        stop3Sprite: {
          default: null,
          type: cc.Sprite
        },
        aeCombobuff: {
          default: null,
          type: cc.Sprite
        },
        jumpAudio: {
          default: null,
          type: cc.AudioClip
        },
        startButton: {
          default: null,
          type: cc.Node
        },
        bgAudio: {
          default: null,
          type: cc.AudioClip
        },
        touchNode: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.collisionX = 0;
        this.collisionY = 0;
        this.prePosition = cc.v2();
        this.preStep = cc.v2();
        this.touchingNumber = 0;
        this.playIdleAnimation();
        this.aeStop = 0;
        var animationComponet = this.startButton.getComponent(cc.Animation);
        var animState = animationComponet.play("btn_start");
        animState.speed = .1;
        animState.repeatCount = Infinity;
        animationComponet = this.aeCombobuff.getComponent(cc.Animation);
        animState = animationComponet.play("ae_combobuff");
        animState.speed = .3;
        animState.repeatCount = Infinity;
        var match = _celerx2.default.getMatch();
        (0, _random.setSeed)(match ? match.sharedRandomSeed : 0);
        this.bottomLine = 25;
        _celerx2.default.ready();
        var takeImage = false;
        var canvas = document.getElementsByTagName("canvas")[0];
        cc.director.on(cc.Director.EVENT_AFTER_DRAW, function() {
          if (takeImage) {
            takeImage = false;
            _celerx2.default.didTakeSnapshot(canvas.toDataURL("image/jpeg", .1));
          }
        });
        _celerx2.default.provideCurrentFrameData(function() {
          takeImage = true;
        });
      },
      onEnable: function onEnable() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
      },
      onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
      },
      playIdleAnimation: function playIdleAnimation() {
        var animationComponet = this.getComponent(cc.Animation);
        var animState = this.isSuper ? animationComponet.play("am_fish_stay_super") : animationComponet.play("am_fish_stay");
        animState.speed = .3;
        animState.repeatCount = Infinity;
      },
      onTouchStart: function onTouchStart(event) {
        if (!this.jumping && this.game.gameOn) {
          this.jumping = true;
          this.speed.y = this.jumpSpeed;
          this.collisionY = 0;
          var animationComponet = this.getComponent(cc.Animation);
          var animState = this.isSuper ? animationComponet.play("am_fish_jump_super") : animationComponet.play("am_fish_jump");
          animState.speed = .4;
          animState.onStop = this.playIdleAnimation.bind(this);
          cc.audioEngine.playEffect(this.jumpAudio, false);
          parseInt(this.scoreDisplay.string) > 20 && cc.director.emit("big_cloud_move_down");
        }
      },
      onTouchEnd: function onTouchEnd(event) {
        this.direction = 0;
      },
      startGame: function startGame() {
        if (!this.game.gameOn) {
          cc.audioEngine.playMusic(this.bgAudio, true);
          this.game.gameOn = true;
          this.game.addBlock();
          this.game.startTimer();
          this.startButton.y = -1e3;
        }
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        this.touchingNumber++;
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
          if (this.speed.x < 0 && selfPreAabb.xMax > otherPreAabb.xMax) {
            this.node.x = otherPreAabb.xMax - this.node.parent.x;
            this.collisionX = -1;
          } else if (this.speed.x > 0 && selfPreAabb.xMin < otherPreAabb.xMin) {
            this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
            this.collisionX = 1;
          }
          this.speed.x = 0;
          other.touchingX = true;
          return;
        }
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
          if (this.game.gameOn) {
            var animationComponet = void 0, animState = void 0;
            switch (this.aeStop) {
             case 0:
              animationComponet = this.stop1Sprite.getComponent(cc.Animation);
              animState = animationComponet.play("ae_stop1");
              animState.speed = .8;
              this.aeStop++;
              break;

             case 1:
              animationComponet = this.stop2Sprite.getComponent(cc.Animation);
              animState = animationComponet.play("ae_stop2");
              animState.speed = .6;
              this.aeStop++;
              break;

             case 2:
              animationComponet = this.stop3Sprite.getComponent(cc.Animation);
              animState = animationComponet.play("ae_stop3");
              animState.speed = .6;
              this.aeStop = 0;
            }
          }
          if (this.speed.y < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
            this.node.y = otherPreAabb.yMax - this.node.parent.y;
            this.jumping = false;
            this.collisionY = -1;
          } else if (this.speed.y > 0 && selfPreAabb.yMin < otherPreAabb.yMin) {
            this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
            this.collisionY = 1;
          }
          this.speed.y = 0;
          other.touchingY = true;
        }
      },
      onCollisionStay: function onCollisionStay(other, self) {
        if (-1 === this.collisionY && "Platform" === other.node.group) var motion = other.node.getComponent("PlatformMotion");
      },
      onCollisionExit: function onCollisionExit(other) {
        this.touchingNumber--;
        0 === this.touchingNumber && (this.node.color = cc.Color.WHITE);
        if (other.touchingX) {
          this.collisionX = 0;
          other.touchingX = false;
        } else if (other.touchingY) {
          other.touchingY = false;
          this.collisionY = 0;
          this.jumping = true;
        }
      },
      update: function update(dt) {
        if (0 === this.collisionY) {
          this.speed.y += this.gravity * dt;
          Math.abs(this.speed.y) > this.maxSpeed.y && (this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y);
        }
        if (this.node.y < this.bottomLine) {
          this.speed.y = 0;
          this.collisionY = -1;
          this.node.y = this.bottomLine;
          this.jumping = false;
          console.log("opp");
        }
        if (0 === this.direction) {
          if (this.speed.x > 0) {
            this.speed.x -= this.drag * dt;
            this.speed.x <= 0 && (this.speed.x = 0);
          } else if (this.speed.x < 0) {
            this.speed.x += this.drag * dt;
            this.speed.x >= 0 && (this.speed.x = 0);
          }
        } else {
          this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
          Math.abs(this.speed.x) > this.maxSpeed.x && (this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x);
        }
        this.speed.x * this.collisionX > 0 && (this.speed.x = 0);
        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;
        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
        this.stop1Sprite.node.y = this.node.y + 45;
        this.stop2Sprite.node.y = this.node.y + 25;
        this.stop3Sprite.node.y = this.node.y + 45;
        this.aeCombobuff.node.y = this.node.y + 55;
      }
    });
    cc._RF.pop();
  }, {
    "../../../lib/celerx": "celerx",
    "../Utils/random": "random"
  } ],
  PlatformMotion: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f761EZmKhNLKJpUXTrb4fF", "PlatformMotion");
    "use strict";
    var _random = require("../Utils/random");
    cc.Class({
      extends: cc.Component,
      properties: {
        moveSpeed: 0,
        type: 0,
        isOver: false,
        blackcat: {
          default: null,
          type: cc.SpriteFrame
        },
        licat: {
          default: null,
          type: cc.SpriteFrame
        },
        nainiucat: {
          default: null,
          type: cc.SpriteFrame
        },
        sanhuacat: {
          default: null,
          type: cc.SpriteFrame
        },
        oracat: {
          default: null,
          type: cc.SpriteFrame
        },
        eatSprite: {
          default: null,
          type: cc.Sprite
        },
        cat1Audio: {
          default: null,
          type: cc.AudioClip
        },
        cat2Audio: {
          default: null,
          type: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.moveAction = this.setMoveAction();
        this.node.runAction(this.moveAction);
        this.moving = true;
        this.isOver = false;
        var component = this.node.getComponent(cc.Sprite);
        switch (this.type) {
         case 4:
          component.spriteFrame = this.blackcat;
          break;

         case 3:
          component.spriteFrame = this.licat;
          break;

         case 2:
          component.spriteFrame = this.nainiucat;
          break;

         case 1:
          component.spriteFrame = this.sanhuacat;
          break;

         default:
          component.spriteFrame = this.oracat;
        }
        (0, _random.getRandom)() < .5 ? cc.audioEngine.playEffect(this.cat1Audio, false) : cc.audioEngine.playEffect(this.cat2Audio, false);
      },
      setMoveAction: function setMoveAction() {
        var moveAction = cc.moveBy(cc.winSize.width / this.moveSpeed / 300, cc.v2(-this.node.position.x, 0));
        return moveAction;
      },
      onCollisionStay: function onCollisionStay(other, self) {
        if (self.touchingX && this.moving) {
          var animationComponet = this.eatSprite.getComponent(cc.Animation);
          if (!this.anim) {
            switch (this.type) {
             case 4:
              this.anim = "am_fish_blackate";
              break;

             case 3:
              this.anim = "am_fish_limaoate";
              break;

             case 2:
              this.anim = "am_fish_nainiuate";
              break;

             case 1:
              this.anim = "am_fish_sanhuaate";
              break;

             default:
              this.anim = "am_fish_jucatate";
            }
            var animState = animationComponet.play(this.anim);
            animState.speed = .1;
            this.game.gameOver();
          }
        }
        self.touchingY && this.moving && this.stopBlock();
      },
      update: function update(dt) {
        this.moveAction.isDone() && this.moving && this.stopBlock();
      },
      stopBlock: function stopBlock() {
        this.node.stopAllActions();
        this.moving = false;
        this.game.blockStoped(this);
        this.isOver = true;
        var animationComponet = this.getComponent(cc.Animation);
        var amName = void 0;
        switch (this.type) {
         case 4:
          amName = "am_blackcat";
          break;

         case 3:
          amName = "am_licat";
          break;

         case 2:
          amName = "am_nainiucat";
          break;

         case 1:
          amName = "am_sanhuacat";
          break;

         default:
          amName = "am_oracat";
        }
        var animState = animationComponet.play(amName);
        animState.speed = .3;
      }
    });
    cc._RF.pop();
  }, {
    "../Utils/random": "random"
  } ],
  Wall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a279oXNoxFFI516fswAbVo", "Wall");
    "use strict";
    var WallType = cc.Enum({
      Left: 0,
      Right: 1,
      Top: 2,
      Bottom: 3
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        type: {
          default: WallType.Left,
          type: WallType
        },
        width: 5
      },
      start: function start() {
        var collider = this.getComponent(cc.BoxCollider);
        if (!collider) return;
        var node = this.node;
        var type = this.type;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        var wallWidth = this.width;
        if (type === WallType.Left) {
          node.height = height;
          node.width = wallWidth;
          node.x = 0;
          node.y = height / 2;
        } else if (type === WallType.Right) {
          node.height = height;
          node.width = wallWidth;
          node.x = width;
          node.y = height / 2;
        } else if (type === WallType.Top) {
          node.width = width;
          node.height = wallWidth;
          node.x = width / 2;
          node.y = height;
        } else if (type === WallType.Bottom) {
          node.width = width;
          node.height = wallWidth;
          node.x = 0;
          node.y = 0;
        }
        collider.size = node.getContentSize();
      }
    });
    cc._RF.pop();
  }, {} ],
  bgControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48f9e+meoFGFIj/4sjpMnOj", "bgControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var _this = this;
        this.lastY = this.node.y;
        switch (this.BackgroundType) {
         case 0:
          this.addFlowStar(0, 150);
          this.addStar(0, 140);
          this.addFrog(0, 50);
          this.addUFO(223, 0);
          break;

         case 1:
          this.addStar(0, 100);
          this.addFrog(0, 50);
          this.addFlowStar(0, 150);
          break;

         case 2:
          this.addCloudBack(0, -13);
          this.addFlowCould(0, 41);
        }
        cc.director.on("lastBlockY", function(y) {
          _this.lastBlockY = y;
        }, this);
      },
      addStar: function addStar(x, y) {
        var star = cc.instantiate(this.star);
        star.x = x;
        star.y = y;
        this.node.addChild(star);
      },
      addCloudBack: function addCloudBack(x, y) {
        var _this2 = this;
        this.root || (this.root = this.node.getParent());
        if (!this.cloudBack) {
          this.cloudBack = cc.instantiate(this.cloudBgPrefab);
          this.root.addChild(this.cloudBack);
        }
        this.cloudBack.x = x;
        this.cloudBack.y = y;
        this.cloudAni = this.cloudBack.getComponent(cc.Animation);
        cc.director.on("big_cloud_move_down", function() {
          _this2.cloudAni && _this2.cloudAni.play("move_down");
        }, this);
      },
      addFlowCould: function addFlowCould(x, y) {
        var cloud = cc.instantiate(this.cloud);
        cloud.x = x;
        cloud.y = y;
        this.node.addChild(cloud);
      },
      addFlowStar: function addFlowStar(x, y) {
        this.root || (this.root = this.node.getParent());
        var flowStarNode = cc.instantiate(this.flowStar);
        this.root.addChild(flowStarNode);
        flowStarNode.x = x;
        flowStarNode.y = y;
      },
      addFrog: function addFrog(x, y) {
        var frog = cc.instantiate(this.frogPrefab);
        frog.x = x;
        frog.y = y;
        this.node.addChild(frog);
      },
      addUFO: function addUFO(x, y) {
        var ufo = cc.instantiate(this.spaceShip);
        ufo.x = x;
        ufo.y = y;
        this.node.addChild(ufo);
      },
      start: function start() {
        cc.director.on("addHeight", this.addBgHeight, this);
        this.ani = this.node.getComponent(cc.Animation);
        this.ani && this.ani.play();
        this.root = this.node.getParent();
      },
      addBgHeight: function addBgHeight(height) {
        this.bgSprite.node.height += height;
      },
      setBgPos: function setBgPos(x, y) {
        this.node.x = x;
        this.node.y = y;
      },
      setBgScale: function setBgScale(sx, sy) {
        this.node.scaleX = sx;
        this.node.scaleY = sy;
      },
      properties: {
        bgSprite: {
          type: cc.Sprite,
          default: null
        },
        BackgroundType: {
          default: 0,
          displayName: "\u80cc\u666f\u7c7b\u578b",
          type: cc.Enum({
            Space: 0,
            Night: 1,
            Sky: 2
          })
        },
        star: {
          default: null,
          type: cc.Prefab,
          displayName: "\u661f\u661f\u52a8\u753b"
        },
        flowStar: {
          default: null,
          type: cc.Prefab,
          displayName: "\u6d41\u661f\u52a8\u753b"
        },
        cloud: {
          default: null,
          type: cc.Prefab,
          displayName: "\u767d\u4e91\u52a8\u753b"
        },
        frogPrefab: {
          default: null,
          type: cc.Prefab,
          displayName: "\u70df\u96fe\u52a8\u753b"
        },
        spaceShip: {
          default: null,
          type: cc.Prefab,
          displayName: "\u98de\u789f\u52a8\u753b"
        },
        cloudBgPrefab: {
          default: null,
          type: cc.Prefab,
          displayName: "\u767d\u4e91\u5927\u80cc\u666f"
        },
        lastY: 0,
        moveTotalY: 0,
        cloudTime: 0,
        cloudRandTime: 10,
        flowStarTime: 0,
        flowStarRandTime: 15,
        frogTime: 0,
        frogRandTime: 30,
        ufoTime: 0,
        ufoRandTime: 24,
        starTime: 0,
        starRandTime: 20,
        lastBlockY: 0
      },
      update: function update(dt) {
        this.moveTotalY += this.lastY - this.node.y;
        this.lastY = this.node.y;
        if (this.moveTotalY < 300) return;
        this.cloudTime += dt;
        this.flowStarTime += dt;
        this.frogTime += dt;
        this.ufoTime += dt;
        this.starTime += dt;
        if (this.cloudTime > this.cloudRandTime && 2 == this.BackgroundType) {
          this.cloudTime = 0;
          this.cloudRandTime = 10 + 10 * Math.random();
          this.addFlowCould(0, this.lastBlockY + 60 * Math.random());
        }
        if (this.flowStarTime > this.flowStarRandTime && 2 != this.BackgroundType) {
          this.flowStarTime = 0;
          this.flowStarRandTime = 15 + 10 * Math.random();
          this.addFlowStar(0, 150);
        }
        if (this.frogTime > this.frogRandTime && 2 != this.BackgroundType) {
          this.frogTime = 0;
          this.frogRandTime = 25 + 10 * Math.random();
          this.addFrog(0, this.lastBlockY + 60 * Math.random());
        }
        if (this.starTime > this.starRandTime && 2 != this.BackgroundType) {
          this.starTime = 0;
          this.starRandTime = 15 + 10 * Math.random();
          this.addStar(0, 300 + this.lastBlockY + 60 * Math.random());
        }
        if (this.ufoTime > this.ufoRandTime && 0 == this.BackgroundType) {
          this.ufoTime = 0;
          this.ufoRandTime = 20 + 10 * Math.random();
          this.addUFO(223, this.lastBlockY + 20 * Math.random());
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  blockSpeed: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97bd2VtYjxOXpAlxWMb4ASm", "blockSpeed");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = function(time) {
      var obj = {};
      switch (true) {
       case time >= 330:
        var quotient = Math.floor((time - 330) / 30);
        obj = {
          no: 22 + quotient,
          min: 2.5 + .1 * quotient,
          max: 2.7 + .1 * quotient
        };
        break;

       case time >= 305:
        obj = {
          no: 21,
          min: 2.4,
          max: 2.6
        };
        break;

       case time >= 280:
        obj = {
          no: 20,
          min: 2.3,
          max: 2.5
        };
        break;

       case time >= 255:
        obj = {
          no: 19,
          min: 2.2,
          max: 2.4
        };
        break;

       case time >= 230:
        obj = {
          no: 18,
          min: 2.1,
          max: 2.3
        };
        break;

       case time >= 205:
        obj = {
          no: 17,
          min: 2,
          max: 2.2
        };
        break;

       case time >= 185:
        obj = {
          no: 16,
          min: 1.9,
          max: 2.1
        };
        break;

       case time >= 165:
        obj = {
          no: 15,
          min: 1.8,
          max: 2
        };
        break;

       case time >= 150:
        obj = {
          no: 14,
          min: 1.7,
          max: 1.9
        };
        break;

       case time >= 135:
        obj = {
          no: 13,
          min: 1.6,
          max: 1.8
        };
        break;

       case time >= 120:
        obj = {
          no: 12,
          min: 1.5,
          max: 1.7
        };
        break;

       case time >= 100:
        obj = {
          no: 11,
          min: 1.4,
          max: 1.6
        };
        break;

       case time >= 80:
        obj = {
          no: 10,
          min: 1.3,
          max: 1.5
        };
        break;

       case time >= 70:
        obj = {
          no: 9,
          min: 1.2,
          max: 1.4
        };
        break;

       case time >= 60:
        obj = {
          no: 8,
          min: 1.1,
          max: 1.3
        };
        break;

       case time >= 50:
        obj = {
          no: 7,
          min: .9,
          max: 1.1
        };
        break;

       case time >= 40:
        obj = {
          no: 6,
          min: .8,
          max: 1
        };
        break;

       case time >= 30:
        obj = {
          no: 5,
          min: .7,
          max: .9
        };
        break;

       case time >= 20:
        obj = {
          no: 4,
          min: .6,
          max: .8
        };
        break;

       case time >= 12:
        obj = {
          no: 3,
          min: .5,
          max: .8
        };
        break;

       case time >= 5:
        obj = {
          no: 2,
          min: .4,
          max: .5
        };
        break;

       default:
        obj = {
          no: 1,
          min: .3,
          max: .4
        };
      }
      return obj;
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  celerx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f802958FrhFL4LPmY37Shwu", "celerx");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var bridge = {
      default: void 0,
      call: function call(b, a, c) {
        var e = "";
        "function" == typeof a && (c = a, a = {});
        a = {
          data: void 0 === a ? null : a
        };
        if ("function" == typeof c) {
          var g = "dscb" + window.dscb++;
          window[g] = c;
          a._dscbstub = g;
        }
        a = JSON.stringify(a);
        window._dsbridge ? e = _dsbridge.call(b, a) : (window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")) && (e = prompt("_dsbridge=" + b, a));
        return JSON.parse(e || "{}").data;
      },
      register: function register(b, a, c) {
        c = c ? window._dsaf : window._dsf;
        window._dsInit || (window._dsInit = !0, setTimeout(function() {
          bridge.call("_dsb.dsinit");
        }, 0));
        "object" == ("undefined" === typeof a ? "undefined" : _typeof(a)) ? c._obs[b] = a : c[b] = a;
      },
      registerAsyn: function registerAsyn(b, a) {
        this.register(b, a, !0);
      },
      hasNativeMethod: function hasNativeMethod(b, a) {
        return this.call("_dsb.hasNativeMethod", {
          name: b,
          type: a || "all"
        });
      },
      disableJavascriptDialogBlock: function disableJavascriptDialogBlock(b) {
        this.call("_dsb.disableJavascriptDialogBlock", {
          disable: !1 !== b
        });
      }
    };
    !function() {
      if (!window._dsf) {
        var b = {
          _dsf: {
            _obs: {}
          },
          _dsaf: {
            _obs: {}
          },
          dscb: 0,
          celerx: bridge,
          close: function close() {
            bridge.call("_dsb.closePage");
          },
          _handleMessageFromNative: function _handleMessageFromNative(a) {
            var e = JSON.parse(a.data), b = {
              id: a.callbackId,
              complete: !0
            }, c = this._dsf[a.method], d = this._dsaf[a.method], h = function h(a, c) {
              b.data = a.apply(c, e);
              bridge.call("_dsb.returnValue", b);
            }, k = function k(a, c) {
              e.push(function(a, c) {
                b.data = a;
                b.complete = !1 !== c;
                bridge.call("_dsb.returnValue", b);
              });
              a.apply(c, e);
            };
            if (c) h(c, this._dsf); else if (d) k(d, this._dsaf); else if (c = a.method.split("."), 
            !(2 > c.length)) {
              a = c.pop();
              var c = c.join("."), d = this._dsf._obs, d = d[c] || {}, f = d[a];
              f && "function" == typeof f ? h(f, d) : (d = this._dsaf._obs, d = d[c] || {}, (f = d[a]) && "function" == typeof f && k(f, d));
            }
          }
        }, a;
        for (a in b) window[a] = b[a];
        bridge.register("_hasJavascriptMethod", function(a, b) {
          b = a.split(".");
          if (2 > b.length) return !(!_dsf[b] && !_dsaf[b]);
          a = b.pop();
          b = b.join(".");
          return (b = _dsf._obs[b] || _dsaf._obs[b]) && !!b[a];
        });
      }
    }();
    var base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function binary_to_base64(arr) {
      var input = new Uint8Array(arr);
      var ret = new Array();
      var i = 0;
      var j = 0;
      var char_array_3 = new Array(3);
      var char_array_4 = new Array(4);
      var in_len = input.length;
      var pos = 0;
      while (in_len--) {
        char_array_3[i++] = input[pos++];
        if (3 == i) {
          char_array_4[0] = (252 & char_array_3[0]) >> 2;
          char_array_4[1] = ((3 & char_array_3[0]) << 4) + ((240 & char_array_3[1]) >> 4);
          char_array_4[2] = ((15 & char_array_3[1]) << 2) + ((192 & char_array_3[2]) >> 6);
          char_array_4[3] = 63 & char_array_3[2];
          for (i = 0; i < 4; i++) ret += base64_chars.charAt(char_array_4[i]);
          i = 0;
        }
      }
      if (i) {
        for (j = i; j < 3; j++) char_array_3[j] = 0;
        char_array_4[0] = (252 & char_array_3[0]) >> 2;
        char_array_4[1] = ((3 & char_array_3[0]) << 4) + ((240 & char_array_3[1]) >> 4);
        char_array_4[2] = ((15 & char_array_3[1]) << 2) + ((192 & char_array_3[2]) >> 6);
        char_array_4[3] = 63 & char_array_3[2];
        for (j = 0; j < i + 1; j++) ret += base64_chars.charAt(char_array_4[j]);
        while (i++ < 3) ret += "=";
      }
      return ret;
    }
    var hD = "0123456789ABCDEF";
    function dec2hex(d) {
      var h = hD.substr(15 & d, 1);
      while (d > 15) {
        d >>= 4;
        h = hD.substr(15 & d, 1) + h;
      }
      return h;
    }
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function base64_decode(input) {
      var output = new Array();
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      var orig_input = input;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      orig_input != input && alert("Warning! Characters outside Base64 range in input string ignored.");
      if (input.length % 4) {
        alert("Error: Input length is not a multiple of 4 bytes.");
        return "";
      }
      var j = 0;
      while (i < input.length) {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (15 & enc2) << 4 | enc3 >> 2;
        chr3 = (3 & enc3) << 6 | enc4;
        output[j++] = chr1;
        64 != enc3 && (output[j++] = chr2);
        64 != enc4 && (output[j++] = chr3);
      }
      return output;
    }
    var _provideScore = {
      callback: function callback() {
        return "";
      }
    };
    var _provideCurrentFrameData = {
      callback: function callback() {
        return "";
      }
    };
    bridge.register("provideScore", function() {
      return _provideScore.callback();
    });
    bridge.register("provideCurrentFrameData", function() {
      return _provideCurrentFrameData.callback();
    });
    module.exports = {
      onStateReceived: function onStateReceived(callback) {
        return bridge.register("onStateReceived", function(base64) {
          var output = base64_decode(base64);
          return callback(new Uint8Array(output));
        });
      },
      onCourtModeStarted: function onCourtModeStarted(callback) {
        return bridge.register("onCourtModeStarted", callback);
      },
      getMatch: function getMatch() {
        var result = bridge.call("getMatch", "123");
        try {
          result = JSON.parse(result);
        } catch (error) {}
        return result;
      },
      showCourtModeDialog: function showCourtModeDialog() {
        return bridge.call("showCourtModeDialog");
      },
      start: function start() {
        return bridge.call("start");
      },
      sendState: function sendState(arr) {
        return bridge.call("sendState", binary_to_base64(arr));
      },
      draw: function draw(arr) {
        return bridge.call("draw", binary_to_base64(arr));
      },
      win: function win(arr) {
        return bridge.call("win", binary_to_base64(arr));
      },
      lose: function lose(arr) {
        return bridge.call("lose", binary_to_base64(arr));
      },
      surrender: function surrender(arr) {
        return bridge.call("surrender", binary_to_base64(arr));
      },
      applyAction: function applyAction(arr, callback) {
        return bridge.call("applyAction", binary_to_base64(arr), callback);
      },
      getOnChainState: function getOnChainState(callback) {
        return bridge.call("getOnChainState", "123", function(base64) {
          var output = base64_decode(base64);
          return callback(new Uint8Array(output));
        });
      },
      getOnChainActionDeadline: function getOnChainActionDeadline(callback) {
        return bridge.call("getOnChainActionDeadline", "123", callback);
      },
      getCurrentBlockNumber: function getCurrentBlockNumber() {
        return bridge.call("getCurrentBlockNumber", "123");
      },
      finalizeOnChainGame: function finalizeOnChainGame(callback) {
        return bridge.call("finalizeOnChainGame", "123", callback);
      },
      submitScore: function submitScore(score) {
        return bridge.call("submitScore", score);
      },
      ready: function ready() {
        return bridge.call("ready");
      },
      onStart: function onStart(callback) {
        return bridge.register("onStart", callback);
      },
      provideScore: function provideScore(callback) {
        return _provideScore = {
          callback: callback
        };
      },
      provideCurrentFrameData: function provideCurrentFrameData(callback) {
        return _provideCurrentFrameData = {
          callback: callback
        };
      },
      didTakeSnapshot: function didTakeSnapshot(image) {
        return bridge.call("didTakeSnapshot", image);
      },
      log: function log(msg) {
        return bridge.call("log", msg);
      }
    };
    cc._RF.pop();
  }, {} ],
  follow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d96400vNFFPIpzg48kPuXVc", "follow");
    "use strict";
    var _blockSpeed2 = require("./blockSpeed");
    var _blockSpeed3 = _interopRequireDefault(_blockSpeed2);
    var _randomSpeed = require("./randomSpeed");
    var _randomSpeed2 = _interopRequireDefault(_randomSpeed);
    var _celerx = require("../../../lib/celerx");
    var _celerx2 = _interopRequireDefault(_celerx);
    var _random = require("../Utils/random");
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        target: {
          default: null,
          type: cc.Node
        },
        blockPrefab: {
          default: null,
          type: cc.Prefab
        },
        birdPrefab: {
          default: null,
          type: cc.Prefab
        },
        seagullPrefab: {
          default: null,
          type: cc.Prefab
        },
        scoreDisplay: {
          default: null,
          type: cc.Label
        },
        scoreLabel: {
          default: null,
          type: cc.Label
        },
        gameoverSprite: {
          default: null,
          type: cc.Sprite
        },
        hp: 1,
        doubleAudio: {
          default: null,
          type: cc.AudioClip
        },
        highAudio: {
          default: null,
          type: cc.AudioClip
        },
        hurtAudio: {
          default: null,
          type: cc.AudioClip
        },
        idleAudio: {
          default: null,
          type: cc.AudioClip
        },
        gameoverAudio: {
          default: null,
          type: cc.AudioClip
        },
        bgSprite: {
          default: null,
          type: cc.Node
        },
        gameoverFont: {
          default: null,
          type: cc.Node
        },
        comboFont: {
          default: null,
          type: cc.Node
        },
        muteButton: {
          default: null,
          type: cc.Sprite
        },
        isMuteSprite: {
          default: null,
          type: cc.SpriteFrame
        },
        notMuteSprite: {
          default: null,
          type: cc.SpriteFrame
        },
        aeCombobuff: {
          default: null,
          type: cc.Node
        },
        flyHoursePrefab: {
          default: null,
          type: cc.Prefab
        },
        blockRoot: {
          default: null,
          type: cc.Animation,
          displayName: "\u5c0f\u732b\u6839\u8282\u70b9"
        },
        comboPrefab: {
          type: cc.Prefab,
          default: null
        },
        gameOverFishNormal: {
          type: cc.SpriteFrame,
          default: null
        },
        gameOverFishSuper: {
          type: cc.SpriteFrame,
          default: null
        }
      },
      onLoad: function onLoad() {
        this.level = 0;
        this.gameOn = false;
        this.score = 0;
        if (!this.target) return;
        this.target.getComponent("HeroControl").game = this;
        this.timer = 1;
        this.lastBird = 0;
        this.isMute = false;
        this.combo = 0;
        this.addNewBlock = false;
      },
      start: function start() {},
      startTimer: function startTimer() {
        this.schedule(function() {
          this.timer++;
          this.timer % 10 === 0 && cc.audioEngine.playEffect(this.idleAudio, false);
        }, 1);
      },
      addBlock: function addBlock() {
        var newBlock = cc.instantiate(this.blockPrefab);
        var blockDirection = (0, _random.getRandom)() < .5 ? -1 : 1;
        var blockComponent = newBlock.getComponent("PlatformMotion");
        newBlock.setPosition(this.getNewStarPosition(blockDirection, true));
        blockComponent.type = Math.floor((0, _random.getRandom)() / .2);
        blockComponent.game = this;
        var obj = {
          no: 0,
          probability: 0,
          speed: 0
        };
        for (var key in _randomSpeed2.default) {
          if (key > this.timer) break;
          obj = _randomSpeed2.default[key];
        }
        var _blockSpeed = (0, _blockSpeed3.default)(this.timer), min = _blockSpeed.min, max = _blockSpeed.max;
        if ((0, _random.getRandom)() < obj.probability) {
          min = obj.speed;
          max = obj.speed;
        }
        blockComponent.moveSpeed = (0, _random.getRandom)() * (max - min) + min;
        newBlock.scaleX = blockDirection;
        this.newBlock = newBlock;
        this.addNewBlock = true;
        this.score > 5 && cc.director.emit("lastBlockY", newBlock.y);
        this.node.addChild(newBlock, this.score + 1);
      },
      addHourse: function addHourse() {
        var flyHourse = cc.instantiate(this.flyHoursePrefab);
        flyHourse.setPosition(-267, 450 + 50 * Math.random() + 40 * (this.level - 5));
        var ani = flyHourse.getComponent(cc.Animation);
        if (ani) {
          ani.play();
          ani.once("finished", function() {
            flyHourse.removeFromParent(true);
          });
          this.node.addChild(flyHourse, -10);
        }
      },
      addBird: function addBird(prefab) {
        var newBird = cc.instantiate(prefab);
        var birdDirection = (0, _random.getRandom)() < .5 ? -1 : 1;
        newBird.setPosition(this.getNewStarPosition(birdDirection, false));
        newBird.getComponent("Bird").game = this;
        newBird.scaleX = birdDirection;
        this.node.addChild(newBird);
      },
      getNewStarPosition: function getNewStarPosition(blockDirection, block) {
        var width = this.blockPrefab.data.width;
        var height = 40;
        var randX = (cc.winSize.width + width) * blockDirection / 2;
        var randY = height / 2 + height * this.level + 25;
        block && this.level++;
        return cc.v2(randX, randY);
      },
      changeBlockParent: function changeBlockParent(block) {
        var _this = this;
        setTimeout(function() {
          block.node.parent = _this.blockRoot.node;
        }, 2e3);
      },
      blockStoped: function blockStoped(block) {
        this.lastBlock && this.changeBlockParent(this.lastBlock);
        this.lastBlock = block;
        if (this.gameOn) {
          var HeroControl = this.target.getComponent("HeroControl");
          if (Math.abs(this.lastX - block.node.x) < 20) {
            this.addScore(2);
            cc.audioEngine.playEffect(this.doubleAudio, false);
            this.combo++;
            if (this.combo >= 4) {
              if (!this.comboEffect) {
                this.comboEffect = cc.instantiate(this.comboPrefab);
                this.comboEffect.x = this.lastBlock.node.x;
              }
              this.comboEffect.y = 50;
              this.comboEffect.parent = this.lastBlock.node;
              this.comboEffect.getComponent("ComboEffect").setHeight(this.lastBlock.node.y + 50);
            }
          } else {
            this.comboEffect = null;
            this.addScore(1);
            this.combo = 0;
          }
          HeroControl && (HeroControl.isSuper = this.combo >= 3);
          HeroControl && HeroControl.playIdleAnimation();
          HeroControl && (HeroControl.bottomLine += 40);
          this.lastX = block.node.x;
          this.addComponent();
          if (this.score > 5) {
            this.node.runAction(cc.jumpBy(.6, cc.v2(0, -40), -5, 1));
            cc.director.emit("addHeight", 100);
          }
        }
      },
      birdStoped: function birdStoped(bird) {
        if (this.gameOn) {
          this.addScore(3);
          this.addComponent();
        }
      },
      addScore: function addScore(s) {
        var _this2 = this;
        this.score += s;
        this.score % 100 === 0 && cc.audioEngine.playEffect(this.highAudio, false);
        this.score % 50 === 0 && this.addHourse();
        this.score > 20 && this.blockRoot.play();
        this.scoreLabel.string = "/" + s;
        var ani = this.scoreLabel.node.getComponent(cc.Animation);
        if (ani) {
          ani.stop();
          ani.play();
        } else setTimeout(function() {
          _this2.scoreLabel.string = "";
        }, 700);
        this.scoreDisplay.string = this.score;
      },
      addComponent: function addComponent() {
        var birdPro = 0, seagullPro = 0;
        switch (true) {
         case this.timer >= 70:
          birdPro = .5;

         case this.timer >= 40:
          seagullPro = .3;
        }
        var random = (0, _random.getRandom)();
        if (this.timer < this.lastBird + 10 || random > birdPro + seagullPro) this.addBlock(); else {
          this.lastBird = this.timer;
          random > birdPro ? this.addBird(this.seagullPrefab) : this.addBird(this.birdPrefab);
        }
      },
      gameOver: function gameOver() {
        var _this3 = this;
        this.hp--;
        if (this.hp < 1 && this.gameOn) {
          if (this.newBlock) {
            this.newBlock.parent = this.blockRoot.node;
            this.blockRoot.node.zIndex = Infinity;
          }
          cc.audioEngine.setFinishCallback(cc.audioEngine.playEffect(this.hurtAudio, false), function() {
            cc.audioEngine.playEffect(_this3.gameoverAudio, false);
          });
          this.target.opacity = 0;
          var animationComponet = this.gameoverSprite.getComponent(cc.Animation);
          this.combo >= 3 ? this.gameoverSprite.spriteFrame = this.gameOverFishSuper : this.gameoverSprite.spriteFrame = this.gameOverFishNormal;
          animationComponet.play("am_fish_ate");
          this.gameOn = false;
          this.gameoverFont.opacity = 255;
          this.combo = 0;
          if (this.score >= 20) {
            var camera = cc.Camera.findCamera(this.node);
            if (camera) {
              var ani = camera.node.getComponent(cc.Animation);
              ani && ani.play();
            }
          }
          setTimeout(function() {
            _celerx2.default.submitScore(_this3.score);
          }, 5e3);
        }
      },
      muteButtonClick: function muteButtonClick() {
        this.isMute = !this.isMute;
        if (this.isMute) {
          cc.audioEngine.setMusicVolume(0);
          cc.audioEngine.setEffectsVolume(0);
          this.muteButton.spriteFrame = this.isMuteSprite;
        } else {
          cc.audioEngine.setMusicVolume(1);
          cc.audioEngine.setEffectsVolume(1);
          this.muteButton.spriteFrame = this.notMuteSprite;
        }
      },
      update: function update() {
        if (this.combo < 3) {
          this.aeCombobuff.opacity = 0;
          this.comboFont.opacity = 0;
        } else {
          this.aeCombobuff.opacity = 255;
          this.comboFont.opacity = 255;
        }
        var HeroControl = this.target.getComponent("HeroControl");
        if (this.addNewBlock && this.newBlock && Math.abs(this.newBlock.x - HeroControl.node.x) <= 120) {
          HeroControl.onTouchStart();
          this.addNewBlock = false;
          HeroControl.direction = 0;
        }
      },
      lateUpdate: function lateUpdate() {
        this.bgRoot ? this.bgRoot.y = this.node.y - 10 : this.bgRoot = this.bgSprite.getChildByName("bgPrefab");
      }
    });
    cc._RF.pop();
  }, {
    "../../../lib/celerx": "celerx",
    "../Utils/random": "random",
    "./blockSpeed": "blockSpeed",
    "./randomSpeed": "randomSpeed"
  } ],
  randomSpeed: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c54a843p3ZLsKUtUpMQeyce", "randomSpeed");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      30: {
        no: 1,
        probability: .1,
        speed: 1
      },
      90: {
        no: 3,
        probability: .1,
        speed: .9
      },
      120: {
        no: 4,
        probability: .1,
        speed: .8
      },
      180: {
        no: 6,
        probability: .2,
        speed: 1.4
      },
      210: {
        no: 7,
        probability: .2,
        speed: 1.5
      },
      240: {
        no: 8,
        probability: .2,
        speed: 1
      },
      270: {
        no: 9,
        probability: .2,
        speed: .9
      },
      300: {
        no: 10,
        probability: .2,
        speed: 2
      },
      330: {
        no: 11,
        probability: .2,
        speed: 2.5
      },
      360: {
        no: 12,
        probability: .25,
        speed: 3
      },
      390: {
        no: 13,
        probability: .25,
        speed: .8
      },
      420: {
        no: 14,
        probability: .25,
        speed: .9
      },
      450: {
        no: 15,
        probability: .25,
        speed: .8
      },
      480: {
        no: 16,
        probability: .25,
        speed: 1.4
      },
      510: {
        no: 17,
        probability: .25,
        speed: 1.5
      },
      540: {
        no: 18,
        probability: .25,
        speed: 1
      },
      570: {
        no: 19,
        probability: .3,
        speed: .9
      },
      600: {
        no: 20,
        probability: .3,
        speed: .8
      },
      630: {
        no: 21,
        probability: .3,
        speed: 1.4
      },
      660: {
        no: 22,
        probability: .3,
        speed: 1.5
      },
      690: {
        no: 23,
        probability: .3,
        speed: 1
      },
      720: {
        no: 24,
        probability: .3,
        speed: .9
      },
      750: {
        no: 25,
        probability: .3,
        speed: 2
      },
      780: {
        no: 26,
        probability: .3,
        speed: 2.5
      },
      810: {
        no: 27,
        probability: .3,
        speed: 3
      },
      840: {
        no: 28,
        probability: .3,
        speed: .8
      },
      870: {
        no: 29,
        probability: .3,
        speed: .9
      },
      900: {
        no: 30,
        probability: .3,
        speed: .8
      },
      930: {
        no: 31,
        probability: .3,
        speed: 3
      },
      960: {
        no: 32,
        probability: .3,
        speed: 1.5
      },
      990: {
        no: 33,
        probability: .3,
        speed: 1
      },
      1020: {
        no: 34,
        probability: .3,
        speed: .9
      },
      1050: {
        no: 35,
        probability: .3,
        speed: .8
      },
      1080: {
        no: 36,
        probability: .3,
        speed: 1.4
      },
      1110: {
        no: 37,
        probability: .3,
        speed: 1.5
      },
      1140: {
        no: 38,
        probability: .3,
        speed: 1
      },
      1170: {
        no: 39,
        probability: .3,
        speed: .9
      },
      1200: {
        no: 40,
        probability: .3,
        speed: 2
      },
      1230: {
        no: 41,
        probability: .3,
        speed: 2.5
      },
      1260: {
        no: 42,
        probability: .3,
        speed: 3
      },
      1290: {
        no: 43,
        probability: .3,
        speed: .8
      },
      1320: {
        no: 44,
        probability: .3,
        speed: 2
      },
      1350: {
        no: 45,
        probability: .3,
        speed: .8
      },
      1380: {
        no: 46,
        probability: .3,
        speed: 1.4
      },
      1410: {
        no: 47,
        probability: .3,
        speed: 1.5
      },
      1440: {
        no: 48,
        probability: .3,
        speed: 1
      },
      1470: {
        no: 49,
        probability: .3,
        speed: .9
      },
      1500: {
        no: 50,
        probability: .3,
        speed: .8
      },
      1530: {
        no: 51,
        probability: .3,
        speed: 1.4
      },
      1560: {
        no: 52,
        probability: .3,
        speed: 1.5
      },
      1590: {
        no: 53,
        probability: .3,
        speed: 1
      },
      1620: {
        no: 54,
        probability: .3,
        speed: .9
      },
      1650: {
        no: 55,
        probability: .3,
        speed: 2
      },
      1680: {
        no: 56,
        probability: .3,
        speed: 2.5
      },
      1710: {
        no: 57,
        probability: .3,
        speed: 3
      },
      1740: {
        no: 58,
        probability: .3,
        speed: .8
      },
      1770: {
        no: 59,
        probability: .3,
        speed: .9
      },
      1800: {
        no: 60,
        probability: .3,
        speed: .8
      },
      1830: {
        no: 61,
        probability: .3,
        speed: 1.4
      },
      1860: {
        no: 62,
        probability: .3,
        speed: 1.5
      },
      1890: {
        no: 63,
        probability: .3,
        speed: 1
      },
      1920: {
        no: 64,
        probability: .3,
        speed: .9
      },
      1950: {
        no: 65,
        probability: .3,
        speed: .8
      },
      1980: {
        no: 66,
        probability: .3,
        speed: 1.4
      },
      2010: {
        no: 67,
        probability: .3,
        speed: 1.5
      },
      2040: {
        no: 68,
        probability: .3,
        speed: 1
      },
      2070: {
        no: 69,
        probability: .3,
        speed: .9
      },
      2100: {
        no: 70,
        probability: .3,
        speed: 2
      },
      2130: {
        no: 71,
        probability: .3,
        speed: 2.5
      },
      2160: {
        no: 72,
        probability: .3,
        speed: 3
      },
      2190: {
        no: 73,
        probability: .3,
        speed: .8
      },
      2220: {
        no: 74,
        probability: .3,
        speed: .9
      },
      2250: {
        no: 75,
        probability: .3,
        speed: .8
      },
      2280: {
        no: 76,
        probability: .3,
        speed: 1.4
      },
      2310: {
        no: 77,
        probability: .3,
        speed: 1.5
      }
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  random: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cab50QLmFNPqoJCwUzjzV40", "random");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var randomSeed = 0;
    function seededRandom(seed, min, max) {
      seed = (9301 * seed + 49297) % 233280;
      var rand = seed / 233280;
      return min + rand * (max - min);
    }
    function setSeed(seed) {
      randomSeed = seed;
    }
    function getRandom(min, max) {
      var seed = randomSeed;
      min = min || 0;
      max = max || 1;
      var result = seededRandom(seed, min, max);
      randomSeed += Math.floor(seededRandom(seed, 1, 1e5));
      return result;
    }
    exports.default = {
      setSeed: setSeed,
      getRandom: getRandom
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ]
}, {}, [ "AniRemove", "Bird", "ComboEffect", "HeroControl", "bgControl", "blockSpeed", "follow", "randomSpeed", "Canvas", "PlatformMotion", "Wall", "random", "celerx" ]);