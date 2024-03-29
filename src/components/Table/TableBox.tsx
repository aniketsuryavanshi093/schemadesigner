import { useCallback, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./tablebox.scss";
import { Table } from "@/types";
import useTableHooks from "@/hooks/useTableHooks";
import TableColumns, { ColumnComment } from "./TableColumns";
import { concatString } from "@/utils";

const TableBox: React.FC<{ table: Table }> = ({ boxId, table, setArrows }) => {
  const dragRef = useRef();
  const boxRef = useRef();
  const { setEditTablehelper, updateSaveTablehelper } = useTableHooks();
  const [position, setPosition] = useState();
  const handleDragStop = (event, data) => {
    if (event.type === "mouseup" || event.type === "touchend") {
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    }
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    updateSaveTablehelper({
      ...table,
      tablePosition: newPosition,
    });
  };
  const [isDragging, setIsDragging] = useState(false);

  const handleEdit = useCallback(() => {
    setEditTablehelper(table);
  }, [table, setEditTablehelper]);
  const eventControl = (event) => {
    if (event.type === "mousemove" || event.type === "touchmove") {
      setIsDragging(true);
      setArrows();
    }
    if (event.type === "mouseup" || event.type === "touchend") {
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    }
  };
  return (
    <Draggable
      ref={dragRef}
      defaultPosition={{
        x: table?.tablePosition?.x || 0,
        y: table?.tablePosition?.y || 0,
      }}
      onDrag={eventControl}
      position={position}
      onStop={handleDragStop}
    >
      <div
        id={boxId}
        className={`${boxId}  tablebox ${
          table.isEditing && "selectedbox"
        } shadow-lg hover:shadow-xl  absolute border-t-4 `}
        ref={boxRef}
        style={{ borderTopColor: table.tableColor }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !isDragging && handleEdit()}
        onTouchEnd={() => !isDragging && handleEdit()}
      >
        <div
          className={`${boxId} flex justify-center flex-col items-center hover:bg-[#ebf4ff] boxtitlewrapper transition-all  py-1 w-full hover`}
        >
          <p
            className={` ${
              table.isEditing && "selectedboxtitle"
            }  text-center  font-medium text-sm text-gray-700 ${boxId}`}
          >
            {table.tableName}
          </p>

          {table.tableComment && (
            <p className="font-medium text-xs w-[75%]  text-gray-800 text-center">
              {concatString(20, table.tableComment)}
              {table.tableComment.length > 20 && (
                <ColumnComment comment={table.tableComment} />
              )}
            </p>
          )}
        </div>
        <TableColumns
          boxId={boxId}
          isDragging={isDragging}
          table={table}
          dragRef={dragRef}
          boxRef={boxRef}
        />
        {/* <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} /> */}
      </div>
    </Draggable>
  );
};

export default TableBox;
