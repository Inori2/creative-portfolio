# Project: Portfolio Website

## Project Overview

This project is a personal portfolio website for a freelance web designer and developer, built with React and Vite. It features a strong emphasis on dynamic and visually engaging user experiences, utilizing GSAP (GreenSock Animation Platform) for complex animations and Lenis for smooth scrolling. Tailwind CSS is used for styling, and ESLint ensures code quality. The application follows a component-based architecture, with a preloader to manage initial content loading and a clear separation of concerns across various sections like Hero, Showreel, Highlights, and Works.

## Building and Running

The project uses Vite as its build tool.

*   **Development Server:** To start the development server, run:
    ```bash
    npm run dev
    ```
*   **Build for Production:** To create a production-ready build, run:
    ```bash
    npm run build
    ```
*   **Linting:** To run ESLint checks across the codebase, use:
    ```bash
    npm run lint
    ```
*   **Preview Production Build:** To preview the production build locally, run:
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS, PostCSS, Autoprefixer. Global styles and custom font imports are managed in `src/styles.css`.
*   **Animations:** Extensive use of GSAP for various animations, including scroll-triggered effects.
*   **Smooth Scrolling:** Lenis is integrated for a smooth scrolling experience, synchronized with GSAP's ticker for precise control.
*   **Linting:** ESLint is configured with React-specific plugins (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) to maintain code quality and consistency.
*   **Code Structure:** The application follows a component-based architecture. `src/App.jsx` serves as the main orchestrator, composing various section components located in `src/Components/`. UI utility components are found in `src/Components/ui/`.
*   **Asset Management:** Static assets such as fonts, images, and videos are located in the `public/` directory.
