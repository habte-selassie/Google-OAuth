const cookieParser = require('cookie-parser')
const { config } = require('dotenv')
const express = require('express')
const app = express()

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = `767274922484-n89vq8qbee21oof9r0l7725bqdnbpslg.apps.googleusercontent.com`
const client = new OAuth2Client(CLIENT_ID);

const port = process.env.port || 3000


app.set('view engine','ejs')
app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.render('index')
})


app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    let token = req.body.token
    console.log(token);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      }
      verify().catch(console.error);
})
app.listen(port,()=>{
    console.log(`Server running on port number ${port}`);
})