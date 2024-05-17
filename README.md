# Shubham's Weather App

## Overview

Shubham's Weather App is a React-based web application that fetches and displays weather information for a list of predefined cities. Users can retrieve weather data, update descriptions, delete entries, and search for specific cities. The app highlights the searched city's row for 3 seconds if found.

## Features

- Fetch weather data for predefined cities.
- Display weather details including city name, description, temperature, pressure, and data age.
- Update the description of each city.
- Delete weather entries.
- Search for a city and highlight the row if found.

## Usage
### Get Weather Data:
- Click the "Get Weather" button to fetch weather data for predefined cities (London, New York, Los Angeles, Las Vegas).
- The data will be displayed in a table on the right side.

### Update Description:
- Edit the description directly in the table and it will be updated in the state.

### Delete a City:
-Click the "Delete" button in the respective row to remove the city's weather data from the table.
- Deleted cities can be re-added by clicking "Get Weather" again.

### Search for a City:
- Enter a city name in the search bar and click the "Search" button.
- If the city is found in the table, its row will be highlighted in yellow for 3 seconds.