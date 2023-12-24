import React from 'react';
import './PomodoroClock.css'; 

class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,  // Break length 5 minutes
            sessionLength: 25, // Session length 25 minutes
            timerLabel: 'Session',
            timeLeft: 25 * 60, // Time left in seconds
            isRunning: false,
            intervalID: null
        };
    }

    // Format time to mm:ss
    formatTime = (timeInSeconds) => {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Toggle start and stop of the timer
    toggleTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.state.intervalID);
            this.setState({ isRunning: false, intervalID: null });
        } else {
            let intervalID = setInterval(this.decrementTimer, 1000);
            this.setState({ isRunning: true, intervalID: intervalID });
        }
    }

    // Decrement the timer
    decrementTimer = () => {
        if (this.state.timeLeft > 0) {
            this.setState({ timeLeft: this.state.timeLeft - 1 });
        }
        if (this.state.timeLeft === 0) {
            this.playBeep();
            this.switchTimer();
        }
    }

    // Switch between session and break
    switchTimer = () => {
        let newLabel = this.state.timerLabel === 'Session' ? 'Break' : 'Session';
        let newTime = (newLabel === 'Session' ? this.state.sessionLength : this.state.breakLength) * 60;
        this.setState({
            timerLabel: newLabel,
            timeLeft: newTime
        });
    }

    // Handle reset
    handleReset = () => {
        clearInterval(this.state.intervalID);
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timerLabel: 'Session',
            timeLeft: 25 * 60,
            isRunning: false,
            intervalID: null,
        });
        this.stopBeep();
    }

    // Play beep sound
    playBeep = () => {
        document.getElementById('beep').play();
    }

    // Stop and reset beep sound
    stopBeep = () => {
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;
    }

    // Change timer (increment/decrement session/break)
    changeTimer = (operator, type) => {
        const value = this.state[type];
        if (operator === 'decrement' && value > 1) {
            this.setState({
                [type]: value - 1,
                timeLeft: (type === this.state.timerLabel.toLowerCase() + 'Length') 
                          ? (value - 1) * 60 
                          : this.state.timeLeft
            });
        }
        if (operator === 'increment' && value < 60) {
            this.setState({
                [type]: value + 1,
                timeLeft: (type === this.state.timerLabel.toLowerCase() + 'Length') 
                          ? (value + 1) * 60 
                          : this.state.timeLeft
            });
        }
    };

    render() {
        return (
            <div className="container text-center">
                <h1>A Pomodoro Clock</h1>
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
                    <button id="break-decrement" className="btn btn-secondary" onClick={() => this.changeTimer('decrement', 'breakLength')}>
                        -
                    </button>
                    <span id="break-length">{this.state.breakLength}</span>
                    <button id="break-increment" className="btn btn-secondary" onClick={() => this.changeTimer('increment', 'breakLength')}>
                        +
                    </button>
                </div>
                <div className="length-control">
                    <div id="session-label">Session Length</div>
                    <button id="session-decrement" className="btn btn-secondary" onClick={() => this.changeTimer('decrement', 'sessionLength')}>
                        -
                    </button>
                    <span id="session-length">{this.state.sessionLength}</span>
                    <button id="session-increment" className="btn btn-secondary" onClick={() => this.changeTimer('increment', 'sessionLength')}>
                        +
                    </button>
                </div>
                <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio>
            </div>
        );
    }
}

export default PomodoroClock;
