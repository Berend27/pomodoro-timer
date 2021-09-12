import classNames from "../utils/class-names";
import React, { useState } from "react";

function TimerControls({ isTimerRunning, setIsTimerRunning, playPause, setSession }) {

    const [disable, setDisable] = useState(true);

    const handlePlayClick = () => {
      playPause();
      setDisable(false);
    }

    const handleStopClick = () => {
        setDisable(true)
        setIsTimerRunning(false);
        setSession(null);
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
              onClick={handlePlayClick}
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
              disabled={disable}
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