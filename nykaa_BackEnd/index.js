const path=require("path")
const dotenv=require("dotenv").config()
const express=require("express")
const cors=require('cors')
 const { GoogleGenAI } =require("@google/genai")
 const { connection } = require("./db")
const { userRoute } = require("./controller/userRoutes")
const { productRoute } = require("./controller/productRoutes")
const { cartRoutes } = require("./controller/cartRoutes")
const { orderRoutes } = require("./controller/orderRoute")
const port=process.env.port

const ai = new GoogleGenAI({ apiKey: process.env.Gemini_API_KEY });

const app=express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    try {
        res.status(200).send("Wellcom to my Nykaa app")
    } catch (error) {
        res.status(404).send(error)
    }
})

app.post("/mybot",async(req,res)=>{
    try {
        const { userPrompt} = req.body
        const prompt=[
            {
                role: "user",
                parts: [{text: `A client of Nykaa, India is contacting us because something went wrong.

You must act as a friendly agent in charge of collecting a clear idea of what went wrong with the order. 
Your job is not to give support, only to collect information. Do not create any information, it must be given by the client.

We know there was an issue, but we need to know what it was, so you need to find out.

Ask only one question at a time and be friendly. Do not ask for everything all at once, create a back-and-forth exchange that keeps building on previous responses.

### **Sequence of Conversation**
1. **Greeting:** "Hello and welcome to Nykaa! This is Chatty, your virtual assistant. How can I help you today?"
2. **Customer states the issue**
3. **Gather clarification about the issue (e.g., product name,only ask the type of problem)**
4. **Collect name, email, and order number** (do not show the summary or create information)
5. **Empathy & Assurance:** Apologize and assure them that an agent will reach out.

**Rules:**
- Keep responses friendly and natural.
- Do **not** provide solutions.
- Ask **one question at a time** for a smooth conversation.
- Follow a **back-and-forth** approach: Ask **one** question at a time to clarify the issue. 
Never provide solutions, just collect details.

 User's latest message: ${userPrompt}`}],
     }
        ]
        const response = await ai.models.generateContent({
              model: "gemini-2.0-flash",
              contents: prompt,
            });
            const rawReply = response.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

        const match = rawReply.match(/"([^"]+)"\s*$/);
        const botReply = match ? match[1] : rawReply;

            res.status(200).send({botReply: botReply })
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}) 


  


app.use("/users",userRoute)

app.use("/products",productRoute)
app.use("/cart",cartRoutes)
app.use("/orders",orderRoutes)
app.listen(port,async()=>{
    try {
         await connection
        console.log(`server is running on port:-${port} and connected to Nykaa database`)
    } catch (error) {
        console.log(error)
    }
})