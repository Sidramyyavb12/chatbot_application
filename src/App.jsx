import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.css";

import { DataContext } from "./context/UserContext";
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import * as THREE from 'three'; // Required for Vanta effects
import Button from "./component/Button";
import VariableProximity from './component/Headline';

import SplitText from "./component/Text";

function App() {
  const { transcript, responseText, speaking, setspeaking, startSpeechRecognition, aiSpeaking } = useContext(DataContext);
  
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    window.THREE = THREE;
    if (!vantaEffect) {
      setVantaEffect(CLOUDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 1.70
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect) {
        vantaEffect.setOptions({
          minHeight: window.innerHeight,
          minWidth: window.innerWidth
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [vantaEffect]);

  return (
    <>
      <div ref={vantaRef} className="vanta-bg" />
      <div className="main">
        <img src="robo.gif" alt="gif" id="img" />
        <div ref={containerRef} style={{ position: 'relative', color: "black" }}>
          <VariableProximity
            label={'Hi! buddy Ask me Something...'}
            className={'variable-proximity-demo'}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff='linear'
          />
        </div>

        {!speaking && !aiSpeaking ? (
          <Button onstart={() => { setspeaking(true); startSpeechRecognition(); }} />
        ) : speaking ? (
          <div>
            <img src="listen1.gif" alt="Speaking animation" style={{ width: "250px" }} />
            
          </div>
        ) : aiSpeaking ? (
          <div style={{fontSize:"10px"}}>
            <img src="listen1.gif" alt="Speaking animation" style={{ width: "250px" }} />
          </div>
        ) : null}
        
      </div>
    </>
  );
}

export default App;
