# Crypto
Simple website which provides cryptocurrency rankings by volume traded over past 24 hours and some analytical graphs of top currencies with volume traded by time of day.

## Technologies Used
- Node JS 
- Express JS
- Vue.js
- Mongo Atlas

## Getting started
- Start backend server by command npm start from backend server root directory.
- Start web server by command npm start from VueClient root directory.

## Screenshots
<p align="center"><h4 align="center">Currency Ranking</h4><img src="https://github.com/Sagar-Mane/Crypto/blob/master/docs/screenshots/Ranking.PNG"/>

#### Features Pagination, Per page option, filter option

<p align="center"><h4 align="center">Currency analysis</h4><img src="https://github.com/Sagar-Mane/Crypto/blob/master/docs/screenshots/analytics.PNG"/>

## Design
1. Creating data for cryptoByVolumeTradedPast24Hours API
- data source- https://coinmarketcap.com Creating data.json from source after every 10 minutes to keep the data updated and selecting only those currencies which have volume more than 0% 
2. Analytics- Storing top currencies volume data in MongoDB and updating it every half an hour in the history for each currency so that API can return volume traded for those currencies by time of day.

## API Reference 
It contains two APIs -  One for getting Crypto Currency rankings by volume traded over the past 24 hours 
and another for getting analysis of currencies by volume traded by time of day.

### cryptoByVolumeTradedPast24Hours [GET]
It returns volume traded over past 24 hours for those currencies which has more than 0% volume. You can specify pagination values in query.
eg. http://localhost:3000/cryptoByVolumeTradedPast24Hours?page=1&count=10. By default you will get all the values.

+ Response 200 (application/json)

        [
            {
                "Total_records": 289,
                "data": [
                {
                    "Bitcoin": "29.05%"
                },
                {
                    "Tether": "16.15%"
                },
                {
                    "Ethereum": "12.15%"
                },
                {
                    "EOS": "7.69%"
                },
                .
                .
                .
            }
        ]

### analytics [GET]

It returns top currencies volume trading analysis over time of day.
Currencies included are Bitcoin, Tether, EOS, Ethereum, Bitcoin Cash, Ripple, TRON and all other are categorized under others.
eg. http://localhost:3000/analytics

+ Response 200(application/json)

        {
            "name": "Bitcoin",
            "history": [
            {
                "Timestamp": 1526317483749,
                "percentage_value": "30.00%"
            },
            {
                "Timestamp": 1526315603062,
                "percentage_value": "29.92%"
            },
            {
                "Timestamp": 1526313802718,
                "percentage_value": "29.82%"
            },
            {
                "Timestamp": 1526312002581,
                "percentage_value": "29.83%"
            },
            {
                "Timestamp": 1526287697770,
                "percentage_value": "29.18%"
            }
            ]
        },
        {
            "name": "Tether",
            "history": [
            {
                "Timestamp": 1526317483749,
                "percentage_value": "15.73%"
            },
            {
                "Timestamp": 1526315603062,
                "percentage_value": "15.75%"
            },
            {
                "Timestamp": 1526313802718,
                "percentage_value": "15.76%"
            },
            {
                "Timestamp": 1526312002597,
                "percentage_value": "15.78%"
            },
            {
                "Timestamp": 1526287697770,
                "percentage_value": "16.09%"
            }
            ]
        },
    .
    .
  
    }
