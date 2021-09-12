import React from "react";
import { minutesToDuration } from "../utils/duration";
import { secondsToDuration } from "../utils/duration";

function TimeDisplay({ durations, session }) {
    const mode = session?.label === "Focusing" ? "focus" : "break";
    const duration = durations[`${mode}Duration`];
    const durationString = minutesToDuration(duration);

    return (
        <>
            <h2 data-testid="session-title">
                {session?.label} for {durationString} minutes
            </h2>
            <p className="lead" data-testid="session-sub-title">
                {secondsToDuration(session?.timeRemaining)} remaining
            </p>
        </>
    )
}

export default TimeDisplay;