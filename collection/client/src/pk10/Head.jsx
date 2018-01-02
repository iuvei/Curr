var React = require('react');

import NumPanel from './NumPanel.jsx'

class Head extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <table className="head">
                <tbody>
                <tr>
                    <td>
                        <img src="./images/video/pk10.png" height="42"/>
                    </td>
                    <td>
                        <NumPanel nums={this.props.ranking} type="pk10"/>
                    </td>
                    <td>
                        <p>下期：<span className="next">{this.props.nextid}</span></p>
                    </td>
                    <td>
                        <div className={this.props.voice? 'voice' : 'voice-none'} onClick={this.props.handleClickVoice}>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}


export default Head;