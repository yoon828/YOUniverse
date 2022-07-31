import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.scss';

/*
Pagination 모듈 임포트 구문
import Page from 'modules/Pagination'
*/

const Page = ({ data }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(5);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const itemChange = (e) => {
    setItems(Number(e.target.value));
  };

  /*
  디버깅 용
  console.log(items * (page - 1), items * (page - 1) + items);
  */

  if (!data) {
    return null;
  }
  return (
    <div>
      <h2>API 연습</h2>
      <div>
        <select name="items" onChange={itemChange}>
          <option value="5">5개</option>
          <option value="10">10개</option>
          <option value="15">15개</option>
          <option value="20">20개</option>
        </select>
      </div>
      {data
        .slice(items * (page - 1), items * (page - 1) + items)
        .map((v, i) => {
          return (
            <div key={i}>
              <h1>{v.roomName}</h1>
              <div>
                <span>id: {v.id}</span>
                <span>data: {v.data}</span>
                <span>filePath: {v.filePath}</span>
                <span>hostName: {v.hostName}</span>
                <span>participants: {v.participants}</span>
                <span>uuid: {v.uuid}</span>
              </div>
            </div>
          );
        })}

      <Pagination
        activePage={page}
        itemsCountPerPage={items}
        totalItemsCount={data.length - 1}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
};
export default Page;
