import 'dotenv/config';
import mongoose from 'mongoose';
import {makeApp} from './app.js';
const port=Number(process.env.PORT||5000);
if(!process.env.MONGO_URI){console.error('Missing MONGO_URI. Copy server/.env.example to server/.env');process.exit(1);}
try {await mongoose.connect(process.env.MONGO_URI);console.log('MongoDB connected');makeApp().listen(port,()=>console.log(`API: http://localhost:${port}`));}
catch(err){console.error('Startup failed:',err.message);process.exit(1);}
