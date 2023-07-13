import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Home from './components/sweet/Home'
import SignUp from './components/SignUp';
import AddSweet from './components/sweet/AddSweet';
import EditSweet from './components/sweet/EditSweet';
import NotFound from './components/NotFound';
import Basket from './components/orders/Basket';
import Orders from './components/orders/Orders';
import SpecialOrder from './components/specialOrders/SpecialOrder';
import SpecialOrders from './components/specialOrders/SpecialOrders';

function App() {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const LogedUser = (user) => {
    setUser(user);
  localStorage.setItem('user', JSON.stringify(user));
  };

  const setGuest = (user) => {
    setUser(user);
  };


   console.log(localStorage.getItem('user'));
 console.log(isLogged);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLogged === false ? <Login logging={LogedUser} guest={setGuest} /> : <Navigate to="/Home" /> } />
          <Route path="/SignUp" element={<SignUp  logging={LogedUser}/>} />
          <Route path="/Home" element={<Home logging={LogedUser}/> } />
          <Route path="/Sweet/new" element={<AddSweet/>} />
          <Route path='/Sweet/edit/:id' element={< EditSweet />} />
          <Route path='/Sweet/basket' element={ <Basket User={user} />} />
          <Route path='/Sweet/orders' element={ <Orders User={user} />} />
          <Route path='/Sweet/specialOrder' element={< SpecialOrder User={user}/>} />
          <Route path='/Sweet/specialOrders' element={< SpecialOrders User={user} />} />
          <Route path='*' element={< NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
