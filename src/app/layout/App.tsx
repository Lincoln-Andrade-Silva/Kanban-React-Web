import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import { useStore } from '../store/store';
import LoadingComponent from './component/LoadingComponent';
import NavBar from './component/NavBar';

const App = () => {
  const location = useLocation();
  const shouldShowNavBar = !['/not-found'].some(route => location.pathname.includes(route));
  const { commonStore: { loading, initApp } } = useStore();

  useEffect(() => {
    initApp();
  }, []);

  if (loading) return <LoadingComponent content='' />
  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' />
      <div className='body'>
        {shouldShowNavBar && <NavBar />}
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default observer(App);