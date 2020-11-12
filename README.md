# potential-adventure

# Stack Used
1. Backend : Nodejs
2. Database : SQLite3

# APIs in Use
1. Login -> POST /api/user/login
2. Get All Country Details -> GET /api/country/all
3. Get Country Detail -> GET /api/country
4. Refresh Token -> POST /api/user/refreshToken

# Database Models
1. User
2. Country

# Database Schemas
1. User
    1. Email -> Primary, Unique
    2. Password -> Varchar
2. Country
    1. CountryName -> Primary, Unique
    2. GMTOffSet -> Integer (Offset in Seconds)


# Doubts in Task
1. When you say populate database, is it through an API or is it a startup script?
2. When fetching details for a specific country, should the country name be in the URL or in the body or is it upto me?
3. Is it okay to use an existing JWT module?
4. With respect to refresh API, generally a refresh token is returned with the login API, so that they can use that to refresh token and get new access tokens. Do you want me to implement something like that? Or is a simple approach of sending the existing access token to get a new access token fine?

# Assumptions
1. Going with a SQLite database, as it is easier to set up
2. Since I will be using a SQLite database within the memory, scaling up the instances won't be an option as of now.
3. GMT Offest is returned in seconds
4. One country for now can have only 1 timezone

# Sample Request -> CURL
1. Login
```cURL
curl --location --request POST 'localhost:8083/api/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "prabhu@gmail.com",
    "password": "password"
}'
```

2. Get All Country Details
```cURL
curl --location --request GET 'localhost:8083/api/country/all' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWJodUBnbWFpbC5jb20iLCJpYXQiOjE2MDUxODM0MjAsImV4cCI6MTYwNTE4MzcyMH0.PhkjQvdGfJNeVKBQF3Z2EMNzdEkzU-1wncbcgUdullM'
```

3. Get Country Details
```cURL
curl --location --request GET 'localhost:8083/api/country' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWJodUBnbWFpbC5jb20iLCJpYXQiOjE2MDUxODM0MjAsImV4cCI6MTYwNTE4MzcyMH0.PhkjQvdGfJNeVKBQF3Z2EMNzdEkzU-1wncbcgUdullM' \
--header 'Content-Type: application/json' \
--data-raw '{
    "CountryName": "China"
}'
```

4. Refresh Token
```cURL
curl --location --request GET 'localhost:8083/api/user/refreshToken' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWJodUBnbWFpbC5jb20iLCJpYXQiOjE2MDUxNTIzMjIsImV4cCI6MTYwNTIzODcyMn0._X-F1rFiDdzLxlcOOrv766MAvzDI87tPIa_Bu_Onea0'
```

# Todo
1. Add Test Cases
2. ~~Add Better Function Documentations~~
3. Move routes to a different file

