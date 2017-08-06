import React, {Component} from 'react';

import './paging.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class Paging extends Component {
    constructor(props) {
        super(props);
    }

    goTo(index) {
        if (index===0 || index > this.props.total){
            return;
        }
        this.props.callBack(index, this.props.pageSize)
    }


    genIndex () {
        const result = [];
        for(var i=0;i<this.props.total;i++){
            const n = i+1;
            result.push(<a key={i} className={(this.props.currPage===i+1)?"current":""} onClick={()=>this.goTo(n)}>{i+1}</a>);
        }
        return result;
    }

    render() {
        return (
            <div id="Paging" className="paging">
                <div className="qzPagination">
                    <a className={this.props.currPage===1?"disabled prev":"prev"} onClick={()=>this.goTo(this.props.currPage-1)}>«</a>
                    {this.genIndex()}
                    <a className={this.props.currPage===this.props.total?"disabled":""} onClick={()=>this.goTo(this.props.currPage+1)}>»</a>
                </div>
            </div>
        );
    }
}


