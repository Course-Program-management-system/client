import React, { useEffect, useState } from "react";

export default function UseListingInProgress(checkChange) {
  const [inProgress, setInProgress] = useState({});
  function addInProgress(id, toggle) {
    if (inProgress[id]) {
      toggle && removeInProgress(id);
      return;
    }
    setInProgress({ ...inProgress, [id]: true });
  }
  function removeInProgress(id) {
    const clone = { ...inProgress };
    delete clone[id];
    setInProgress(clone);
  }
  useEffect(() => checkChange?.(inProgress), [inProgress]);
  return [inProgress, addInProgress, removeInProgress];
}
