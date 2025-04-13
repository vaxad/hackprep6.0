import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { connectToDb } from './db/connection.js';
import expenseRoutes from './routes/expense.js'

const app = express(); 
//make the imported module in executable state so that u can perform operations on it and make APIs
app.use(express.json()); //parses the input request data in json format to the server
/* When a client sends data to your server in JSON format, 
this will parse that JSON data and make it accessible in your server-side code.*/
app.use(cors())
dotenv.config() //this will load the environment variables from .env file into process.env

// connecting to the database
connectToDb()

app.get('/',function test(req,res){
    res.json({message:"Hello World"})
})

// Using the routes
app.use('/expenses',expenseRoutes)
// this will make the expenseRoutes available at the specified endpoint

const port = process.env.PORT || 3001
app.listen(port,function serverOn(){ //through this our express app will listen on port 5000
    console.log(`Server running at: http://localhost:${port}/`)
})