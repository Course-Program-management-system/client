import { ArrowRight } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Utils from "../../Service/utils";

function Breacrumb() {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    onHashChange();
    window.addEventListener("hashchange", onHashChange, false);
    return () => window.removeEventListener("hashchange", onHashChange, false);
  }, []);
  function onHashChange() {
    if (window.location.hash.split("#/")?.[1] === "/") {
      setBreadcrumbs([{ name: "Home", link: "/" }]);
      return;
    }
    const splits = window.location.hash.split("#/")?.[1]?.split("/") || [];
    setBreadcrumbs(
      splits.map((path, index) => {
        const link = splits.slice(0, index + 1).join("/");
        return {
          name: path === "" ? "Home" : Utils.beautifyCamelCase(path),
          link: link === "" ? "/" : `#/${link}`,
        };
      })
    );
  }
  return (
    <div className="p-4 bg-blue-100 gap-2 flex items-center shadow-2xl">
      {breadcrumbs.map((crumb, index) => {
        return (
          <div key={index} className="flex gap-2 items-center">
            {index < breadcrumbs.length && index > 0 && (
              <ArrowRight fontSize="small" key={index} />
            )}
            {index === breadcrumbs.length - 1 ||
            crumb.name.split(" ").length > 1 ? (
              <div className="flex text-gray-800 text-sm" key={index}>
                {crumb.name}
              </div>
            ) : (
              <div
                className="flex text-cyan-600 hover:underline hover:text-bold text-sm"
                key={index}
              >
                <a href={crumb.link.toString()}>{crumb.name}</a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default React.memo(Breacrumb);
