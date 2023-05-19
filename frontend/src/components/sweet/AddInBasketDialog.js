import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";

function PaperComponent(props) {
  return (
      <Paper {...props}/>
  );
}

const BasketDialogAddSweet = ({ url, name, isOpen, closingDialog }) => {
  const [open, setOpen] = React.useState(isOpen);
  const noImageFound =
    "https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png";
    
  const handleClose = () => {
    setOpen(false);
    closingDialog();
    isOpen = false;
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogContent style={{minWidth: "400px", maxWidth: "500px", objectFit: "contain", backgroundColor: "rgb(214, 212, 212)"}}>
          <DialogContentText style={{marginBottom: "-10%"}}>
            <div style={{textAlign: "center", width: "100%"}}>
            <p
              style={{
                backgroundImage: `url(${url && url === "" ? noImageFound : url})`,
                backgroundSize: "cover",
                width: 200,
                maxWidth: "100%",
                height: 180,
                maxHeight: "100%",
                objectFit: "contain",
                backgroundPosition: "center",
                padding: "auto",
                margin: "auto"
              }}
            >
            </p>
            <br/>
            <p style={{fontWeight: "bold"}}>{name && name !== "" && name} je dodan/a u korpu!</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{backgroundColor: "rgb(214, 212, 212)"}}>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
  );
}
export default BasketDialogAddSweet;