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

Admin
- Log in required
- All Public and Private User capabilities
- Create new data layers
- Edit existing data layers
- Control data layer access based on user type

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
        - Location
        - Direction
        - Status
        - Date/Time
        - Camera Name
    - New Node Template
        - Primary Data
        - Secondary Data
        - Secondary Data
        - Date/Time
        - Data Label
- Side Panel Popup
    - Historical Air Quality Data
        - Label or Title
        - Graph
        - Aggregate Data (different averages)
    - Security Camera Data (and Controls?)
        - Live Camera Feed
        - Camera Controls (activate, deactivate, etc?)
    - New Panel Template (brainstorm other options?)

## Style Guide Resources

UTOPIA Fiber brand styling in Style Guide directory (/frontend/Style Guide)

## Low Fidelity Designs

Low Fidelity Prototype [Figma Pages](https://www.figma.com/file/OxQXoairUFvWArt17Ns8U2/CloudCity?node-id=2%3A3)

## Vue App

Only using Vue.js, not other app frameworks

To run app locally:
- cd to /frontend/vue-smartmap
- run 'npm run dev' in the terminal
- access page from local host
- other dev instructions found in frontend/vue-smartmap/README.md

### Map Work

Here

### Login Pages

Following example at this site 
https://www.thepolyglotdeveloper.com/2018/04/simple-user-login-vuejs-web-application/

Goal:
- login successfully
- access SecureView (/secure endpoint)
- only be able to access secure page if LOGGED IN

Here

## Secure Page

Here

### Vue Code Documentation

## Directory

# File

Function

# File

Function

## Directory

# File

Function

# File

Function


** [Helpful Markdown Guide](https://www.markdownguide.org/cheat-sheet/) ***
