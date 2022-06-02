import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  visible: boolean;
  handleClose: () => void | any;
  children?: JSX.Element | JSX.Element[] | string | string[];
  style?: React.CSSProperties;
}

export default function Modal({
  visible,
  handleClose,
  children,
  style,
}: ModalProps) {
  if (visible)
    return (
      <>
        <style>
          {`
                .modal-background {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    width: 100vw;
                    height: 100vh;
                    z-index: 1100;
                    background-color: #a09b9a59;
                }

                .modal {
                    width: 80%;
                    height: fit-content;
                    max-height: 90vh;
                    display: flex;
                    flex-wrap: wrap;
                    min-height: 180px;
                    min-width: 200px;
                    margin-inline: auto; 
                    z-index: 1200;
                    background-color: white;
                    position: absolute;
                    overflow-y: auto;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                }

                .close-btn {
                    position: absolute;
                    left: 10px;
                    top: 10px;
                }

                @media screen and (max-width: 500px){
                    .modal {
                        width: 100%;
                        min-width: 100%;
                    }
                }
            `}
        </style>
        <motion.div
          className="modal-background"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={handleClose}
            className="btn btn-outline-danger close-btn"
          >
            <AiOutlineClose />
          </button>
          <motion.div
            style={style}
            onClick={(e) => e.stopPropagation()}
            className="modal"
            initial={{ top: "-150px" }}
            animate={{ top: "0" }}
            exit={{ top: "-50%" }}
          >
            {children}
          </motion.div>
        </motion.div>
      </>
    );
  return null;
}
