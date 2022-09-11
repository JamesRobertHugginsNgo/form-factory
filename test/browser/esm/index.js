import { createElement, callFunctionCaller } from '../../../dist/browser/esm/html-factory.debug.js';
import { Factories, render } from '../../../dist/browser/esm/form-factory.debug.js';

window.Factories = Factories;

const definition = {
	title: 'Form Title',

	sections: [
		{
			title: 'Text',

			fields: [
				{
					title: 'Optional',
					className: 'col-sm-4'
				},
				{
					title: 'Required',
					className: 'col-sm-4',
					required: true
				},
				{
					title: 'Disabled',
					className: 'col-sm-4',
					disabled: true
				},
				{
					title: 'Readonly',
					className: 'col-sm-4',
					readOnly: true
				},
				{
					title: 'With Placeholder',
					className: 'col-sm-4',
					placeHolder: 'Lorem ipsum dolor sit amet'
				},
				{
					title: 'With Pre Help Text',
					className: 'col-sm-4',
					preHelpText: 'Fusce fermentum eros vel nibh facilisis, et imperdiet tellus tempor.'
				},
				{
					title: 'With Post Help Text',
					className: 'col-sm-4',
					postHelpText: 'Maecenas lorem nisi, mattis eget sem ac, faucibus convallis ipsum.'
				},
				{
					title: 'With Choices',
					className: 'col-sm-4',
					choices: ['Apple', 'Banana', 'Coconut', 'Durian', 'Egg Plant']
				}
			]
		}
	]
};
console.log(definition);

const { element, functionCallers } = createElement({
	name: 'div',
	attributes: { class: 'container' },
	children: [
		render(definition, createElement)
	]
});
document.body.append(element);

const { element: scriptElement } = createElement({
	name: 'script',
	children: functionCallers.map((functionCaller) => callFunctionCaller(functionCaller))
});
console.log(scriptElement);
