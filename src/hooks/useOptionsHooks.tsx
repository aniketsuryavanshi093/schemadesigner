import { MoveToFolderAction } from "@/actions/SchemaActions";
import { errorType } from "@/types";
import React, { useTransition } from "react";

const useOptionsHooks = () => {
  const [isPending, StartTransition] = useTransition();
  const handleMoveFolder = async (
    folderId: string,
    schemaId: string,
    callback: (type: errorType, data: any) => void
  ) => {
    try {
      const data = (await MoveToFolderAction({
        folderId,
        schemaId,
      })) as { isError: boolean };
      if (data?.isError) {
        callback("error", data);
      } else {
        callback("success", data);
      }
      console.log(data);
    } catch (error) {
      callback("error", error);
      console.log("error", error);
    }
  };
  const moveTofolders = (
    folderId: string,
    schemaId: string,
    callback: (type: errorType, data: any) => void
  ) => {
    StartTransition(() => handleMoveFolder(folderId, schemaId, callback));
  };
  return {
    moveTofolders,
    isPending,
  };
};

export default useOptionsHooks;
