import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableRow, Button, TableCell, Box } from '@mui/material';
import ShapeTableRow from './ShapeTableRow';
import ShapeFormModal from './ShapeFormModal';
import ShapeCanvas from './ShapeCanvas';

const ShapeTable = () => {
    // State to manage the list of shapes, retrieved from localStorage if available
    const [shapes, setShapes] = useState(() => {
        const savedShapes = localStorage.getItem('shapes');
        return savedShapes ? JSON.parse(savedShapes) : [];
    });

    // State to control the visibility of the shape creation modal
    const [openModal, setOpenModal] = useState(false);

    // State to track the selected shape for editing or rendering
    const [selectedShape, setSelectedShape] = useState(null);

    // State to manage whether all shapes should be rendered
    const [renderAll, setRenderAll] = useState(false);

    // Open the modal for creating a new shape
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // Close the shape creation modal and reset selected shape
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedShape(null);
    };

    // Handle the creation of a new shape
    const handleCreate = (newShape) => {
        const updatedShapes = [...shapes, newShape];
        setShapes(updatedShapes);
        localStorage.setItem('shapes', JSON.stringify(updatedShapes)); // Persist shapes to localStorage
        handleCloseModal(); // Close modal after creation
    };

    // Handle the deletion of a shape by ID
    const handleDelete = (id) => {
        const newShapes = shapes.filter(shape => shape.id !== id);
        setShapes(newShapes);
        localStorage.setItem('shapes', JSON.stringify(newShapes)); // Update localStorage after deletion
    };

    // Render a specific shape for editing
    const handleRender = (shape) => {
        setSelectedShape(shape);
        setRenderAll(false); // Ensure we're only rendering one shape
    };

    // Render all shapes side by side
    const handleRenderAll = () => {
        setRenderAll(true);
        setSelectedShape(null); // Ensure no single shape is selected
    };

    // Update the shape's details after editing
    const handleUpdateShape = (updatedShape) => {
        const updatedShapes = shapes.map((shape) =>
            shape.id === updatedShape.id ? updatedShape : shape
        );
        setShapes(updatedShapes);
        localStorage.setItem('shapes', JSON.stringify(updatedShapes)); // Persist changes to localStorage
    };

    // Close the canvas view
    const handleCloseCanvas = () => {
        setSelectedShape(null);
        setRenderAll(false);
    };

    return (
        <div>
            {/* Conditionally render either the shape canvas or the table and modal controls */}
            {selectedShape || renderAll ? (
                <div>
                    <Button onClick={handleCloseCanvas} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        X
                    </Button>
                    {renderAll ? (
                        <ShapeCanvas shapes={shapes} onCloseCanvas={handleCloseCanvas} />  
                    ) : (
                        <ShapeCanvas shape={selectedShape} onUpdateShape={handleUpdateShape} onCloseCanvas={handleCloseCanvas} />     
                    )}
                </div>
            ) : (
                <div>
                    {/* Button container aligned to the right */}
                    <Box 
                        display="flex" 
                        justifyContent="flex-end" 
                        marginBottom={2} 
                        gap={2}
                    >
                        <Button variant="contained" color="primary" onClick={handleOpenModal}>
                            Create Shape
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleRenderAll}>
                            Render All
                        </Button>
                    </Box>

                    {/* Table to display all shapes with options to render or delete */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell> {/* Column for Shape ID */}
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Dimensions</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shapes.map((shape) => (
                                <ShapeTableRow
                                    key={shape.id}
                                    shape={shape}
                                    onRender={handleRender}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </TableBody>
                    </Table>

                    {/* Modal for Creating Shapes */}
                    <ShapeFormModal
                        open={openModal}
                        onClose={handleCloseModal}
                        onCreate={handleCreate}
                        nextId={shapes.length + 1} // Calculate the next shape ID
                    />
                </div>
            )}
        </div>
    );
};

export default ShapeTable;
