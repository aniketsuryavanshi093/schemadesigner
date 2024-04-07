import * as React from "react";
import Xarrow from "react-xarrows";
import ArrowRelation from "./ArrowRelation";
import { relationtype } from "@/types";

export interface IclickPosition {
  open: boolean;
  x: number;
  y: number;
}

const Arrow: React.FC<{ relation: relationtype }> = ({ relation }) => {
  const [hoveredState, setHoveredState] = React.useState(false);
  const [clickPosition, setClickPosition] = React.useState<IclickPosition>({
    open: false,
    x: 0,
    y: 0,
  });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setClickPosition({
        open: false,
        x: 0,
        y: 0,
      });
    }
  };

  React.useEffect(() => {
    document.addEventListener(
      "mousedown",
      (e) => {
        handleClickOutside(e);
      },
      true
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        (e) => {
          handleClickOutside(e);
        },
        true
      );
    };
  }, []);
  return (
    <div
      ref={ref}
      style={{
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.preventDefault();
        setHoveredState(true);
        console.log(relation, "over");
      }}
      onMouseLeave={(e) => {
        setHoveredState(false);
      }}
      onClick={(e) => {
        setClickPosition({ open: true, x: e.clientX, y: e.clientY });
      }}
    >
      <Xarrow
        headShape={"circle"}
        tailShape={"circle"}
        arrowTailProps={{
          stroke: "#9BA1A6",
          strokeWidth: ".2",
          fill: "#1A1D1E",
          fillOpacity: "0.1",
        }}
        arrowHeadProps={{
          stroke: "#9BA1A6",
          strokeWidth: ".8",
          fill: "#1A1D1E",
          fillOpacity: "0.1",
        }}
        headSize={3}
        tailSize={3}
        path={"smooth"}
        showTail={true}
        color={hoveredState ? "purple" : "#9BA1A6"}
        start={relation.head}
        end={relation.tail}
        strokeWidth={2}
      />
      {clickPosition.open && (
        <ArrowRelation
          relation={relation}
          setClickPosition={setClickPosition}
          clickPosition={clickPosition}
        />
      )}
    </div>
  );
};

export default Arrow;
