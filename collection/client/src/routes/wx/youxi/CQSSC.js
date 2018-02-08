import React, {Component} from 'react';
import {connect} from 'dva';
import {getCookie} from '../../../utils/cookies';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../../assets/wx/css/chongqingshishicai.css';
import {Icon, Spin, message} from 'antd';
import {getCurrLottery, getLive, bet} from '../../../services/wxEnd';
import CountDown from '../../../components/mobile/CountDown';
import * as p from '../ConstantsPath';
/**
 * Created by sven on 2018/1/7.
 */

const PATH_HISTORY = "/kaijianglishi";

const METHOD_01 = 1; //龙虎总和
const METHOD_021 = 21; //第一球~第五球
const METHOD_022 = 22; //第一球~第五球
const METHOD_023 = 23; //第一球~第五球
const METHOD_024 = 24; //第一球~第五球
const METHOD_025 = 25; //第一球~第五球
const METHOD_03 = 3; //斗牛
const METHOD_04 = 4; //前三
const METHOD_05 = 5; //中三
const METHOD_06 = 6; //后三

const methodM = {
  1: "龙虎总和",
  21: '第一球',
  22: '第二球',
  23: '第三球',
  24: '第四球',
  25: '第五球',
  3: '斗牛',
  4: '前三',
  5: '中三',
  6: '后三'
}


const options = [<option key="0" value="0">0</option>,
  <option key="2" value="2">2</option>,
  <option key="5" value="5">5</option>,
  <option key="10" value="10">10</option>,
  <option key="20" value="20">20</option>,
  <option key="50" value="50">50</option>,
  <option key="100" value="100">100</option>
];

