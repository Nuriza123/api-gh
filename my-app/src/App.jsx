import React, { useEffect, useState } from 'react';
import SearchInput from './components/SearchInput';
import UserInfo from './components/UserInfo';
import axiosInstance from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button } from 'react-bootstrap';
import './App.css';
import {FaSun, FaMoon} from 'react-icons/fa'

function App() {
  const [searchValue, setSearchValue] = useState(''); // TS типы убраны
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (searchValue) {
        try {
          console.log(`/users/${searchValue}`); // Логируем URL для проверки
          const result = await axiosInstance.get(`/users/${searchValue}`);
          setErrorMsg('');
          setUser(result.data);
        } catch (e) {
          console.error(e); // Логируем ошибку
          setErrorMsg(e.message || ''); 
          setUser(null);
        }
      } else {
        setUser(null);
        setErrorMsg('');
      }
    }
    fetchUser();
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value); // Типы убраны, можно оставить
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode); // TS типы убраны
  };

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Button className='switch-btn' onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </Button>
      <SearchInput handleChange={handleSearch} />
      {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
      {user ? (
        <UserInfo user={user} />
      ) : (
        
        searchValue && <h4 className='users_not_found_title'>User not found or empty search</h4>
      )}
    </div>
  );
}

export default App;