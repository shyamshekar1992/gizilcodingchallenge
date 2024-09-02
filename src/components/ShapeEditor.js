import React from 'react';
import { Grid2, TextField, Button, Box } from '@mui/material';

const ShapeEditor = ({ shape, onChange, onSave }) => {
    return (
        <Box>
            {/* Heading to display the name of the shape being edited */}
            <h2>Name: {shape.name}</h2>
            
            {/* Grid layout to organize input fields for shape dimensions and positions */}
            <Grid2 container spacing={2} marginBottom={2}>
                
                {/* Input field for width */}
                <Grid2 item xs={4}>
                    <TextField
                        label="Width"
                        type="number"
                        name="width"
                        value={shape.dimensions.width}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid2>
                
                {/* Input field for height */}
                <Grid2 item xs={4}>
                    <TextField
                        label="Height"
                        type="number"
                        name="height"
                        value={shape.dimensions.height}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid2>
                
                {/* Input field for depth */}
                <Grid2 item xs={4}>
                    <TextField
                        label="Depth"
                        type="number"
                        name="depth"
                        value={shape.dimensions.depth}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid2>
                
                {/* Input field for X position */}
                <Grid2 item xs={4}>
                    <TextField
                        label="X Position"
                        type="number"
                        name="x"
                        value={shape.dimensions.x}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid2>
                
                {/* Input field for Y position */}
                <Grid2 item xs={4}>
                    <TextField
                        label="Y Position"
                        type="number"
                        name="y"
                        value={shape.dimensions.y}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid2>
                
                {/* Input field for Z position */}
                <Grid2 item xs={4}>
                    <TextField
                        label="Z Position"
                        type="number"
                        name="z"
                        value={shape.dimensions.z}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid2>
            </Grid2>

            {/* Button to save the changes made to the shape */}
            <Button variant="contained" color="primary" onClick={onSave}>
                Save Changes
            </Button>
        </Box>
    );
};

export default ShapeEditor;
