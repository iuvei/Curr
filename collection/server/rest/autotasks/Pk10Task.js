//获取PK10 数据
const request = require('request')
const crawler = require('../controllers/backend/lotterys')
const CrawlerModel = require('../models/quiz/lottery.model.js')

//http://www.apk10.com/api/newest?code=pk10
//https://www.apk10.com/api/newest?code=pk10&t=1502208001236
const PK10_URL = "https://www.apk10.com/api/newest?code=pk10&t=1502208001236"
const PK10_INTERVAL = 60*1000

function  pk10Task() {
    console.log("args: ", issueNo)
    request.get(PK10_URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            const parsedData = JSON.parse(body)
            const record = parsedData.data;
            console.log('===', parsedData.data.newest.array)
            const data = {
                no:record.current,
                name:"北京赛车",
                code: record.newest.code,
                createdAt: record.newest.time
            }
            issueNo=record.current

            //CrawlerModel.create({no:data.no, name:data.name, code:data.code, createdAt:data.createdAt}, )

            CrawlerModel.update({no:data.no}, data,  {upsert: true} ,function (err, ret) {
                if (err) {
                    console.log(err)
                }
                if (!ret) {
                   console.log('==', ret)
                }
            });

           //  crawler.create(data).then((result)=>{
           //     console.log("结果: ",result)
           // }).catch((err)=>{
           //      console.log(err)
           //  })
        }else {
            console.log(error, response.statusCode)
        }
    })
}

var issueNo = 0

setInterval(pk10Task, 10*1000, issueNo);
