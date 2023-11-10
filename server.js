import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

const openai=new OpenAI({
    apiKey: process.env.OPENAI
})

import express from"express";
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());

// the server will receive the request message and execute the code and formulate to respond message
app.post('/dream',async(req,res)=>{
    try{
        const prompt = req.body.prompt;

        const aiResponse =await openai.images.generate({
            prompt,
            n:1,
            size:'1024x1024',
        });
        const image = aiResponse.data[0].url;
        res.send({image});
    } catch (error){
        console.error(error)
        // Check if it's an API-related error
        if (error instanceof OpenAI.APIError) {
            // Log the details of the API error
            console.error('API error status:', error.status);  // e.g. 401
            console.error('API error message:', error.message); // e.g. The authentication token you passed was invalid...
            console.error('API error code:', error.code);  // e.g. 'invalid_api_key'
            console.error('API error type:', error.type);  // e.g. 'invalid_request_error'

            // Send back a response with the API error message
            res.status(error.status).send({ error: error.message });
        } else {
            // For non-API errors, send back a generic error message
            res.status(500).send({ error: 'Something went wrong' });
        }
        //res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

app.listen(8081,()=> console.log('make art in http://localhost:8081/dream'))
