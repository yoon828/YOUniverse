import React, { useState, useEffect } from 'react';
import { getHistoryList } from 'api/history';
import Page from 'modules/Pagination';
import './HistoryList.scss';

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
    <div className="history_list page_container">
      <Page
        type="/history"
        data={historyList}
        items={['id', 'date', 'roomName', 'hostName']}
      />
    </div>
  );
};
export default HistoryList;
