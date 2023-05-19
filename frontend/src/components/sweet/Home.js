import { useState } from "react";
import {useLocation} from "react-router-dom";
import Navbar from '../navbar/Navbar';
import { Typography } from "@mui/material";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageDialog from "./ImageDialog";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FindByName from './FindByName';
import FindByCategory from "./FindByCategory";
import BasketDialogAddSweet from "./AddInBasketDialog";
import DeleteFromHomeDialog from "./DeleteFromHome";

const url = "http://localhost:3000";
const noImageFound = "https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png";

let logedUser = null;

const Home = () => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [sweet, setSweet] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [urlImage, setUrlImage] = useState(false);
  const [AddInBasketDialog, setAddInBasketDialog] = useState(false);
  const [sweetAddInBasket, setSweetAddInBasket] = useState(false);
  const [sweetUrl, setSweetUrl] = useState(false);
  const [sweetName, setSweetName] = useState(false);
  const [sweetId, setSweetId] = useState(false);
  const [name, setName] = useState("default");
  const [category, setCategory] = useState("default");
  
  const navigate = useNavigate();
  logedUser = location.state.user;

  useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchedData();
  }, [name, category]);

  const fetchedData = async () => {
    if (name === "default" && category === "default") {
      const data = await fetch("http://localhost:3000/Home");
      const sweet2 = await data.json();
      setSweet(sweet2);
    } else if (name !== "default" || category !== "default"){
      const data = await fetch("http://localhost:3000/Sweet/findByNameAndCategory/" + name + "/" + category);
      const sweet2 = await data.json();
      if(sweet2){
        setSweet(sweet2);
      }
    }
  };

  const fetchData = async () => {
    const fetchedData = await fetch(url + "/Home");
    const realData = await fetchedData.json();
    setSweet(realData);
  };
  
  const deleteSweet = (id) => {
    fetch(url + "/Sweet/delete/" + id, {
      method: "DELETE",
    }).then(() => {
      fetchData();
    });
  };
  
  const updateSweet = (id) => {
    navigate(`/Sweet/edit/${id}`, {state: {user:  logedUser}});
  };
  
  const addInBasket = (sweetId, sweetName, imageUrl, userId) => {
    setAddInBasketDialog(true);
    setSweetName(sweetName);
    {imageUrl === "" ? setSweetUrl(noImageFound) : setSweetUrl(imageUrl)};
    const url = 'http://localhost:3000/Sweet/addInBasket';
    fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        SweetId: sweetId,
        UserId: userId,
      })
    })
  };

  const closeAddInBasketDialog = () => {
    setAddInBasketDialog(false);
  }

  const openImageDialog = (url) => {
    setOpen(true);
    setUrlImage(url);
  };
  
  const closingDialog = () => {
    setOpen(false);
    setUrlImage(false);
  };
    
  const openDeleteFromHome = (id) => {
    setOpenDelete(true);
    setSweetId(id);
  }
    
  const closingDeleteFromHomeDialog = () => {
    setOpenDelete(false);
    setSweetId(false);
  }

  return (
    <div className="home">
      < Navbar />
      <div className="sweet">
        <div className="title">
          <div className="findByName">
            < FindByName passSetName={setName} />
          </div>
          <div className="findByCategory">
            < FindByCategory passSetCategory={setCategory} />
          </div>
        </div>
        <div className="offer">
          <p> Život traje kratko, uzmi nešto slatko!</p>
        </div>
        <div className="sweetFlex">
          {sweet && 
            sweet.map((sweet) => (
              <div className="sweetFrame">
                <div className="sweetOffer" key={sweet._id}>
                  <div
                    className="image"
                    onClick={() =>
                      openImageDialog(
                        sweet.imageUrl === "" ? noImageFound : sweet.imageUrl
                      )
                    }
                  >
                    <p
                      style={{
                        backgroundImage: `url(${
                        sweet.imageUrl === "" ? noImageFound : sweet.imageUrl
                        })`,
                      }}
                    ></p>
                  </div>
                  <div className="name" style={{marginTop: "-6%"}}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      <p>{sweet.name}</p>
                    </Typography>
                  </div>
                  <div className="price" style={{marginTop: "-5%", marginBottom: "-2%"}}>
                    <Typography variant="body2" gutterBottom component="div">
                      <p>{parseFloat(sweet.price).toFixed(2)}KM</p>
                    </Typography>
                  </div>
                  {user && user.role === 1 && <>
                    <hr />
                    <div className="deleteAndUpdate">
                      <p className="delete" onClick={() => openDeleteFromHome(sweet._id)}>
                        <DeleteIcon fontSize="large" />
                      </p>
                      <p className="update" onClick={() => updateSweet(sweet._id)}>
                        {" "}
                        <EditIcon fontSize="large" />
                      </p>
                    </div></>
                  }
                  {user && user.role === 2 && <>
                    <hr />
                    <div className="buy">
                      <p className="addInBasket">
                        {<ShoppingCartOutlinedIcon fontSize="large" onClick={() => addInBasket(sweet._id, sweet.name, sweet.imageUrl, user._id)}/>}
                      </p>
                    </div></>
                  }
                </div>
              </div>
            ))}
          {sweet && sweet.length === 0 && <div className="noData" style={{textAlign: "center", fontSize: "25px", marginTop: "8%"}}>Nema pronađenih poslastica!</div>}
          {open === true && (
            <ImageDialog
              url={urlImage}
              isOpen={open}
              closingDialog={closingDialog}
            />
          )}
          {AddInBasketDialog === true && (
          <BasketDialogAddSweet
           url={sweetUrl} 
           name={sweetName} 
           isOpen={AddInBasketDialog} 
           closingDialog={closeAddInBasketDialog}/>)}
          {openDelete === true && (
          <DeleteFromHomeDialog
            id={sweetId} 
            isOpen={openDelete} 
            closingDialog={closingDeleteFromHomeDialog}
            deleteSweet={deleteSweet}/>)}
        </div>
      </div>
    </div> 
  );
}
 
export default Home;