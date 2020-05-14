require('dotenv').config()
const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');
const ejs = require('ejs');
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
});
const app = express();
const audio = 'mp3';
const image = 'jpg';
const video = 'mp4';
const bucket01 = 'bucket01-dflores';
const bucket02 = 'bucket02-dflores';
const bucket03 = 'bucket03-dflores';
const s3= new AWS.S3();
app.set('view engine', 'ejs');
app.listen(3000,()=>{
    console.log('Server running on port 3000');
});
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/audio/', (req, res)=> {
    getList(audio,res)
    // data=['list1','list2']
    // res.render(__dirname+'/list.ejs', { data: data, bucket: 'audio' });
})
app.get('/image/', (req, res)=> {
    getList(image,res)
})
app.get('/video/', (req, res)=> {
    getList(video,res)
})
function getList(extension, res, returnData=[], bucket = bucket01) {

    s3.listObjectsV2({Bucket: bucket}, function(err, data) {
        if (err){
            return res.status(400).send({success:false,err:err});
          }
          else{
            bucketData = data.Contents.filter(i => i.Key.includes(extension))
            // returnData = returnData.concat(data.Contents.filter(i => i.Key.includes(extension) ))
            switch(bucket) {
                case bucket01:
                    bucketData.forEach(item => returnData.push('bucket01/'+item.Key))
                  getList(extension, res, returnData, bucket02)
                  break;
                case bucket02:
                    bucketData.forEach(item => returnData.push('bucket02/'+item.Key))
                  getList(extension, res, returnData, bucket03)
                  break;
                case bucket03:
                    bucketData.forEach(item => returnData.push('bucket03/'+item.Key))
                    res.render(__dirname+'/list.ejs', { data: returnData });
                //   return res.send(returnData);
              }
          }
    })
}

function getListV2(extension, res, returnData=[], bucket = bucket01) {

    s3.listObjectsV2({Bucket: bucket}, function(err, data) {
        if (err){
            return res.status(400).send({success:false,err:err});
          }
          else{
            bucketData = data.Contents.filter(i => i.Key.includes(extension))
              switch(bucket) {
                case bucket01:
                  returnData.push({bucket01: bucketData})
                  getList(extension, res, returnData, bucket02)
                  break;
                case bucket02:
                  returnData.push({bucket02: bucketData})
                  getList(extension, res, returnData, bucket03)
                  break;
                case bucket03:
                  returnData.push({bucket03: bucketData})
                  return res.send(returnData);
              }
          }
    })
}
function retrieveFile(filename,bucket, res){

    const getParams = {
      Bucket: bucket,
      Key: filename
    };

    s3.getObject(getParams, function(err, data) {
      if (err){
        return res.status(400).send({success:false,err:err});
      }
      else{
        return res.send(data.Body);
      }
    });
  }
