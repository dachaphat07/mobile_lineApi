const express = require ('express')
const app = express()
const line = require('@line/bot-sdk')
const port = 8080;


const config = {
channelAccessToken : "uEmxQ5eqN3dnFdBYzvMv4/LoVmQQ50YcDrP81+/VJTr/9mar35SKFkpQsgK6MkSkLiNGDkLtZ0KDHispD7iiXoQZPn7OQuTmFYynCgaVtQ9v4zgT82uBXOrRa3QOHbkWnqzDs5i6zAKEoYvm19atEAdB04t89/1O/w1cDnyilFU=",
channelSecret : "8ff5f1c6a82e76869d788a0f26958156"
}

const client = new line.Client(config)

app.get('/',(req,res) => {
    res.send ("Hello World")
})

app.post('/' , line.middleware(config) , (req,res) => {
    console.log(req.body.events);
    Promise.all(req.body.events.map(handleEvent)).then((result)=>res.json(result))
})

function handleEvent(event){
    if(event.type !== 'message' || event.message.type != "text"){
        return Promise.resolve (null);
    }
if(event.message.text == "เกอร์มาดิ"){
    return client.replyMessage(event.replyToken,{
        type :"sticker",
        packageId :"4",
        stickerId:"294"
    })

}
        return client.replyMessage(event.replyToken,{
            type : 'text',
            text : 'ไม่อยากตอบเยอะเจ็บคอ'
            //event.message.text
        })
    
}

app.listen(port,() => console.log (`App running : ${port}`))