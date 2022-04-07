const File = require('../models/filestore.js');

const uploadPage = (req, res) => {
  res.render('upload');
};

const uploadFile = (req, res) => {
  //make sure it exist
  if(!req.files, Object.keys(req.files).length === 0){
    return res.status(400).json({error: 'No files uploaded'});
  }
  
  const {sampleFile} = req.files;

  //console.dir(sampleFile);
  const imageModel = new File.FileModel(sampleFile);
  
  const savePromise = imageModel.save();

  savePromise.then(() => {
    res.status(201).json({message: 'Upload successful'});
  });

  savePromise.catch((error) => {
    console.dir(error);
    res.status(400).json({error: 'Something went wrong'});
  });

  return savePromise;
};//end upload file

const retrieveFile = (req, res) => {
    if(!req.query.fileName)
    {
      return res.status(400).json({error: 'Missing file name'});
    }

    File.FileModel.FindOne({name: req.query.fileName}, (err, doc) => {
      if(err){
        console.dir(error);
        return res.status(400).json({error: 'Error retrieving the file'});
      }

      if(!doc){
        return res.status(404).json({error: 'File not found'});
      }

      res.writeHead(200, {'Content-Type': doc.mimeType, 'Content-Length': doc.size});
      return res.end(doc.data);

    })

};//end retrieve file

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile
}