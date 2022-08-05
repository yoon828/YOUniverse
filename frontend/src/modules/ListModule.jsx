import React from 'react';
import { Link } from 'react-router-dom';
import { transform } from '../common/functions/functions';

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
  // 아이템 특성 확인 함수
  const check = (type, item, value) => {
    // 문의 && 답변 상태 관련 정보라면,
    if (type === '/question' && item === 'isAnswered') {
      value = value ? '답변완료' : '답변대기';

      // 날짜 관련 정보라면,
    } else if (item.includes('date')) {
      value = transform(value);
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
