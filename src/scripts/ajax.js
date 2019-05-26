


function ajax (options) {
	
	let defaults = {type:"get",jsonCallback:"callback"};
	Object.assign(defaults,options);
	
	
	if (defaults.type == "jsonp") {
		let _script = document.createElement("script");
		
		let funcname = "$jsonp_" + new Date().getTime() + Math.round(Math.random()*10000000);
		window[funcname] = function(data) {
			defaults.success(data);
			_script.remove();
			delete window[funcname];
		}
		
		if (defaults.url.includes("?")) {
			_script.src = defaults.url + "&" + defaults.jsonCallback + "=" + funcname;
		} else {
			_script.src = defaults.url + "?" + defaults.jsonCallback + "=" + funcname;
		}
		document.body.appendChild(_script);
		
	}else {
	
	let xhr = null;
	if (Window.VBArray) {
		xhr = new AxtiveXObject("Msxml2.XMLHTTP");
	} else {
		xhr = new XMLHttpRequest;
	}
	
	xhr.open(defaults.type,defaults.url);
	
	xhr.onload = function() {
		defaults.success ? defaults.success((defaults.datatype=="json")?JSON.parse(xhr.response):xhr.response) : "";
	};
	if(defaults.type == "get") {
		xhr.send();
	} 
	if(defaults.type == "post") {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(defaults.data);
	}
	
	}
}



//options = {
//	type:
//	datatype:"json"
//	success:
//}
