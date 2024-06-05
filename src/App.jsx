import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "", label: "Select Environment" },
    { value: "console", label: "Console" },
    { value: "stage", label: "Beta-V2" },
    { value: "dev", label: "Beta" },
  ];


  // const saveState = () => {
  //   const state = { inputValue, selectedOption };
  //   chrome.storage.sync.set({ formState: state }, () => {
  //     console.log('Form state saved');
  //   });
  // };
  
  const loadState = () => {
    chrome.storage?.sync.get('formState', (result) => {
      if (result && result.formState) {
        console.log(result);
        setInputValue(result.formState.inputValue);
        setSelectedOption(result.formState.selectedOption);
      } else {
        setInputValue("");
        setSelectedOption(null);
      }
    });
  };
  
  useEffect(() => {
    loadState();
  }, [inputValue, selectedOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // saveState({inputValue,selectedOption})
    console.log("Submitted value:", inputValue);
    console.log("Selected option:", selectedOption);
  };

  console.log(inputValue, selectedOption);

  return (
    <div className="App">
      <h1>Live2 Script</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="textInput">Paste Embed Id</label>
          <input
            id="textInput"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type here..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropdown">Choose an option:</label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
