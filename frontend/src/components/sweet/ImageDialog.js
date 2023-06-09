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

export default function ImageDialog({ url, isOpen, closingDialog }) {
  const [open, setOpen] = React.useState(isOpen);
  const noImageFound =
    "https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png";
    
  const handleClose = () => {
    setOpen(false);
    closingDialog();
    isOpen = false;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: "default" }}>
          Slika proizvoda
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p
              style={{
                backgroundImage: `url(${url === "" ? noImageFound : url})`,
                backgroundSize: "cover",
                width: 550,
                maxWidth: "100%",
                height: 400,
                maxHeight: "100%",
                objectFit: "contain",
                backgroundPosition: "center",
                padding: 0
              }}
            >
              {" "}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
