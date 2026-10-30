import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

const CustomModal: React.FC<{
  NoHeader?: boolean;
  children: React.ReactNode;
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ size, children, isOpen, title, onClose, NoHeader }) => {
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <>
          {!NoHeader && (
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          )}
          <ModalBody>{children}</ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
