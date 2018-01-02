var React = require('react');

/*
* 汽车模块
* */
class Audio extends React.Component {

    constructor(props) {
        // voice countDown status
        super(props)
    }

    render() {
        return (
            <div className="mp3_box">
                {/* 提前缓存 */}
                <audio className="run_mp3" src="./mp3/run.mp3" loop></audio>
                <audio className="ready_mp3" src="./mp3/ready.mp3" loop></audio>
                <audio className="result_mp3" src="./mp3/result.mp3" loop></audio>
            </div>
        )
    }

    componentDidMount() {
        console.log('mount')
    }

    componentDidUpdate() {
        let runAudio = document.getElementsByClassName('run_mp3')[0];
        let readyAudio = document.getElementsByClassName('ready_mp3')[0];
        let resultAudio = document.getElementsByClassName('result_mp3')[0];
        // console.log(this.props.countDown,this.props.countDown)
        if (this.props.voice) {
            // 针对 ready
            if (this.props.countDown < 4 && this.props.countDown > 0) {
                console.log('coutDown' , this.props.countDown)
                readyAudio.play();
            } else {
                readyAudio.pause();
            }
            // 针对 run
            if (this.props.status === 'run') {
                runAudio.play();
            } else {
                runAudio.pause();
            }
            // 针对 result
            if (this.props.status === 'end') {
                resultAudio.play();
            } else {
                resultAudio.pause();
            }
        } else {
            // 暂停所有音频
            runAudio.pause();
            readyAudio.pause();
            resultAudio.pause();
        }
    }
}


export default Audio;