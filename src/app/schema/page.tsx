"use client";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import React from "react";
import { Button } from "@nextui-org/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TablesContainer from "./SchemaComponents/TablesContainer";
import { useXarrow, Xwrapper } from 'react-xarrows';
import Arrow from "@/components/Arrows";
import { updateRelation } from "@/redux/dashboardstore/reducer/relations/relationSlice";

const Schema = () => {
  const updateXarrow = useXarrow();
  const { tables } = useAppSelector((state) => state.schemareducer);
  const { relations } = useAppSelector((state) => state.relationreducer);
  return (
    <>
      <TransformWrapper
        panning={{ excluded: tables.map((table) => table.tableName) }}
        wheel={{ excluded: tables.map((table) => table.tableName) }}
        initialScale={1}
        initialPositionX={0}
        minScale={.5}
        maxScale={3}
        limitToBounds={false}
        onPinching={updateXarrow}
        onWheel={updateXarrow}
        onPanning={updateXarrow}
        onZoom={updateXarrow}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <TransformContainer {...{ zoomIn, zoomOut, resetTransform, ...rest }} />
        )}
      </TransformWrapper>
      <Xwrapper>
        {relations.map((rel, index) => (
          <Arrow key={index} head={rel.head} tail={rel.tail} />
        ))}
      </Xwrapper>
    </>


  );
};

export default Schema;

const TransformContainer: React.FC<{
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}> = ({
  zoomIn,
  zoomOut,
  resetTransform,
}) => {
    const dispatch = useAppDispatch()
    const handleCLick = (callable: any) => {
      callable()
      setTimeout(() => {
        dispatch(updateRelation())
      }, 500);
    }
    return (
      <>
        <div className="tools absolute z-[9999999999] bottom-[10%] right-[6%]">
          <Button
            className="w-6 gap-0 p-0 min-w-10  rounded-[8px]"
            onClick={() => handleCLick(zoomIn)}
          >
            <i className="fa-solid fa-plus"></i>
          </Button>
          <Button
            className="w-6 gap-0 p-0 min-w-10 mx-2 rounded-[8px]"
            onClick={() => handleCLick(zoomOut)}
          >
            <i className="fa-solid fa-minus"></i>
          </Button>
          <Button
            onClick={() => handleCLick(resetTransform)}
            className="w-6 gap-0 p-0 min-w-10  rounded-[8px]"
          >
            <i className="fa-solid fa-arrows-to-circle"></i>
          </Button>
        </div>
        <TransformComponent
          wrapperClass="schemawrapperpanpinch"
          contentClass="schematransformcomp"
        >
          <TablesContainer />
        </TransformComponent>
      </>
    );
  };
