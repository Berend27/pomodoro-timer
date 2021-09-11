import React from "react";

function TimeDisplay({ session }) {

    return (
        <>
            <h2 data-testid="session-title">
                {session?.label} for 25:00 minutes
            </h2>
            <p className="lead" data-testid="session-sub-title">
                {secondsToMinutesAndSeconds(session?.timeRemaining)} remaining
            </p>
        </>
    )
}

function secondsToMinutesAndSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
    const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${minutesString}:${secondsString}`;
}

export { secondsToMinutesAndSeconds };
export default TimeDisplay;