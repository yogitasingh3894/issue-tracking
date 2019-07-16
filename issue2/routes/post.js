const express = require("express");
const Router = express.Router();
const { post } = require("../models/post");
const multer = require('multer');

var app = express();
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,Accept-Encoding, Authorization,  X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","POST, PUT, DELETE, GET, OPTIONS");
    res.header("Content-Type","POST, PUT, DELETE, GET, OPTIONS");
  next();
});
//app.use(bodyParser.json());

/*var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage }).array('file',2);


console.log(upload);*/
// Create Pos;t

 var storage = multer.diskStorage({
        // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
    });
    var upload = multer({
        storage: storage
    }).any();

Router.post("/savePost", async function(req, res,next) {
  
 upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end('Error');
        } else {
            console.log(req.body);
            console.log(req.files);
             const email = req.decoded.email;
              var payload = {status:req.body.status,date:new Date().toLocaleString(),assign_to:req.body.assign_to,postTitle:req.body.postTitle,
                postDescription:req.body.postDescription,
                images:req.files,createdBy: email };
             var postDoc = new post(payload);

            try {
   
            const result =  postDoc.save();
            res.send(result);
            } catch (ex) {
              res.send(ex.message);
            }
            /*req.files.forEach(function(item) {
                console.log(item);
                // move your file to destination
            });*/
            res.end('File uploaded');
        }
    });
  //const payload = { ...req.body, createdBy: req.decoded.email };
  /* var post1 = req.body;
    console.log(req);
  const payload = { ...req.body,images:upload,createdBy: req.decoded.email };
  const postDoc = post(payload);*/
  
 
});

Router.put("/updateIssue/:id",  function(req, res) {
  upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end('Error');
        } else {
            console.log(req.body);
            console.log(req.files);
             const email = req.decoded.email;
              var payload = {status:req.body.status,date:new Date().toLocaleString(),assign_to:req.body.assign_to,postTitle:req.body.postTitle,
                postDescription:req.body.postDescription,
                images:req.files,createdBy: email };
             var postDoc = new post(payload);

            try {
   
            const result =  post.findByIdAndUpdate(req.params.id, payload, function (err, post1) {
              if (err) return next(err);
           res.send({ updated: true });

              });
            // true);
            } catch (ex) {
              res.send(ex.message);
            }
            /*req.files.forEach(function(item) {
                console.log(item);
                // move your file to destination
            });*/
            
        }
      })
});

// Update Likes
Router.put("/updateLikes/:id", async function(req, res) {
  const id = req.params.id;
  const postDoc = await post.findOneAndUpdate(
    { _id: id },
    { $addToSet: { likes: req.decoded.email } }
  );
  try {
    const result = await postDoc.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

// Update Post
Router.put("/updatePost/:id", async function(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await post.findOneAndUpdate(
      { _id: id },
      { $addToSet: req.body },
      {
        new:true
      }
    );
    res.send(result);
  } catch (ex) {
    res.send(ex.post);
  }
});



//=========search post issues===========

// Get All Posts

Router.get("/searchIssue/:id", async function(req, res) {
  try {

    const id = req.params.id;
     console.log(id);
     if(id!="")
     {
    const result = await post.find({postTitle:{$regex:id,$options:"$i"}});
     }else
     {
      const email = req.decoded.email;
    console.log(email);
    const result = await post.find({ assign_to: email });
     }
    res.send({ result });
  } catch (ex) {
    res.send(ex.message); 
  }
});

// Create Post
Router.post("/savePost", async function(req, res) {
  const payload = { ...req.body, createdBy: req.decoded.email };
  const postDoc = post(payload);
  try {
    const result = await postDoc.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

// Get All Posts
Router.get("/getAllPosts", async function(req, res) {
  try {
    const email = req.decoded.email;
    const result = await post.find();
    res.send({ result, email });
  } catch (ex) {
    res.send(ex.message);
  }
});

// Update Post
Router.get("/getAllPostsById/:id", async function(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await post.find( { _id: id });
    res.send({ result, id });
   
  } catch (ex) {
    res.send(ex.post);
  }
});


Router.get("/getPostUsingUser", async function(req, res) {
  try {
    const email = req.decoded.email;
    console.log(email);
    const result = await post.find({ assign_to: email });
    res.send({ result });
  } catch (ex) {
    res.send(ex.message);
  }
});


// get Post 
Router.get("/getPost/:id", async function(req, res) {
  try {
    const id = req.params.id;
    const result = await post.findOne({ _id: id });
    res.send({ result });
  } catch (ex) {
    res.send(ex.message);
  }
});

// Delete Post
Router.delete("/delete/:id", async function(req, res) {
  try {
    const id = req.params.id;
    const result = await post.remove({ _id: id });
    res.send(result);
  } catch (ex) {
    res.send(ex.post);
  }
});

module.exports = Router;
