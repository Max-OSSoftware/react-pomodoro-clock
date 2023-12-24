import React from 'react';

class LengthControl extends React.Component {
    render() {
        return (
            <div className="length-control">
                <div id={this.props.labelId}>{this.props.title}</div>
                <button id={this.props.decrementId} className="btn btn-secondary">-</button>
                <span id={this.props.lengthId}>{this.props.length}</span>
                <button id={this.props.incrementId} className="btn btn-secondary">+</button>
            </div>
        );
    }
}

export default LengthControl;
