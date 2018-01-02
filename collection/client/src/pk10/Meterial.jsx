var React = require('react');

class Meterial extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <div className="scenery-box">
                    <img className="scenery" src={"./images/video/" + this.props.sceneryType + ".jpg"} width="3588"
                         height="80"/>
                </div>
                {/* 背景素材 */}
                <img className="road" src="./images/video/road.jpg" alt=""/>
                <img className="finisher " src="./images/video/finisher.png" alt=""/>
            </div>
        )
    }
}


export default Meterial;