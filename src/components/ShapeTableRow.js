import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const ShapeTableRow = ({ shape, onRender, onDelete }) => {
    return (
        <TableRow>
            {/* Display the unique ID of the shape */}
            <TableCell>{shape.id}</TableCell>
            
            {/* Display the name of the shape */}
            <TableCell>{shape.name}</TableCell>
            
            {/* Display the type of the shape (e.g., Cube, Sphere) */}
            <TableCell>{shape.type}</TableCell>
            
            {/* Display the dimensions of the shape (width x height x depth) */}
            <TableCell>{`${shape.dimensions.width} x ${shape.dimensions.height} x ${shape.dimensions.depth}`}</TableCell>
            
            {/* Render and Delete buttons for each shape */}
            <TableCell>
                {/* Button to render the shape in the canvas for editing */}
                <Button onClick={() => onRender(shape)}>Render</Button>
                
                {/* Button to delete the shape from the list */}
                <Button onClick={() => onDelete(shape.id)}>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

export default ShapeTableRow;
