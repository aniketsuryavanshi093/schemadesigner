'use client'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable';
import Xarrow from "react-xarrows";

const connectPointStyle = {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: "50%",
    background: "black",
};
const connectPointOffset = {
    left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
    right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
    top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
    bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" },
};

const ConnectPointsWrapper = ({ boxId, handler, dragRef, boxRef }) => {
    const ref1 = useRef();

    const [position, setPosition] = useState({});
    const [beingDragged, setBeingDragged] = useState(false);
    return (
        <React.Fragment>
            <div
                className="connectPoint"
                style={{
                    ...connectPointStyle,
                    ...connectPointOffset[handler],
                    ...position,
                }}
                draggable
                onMouseDown={(e) => e.stopPropagation()}
                onDragStart={(e) => {
                    setBeingDragged(true);
                    e.dataTransfer.setData("arrow", boxId);
                }}
                onDrag={(e) => {
                    const { offsetTop, offsetLeft } = boxRef.current;
                    const { x, y } = dragRef.current.state;
                    setPosition({
                        position: "fixed",
                        left: e.clientX - x - offsetLeft,
                        top: e.clientY - y - offsetTop,
                        transform: "none",
                        opacity: 0,
                    });
                }}
                ref={ref1}
                onDragEnd={(e) => {
                    setPosition({});
                    setBeingDragged(false);
                }}
            />
            {beingDragged ? <Xarrow start={boxId} end={ref1} /> : null}
        </React.Fragment>
    );
};



const boxStyle = {
    border: "1px solid black",
    position: "relative",
    padding: "20px 10px",
};

const Box = ({ text, handler, addArrow, setArrows, boxId }) => {
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
                    console.log(e);
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

const POCDragDrop = () => {
    const [arrows, setArrows] = useState([]);
    const addArrow = ({ start, end }) => {
        setArrows([...arrows, { start, end }]);
    };
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Box
                text="drag my handler to second element"
                {...{ addArrow, setArrows, handler: "right", boxId: "box2_1" }}
            />
            <Box
                text="second element"
                {...{ addArrow, setArrows, handler: "left", boxId: "box2_2" }}
            />
            {arrows.map((ar) => (
                <Xarrow
                    onClick={() => console.log("clicked")}
                    start={ar.start}
                    end={ar.end}
                    key={ar.start + "-." + ar.start}
                />
            ))}
        </div>
    );
}



export default POCDragDrop