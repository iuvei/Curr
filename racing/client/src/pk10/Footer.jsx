var React = require('react');

import LongHu from './LongHu.jsx'
import YaGuan from './YaGuan.jsx'
class Footer extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <table className="footer">
                <tbody>
                <tr>
                    <td>
                        <div className="circles-panel">
                            <em className="circles-type">期号：{this.props.periodNumber}</em>
                        </div>
                    </td>
                    <td>
                        <YaGuan ranking={this.props.ranking}/>
                    </td>
                    <td>
                        <LongHu ranking={this.props.ranking}></LongHu>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}


export default Footer;