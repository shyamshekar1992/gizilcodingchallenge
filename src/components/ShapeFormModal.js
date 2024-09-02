import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const ShapeFormModal = ({ open, onClose, onCreate, nextId }) => {
    // Initial form values
    const initialValues = {
        name: '',
        type: '',
    };

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Shape type is required'),
    });

    // Handle form submission
    const handleSubmit = (values, { resetForm }) => {
        // If the name is not provided, assign a default name using the next ID
        const name = values.name || `Shape-${nextId}`;
        const shape = {
            id: nextId, // Assign the ID based on the nextId prop
            name,
            type: values.type,
            dimensions: {
                width: 1,
                height: 2,
                depth: 3,
                x: 0,
                y: 0,
                z: 0,
            },
        };
        onCreate(shape); // Call the onCreate function with the new shape
        resetForm(); // Reset the form after submission
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create a New Shape</DialogTitle>
            <DialogContent>
                {/* Formik is used for form management */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors }) => (
                        <Form>
                            {/* Input for the shape name */}
                            <TextField
                                margin="dense"
                                label="Name"
                                name="name"
                                fullWidth
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name ? <span style={{ color: 'red' }}>{errors.name}</span> : ''}
                            />
                            {/* Dropdown to select the shape type */}
                            <TextField
                                margin="dense"
                                label="Type"
                                name="type"
                                select
                                fullWidth
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.type && Boolean(errors.type)}
                                helperText={touched.type && errors.type ? <span style={{ color: 'red' }}>{errors.type}</span> : ''}
                            >
                                {/* Shape type options */}
                                <MenuItem value="Cube">Cube</MenuItem>
                                <MenuItem value="Sphere">Sphere</MenuItem>
                                <MenuItem value="Cylinder">Cylinder</MenuItem>
                                <MenuItem value="Cone">Cone</MenuItem>
                            </TextField>
                            {/* Action buttons */}
                            <DialogActions>
                                <Button onClick={onClose} aria-label="Cancel shape creation">Cancel</Button>
                                <Button type="submit" color="primary" aria-label="Create shape">Create</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default ShapeFormModal;
