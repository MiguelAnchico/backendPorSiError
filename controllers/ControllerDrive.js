const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CLIENT_ID = '378324807454-bhpj7a113m65pb5vr3bheh15ki25p24i.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//0431MY6PY1BqHCgYIARAAGAQSNwF-L9Ir0X42IyZR2__awJdCJ2LimHxlwTONXpUJSF5_N6IRzwGJewvb4_6wb-bfD3FUl1W0uzc';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

function crearArchivo(req, res, next){
    let array = req.files.file.name.split(".");
    let type = array[1];
    if(type == "pdf" || type == "doc" || type == "java" ||
        type == "cpp" || type == "py" || type == "pptx" || type == "ppt"){
    let file = req.files.file;
    file.mv('./archivos/' + file.name, function(err){
        if(err){
            return res.send(err);
        } else {
            return next();
        }
    })} else {
        return res.send("Formato no aceptado")
    }
}

function create(req, res) {
    const filePath = path.join(process.cwd(), './archivos/'+req.files.file.name);
    console.log(filePath);

    let file = req.files.file;
    let array = file.name.split(".");
        let type = array[1];
        if(type == "pdf"){
            type = 'application/pdf';
        } else if(type == "doc"){
            type = 'application/msword';
        } else if(type == "java"){
            type = 'text/x-java';
        } else if(type == "cpp"){
            type = 'text/x-c++src';
        } else if(type == "py"){
            type = 'text/x-python';
        } else if(type == "pptx") {
            type = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        } else if(type == "ppt"){
            type = 'application/vnd.ms-powerpoint';
        }

        var fileMetadata = {
            'name': file.name
        };
        var media = {
            mimeType: type,
            body: fs.createReadStream(filePath)
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, file) {
            if (err) {
              // Handle error
                return res.send(err);
            } else {
                fs.unlinkSync(filePath);
                // Hacer algo en la base de datos
                return res.send(file.data);
            }
        });
}

function show(req, response) {
    drive.permissions.create({
        fileId: req.params.id,
        requestBody: {
            role: 'reader',
            type: 'anyone'
        }}, function (err, res) {
            if(err){
                return response.send(err);
            }
    })

    drive.files.get({
        fileId: req.params.id,
        fields: 'webViewLink, webContentLink'
    }, function(err, res) {
        if(err){
            return response.send(err);
        } else {
            // Hacer algo en la base de datos
            return response.send(res.data);
        }
    })
}

function update(req, res) {

}

function deleted(req, res) {
    drive.files.delete({
        fileId: req.body.id,
    }, function (err, res) {
        if(err){
            return res.send(err);
        } else {
            // Hacer algo en la base de datos
            return res.send(res.data);
        }
    })
}

function find(req, res, next) {

}

module.exports = {
    crearArchivo,
    create,
    find,
    show,
    deleted,
    update,
}
