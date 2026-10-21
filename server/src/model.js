import mongoose from 'mongoose';
const schema=new mongoose.Schema({code:{type:String,required:true,unique:true,index:true},url:{type:String,required:true},clicks:{type:Number,default:0},lastVisited:{type:Date,default:null},createdAt:{type:Date,default:Date.now}}, {versionKey:false});
export default mongoose.model('Link',schema);
