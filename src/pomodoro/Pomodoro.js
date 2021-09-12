import DurationControl from "./DurationControls";
import React, { useState } from "react";
import TimerControls from "./TimerControls";
import TimeDisplay from "./TimeDisplay";
import useInterval from "../utils/useInterval";
import BarraDeProgreso from "./BarraDeProgreso";

const initialDurations = {
  focusDuration : 25,
  breakDuration : 5,
}

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {

  const [aria, setAria] = useState(0);
  const [durations, setDurations] = useState(initialDurations);
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  const renderProgressDisplay = () => {
    if (session) {
      return (
        <div> 
          <div className="row mb-2">
            <div className="col">
              <TimeDisplay durations = {durations} session={session} />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <BarraDeProgreso aria={aria}/>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(durations.focusDuration, durations.breakDuration));
      }
      setAria(() => {
        if (session == null) return 0;
        const totalTime = session?.label === "Focusing" ? 60 * durations.focusDuration : 60 * durations.breakDuration;
        const timePercentage = 100 * ((totalTime - session.timeRemaining) / totalTime);
        return timePercentage;
      });
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: durations.focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }
  

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <DurationControl 
            dataTestIdEnding="focus" 
            durations={durations} 
            setDurations={setDurations} 
            session={session}
          />
        </div>
        <div className="col">
          <DurationControl 
            dataTestIdEnding="break" 
            durations={durations} 
            setDurations={setDurations} 
            float="right" 
            session={session} 
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TimerControls 
            setDurations={setDurations}
            isTimerRunning={isTimerRunning} 
            setIsTimerRunning={setIsTimerRunning} 
            playPause={playPause} 
            setSession={setSession} 
          />
        </div>
      </div>
      {renderProgressDisplay()}
    </div>
  );
}

export { initialDurations };
export default Pomodoro;
