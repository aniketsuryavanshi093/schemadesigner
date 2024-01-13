import { useRef, useState } from "react";
import Draggable from "react-draggable";
import ConnectPointsWrapper from "./ConnectPointsWrapper";

const boxStyle = {
  border: "1px solid black",
  position: "relative",
  padding: "20px 10px",
};

const TableBox = ({ text, handler, addArrow, setArrows, boxId }) => {
  const dragRef = useRef();
  const boxRef = useRef();
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const handleDragStop = (event, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
  };
  return (
    <Draggable
      ref={dragRef}
      onDrag={(e) => {
        setArrows((arrows) => [...arrows]);
      }}
      position={position}
      onStop={handleDragStop}
    >
      <div
        id={boxId}
        className={boxId}
        ref={boxRef}
        style={boxStyle}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (e.dataTransfer.getData("arrow") === boxId) {
            console.log(e.dataTransfer.getData("arrow"), boxId);
          } else {
            const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
            addArrow(refs);
            console.log("droped!", refs);
          }
        }}
      >
        <p className={`text-black ${boxId}`}>{text}</p>
        <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} />
      </div>
    </Draggable>
  );
};

export default TableBox;
