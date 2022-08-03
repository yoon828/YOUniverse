import React, { useState, useEffect } from 'react';
import { getHistoryList } from 'api/history';
import Page from 'modules/Pagination';

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    getHistoryList()
      .then(({ data }) => {
        console.log(data.data);
        setHistoryList(data.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <Page
      type="/history"
      data={historyList}
      items={['id', 'date', 'roomName', 'hostName']}
    />
  );
};
export default HistoryList;
