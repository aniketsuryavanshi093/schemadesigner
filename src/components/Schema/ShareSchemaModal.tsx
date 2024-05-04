import React from "react";
import Image from "next/image";
import { Modal, ModalContent } from "@nextui-org/react";
import { useParams } from "next/navigation";

const ShareSchemaModal: React.FC<{ isOpen: boolean; onClose: () => any }> = ({
  isOpen,
  onClose,
}) => {
  const { id } = useParams();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const copy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };
  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="w-full flex justify-between">
          <div className="w-1/3 p-6 bg-[#f1f5f9] grid  place-content-center">
            <Image
              width={180}
              height={153}
              alt="share"
              src="/images/share.svg"
            />
          </div>
          <div className="w-2/3 px-4 pt-5 pb-4 sm:p-6 sm:px-12">
            <h3 className="text-3xl my-5 justify-center text-left text-xl font-bold leading-8 text-gray-800">
              Share Daigram Link
            </h3>
            <div className="mb-2 text-left text-gray-700">
              <span>
                Anyone with this link will get view-only access, and only team
                members can edit the diagram.
              </span>
            </div>
            <div className="my-5">
              <label
                htmlFor="myInput"
                className="mb-2 block text-sm font-bold text-gray-700"
              ></label>
              <div className="flex">
                <input
                  id="myInput"
                  ref={inputRef}
                  value={`${location.hostname}/schema/share/${id}`}
                  className="inline appearance-none rounded border border-gray-200 bg-gray-200 py-2 px-2 text-sm  leading-tight text-gray-700 focus:outline-none focus:ring-0 w-9/12 rounded-r-none"
                  type="text"
                />
                <button
                  onClick={copy}
                  className="inline w-3/12 cursor-pointer rounded rounded-l-none border border-indigo-500 bg-indigo-500 py-2 px-5 font-medium tracking-wider text-white hover:bg-indigo-600 focus:outline-none"
                >
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ShareSchemaModal;
