var React = require('react');

/*
* Ready模块 倒计时
* */
class ReadyPanel extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        var styles = {
            base: {
                display: this.props.countDown > -1 ? 'inline-block' : 'none'
            },
            red: {
                display: this.props.countDown == 3 ? 'block' : 'none'
            },
            yellow: {
                display: this.props.countDown == 2 ? 'block' : 'none'
            },
            green: {
                display: this.props.countDown == 1 ? 'block' : 'none'
            }
        }
        return (
            <div className="ready-panel">
                <p className="count" style={styles.base}>
                    {Math.floor(this.props.countDown / 60) < 10 ? '0' + Math.floor(this.props.countDown / 60) : Math.floor(this.props.countDown / 60)}
                    :
                    {((this.props.countDown - Math.floor(this.props.countDown / 60) * 60) < 10) ? '0' + (this.props.countDown - Math.floor(this.props.countDown / 60) * 60) : (this.props.countDown - Math.floor(this.props.countDown / 60) * 60)}
                </p>
                <div className="light">
                    <img src="./images/video/trafficlight.png" style={styles.base}/>
                    <p className="red">
                        <img src="./images/video/lightred.png" style={styles.red}/>
                    </p>
                    <p className="yellow">
                        <img src="./images/video/lightyellow.png" style={styles.yellow}/>
                    </p>
                    <p className="green">
                        <img src="./images/video/lightgreen.png" style={styles.green}/>
                    </p>
                </div>
            </div>
        )
    }

    componentDidMount() {

    }
}


export default ReadyPanel;