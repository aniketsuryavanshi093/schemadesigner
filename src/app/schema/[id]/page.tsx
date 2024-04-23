"use client";
import { useAppSelector } from "@/redux/dashboardstore/hook";
import React from "react";
import { Button } from "@nextui-org/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TablesContainer from "./SchemaComponents/TablesContainer";
import { useXarrow, Xwrapper } from "react-xarrows";
import Arrow from "@/components/Arrows/Arrows";
import useTableRelationHook from "@/hooks/useTableRelationHook";

const Schema = () => {
  const updateXarrow = useXarrow();
  const { tables } = useAppSelector((state) => state.schemareducer);
  const { relations } = useAppSelector((state) => state.relationreducer);
  return (
    <>
      <TransformWrapper
        panning={{
          excluded: tables.map((table) => table.tableName?.replaceAll(" ", "")),
        }}
        wheel={{
          excluded: tables.map((table) => table.tableName?.replaceAll(" ", "")),
        }}
        initialScale={1}
        initialPositionX={0}
        smooth={false}
        minScale={0.5}
        maxScale={3}
        limitToBounds={false}
        onPinching={updateXarrow}
        onZoomStop={updateXarrow}
        onWheel={updateXarrow}
        onPanning={updateXarrow}
        onPinchingStop={updateXarrow}
        onTransformed={updateXarrow}
        onPanningStart={updateXarrow}
        onPanningStop={updateXarrow}
        onZoom={updateXarrow}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <TransformContainer
            {...{ zoomIn, zoomOut, resetTransform, ...rest }}
          />
        )}
      </TransformWrapper>
      <Xwrapper>
        {relations.map((rel, index) => (
          <Arrow key={index} relation={rel} />
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
}> = ({ zoomIn, zoomOut, resetTransform }) => {
  const { updateAllRelation } = useTableRelationHook();
  const handleCLick = (callable: any) => {
    callable();
    setTimeout(() => {
      updateAllRelation();
    }, 500);
  };
  const { sidebarOpen } = useAppSelector((state) => state.schemareducer);
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
        wrapperClass={` ${
          sidebarOpen ? "schemawrapperpanpinch" : "schemawrapperpanpinchfull"
        } `}
        contentClass="schematransformcomp"
      >
        <TablesContainer />
      </TransformComponent>
    </>
  );
};
