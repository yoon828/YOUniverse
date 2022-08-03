import React from 'react';
import { Link } from 'react-router-dom';

// 리스트 컴포넌트
export const List = ({ type, data, items }) => {
  return (
    <ul>
      {data.map((obj) => (
        <Link to={`${type}/${obj.id}`} key={obj.id}>
          <Item data={obj} items={items} type={type} />
        </Link>
      ))}
    </ul>
  );
};

// 아이템 컴포넌트
export const Item = ({ type, data, items }) => {
  // 문의 리스트일 경우 -> '답변완료' vs '답변대기' 변환
  const check = (type, item, value) => {
    if (type === '/question' && item === 'isAnswered') {
      value = value ? '답변완료' : '답변대기';
    }
    return value;
  };

  return (
    <li>
      {items.map((item, index) => (
        <span key={index}>{check(type, item, data[item])} | </span>
      ))}
    </li>
  );
};
