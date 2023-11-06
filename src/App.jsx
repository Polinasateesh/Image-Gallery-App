
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
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
import gallery from "./assets/gallery.png"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // Your existing code here...

  const defaultImages=[
        { id: 1, url: img11, isSelected: false },
        { id: 2, url: img3, isSelected: false },
        { id: 3, url: img2, isSelected: false },
        { id: 4, url: img7, isSelected: false },
        { id: 5, url: img5, isSelected: false },
        { id: 6, url: img9, isSelected: false },
        { id: 7, url: img10, isSelected: false },
        { id: 8, url: img4, isSelected: false },
        { id: 9, url: img8, isSelected: false },
        { id: 10, url: img1, isSelected: false },
        { id: 12, url: img6, isSelected: false },
        {id:13,url:gallery,isSelected:false}
      ]
      // Define the initial state for images
      const [images, setImages] = useState(defaultImages);
    
      // Define state for the count of selected images
      const [selectedImagesCount, setSelectedImagesCount] = useState(0)
    
      // Function to toggle the selection of an image
      const toggleSelect = (id) => {
        console.log(id);
        const updatedImages = images.map((img) =>
          img.id === id ? { ...img, isSelected: !img.isSelected } : img
        );
        setImages(updatedImages);
    
        // Count the selected images
        const filteredImages = updatedImages.filter((eachImageSelection) => eachImageSelection.isSelected)
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
        } else {
          // Display an error toast when no files are selected
          toast.error(' No Files are Selected', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 700,
          })
        }
      }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center m-1">
      <div>
           <input type="checkbox" className="input-checkbox" style={{ transform: "scale(1.2)" }} checked={selectedImagesCount > 0 ? true : false}/>{" "}
           <label className="label">{selectedImagesCount}{" "}{selectedImagesCount > 1 ? "Files Selected" : "File selected"}</label>
         </div>
         <div>
           <Button variant="outline-danger" className="__button" onClick={deleteSelected}>Delete Files</Button>
        </div>
      </div>
      <hr />
      <Container fluid>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery">
            {(provided) => (
              <Row
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map((eachImage, index) => (
                  <Draggable key={eachImage.id} draggableId={String(eachImage.id)} index={index}>
                    {(provided) => (
                      <Col
                        xs={12}
                        md={6}
                        lg={4}
                        xl={3}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={`image-container ${index === 0 ? "size" : ""} ${eachImage.isSelected ? 'dull' : ''} ${eachImage.id===13?"add-image":''}`}>
                          <input
                            type="checkbox"
                            onChange={() => toggleSelect(eachImage.id)}
                            checked={eachImage.isSelected}
                            className={eachImage.id===13?"add-displayNone":''}
                            style={{ transform: "scale(1.2)" }}
                          />
                          <Image
                            src={eachImage.url}
                            onClick={() => toggleSelect(eachImage.id)}
                            width={eachImage.id===13?"40px":"100%"}
                            alt={eachImage.url}
                          />
                          {eachImage.id===13&&<p>Add Image</p>}
                        </div>
                      </Col>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Row>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
};

export default App;

