## 搭建静态服务器
### 前期准备
 安装 ts-node-dev 使用TypeScript开发Node.js程序
```bazaar
yarn global add ts-node-dev
```
或者
```bazaar
npm i -g ts-node-dev
```

### 启动
```bazaar
 tsnd  index.ts
```
使用curl发起请求
```bazaar
curl -v http://localhost:8888
```
### 功能点：
- 匹配任意文件
- 404页面处理
- 过滤请求方式
- 设置缓存