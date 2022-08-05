import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'modules/ListModule';
import Pagination from 'react-js-pagination';
import './Pagination.scss';

const Page = ({ type, data, items }) => {
  const [page, setPage] = useState(1);
  const [units, setUnits] = useState(5);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const itemChange = (e) => {
    setUnits(Number(e.target.value));
  };

  /*
  디버깅 용
  console.log(units * (page - 1), units * (page - 1) + units);
  */

  if (!data) {
    return null;
  }
  return (
    <>
      <div>
        <select name="units" onChange={itemChange}>
          <option value="5">5개</option>
          <option value="10">10개</option>
          <option value="15">15개</option>
          <option value="20">20개</option>
        </select>
      </div>
      <ul>
        {data
          .slice(units * (page - 1), units * (page - 1) + units)
          .map((v, i) => {
            return (
              <Link to={`${type}/${v.id}`} key={i}>
                <Item type={type} data={v} items={items} />
              </Link>
            );
          })}
      </ul>

      <Pagination
        activePage={page}
        itemsCountPerPage={units}
        totalItemsCount={data.length - 1}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </>
  );
};
export default Page;
