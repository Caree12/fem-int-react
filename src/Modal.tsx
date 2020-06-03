import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {
  const elRef = useRef(document.createElement("div"));
  
  // since Modal doesn't render very often we just moved the createElement up into the useRef so it will always be a div
  // const elRef = useRef(null);
  // if (!elRef.current) {
  //   elRef.current = document.createElement("div");
  // }

  useEffect(() => {
    // we added a check for modalRoot again to make tsc happy bc modalRoot is defined above
    if(!modalRoot) {return;}

    modalRoot.appendChild(elRef.current);
    
    // added {} bc tsc doesn't expect anything back from useEffect - just a void return - so now we aren't returning anything and tsc is happy
    return () => {
      modalRoot.removeChild(elRef.current);
    }
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;