# Weather Dashboard

## Overview
The Weather Dashboard is a web application that retrieves and displays weather data using the OpenWeather API. This project involves building the backend, connecting it to the frontend, and deploying the application on Render.
Link to the application https://weather-dashboard-z3r6.onrender.com
![Screenshot 2024-10-25 200501](https://github.com/user-attachments/assets/a39d6bb7-1faf-46da-8a29-5871bc52f0d0)





## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- Real-time weather data retrieval using OpenWeather API
- User-friendly interface to view current weather conditions and forecasts
- Responsive design for various devices
- Efficient backend to handle API requests and serve data to the frontend

## Getting Started

### Prerequisites
- Node.js (version X.X.X or higher)
- npm (Node Package Manager)
- An OpenWeather API key (sign up [here](https://openweathermap.org/api) to get your key)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install the necessary packages:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

### Running the Application
To start the backend server, run:
```bash
npm start
```
The application should now be accessible at `http://localhost:PORT`, where `PORT` is the port specified in your server configuration.

## API Integration
The application utilizes the OpenWeather API to fetch weather data. The backend communicates with the API, processes the response, and serves the relevant information to the frontend. 

### Endpoints
- **GET /api/weather**: Retrieves weather data based on the city name or geographic coordinates.

## Deployment
The application is deployed on Render. To set up deployment:
1. Sign in to your Render account.
2. Create a new Web Service and connect your GitHub repository.
3. Specify the build command and start command (usually `npm install` and `npm start`, respectively).
4. Add the necessary environment variables, including your OpenWeather API key.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add YourFeature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

