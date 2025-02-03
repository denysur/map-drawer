# Map Drawer

Map Drawer is a web application that allows users to draw markers, shapes, and arrows on a map. It provides various tools for creating and customizing these elements, as well as features for managing their state and history.

## Features

- **Markers**: Add, remove, and customize markers on the map.
- **Shapes**: Draw and edit various shapes such as circles, polygons, and vectors.
- **Arrows**: Create arrows with customizable size, color, and weight.
- **History**: Undo and redo actions to manage changes.
- **Screenshot**: Save the current map view as an image.
- **Dark Mode**: Toggle between light and dark themes.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/map-drawer.git
cd map-drawer
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file based on the `.env.sample` file and fill in the required environment variables.

4. Start the development server:

```sh
npm run dev
```

## Usage

- Use the toolbar to select different tools for drawing markers, shapes, and arrows.
- Click on the map to add elements.
- Customize elements using the settings panel.
- Use the undo and redo buttons to manage changes.
- Save the map view as an image using the screenshot tool.

## Deployment

This project is deployed on Firebase, which provides a robust and scalable platform for hosting web applications. Firebase Hosting offers fast and secure static hosting for web apps, complete with a global content delivery network (CDN).

To deploy the project to Firebase, follow these steps:

1. Install the Firebase CLI:

```sh
npm install -g firebase-tools
```

2. Log in to Firebase:

```sh
firebase login
```

3. Initialize Firebase in your project directory:

```sh
firebase init
```

4. Follow the prompts to set up Firebase Hosting and select the project you want to deploy.

5. Build the project:

```sh
npm run build
```

6. Deploy to Firebase:

```sh
firebase deploy
```

After deployment, your application will be accessible via the Firebase-provided URL.

## Libraries

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A toolset for efficient Redux development.
- **Mapbox GL**: A library for interactive, customizable vector maps.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Firebase**: A platform for building web and mobile applications, providing backend services such as authentication and storage.
- **Turf.js**: A JavaScript library for advanced geospatial analysis.
- **React-Map-GL**: A React wrapper for Mapbox GL JS.
- **React-Colorful**: A tiny color picker component for React.

## Acknowledgements

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Turf.js](https://turfjs.org/)
- [React-Map-GL](https://visgl.github.io/react-map-gl/)
- [React-Colorful](https://omgovich.github.io/react-colorful/)
