import { useLocation } from 'react-router-dom';

const CallBackPage = () => {
  const { search } = useLocation();
  console.log(useLocation());

  const url = new URLSearchParams(search);
  console.log('temp', url);

  const accessToken = url.get('accessToken');
  const refreshToken = url.get('refreshToken');
  console.log(accessToken, refreshToken);

  return (
    <>
      <h1>콜백 페이지</h1>
      <p>{accessToken}</p>
      <p>{refreshToken}</p>
    </>
  );
};
export default CallBackPage;
