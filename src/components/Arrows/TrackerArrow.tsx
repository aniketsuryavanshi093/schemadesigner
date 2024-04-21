import { useAppSelector } from "@/redux/dashboardstore/hook";
import React from "react";
import Xarrow from "react-xarrows";

const TrackerArrow = () => {
  const { currentboxid, isDragging, currenthandlerid } = useAppSelector(
    (state) => state?.trackArrowreducer
  );
  return isDragging ? (
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
      start={currentboxid}
      end={currenthandlerid}
    />
  ) : null;
};

export default TrackerArrow;
