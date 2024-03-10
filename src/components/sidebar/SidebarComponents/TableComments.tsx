import useTableHooks from "@/hooks/useTableHooks";
import { Table } from "@/types";
import React, { useEffect } from "react";

const TableComments: React.FC<{ table: Table }> = ({ table }) => {
  const [comment, setComment] = React.useState(table.tableComment);
  const { AddtableComment } = useTableHooks();

  const handleCommentsChange = () => {
    AddtableComment(table?.tableIndex!, comment!);
  };

  return (
    (table.isCommentOpen || table.tableComment) && (
      <div className="mx-2 my-2 flex flex-col rounded-lg bg-[#f1f5f9] pb-2 pt-1 px-2 ">
        <div className="px-2 py-1 text-sm font-semibold text-black">
          Comment
        </div>
        <div className="w-full">
          <textarea
            onBlur={handleCommentsChange}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="commenttextarea h-auto canvas-sidebar-comment-text-area px-2 py-1 text-sm text-sm leading-tight text-black block w-full rounded-md shadow-sm focus-visible:border-teal-500 focus-visible:ring-teal-500 resize-none border-gray-500 bg-white"
            style={{ maxHeight: "300px", height: "auto", overflowY: "auto" }}
            placeholder="Optional description for this column"
          />
        </div>
      </div>
    )
  );
};

export default TableComments;
