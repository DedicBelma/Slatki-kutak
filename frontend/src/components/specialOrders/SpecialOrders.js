import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import FindByStatusSpecial from "./FindByStatusSpecial";
import SpecialOrdersAdmin from './SpecialOrdersAdmin';
import SpecialOrdersDesign from "./SpecialOrdersDesign";

let logedUser = null;

const SpecialOrders = ({User}) => {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const [specialOrder, setSpecialOrder] = useState("");

  logedUser = location.state.user;

  useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const url = "http://localhost:3000";
    const fetchedData = await fetch(url + "/Sweet/SpecialOrders/" + user._id);
    const data = await fetchedData.json();
    setSpecialOrder(data);
  };
    
  return ( 
    <>
    < Navbar />
    {user.role === 2 && (
      <div className="specialOrders">
        <div className="titlesFind">
        {specialOrder != "" && specialOrder.length !== 0 && <div className="ordersTitle" style={{paddingLeft: "10%"}}>
            <p className="specialTitle">Moje posebne narudžbe</p>
          </div>}
          {specialOrder == "" && specialOrder.length === 0 && <div className="ordersTitle">
            <p className="specialTitle">Moje posebne narudžbe</p>
          </div>}
          {specialOrder != "" && specialOrder.length !== 0 && <div className="findByStatus">
            <FindByStatusSpecial passSetSpecialOrder={setSpecialOrder} user={user} />
          </div>}
        </div>

        <SpecialOrdersDesign specialOrder = {specialOrder}/>
        
    </div>
    
  )}
    {user.role === 1 && < SpecialOrdersAdmin />}
    </>
  );
}
 
export default SpecialOrders;