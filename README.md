3D Shape Visualizer

Overview The 3D Shape Visualizer is a React application that allows users to create, visualize, and manipulate 3D shapes directly in the browser. Users can create various geometric shapes (like cubes, spheres, cylinders, and cones), edit their dimensions and positions, and render them in a 3D environment powered by Three.js. The application includes a clean and intuitive UI built with Material-UI.

Features

Shape Creation: Users can create shapes with specific types (Cube, Sphere, Cylinder, Cone) and assign them unique names.
Shape Editing: Dimensions (width, height, depth) and positions (x, y, z) of the shapes can be edited.
3D Visualization: Shapes are rendered in a 3D environment where users can see the shapes rotate.
Render Options:
Render a single shape to edit its properties.
Render all shapes simultaneously, aligned side by side.
State Persistence: The application saves shapes to localStorage, so they persist between sessions.
Responsive UI: The interface is responsive and adapts well to different screen sizes.
Technologies Used

React: Core framework for building the user interface.
Three.js: JavaScript library used to create and display animated 3D computer graphics.
Material-UI: React components for faster and easier web development.
Formik & Yup: Form management and validation for creating and editing shapes.
Installation and Setup

Prerequisites

Ensure you have Node.js installed on your machine. If not, download and install it from Node.js.
Make sure you have npm or yarn installed as your package manager.
Installation

Clone the repository: git clone https://github.com/yourusername/3d-shape-visualizer.git cd 3d-shape-visualizer

Install the dependencies: npm install or yarn install

Start the development server: npm start or yarn start

Open your browser and navigate to http://localhost:3000.

How to Use

Create a Shape:

Click on the "Create Shape" button.
Fill in the required fields: Name and Shape Type.
Click "Create" to add the shape.
Edit a Shape:

Click the "Render" button next to any shape in the table.
Adjust the dimensions and positions using the input fields.
Click "Save Changes" to update the shape.
Render All Shapes:

Click the "Render All" button to visualize all shapes together in the 3D space.
Close Canvas:

Use the "X" button at the top right of the canvas to close the 3D visualization.
