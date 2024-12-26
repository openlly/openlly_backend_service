# Getting Started
- Clone the repository
- Install dependencies
```bash
npm install
```


- Run the development server
```bash
npm start
```
- Run the prisma migrate dev    


```bash
npx prisma migrate dev --name <name>
```



## Env variables
- Create a .env file    
```
JWT_SECRET=12345678123456781234567812345678
JWT_EXPIRES_MS=86400000
BASE_URL=http://localhost:3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres   
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=<GROQ API KEY>
```


