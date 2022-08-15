/* global executeFunctionalities createElement createStyleString formFactory */

function consoleLog(message) { // eslint-disable-line no-unused-vars
	console.log(message);
}

const { element, functionalities } = createElement('div', { class: 'container mt-3' }, [
	createElement('p', null, [
		'Hello ',
		createElement('strong', { style: createStyleString({ color: 'green' }) }, 'World', [{ function: 'consoleLog', arguments: ['Before Hello World'] }])
	], [{ function: 'consoleLog', arguments: ['Hello World'] }]),

	createElement('p', null, [
		'Hello ',
		createElement('strong', { style: createStyleString({ color: 'cyan' }) }, 'Universe', [[null, 'consoleLog', 'Hello Universe 1']]),
		createElement('div', null, [
			'Hello ',
			createElement('strong', { style: createStyleString({ color: 'magenta' }) }, 'Universe', [[null, 'consoleLog', 'Hello Universe 2']])
		], [[null, 'consoleLog', 'After Hello Universe 2']]),
		'Hello ',
		createElement('strong', { style: createStyleString({ color: 'yellow' }) }, 'Universe', [[null, 'consoleLog', 'Hello Universe 3']])
	], [[null, 'consoleLog', 'After All Hello Universe']]),

	formFactory({
		title: 'Form Title',

		sections: [
			{
				title: 'Section 1',

				rows: [
					{
						fields: [
							{
								className: 'col-sm-6 col-md-4',
								id: 'textfield',
								placeHolder: 'Place holder',                                          
								postHelpText: 'Post help text',
								preHelpText: 'Pre help text',
								readOnly: true,
								required: true,
								title: 'Text Field'
							},
							{
								className: 'col-sm-6 col-md-4'
							},
							{
								className: 'col-sm-6 col-md-4'
							}
						]
					},
					{
						fields: [
							{}
						]
					},
					{
						fields: [
							{}
						]
					}
				]
			},
			{
				title: 'Section 2'
			}
		]
	})
]);

document.body.append(element);

executeFunctionalities(functionalities);
