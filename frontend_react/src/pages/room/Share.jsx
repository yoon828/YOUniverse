import React, { useEffect } from 'react';

const Share = () => {
  const API_KEY = 'e09419333dd810c5a8fcc8db0d0c8aea';
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(API_KEY);
    }
  }, []);
  const shareKakaoLink = (host, link) => {
    window.Kakao.Share.sendCustom({
      templateId: 80123,
      templateArgs: {
        Title: `${host} 님의 ShareRoom`,
        Link: link
      }
    });
  };
  const onShareKakaoClick = () => {
    shareKakaoLink('김싸피', 'https://naver.com');
  };

  return (
    <button type="button" onClick={onShareKakaoClick}>
      share
    </button>
  );
};

export default Share;
