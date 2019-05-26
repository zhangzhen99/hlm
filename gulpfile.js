const gulp = require("gulp");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const https = require("https");
const http = require("http");

gulp.task("compileJS", ()=>{
	gulp.src("src/scripts/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/scripts") )
	gulp.src("src/pages/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/pages") )
	gulp.src("src/static/**/*").pipe( gulp.dest("dist/static") );
})
gulp.task("compileCSS", ()=>{
	gulp.src("src/styles/**/*.scss")
		.pipe( sass() )
		.pipe( autoprefixer() )
		.pipe( csso() )
		.pipe( gulp.dest("dist/styles") )
})
gulp.task("compileHTML", ()=>{
	gulp.src("src/pages/**/*.html")
		.pipe( gulp.dest("dist/pages") )
})


gulp.task("server", function(){
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe( webserver({
			livereload : true,
			port : 9999
		}) )
	gulp.watch("src/pages/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/pages/**/*.html", ["compileHTML"])
	
	//接口代理服务器
	let app = express();
	app.get("/", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		res.end("welcom");
	})
	app.get("/home", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "www.smartisan.com",
			path: "/product/shop_categories",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	//http://www.okbuy.com/ajax/homepage/index?cid=3
	app.get("/product1", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain;charset=UTF-8")
		let proxy = http.request({
			hostname: "www.okbuy.com",
			path: "/ajax/homepage/index?cid=3",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//http://www.okbuy.com/ajax/product/getSearchKey
	app.get("/search", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain;charset=UTF-8")
		let proxy = http.request({
			hostname: "www.okbuy.com",
			path: "/ajax/product/getSearchKey",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//http://www.okbuy.com/login/headerInfo/0.6212612882405317
	app.get("/headerInfo", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain;charset=UTF-8")
		let proxy = http.request({
			hostname: "www.okbuy.com",
			path: "/login/headerInfo/0.6049766080525958",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//http://www.okbuy.com/ajax/homepage/index?cid=4
	app.get("/product2", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = http.request({
			hostname: "www.okbuy.com",
			path: "/ajax/homepage/index?cid=4",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	app.listen(9090);
})


gulp.task("build", ["compileJS","compileCSS","compileHTML"])