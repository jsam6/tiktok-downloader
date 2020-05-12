
exports.headers = {
    'Upgrade-Insecure-Requests': 1,
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site':'same-origin',
    'Sec-Fetch-Mode':'navigate',
    'Sec-Fetch-User':'?1',
    'Sec-Fetch-Dest':'document',
}

exports.verifyFp = 'verify_k9zkz9to_9NtSA7w8_gSAi_4XFq_8ql3_P79njhFZA8K6'
exports.signature = 'DVxmhAAgEBj9Zt3PlemVTg1cZ5AAFPr'

exports.baseUrl = 'https://www.tiktok.com'

exports.userDetailsUrl = `https://t.tiktok.com/api/user/detail/?uniqueId=aileenchristineee&language=en&verifyFp=verify_k9zkz9to_9NtSA7w8_gSAi_4XFq_8ql3_P79njhFZA8K6&_signature=DVxmhAAgEBj9Zt3Plek6Ow1cZ5AAFPr`

exports.userVideoListUrl = `https://t.tiktok.com/api/item_list/?count=%COUNT%&id=%USERID%&type=1&secUid=%SECUID%&maxCursor=0&minCursor=0&sourceType=8&appId=%APPID%&region=MY&language=en&verifyFp=%VERIFY%&_signature=%SIGNATURE%`