const KeywordFilter = require('keyword-filter')
const filter = new KeywordFilter()

var keyArrays = [];

function setKeyWords(keywords) {
    keyArrays = keywords;
    console.log('========set keywords=====', keywords)
}

function replaceKeywords(content, tag){
    if (content===undefined || content ===''){
        return ''
    }
    filter.init(keyArrays)
    if (tag !==undefined && tag !=='') {
        return filter.replaceKeywords(content, tag)
    } else {
        return filter.replaceKeywords(content, '*');
    }
}

function replace(content) {

}

exports.setKeyWords = setKeyWords;
exports.replaceKeywords = replaceKeywords;