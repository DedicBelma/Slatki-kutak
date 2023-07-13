import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FindByStatusSpecialAdmin from "./FindByStatusSpecialAdmin";
import SpecialOrdersAdminDesign from "./SpecialOrdersAdminDesign";

let logedUser = null;

const SpecialOrdersAdmin = ({User}) => {
  const [user, setUser] = useState("");
  const [specialOrder, setSpecialOrder] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  logedUser = location.state.user;

  useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const url = "http://localhost:3000";
    const fetchedData = await fetch(url + "/Sweet/SpecialOrders/");
    const data = await fetchedData.json();
    setSpecialOrder(data);
  };

  const editSpecialOrder = (id, status) => {
    const url = "http://localhost:3000/Sweet/SpecialOrders/specialOrder/" + id;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        Status: status,
      }),
    }).then(() => {
      fetchData();
      navigate("/Sweet/specialOrders", {state: {user:  logedUser}});
    });
  }

  return ( 
    <div className="specialOrders">
      <div className="titlesFind">
        <div className="ordersTitle">
          <p className="specialTitle">Moje posebne narudžbe</p>
        </div>
        <div className="findByStatus">
          <FindByStatusSpecialAdmin passSetSpecialOrder={setSpecialOrder} user={user} />
        </div>
      </div>

      <SpecialOrdersAdminDesign specialOrder = {specialOrder} editSpecialOrder = {editSpecialOrder}/>

    </div>    
  );
}
 
export default SpecialOrdersAdmin;