class CQSSC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null,
      finish: false,
      opening: true,
      lottery: {time: '', current: {}, next: {}},
      method: METHOD_01,
      choice: {},
      historyChoices: {},
    }
    this.getLiveLottery();
  }

  componentDidMount() {
    this.getLiveLottery();
    const ticker = setInterval(this.getLiveLottery, 15000);
    this.setState({ticker});
  }

  getLiveLottery = () => {
    getLive({type: "CQSSC"})
      .then(data => {
        if (data.success) {
          this.setState({
            opening: this.state.lottery.next.leftTime > 0 ? false : true,
            lottery: data.result.lottery,
          });
        }
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  gotoKaijiangHISTORY = () => {
    hashHistory.push({pathname: PATH_HISTORY, state: {type: "CQSSC"}});
  }

  gotoRanking = () => {
    hashHistory.push({pathname: p.PATH_Ranking, state: {type: "CQSSC"}});
  }

  onMethodChange = (method) => {
    if (this.state.method !== method) {
      this.onRest();
      this.setState({
        method,
        choice: {},
      })
    }
  }

  onSend = () => {
    console.log(this.props.wx.userinfo)
    const {userid, username, nickname, avatar} = this.props.wx.userinfo;
    if (userid == undefined || userid == "") {
      hashHistory.push({pathname: p.PATH_Login});
      return
    }
    const {no, type} = this.state.lottery.next;
    const {method, choice} = this.state;
    if (Object.keys(choice).length == 0) {
      message.warn("您没有下注哦");
      return
    }
    const req = {userid, no, game: "CQSSC", method, choice, avatar, nickname: nickname || username}
    bet(req).then(data => {
      if (data.success) {
        const historyChoices = this.state.historyChoices;
        const c = historyChoices[this.state.method];
        if (c) {
          historyChoices[this.state.method] = {...c, ...choice}
        } else {
          historyChoices[this.state.method] = choice
        }
        this.setState({choice: {}, historyChoices});
        this.onRest();
        this.props.dispatch({ //更新当前显示金额
          type: 'wx/getUserInfo',
          payload: {userid: getCookie("userid")}
        })
        message.success("下注成功")
      } else {
        message.error(data.message)
      }
    });
  }

  onRest = () => {
    console.log(document.getElementById("form"))
    document.getElementById("form").reset();
  }

  //前三，中三，后三，三法的判断 arr.length=3
  sanFa = (arr) => {
    //console.log('================================', arr)
    function sortNumber(a, b) {
      return a - b
    }

    const a = arr.sort(sortNumber);
    // console.log('================================', arr, a)
    if (a[0] == a[1] && a[1] == a[2]) return '豹子';
    //019, 089 特殊判断
    if ((a[1] - a[0] == 1 && a[2] - a[1] == 1) || (a[0] == 0 && a[1] == 1 && a[2] == 9) || (a[0] == 0 && a[1] == 8 && a[2] == 9)) return '顺子';
    if (a[0] == a[1] || a[0] == a[2] || a[1] == a[2]) return '对子';
    //半顺里面包含了全顺，但是前面return全顺，没有问题。
    if (a[1] - a[0] == 1 || a[2] - a[1] == 1)  return '半顺';
    return '杂六';
  }

  //斗牛的判断 arr.length=5
  niu = (a, b, c, d, e, f) => {
    const sum3 = a + b + c;
    const sum2 = e + f;
    if (sum3 % 10 == 0) {
      return sum2 % 10
    } else {
      return -1;//'无牛'
    }
  }

  onValueChange = (e) => {
    const choice = this.state.choice;
    if (e.target.value < 0) {
      this.onRest();
      message.warn("输入无效")
      return
    }
    if (e.target.value == 0) {
      delete(choice[e.target.id])
    } else {
      choice[e.target.id] = parseInt(e.target.value);
    }
    this.setState({choice});
  }

  onCallBack = (data) => {
    this.setState({...data})
  }

  render() {
    const {method, historyChoices, finish, opening} = this.state;
    const {no, type, code, opentime} = this.state.lottery.current;
    //const {no, type, code, opentime} = this.state.lottery.next;

    var sum = 0;
    var longHu = '--';
    var qiansan = '--';
    var zhongsan = '--';
    var housan = '--';
    var nn = '';
    if (code !== undefined && code.split(",").length == 5) {
      const nums = code.split(",");
      sum = parseInt(nums[0]) + parseInt(nums[1]) + parseInt(nums[2]) + parseInt(nums[3]) + parseInt(nums[4])

      longHu = nums[0] > nums[4] ? '龙' : '虎';
      qiansan = this.sanFa([parseInt(nums[0]), parseInt(nums[1]), parseInt(nums[2])])
      zhongsan = this.sanFa([parseInt(nums[1]), parseInt(nums[2]), parseInt(nums[3])])
      housan = this.sanFa([parseInt(nums[2]), parseInt(nums[3]), parseInt(nums[4])])

      nn = this.niu(parseInt(nums[0]), parseInt(nums[1]), parseInt(nums[2]), parseInt(nums[3]), parseInt(nums[4]))
    }

    return (
      <div className="w">
        <div className="result">
          <div className="clf periods">
            <div className="fl name">重庆时时彩</div>
            <div className="fl number">第 <span>{this.state.lottery.next.no || '--'}</span> 期</div>
            <div className="fr time" id="time">
              <CountDown start={"10:00"} end={"22:00"}
                         time={this.state.lottery.next.leftTime}
                         interval={80}
                         callBack={this.onCallBack.bind(this)}/>
            </div>
          </div>

          <div className="lottery">
            <div className="clf top">
              <div className="fl qishu">{no || '--'}</div>
              <div className="fl clf haoma">
                {
                  code !== undefined && code !== "" ?
                    code.split(",").map((item, i) => {
                      return <img key={i} src={require(`../../../assets/wx/images/h-${item}.png`)}/>;
                    })
                    : ""
                }
              </div>
              <div className="fr btn">
                <a onClick={this.gotoRanking}>两面长龙</a>
                <a onClick={this.gotoKaijiangHISTORY}>开奖历史</a>
              </div>
            </div>
            <div className="center">
              <span className="sp1">总和：<i>{sum} {sum >= 23 ? '大' : '小'}</i> <i>{sum % 2 == 0 ? '双' : '单'}</i></span>
              {/*<span*/}
              {/*className="sp2">牛牛：<i>{nn == 0 ? '牛牛' : nn == -1 ? '无牛' : `牛${nn}`}</i> <i>{nn >= 0 && nn % 2 == 0 ? '牛双' : '牛单'}</i> <i>{nn >= 1 && nn <= 5 ? '牛小' : '牛大'}</i></span>*/}
            </div>
            <div className="bottom clf">
              <span className="sp1">龙虎：<i>{longHu}</i></span>
              <span className="sp2">前三：<i>{qiansan}</i> </span>
              <span className="sp2">中三：<i>{zhongsan}</i> </span>
              <span className="sp2">后三：<i>{housan}</i> </span>
            </div>
          </div>

          <div className="clf button">
            <form>
              <input type="submit" value="刷新" onClick={this.getLiveLottery}/>
            </form>
          </div>
        </div>


	  <div id="betting">
	  <div className={opening?"cover_div open":"cover_div"}><p>{finish?"已结束":"开奖中，请耐心等待..."}</p></div>
		<div className="top" id="btn">
		  <span onClick={() => this.onMethodChange(METHOD_01)}
				className={method == METHOD_01 ? 'redBG' : ''}>龙虎总和</span>
		  <span onClick={() => this.onMethodChange(METHOD_021)}
				className={method == METHOD_021 ? 'redBG' : ''}>第一球</span>
		  <span onClick={() => this.onMethodChange(METHOD_022)}
				className={method == METHOD_022 ? 'redBG' : ''}>第二球</span>
		  <span onClick={() => this.onMethodChange(METHOD_023)}
				className={method == METHOD_023 ? 'redBG' : ''}>第三球</span>
		  <span onClick={() => this.onMethodChange(METHOD_024)}
				className={method == METHOD_024 ? 'redBG' : ''}>第四球</span>
		  <span onClick={() => this.onMethodChange(METHOD_025)}
				className={method == METHOD_025 ? 'redBG' : ''}>第五球</span>
		  <span onClick={() => this.onMethodChange(METHOD_03)}
				className={method == METHOD_03 ? 'redBG' : ''}>斗牛</span>
		  <span onClick={() => this.onMethodChange(METHOD_04)}
				className={method == METHOD_04 ? 'redBG' : ''}>前三</span>
		  <span onClick={() => this.onMethodChange(METHOD_05)}
				className={method == METHOD_05 ? 'redBG' : ''}>中三</span>
		  <span onClick={() => this.onMethodChange(METHOD_06)}
				className={method == METHOD_06 ? 'redBG' : ''}>后三</span>
		</div>

		<div id="ctb">
		  <div className="bottom">
			<div className="clf title">
			  <span className="sp1">玩法</span>
			  <span className="sp2">赔率</span>
			  <span className="sp3">金额</span>
			  <span className="sp1">玩法</span>
			  <span className="sp2">赔率</span>
			  <span className="sp3">金额</span>
			</div>
			<form id="form">
			  {/*<!--1-龙虎总和->*/}
			  <div className={method == METHOD_01 ? "types" : "types hidden"}>
				<ul className="clf">
				  {
					['大', '小', '单', '双', '龙', '虎'].map(i => {
					  return (
						<span key={i}>
						 <li className="li1">{i}</li>
						  <li className="li2">1.995</li>
						  <li className="li3">
							<input type="number" onChange={this.onValueChange} id={`${i}`}/>
						</li>
					  </span>
					  )
					})
				  }

				  <li className="li1">和</li>
				  <li className="li2">9.000</li>
				  <li className="li3">
					<input type="number" onChange={this.onValueChange} id='和'/>
				  </li>
				</ul>
			  </div>
			</form>

			{/*<!--2-->*/}
			<div className={method > 10 ? "types" : "types hidden"}>
			  <ul className="clf">
				{
				  [0, 5, 1, 6, 2, 7, 3, 8, 4, 9].map(i => {
					return (
					  <span key={i}>
						 <li className="li1"><img src={require(`../../../assets/wx/images/h-${i}.png`)}/></li>
						  <li className="li2">1.995</li>
						  <li className="li3">
							<input type="number" onChange={this.onValueChange} id={`${i}`}/>
						</li>
					  </span>
					)
				  })
				}

				{
				  ['大', '小', '单', '双',].map(i => {
					return (
					  <span key={i}>
						 <li className="li1">{i}</li>
						  <li className="li2">1.995</li>
						  <li className="li3">
							<input type="number" onChange={this.onValueChange} id={`${i}`}/>
						</li>
					  </span>
					)
				  })
				}

			  </ul>
			</div>

			{/*<!--3-斗牛->*/}
			<div className={method == METHOD_03 ? "types" : "types hidden"}>
			  <ul className="clf">
				<li className="li1">无牛</li>
				<li className="li2">2.3</li>
				<li className="li3">
				  <input type="number" onChange={this.onValueChange} id='无牛'/>
				</li>


				{
				  ['牛五', '牛一', '牛六', '牛二', '牛七', '牛三', '牛八', '牛四', '牛九', '牛牛'].map(i => {
					return (
					  <span key={i}>
						  <li className="li1">{i}</li>
							  <li className="li2">9.9</li>
							  <li className="li3">
							  <input type="number" onChange={this.onValueChange} id={`${i}`}/>
						</li>
					  </span>
					)
				  })
				}


				<li className="li1"></li>
				<li className="li2"></li>
				<li className="li3"></li>


				{
				  ['牛大', '牛小', '牛单', '牛双'].map(i => {
					return (
					  <span key={i}>
						  <li className="li1">{i}</li>
							  <li className="li2">1.995</li>
							  <li className="li3">
							  <input type="number" onChange={this.onValueChange} id={`${i}`}/>
						</li>
					  </span>
					)
				  })
				}

			  </ul>
			</div>

			{/*<!--4-前三 中三 后三->*/}
			<div
			  className={method == METHOD_04 || method == METHOD_05 || method == METHOD_06 ? "types" : "types hidden"}>
			  <ul className="clf">

				{
				  [{k: '豹子', v: 75}, {k: '顺子', v: 18}, {k: '对子', v: 3.5}, {k: '半顺', v: 2.8}, {
					k: '杂六',
					v: 3.2
				  }].map(e => {
					return (
					  <span key={e.k}>
						 <li className="li1">{e.k}</li>
						  <li className="li2">{e.v}</li>
						  <li className="li3">
							<input type="number" onChange={this.onValueChange} id={`${e.k}`}/>
						</li>
					  </span>
					)
				  })
				}
			  </ul>
			</div>

		  </div>
		</div>

		<div className="xiazhu">
		  <div className="title">下注结果</div>
		  <ul>
			{
			  Object.keys(historyChoices).map(method => {
				return Object.keys(historyChoices[method]).map(e => {
				  return (
					<li className="clf">
					  <div className="fl left">{methodM[method]}： <span>{e}</span></div>
					  <div className="fl right">下注金额： <span>{historyChoices[method][e]}</span></div>
					</li>
				  );
				});
			  })
			}
		  </ul>
		</div>

		<div className="clf btns">
		  <input type="submit" className="ip1" value="投注" onClick={this.onSend}/>
		  <input type="submit" className="ip2" value="重填" onClick={this.onRest}/>
		</div>
	  </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(CQSSC);
