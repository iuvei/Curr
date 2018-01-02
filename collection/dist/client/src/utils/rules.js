'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by sven on 2017/8/19.
 */

/*
 【1~10名猜车号】
 每一个车号为一竞猜组合，开奖结果「竞猜车号」对应所猜「车道」视为中奖，其余情形视为不中奖。
 ■奖历：含本10倍
 ■限额：10-10,000
 ■格式：名次/号码/金额
 　例：12345/89/20 = 1~5名次的8号、9号各买20 = 总200
 　例：1357/890/20 = 1.3.5.7名次的8号、9号、10号各买20 = 总240


 玩法：

 名次/大小单双/金额


 【1~10名猜大小单双】
 第一名〜第十名车号：开出之号码大于或等于6为大，小于或等于5为小。开出的号码偶数为双，号码奇数为单。

 ■格式：名次/大小单双/金额
 　例：12345/双/100 = 1~5车道买双各100 = 总500

 【1~10名猜组合】
 竞猜内容为「大单」「小双」「小单」「大双」，共4种。
 ■奖历：
 　「大单」、「小双」,「小单」、「大双」含本4倍。
 ■限额：10-10,000
 ■格式：名次/组合/金额
 　例：890/大单/50 = 8.9.10车道大单各买50 = 总150


 【1~5名猜龙虎】
 (1)第一名vs第十名，(2)第二名vs第九名，(3)第三名vs第八名，(4)第四名vs第七名，(5)第五名vs第六名，前比后大为龙，反之为虎。
 ■奖历：含本2倍
 ■限额：10-20,000
 ■格式：名次/号码/金额
 　例：123/龙/100 = 1~3车道买龙各100=总300


 【冠亚猜庄闲】
 冠军车号「大于」亚军车号为庄，反之为闲。
 ■奖历：含本2倍
 ■限额：10-20,000
 ■格式：庄闲/金额
 　例：庄/200 = 冠军大于亚军即中奖


 【猜冠亚号码】
 猜冠军及亚军车号(前2名)，每次竞猜2个号码，顺序不限。
 ■奖历：含本40倍
 ■限额：10-5,000
 ■格式：组/号码/金额
 　例：组/5-6/50 = 5号.6号车在冠亚军(顺序不限) = 总50
 　例：组/1-9.3-7/100 = 1.9号车或3.7号车在冠亚军(顺序不限) = 总200


 冠亚和值(特码)猜大小单双】
 冠军车号+亚军车号 = 冠亚和值 = 特码 = 数字3~19
 冠亚和值大于或等于12为大，小于或等于11为小。开出的号码偶数为双，号码奇数为单。
 ■奖历：
 　「大」、「双」,「小」、「单」含本2倍。
 ■限额：10-20,000
 ■格式：和(特)/大小单双/金额
 　例：和/双/100 = 「冠亚和」的双100
 　例：和/大/100 = 「冠亚和」的大100

 特：指定特殊数值


 【冠亚和值(特码)猜数字】
 「冠亚和值」为「特码」可能出现的结果为3~19，竞猜中对应「冠亚和值」数字的视为中奖，其余视为不中奖。
 ■奖历：
 　3.4.18.19，含本42倍，限额10-1,000
 　5.6.16.17，含本21倍，限额10-2,000
 　7.8.14.15，含本14倍，限额10-3,000
 　9.10.12.13，含本10倍，限额10-4,000
 　11，含本8倍，限额10-5,000
 ■格式：和(特)/数字/金额
 　例：和5.6.7/100 = 竞猜「冠亚和」的值为5或6或7各100 = 总300



 【冠亚和值(特码)猜区段】
 特码3~7为A段，8~14为B段，15~19为C段。
 ■奖历：
 　「A」、「C」含本4倍。
 　「B」含本1.5倍。
 ■限额：10-10,000
 ■格式：ABC/金额
 　例：BC/100 = 投注BC段位各100＝总200


 【说明】
 ■没带名次默认竞猜第一名，如「双/100」第一名双100、「123/100」第一名123号各100
 ■竞猜时因各地网路品质不定，可能有1-2秒延迟，以系统判定是否竞猜成功为准。
 ■0号即为10号，竞猜时输入0即为10，输入10即为1、10号。
 　例：0/0/100 = 视为竞猜第10名10号车冠军
 　例：0/100 = 视为竞猜第1名10号车冠军
 */

var Rule = function () {
  function Rule(rule, odds) {
    _classCallCheck(this, Rule);

    this.rule = rule;
    this.odds = odds;
  }

  _createClass(Rule, [{
    key: 'test',
    value: function test(input) {
      return this.rule.test(input);
    }
  }, {
    key: 'amount',
    value: function amount(input) {}
  }, {
    key: 'gain',
    value: function gain(input, lottery) {}
  }, {
    key: 'toString',
    value: function toString() {
      return '(' + this.input + ')';
    }
  }]);

  return Rule;
}();

