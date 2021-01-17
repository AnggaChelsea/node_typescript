import express, {Request, Response} from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import { env } from 'process';
import routes from './routes'

const app = express()
const PORT = 8080


const {MONGODB_ATLAS_USERNAME, MONGODB_ATLAS_PASSWORD, MONGODB_ATLAS_DBNAME} = env;
const URI = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0.ma8no.mongodb.net/${MONGODB_ATLAS_DBNAME}`;
const options = {useNewUrlParser: true, useUnifiedTopology: true}
console.log('uri ??', URI)

app.use(cors)
app.use(routes)

app.get('/',(req:Request, res:Response)=>{
  res.send('this is run')
})

app.get('/about', (req:Request, res:Response)=>{
  res.send('this is about')
})

mongoose.set("useFindAndModify", true);
mongoose.connect(URI,options)
.then(()=>{
  app.listen(PORT,()=>{
    console.info('run in localhost'+ PORT)
  })
})
.catch((error: any)=> {
    throw error;
  })

