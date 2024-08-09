import { useState } from "react";
import { TextField, Label, Input } from "react-aria-components";
import { motion, AnimatePresence } from "framer-motion";

export const App = () => {
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setNames([...names, inputValue.trim()]);
      setInputValue(""); // Clear the input field after adding the name
    }
  };

  const handleButtonKeyDown = (index: number, event: { key: string }) => {
    if (event.key === "Backspace") {
      setNames((prevNames) => prevNames.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="mx-auto max-w-xl py-5">
      <TextField>
        <Label>First name</Label>
        <Input
          placeholder="add filters..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full rounded-md border border-gray-700 p-2`}
        />
      </TextField>

      <div className="mt-4 flex flex-wrap space-x-2">
        <AnimatePresence>
          {names.map((name, index) => (
            <motion.button
              key={name}
              initial={{ x: -3 }}
              animate={{ x: 0 }}
              exit={{ y: 5, opacity: 0, transition: { duration: 0.2 } }}
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
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
