const aws=require("aws-sdk")


//s3 and cloud stodare
//step 1: multer will be used to get access to th efile in node.js (from previous session learnings)
// step 2: [BEST PRACTICE]: always write s2 upload function seperate file /function 
//expect  it to take file as input and return the uploadede file as output
//step 3: aws-sdk install -as package 
//step 4: Setupcoming for aws authentication use code below as plugin keys that are given to you 
//step5: build the uploadede file function 

//Promises
// you can never use await on callback ..if you have awaited something,you can be sure it is within a promise 


aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
    return new Promise( function(resolve, reject) {
     // this function will upload file to aws and return the link
     let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws
 
     var uploadParams= {
         ACL: "public-read",
         Bucket: "classroom-training-bucket",  //HERE
         Key: "abc/" + file.originalname, //HERE 
         
         Body: file.buffer
     }
 
 
     s3.upload( uploadParams, function (err, data ){
         if(err) {
             return reject({"error": err})
         }
         console.log(data)
         console.log("file uploaded succesfully")
         return resolve(data.Location)
     })
 
     // let data= await s3.upload( uploadParams)
     // if( data) return data.Location
     // else return "there is an error"
 
    })
 }
 
const awsFileUpload=async(req,res)=>{
 try{
    let files= req.files
    if(files && files.length>0){
        //upload to s3 and get the uploaded link
        // res.send the link back to frontend/postman
        let uploadedFileURL= await uploadFile( files[0] )
        res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
    }
    else{
        res.status(400).send({ msg: "No file found" })
    }
    
}
catch(err){
    res.status(500).send({msg: err})
}

}
 
module.exports={uploadFile,awsFileUpload}