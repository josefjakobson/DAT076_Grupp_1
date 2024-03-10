import React, { ReactNode, useEffect, useState } from "react";
import "../styles/creditModal.scss";
import axios from "axios";
import { User } from '../../../server/src/model/user';


export interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  const [credits, setCredits] = useState(0);  // Assuming initial value is 0

  async function GetCredits(){
    const response = await axios.get("http://localhost:8080/userRouter/credit", 
      {params:{
        username: '1'
      }});
    
    console.log(response);
    return response;
}


  useEffect(() => {
    async function fetchCredits() {
      try {
        const response = await GetCredits();
        setCredits(response.data); // Assuming credits are in response.data.credits
      } catch (error) {
        console.error("Error fetching credits:", error);
        // Handle errors as needed, e.g., display an error message
      }
    }
  
    fetchCredits();
  }, []);
  
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div  className="modal-box">
            <div>
              <h2>Current Credits: {credits}</h2>        
            </div>
          </div>
        </div>
      )}
    </>
  );

}
  