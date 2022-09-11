const util = require('util');

const { renderElement, renderFunctionCaller } = require('html-factory/dist/node/html-factory.debug.js');
const { render } = require('../../dist/node/form-factory.debug.js');

const definition = {
	title: 'Form Title',

	sections: [
		{
			title: 'Text Field',

			rows: [
				{
					fields: [
						{
							type: 'text',
							title: 'Label'
						}
					]
				},
				{
					fields: [
						{
							type: 'text',
							title: 'Optional',
							className: 'col-sm-4'
						},
						{
							type: 'text',
							title: 'Mandatory',
							className: 'col-sm-4',
							required: true
						}
					]
				},
				{
					fields: [
						{
							type: 'text',
							title: 'Disabled',
							className: 'col-sm-4',
							disabled: true
						},
						{
							type: 'text',
							title: 'Readonly',
							className: 'col-sm-4',
							readOnly: true
						}
					]
				},
				{
					fields: [
						{
							type: 'text',
							title: 'With Placeholder',
							className: 'col-sm-4',
							placeHolder: 'Lorem ipsum dolor sit amet'
						},
						{
							type: 'text',
							title: 'With Pre Help Text',
							className: 'col-sm-4',
							preHelpText: 'Fusce fermentum eros vel nibh facilisis, et imperdiet tellus tempor.'
						},
						{
							type: 'text',
							title: 'With Post Help Text',
							className: 'col-sm-4',
							postHelpText: 'Maecenas lorem nisi, mattis eget sem ac, faucibus convallis ipsum.'
						}
					]
				}
			]
		}
	]
};
console.log(util.inspect(definition, false, null, true));

const { element, functionCallers } = render(definition, renderElement);
console.log(element);

const { element: scriptElement } = renderElement({
	name: 'script',
	children: functionCallers.map((functionCaller) => renderFunctionCaller(functionCaller))
});
console.log(scriptElement);
