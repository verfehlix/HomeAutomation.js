(function(){function layout(it
/**/) {
var out='<html lang="en"><head><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+(it.title)+'</title> <link href="/build/all.css" rel="stylesheet"/></head><body> <nav class="fixed-top"> <div class="nav-container"> <ul class="nav-menu slideDown"> <li> <a class="navbar-brand" href="/"><span class="bigheading">H</span><span class="smallheading">ome Center</span></a> </li> <li class="nav-dropdown">  <a href="#">Plugins <span class="s-button s-collapse-trigger" href="#">+</span></a> <ul> ';var arr1=it.plugins;if(arr1){var plugin,index=-1,l1=arr1.length-1;while(index<l1){plugin=arr1[index+=1];out+=' <li><a href="/'+(plugin.plugin_name)+'">'+(plugin.plugin_name)+'</a></li> ';} } out+='  </ul>  </li> <li><a href="/settings">Configure</a></li>  </ul>   <a class="s-button s-collapse-trigger" href="#">+</a> </div>  </nav> <script src="/build/all.js"></script> <!-- <script src="/ionic/js/ionic.bundle.min.js"></script> -->'+(it.body)+' </body></html>';return out;
}var itself=layout, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {_page.render=_page.render||{};_page.render['layout']=itself;}}());