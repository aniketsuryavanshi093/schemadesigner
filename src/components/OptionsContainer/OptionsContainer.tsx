import { Spinner } from "reactstrap";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useOptionsHooks from "@/hooks/useOptionsHooks";
import { FolderType } from "@/types";
import enqueSnackBar from "@/utils/enqueSnackBar";

const OptionsContent: React.FC<{ schemaId: string }> = ({ schemaId }) => {
  const [SelectedScreenType, setSelectedScreenType] = useState<
    "options" | "folder"
  >("options");
  const queryClient = useQueryClient();
  const folders = queryClient.getQueryData(["userfolder"]);
  const { moveTofolders, isPending } = useOptionsHooks();
  const handleFolderclick = (id: string) => {
    moveTofolders(id, "66153345f319f2f153801849", (errorType, data) => {
      if (errorType === "success") {
        enqueSnackBar({ message: data?.message!, type: "success" });
      } else {
        enqueSnackBar({ message: data?.message!, type: "error" });
      }
    });
  };
  return (
    <div className="overflow-hidden border-none rounded-md  shadow-lg outline-none min-w-[170px] ">
      {SelectedScreenType === "options" ? (
        <>
          <div className="mt-1 mb-2 flex items-center justify-start px-1  pb-1 text-xs font-bold uppercase text-gray-400">
            {" "}
            More Actions{" "}
          </div>
          <div className="group flex cursor-pointer items-center px-1 py-1.5 text-sm text-gray-200 hover:bg-gray-600 hover:text-gray-200">
            <i className="fa-solid fa-pen-to-square me-2 text-gray-400"></i>{" "}
            Edit Details
          </div>
          <div className="group flex cursor-pointer items-center px-1 py-1.5 text-sm text-gray-200 hover:bg-gray-600 hover:text-gray-200">
            <i className="fa-regular fa-copy me-2 text-gray-400"></i> Make Copy
          </div>
          <div
            onClick={() => setSelectedScreenType("folder")}
            className="group flex cursor-pointer items-center px-1 py-1.5 text-sm text-gray-200 hover:bg-gray-600 hover:text-gray-200"
          >
            <i className="fa-solid fa-folder-open me-2 text-gray-400"></i> Move
            to Folder
          </div>
          <div className="group flex cursor-pointer items-center px-1 py-1.5 text-sm text-gray-200 hover:bg-gray-600 hover:text-gray-200">
            <i className="fa-solid fa-star me-2 text-gray-400"></i> Add to
            Favorites
          </div>
          <hr className="my-1 border-gray-600" />
          <div className="group flex cursor-pointer items-center px-1 py-1.5 text-sm text-gray-200 hover:bg-gray-600 hover:text-gray-200">
            <i className="fa-solid fa-trash me-2 text-gray-400"></i> Delete
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => setSelectedScreenType("options")}
            className="mt-1 mb-2 flex items-center justify-start px-1  pb-1 text-xs font-bold uppercase text-gray-400"
          >
            <i className="fa-solid fa-chevron-left me-2"></i> Move to Folder
          </div>
          {isPending ? (
            <div className="wrapper my-3">
              {" "}
              <Spinner size={"sm"} />{" "}
            </div>
          ) : (
            folders?.data.data?.map((elem: FolderType) => (
              <div
                key={elem._id}
                onClick={() => handleFolderclick(elem._id)}
                className="group flex cursor-pointer items-center px-1 py-1.5 text-sm text-gray-200 hover:bg-gray-600 hover:text-gray-200"
              >
                <i className="fa-regular fa-folder-open me-3"></i>
                {elem.name}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default OptionsContent;
