import { useState, useRef } from "react";
import { TextField, Label, Input } from "react-aria-components";
import { motion, AnimatePresence } from "framer-motion";

export const App = () => {
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setNames([...names, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleButtonKeyDown = (index: number, event: React.KeyboardEvent) => {
    const name = names[index];
    if (event.key === "Backspace") {
      if (selectedNames.includes(name)) {
        setNames((prevNames) =>
          prevNames.filter((n) => !selectedNames.includes(n)),
        );
        setSelectedNames([]);
      } else {
        setNames((prevNames) => prevNames.filter((_, i) => i !== index));
      }
    } else if (event.key === " ") {
      event.preventDefault();
      if (selectedNames.includes(name)) {
        setSelectedNames(selectedNames.filter((n) => n !== name));
      } else {
        setSelectedNames([...selectedNames, name]);
      }
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (index + 1) % names.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = (index - 1 + names.length) % names.length;
      buttonRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="mx-auto max-w-xl py-5">
      <TextField>
        <Label className="mb-2">Tags input</Label>
        <Input
          placeholder="add filters..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full rounded-md border border-gray-700 p-2`}
        />
      </TextField>

      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
        <AnimatePresence>
          {names.map((name, index) => (
            <motion.button
              key={name}
              ref={(el) => (buttonRefs.current[index] = el)}
              initial={{ x: 0 }}
              animate={{ x: [-3, 0, -3], transition: { duration: 0.2 } }}
              exit={{
                y: 5,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.2 },
              }}
              className={`hover:bg-sky-70 focus:ring-offset-20 rounded-full border border-slate-400 bg-slate-100 px-3 py-1.5 text-sm font-normal leading-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                selectedNames.includes(name) ? "text-sky-500" : "text-gray-900"
              }`}
              onKeyDown={(e) => handleButtonKeyDown(index, e)}
            >
              {name}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
