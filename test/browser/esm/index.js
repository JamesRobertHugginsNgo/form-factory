import { makeElement, makeFunctionCall } from '../../../dist/browser/esm/html-factory.debug.js';
import { factory } from '../../../dist/browser/esm/form-factory.debug.js';

const { element, functionCalls } = makeElement('div', { class: 'container mt-3' }, [
	factory({
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
	}, makeElement)
]);

document.body.append(element);
for (const functionCall of functionCalls) {
	makeFunctionCall(functionCall);
}
