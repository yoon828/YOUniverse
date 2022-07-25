import React from 'react';
import { Link } from 'react-router-dom';

const dataList = [
  {
    owner: 'Germane Wilkins',
    title: 'Swiętokrzyskie',
    date: '2022년 8월 13일',
    historyId: 1
  },
  {
    owner: 'Myra Clemons',
    title: 'Cartago',
    date: '2023년 5월 27일',
    historyId: 2
  },
  {
    owner: 'Orli Reid',
    title: 'Xīnán',
    date: '2021년 11월 6일',
    historyId: 3
  },
  {
    owner: 'Francesca Lang',
    title: 'Samara Oblast',
    date: '2023년 6월 9일',
    historyId: 4
  },
  {
    owner: 'Stephen Mclean',
    title: 'North-East Region',
    date: '2021년 10월 12일',
    historyId: 5
  }
];

const HistoryList = () => {
  return (
    <div>
      <p>히스토리 내역 페이지</p>
      <ul>
        {dataList.map((data) => (
          <li key={data.owner}>
            {data.owner} |
            <Link to={`/history/${data.historyId}`}>{data.title}</Link> |
            {data.date}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HistoryList;
