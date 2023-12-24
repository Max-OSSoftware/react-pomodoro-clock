import React from 'react';
import './PomodoroClock.css'; 

class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerLabel: 'Session',
            timeLeft: 25 * 60, // in seconds
            isRunning: false,
            intervalID: null,
        };
    }

    handleIncrement = (type) => {
        if (this.state[type] < 60) {
            this.setState({ [type]: this.state[type] + 1 });
        }
    }

    handleDecrement = (type) => {
        if (this.state[type] > 1) {
            this.setState({ [type]: this.state[type] - 1 });
        }
    }

    toggleTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.state.intervalID);
            this.setState({ isRunning: false, intervalID: null });
        } else {
            let intervalID = setInterval(this.decrementTimer, 1000);
            this.setState({ isRunning: true, intervalID: intervalID });
        }
    }

    decrementTimer = () => {
        if (this.state.timeLeft > 0) {
            this.setState({ timeLeft: this.formatTime(this.state.timeLeft - 1) });
        }
        if (this.state.timeLeft === '00:00') {
            this.playBeep();
            this.switchTimer();
        }
    };
    

    switchTimer = () => {
        if (this.state.timerLabel === 'Session') {
            this.setState({
                timerLabel: 'Break',
                timeLeft: this.state.breakLength * 60
            });
        } else {
            this.setState({
                timerLabel: 'Session',
                timeLeft: this.state.sessionLength * 60
            });
        }
    }

    handleReset = () => {
        clearInterval(this.state.intervalID);
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timerLabel: 'Session',
            timeLeft: this.formatTime(25 * 60),
            isRunning: false,
            intervalID: null,
        });
        this.stopBeep();
    }

    formatTime = (timeInSeconds) => {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }


    playBeep = () => {
        document.getElementById('beep').play();
    }

    stopBeep = () => {
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;
    }

    render() {
        return (
            <div className="container text-center">
                <h1 className="text-decoration-underline" >Pomodoro Clock</h1>
                <p className="fw-normal fs-6">by zapboy216</p>

                <div id="timer-label">{this.state.timerLabel}</div>
                <div id="time-left">{this.formatTime(this.state.timeLeft)}</div>
                

                <button id="start_stop" className="btn btn-primary" onClick={this.toggleTimer}>
                    Start/Stop
                </button>
                <button id="reset" className="btn btn-danger" onClick={this.handleReset}>
                    Reset
                </button>

                <div className="length-control">
                    <div id="break-label">Break Length</div>
                    <button id="break-decrement" className="btn btn-secondary" onClick={() => this.handleDecrement('breakLength')}>
                        -
                    </button>
                    <span id="break-length">{this.state.breakLength}</span>
                    <button id="break-increment" className="btn btn-secondary" onClick={() => this.handleIncrement('breakLength')}>
                        +
                    </button>
                </div>

                <div className="length-control">
                    <div id="session-label">Session Length</div>
                    <button id="session-decrement" className="btn btn-secondary" onClick={() => this.handleDecrement('sessionLength')}>
                        -
                    </button>
                    <span id="session-length">{this.state.sessionLength}</span>
                    <button id="session-increment" className="btn btn-secondary" onClick={() => this.handleIncrement('sessionLength')}>
                        +
                    </button>
                </div>

                <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio>
            </div>
        );
    }
}

export default PomodoroClock;
