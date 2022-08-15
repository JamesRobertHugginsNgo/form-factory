const { renderElement, renderFunctionCall } = require('html-factory/dist/node/html-factory.debug.js');
const { factory } = require('../../dist/node/form-factory.debug.js');

const { element, functionCalls } = factory({
	title: 'Form Title',

	sections: [
		{
			title: 'Section Title',

			rows: [
				{
					fields: [
						{
							title: 'Field'
						}
					]
				}
			]
		}
	]
});
console.log(element);

const { element: scriptElement } = renderElement('script', null, functionCalls.map((functionCall) => renderFunctionCall(functionCall)));
console.log(scriptElement);
