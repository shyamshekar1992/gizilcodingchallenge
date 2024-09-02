import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Button, Box } from '@mui/material';
import ShapeEditor from './ShapeEditor';

const ShapeCanvas = ({ shape, shapes, onUpdateShape, onCloseCanvas }) => {
    // Reference to the canvas DOM element
    const canvasRef = useRef();

    // State to manage the currently edited shape
    const [editingShape, setEditingShape] = useState({ ...shape });

    useEffect(() => {
        // Initialize Three.js scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // Set the size of the renderer and append it to the DOM
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.innerHTML = ''; // Clear any previous canvas content
        canvasRef.current.appendChild(renderer.domElement);

        // Add a point light to the scene
        const light = new THREE.PointLight(0xffffff);
        light.position.set(10, 10, 10);
        scene.add(light);

        // Function to render a shape based on its geometry and position
        const renderShape = (geometry, xOffset, yOffset, zOffset) => {
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(xOffset, yOffset, zOffset); // Set the position
            scene.add(mesh);
            return mesh;
        };

        // Define canvas boundaries to constrain shape positions
        const canvasLimits = {
            xMin: -10,
            xMax: 10,
            yMin: -5,
            yMax: 5,
            zMin: -5,
            zMax: 5,
        };

        // Function to ensure a position stays within the defined limits
        const constrainPosition = (position, limits) => {
            return Math.min(Math.max(position, limits.min), limits.max);
        };

        if (shape) {
            // Single shape rendering: set geometry and constrained position
            const { width = 1, height = 1, depth = 1 } = editingShape.dimensions || {};
            let x = constrainPosition(editingShape.dimensions.x || 0, { min: canvasLimits.xMin, max: canvasLimits.xMax });
            let y = constrainPosition(editingShape.dimensions.y || 0, { min: canvasLimits.yMin, max: canvasLimits.yMax });
            let z = constrainPosition(editingShape.dimensions.z || 0, { min: canvasLimits.zMin, max: canvasLimits.zMax });

            let geometry;

            // Determine the geometry based on the shape type
            switch (editingShape.type) {
                case 'Cube':
                    geometry = new THREE.BoxGeometry(width, height, depth);
                    break;
                case 'Sphere':
                    geometry = new THREE.SphereGeometry(width / 2, 32, 32);
                    break;
                case 'Cylinder':
                    geometry = new THREE.CylinderGeometry(width / 2, width / 2, height, 32);
                    break;
                case 'Cone':
                    geometry = new THREE.ConeGeometry(width / 2, height, 32);
                    break;
                default:
                    geometry = new THREE.BoxGeometry(1, 1, 1); // Default shape if type is unknown
            }

            renderShape(geometry, x, y, z);  // Render the shape at the calculated position
        } else if (shapes && Array.isArray(shapes)) {
            // Multiple shapes rendering: loop through each shape and render them
            shapes.forEach((shape, index) => {
                const { width = 1, height = 1, depth = 1 } = shape.dimensions || {};
                let x = constrainPosition(shape.dimensions.x || 0, { min: canvasLimits.xMin, max: canvasLimits.xMax });
                let y = constrainPosition(shape.dimensions.y || 0, { min: canvasLimits.yMin, max: canvasLimits.yMax });
                let z = constrainPosition(shape.dimensions.z || 0, { min: canvasLimits.zMin, max: canvasLimits.zMax });

                let geometry;
                const xOffset = index * 5; // Offset each shape by 5 units on the x-axis

                // Determine the geometry based on the shape type
                switch (shape.type) {
                    case 'Cube':
                        geometry = new THREE.BoxGeometry(width, height, depth);
                        break;
                    case 'Sphere':
                        geometry = new THREE.SphereGeometry(width / 2, 32, 32);
                        break;
                    case 'Cylinder':
                        geometry = new THREE.CylinderGeometry(width / 2, width / 2, height, 32);
                        break;
                    case 'Cone':
                        geometry = new THREE.ConeGeometry(width / 2, height, 32);
                        break;
                    default:
                        geometry = new THREE.BoxGeometry(1, 1, 1); // Default shape if type is unknown
                }

                renderShape(geometry, xOffset + x, y, z);  // Render the shape at the calculated position
            });
        }

        camera.position.z = 10;

        // Function to animate the shapes (rotation) and render the scene
        const animate = function () {
            requestAnimationFrame(animate);
            scene.children.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.rotation.x += 0.01;
                    mesh.rotation.y += 0.01;
                }
            });
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup function to clear the scene and dispose of the renderer when the component unmounts
        return () => {
            scene.clear();
            renderer.dispose();
        };
    }, [editingShape, shapes]); // Rerender when editingShape or shapes change

    // Handle changes in the shape's dimensions
    const handleChange = (event) => {
        const { name, value } = event.target;

        setEditingShape((prev) => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [name]: parseFloat(value), // Ensure the value is a number
            },
        }));
    };

    // Save changes and close the canvas
    const handleSave = () => {
        if (onUpdateShape) {
            onUpdateShape(editingShape);
            onCloseCanvas(); // Close the canvas after saving
        }
    };

    // Handle the canvas close action
    const handleCloseCanvas = () => {
        onCloseCanvas(); // Close the canvas directly
    };

    return (
        <Box position="relative">
            {/* Only show editing options when rendering a single shape */}
            {shape && (
                <ShapeEditor
                    shape={editingShape}
                    onChange={handleChange}
                    onSave={handleSave}
                />
            )}
            <Box
                ref={canvasRef}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh', // or any other height you prefer
                    overflow: 'hidden',
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseCanvas}
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    Close Canvas
                </Button>
            </Box>
        </Box>
    );
};

export default ShapeCanvas;
