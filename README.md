# WTWR Web Application

**WTWR** is a weather-based clothing recommendation web application built with React. Users can browse clothing items suitable for the current weather, add new items, delete items, update their profile, and toggle temperature units between Fahrenheit and Celsius. The project emphasizes React context, modular architecture, API integration, and responsive design.

## Features

- **Temperature Unit Toggle**: Switch between Fahrenheit and Celsius using a React context.  
- **Profile Page**: View and update user information and avatar with React Router.  
- **Clothing Management**: Add, delete, and view clothing items according to weather type.  
- **Form Handling**: Controlled components and custom hooks (`useForm`) for adding new items.  
- **Mock Server Integration**: Persist data using a `json-server` API for GET, POST, and DELETE requests.  
- **Responsive Design**: Optimized for mobile and desktop users.  
- **UX Enhancements**: Feedback on form actions (“Saving…”, “Deleting…”) and optional confirmation modals for deletion.

## Images

## Tech Stack

- **Frontend**: React, JavaScript (ES6+), HTML, CSS, Responsive Design  
- **State Management**: React Context, Custom Hooks (`useForm`)  
- **Routing**: React Router v6  
- **Backend / API**: `json-server` (mock server), RESTful API, fetch / Axios  
- **Tools & Workflow**: Git, GitHub, VS Code, Figma, Webpack

## Deployment

This project is intended to run locally with the mock server. GitHub Pages deployment is not recommended while using the local API due to routing and API limitations. 

> **Note:** Currently, the application uses a hardcoded/mock database (`db.json`) for demonstration purposes. These items will not appear in a production deployment. A full backend with a database will be implemented in the next sprint in my TripleTen course.

Future deployment will use cloud services for full backend integration.

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
