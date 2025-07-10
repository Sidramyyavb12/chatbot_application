import React from 'react'
import { MdKeyboardVoice } from "react-icons/md";
function Button({ onstart }) {
  return (
    <div>
      <div className="button-wrap">
        <button onClick={onstart}>
         <span> Click me<MdKeyboardVoice/></span>
        </button>
        <div className="button-shadow"></div>
      </div>

      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "0"
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dottedGrid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dottedGrid)" />
      </svg>
    </div>
  );
}

export default Button;
