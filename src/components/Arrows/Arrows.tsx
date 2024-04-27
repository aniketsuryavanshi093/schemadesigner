import * as React from "react";
import ArrowRelation from "./ArrowRelation";
import { Edge } from "reactflow";

export interface IclickPosition {
  open: boolean;
  x: number;
  y: number;
  edge: Edge | null;
}

const Arrow: React.FC<{
  clickPosition: IclickPosition;
  setClickPosition: React.Dispatch<React.SetStateAction<IclickPosition>>;
}> = ({ clickPosition, setClickPosition }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setClickPosition({
        open: false,
        x: 0,
        y: 0,
        edge: null,
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
    <div ref={ref}>
      {clickPosition.open && (
        <ArrowRelation
          relation={clickPosition.edge!}
          setClickPosition={setClickPosition}
          clickPosition={clickPosition}
        />
      )}
    </div>
  );
};

export default Arrow;