var Rule01 = function (_Rule) {
  _inherits(Rule01, _Rule);

  /*
   【1~10名猜车号】
   每一个车号为一竞猜组合，开奖结果「竞猜车号」对应所猜「车道」视为中奖，其余情形视为不中奖。
   ■奖历：含本9.8倍
   ■限额：10-10,000
   ■格式：名次/号码/金额
   　例：12345/89/20 = 1~5名次的8号、9号各买20 = 总200
   　例：1357/890/20 = 1.3.5.7名次的8号、9号、10号各买20 = 总240
   */
  function Rule01(odds) {
    _classCallCheck(this, Rule01);

    var reg = /^[0-9]{1,10}\/[0-9]{1,10}\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule01.__proto__ || Object.getPrototypeOf(Rule01)).call(this, reg, odds));
  }

  _createClass(Rule01, [{
    key: 'amount',
    value: function amount(input) {
      console.log('=============input=========', input);
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return inputs[0].length * inputs[1].length * inputs[2];
      }
    }
  }]);

  return Rule01;
}(Rule);

var Rule02 = function (_Rule2) {
  _inherits(Rule02, _Rule2);

  /*
   【【1~10名猜大小单双】
   第一名〜第十名车号：开出之号码大于或等于6为大，小于或等于5为小。开出的号码偶数为双，号码奇数为单。
    ■格式：名次/大小单双/金额
   　例：12345/双/100 = 1~5车道买双各100 = 总500
   */
  function Rule02(odds) {
    _classCallCheck(this, Rule02);

    var reg = /^[0-9]{1,10}\/[大小单双]\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule02.__proto__ || Object.getPrototypeOf(Rule02)).call(this, reg, odds));
  }

  _createClass(Rule02, [{
    key: 'amount',
    value: function amount(input) {
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return inputs[0].length * inputs[1].length * inputs[2];
      }
    }
  }]);

  return Rule02;
}(Rule);

var Rule03 = function (_Rule3) {
  _inherits(Rule03, _Rule3);

  /*
   【1~10名猜组合】
   竞猜内容为「大单」「小双」「小单」「大双」，共4种。
   ■奖历：
   　「大单」、「小双」含本4.5倍，
   　「小单」、「大双」含本3倍。
   ■限额：10-10,000
   ■格式：名次/组合/金额
   　例：890/大单/50 = 8.9.10车道大单各买50 = 总150
   */
  function Rule03(odds) {
    _classCallCheck(this, Rule03);

    var reg = /^[0-9]{1,10}\/[大小][单双]\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule03.__proto__ || Object.getPrototypeOf(Rule03)).call(this, reg, odds));
  }

  _createClass(Rule03, [{
    key: 'amount',
    value: function amount(input) {
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return inputs[0].length * inputs[2];
      }
    }
  }]);

  return Rule03;
}(Rule);

var Rule04 = function (_Rule4) {
  _inherits(Rule04, _Rule4);

  /*
   【1~5名猜龙虎】
   (1)第一名vs第十名，(2)第二名vs第九名，(3)第三名vs第八名，(4)第四名vs第七名，(5)第五名vs第六名，前比后大为龙，反之为虎。
   ■奖历：含本1.96倍
   ■限额：10-20,000
   ■格式：名次/号码/金额
   　例：123/龙/100 = 1~3车道买龙各100=总300
   */
  function Rule04(odds) {
    _classCallCheck(this, Rule04);

    var reg = /^[1-5]{1,5}\/[龙虎]\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule04.__proto__ || Object.getPrototypeOf(Rule04)).call(this, reg, odds));
  }

  _createClass(Rule04, [{
    key: 'amount',
    value: function amount(input) {
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return inputs[0].length * inputs[2];
      }
    }
  }]);

  return Rule04;
}(Rule);

var Rule05 = function (_Rule5) {
  _inherits(Rule05, _Rule5);

  /*
   【冠亚猜庄闲】
   冠军车号「大于」亚军车号为庄，反之为闲。
   ■奖历：含本1.96倍
   ■限额：10-20,000
   ■格式：庄闲/金额
   　例：庄/200 = 冠军大于亚军即中奖
   */
  function Rule05(odds) {
    _classCallCheck(this, Rule05);

    var reg = /^[庄闲]\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule05.__proto__ || Object.getPrototypeOf(Rule05)).call(this, reg, odds));
  }

  _createClass(Rule05, [{
    key: 'amount',
    value: function amount(input) {
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return 1 * inputs[1];
      }
    }
  }]);

  return Rule05;
}(Rule);

