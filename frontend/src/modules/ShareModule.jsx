import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

const ShareModule = () => {
  const { name } = useSelector((state) => state.user.value);
  const API_KEY = 'e09419333dd810c5a8fcc8db0d0c8aea';
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  console.log(storeSessionId);
  const storeName = useSelector((state) => state.user.value.name);
  console.log(storeName);
  const url = `http://cjswltjr.shop:3000/invite?id=${storeSessionId}&name=${storeName}`;

  const onCopyUrl = () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const shareKakaoLink = (host, link) => {
    window.Kakao.Share.sendCustom({
      templateId: 80123,
      templateArgs: {
        Title: `${host}님의 Space`,
        Link: link
      }
    });
  };

  const onShareKakaoClick = () => {
    shareKakaoLink(name, url);
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(API_KEY);
    }
  }, []);

  return (
    <>
      <button onClick={onShareKakaoClick}>카카오 친구 초대하기</button>
      <button onClick={onCopyUrl}>링크복사</button>
    </>
  );
};

export default ShareModule;
