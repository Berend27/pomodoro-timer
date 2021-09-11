import classNames from "../utils/class-names";
import { initialDurations } from "./Pomodoro";
import React from "react";

function TimerControls({ setDurations, isTimerRunning, setIsTimerRunning, playPause, setSession }) {

    const handleStopClick = () => {
        setIsTimerRunning(false);
        setSession(null);
        setDurations(initialDurations);
    }

    return (
        <>
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              disabled={isTimerRunning}
              title="Stop the session"
              onClick={handleStopClick}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </>
    )
}

export default TimerControls;