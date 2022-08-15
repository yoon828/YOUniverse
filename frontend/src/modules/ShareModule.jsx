import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ShareModule.scss';

const ShareModule = () => {
  const { name } = useSelector((state) => state.user.value);
  const API_KEY = 'e09419333dd810c5a8fcc8db0d0c8aea';
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  const storeName = useSelector((state) => state.user.value.name);
  const url = `https://cjswltjr.shop/invite?id=${storeSessionId}&name=${storeName}`;

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
      <button className="invite login_kakao" onClick={onShareKakaoClick}>
        <div className="login_kakao_div">
          <img src="/asset/img/main/kakao_log.png" alt="" />
          카카오 친구 초대하기
        </div>
      </button>
      <button className="invite invite_link" onClick={onCopyUrl}>
        링크복사
      </button>
    </>
  );
};

export default ShareModule;
