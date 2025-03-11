# Geotag Photo App

Tired of geotagging apps cluttered with ads? Me too! That's why I built this simple, ad-free web application using Next.js and TypeScript. It lets you capture photos with your device's camera, embed geolocation and timestamp data directly onto the image, and download the geotagged photo instantly. No nonsense, just clean functionality. Oh, and there's a little something for those who need a "fake GPS" feature too. 😉

## Features

-   **Camera Access:** Uses the browser's `getUserMedia` API for direct camera access.
-   **Geolocation:** Embeds real-time latitude and longitude data onto your photos using the browser's Geolocation API.
-   **Timestamp:** Adds the current date and time to each image.
-   **Image Overlay:** Overlays the location and timestamp data seamlessly onto the captured photo using the HTML5 Canvas API.
-   **Direct Download:** Provides instant download of the geotagged photo as a PNG file.
-   **TypeScript Powered:** Built with TypeScript for enhanced type safety and maintainability.
-   **Next.js Framework:** Leverages Next.js for efficient development and routing.
-   **React Icons:** Uses React Icons for clean and simple interface elements.
-   **Fake GPS (Experimental): A simple way to input custom location coordinates before capturing the image. Use with caution.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kakotyanimesh/geotag-photo-app.git
    cd geotag-photo-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser and navigate to `http://localhost:3000`.**

## Usage

1.  Click the "Open Camera" button to access your device's camera.
2.  Allow camera and location permissions when prompted.
3.  *[If you implemented fake gps feature add this section. otherwise remove it]* If using fake GPS, enter your desired coordinates.
4.  Click the "Capture Photo" button to take a photo.
5.  The geotagged photo will be downloaded automatically.

## Technologies

-   Next.js
-   TypeScript
-   React
-   HTML5 Canvas API
-   Browser Geolocation API
-   `getUserMedia` API
-   React Icons

## Limitations

-   **HTTPS Requirement:** Camera and geolocation access require HTTPS (or localhost).
-   **Browser Support:** Some mobile browsers may restrict camera or geolocation access.
-   **No Persistence:** Photos are not saved on a server; they are only available for download.

## Contributing

I dont think anyone wants to contribute

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## Author

Animesh Kakoty
