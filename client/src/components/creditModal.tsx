import React, { ReactNode } from "react";
import "../styles/creditModal.scss";

export interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
    return (
      <>
        {props.isOpen && (
          <div className="modal-overlay" onClick={props.toggle}>
            <div  className="modal-box">
              <div>
                <h2>Current Credits:</h2>
                
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  