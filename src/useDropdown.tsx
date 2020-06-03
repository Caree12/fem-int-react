import React, { useState, FunctionComponent, Dispatch } from "react";

// define type of params - label is a string, defaultState is any, options is an array of strings - teacher had to check his notes for what these are
const useDropdown = (label:string, defaultState:any, options:string[]) => {
  const [state, updateState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  
  // refine Dropdown as FunctionComponent - just to say it's a Component and not just jsx - don't really have to do this but good practice
  const Dropdown:FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={e => updateState(e.target.value)}
        onBlur={e => updateState(e.target.value)}
        disabled={!options.length}
      >
        <option />
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  
  // when you give typescript an heterogenous or mixed array it will think the elements can come in any order - update the type of what each index will always be
  return [state, Dropdown, updateState] as [string, FunctionComponent, Dispatch<string>];
};

export default useDropdown;
