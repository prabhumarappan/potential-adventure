# potential-adventure

# Stack Used
1. Backend : Nodejs
2. Database : SQLite3

# APIs in Use
1. Login -> POST /api/user/login 
2. Get All Country Details -> GET /api/country/all
3. Get Country Detail -> GET /api/country
4. Refresh Token -> POST /api/user/refreshToken
5. Add Country -> POST /api/country
6. Add User -> POST /api/user

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