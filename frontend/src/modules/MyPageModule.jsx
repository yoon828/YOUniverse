import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyPageModule = () => {
  const uuid = useSelector((state) => state.user.value.uuid);
  return <Link to={`/${uuid}`}>마이페이지</Link>;
};

export default MyPageModule;
