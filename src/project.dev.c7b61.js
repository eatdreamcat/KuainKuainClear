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
  AudioController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76488zQCU1KqLU6loyhNNZ5", "AudioController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HashMap_1 = require("../exts/HashMap");
    var EventManager_1 = require("./EventManager");
    var EventName_1 = require("./EventName");
    var AudioController = function() {
      function AudioController() {
        this.audioID = {};
        this.clips = new HashMap_1.HashMap();
      }
      Object.defineProperty(AudioController, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new AudioController();
        },
        enumerable: true,
        configurable: true
      });
      AudioController.prototype.init = function(callback) {
        console.warn(" start load AudioClip ");
        var self = this;
        cc.loader.loadResDir("preLoadSounds", cc.AudioClip, function(err, clips, urls) {
          if (err) console.error(err); else {
            for (var _i = 0, clips_1 = clips; _i < clips_1.length; _i++) {
              var clip = clips_1[_i];
              self.clips.add(clip.name, clip);
            }
            self.initEvent();
            callback && callback();
          }
        });
      };
      AudioController.prototype.initEvent = function() {
        var _this = this;
        EventManager_1.gEventMgr.targetOff(this);
        this.audioID["bgm"] = this.play("normal_bgm", true, 1.5, true);
        console.log("this.audioID bgm = ", null === this.audioID["bgm"]);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_KILL_EFFECT, function() {
          _this.audioID["fruit_break"] = _this.play("fruit_break");
          cc.audioEngine.setFinishCallback(_this.audioID["fruit_break"], function() {
            this.audioID["fruit_break"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_30_BGM, function() {
          null != _this.audioID["bgm"] && _this.stop(_this.audioID["bgm"]);
          _this.audioID["time_counting"] = _this.play("time_counting", true, 10);
          _this.audioID["bgm"] = _this.play("bgm_30secs", true, 1.5, true);
          null == _this.audioID["specialA_bgm"] && null == _this.audioID["specialB_bgm"] || cc.audioEngine.pause(_this.audioID["bgm"]);
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.GAME_RESTART, function() {
          null != _this.audioID["bgm"] && _this.stop(_this.audioID["bgm"]);
          null != _this.audioID["time_counting"] && _this.stop(_this.audioID["time_counting"]);
          _this.audioID["bgm"] = _this.play("normal_bgm", true, 1.5, true);
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_LETSGO, function() {
          _this.audioID["letsgo"] = _this.play("letsgo");
          cc.audioEngine.setFinishCallback(_this.audioID["letsgo"], function() {
            this.audioID["letsgo"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_BIU, function() {
          _this.audioID["biu"] = _this.play("biu", false, .5);
          cc.audioEngine.setFinishCallback(_this.audioID["biu"], function() {
            this.audioID["biu"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_TOUCH, function() {
          _this.audioID["touch"] = _this.play("touch");
          cc.audioEngine.setFinishCallback(_this.audioID["touch"], function() {
            this.audioID["touch"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_PLACE, function() {
          _this.audioID["lay"] = _this.play("lay");
          cc.audioEngine.setFinishCallback(_this.audioID["lay"], function() {
            this.audioID["lay"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_TEXT, function(name) {
          _this.audioID[name] = _this.play(name);
          cc.audioEngine.setFinishCallback(_this.audioID[name], function() {
            this.audioID[name] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_A_BGM, function(play) {
          console.log(" SpecialA_bgm:", play);
          if (play) {
            null != _this.audioID["bgm"] && cc.audioEngine.pause(_this.audioID["bgm"]);
            _this.audioID["SpecialA_bgm"] = _this.play("SpecialA_bgm", true);
          } else {
            null != _this.audioID["bgm"] && cc.audioEngine.resume(_this.audioID["bgm"]);
            if (null != _this.audioID["SpecialA_bgm"]) {
              cc.audioEngine.stop(_this.audioID["SpecialA_bgm"]);
              _this.audioID["SpecialA_bgm"] = null;
            }
          }
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_B_BGM, function(play) {
          console.log(" SpecialB_bgm:", play);
          if (play) {
            null != _this.audioID["bgm"] && cc.audioEngine.pause(_this.audioID["bgm"]);
            _this.audioID["SpecialB_bgm"] = _this.play("SpecialB_bgm", true);
          } else {
            null != _this.audioID["bgm"] && cc.audioEngine.resume(_this.audioID["bgm"]);
            if (null != _this.audioID["SpecialB_bgm"]) {
              cc.audioEngine.stop(_this.audioID["SpecialB_bgm"]);
              _this.audioID["SpecialB_bgm"] = null;
            }
          }
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER, function() {
          null != _this.audioID["time_counting"] && _this.stop(_this.audioID["time_counting"]);
          _this.audioID["over"] = _this.play("over");
          cc.audioEngine.setFinishCallback(_this.audioID["over"], function() {
            this.audioID["over"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER_NO_PLACE, function() {
          _this.audioID["over_no_place"] = _this.play("over_no_place");
          cc.audioEngine.setFinishCallback(_this.audioID["over_no_place"], function() {
            this.audioID["over_no_place"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_LAY_FAIL, function() {
          _this.audioID["lay_fail"] = _this.play("lay_fail");
          cc.audioEngine.setFinishCallback(_this.audioID["lay_fail"], function() {
            this.audioID["lay_fail"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER_TIME_UP, function() {
          _this.audioID["frezon"] = _this.play("frezon");
          cc.audioEngine.setFinishCallback(_this.audioID["frezon"], function() {
            this.audioID["frezon"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER_TAB, function() {
          _this.audioID["over_biu"] = _this.play("over_biu");
          cc.audioEngine.setFinishCallback(_this.audioID["over_biu"], function() {
            this.audioID["over_biu"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SCORE, function(isPlay) {
          if (isPlay) _this.audioID["score"] = _this.play("score", true, 5); else if (null != _this.audioID["score"]) {
            _this.stop(_this.audioID["score"]);
            _this.audioID["score"] = null;
          }
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_A, function() {
          console.log(" specialA -----------------------------", _this.audioID["specialA"]);
          _this.audioID["specialA"] = _this.play("specialA", false, 1.5);
          cc.audioEngine.setFinishCallback(_this.audioID["specialA"], function() {
            this.audioID["specialA"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_B, function() {
          console.log(" specialB -----------------------------", _this.audioID["specialB"]);
          _this.audioID["specialB"] = _this.play("specialB", false, 1.5);
          cc.audioEngine.setFinishCallback(_this.audioID["specialB"], function() {
            this.audioID["specialB"] = null;
          }.bind(_this));
        }, this);
      };
      AudioController.prototype.stop = function(audioID, clipName) {
        if (AudioController.canPlay) cc.audioEngine.stop(audioID); else for (var _i = 0, _a = AudioController.PlayedList; _i < _a.length; _i++) {
          var clipItem = _a[_i];
          clipItem.skip = clipItem.clipName == clipName;
        }
      };
      AudioController.prototype.play = function(clipName, loop, volume, isBgm, timePass) {
        var _this = this;
        void 0 === loop && (loop = false);
        void 0 === volume && (volume = 1);
        void 0 === isBgm && (isBgm = false);
        void 0 === timePass && (timePass = 0);
        if (!AudioController.canPlay && !AudioController.hasBindTouch) {
          AudioController.hasBindTouch = true;
          var self_1 = this;
          var playFunc_1 = function() {
            cc.game.canvas.removeEventListener("touchstart", playFunc_1);
            AudioController.canPlay = true;
            var item;
            while ((item = AudioController.PlayedList.pop()) && self_1.clips.get(item.clipName) && !item.skip) {
              var audioID = cc.audioEngine.play(self_1.clips.get(item.clipName), item.loop, item.volume);
              if (item.isBgm) {
                self_1.audioID["bgm"] = audioID;
                cc.audioEngine.setCurrentTime(audioID, (Date.now() - item.supTime) / 1e3 % cc.audioEngine.getDuration(audioID));
              } else cc.audioEngine.setCurrentTime(audioID, (Date.now() - item.supTime) / 1e3);
            }
          };
          cc.game.canvas.addEventListener("touchstart", playFunc_1);
        }
        if (!this.clips.get(clipName)) {
          var now_1 = Date.now();
          cc.loader.loadRes("sounds/" + clipName, cc.AudioClip, function(err, clip) {
            if (err) console.error(err); else {
              _this.clips.add(clip.name, clip);
              var pass = (Date.now() - now_1) / 1e3;
              _this.audioID[clipName] = _this.play(clipName, loop, volume, isBgm, pass);
            }
          });
          return -1;
        }
        if (AudioController.canPlay) {
          var audioID = cc.audioEngine.play(this.clips.get(clipName), loop, volume);
          cc.audioEngine.setCurrentTime(audioID, timePass % cc.audioEngine.getDuration(audioID));
          return audioID;
        }
        AudioController.PlayedList.push({
          clipName: clipName,
          loop: loop,
          volume: volume,
          supTime: Date.now() - timePass / 1e3,
          skip: false,
          isBgm: isBgm
        });
        return -2;
      };
      AudioController.PlayedList = [];
      AudioController.canPlay = cc.sys.os.toLowerCase() != cc.sys.OS_IOS.toLowerCase();
      AudioController.hasBindTouch = false;
      return AudioController;
    }();
    exports.gAudio = AudioController.inst;
    cc._RF.pop();
  }, {
    "../exts/HashMap": "HashMap",
    "./EventManager": "EventManager",
    "./EventName": "EventName"
  } ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7419cx/DDRG86x2LiwgMtL9", "Config");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Config = {
      FPS: 60,
      WinSize: cc.size(1080, 1920),
      Grid: cc.v2(8, 8),
      GameTime: 180
    };
    true, window["Config"] = exports.Config;
    cc._RF.pop();
  }, {} ],
  CubeBg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1d5137ZNhJsZAlX67esxnT", "CubeBg");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager_1 = require("../Controller/EventManager");
    var EventName_1 = require("../Controller/EventName");
    var GameMgr_1 = require("./GameMgr");
    var Config_1 = require("../Config/Config");
    var TableMgr_1 = require("../TableMgr");
    var GameFactory_1 = require("../Controller/GameFactory");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CubeBg = function(_super) {
      __extends(CubeBg, _super);
      function CubeBg() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cube = null;
        _this.yingtao = null;
        _this.pingguo = null;
        _this.fanqie = null;
        _this.mihoutao = null;
        _this.boluo = null;
        _this.chengzi = null;
        _this.icon_daoju_B = null;
        _this.icon_daoju_A = null;
        _this.SpecialKill = null;
        _this.index = 0;
        _this.OldFruitID = 2e4;
        _this.available = false;
        _this.preRowFlag = false;
        _this.preColFlag = false;
        _this.isPlaying = false;
        _this.isDirectlyKill = false;
        _this.isPlaySpecial = false;
        return _this;
      }
      CubeBg.prototype.reuse = function() {
        this.OldFruitID = 2e4;
        this.fruitData = TableMgr_1.TableMgr.inst.getFruits(this.OldFruitID);
        this.isPlaying = false;
        this.index = arguments[0][0];
        this.SpecialKill.node.active = false;
        this.cube.node.active = false;
        this.cube.node.opacity = 255;
        this.node.runAction(cc.sequence(cc.scaleTo(0, .9), cc.scaleTo(.1, 1.1), cc.scaleTo(.2, 1), cc.callFunc(this.ready.bind(this), this)));
        this.initEvent();
      };
      CubeBg.prototype.ready = function() {
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_BIU);
        if (GameMgr_1.Game.getCubeIndex()[this.index] > 0) {
          this.available = true;
          this.setAvailable(false, true);
        } else {
          this.available = false;
          this.setAvailable(true);
        }
      };
      CubeBg.prototype.unuse = function() {
        this.available = false;
        EventManager_1.gEventMgr.targetOff(this);
      };
      CubeBg.prototype.initEvent = function() {
        var _this = this;
        EventManager_1.gEventMgr.targetOff(this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.CUBE_BOX_DRAG_CANCEL, this.onDragCancel, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.CUBE_BOX_DRAG_INDEX, this.onDragIndex, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.CUBE_BOX_PLACE_DONE, this.placeDone, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.EAT_COL, this.eatCol, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.EAT_ROW, this.eatRow, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.KILL_DIRECTLY, this.killDirectly, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.GAME_OVER, this.onGameOver, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.CLEAR_CUBE_ROOT, this.clear, this);
        this.cube.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.onKillFinished, this);
        this.cube.getComponent(cc.Animation).on(cc.Animation.EventType.STOP, function() {
          _this.cube.node.scale = 1;
        }, this);
        this.cube.getComponent(cc.Animation).on(cc.Animation.EventType.RESUME, function() {
          _this.cube.node.scale = 2;
        }, this);
        this.cube.getComponent(cc.Animation).on(cc.Animation.EventType.PAUSE, function() {
          _this.cube.node.scale = 1;
        }, this);
        this.SpecialKill.on(cc.Animation.EventType.FINISHED, this.onSpecialAniDone, this);
      };
      CubeBg.prototype.clear = function() {
        GameFactory_1.gFactory.putCubeBg(this.node);
      };
      CubeBg.prototype.onGameOver = function(type) {
        var _this = this;
        var icon = type == GameMgr_1.OverType.NO_PLACE ? this.fruitData.FailedIcon : this.fruitData.FrozenIcon;
        cc.loader.loadRes("Textures/Fruits/" + icon, cc.SpriteFrame, function(err, spriteFrame) {
          err ? console.error(" load fail icon failed:", err) : setTimeout(function() {
            _this.cube.spriteFrame = spriteFrame;
            GameMgr_1.Game.addOverCount();
          }, _this.index / 60 * 1e3);
        });
      };
      CubeBg.prototype.eatCol = function(colIndex) {
        if (this.isAvailable()) return;
        for (var _i = 0, colIndex_1 = colIndex; _i < colIndex_1.length; _i++) {
          var index = colIndex_1[_i];
          if (this.index % Config_1.Config.Grid.x == index) {
            this.onKill(30 * Math.floor(this.index / 8));
            break;
          }
        }
      };
      CubeBg.prototype.killDirectly = function() {
        if (this.isAvailable()) return;
        if (this.isDirectlyKill) {
          this.isDirectlyKill = false;
          this.onKill(this.index % 8 * 30);
        }
      };
      CubeBg.prototype.eatRow = function(rowIndex) {
        if (this.isAvailable()) return;
        for (var _i = 0, rowIndex_1 = rowIndex; _i < rowIndex_1.length; _i++) {
          var index = rowIndex_1[_i];
          if (this.index >= index * Config_1.Config.Grid.x && this.index < (index + 1) * Config_1.Config.Grid.x) {
            this.onKill(this.index % 8 * 30);
            break;
          }
        }
      };
      CubeBg.prototype.onSpecialAniDone = function() {
        this.SpecialKill.node.active = false;
      };
      CubeBg.prototype.onKill = function(delay) {
        void 0 === delay && (delay = 0);
        this.isPlaying = true;
        GameMgr_1.Game.addScore(this.fruitData.Score);
        GameMgr_1.Game.addFruitKill(this.fruitData.ID);
        GameMgr_1.Game.addFruitScore(this.fruitData.ID, this.fruitData.Score);
        var ani = this.fruitData.KillAni;
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.ON_KILL);
        if (this.isPlaySpecial) {
          this.isPlaySpecial = false;
          10032 == this.fruitData.ID ? EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_A) : EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_B);
        }
        setTimeout(function() {
          if (this.isPlaying) {
            this.cube.node.scale = 2;
            this.cube.getComponent(cc.Animation).play(ani, 0).speed = 1;
          }
        }.bind(this), delay);
        this.setAvailable(true);
      };
      CubeBg.prototype.onKillFinished = function() {
        this.cube.node.scale = 1;
        this.isPlaying = false;
        if (this.isAvailable()) if (this.cube.node.active && this.cube.node.opacity < 255) ; else {
          this.cube.node.active = false;
          this.cube.node.opacity = 255;
        }
      };
      CubeBg.prototype.preCol = function(colIndex) {
        for (var _i = 0, colIndex_2 = colIndex; _i < colIndex_2.length; _i++) {
          var index = colIndex_2[_i];
          if (this.index % Config_1.Config.Grid.x == index) {
            this.preColFlag = true;
            break;
          }
          this.preColFlag = false;
        }
      };
      CubeBg.prototype.preRow = function(rowIndex) {
        for (var _i = 0, rowIndex_2 = rowIndex; _i < rowIndex_2.length; _i++) {
          var index = rowIndex_2[_i];
          if (this.index >= index * Config_1.Config.Grid.x && this.index < (index + 1) * Config_1.Config.Grid.x) {
            this.preRowFlag = true;
            break;
          }
          this.preRowFlag = false;
        }
      };
      CubeBg.prototype.onDragIndex = function(indexArr, shapeID, killDirectly, centerPoint) {
        if (!GameMgr_1.Game.isStart) return;
        GameMgr_1.Game.killDirectlyCount = 0;
        if (killDirectly && killDirectly.length > 0) {
          this.isDirectlyKill = killDirectly.indexOf(this.index) >= 0;
          GameMgr_1.Game.killDirectlyCount++;
        } else {
          this.isDirectlyKill = false;
          GameMgr_1.Game.killDirectlyCount--;
        }
        centerPoint && centerPoint.length > 0 ? this.isPlaySpecial = centerPoint.indexOf(this.index) >= 0 : this.isPlaySpecial = false;
        if (this.available) {
          var isReady = indexArr.indexOf(this.index) >= 0;
          this.cube.node.active = isReady || this.isPlaying;
          isReady && (this.cube.node.opacity = 150);
          if (this.cube.node.active && this.cube.node.opacity < 255) {
            GameMgr_1.Game.setPreCubeIndex(this.index, this.fruitData.Score);
            if (this.isPlaying) {
              this.cube.getComponent(cc.Animation).stop();
              this.isPlaying = false;
            }
            this.OldFruitID = GameMgr_1.Game.curSelectFruitID;
            this.updateFruitData(GameMgr_1.Game.curSelectFruitID);
          } else GameMgr_1.Game.resetPreCubeIndex(this.index);
        } else {
          indexArr.indexOf(this.index) >= 0 && GameMgr_1.Game.dragCount--;
          GameMgr_1.Game.setPreCubeIndex(this.index, this.fruitData.Score);
        }
        this.preCheck();
      };
      CubeBg.prototype.updateFruitData = function(fruitID) {
        this.fruitData = TableMgr_1.TableMgr.inst.getFruits(fruitID);
        if (this.isPlaying) return;
        this.cube.spriteFrame = this[this.fruitData.Icon];
      };
      CubeBg.prototype.preCheck = function() {
        var eatIndex = GameMgr_1.Game.checkRowCol(GameMgr_1.Game.getPreCubeIndex());
        var rowIndex = eatIndex[0];
        var colIndex = eatIndex[1];
        this.preRowFlag = false;
        this.preColFlag = false;
        colIndex.length > 0 ? this.preCol(colIndex) : this.preColFlag = false;
        rowIndex.length > 0 ? this.preRow(rowIndex) : this.preRowFlag = false;
        var data = TableMgr_1.TableMgr.inst.getFruits(GameMgr_1.Game.curSelectFruitID);
        data && this.cube.node.active && this.cube.node.opacity < 255 && GameMgr_1.Game.addPreScore(data.BaseScore);
        (this.preRowFlag || this.preColFlag || this.isDirectlyKill) && GameMgr_1.Game.addPreScore(data.Score);
        this.preRowFlag || this.preColFlag || this.isDirectlyKill ? this.shake(true) : this.shake(false);
      };
      CubeBg.prototype.shake = function(isShake) {
        if (isShake) {
          this.updateFruitData(GameMgr_1.Game.curSelectFruitID);
          if (this.cube.node.getNumberOfRunningActions() > 0) return;
          var shake = cc.repeatForever(cc.sequence(cc.rotateTo(.03, -4), cc.rotateTo(.03, 0), cc.rotateBy(.03, 4), cc.rotateTo(.03, 0)));
          this.cube.node.runAction(shake);
        } else {
          this.cube.node.stopAllActions();
          this.updateFruitData(this.OldFruitID);
          this.cube.node.rotation = 0;
        }
      };
      CubeBg.prototype.getIndex = function() {
        return this.index;
      };
      CubeBg.prototype.isAvailable = function() {
        return this.available;
      };
      CubeBg.prototype.setAvailable = function(available, isTest) {
        void 0 === isTest && (isTest = false);
        if (this.available == available) return;
        this.available = available;
        if (this.available) {
          GameMgr_1.Game.resetCubeIndex(this.index);
          GameMgr_1.Game.resetPreCubeIndex(this.index);
          GameMgr_1.Game.addAvailableCount(1);
          this.cube.node.active = this.isPlaying;
        } else {
          GameMgr_1.Game.setCubeIndex(this.index, this.fruitData.Score);
          GameMgr_1.Game.setPreCubeIndex(this.index, this.fruitData.Score);
          isTest || GameMgr_1.Game.addAvailableCount(-1);
          this.cube.node.opacity = 255;
          this.cube.node.active = true;
          this.cube.getComponent(cc.Animation).stop();
          this.isPlaying = false;
          this.updateFruitData(GameMgr_1.Game.curSelectFruitID);
        }
        this.shake(false);
      };
      CubeBg.prototype.placeDone = function() {
        GameMgr_1.Game.canPlace = false;
        GameMgr_1.Game.resetPreScore();
        if (!this.available) return;
        if (this.cube.node.active && this.cube.node.opacity < 255) {
          this.setAvailable(false);
          GameMgr_1.Game.curPlaceCount++;
          GameMgr_1.Game.addScore(this.fruitData.BaseScore);
          GameMgr_1.Game.addFruitScore(this.fruitData.ID, this.fruitData.BaseScore);
        } else this.setAvailable(true);
        console.log(GameMgr_1.Game.curPlaceCount, GameMgr_1.Game.dragCount);
        if (GameMgr_1.Game.curPlaceCount >= GameMgr_1.Game.dragCount && GameMgr_1.Game.curPlaceCount > 0) {
          console.warn("place:", GameMgr_1.Game.curPlaceCount, GameMgr_1.Game.dragCount);
          GameMgr_1.Game.curPlaceCount = 0;
          GameMgr_1.Game.dragCount = 0;
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_PLACE);
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.CUBE_BOX_SET_STATE_DONE);
        }
      };
      CubeBg.prototype.onDragCancel = function() {
        GameMgr_1.Game.resetPreScore();
        if (!this.available) {
          this.shake(false);
          return;
        }
        if (!this.isPlaying) {
          this.cube.node.active = false;
          this.cube.node.opacity = 255;
        }
        GameMgr_1.Game.dragCount = 0;
      };
      CubeBg.prototype.onLoad = function() {};
      CubeBg.prototype.start = function() {};
      __decorate([ property(cc.Sprite) ], CubeBg.prototype, "cube", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u6a31\u6843"
      }) ], CubeBg.prototype, "yingtao", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u82f9\u679c"
      }) ], CubeBg.prototype, "pingguo", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u756a\u8304"
      }) ], CubeBg.prototype, "fanqie", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u7315\u7334\u6843"
      }) ], CubeBg.prototype, "mihoutao", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u83e0\u841d"
      }) ], CubeBg.prototype, "boluo", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u6a59\u5b50"
      }) ], CubeBg.prototype, "chengzi", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u4e5d\u5bab\u683c"
      }) ], CubeBg.prototype, "icon_daoju_B", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "\u6a2a\u7ad6"
      }) ], CubeBg.prototype, "icon_daoju_A", void 0);
      __decorate([ property(cc.Animation) ], CubeBg.prototype, "SpecialKill", void 0);
      CubeBg = __decorate([ ccclass ], CubeBg);
      return CubeBg;
    }(cc.Component);
    exports.default = CubeBg;
    cc._RF.pop();
  }, {
    "../Config/Config": "Config",
    "../Controller/EventManager": "EventManager",
    "../Controller/EventName": "EventName",
    "../Controller/GameFactory": "GameFactory",
    "../TableMgr": "TableMgr",
    "./GameMgr": "GameMgr"
  } ],
  CubeRoot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6abe/Y9ElKYballHwIR463", "CubeRoot");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameFactory_1 = require("../Controller/GameFactory");
    var EventManager_1 = require("../Controller/EventManager");
    var EventName_1 = require("../Controller/EventName");
    var Config_1 = require("../Config/Config");
    var GameMgr_1 = require("./GameMgr");
    var TableMgr_1 = require("../TableMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CubeRoot = function(_super) {
      __extends(CubeRoot, _super);
      function CubeRoot() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.maxSize = cc.size(450, 450);
        _this.moveDetalTime = .1;
        _this.layDetalTime = .02;
        _this.dragSense = 2.3;
        _this.popOffset = cc.v2(100, 50);
        _this.popBaseY = 500;
        _this.scale = 1;
        _this.posRestored = cc.v2(0, 0);
        _this.isReady = false;
        _this.shapeData = null;
        _this.fruitID = 0;
        _this.maxHorIndex = 0;
        _this.maxRow = 0;
        _this.endIndex = 0;
        _this.DragNode = null;
        _this.PlaceNode = null;
        return _this;
      }
      CubeRoot.prototype.reuse = function() {
        this.node.opacity = 255;
        this.shapeData = arguments[0][0];
        this.node.width = 0;
        this.node.height = 0;
        this.node.zIndex = 0;
        this.PlaceNode.width = 0;
        this.PlaceNode.height = 0;
        this.node.active = false;
        this.shapeData.shape.sort(function(a, b) {
          return a - b;
        });
        var offset = Config_1.Config.Grid.x;
        var baseOffset = Math.floor(this.shapeData.shape[0] / offset);
        for (var i = 0; i < this.shapeData.shape.length; i++) {
          this.shapeData.shape[i] = this.shapeData.shape[i] % offset + Math.max(Math.floor(this.shapeData.shape[i] / offset - baseOffset), 0) * offset;
          this.maxHorIndex = Math.max(this.maxHorIndex, this.shapeData.shape[i] % Config_1.Config.Grid.x);
        }
        var maxIndex = this.shapeData.shape[this.shapeData.shape.length - 1];
        this.maxRow = Math.max(1, Math.ceil(maxIndex / Config_1.Config.Grid.x));
        this.endIndex = (maxIndex - (this.maxRow - 1) * Config_1.Config.Grid.x) % Config_1.Config.Grid.x;
        console.log(" endindex:", this.endIndex);
        this.endIndex = this.maxHorIndex - this.endIndex;
        console.log(" maxRow:", this.maxRow, ", maxHorIndex:", this.maxHorIndex, " ,endIndex:", this.endIndex);
        console.log(this.shapeData.shape);
        this.setFruit();
        this.PlaceNode.removeAllChildren();
        for (var _i = 0, _a = this.shapeData.shape; _i < _a.length; _i++) {
          var posIndex = _a[_i];
          this.PlaceNode.addChild(GameFactory_1.gFactory.getCube(posIndex, this.fruitID));
        }
        this.initEvent();
        this.scheduleOnce(this.adjustPos.bind(this), 0);
      };
      CubeRoot.prototype.setFruit = function() {
        this.shapeStaticData = TableMgr_1.TableMgr.inst.getShape(this.shapeData.shapeID);
        var totalWeight = 0;
        var weightInfo = [];
        for (var _i = 0, _a = this.shapeStaticData.Fruit; _i < _a.length; _i++) {
          var fruit = _a[_i];
          var weight_1 = parseInt(fruit.split("|")[0]);
          var fruitID = parseInt(fruit.split("|")[1]);
          totalWeight += weight_1;
          weightInfo.push({
            id: fruitID,
            weight: totalWeight
          });
        }
        var weight = CMath.getRandom() * totalWeight;
        for (var _b = 0, weightInfo_1 = weightInfo; _b < weightInfo_1.length; _b++) {
          var fruit = weightInfo_1[_b];
          if (fruit.weight >= weight) {
            this.fruitID = fruit.id;
            break;
          }
        }
        console.log(" fruitID: ", this.fruitID);
      };
      CubeRoot.prototype.unuse = function() {
        this.node.opacity = 0;
        this.node.scale = 1;
        EventManager_1.gEventMgr.targetOff(this);
        this.node.targetOff(this);
        this.posRestored = cc.v2(0, 0);
        this.node.x = 0;
        this.node.y = 0;
        this.scale = 1;
        this.isReady = false;
        this.maxHorIndex = 0;
      };
      CubeRoot.prototype.initEvent = function() {
        EventManager_1.gEventMgr.targetOff(this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.DRAG_ADJUST_DONE, this.restorePos, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.GAME_OVER, this.gameOver, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.CLEAR_CUBE_ROOT, this.clear, this);
      };
      CubeRoot.prototype.clear = function() {
        if (!GameMgr_1.Game.isStart) {
          this.node.opacity = 0;
          while (this.PlaceNode.children.length > 0) GameFactory_1.gFactory.putCube(this.PlaceNode.children[0]);
          GameFactory_1.gFactory.putCubeRoot(this.node);
        }
      };
      CubeRoot.prototype.gameOver = function() {
        GameMgr_1.Game.canPlace = false;
        this.back();
      };
      CubeRoot.prototype.restorePos = function() {
        this.posRestored.addSelf(this.node.position);
        console.log(this.posRestored);
      };
      CubeRoot.prototype.adjustPos = function() {
        for (var _i = 0, _a = this.PlaceNode.children; _i < _a.length; _i++) {
          var child = _a[_i];
          this.PlaceNode.width = Math.max(this.PlaceNode.width, child.x);
          this.PlaceNode.height = Math.max(this.PlaceNode.height, Math.abs(child.y));
        }
        this.PlaceNode.width += this.PlaceNode.children[0].width;
        this.PlaceNode.height += this.PlaceNode.children[0].height;
        this.node.width = this.PlaceNode.width;
        this.node.height = this.PlaceNode.height;
        this.scale = Math.min(1, this.maxSize.width / this.node.width, this.maxSize.height / this.node.height);
        this.node.scale = this.scale;
        this.DragNode.scale = 1 / this.scale;
        for (var _b = 0, _c = this.PlaceNode.children; _b < _c.length; _b++) {
          var child = _c[_b];
          child.x -= this.PlaceNode.width / 2 - child.width / 2;
          child.y += this.PlaceNode.height / 2 - child.height / 2;
        }
        this.node.y = 0;
        this.boxSize = cc.size(this.node.width, this.node.height);
        this.cellSize = cc.size(this.PlaceNode.children[0].width, this.PlaceNode.children[0].height);
        this.node.active = true;
        this.DragNode.targetOff(this);
        this.DragNode.on(cc.Node.EventType.TOUCH_MOVE, this.onDrag, this);
        this.DragNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.DragNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.DragNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.Cube_ADJUST_DONE);
      };
      CubeRoot.prototype.onTouchStart = function(eventTouch) {
        if (this.isReady || !GameMgr_1.Game.canDrag || !GameMgr_1.Game.isStart) return;
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_TOUCH);
        10033 == this.shapeData.shapeID ? EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_B_BGM, true) : 10032 == this.shapeData.shapeID && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_A_BGM, true);
        GameMgr_1.Game.resetPreScore();
        var localTouch = this.DragNode.convertToNodeSpaceAR(eventTouch.getLocation());
        var touchPercent = cc.v2(localTouch.x / this.DragNode.width * 2, localTouch.y / this.DragNode.height * 2);
        var newPos = cc.v2(this.node.x + this.popOffset.x * touchPercent.x, this.node.y + this.popBaseY + touchPercent.y * this.popOffset.y);
        var newScale = 1 / this.node.parent.scale;
        var readyAction = cc.sequence(cc.spawn(cc.moveTo(this.moveDetalTime, newPos), cc.scaleTo(this.moveDetalTime, newScale)), cc.callFunc(this.ready.bind(this), this));
        this.node.stopAllActions();
        this.node.zIndex = 3;
        this.node.runAction(readyAction);
        GameMgr_1.Game.curSelectFruitID = this.fruitID;
      };
      CubeRoot.prototype.ready = function() {
        this.isReady = true;
      };
      CubeRoot.prototype.reset = function() {
        this.isReady = false;
        this.node.zIndex = 1;
        GameMgr_1.Game.canDrag = true;
      };
      CubeRoot.prototype.onTouchEnd = function() {
        if (!GameMgr_1.Game.isStart) return;
        console.log(" end :", GameMgr_1.Game.canPlace);
        if (GameMgr_1.Game.canPlace) {
          10033 == this.shapeData.shapeID ? EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_B_BGM, false) : 10032 == this.shapeData.shapeID && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_A_BGM, false);
          this.node.stopAllActions();
          var placePos = this.node.parent.convertToNodeSpaceAR(GameMgr_1.Game.placePos);
          this.node.runAction(cc.sequence(cc.moveTo(this.layDetalTime, placePos), cc.callFunc(this.placeDoneRoot.bind(this), this)));
        } else {
          this.back();
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_LAY_FAIL);
        }
      };
      CubeRoot.prototype.back = function() {
        console.warn("posRestored:", this.posRestored);
        10033 == this.shapeData.shapeID ? EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_B_BGM, false) : 10032 == this.shapeData.shapeID && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SPECIAL_A_BGM, false);
        var unReadyAction = cc.sequence(cc.spawn(cc.moveTo(this.moveDetalTime, this.posRestored), cc.scaleTo(this.moveDetalTime, this.scale)), cc.callFunc(this.reset.bind(this), this));
        this.node.stopAllActions();
        this.node.runAction(unReadyAction);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.CUBE_BOX_DRAG_CANCEL);
      };
      CubeRoot.prototype.placeDoneRoot = function() {
        GameMgr_1.Game.canDrag = true;
        this.node.opacity = 0;
        while (this.PlaceNode.children.length > 0) GameFactory_1.gFactory.putCube(this.PlaceNode.children[0]);
        GameFactory_1.gFactory.putCubeRoot(this.node);
        console.log(" Cube Root Place done !!!!!!");
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.CUBE_BOX_PLACE_DONE);
      };
      CubeRoot.prototype.onDrag = function(eventTouch) {
        if (!GameMgr_1.Game.canDrag || !GameMgr_1.Game.isStart) return;
        if (!this.isReady) return;
        GameMgr_1.Game.resetPreScore();
        this.node.x += eventTouch.getDeltaX() * this.dragSense;
        this.node.y += eventTouch.getDeltaY() * this.dragSense;
        var gamePanelPos = GameMgr_1.Game.gamePanel.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.CUBE_BOX_DRAGING, gamePanelPos, [ this.boxSize, this.cellSize ], this.shapeData.shape, [ this.endIndex, this.maxRow, this.maxHorIndex ], this.shapeStaticData.ID);
      };
      CubeRoot.prototype.getInfo = function() {
        return [ this.endIndex, this.maxRow, this.maxHorIndex ];
      };
      CubeRoot.prototype.getShape = function() {
        return this.shapeData.shape;
      };
      CubeRoot.prototype.getBoxSize = function() {
        return this.boxSize;
      };
      CubeRoot.prototype.getCellSize = function() {
        return this.cellSize;
      };
      CubeRoot.prototype.getShapeID = function() {
        return this.shapeStaticData.ID;
      };
      CubeRoot.prototype.onLoad = function() {};
      CubeRoot.prototype.start = function() {};
      __decorate([ property(cc.Node) ], CubeRoot.prototype, "DragNode", void 0);
      __decorate([ property(cc.Node) ], CubeRoot.prototype, "PlaceNode", void 0);
      CubeRoot = __decorate([ ccclass ], CubeRoot);
      return CubeRoot;
    }(cc.Component);
    exports.default = CubeRoot;
    cc._RF.pop();
  }, {
    "../Config/Config": "Config",
    "../Controller/EventManager": "EventManager",
    "../Controller/EventName": "EventName",
    "../Controller/GameFactory": "GameFactory",
    "../TableMgr": "TableMgr",
    "./GameMgr": "GameMgr"
  } ],
  Cube: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2cc1c9ARLVAs4tu9Y4hLOzZ", "Cube");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Config_1 = require("../Config/Config");
    var TableMgr_1 = require("../TableMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Cube = function(_super) {
      __extends(Cube, _super);
      function Cube() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.posIndex = 0;
        _this.fruitID = 0;
        return _this;
      }
      Cube.prototype.reuse = function() {
        var _this = this;
        this.posIndex = arguments[0][0];
        this.fruitID = arguments[0][1];
        this.node.active = false;
        var icon = TableMgr_1.TableMgr.inst.getFruits(this.fruitID).Icon;
        cc.loader.loadRes("Textures/Fruits/" + icon, cc.SpriteFrame, function(err, spriteFrame) {
          if (err) console.error("load fruit icon err:", err); else {
            _this.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            _this.node.active = true;
          }
        });
        var pos = cc.v2(this.posIndex % Config_1.Config.Grid.x * this.node.width, -Math.floor(this.posIndex / Config_1.Config.Grid.y) * this.node.height);
        this.node.setPosition(pos);
      };
      Cube.prototype.getIndex = function() {
        return this.posIndex;
      };
      Cube.prototype.unuse = function() {
        this.posIndex = 0;
        this.node.x = 0;
        this.node.y = 0;
        this.node.scale = 1;
      };
      Cube.prototype.onLoad = function() {};
      Cube.prototype.start = function() {};
      Cube.prototype.update = function(dt) {};
      Cube = __decorate([ ccclass ], Cube);
      return Cube;
    }(cc.Component);
    exports.default = Cube;
    cc._RF.pop();
  }, {
    "../Config/Config": "Config",
    "../TableMgr": "TableMgr"
  } ],
  EventManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c384HeRO5DCL/qOmRM/SNf", "EventManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager = function() {
      function EventManager() {
        this.eventTarget = new cc.EventTarget();
      }
      Object.defineProperty(EventManager, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new EventManager();
        },
        enumerable: true,
        configurable: true
      });
      EventManager.prototype.emit = function(type, arg1, arg2, arg3, arg4, arg5) {
        this.eventTarget.emit(type.toString(), arg1, arg2, arg3, arg4, arg5);
      };
      EventManager.prototype.on = function(type, callback, target, useCapture) {
        return this.eventTarget.on(type.toString(), callback, target, useCapture);
      };
      EventManager.prototype.once = function(type, callback, target) {
        this.eventTarget.once(type.toString(), callback, target);
      };
      EventManager.prototype.dispatchEvent = function(event) {
        this.eventTarget.dispatchEvent(event);
      };
      EventManager.prototype.off = function(type, callback, target) {
        this.eventTarget.off(type.toString(), callback, target);
      };
      EventManager.prototype.hasEventListener = function(type) {
        return this.eventTarget.hasEventListener(type.toString());
      };
      EventManager.prototype.targetOff = function(target) {
        this.eventTarget.targetOff(target);
      };
      return EventManager;
    }();
    exports.gEventMgr = EventManager.inst;
    cc._RF.pop();
  }, {} ],
  EventName: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbeb5B1/2hLsYY0DvZwARsp", "EventName");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GlobalEvent;
    (function(GlobalEvent) {
      GlobalEvent[GlobalEvent["Cube_ADJUST_DONE"] = 0] = "Cube_ADJUST_DONE";
      GlobalEvent[GlobalEvent["DRAG_ADJUST_DONE"] = 1] = "DRAG_ADJUST_DONE";
      GlobalEvent[GlobalEvent["CUBE_BOX_DRAGING"] = 2] = "CUBE_BOX_DRAGING";
      GlobalEvent[GlobalEvent["CUBE_BOX_DRAG_INDEX"] = 3] = "CUBE_BOX_DRAG_INDEX";
      GlobalEvent[GlobalEvent["CUBE_BOX_DRAG_CANCEL"] = 4] = "CUBE_BOX_DRAG_CANCEL";
      GlobalEvent[GlobalEvent["CUBE_BOX_PLACE_DONE"] = 5] = "CUBE_BOX_PLACE_DONE";
      GlobalEvent[GlobalEvent["CUBE_BOX_SET_STATE_DONE"] = 6] = "CUBE_BOX_SET_STATE_DONE";
      GlobalEvent[GlobalEvent["GAME_START"] = 7] = "GAME_START";
      GlobalEvent[GlobalEvent["GAME_RESTART"] = 8] = "GAME_RESTART";
      GlobalEvent[GlobalEvent["EAT_COL"] = 9] = "EAT_COL";
      GlobalEvent[GlobalEvent["EAT_ROW"] = 10] = "EAT_ROW";
      GlobalEvent[GlobalEvent["KILL_DIRECTLY"] = 11] = "KILL_DIRECTLY";
      GlobalEvent[GlobalEvent["UPDATE_SCORE"] = 12] = "UPDATE_SCORE";
      GlobalEvent[GlobalEvent["UPDATE_COMBO"] = 13] = "UPDATE_COMBO";
      GlobalEvent[GlobalEvent["GAME_OVER"] = 14] = "GAME_OVER";
      GlobalEvent[GlobalEvent["ON_KILL"] = 15] = "ON_KILL";
      GlobalEvent[GlobalEvent["ROW_EFFECT"] = 16] = "ROW_EFFECT";
      GlobalEvent[GlobalEvent["COL_EFFECT"] = 17] = "COL_EFFECT";
      GlobalEvent[GlobalEvent["SHOW_TEXT"] = 18] = "SHOW_TEXT";
      GlobalEvent[GlobalEvent["UPDATE_PRE_SCORE"] = 19] = "UPDATE_PRE_SCORE";
      GlobalEvent[GlobalEvent["SHOW_OVER_LAYER"] = 20] = "SHOW_OVER_LAYER";
      GlobalEvent[GlobalEvent["CLEAR_CUBE_ROOT"] = 21] = "CLEAR_CUBE_ROOT";
      GlobalEvent[GlobalEvent["PLAY_KILL_EFFECT"] = 22] = "PLAY_KILL_EFFECT";
      GlobalEvent[GlobalEvent["PLAY_30_BGM"] = 23] = "PLAY_30_BGM";
      GlobalEvent[GlobalEvent["PLAY_LETSGO"] = 24] = "PLAY_LETSGO";
      GlobalEvent[GlobalEvent["PLAY_BIU"] = 25] = "PLAY_BIU";
      GlobalEvent[GlobalEvent["PLAY_TOUCH"] = 26] = "PLAY_TOUCH";
      GlobalEvent[GlobalEvent["PLAY_PLACE"] = 27] = "PLAY_PLACE";
      GlobalEvent[GlobalEvent["PLAY_TEXT"] = 28] = "PLAY_TEXT";
      GlobalEvent[GlobalEvent["PLAY_SCORE"] = 29] = "PLAY_SCORE";
      GlobalEvent[GlobalEvent["PLAY_OVER"] = 30] = "PLAY_OVER";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_A"] = 31] = "PLAY_SPECIAL_A";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_B"] = 32] = "PLAY_SPECIAL_B";
      GlobalEvent[GlobalEvent["PLAY_OVER_NO_PLACE"] = 33] = "PLAY_OVER_NO_PLACE";
      GlobalEvent[GlobalEvent["PLAY_OVER_TIME_UP"] = 34] = "PLAY_OVER_TIME_UP";
      GlobalEvent[GlobalEvent["PLAY_OVER_TAB"] = 35] = "PLAY_OVER_TAB";
      GlobalEvent[GlobalEvent["PLAY_LAY_FAIL"] = 36] = "PLAY_LAY_FAIL";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_B_BGM"] = 37] = "PLAY_SPECIAL_B_BGM";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_A_BGM"] = 38] = "PLAY_SPECIAL_A_BGM";
    })(GlobalEvent = exports.GlobalEvent || (exports.GlobalEvent = {}));
    cc._RF.pop();
  }, {} ],
  GameFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1ae9PPwO5MhJFqc7MS46ep", "GameFactory");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HashMap_1 = require("../exts/HashMap");
    var ObjPool = function() {
      function ObjPool(template, initSize, poolHandlerComps) {
        this._pool = [];
        this.poolHandlerComps = [];
        this.poolHandlerComps = poolHandlerComps;
        this.template = template;
        this.initPool(initSize);
      }
      ObjPool.prototype.initPool = function(size) {
        for (var i = 0; i < size; ++i) {
          var newNode = cc.instantiate(this.template);
          this.put(newNode);
        }
      };
      ObjPool.prototype.size = function() {
        return this._pool.length;
      };
      ObjPool.prototype.clear = function() {
        var count = this._pool.length;
        for (var i = 0; i < count; ++i) this._pool[i].destroy && this._pool[i].destroy();
        this._pool.length = 0;
      };
      ObjPool.prototype.put = function(obj) {
        if (obj && -1 === this._pool.indexOf(obj)) {
          obj.removeFromParent(false);
          if (this.poolHandlerComps) {
            var handlers = this.poolHandlerComps;
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
              var handler = handlers_1[_i];
              var comp = obj.getComponent(handler);
              comp && comp.unuse && comp.unuse.apply(comp);
            }
          } else {
            var handlers = obj.getComponents(cc.Component);
            for (var _a = 0, handlers_2 = handlers; _a < handlers_2.length; _a++) {
              var handler = handlers_2[_a];
              handler && handler.unuse && handler.unuse.apply(handler);
            }
          }
          this._pool.push(obj);
        }
      };
      ObjPool.prototype.get = function() {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) _[_i] = arguments[_i];
        var last = this._pool.length - 1;
        if (last < 0) {
          console.warn(" last < 0 ");
          this.initPool(1);
        }
        last = this._pool.length - 1;
        var obj = this._pool[last];
        this._pool.length = last;
        if (this.poolHandlerComps) {
          var handlers = this.poolHandlerComps;
          for (var _a = 0, handlers_3 = handlers; _a < handlers_3.length; _a++) {
            var handler = handlers_3[_a];
            var comp = obj.getComponent(handler);
            comp && comp.reuse && comp.reuse.apply(comp, arguments);
          }
        } else {
          var handlers = obj.getComponents(cc.Component);
          for (var _b = 0, handlers_4 = handlers; _b < handlers_4.length; _b++) {
            var handler = handlers_4[_b];
            handler && handler.reuse && handler.reuse.apply(handler, arguments);
          }
        }
        return obj;
      };
      return ObjPool;
    }();
    var Step;
    (function(Step) {
      Step[Step["INIT"] = 0] = "INIT";
      Step[Step["CUBE"] = 4] = "CUBE";
      Step[Step["CUBE_ROOT"] = 8] = "CUBE_ROOT";
      Step[Step["CUBE_BG"] = 16] = "CUBE_BG";
      Step[Step["DONE"] = 28] = "DONE";
    })(Step || (Step = {}));
    var GameFactory = function() {
      function GameFactory() {
        this.step = Step.INIT;
        this.CubeBgPool = new HashMap_1.HashMap();
        this.CubePool = new HashMap_1.HashMap();
        this.CubeRootPool = new HashMap_1.HashMap();
      }
      Object.defineProperty(GameFactory, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new GameFactory();
        },
        enumerable: true,
        configurable: true
      });
      GameFactory.prototype.init = function(callback, cubeBg, cube, cubeRoot) {
        this.doneCallback = callback;
        this.initCubeBg(1, cubeBg);
        this.initCube(1, cube);
        this.initCubeRoot(1, cubeRoot);
      };
      GameFactory.prototype.nextStep = function(step) {
        this.step |= step;
        console.log("Factory Step:" + Step[step]);
        this.step >= Step.DONE && this.doneCallback && this.doneCallback();
      };
      GameFactory.prototype.initCubeBg = function(initCount, prefab) {
        var self = this;
        if (prefab) {
          self.CubeBgPool.add("CubeBg", new ObjPool(prefab, initCount));
          self.nextStep(Step.CUBE_BG);
        } else cc.loader.loadRes("prefabs/CubeBg", cc.Prefab, function(err, prefabRes) {
          if (err) console.error(err); else {
            self.CubeBgPool.add("CubeBg", new ObjPool(prefabRes, initCount));
            self.nextStep(Step.CUBE_BG);
          }
        });
      };
      GameFactory.prototype.getCubeBg = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        return this.CubeBgPool.get("CubeBg").get(args);
      };
      GameFactory.prototype.putCubeBg = function(cubeBg) {
        this.CubeBgPool.get("CubeBg").put(cubeBg);
      };
      GameFactory.prototype.initCube = function(initCount, prefab) {
        var self = this;
        if (prefab) {
          self.CubePool.add("Cube", new ObjPool(prefab, initCount));
          self.nextStep(Step.CUBE);
        } else cc.loader.loadRes("prefabs/Cube", cc.Prefab, function(err, prefabRes) {
          if (err) console.error(err); else {
            self.CubePool.add("Cube", new ObjPool(prefabRes, initCount));
            self.nextStep(Step.CUBE);
          }
        });
      };
      GameFactory.prototype.getCube = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        return this.CubePool.get("Cube").get(args);
      };
      GameFactory.prototype.putCube = function(cube) {
        this.CubePool.get("Cube").put(cube);
      };
      GameFactory.prototype.initCubeRoot = function(initCount, prefab) {
        var self = this;
        if (prefab) {
          self.CubeRootPool.add("CubeRoot", new ObjPool(prefab, initCount));
          self.nextStep(Step.CUBE_ROOT);
        } else cc.loader.loadRes("prefabs/CubeRoot", cc.Prefab, function(err, prefabRes) {
          if (err) console.error(err); else {
            self.CubeRootPool.add("CubeRoot", new ObjPool(prefabRes, initCount));
            self.nextStep(Step.CUBE_ROOT);
          }
        });
      };
      GameFactory.prototype.getCubeRoot = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        return this.CubeRootPool.get("CubeRoot").get(args);
      };
      GameFactory.prototype.putCubeRoot = function(cubeRoot) {
        this.CubeRootPool.get("CubeRoot").put(cubeRoot);
      };
      return GameFactory;
    }();
    exports.gFactory = GameFactory.inst;
    cc._RF.pop();
  }, {
    "../exts/HashMap": "HashMap"
  } ],
  GameMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "004c8nxswRJr5F7AfDn0nPo", "GameMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Config_1 = require("../Config/Config");
    var EventManager_1 = require("../Controller/EventManager");
    var EventName_1 = require("../Controller/EventName");
    var HashMap_1 = require("../exts/HashMap");
    var TableMgr_1 = require("../TableMgr");
    var table_1 = require("../table");
    var OverType;
    (function(OverType) {
      OverType[OverType["TIME_OUT"] = 0] = "TIME_OUT";
      OverType[OverType["NO_PLACE"] = 1] = "NO_PLACE";
    })(OverType = exports.OverType || (exports.OverType = {}));
    var GameMgr = function() {
      function GameMgr() {
        this.gamePanel = null;
        this.dragPanel = null;
        this.data = {
          totalScore: 0,
          killCol: 0,
          killRow: 0,
          maxCombo: 0,
          wildScore: 0,
          fruitKill: {},
          fruitScore: {},
          comboScore: 0,
          mostFruitID: 0,
          bestFruitID: 0,
          Wild_A: false,
          Wild_B: false
        };
        this.combo = 0;
        this.time = Config_1.Config.GameTime;
        this.canPlace = false;
        this.placePos = cc.v2(0, 0);
        this.canDrag = true;
        this.isStart = false;
        this.dragCount = 0;
        this.curPlaceCount = 0;
        this.availableCount = 0;
        this.initAvailableCountInit = 64;
        this.cubeCount = 64;
        this.testCubeIndex = [];
        this.cubeIndex = [];
        this.preCubeIndex = [];
        this.curSelectFruitID = 2e4;
        this.killDirectlyCount = 0;
        this.shapeWeight = new HashMap_1.HashMap();
        this.shapeTotalWeight = 0;
        this.preScore = 0;
        this.callShapeCount = 0;
      }
      Object.defineProperty(GameMgr, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new GameMgr();
        },
        enumerable: true,
        configurable: true
      });
      GameMgr.prototype.start = function() {
        var _this = this;
        console.log("------------------------------- start ---------------------------");
        this.time = Config_1.Config.GameTime;
        this.cubeCount = 64;
        this.callShapeCount = 0;
        this.availableCount = 0;
        this.addPreScore(-this.preScore);
        this.initData();
        for (var _i = 0, _a = this.testCubeIndex; _i < _a.length; _i++) {
          var testIndex = _a[_i];
          testIndex > 0 && this.initAvailableCountInit--;
        }
        console.warn("initAvailableCountInit:", this.initAvailableCountInit);
        for (var i = 0; i < 64; i++) this.testCubeIndex[i] > 0 ? this.cubeIndex[i] = 100 : this.cubeIndex[i] = -1e4;
        this.preCubeIndex = this.cubeIndex.concat();
        var shapeWeights = TableMgr_1.TableMgr.inst.getAll_ShapeWeight_Data();
        for (var id in shapeWeights) {
          var weightData = shapeWeights[id];
          this.shapeWeight.add(parseInt(id), weightData.Weight);
        }
        this.shapeWeight.sort(function(a, b) {
          return b.value - a.value;
        });
        this.shapeTotalWeight = 0;
        this.shapeWeight.forEach(function(key, val) {
          _this.shapeTotalWeight += val;
          _this.shapeWeight.add(key, _this.shapeTotalWeight);
        });
      };
      GameMgr.prototype.restart = function() {
        CMath.randomSeed = Date.now();
        this.start();
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.GAME_RESTART);
      };
      GameMgr.prototype.getResultData = function() {
        return this.data;
      };
      GameMgr.prototype.initData = function() {
        this.data.fruitKill = {};
        this.data.fruitScore = {};
        this.data.killCol = 0;
        this.data.killRow = 0;
        this.data.maxCombo = 0;
        this.data.wildScore = 0;
        this.data.comboScore = 0;
        this.data.bestFruitID = 0;
        this.data.mostFruitID = 0;
        this.addScore(-this.data.totalScore);
      };
      GameMgr.prototype.addFruitKill = function(fruitID) {
        this.data.fruitKill[fruitID] ? this.data.fruitKill[fruitID]++ : this.data.fruitKill[fruitID] = 1;
      };
      GameMgr.prototype.addFruitScore = function(fruitID, score) {
        var data = TableMgr_1.TableMgr.inst.getFruits(fruitID);
        if (!data) {
          console.error(" error fruitID: " + fruitID);
          return;
        }
        this.data.fruitScore[fruitID] ? this.data.fruitScore[fruitID] += score : this.data.fruitScore[fruitID] = score;
        data.Type != table_1.Fruits_Type.ShuiGuo && (this.data.wildScore += score);
      };
      GameMgr.prototype.addOverCount = function() {
        this.cubeCount--;
        this.cubeCount <= 0 && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.SHOW_OVER_LAYER);
      };
      GameMgr.prototype.addScore = function(score) {
        this.data.totalScore += score;
        this.combo >= 2 && (this.data.comboScore += score);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.UPDATE_SCORE);
      };
      GameMgr.prototype.getScore = function() {
        return this.data.totalScore;
      };
      GameMgr.prototype.addKillCol = function(colNumber) {
        this.data.killCol += colNumber;
      };
      GameMgr.prototype.addKillRow = function(rowNumber) {
        this.data.killRow += rowNumber;
      };
      GameMgr.prototype.addCombo = function(combo) {
        this.combo += combo;
        this.combo > this.data.maxCombo && (this.data.maxCombo = this.combo);
        this.combo > 0 && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.UPDATE_COMBO);
        console.log(" --------------combo:", this.combo);
      };
      GameMgr.prototype.getCombo = function() {
        return this.combo;
      };
      GameMgr.prototype.getShapes = function() {
        var shapes = [];
        var specialTool = {};
        for (var i = 0; i < 3; i++) {
          var shapeData = {
            shape: [],
            shapeID: 0
          };
          var random = CMath.getRandom(0, 1);
          var weight = random * this.shapeTotalWeight;
          console.log(" shapeWeight: ", weight);
          for (var _i = 0, _a = this.shapeWeight.values; _i < _a.length; _i++) {
            var val = _a[_i];
            if (weight <= val.value) {
              var shapeWeightData = TableMgr_1.TableMgr.inst.getShapeWeight(val.key);
              var shapeList = shapeWeightData.ShapeList.concat();
              if (this.callShapeCount < 3) for (var j = 0; j < shapeList.length; j++) if ([ 1e4, 10001, 10002, 10032, 10033 ].indexOf(shapeList[j]) >= 0) {
                shapeList.splice(j, 1);
                j--;
              }
              if (shapeList.length <= 0) continue;
              var index = CMath.getRandom(0, 1) * (shapeList.length - 1);
              console.warn(shapeWeightData, index);
              shapeData.shapeID = shapeList[Math.round(index)];
              var shapeJson = TableMgr_1.TableMgr.inst.getShape(shapeData.shapeID);
              if (shapeJson.Type != table_1.Shape_Type.PuTongFangKuai && specialTool[shapeJson.ID]) continue;
              shapeJson.Type != table_1.Shape_Type.PuTongFangKuai && (specialTool[shapeJson.ID] = true);
              shapeData.shape = shapeJson.Shape;
              !this.data.Wild_A && (this.data.Wild_A = 10032 == shapeJson.ID);
              !this.data.Wild_B && (this.data.Wild_B = 10033 == shapeJson.ID);
              shapes.push(shapeData);
              break;
            }
          }
        }
        console.log(shapes);
        this.callShapeCount++;
        return shapes;
      };
      GameMgr.prototype.getPreCubeIndex = function() {
        return this.preCubeIndex;
      };
      GameMgr.prototype.getCubeIndex = function() {
        return this.cubeIndex;
      };
      GameMgr.prototype.setCubeIndex = function(index, score) {
        this.cubeIndex[index] = score;
      };
      GameMgr.prototype.resetCubeIndex = function(index) {
        this.testCubeIndex[index] > 0 ? this.cubeIndex[index] = 100 : this.cubeIndex[index] = -1e4;
      };
      GameMgr.prototype.setPreCubeIndex = function(index, score) {
        this.preCubeIndex[index] = score;
      };
      GameMgr.prototype.resetPreCubeIndex = function(index) {
        this.preCubeIndex[index] = -1e4;
      };
      GameMgr.prototype.check = function() {
        var index = this.checkRowCol(this.cubeIndex);
        var rowIndex = index[0];
        var colIndex = index[1];
        var fruit = TableMgr_1.TableMgr.inst.getFruits(this.curSelectFruitID) || {
          Name: "\u8fa3\u9e21",
          Type: 100
        };
        console.log("colIndex:", colIndex, ", rowIndex:", rowIndex, " curFruit:", fruit.Name);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.EAT_COL, colIndex);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.EAT_ROW, rowIndex);
        this.addKillRow(rowIndex.length);
        this.addKillCol(colIndex.length);
        rowIndex.length > 0 || colIndex.length > 0 || this.killDirectlyCount > 0 ? this.addCombo(1) : this.addCombo(-this.combo);
        if (fruit && fruit.Type == table_1.Fruits_Type.ShuiGuo && (rowIndex.length > 0 || colIndex.length > 0)) {
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.COL_EFFECT, colIndex);
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.ROW_EFFECT, rowIndex);
        }
        if (rowIndex.length > 0 || colIndex.length > 0 || this.combo > 0) {
          var textName = "good";
          textName = this.combo >= 3 ? "unbelievable" : this.combo > 1 ? rowIndex.length + colIndex.length < 2 ? "combo" : "unbelievable" : rowIndex.length + colIndex.length < 2 ? "good" : rowIndex.length + colIndex.length < 3 ? "great" : rowIndex.length + colIndex.length < 4 ? "amazing" : "unbelievable";
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.SHOW_TEXT, textName);
        }
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.KILL_DIRECTLY);
      };
      GameMgr.prototype.checkRowCol = function(cubeIndex) {
        var colIndex = [];
        var rowIndex = [];
        for (var i = 0; i < Config_1.Config.Grid.x; i++) {
          var sumRow = 0;
          var sumCol = 0;
          for (var j = 0; j < Config_1.Config.Grid.y; j++) {
            sumRow += cubeIndex[j + i * Config_1.Config.Grid.x];
            sumCol += cubeIndex[i + j * Config_1.Config.Grid.y];
          }
          sumCol > 0 && colIndex.push(i);
          sumRow > 0 && rowIndex.push(i);
        }
        return [ rowIndex, colIndex ];
      };
      GameMgr.prototype.bindGamePanel = function(panel) {
        this.gamePanel = panel;
      };
      GameMgr.prototype.gameOver = function(type) {
        console.error("game over");
        this.isStart = false;
        var maxScore = 0;
        for (var fruitID in this.data.fruitScore) if (maxScore <= this.data.fruitScore[fruitID]) {
          maxScore = this.data.fruitScore[fruitID];
          this.data.mostFruitID = parseInt(fruitID);
        }
        var maxkill = 0;
        for (var fruitID in this.data.fruitKill) if (maxkill <= this.data.fruitKill[fruitID]) {
          maxkill = this.data.fruitKill[fruitID];
          this.data.bestFruitID = parseInt(fruitID);
        }
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.GAME_OVER, type);
      };
      GameMgr.prototype.addAvailableCount = function(count) {
        this.availableCount += count;
        false == this.isStart && this.availableCount >= this.initAvailableCountInit && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.GAME_START);
      };
      GameMgr.prototype.getAvailableCount = function() {
        return this.availableCount;
      };
      GameMgr.prototype.update = function(dt) {
        if (!this.isStart) return;
        this.time > 30 && this.time - dt <= 30 && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_30_BGM);
        this.time -= dt;
        if (this.time <= 0) {
          this.time = 0;
          this.isStart = false;
          this.gameOver(OverType.TIME_OUT);
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_OVER_TIME_UP);
        }
      };
      GameMgr.prototype.getTime = function() {
        return this.time;
      };
      GameMgr.prototype.addPreScore = function(preScore) {
        this.preScore += preScore;
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.UPDATE_PRE_SCORE);
      };
      GameMgr.prototype.resetPreScore = function() {
        this.preScore = 0;
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.UPDATE_PRE_SCORE);
      };
      GameMgr.prototype.getPreScore = function() {
        return this.preScore;
      };
      return GameMgr;
    }();
    exports.Game = GameMgr.inst;
    true, window["Game"] = exports.Game;
    cc._RF.pop();
  }, {
    "../Config/Config": "Config",
    "../Controller/EventManager": "EventManager",
    "../Controller/EventName": "EventName",
    "../TableMgr": "TableMgr",
    "../exts/HashMap": "HashMap",
    "../table": "table"
  } ],
  GameScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4483cGN9dC8JpeMWEDWaJe", "GameScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameFactory_1 = require("../Controller/GameFactory");
    var EventManager_1 = require("../Controller/EventManager");
    var EventName_1 = require("../Controller/EventName");
    var GameMgr_1 = require("./GameMgr");
    var CubeBg_1 = require("./CubeBg");
    var Config_1 = require("../Config/Config");
    var CubeRoot_1 = require("./CubeRoot");
    var TableMgr_1 = require("../TableMgr");
    var table_1 = require("../table");
    var celerx = require("../exts/celerx");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameScene = function(_super) {
      __extends(GameScene, _super);
      function GameScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.GamePanel = null;
        _this.DragPanel = null;
        _this.Score = null;
        _this.TimeLabel = null;
        _this.TimeProgress = null;
        _this.Player = null;
        _this.RowEffect = null;
        _this.ColEffect = null;
        _this.ShowText = null;
        _this.FloatScore = null;
        _this.Tip = null;
        _this.adjustCount = 0;
        _this.rowAnimation = [];
        _this.colAnimation = [];
        _this.floatScoreMoveSpeed = 600;
        _this.scorePos = cc.v2(350, 95);
        _this.score = 0;
        _this.canUpdateScore = false;
        return _this;
      }
      GameScene.prototype.onLoad = function() {
        cc.loader.loadResDir("Textures/Fruits/");
        cc.loader.loadResDir("sounds");
        this.Score.string = "0";
        this.FloatScore.string = "";
        this.Tip.node.active = false;
        GameMgr_1.Game.start();
        this.initEvent();
        GameMgr_1.Game.bindGamePanel(this.GamePanel);
        this.GamePanel.removeAllChildren();
        this.initGamePanel();
        this.DragPanel.removeAllChildren();
        this.Player.play("player_idle");
        this.Player.on(cc.Animation.EventType.FINISHED, this.onAnimationFinish, this);
        for (var _i = 0, _a = this.RowEffect.children; _i < _a.length; _i++) {
          var child = _a[_i];
          var animation = child.getComponent(cc.Animation);
          child.opacity = 0;
          this.rowAnimation.push(animation);
        }
        for (var _b = 0, _c = this.ColEffect.children; _b < _c.length; _b++) {
          var child = _c[_b];
          var animation = child.getComponent(cc.Animation);
          child.opacity = 0;
          this.colAnimation.push(animation);
        }
      };
      GameScene.prototype.initGamePanel = function() {
        var _this = this;
        this.Score.string = "0";
        this.TimeLabel.string = "3/00";
        var _loop_1 = function(i) {
          this_1.GamePanel.runAction(cc.sequence(cc.delayTime(i / 60), cc.callFunc(function() {
            _this.GamePanel.addChild(GameFactory_1.gFactory.getCubeBg(i));
          }, this_1)));
        };
        var this_1 = this;
        for (var i = 0; i <= 63; i++) _loop_1(i);
      };
      GameScene.prototype.initEvent = function() {
        EventManager_1.gEventMgr.targetOff(this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.Cube_ADJUST_DONE, this.adjustDragPanel, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.CUBE_BOX_DRAGING, this.onBoxDrag, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.CUBE_BOX_SET_STATE_DONE, this.onCubePlaceDone, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.UPDATE_SCORE, this.updateScore, this);
        EventManager_1.gEventMgr.once(EventName_1.GlobalEvent.ON_KILL, this.onKill, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.COL_EFFECT, this.colEffect, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.ROW_EFFECT, this.rowEffect, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.SHOW_TEXT, this.showText, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.GAME_START, this.gameStart, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.SHOW_OVER_LAYER, this.gameOver, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.GAME_RESTART, this.initGamePanel, this);
        this.ShowText.on(cc.Animation.EventType.FINISHED, this.onShowTextFinish, this);
      };
      GameScene.prototype.onShowTextFinish = function(event, aniState) {
        aniState && "letsgo" == aniState.name && (GameMgr_1.Game.isStart = true);
      };
      GameScene.prototype.gameOver = function() {
        var _this = this;
        this.FloatScore.string = "";
        cc.loader.loadRes("prefabs/OverLayer", cc.Prefab, function(err, prefab) {
          if (err) {
            console.error(" load over layer failed:", err);
            celerx.submitScore(GameMgr_1.Game.getResultData().totalScore);
          } else {
            _this.Tip.node.active = true;
            _this.Tip.node.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(.1, 0), cc.fadeTo(.2, 255))));
            true;
            _this.node.once(cc.Node.EventType.TOUCH_END, function() {
              if (!GameMgr_1.Game.isStart) {
                _this.node.addChild(cc.instantiate(prefab));
                _this.Tip.node.active = false;
              }
            }, _this);
          }
        });
      };
      GameScene.prototype.showText = function(name) {
        console.log(" showText:", name);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_TEXT, name);
        this.ShowText.play(name);
      };
      GameScene.prototype.rowEffect = function(rowIndex) {
        rowIndex.length > 0 && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_KILL_EFFECT);
        for (var _i = 0, rowIndex_1 = rowIndex; _i < rowIndex_1.length; _i++) {
          var index = rowIndex_1[_i];
          this.rowAnimation[index] && this.rowAnimation[index].play("kill_effect");
        }
      };
      GameScene.prototype.colEffect = function(colIndex) {
        colIndex.length > 0 && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_KILL_EFFECT);
        for (var _i = 0, colIndex_1 = colIndex; _i < colIndex_1.length; _i++) {
          var index = colIndex_1[_i];
          this.colAnimation[index] && this.colAnimation[index].play("kill_effect");
        }
      };
      GameScene.prototype.onKill = function() {
        this.Player.play("player_kill");
      };
      GameScene.prototype.onAnimationFinish = function(eventName, ani) {
        if ("player_kill" == ani.name) {
          this.Player.play("player_idle");
          EventManager_1.gEventMgr.once(EventName_1.GlobalEvent.ON_KILL, this.onKill, this);
        }
      };
      GameScene.prototype.updateScore = function() {};
      GameScene.prototype.onBoxDrag = function(boxPos, sizeInfo, shapeIndex, boxInfo, shapeID) {
        var boxSize = sizeInfo[0];
        var cellSize = sizeInfo[1];
        var startPos = boxPos.add(cc.v2(-boxSize.width / 2 + cellSize.width / 2, boxSize.height / 2 - cellSize.height / 2));
        this.floatScorePos = cc.v2(boxPos.x, boxPos.y + 80);
        GameMgr_1.Game.canPlace = this.checkCanPlace(boxPos, startPos, shapeIndex, boxInfo, shapeID, true);
        if (GameMgr_1.Game.canPlace) this.updateFloatScore(); else {
          this.FloatScore.string = "";
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.CUBE_BOX_DRAG_CANCEL);
        }
      };
      GameScene.prototype.updateFloatScore = function() {
        if (GameMgr_1.Game.getPreScore() <= 0) this.FloatScore.string = ""; else {
          this.FloatScore.node.scale = 1;
          this.FloatScore.string = GameMgr_1.Game.getPreScore().toString();
        }
      };
      GameScene.prototype.checkCanPlace = function(boxPos, startPos, shapeIndex, boxInfo, shapeID, isPlace) {
        void 0 === isPlace && (isPlace = false);
        var indexOffset = boxInfo[0];
        var maxRow = boxInfo[1];
        var maxCol = boxInfo[2];
        var startNode = null;
        var endNode = null;
        for (var _i = 0, _a = this.GamePanel.children; _i < _a.length; _i++) {
          var child = _a[_i];
          startNode ? CMath.Distance(startNode.position, startPos) >= CMath.Distance(child.position, startPos) && (startNode = child) : CMath.Distance(child.position, startPos) <= child.width / 2 * Math.SQRT2 && (startNode = child);
        }
        if (!startNode) return false;
        var startIndex = startNode.getComponent(CubeBg_1.default).getIndex();
        var endIndex = startIndex + (maxRow - 1) * Config_1.Config.Grid.x + maxCol;
        endIndex % Config_1.Config.Grid.x >= startIndex % Config_1.Config.Grid.x && (endNode = this.GamePanel.children[endIndex]);
        if (endNode) {
          var cubeBgStart = startNode.getComponent(CubeBg_1.default);
          if (cubeBgStart) {
            var indexArr = [];
            for (var _b = 0, shapeIndex_1 = shapeIndex; _b < shapeIndex_1.length; _b++) {
              var index = shapeIndex_1[_b];
              var data = cubeBgStart.getIndex() + index;
              if (data < 0 || data > 63) continue;
              indexArr.push(data);
            }
            if (indexArr.length > 0 && shapeIndex.length == indexArr.length) {
              var realEndNode = null;
              for (var _c = 0, _d = this.GamePanel.children; _c < _d.length; _c++) {
                var child = _d[_c];
                child.getComponent(CubeBg_1.default).getIndex() == indexArr[indexArr.length - 1] && (realEndNode = child);
                if (!child.getComponent(CubeBg_1.default).isAvailable() && indexArr.indexOf(child.getComponent(CubeBg_1.default).getIndex()) >= 0) return false;
              }
              if (realEndNode && endNode.getComponent(CubeBg_1.default).getIndex() % Config_1.Config.Grid.x - realEndNode.getComponent(CubeBg_1.default).getIndex() % Config_1.Config.Grid.x == indexOffset) {
                if (isPlace) {
                  var shapeData = TableMgr_1.TableMgr.inst.getShape(shapeID);
                  var killDirectly = [];
                  var centerPoint = [];
                  if (shapeData && shapeData.Type == table_1.Shape_Type.TeShuDaoJu) {
                    var oldLength = indexArr.length;
                    if (shapeData.RowKillNumber && shapeData.RowKillNumber > 0) for (var i = 0; i < oldLength; i++) {
                      var start = indexArr[i] - indexArr[i] % 8;
                      var end = start + 7;
                      for (var j = start; j <= end; j++) indexArr.indexOf(j) < 0 && indexArr.push(j);
                    }
                    if (shapeData.ColKillNumber && shapeData.ColKillNumber > 0) for (var i = 0; i < oldLength; i++) {
                      var add = indexArr[i] + 8;
                      while (add <= 63) {
                        indexArr.indexOf(add) < 0 && indexArr.push(add);
                        add += 8;
                      }
                      var sub = indexArr[i] - 8;
                      while (sub >= 0) {
                        indexArr.indexOf(sub) < 0 && indexArr.push(sub);
                        sub -= 8;
                      }
                    }
                    if (shapeData.GridKill && shapeData.GridKill.length > 0) for (var _e = 0, _f = shapeData.GridKill; _e < _f.length; _e++) {
                      var pos = _f[_e];
                      var split = pos.split(",");
                      var x = parseInt(split[0]);
                      var y = parseInt(split[1]);
                      for (var i = 0; i < oldLength; i++) {
                        killDirectly.indexOf(indexArr[i]) < 0 && killDirectly.push(indexArr[i]);
                        centerPoint.indexOf(indexArr[i]) < 0 && centerPoint.push(indexArr[i]);
                        var index = indexArr[i] + 8 * y + x;
                        if (index % 8 - indexArr[i] % 8 != x) continue;
                        if (index > 63 || index < 0) continue;
                        indexArr.indexOf(index) < 0 && indexArr.push(index);
                        killDirectly.indexOf(index) < 0 && killDirectly.push(index);
                      }
                    }
                  }
                  GameMgr_1.Game.dragCount = indexArr.length;
                  EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.CUBE_BOX_DRAG_INDEX, indexArr, shapeID, killDirectly, centerPoint);
                  GameMgr_1.Game.canPlace = true;
                  GameMgr_1.Game.placePos = this.GamePanel.convertToWorldSpaceAR(startNode.position.sub(startPos).add(boxPos));
                }
                return true;
              }
              return false;
            }
            return false;
          }
          return false;
        }
        return false;
      };
      GameScene.prototype.adjustDragPanel = function() {
        this.adjustCount++;
        console.log(this.adjustCount);
        if (this.adjustCount >= 3) {
          this.adjustCount = 0;
          var centerChild = this.DragPanel.children[1];
          var leftChild = this.DragPanel.children[0];
          var rightChild = this.DragPanel.children[2];
          centerChild.x = 0;
          var width = this.DragPanel.width / 2;
          leftChild.x = .6 * width;
          rightChild.x = .6 * -width;
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.DRAG_ADJUST_DONE);
          this.checkIsGameOver();
        }
      };
      GameScene.prototype.genNewDragShape = function(shapeList) {
        shapeList.length < 3 && console.error(" \u65b9\u5757\u751f\u6210\u4e2a\u6570\u4e0d\u8db3!!!!!!!!!!!!!!!!!!!");
        for (var _i = 0, shapeList_1 = shapeList; _i < shapeList_1.length; _i++) {
          var shape = shapeList_1[_i];
          this.DragPanel.addChild(GameFactory_1.gFactory.getCubeRoot(shape));
        }
      };
      GameScene.prototype.onCubePlaceDone = function() {
        this.FloatScore.node.runAction(cc.sequence(cc.scaleTo(.1, 1.5), cc.moveTo(.2, this.scorePos), cc.callFunc(this.startUpdateScore.bind(this), this)));
        GameMgr_1.Game.check();
        this.DragPanel.childrenCount <= 0 ? this.genNewDragShape(GameMgr_1.Game.getShapes()) : this.checkIsGameOver();
      };
      GameScene.prototype.checkIsGameOver = function() {
        var isGameOver = true;
        for (var _i = 0, _a = this.DragPanel.children; _i < _a.length; _i++) {
          var box = _a[_i];
          var cubeRoot = box.getComponent(CubeRoot_1.default);
          for (var _b = 0, _c = this.GamePanel.children; _b < _c.length; _b++) {
            var child = _c[_b];
            if (!isGameOver) break;
            if (this.checkCanPlace(child.position, child.position, cubeRoot.getShape(), cubeRoot.getInfo(), cubeRoot.getShapeID())) {
              isGameOver = false;
              break;
            }
          }
        }
        if (isGameOver) {
          GameMgr_1.Game.gameOver(GameMgr_1.OverType.NO_PLACE);
          EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_OVER_NO_PLACE);
        }
      };
      GameScene.prototype.gameStart = function() {
        this.ShowText.play("letsgo");
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_LETSGO);
        this.onCubePlaceDone();
      };
      GameScene.prototype.startUpdateScore = function() {
        this.canUpdateScore = true;
        this.FloatScore.string = "";
        this.FloatScore.node.scale = 1;
        this.updateFloatScore();
      };
      GameScene.prototype.update = function(dt) {
        GameMgr_1.Game.update(dt);
        this.updateTime();
        if (this.floatScorePos && this.FloatScore.node.getNumberOfRunningActions() <= 0) {
          var offset = this.floatScoreMoveSpeed * dt;
          if (CMath.Distance(this.floatScorePos, this.FloatScore.node.position) > 200) {
            this.FloatScore.node.x = this.floatScorePos.x;
            this.FloatScore.node.y = this.floatScorePos.y;
          }
          this.FloatScore.node.x > this.floatScorePos.x ? this.FloatScore.node.x -= offset : this.FloatScore.node.x < this.floatScorePos.x && (this.FloatScore.node.x += offset);
          this.FloatScore.node.y > this.floatScorePos.y ? this.FloatScore.node.y -= offset : this.FloatScore.node.y < this.floatScorePos.y && (this.FloatScore.node.y += offset);
          Math.abs(this.FloatScore.node.x - this.floatScorePos.x) < 10 && (this.FloatScore.node.x = this.floatScorePos.x);
          Math.abs(this.FloatScore.node.y - this.floatScorePos.y) < 10 && (this.FloatScore.node.y = this.floatScorePos.y);
        }
        if (this.canUpdateScore) {
          if (this.score < GameMgr_1.Game.getScore()) this.score += 3; else {
            this.canUpdateScore = false;
            this.score = GameMgr_1.Game.getScore();
          }
          this.Score.string = this.score.toString();
        }
      };
      GameScene.prototype.updateTime = function() {
        this.TimeLabel.string = CMath.TimeFormat(GameMgr_1.Game.getTime());
        this.TimeProgress.progress = GameMgr_1.Game.getTime() / Config_1.Config.GameTime;
      };
      __decorate([ property(cc.Node) ], GameScene.prototype, "GamePanel", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "DragPanel", void 0);
      __decorate([ property(cc.Label) ], GameScene.prototype, "Score", void 0);
      __decorate([ property(cc.Label) ], GameScene.prototype, "TimeLabel", void 0);
      __decorate([ property(cc.ProgressBar) ], GameScene.prototype, "TimeProgress", void 0);
      __decorate([ property(cc.Animation) ], GameScene.prototype, "Player", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "RowEffect", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "ColEffect", void 0);
      __decorate([ property(cc.Animation) ], GameScene.prototype, "ShowText", void 0);
      __decorate([ property(cc.Label) ], GameScene.prototype, "FloatScore", void 0);
      __decorate([ property(cc.Label) ], GameScene.prototype, "Tip", void 0);
      GameScene = __decorate([ ccclass ], GameScene);
      return GameScene;
    }(cc.Component);
    exports.default = GameScene;
    cc._RF.pop();
  }, {
    "../Config/Config": "Config",
    "../Controller/EventManager": "EventManager",
    "../Controller/EventName": "EventName",
    "../Controller/GameFactory": "GameFactory",
    "../TableMgr": "TableMgr",
    "../exts/celerx": "celerx",
    "../table": "table",
    "./CubeBg": "CubeBg",
    "./CubeRoot": "CubeRoot",
    "./GameMgr": "GameMgr"
  } ],
  HashMap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65ec9+rOt5Kur9SeJbgRgUM", "HashMap");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HashMap = function() {
      function HashMap() {
        this._list = new Array();
        this.clear();
      }
      HashMap.prototype.getIndexByKey = function(key) {
        var count = this._list.length;
        for (var index = 0; index < count; index++) {
          var element = this._list[index];
          if (element.key == key) return index;
        }
        return -1;
      };
      Object.defineProperty(HashMap.prototype, "keys", {
        get: function() {
          var keys = new Array();
          for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var element = _a[_i];
            element && keys.push(element.key);
          }
          return keys;
        },
        enumerable: true,
        configurable: true
      });
      HashMap.prototype.add = function(key, value) {
        var data = {
          key: key,
          value: value
        };
        var index = this.getIndexByKey(key);
        -1 != index ? this._list[index] = data : this._list.push(data);
      };
      Object.defineProperty(HashMap.prototype, "values", {
        get: function() {
          return this._list;
        },
        enumerable: true,
        configurable: true
      });
      HashMap.prototype.remove = function(key) {
        var index = this.getIndexByKey(key);
        if (-1 != index) {
          var data = this._list[index];
          this._list.splice(index, 1);
          return data;
        }
        return null;
      };
      HashMap.prototype.has = function(key) {
        var index = this.getIndexByKey(key);
        return -1 != index;
      };
      HashMap.prototype.get = function(key) {
        var index = this.getIndexByKey(key);
        if (-1 != index) {
          var data = this._list[index];
          return data.value;
        }
        return null;
      };
      Object.defineProperty(HashMap.prototype, "length", {
        get: function() {
          return this._list.length;
        },
        enumerable: true,
        configurable: true
      });
      HashMap.prototype.sort = function(compare) {
        this._list.sort(compare);
      };
      HashMap.prototype.forEachKeyValue = function(f) {
        var count = this._list.length;
        for (var index = 0; index < count; index++) {
          var element = this._list[index];
          f(element);
        }
      };
      HashMap.prototype.forEach = function(f) {
        var count = this._list.length;
        for (var index = 0; index < count; index++) {
          var element = this._list[index];
          f(element.key, element.value);
        }
      };
      HashMap.prototype.clear = function() {
        this._list = [];
      };
      return HashMap;
    }();
    exports.HashMap = HashMap;
    cc._RF.pop();
  }, {} ],
  OverLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f707WQwS1B94AJLjJYdvIF", "OverLayer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameMgr_1 = require("./GameMgr");
    var TableMgr_1 = require("../TableMgr");
    var EventManager_1 = require("../Controller/EventManager");
    var EventName_1 = require("../Controller/EventName");
    var celerx = require("../exts/celerx");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Step;
    (function(Step) {
      Step[Step["ready"] = 0] = "ready";
      Step[Step["total"] = 2] = "total";
      Step[Step["line"] = 4] = "line";
      Step[Step["combo"] = 8] = "combo";
      Step[Step["best"] = 16] = "best";
      Step[Step["wild"] = 32] = "wild";
      Step[Step["most"] = 64] = "most";
      Step[Step["done"] = 124] = "done";
      Step[Step["submit"] = 126] = "submit";
    })(Step || (Step = {}));
    var OverLayer = function(_super) {
      __extends(OverLayer, _super);
      function OverLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.TotalScoreLabel = null;
        _this.totalScore = 0;
        _this.showTotal = false;
        _this.LineScoreLabel = null;
        _this.lineScore = 0;
        _this.showLine = false;
        _this.ComboScoreLabel = null;
        _this.comboScore = 0;
        _this.showCombo = false;
        _this.BestScoreLabel = null;
        _this.bestScore = 0;
        _this.showBest = false;
        _this.WildScoreLabel = null;
        _this.wildScore = 0;
        _this.showWild = false;
        _this.MostScoreLabel = null;
        _this.mostScore = 0;
        _this.showMost = false;
        _this.BestIcon = null;
        _this.Wild_A = null;
        _this.Wild_B = null;
        _this.MostIcon = null;
        _this.Submit = null;
        _this.step = Step.ready;
        _this.scoreAdd = 10;
        return _this;
      }
      OverLayer.prototype.onLoad = function() {
        var _this = this;
        this.totalScore = 0;
        this.TotalScoreLabel.string = "0";
        this.lineScore = 0;
        this.LineScoreLabel.string = "0";
        this.comboScore = 0;
        this.ComboScoreLabel.string = "0";
        this.wildScore = 0;
        this.WildScoreLabel.string = "0";
        this.bestScore = 0;
        this.BestScoreLabel.string = "0";
        this.mostScore = 0;
        this.MostScoreLabel.string = "0";
        this.BestIcon.node.active = false;
        this.Wild_A.node.active = false;
        this.Wild_B.node.active = false;
        this.MostIcon.node.active = false;
        this.resultData = GameMgr_1.Game.getResultData();
        this.scoreAdd = Math.max(10, Math.floor(this.resultData.totalScore / 100));
        this.Submit.node.scale = 0;
        this.Submit.node.on(cc.Node.EventType.TOUCH_END, function() {
          true;
          GameMgr_1.Game.restart();
          _this.node.removeFromParent();
        }, this);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.CLEAR_CUBE_ROOT);
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_OVER);
      };
      OverLayer.prototype.start = function() {};
      OverLayer.prototype.update = function(dt) {
        if (this.showLine) {
          if (this.lineScore < this.resultData.killCol + this.resultData.killRow) this.lineScore += this.scoreAdd; else {
            this.lineScore = this.resultData.killCol + this.resultData.killRow;
            this.next(Step.line);
            this.showLine = false;
          }
          this.LineScoreLabel.string = this.lineScore.toString();
        }
        if (this.showCombo) {
          if (this.comboScore < this.resultData.comboScore) this.comboScore += this.scoreAdd; else {
            this.comboScore = this.resultData.comboScore;
            this.next(Step.combo);
            this.showCombo = false;
          }
          this.ComboScoreLabel.string = this.comboScore.toString();
        }
        if (this.showBest) {
          if (0 != this.resultData.bestFruitID && this.resultData.fruitScore[this.resultData.bestFruitID] && this.bestScore < this.resultData.fruitScore[this.resultData.bestFruitID]) this.bestScore += this.scoreAdd; else {
            this.bestScore = this.resultData.fruitScore[this.resultData.bestFruitID] || 0;
            this.next(Step.best);
            this.showBest = false;
          }
          this.BestScoreLabel.string = this.bestScore.toString();
        }
        if (this.showWild) {
          if (this.wildScore < this.resultData.wildScore) this.wildScore += this.scoreAdd; else {
            this.wildScore = this.resultData.wildScore;
            this.next(Step.wild);
            this.showWild = false;
          }
          this.WildScoreLabel.string = this.wildScore.toString();
        }
        if (this.showMost) {
          if (0 != this.resultData.mostFruitID && this.resultData.fruitScore[this.resultData.mostFruitID] && this.mostScore < this.resultData.fruitScore[this.resultData.mostFruitID]) this.mostScore += this.scoreAdd; else {
            this.mostScore = this.resultData.fruitScore[this.resultData.mostFruitID] || 0;
            this.next(Step.most);
            this.showMost = false;
          }
          this.MostScoreLabel.string = this.mostScore.toString();
        }
        if (this.showTotal) {
          if (this.totalScore < this.resultData.totalScore) this.totalScore += this.scoreAdd; else {
            this.totalScore = this.resultData.totalScore;
            this.next(Step.total);
            this.showTotal = false;
            EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SCORE, false);
          }
          this.TotalScoreLabel.string = this.totalScore.toString();
        }
      };
      OverLayer.prototype.next = function(step) {
        var _this = this;
        this.step |= step;
        console.log("Step :", this.step, " Done:", Step.done);
        if (this.step >= Step.done && this.step < Step.submit) {
          this.showTotal = true;
          this.resultData.totalScore > 0 && EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_SCORE, true);
        }
        if (this.step >= Step.submit) {
          this.Submit.node.runAction(cc.sequence(cc.scaleTo(.1, 1.2), cc.scaleTo(.1, 1), cc.scaleTo(.1, 1.1), cc.scaleTo(.1, 1)));
          setTimeout(function() {
            celerx.submitScore(_this.resultData.totalScore);
          }, 3e3);
        }
      };
      OverLayer.prototype.showLineScore = function() {
        this.showLine = true;
      };
      OverLayer.prototype.playOverTab = function() {
        EventManager_1.gEventMgr.emit(EventName_1.GlobalEvent.PLAY_OVER_TAB);
      };
      OverLayer.prototype.showComboScore = function() {
        this.showCombo = true;
      };
      OverLayer.prototype.showBestScore = function() {
        var _this = this;
        this.showBest = true;
        var data;
        0 != this.resultData.bestFruitID && (data = TableMgr_1.TableMgr.inst.getFruits(this.resultData.bestFruitID));
        data && cc.loader.loadRes("Textures/Fruits/" + data.Icon, cc.SpriteFrame, function(err, sp) {
          if (err) console.error(err); else {
            _this.BestIcon.node.active = true;
            _this.BestIcon.spriteFrame = sp;
          }
        });
      };
      OverLayer.prototype.showWildScore = function() {
        this.showWild = true;
        this.Wild_A.node.active = this.resultData.Wild_A;
        this.Wild_B.node.active = this.resultData.Wild_B;
        this.Wild_A.node.active && !this.Wild_B.node.active && (this.Wild_A.node.x = this.Wild_B.node.x);
      };
      OverLayer.prototype.showMostScore = function() {
        var _this = this;
        this.showMost = true;
        if (0 != this.resultData.mostFruitID) {
          var data = TableMgr_1.TableMgr.inst.getFruits(this.resultData.mostFruitID);
          data && cc.loader.loadRes("Textures/Fruits/" + data.Icon, cc.SpriteFrame, function(err, sp) {
            if (err) console.error(err); else {
              _this.MostIcon.node.active = true;
              _this.MostIcon.spriteFrame = sp;
            }
          });
        }
      };
      __decorate([ property(cc.Label) ], OverLayer.prototype, "TotalScoreLabel", void 0);
      __decorate([ property(cc.Label) ], OverLayer.prototype, "LineScoreLabel", void 0);
      __decorate([ property(cc.Label) ], OverLayer.prototype, "ComboScoreLabel", void 0);
      __decorate([ property(cc.Label) ], OverLayer.prototype, "BestScoreLabel", void 0);
      __decorate([ property(cc.Label) ], OverLayer.prototype, "WildScoreLabel", void 0);
      __decorate([ property(cc.Label) ], OverLayer.prototype, "MostScoreLabel", void 0);
      __decorate([ property(cc.Sprite) ], OverLayer.prototype, "BestIcon", void 0);
      __decorate([ property(cc.Sprite) ], OverLayer.prototype, "Wild_A", void 0);
      __decorate([ property(cc.Sprite) ], OverLayer.prototype, "Wild_B", void 0);
      __decorate([ property(cc.Sprite) ], OverLayer.prototype, "MostIcon", void 0);
      __decorate([ property(cc.Button) ], OverLayer.prototype, "Submit", void 0);
      OverLayer = __decorate([ ccclass ], OverLayer);
      return OverLayer;
    }(cc.Component);
    exports.default = OverLayer;
    cc._RF.pop();
  }, {
    "../Controller/EventManager": "EventManager",
    "../Controller/EventName": "EventName",
    "../TableMgr": "TableMgr",
    "../exts/celerx": "celerx",
    "./GameMgr": "GameMgr"
  } ],
  TableMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33c73L3v+BDpLtcNY7gOVEB", "TableMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TableMgr = function() {
      function TableMgr() {
        this.load = TableMgr.JSON_URL && "" != TableMgr.JSON_URL ? cc.loader.load.bind(cc.loader) : cc.loader.loadRes.bind(cc.loader);
        this.fileFormat = TableMgr.JSON_URL && "" != TableMgr.JSON_URL ? ".json?time=" + Date.now() : "";
        this.total = 0;
        this.complete = 0;
        this.Fruits = {};
        this.Shape = {};
        this.ShapeWeight = {};
      }
      Object.defineProperty(TableMgr, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new TableMgr();
        },
        enumerable: true,
        configurable: true
      });
      TableMgr.prototype.startLoad = function(url, complete, progress) {
        this.completeCallback = complete;
        this.progressCallback = progress;
        var self = this;
        console.log("Base URL:", TableMgr.JSON_URL);
        this.load(TableMgr.JSON_URL + url.trim().split("/").join("") + "/file_list" + this.fileFormat, function(err, JsonAsset) {
          if (err) console.error(err.errorMessage); else {
            var jsonArray = "Array" == JsonAsset.constructor["name"] ? JsonAsset : JsonAsset.json;
            this.total = jsonArray.length;
            for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
              var jsonFile = jsonArray_1[_i];
              self.loadJson(url.trim().split("/").join("") + "/" + jsonFile.replace(".json", ""));
            }
          }
        }.bind(this));
      };
      TableMgr.prototype.loadJson = function(url) {
        console.log("start load:" + url);
        var self = this;
        var tableName = url.split("/")[1];
        tableName = tableName.charAt(0).toUpperCase() + tableName.slice(1, tableName.length);
        this.load(TableMgr.JSON_URL + url + this.fileFormat, function(err, JsonAsset) {
          if (err) console.error(err.errorMessage); else {
            var jsonArray = "Array" == JsonAsset.constructor["name"] ? JsonAsset : JsonAsset.json;
            for (var _i = 0, jsonArray_2 = jsonArray; _i < jsonArray_2.length; _i++) {
              var json = jsonArray_2[_i];
              self[tableName][json["ID"]] = json;
            }
            self.completeLoad();
          }
        }.bind(this));
      };
      TableMgr.prototype.completeLoad = function() {
        this.complete++;
        this.complete >= this.total && this.completeCallback && this.completeCallback();
      };
      TableMgr.prototype.getFruits = function(key) {
        if (this.Fruits[key]) return this.Fruits[key];
        console.error("Fruits \u4e0d\u5b58key\uff1a" + key);
        return null;
      };
      TableMgr.prototype.getAll_Fruits_Data = function() {
        return this.Fruits;
      };
      TableMgr.prototype.getShape = function(key) {
        if (this.Shape[key]) return this.Shape[key];
        console.error("Shape \u4e0d\u5b58key\uff1a" + key);
        return null;
      };
      TableMgr.prototype.getAll_Shape_Data = function() {
        return this.Shape;
      };
      TableMgr.prototype.getShapeWeight = function(key) {
        if (this.ShapeWeight[key]) return this.ShapeWeight[key];
        console.error("ShapeWeight \u4e0d\u5b58key\uff1a" + key);
        return null;
      };
      TableMgr.prototype.getAll_ShapeWeight_Data = function() {
        return this.ShapeWeight;
      };
      TableMgr.JSON_URL = "";
      return TableMgr;
    }();
    exports.TableMgr = TableMgr;
    cc._RF.pop();
  }, {} ],
  WelcomeScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc976drFj5NmKgolSm1G3Qa", "WelcomeScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TableMgr_1 = require("../TableMgr");
    var AudioController_1 = require("../Controller/AudioController");
    var GameFactory_1 = require("../Controller/GameFactory");
    var Config_1 = require("../Config/Config");
    var celerx = require("../exts/celerx");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LOAD_STEP;
    (function(LOAD_STEP) {
      LOAD_STEP[LOAD_STEP["READY"] = 0] = "READY";
      LOAD_STEP[LOAD_STEP["PREFABS"] = 2] = "PREFABS";
      LOAD_STEP[LOAD_STEP["SCENE"] = 8] = "SCENE";
      LOAD_STEP[LOAD_STEP["AUDIO"] = 16] = "AUDIO";
      LOAD_STEP[LOAD_STEP["CELER"] = 32] = "CELER";
      LOAD_STEP[LOAD_STEP["DONE"] = 58] = "DONE";
    })(LOAD_STEP = exports.LOAD_STEP || (exports.LOAD_STEP = {}));
    var WelcomeScene = function(_super) {
      __extends(WelcomeScene, _super);
      function WelcomeScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nextSceneName = "game";
        _this.DebugLabel = null;
        _this.percentLabel = null;
        _this.maxPercent = 0;
        _this.curPercent = 0;
        _this.CubeBg = null;
        _this.Cube = null;
        _this.CubeRoot = null;
        _this.Tip = null;
        _this._step = LOAD_STEP.READY;
        _this.startTime = Date.now();
        return _this;
      }
      WelcomeScene.prototype.onLoad = function() {
        var _this = this;
        this.startTime = Date.now();
        this.DebugLabel.string = "";
        this.DebugLabel.node.active = true;
        this.Tip.node.active = true;
        this.Tip.node.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(.1, 0), cc.fadeTo(.2, 255))));
        celerx.ready();
        CMath.randomSeed = Date.now();
        var self = this;
        celerx.onStart(function() {
          self.celerStart();
        });
        true, this.node.once(cc.Node.EventType.TOUCH_END, function() {
          _this.Tip.node.active = false;
          _this.celerStart();
        }, this);
        cc.game.setFrameRate(Config_1.Config.FPS);
        this.maxPercent = 0;
        this.defaultAnimation = this.node.getComponent(cc.Animation);
        this.defaultAnimation && (this.defaultAnimation.play().wrapMode = cc.WrapMode.Loop);
        TableMgr_1.TableMgr.inst.startLoad("json/", function() {
          GameFactory_1.gFactory.init(function() {
            this.nextStep(LOAD_STEP.PREFABS);
          }.bind(_this), _this.CubeBg, _this.Cube, _this.CubeRoot);
        });
        AudioController_1.gAudio.init(function() {
          this.nextStep(LOAD_STEP.AUDIO);
        }.bind(this));
        cc.director.preloadScene(this.nextSceneName, null, function(err, sceneAsset) {
          if (err) console.error("\u573a\u666f\u52a0\u8f7d\u9519\u8bef"); else {
            _this.nextScene = sceneAsset.scene;
            _this.nextStep(LOAD_STEP.SCENE);
          }
        });
      };
      WelcomeScene.prototype.celerStart = function() {
        var match = celerx.getMatch();
        match && match.sharedRandomSeed ? CMath.randomSeed = match.sharedRandomSeed : CMath.randomSeed = Date.now();
        this.nextStep(LOAD_STEP.CELER);
      };
      WelcomeScene.prototype.update = function(dt) {
        this.curPercent += dt / 5;
        this.curPercent >= this.maxPercent && (this.curPercent = this.maxPercent);
        this.percentLabel.string = (100 * this.curPercent).toFixed(2) + "%";
        this.curPercent >= 1 && this.node.emit("load_done");
      };
      WelcomeScene.prototype.nextStep = function(loadStep) {
        var _this = this;
        this.DebugLabel.string += LOAD_STEP[loadStep] + ":" + (Date.now() - this.startTime) + " ms";
        this.DebugLabel.string += "\n";
        this._step |= loadStep;
        console.log("CUR STEP:" + LOAD_STEP[loadStep] + ", total: " + this._step);
        this.maxPercent = this._step / LOAD_STEP.DONE;
        if (this._step >= LOAD_STEP.DONE) {
          this.node.once("load_done", function() {
            _this.nextScene ? cc.director.runSceneImmediate(_this.nextScene) : cc.director.loadScene(_this.nextSceneName);
          }, this);
          this.defaultAnimation && (this.defaultAnimation.play().wrapMode = cc.WrapMode.Loop);
        }
      };
      WelcomeScene.prototype.calLoadTime = function(loadStep) {
        switch (loadStep) {
         case LOAD_STEP.AUDIO:
          console.warn(" audio cost time:", Date.now() - this.startTime, "ms");
          break;

         case LOAD_STEP.PREFABS:
          console.warn(" table cost time:", Date.now() - this.startTime, "ms");
          break;

         case LOAD_STEP.SCENE:
          console.warn(" Scene cost time:", Date.now() - this.startTime, "ms");
        }
      };
      __decorate([ property({
        displayName: "\u6e38\u620f\u573a\u666f\u540d",
        tooltip: "\u9ed8\u8ba4\u8fdb\u5165game\u573a\u666f\uff0c\u5982\u679c\u9700\u8981\u6307\u5b9a\u573a\u666f\uff0c\u53ef\u4ee5\u6307\u5b9a"
      }) ], WelcomeScene.prototype, "nextSceneName", void 0);
      __decorate([ property(cc.Label) ], WelcomeScene.prototype, "DebugLabel", void 0);
      __decorate([ property(cc.Label) ], WelcomeScene.prototype, "percentLabel", void 0);
      __decorate([ property(cc.Prefab) ], WelcomeScene.prototype, "CubeBg", void 0);
      __decorate([ property(cc.Prefab) ], WelcomeScene.prototype, "Cube", void 0);
      __decorate([ property(cc.Prefab) ], WelcomeScene.prototype, "CubeRoot", void 0);
      __decorate([ property(cc.Label) ], WelcomeScene.prototype, "Tip", void 0);
      WelcomeScene = __decorate([ ccclass ], WelcomeScene);
      return WelcomeScene;
    }(cc.Component);
    exports.default = WelcomeScene;
    cc._RF.pop();
  }, {
    "../Config/Config": "Config",
    "../Controller/AudioController": "AudioController",
    "../Controller/GameFactory": "GameFactory",
    "../TableMgr": "TableMgr",
    "../exts/celerx": "celerx"
  } ],
  celerx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5fb9cBc1OBEM5BpUwBtd5fb", "celerx");
    "use strict";
    var _typeof2 = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function binary_to_base64(e) {
      for (var t = new Uint8Array(e), r = new Array(), n = 0, i = 0, a = new Array(3), o = new Array(4), d = t.length, s = 0; d--; ) if (a[n++] = t[s++], 
      3 == n) {
        for (o[0] = (252 & a[0]) >> 2, o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4), o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6), 
        o[3] = 63 & a[2], n = 0; n < 4; n++) r += base64_chars.charAt(o[n]);
        n = 0;
      }
      if (n) {
        for (i = n; i < 3; i++) a[i] = 0;
        for (o[0] = (252 & a[0]) >> 2, o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4), o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6), 
        o[3] = 63 & a[2], i = 0; i < n + 1; i++) r += base64_chars.charAt(o[i]);
        for (;n++ < 3; ) r += "=";
      }
      return r;
    }
    function dec2hex(e) {
      for (var t = hD.substr(15 & e, 1); e > 15; ) e >>= 4, t = hD.substr(15 & e, 1) + t;
      return t;
    }
    function base64_decode(e) {
      var t, r, n, i, a, o, d, s = new Array(), c = 0, l = e;
      if (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""), l != e && alert("Warning! Characters outside Base64 range in input string ignored."), 
      e.length % 4) return alert("Error: Input length is not a multiple of 4 bytes."), 
      "";
      for (var u = 0; c < e.length; ) i = keyStr.indexOf(e.charAt(c++)), a = keyStr.indexOf(e.charAt(c++)), 
      o = keyStr.indexOf(e.charAt(c++)), d = keyStr.indexOf(e.charAt(c++)), t = i << 2 | a >> 4, 
      r = (15 & a) << 4 | o >> 2, n = (3 & o) << 6 | d, s[u++] = t, 64 != o && (s[u++] = r), 
      64 != d && (s[u++] = n);
      return s;
    }
    var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(e) {
      return "undefined" === typeof e ? "undefined" : _typeof2(e);
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" === typeof e ? "undefined" : _typeof2(e);
    }, bridge = {
      default: void 0,
      call: function call(e, t, r) {
        var n = "";
        if ("function" == typeof t && (r = t, t = {}), t = {
          data: void 0 === t ? null : t
        }, "function" == typeof r) {
          var i = "dscb" + window.dscb++;
          window[i] = r, t._dscbstub = i;
        }
        return t = JSON.stringify(t), window._dsbridge ? n = _dsbridge.call(e, t) : (window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")) && (n = prompt("_dsbridge=" + e, t)), 
        JSON.parse(n || "{}").data;
      },
      register: function register(e, t, r) {
        r = r ? window._dsaf : window._dsf, window._dsInit || (window._dsInit = !0, setTimeout(function() {
          bridge.call("_dsb.dsinit");
        }, 0)), "object" == (void 0 === t ? "undefined" : _typeof(t)) ? r._obs[e] = t : r[e] = t;
      },
      registerAsyn: function registerAsyn(e, t) {
        this.register(e, t, !0);
      },
      hasNativeMethod: function hasNativeMethod(e, t) {
        return this.call("_dsb.hasNativeMethod", {
          name: e,
          type: t || "all"
        });
      },
      disableJavascriptDialogBlock: function disableJavascriptDialogBlock(e) {
        this.call("_dsb.disableJavascriptDialogBlock", {
          disable: !1 !== e
        });
      }
    };
    !function() {
      if (!window._dsf) {
        var e, t = {
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
          _handleMessageFromNative: function _handleMessageFromNative(e) {
            var t = JSON.parse(e.data), r = {
              id: e.callbackId,
              complete: !0
            }, n = this._dsf[e.method], i = this._dsaf[e.method], a = function a(e, n) {
              r.data = e.apply(n, t), bridge.call("_dsb.returnValue", r);
            }, o = function o(e, n) {
              t.push(function(e, t) {
                r.data = e, r.complete = !1 !== t, bridge.call("_dsb.returnValue", r);
              }), e.apply(n, t);
            };
            if (n) a(n, this._dsf); else if (i) o(i, this._dsaf); else if (n = e.method.split("."), 
            !(2 > n.length)) {
              e = n.pop();
              var n = n.join("."), i = this._dsf._obs, i = i[n] || {}, d = i[e];
              d && "function" == typeof d ? a(d, i) : (i = this._dsaf._obs, i = i[n] || {}, (d = i[e]) && "function" == typeof d && o(d, i));
            }
          }
        };
        for (e in t) window[e] = t[e];
        bridge.register("_hasJavascriptMethod", function(e, t) {
          return t = e.split("."), 2 > t.length ? !(!_dsf[t] && !_dsaf[t]) : (e = t.pop(), 
          t = t.join("."), (t = _dsf._obs[t] || _dsaf._obs[t]) && !!t[e]);
        });
      }
    }();
    var base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", hD = "0123456789ABCDEF", keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    module.exports = {
      onStateReceived: function onStateReceived(e) {
        return bridge.register("onStateReceived", function(t) {
          var r = base64_decode(t);
          return e(new Uint8Array(r));
        });
      },
      onCourtModeStarted: function onCourtModeStarted(e) {
        return bridge.register("onCourtModeStarted", e);
      },
      getMatch: function getMatch() {
        var e = bridge.call("getMatch", "123");
        try {
          e = JSON.parse(e);
        } catch (e) {}
        return e;
      },
      showCourtModeDialog: function showCourtModeDialog() {
        return bridge.call("showCourtModeDialog");
      },
      start: function start() {
        return bridge.call("start");
      },
      sendState: function sendState(e) {
        return bridge.call("sendState", binary_to_base64(e));
      },
      draw: function draw(e) {
        return bridge.call("draw", binary_to_base64(e));
      },
      win: function win(e) {
        return bridge.call("win", binary_to_base64(e));
      },
      lose: function lose(e) {
        return bridge.call("lose", binary_to_base64(e));
      },
      surrender: function surrender(e) {
        return bridge.call("surrender", binary_to_base64(e));
      },
      applyAction: function applyAction(e, t) {
        return bridge.call("applyAction", binary_to_base64(e), t);
      },
      getOnChainState: function getOnChainState(e) {
        return bridge.call("getOnChainState", "123", function(t) {
          var r = base64_decode(t);
          return e(new Uint8Array(r));
        });
      },
      getOnChainActionDeadline: function getOnChainActionDeadline(e) {
        return bridge.call("getOnChainActionDeadline", "123", e);
      },
      getCurrentBlockNumber: function getCurrentBlockNumber() {
        return bridge.call("getCurrentBlockNumber", "123");
      },
      finalizeOnChainGame: function finalizeOnChainGame(e) {
        return bridge.call("finalizeOnChainGame", "123", e);
      },
      submitScore: function submitScore(e) {
        return bridge.call("submitScore", e);
      },
      ready: function ready() {
        return bridge.call("ready");
      },
      onStart: function onStart(e) {
        return bridge.register("onStart", e);
      }
    };
    cc._RF.pop();
  }, {} ],
  table: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "adcebipSrZMgb1UHOlwts9Z", "table");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Fruits_Type;
    (function(Fruits_Type) {
      Fruits_Type[Fruits_Type["ShuiGuo"] = 1] = "ShuiGuo";
      Fruits_Type[Fruits_Type["DaoJu"] = 2] = "DaoJu";
    })(Fruits_Type = exports.Fruits_Type || (exports.Fruits_Type = {}));
    var Shape_Type;
    (function(Shape_Type) {
      Shape_Type[Shape_Type["PuTongFangKuai"] = 1] = "PuTongFangKuai";
      Shape_Type[Shape_Type["TeShuDaoJu"] = 2] = "TeShuDaoJu";
    })(Shape_Type = exports.Shape_Type || (exports.Shape_Type = {}));
    cc._RF.pop();
  }, {} ]
}, {}, [ "Config", "AudioController", "EventManager", "EventName", "GameFactory", "Cube", "CubeBg", "CubeRoot", "GameMgr", "GameScene", "OverLayer", "WelcomeScene", "TableMgr", "HashMap", "celerx", "table" ]);