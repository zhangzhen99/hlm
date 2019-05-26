function template(id, data) {
	let template = document.getElementById(id).innerHTML;
	
	template = 'print(`' + template + '`)';
	template = template.replace(/<%=(.+?)%>/g,'`) \n print($1) \n print(`');
	template = template.replace(/<%(.+?)%>/g,'`) \n $1 \n print(`');
	//console.log(template);

	let fun = eval(`
		(function (data) {
			let str = "";
			function print(val) {
				str = str + val;
			}
			
			${template};
			
			return str;
		})
	`)
	
	return fun(data);
}
