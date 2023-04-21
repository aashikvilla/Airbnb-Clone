"use client";
import { useState, useEffect, useCallback, ReactElement } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryActionLabel,
  secondaryAction,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleCLose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondayAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="justify-center item-center flex overflow-x-hidden overflow-y-auto
    fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70
    "
      >
        <div className="relative w-full md:w-4/6 lg:e-3/6 xm:w-2/6 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={` translate duration-300 h-full 
            ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div
              className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg
                 relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              {/* Header */}
              <div className="flex item-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleCLose}
                  className="e-1 border-0 hover:transition absolute left-9"
                >
                  <IoMdClose />
                </button>
                <div className="text-lg font-semibold"> {title}</div>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex-outer"> {body}</div>

              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondayAction}
                    />
                  )}

                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
