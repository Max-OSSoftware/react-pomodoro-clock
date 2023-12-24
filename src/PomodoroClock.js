import React from 'react';
import LengthControl from './LengthControl'; 
import './PomodoroClock.css'; 


class PomodoroClock extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <h1>Pomodoro Clock</h1>

                <div id="timer-label">Session</div>
                <div id="time-left">25:00</div>

                <button id="start_stop" className="btn btn-primary">Start/Stop</button>
                <button id="reset" className="btn btn-danger">Reset</button>

                <LengthControl
                    title="Break Length"
                    labelId="break-label"
                    lengthId="break-length"
                    decrementId="break-decrement"
                    incrementId="break-increment"
                    length={5} />

                <LengthControl
                    title="Session Length"
                    labelId="session-label"
                    lengthId="session-length"
                    decrementId="session-decrement"
                    incrementId="session-increment"
                    length={25} />
            </div>
        );
    }
}

export default PomodoroClock;
