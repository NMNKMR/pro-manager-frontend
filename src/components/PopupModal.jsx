import styles from "./css/PopupModal.module.scss";
import React from "react";

function PopupModal({children}) {
  return (
    <div className={styles.popup}>
      {children}
        {/* {React.cloneElement(children, {...props})} */}
    </div>
  )
}

export default PopupModal