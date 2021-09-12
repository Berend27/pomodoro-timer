import React from "react";
import { minutesToDuration } from "../utils/duration";

// There are two of these in the app,
// one for setting the focus duration
// and one for setting the break duration
function DurationControls({ dataTestIdEnding, durations, setDurations, float = "left", session }) {
    const mode = titleCase(dataTestIdEnding);
    const duration = durations[`${dataTestIdEnding}Duration`];
    const durationString = minutesToDuration(duration);

    const handleMinusClick = () => {
        if (session === null) {
            if (dataTestIdEnding === "focus" && duration > 5) {
                setDurations((currentDurations) => {
                    return {
                        ...currentDurations,
                        [`${dataTestIdEnding}Duration`] : currentDurations[`${dataTestIdEnding}Duration`] - 5,
                    }
                });
            } else if (dataTestIdEnding === "break" && duration > 1) {
                setDurations((currentDurations) => {
                    return {
                        ...currentDurations,
                        [`${dataTestIdEnding}Duration`] : currentDurations[`${dataTestIdEnding}Duration`] - 1,
                    }
                });
            }
        }
    }

    const handlePlusClick = () => {
        if (session === null) {
            if (dataTestIdEnding === "focus" && duration < 60) {
                setDurations((currentDurations) => {
                    return {
                        ...currentDurations,
                        [`${dataTestIdEnding}Duration`] : currentDurations[`${dataTestIdEnding}Duration`] + 5,
                    }
                });
            } else if (dataTestIdEnding === "break" && duration < 15) {
                setDurations((currentDurations) => {
                    return {
                        ...currentDurations,
                        [`${dataTestIdEnding}Duration`] : currentDurations[`${dataTestIdEnding}Duration`] + 1,
                    }
                });
            }
        }
    }

    return (
        <div className={`float-${float}`}>
            <div className="input-group input-group-lg mb-2">
                <span className="input-group-text" data-testid={`duration-${dataTestIdEnding}`}>
                {mode} Duration: {durationString}
                </span>
                <div className="input-group-append">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-testid={`decrease-${dataTestIdEnding}`}
                    onClick={handleMinusClick}
                >
                    <span className="oi oi-minus" />
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-testid={`increase-${dataTestIdEnding}`}
                    onClick={handlePlusClick}
                >
                    <span className="oi oi-plus" />
                </button>
                </div>
            </div>
        </div>
    )
}

const titleCase = function(str) {
    return str.toLowerCase().split(' ').map((word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
};

export { titleCase };
export default DurationControls;