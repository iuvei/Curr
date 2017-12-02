var React = require('react');
/*
* 排名模块
* */
class NumPanel extends React.Component {

    constructor(props) {
        // nums type
        super(props)
    }

    render() {
        return (
            <div className={this.props.type + '-num num-panel'}>
                {
                    this.props.nums.map(function (num, index) {
                        return (
                            <span key={index} data-num={num} className={'num-box n' + num}>{parseInt(num)}</span>
                        )
                    })
                }
            </div>
        )
    }
}

export default NumPanel;