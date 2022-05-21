import React, { useEffect, useState } from "react";
import Utils from "../../Service/utils";
import "./toast.css";
let timeId = -1;
function Toast() {
  const [r, sR] = useState(false);
  useEffect(() => {
    Utils.Toast.subscribe(async (message) => {
      if (typeof message !== "string") return;
      sR(false);
      await Utils.sleep(50);
      sR(message);
      clearTimeout(timeId);
      timeId = setTimeout(() => sR(false), 5000);
    });
  }, []);
  return r ? <div className="toast-message">{r}</div> : null;
}
export default Toast;