var Rule06 = function (_Rule6) {
  _inherits(Rule06, _Rule6);

  /*
   【猜冠亚号码】
   猜冠军及亚军车号(前2名)，每次竞猜2个号码，顺序不限。
   ■奖历：含本40倍
   ■限额：10-5,000
   ■格式：组/号码/金额
   　例：组/5-6/50 = 5号.6号车在冠亚军(顺序不限) = 总50
   　例：组/1-9.3-7/100 = 1.9号车或3.7号车在冠亚军(顺序不限) = 总200
   */
  function Rule06(odds) {
    _classCallCheck(this, Rule06);

    var reg = /^组\/([0-9]-[0-9].){0,10}[0-9]-[0-9]\/[0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule06.__proto__ || Object.getPrototypeOf(Rule06)).call(this, reg, odds));
  }

  _createClass(Rule06, [{
    key: 'amount',
    value: function amount(input) {
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return inputs[1].split(".").length * inputs[2];
      }
    }
  }]);

  return Rule06;
}(Rule);

var Rule07 = function (_Rule7) {
  _inherits(Rule07, _Rule7);

  /*
   冠亚和值(特码)猜大小单双】
   冠军车号+亚军车号 = 冠亚和值 = 特码 = 数字3~19
   冠亚和值大于或等于12为大，小于或等于11为小。开出的号码偶数为双，号码奇数为单。
   ■奖历：
   　「大」、「双」含本2.1倍。
   　「小」、「单」含本1.7倍。
   ■限额：10-20,000
   ■格式：和/大小单双/金额
   　例：和/双/100 = 「冠亚和」的双100
   　例：和/大/100 = 「冠亚和」的大100
    特：指定特殊数值
   */
  function Rule07(odds) {
    _classCallCheck(this, Rule07);

    var reg = /^和\/[大小单双]\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule07.__proto__ || Object.getPrototypeOf(Rule07)).call(this, reg, odds));
  }

  _createClass(Rule07, [{
    key: 'amount',
    value: function amount(input) {
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return 1 * inputs[2];
      }
    }
  }]);

  return Rule07;
}(Rule);

var Rule08 = function (_Rule8) {
  _inherits(Rule08, _Rule8);

  /*
   【冠亚和值(特码)猜数字】
   「冠亚和值」为「特码」可能出现的结果为3~19，竞猜中对应「冠亚和值」数字的视为中奖，其余视为不中奖。
   ■奖历：
   　3.4.18.19，含本42倍，限额10-1,000
   　5.6.16.17，含本21倍，限额10-2,000
   　7.8.14.15，含本14倍，限额10-3,000
   　9.10.12.13，含本10倍，限额10-4,000
   　11，含本8倍，限额10-5,000
   ■格式：特/数字/金额
   　例：特/5.6.7/100 = 竞猜「冠亚和」的值为5或6或7各100 = 总300
   */
  function Rule08(odds) {
    _classCallCheck(this, Rule08);

    var reg = /^特\/(\d+.)*\d+\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule08.__proto__ || Object.getPrototypeOf(Rule08)).call(this, reg, odds));
  }

  _createClass(Rule08, [{
    key: 'test',
    value: function test(input) {
      if (this.rule.test(input)) {
        var res = input.match(/\d+/g);
        if (res.length > 1) {
          for (var i = 0; i < res.length - 1; i++) {
            if (res[i] < 3 || res[i] > 19) {
              return false;
            }
          }
          return true;
        }
        return false;
      }
      return false;
    }
  }, {
    key: 'amount',
    value: function amount(input) {
      if (!this.test(input)) {
        return 0;
      } else {
        var inputs = input.split("/");
        return inputs[1].split(".").length * inputs[2];
      }
    }
  }]);

  return Rule08;
}(Rule);

var Rule09 = function (_Rule9) {
  _inherits(Rule09, _Rule9);

  /*
   【冠亚和值(特码)猜区段】
   特码3~7为A段，8~14为B段，15~19为C段。
   ■奖历：
   　「A」、「C」含本4.5倍。
   　「B」含本1.5倍。
   ■限额：10-10,000
   ■格式：ABC/金额
   　例：BC/100 = 投注BC段位各100＝总200
   */
  function Rule09(odds) {
    _classCallCheck(this, Rule09);

    var reg = /^[ABC]{1,3}\/[1-9][0-9]{1,3}$/;
    return _possibleConstructorReturn(this, (Rule09.__proto__ || Object.getPrototypeOf(Rule09)).call(this, reg, odds));
  }

  return Rule09;
}(Rule);

var RuleFactory = function RuleFactory() {};
RuleFactory.rules = [new Rule01(), new Rule02(), new Rule03(), new Rule04(), new Rule05(), new Rule06(), new Rule07(), new Rule08(), new Rule09()];
RuleFactory.match = function (input) {
  for (var i = 0; i < this.rules.length; i++) {
    if (this.rules[i].test(input)) return this.rules[i];
  }
};

RuleFactory.isMatch = function (input) {
  for (var i = 0; i < this.rules.length; i++) {
    console.log(this.rules[i], this.rules[i].test(input), input);
    if (this.rules[i].test(input)) return true;
  }
};

module.exports = {
  RuleFactory: RuleFactory,
  Rule: Rule,
  Rule01: Rule01
};
//# sourceMappingURL=rules.js.map