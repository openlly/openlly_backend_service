import Groq from "groq-sdk";

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
if(!groq){ 
    console.error('GROQ_API_KEY is not defined');
    process.exit(1);
}
export default groq;
