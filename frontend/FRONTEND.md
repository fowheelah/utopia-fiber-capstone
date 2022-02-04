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
