var React = require('react');
/*
* 汽车模块
* */
class Car extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className={this.props.speed ? 'car-box car-speed' : 'car-box '}>
                <img src={"./images/video/car" + this.props.order + ".png"}/>
                {
                    (() => {
                        if (this.props.status == 'run') {
                            return (
                                <div>
                                    <p className="q-wheel wheel"><img
                                        src="./images/video/wheel.gif"/></p>
                                    <p className="h-wheel wheel">
                                        <img src="./images/video/wheel.gif"/></p>
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })()
                }
                <p className="wind "><img src="./images/video/wind.png"/></p>
                <p className="flame "><img src="./images/video/flame.png"/></p>
            </div>
        )
    }
}


export default Car;