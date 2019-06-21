// 导入处理路径模块
const path=require('path');

// 导入处理html模板插件
const HTML_WEBPACK_PLUGIN=require('html-webpack-plugin')
// 导入分离css模板插件
const MINI_CSS_EXTRACT_PLUGIN=require('mini-css-extract-plugin')

module.exports={
    // 处理模式
    mode:'development',
    // 入口配置
    entry:{
        app:'./app/app.js'
    },
    // 输出配置
    output:{
        path:path.resolve(__dirname+'/pilice'),
        filename:"dev.js"
    },
    // loader配置
    module:{
        rules:[
            // url-loader
            {
                // 验证
                test:/\.(png|gif|jpg|jpeg)$/,
                use:[
                    {loader:'url-loader',options:{limit:5*1024}}
                ]
            },
            // 处理图片模板路径 
            {
                test:/\.html?$/,
                use:[
                    {loader:'html-withimg-loader'}
                ]
            },
            // css-loader
            {
                test:/\.css$/,
                use:[
                    // 未分离css
                    // {loader:'style-loader'},

                    // 分离css
                    {loader:MINI_CSS_EXTRACT_PLUGIN.loader},
                    {loader:'css-loader'}
                ]
            },
            // less-loader
            {
                test:/\.less$/,
                use:[
                    // 未分离
                    // {loader:'style-loader'},

                      // 分离css
                    {loader:MINI_CSS_EXTRACT_PLUGIN.loader},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]
            }
        ]
    },
    // 插件配置
    plugins:[
        // 处理html模板插件
        new HTML_WEBPACK_PLUGIN({
            // 模板路径
            template:'./app.html',
            // 将输出脚本添加到body结束标签之前
            inject:'body',
            // //修改 输出文件名称
            filename:'[name]_dev.html',
            // 压缩处理
            minify:{
                // 移除注释
                removeComments:true,
                // 移除属性的单双引号
                removeAttributeQuotes:true,
                // 合并空白字符
                collapseWhitespace:true
            }
        }),
        // 分离css
        new MINI_CSS_EXTRACT_PLUGIN({
            // 输出文件名字
            filename:'[name].css'
        })
    ]
}