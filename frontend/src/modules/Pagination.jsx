import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'modules/ListModule';
import Pagination from 'react-js-pagination';
import './Pagination.scss';
import 'pages/mypage/QnAList.scss';

const Page = ({ type, data, headers, items }) => {
  const [page, setPage] = useState(1);
  const units = 8;

  const handlePageChange = (page) => {
    setPage(page);
  };

  if (!data) {
    return null;
  }
  return (
    <>
      {/* <select name="units" onChange={itemChange}>
        <option value="5">5개</option>
        <option value="7">7개</option>
        <option value="10">10개</option>
      </select> */}
      <p className="item_header">
        {headers.map((header, index) => {
          return <span key={index}>{header}</span>;
        })}
      </p>
      <ul>
        {data
          .slice(units * (page - 1), units * (page - 1) + units)
          .map((v, i) => {
            return (
              <li key={i} className="pagination_item">
                <Link to={`${type}/${v.id}`}>
                  <Item type={type} data={v} items={items} />
                </Link>
              </li>
            );
          })}
      </ul>

      <Pagination
        prevPageText="❮"
        nextPageText="❯"
        firstPageText="❮❮"
        lastPageText="❯❯"
        activePage={page}
        itemsCountPerPage={units}
        totalItemsCount={data.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </>
  );
};
export default Page;
