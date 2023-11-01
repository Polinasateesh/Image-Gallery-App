import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import img1 from "./assets/image-1.png";
import img2 from "./assets/image-2.png";
import img3 from "./assets/image-3.png";
import img4 from "./assets/image-4.png";
import img5 from "./assets/image-5.png";
import img6 from "./assets/image-6.png";
import img7 from "./assets/image-7.png";
import img8 from "./assets/image-8.png";
import img9 from "./assets/image-9.png";
import img10 from "./assets/image-10.png";
import img11 from "./assets/image-11.png";
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  // Define the initial state for images
  const [images, setImages] = useState([
    { id: 1, url: img1, isSelected: false },
    { id: 2, url: img2, isSelected: false },
    { id: 3, url: img3, isSelected: false },
    { id: 4, url: img4, isSelected: false },
    { id: 5, url: img5, isSelected: false },
    { id: 6, url: img6, isSelected: false },
    { id: 7, url: img7, isSelected: false },
    { id: 8, url: img8, isSelected: false },
    { id: 9, url: img9, isSelected: false },
    { id: 10, url: img10, isSelected: false },
    { id: 11, url: img11, isSelected: false }
  ]);

  // Define state for the count of selected images
  const [selectedImagesCount, setSelectedImagesCount] = useState(0)

  // Function to toggle the selection of an image
  const toggleSelect = (id) => {
    const updatedImages = images.map((img) =>
      img.id === id ? { ...img, isSelected: !img.isSelected } : img
    );
    setImages(updatedImages);

    // Count the selected images
    const filteredImages = updatedImages.filter((eachImageSelection) => (eachImageSelection.isSelected === true))
    setSelectedImagesCount(filteredImages.length)
  };

  // Function to delete selected images
  const deleteSelected = () => {
    if(selectedImagesCount > 0){

      // Display a success toast with the count of deleted files
      toast.success(`${selectedImagesCount} ${selectedImagesCount > 1 ? "Files" : "File"} Deleted Successfully`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 600,
      })

      // Filter out the selected images from the state
      const updatedImages = images.filter((img) => !img.isSelected);
      setImages(updatedImages);
      setSelectedImagesCount(0)
 
    }else{
      // Display an error toast when no files are selected
      toast.error(' No Files are Selected', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 700,
      })

    }
  }

  return (
    <>
     <ToastContainer />
      <div className="d-flex justify-content-between align-items-center m-1 ">
        <div>
          {/* Checkbox to select all images */}
          <input type="checkbox" className="input-checkbox" style={{ transform: "scale(1.2)" }} checked={selectedImagesCount > 0 ? true : false}/>{" "}
          <label className="label">{selectedImagesCount}{" "}{selectedImagesCount > 1 ? "Files Selected" : "File selected"}</label>
        </div>
        <div>
          {/* Button to delete selected images */}
          <Button variant="outline-danger" className="__button" onClick={deleteSelected}>Delete Files</Button>
        </div>
      </div>
      <hr/>
      <Container fluid>
        <Row>
          {images.map((eachImage) => (
            <Col xs={12} md={6} lg={4} xl={3} key={eachImage.id}>
              <div className={`image-container ${eachImage.isSelected ? 'dull' : ''}`}>
                {/* Checkbox for each image */}
                <input
                  type="checkbox"
                  onChange={() => toggleSelect(eachImage.id)}
                  checked={eachImage.isSelected}
                  style={{ transform: "scale(1.2)" }}
                />
                {/* Image */}
                <Image
                  src={eachImage.url}
                  onClick={() => toggleSelect(eachImage.id)}
                  width={"100%"}
                  alt={eachImage.url}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;
