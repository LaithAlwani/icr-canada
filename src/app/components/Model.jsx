import {MdClose} from "react-icons/md";

export const Model = ({ children, handleClose}) => {
  return (
    <div className="model-container">
      <div className="model">
        <span className="close-btn" onClick={() => handleClose(false)}>
          <MdClose color="red" size={24}/>
        </span>
        {children}
      </div>
    </div>
  );
};
