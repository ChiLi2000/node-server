import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from 'path'
import * as url from "url";

const server = http.createServer();
const requestUrl = p.resolve(__dirname, 'public')
// 设置缓存时间
const cacheAge = 3600 * 24 * 365

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {url: path, method, headers} = request
    // 过滤请求方式 静态服务器只接受get
    if (method !== 'GET') {
        response.statusCode = 405
        response.end('这是假响应')
        return
    }
    console.log('url', url)
    const {pathname, search} = url.parse(path)
    // 匹配任意文件
    let filename = pathname.substr(1)
    // 默认首页
    if (filename === '') {
        filename = 'index.html'
    }
    fs.readFile(p.resolve(requestUrl, filename), (err, data) => {
        if (err) {
            if (err.errno === -2) {
                response.statusCode = 404
                fs.readFile(p.resolve(requestUrl, '404.html'), (err, data) => {
                    response.end(data)
                })
                response.end('该文件不存在')
            } else {
                response.statusCode = 500
                response.end('服务器繁忙')
            }

        } else {
            // 添加缓存
            response.setHeader('Cache-Control', `public,max-age=${cacheAge}`)
            // 返回文件内容
            response.end(data)
        }
    })
})

server.listen(8888, () => {
    console.log(server.address())
})