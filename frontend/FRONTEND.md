# Frontend Documentation

## Functionality

### Site Access Roles and Capabilities

Public
- No log in necessary
- View public smart city data layers (e.g. Air Quality sensors)

Private
- Log in required
- All Public User capabilities
- View private smart city data layers (e.g. Security Camera data)

### Air Quality Sensor Layer

Components
- Node Popup
    - Air Quality Node
        - Severity Label
        - Data Value
        - Date/Time
        - Location
        - Sensor Name
    - Security Camera Node
        - Camera Name
- Side Panel Popup
    - Historical Air Quality Data
        - Label or Title
        - Graph
    - Security Camera Data (and Controls?)
        - Live Camera Feed

## Style Guide Resources

UTOPIA Fiber brand styling in Style Guide directory (/frontend/Style Guide)

## Low Fidelity Designs

Low Fidelity Prototype [Figma Pages](https://www.figma.com/file/OxQXoairUFvWArt17Ns8U2/CloudCity?node-id=2%3A3)

## Vue App

Only using Vue.js, not other app frameworks

To run app locally:
- cd to /frontend/vue-smartmap
- run 'npm install' & 'npm run dev' in the terminal
- access page from local host
- other dev instructions found in frontend/vue-smartmap/README.md

### Map Work

The map uses a json of coordinates to populate markers that are labelled with PM 2.5 measurements and color coded. Clicking on the marker will display historical data using grafana.

Goal:
- Populate Markers
- Create custom markers
- Display historical data

### Login Pages

Following example at this site 
https://www.thepolyglotdeveloper.com/2018/04/simple-user-login-vuejs-web-application/

Goal:
- login successfully
- access SecureView (/secure endpoint)
- only be able to access secure page if LOGGED IN


## Secure Page

Secure Page is only accessible after authentication. This will display the camera locations as markers. Clicking the marker will open a new tab with live camera feed.

### Vue Code Documentation

## src/views

# HomeView.vue

Public map pages. Shows real time and historic air quality. Uses custom markers and grafana iframe.

# Login.vue

Login page.

# Secure.vue

Page loads after authentication. Much like HomeView.vue, it uses custom markers and rtsp to display camera location and feed.

## src

# useGeolocation.js

Prompts user to allow location. Defaults to Utopia Fiber HQ if no location given.

## src/data

# camera.json

location data for cameras. Add to json to expand number of cameras displayed.

# sensors.json

this points to dummy data for air quality sensors. On live server this file is called current.json.

** [Helpful Markdown Guide](https://www.markdownguide.org/cheat-sheet/) ***
