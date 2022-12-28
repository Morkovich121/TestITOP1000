import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getExchange } from './store/exchangeSlice';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

import './App.css';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchange());
  }, [dispatch])

  return (
    <>
      <div className='container'>
        <Header />
        <Main />
      </div>
    </>
  );
}

export default App;
