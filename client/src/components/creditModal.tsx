import React, { ReactNode, useEffect, useState } from "react";
import "../styles/creditModal.scss";
import axios from "axios";
import { User } from '../../../server/src/model/user';
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  const [credits, setCredits] = useState(0);  // Assuming initial value is 0
  const navigate = useNavigate();

  async function GetCredits(){
    try {
      const response = await axios.get("http://localhost:8080/userRouter/credit");
      if (response.data == undefined)  {
        navigate("/")
      }
      return response;

    } catch (error) {
      navigate("/")
      return {data: 0};
    }
  }

  async function AddCredits(){
    const response = await axios.put("http://localhost:8080/userRouter/credit", {
      changeAmount: 10
    }).then(async () => {
      const newCredits = await GetCredits();
      setCredits(newCredits.data);
    }).catch(error => {
      console.log(error);
    });
  }


  useEffect(() => {
    async function fetchCredits() {
      try {
        const response = await GetCredits();
        setCredits(response.data); 
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    }
  
    fetchCredits();
  }, [props.isOpen]);
  
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div>
              <h2>Current Credits: {credits}</h2>
              <button onClick={AddCredits}> Add Credits</button>
            </div>
            <CloseButton id="closebutton" onClick={props.toggle} />
          </div>
        </div>
      )}
    </>
  );

}
  