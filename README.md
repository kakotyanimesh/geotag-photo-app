# Geotag Photo App

This is a simple web application built with Next.js and TypeScript that allows users to capture photos with their device's camera, embed geolocation and timestamp data directly onto the image, and download the geotagged photo.

## Features

-   **Camera Access:** Utilizes the browser's `getUserMedia` API to access the device's camera.
-   **Geolocation:** Embeds the user's current latitude and longitude onto the captured photo using the browser's Geolocation API.
-   **Timestamp:** Adds the current date and time to the image.
-   **Image Overlay:** Overlays the geolocation and timestamp data onto the captured photo using the HTML5 Canvas API.
-   **Download:** Allows users to download the geotagged photo as a JPEG file.
-   **TypeScript:** Built with TypeScript for enhanced type safety and maintainability.
-   **Next.js:** Uses the Next.js framework for efficient development and routing.
-   **React Icons:** Uses React Icons for the camera icon.

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
3.  Click the "Capture Photo" button to take a photo.
4.  The captured photo will be displayed with the embedded geolocation and timestamp data.
5.  Click the "Download Photo" button to save the geotagged image to your device.

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

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## Author

[Your Name/GitHub Username]
