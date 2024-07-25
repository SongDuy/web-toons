import { Outlet } from 'react-router-dom';
import useShowNavRView from '../../../Hooks/layoutUser/useShowNavRView';
import FooterPage from './footer';
import HeaderPage from './header';
import NavRViewd from './navRViewd';

function Layout() {
  const showNavRView = useShowNavRView();
  return (
    <>
      <HeaderPage />
      {showNavRView&& <NavRViewd/>/* Thanh bên phải của trang*/}

      <Outlet /> {/* Nội dung của các trang con sẽ được render ở đây */}
      <FooterPage />
    </>
  );
}
export default Layout