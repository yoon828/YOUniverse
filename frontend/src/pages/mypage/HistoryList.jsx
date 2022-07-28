import React, { useState, useEffect } from 'react';
import { dumpHistory } from 'api/user';
import Page from 'modules/Pagination';

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    dumpHistory()
      .then(({ data }) => {
        setHistoryList(data);
      })
      .catch((err) => alert(err));
  }, []);
  return <Page data={historyList} />;
};
export default HistoryList;
