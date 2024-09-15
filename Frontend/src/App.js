import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StartPage from './components/StartPage';
import UsersPage from './components/UsersPage';
import Levels from './components/LanguageGame/Levels';
import UsersProfile from './components/UsersProfile';
import FlashCards from './components/FlashCards';
import AdminPage from './components/Admin/AdminPage';
import Header from './components/Header';
import NoPermissionPage from './components/NoPermissionPage';
import Level from './components/LanguageGame/Level';
import TeacherPage from './components/Teacher/TeacherPage';
import { TestPage } from './components/TestPage';
import SingleTest from './components/Test/SingleTest';
import Forum from './components/Teacher/Forum';
import { Provider } from 'react-redux';
import FlashCardModal from './components/VocabLevels/FlashCardModal';
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      console.log('Fetching data...');
      
      const storedRole = localStorage.getItem('userRole');
      const storedToken = localStorage.getItem('accessToken');
  
      console.log('Stored Role:', storedRole);
      console.log('Stored Token:', storedToken);
  
      setUserRole(storedRole);
      setAccessToken(storedToken);
      setIsLoading(false);
    };
  
    fetchData();
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/user" element={<UsersPage />} />
          <Route path="/" element={<StartPage />} />
          <Route path="/level" element={<Levels />} />
          <Route path="/profile" element={<UsersProfile />} />
          <Route path="/flashCards" element={<FlashCards />} />
          <Route path="/flashCardsModal" element={<FlashCardModal />} />
          <Route path="/tests" element={<TestPage />} />
          <Route path="/test/:id" element={<SingleTest />} />
          <Route path="/forum" element={<Forum/>}/>
          {userRole === 'TEACHER' ? (
            <Route path="/teacher" element={<TeacherPage />} />
          ) : (
            <Route
              path="/teacher"
              element={<NoPermissionPage role={"teacher's"} />}
            />
          )}
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/levelgame/:levelId" element={<Level />} />
        {userRole === 'ADMIN' ? (
          <Route path="/admin" element={<AdminPage />} />
        ) : (
          <Route
            path="/admin"
            element={<NoPermissionPage role={"admin's"} />}
          />
        )}
      </Routes>
    </Router>
  );
}

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default App;
