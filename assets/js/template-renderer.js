var tpl = {



	escapeHtml : function(unsafe) {
	    return unsafe
	         .replace(/&/g, "&amp;")
	         .replace(/</g, "&lt;")
	         .replace(/>/g, "&gt;")
	         .replace(/"/g, "&quot;")
	         .replace(/'/g, "&#039;")
	         .replace(/(?:\r\n|\r|\\n|\n)/g, '<br />');
	},



	render : function(id, values, tag) {

		var values = values || {};
		var element = tag || 'DIV';

		var template = document.getElementById(id).innerHTML;

		// add new item
		template = template.replace(/\{\{([a-zA-Z0-9'"?:. +_-]+)(?:\|([a-zA-Z]+))?\}\}/gi, function(match, name, translate) {
			// split by points
			var value = null;

			// check is value a string not a variable?
			if(name.indexOf('+') !== -1)
			{
				value = TPLRenderEval(name, values);
			}
			else if (name[0] === '\'')
			{
				value = eval(name);
			}
			
			else
			{
				var splitted = name.split('.');
				//console.log(splitted);
				
				var value = values;
				var count = 0;

				while(count < splitted.length)
				{
					if(typeof value[splitted[count]] != 'undefined')
					{
						value = value[splitted[count]];
					}
					else
					{
						value = "";
					}

					++count;
				}
			}

			var val = typeof value === 'undefined' || value === null ? '' : value;

			if(typeof val === 'string' )
			{
				return tpl.escapeHtml(val);	
			}
			else
			{
				return val;
			}
			
			
		});

		// create template as dom
		var tmpDom = document.createElement(element);
		tmpDom.innerHTML = template;
		template = tmpDom.children[0];

		// FIXME: ie10 and ie11 problem with placeholder an inner html
		// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/101525/
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		if(isIE)
		{
			textareas = template.getElementsByTagName('textarea');

			for (var i = 0; i < textareas.length; i++)
			{
				console.log('testing');
				var textarea = textareas[i];
				console.log(textarea.innerHTML);
				if(textarea.hasAttribute('placeholder') && textarea.getAttribute('placeholder') == textarea.innerHTML)
				{
					textarea.innerHTML = '';
				}
			}
		}

		return template;

	}
};

function TPLRenderEval(evalStr, values)
{
	for(var key in values)
	{
		this[key] = values[key];
	}

	return eval(evalStr);
}
