import { useState } from "react";

// this displays the recipe instructions with checkboxes to tick off after completion

function InstructionList({ instructions }) {
    const [checkedSteps, setCheckedSteps] = useState([]);

    // this is the toggle done/undone
    function handleStepToggle(index) {
        setCheckedSteps((prev) =>
            prev.includes(index)
                ? prev.filter((step) => step !== index)
                : [...prev, index]
        );
    }

    return (
        <div className="p-6">
            <h2 className="barlow-condensed-regular text-2xl text-text mb-4">
                Instructions
            </h2>

            <ol className="flex flex-col gap-3">
                {instructions.map((instruction, index) => (
                    <li key={index} className={`flex items-start gap-3 barlow-condensed-light text-text cursor-pointer ${checkedSteps.includes(index) ? "line-through opacity-50" : ""
                        }`}
                        onClick={() => handleStepToggle(index)}>
                        <input type="checkbox" className="mt-1 accent-button cursor-pointer" checked={checkedSteps.includes(index)}
                        onChange={() => handleStepToggle(index)}>
                        </input>
                        <span>{instruction}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default InstructionList;