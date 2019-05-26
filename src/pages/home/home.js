require(["../../static/conf/config.js"], function(){
	require(["jquery","sw","com"], function($, Swiper,template){
		
		

			//头部公告信息
			// let noticeList_list = document.getElementsByClassName("noticeList_list")[0];
			// let xhr = new XMLHttpRequest();
			// 	xhr.open("get", "http://localhost:8001/headerInfo");
			// 	xhr.onload = function(){
			// 		noticeList_list.innerHTML = (JSON.parse(xhr.response).notice.notice_list)
			// 	}
			// 	xhr.send(); 
			
			
			$(".noticeList_list").innerHTML = $.ajax({
			    type: "GET",
			    url: "http://localhost:9090/headerInfo",
			    dataType: "json",
			    async: false
			}).responseJSON;
		

			
				
			//头部搜索框信息

			// let list;
			// let searchInput = document.getElementsByClassName("searching")[0];
			// searchInput.addEventListener("click",function(){
			// 	this.value = "";
			// })

			// let ac_results = document.getElementsByClassName("ac_results")[0];
			// list = document.createElement("ul");
			// let newArr = [];
			// let xhr = new XMLHttpRequest();
			// xhr.open("get", "http://localhost:9090/search");
			// xhr.onload = function(){

			let list;
			let searchInput = document.getElementsByClassName("searching")[0];
			searchInput.addEventListener("click",function(){
				this.value = "";
			})

			let ac_results = document.getElementsByClassName("ac_results")[0];
			list = document.createElement("ul");
			let newArr = [];
			let xhr = new XMLHttpRequest();
			xhr.open("get", "http://localhost:9090/search");
			xhr.onload = function(){
				//console.log(JSON.parse(xhr.response).searchkey)
				let arrs = JSON.parse(xhr.response).searchkey;
				let count = 0;
				searchInput.addEventListener("input",debounce(function () {
					for(let i = 0; i<arrs.length; i++){
						if(searchInput.value == null) {
							newArr = [];
						}else{
							let reg_str = '/^'+searchInput.value+'/i';
							let num1 = arrs[i][1].search(eval(reg_str));
							let num2 = arrs[i][2].search(eval(reg_str));
							if((num1!=-1 || num2!=-1)&&count<10){
								count++;
								newArr.push(arrs[i][1]);
								test(newArr);
								ac_results.appendChild(list);
								ac_results.style.display = "block";

						} 
						}
					}
				}),200);
			}

			function test(data) {
				list.innerHTML = "";
				data.forEach(function(word) {
					let li = document.createElement("li");
					let a = document.createElement("a");
					a.innerText = word;
					li.appendChild(a);
					list.appendChild(li);
				})
			}

			//轮播图
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: true,//可选选项，自动滑动
				loop : true,
				effect : 'fade',
				fade: {
				crossFade: true,
				},
				pagination : {
					el : ".swiper-pagination",
					clickable :true,
				},
				paginationClickable :true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
			$(".swiper-container").mouseenter(function(){
				mySwiper.autoplay.stop();
			});
			$(".swiper-container").mouseleave(function(){
				mySwiper.autoplay.start();
			})

			

			//返回顶部
			$(".top").click(function(){//点击事件（top元素）
				$("html").animate({scrollTop: 0}, 100);//返回顶部
			})

			$(window).scroll(function(){//滚动事件
				let _scrollTop = $(window).scrollTop();
				if(_scrollTop > 10) {
					$(".gotoTop").addClass("show").removeClass("close");
				} else {
					$(".gotoTop").addClass("close").removeClass("show");
				}	
			})

			//导航栏头部事件
			$("body").delegate(".wrap .hassub", "mouseenter", function() {

				var e = $(this).find("a").attr("class").substr(6, 1);
				//console.log(e);
				var f = $(this).parents().siblings(".wrapsub" + e);
				//console.log(f);
				f.addClass("show").removeClass("close").siblings(".wrapsub").removeClass("show")
			}).delegate(".wrap .hassub", "mouseleave", function() {
				
				var e = $(this).find("a").attr("class").substr(6, 1);
				var f = $(this).parents().siblings(".wrapsub" + e);
				f.removeClass("show").addClass("close");
			});

			$("body").delegate(".wrapsub", "mouseenter", function() {
				$(this).addClass("show").removeClass("close");
			}).delegate(".wrapsub", "mouseleave", function() {
				$(this).addClass("close").removeClass("show");
			});

			//验证是否已登陆
			let obj =localStorage.getItem("logined");
			if(obj) {
				$(".tinfo_unlogin").children(".myhome").text(obj);
				$(".tinfo_unlogin").removeClass("tinfo_unlogin").siblings("span").addClass("tinfo_unlogin");
			}
			//点击退出按钮
			$(".exit").click(function() {
				localStorage.removeItem("logined");
			})


			

			//防抖
			function debounce (fun, delay) {
					let t = null;
					return function () {
						clearTimeout(t);
						t = setTimeout(function() {
							fun(arguments);
						},delay)
					}
			}	

			
	})
})
