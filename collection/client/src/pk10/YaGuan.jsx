var React = require('react');

/*
* 汽车模块
* */
class YaGuan extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var style = {
            backgroundColor : '#629F08'
        }
        var num = parseInt(this.props.ranking[0]) + parseInt(this.props.ranking[1])
        return (
            <div className="circles-panel">
                <em className="circles-type">冠亚和：</em>
                <p className="circles-box">
                    <span>{num}</span>
                    <span style={num > 11?style:null}>{num > 11 ? '大' : '小'}</span>
                    <span style={num % 2 === 0?style:null}>{num % 2 === 1 ? '单' : '双'}</span>
                </p>
            </div>
        )
    }
}


export default YaGuan;