import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UseListingInProgress from "../../Service/useListingInProgress";
import Utils from "../../Service/utils";
import ListingPage from "../listing-component/listing";
export default function CrudListingView({
  user,
  getUrl,
  columnNames,
  links,
  pageName,
}) {
  const history = useHistory();
  const params = useParams();
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({ page: 0, take: 10 });
  const [inProgress, addInProgress, removeInProgress] = UseListingInProgress();
  const actions = Object.values(links || {}).map((v) => {
    if (v.getLink) return { ...v, getLink: (...args) => getLink(...args) };
    return { ...v, onClick: (...args) => onClick(...args) };
  });
  useEffect(getData, [getUrl, pagination]);
  function getData() {
    setData(null);
    axios
      .get(
        `${replaceParams(getUrl)}?take=${pagination.take}&skip=${
          pagination.page * pagination.take
        }`
      ) //`/subject/${subjectId}/report`)
      .then(({ data: { message } }) => setData(message))
      .catch(() => {
        setData([]);
      });
  }
  function replaceParams(_url) {
    _url
      .split("/")
      .filter((v) => v.startsWith(":"))
      .forEach(
        (urlParamId) =>
          (_url = _url.replace(urlParamId, params[urlParamId.slice(1)]))
      );
    return _url;
  }
  function deleteData({ _id }, { url }) {
    addInProgress(_id);
    let _url = url.replace(":id", _id);
    axios
      .delete(replaceParams(_url))
      .then(({ data: { message } }) => {
        getData();
        removeInProgress(_id);
        Utils.Toast.next("Deleted successfully");
      })
      .catch(() => {
        removeInProgress(_id);
      });
  }
  function getLink({ _id }, type) {
    if (links[type]) {
      let url = links[type].url;
      return replaceParams(url.replace(":id", _id));
    }
  }
  function onClick(data, type) {
    if (links[type]?.type === "delete") return deleteData(data, links[type]);
  }
  return (
    <>
      {pageName && (
        <div className="w-4/5 m-auto text-left mt-4 text-2xl">{pageName}</div>
      )}
      {!data ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <ListingPage
          data={data?.items || data}
          inProgress={inProgress}
          columnNames={columnNames}
          actions={actions}
          pagination={{
            totalCount: data.total,
            onPageChange: (page) => setPagination({ ...pagination, page }),
            page: pagination.page,
            take: pagination.take,
            onTakeChange: (take) => setPagination({ take, page: 0 }),
          }}
        />
      )}
    </>
  );
}
