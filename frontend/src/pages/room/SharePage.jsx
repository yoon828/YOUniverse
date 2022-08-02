import React, { useEffect } from 'react';

const CopyBtn = ({ value }) => {
  const CopyUrl = () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    const url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };
  return <button onClick={() => CopyUrl()}>{value}</button>;
};

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
    <>
      <CopyBtn value="링크복사" />
      <button type="button" onClick={onShareKakaoClick}>
        share
      </button>
    </>
  );
};

export default Share;
