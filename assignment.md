# BO Front-End Developer - Assignment 01

## Assignment Details

Build a single page app that displays the profile of 10 users (the data is obtained from an
API endpoint)

The idea of both the assignments is to build a single page that displays the profile of 10
users (the data is obtained from an API endpoint). Each user's profile contains an avatar
picture, name, email, phone, address, website and company name.

## API endpoint for users data

The schema of the data received in the response is:

```text
Method: GET
URL: https://jsonplaceholder.typicode.com/users
```

The schema of the data received in the response is:

```js
// Array of 10 users
[
    {
        id, // The user's id
        username,
        name,
        email,
        phone,
        website,
        address: {
            street, // Address line 1
            suite, // Address line 2
            city,
            zipcode
        },
        company: {
            name, // The name of company where the user works
        }
    }
]
```

## API endpoint for users' avatar pictures

You will be using Avatars by DiceBear. They provide a free HTTP API to create unique avatar
images based on any string we send as a query parameters. Each string generates a unique
image. You will use the username to generate a unique avatar for each user.

The URL for the GET endpoint is:

`https://avatars.dicebear.com/v2/avataaars/{{username}}.svg?options[mood][]=happy`

The {username} in the URL is the placeholder for the user's username. It should be
dynamically replaced by the username received from the user's API endpoint. For example,
if the username for one of the users is psamd then the URL for the avatar for this user will be:

`https://avatars.dicebear.com/v2/avataaars/psamd.svg?options[mood][]=happy`

## Loading Indicator

Upon opening the app a loading indicator is displayed until the data is fetched from the
API and is ready to be displayed. The source code for the loading indicator can be obtained
from <http://tobiasahlin.com/spinkit/>
