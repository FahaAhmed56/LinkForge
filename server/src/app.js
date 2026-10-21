import express from 'express';
import cors from 'cors';
import {nanoid} from 'nanoid';
import Link from './model.js';
import {normalizeAlias,validateUrl} from './utils.js';
export function makeApp({clientUrl=process.env.CLIENT_URL||'http://localhost:5173',baseUrl=process.env.BASE_URL||'http://localhost:5000'}={}) {
 const app=express(); app.disable('x-powered-by'); app.use(cors({origin:clientUrl})); app.use(express.json({limit:'16kb'}));
 app.get('/api/health',(_req,res)=>res.json({ok:true}));
 app.get('/api/links',async (_req,res,next)=>{try{res.json(await Link.find().sort({createdAt:-1}).limit(100).lean());}catch(e){next(e);}});
 app.post('/api/links',async(req,res,next)=>{try{
  const {url,alias}=req.body||{};
  if(typeof url!=='string'||url.length>2048||!validateUrl(url)) return res.status(400).json({error:'Enter a valid http(s) URL (maximum 2048 characters).'});
  let code; try{code=normalizeAlias(alias)||nanoid(7);}catch(e){return res.status(400).json({error:e.message});}
  const link=await Link.create({code,url});res.status(201).json({...link.toObject(),shortUrl:`${baseUrl.replace(/\/$/,'')}/${code}`});
 }catch(e){if(e.code===11000)return res.status(409).json({error:'This custom alias is already taken.'});next(e);}});
 app.delete('/api/links/:code',async(req,res,next)=>{try{const item=await Link.findOneAndDelete({code:req.params.code});if(!item)return res.status(404).json({error:'Link not found'});res.status(204).end();}catch(e){next(e);}});
 app.get('/:code',async(req,res,next)=>{try{const link=await Link.findOneAndUpdate({code:req.params.code},{$inc:{clicks:1},$set:{lastVisited:new Date()}},{new:true});if(!link)return res.status(404).send('Short link not found');res.redirect(302,link.url);}catch(e){next(e);}});
 app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({error:'Internal server error'});});return app;
}
