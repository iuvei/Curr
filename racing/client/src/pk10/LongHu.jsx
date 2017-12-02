var React = require('react');
/*
* 龙虎展示
* */
class LongHu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var style = {
            backgroundColor : '#629F08'
        }
        var returnCircle = function (first,second) {
            // console.log(first , second)
            if(first > second){
                return (
                    <span style={style}>龍</span>
                )
            }else{
                return (
                    <span>虎</span>
                )
            }

        };
        return (
            <div className="circles-panel">
                <em className="circles-type">1-5龙虎：</em>
                <p className="circles-box">
                    {
                        returnCircle(parseInt(this.props.ranking[0]),parseInt(this.props.ranking[9]))
                    }
                    {
                        returnCircle(parseInt(this.props.ranking[1]),parseInt(this.props.ranking[8]))
                    }
                    {
                        returnCircle(parseInt(this.props.ranking[2]),parseInt(this.props.ranking[7]))
                    }
                    {
                        returnCircle(parseInt(this.props.ranking[3]),parseInt(this.props.ranking[6]))
                    }
                    {
                        returnCircle(parseInt(this.props.ranking[4]),parseInt(this.props.ranking[5]))
                    }
                </p>
            </div>
        )
    }
}


export default LongHu;