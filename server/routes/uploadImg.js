
var express = require('express');
var router = express();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "10403470";
var API_KEY = "cf0iE3yKa2u4CFMpDzKwrfAC";
var SECRET_KEY = "3EQwCWo6Itm0QUCzx6KOoemFxnO4V13k";
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

/*调用百度的图像识别库*/
function getResult(res,imgName){
    //同步读取文件，返回结果到image上
    var image = fs.readFileSync(imgName);
    
    /*
     console.log(image);
     buffer 对象 
    <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 02 59
     00 00 04 2e 08 03 00 00 00 d8 d1 d8 36 00 00 00 01 73 52 47 42 00 
     ae ce 1c e9 00 00 02 34 ... >
     */
    //把文件转码成base64格式
    var base64Img = new Buffer(image).toString('base64');
    client.generalBasic(base64Img).then(function(result) {
        // console.log(JSON.stringify(result));
        res.json(result);
    });
}

router.
    post('/',function(req,res){
        // console.log(path.join(__dirname, '../../public'));
        let form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        form.maxFieldsSize = 2*1024*1024;
        
        form.uploadDir = path.join(__dirname, '../../public/test')
        form.parse(req,function(err,fileds,files){ 
            // 解析 formData数据
            if(err){ return console.log(err) }

            let imgPath = files.image.path // 获取文件路径
            // console.log(files);
            let imgName = path.join(__dirname, '../../public/test') + "\\test."+ files.image.type.split("/")[1] // 修改之后的名字
            // console.log(imgName)
            //同步读取文件
            let data = fs.readFileSync(imgPath) 

            //然后data里面的内容存储到imgName这个文件中
            //异步写入，写完后触发回调
            fs.writeFile(imgName,data,function(err){ 
                // 存储文件
                if(err){ return console.log(err) }

                // 删除文件
                fs.unlink(imgPath,function(){}) 
                //上传图片成功返回code:1
                //res.json({code:1})
                getResult(res,imgName);
            })
        });
    })

module.exports = router;

/*

{ 
    image:
       File {
         domain: null,
         _events: {},
         _eventsCount: 0,
         _maxListeners: undefined,
         size: 21930,
         path: 'G:\\Work\\Node.js\\deef\\node\\frontend\\public\\upload_c4e840a9a39979608382deb81e4e27ff.jpeg',
         name: 'test.jpeg',
         type: 'image/jpeg',
         hash: null,
         lastModifiedDate: 2018-03-16T03:22:56.380Z,
         _writeStream:
          WriteStream {
            _writableState: [Object],
            writable: false,
            domain: null,
            _events: {},
            _eventsCount: 0,
            _maxListeners: undefined,
            path: 'G:\\Work\\Node.js\\deef\\node\\frontend\\public\\upload_c4e840a9a39979608382deb81e4e27ff.jpeg',
            fd: null,
            flags: 'w',
            mode: 438,
            start: undefined,
            autoClose: true,
            pos: undefined,
            bytesWritten: 21930,
            closed: true 
        } 
    } 
}
 */