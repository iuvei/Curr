var React = require('react');
/*
* Result模块
* */
class ResultPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            display: this.props.show ? 'block' : 'none'
        };
        return (
            <div className={this.props.show ? "result-panel result-animation" : "result-panel"} style={style}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <img src="./images/video/result2.png" width="50%"/>
                            <img className="winner winner-two"
                                 src={"./images/video/winner" + parseInt(this.props.ranking[1]) + ".png"}
                                 width="80%"/>
                        </td>
                        <td>
                            <img src="./images/video/result1.png" width="50%"/>
                            <img className="winner winner-one"
                                 src={"./images/video/winner" + parseInt(this.props.ranking[0]) + ".png"}
                                 width="80%"/>
                        </td>
                        <td>
                            <img src="./images/video/result3.png" width="50%"/>
                            <img className="winner winner-three"
                                 src={"./images/video/winner" + parseInt(this.props.ranking[2]) + ".png"}
                                 width="80%"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}



export default ResultPanel;