const { renderElement } = require('html-factory/dist/node/html-factory.js');


let idCounter = 0;
function getNextId() {
	return `form-factory-${idCounter++}`;
}

function getFieldConfiguration(definition, inputConfiguration) {
	const {
		id,
		preHelpText,
		postHelpText,
		required,
		title
	} = definition;

	return [
		{
			name: 'label',
			attributes: {
				class: 'form-label',
				for: id,
				id: `${id}-title`
			},
			children: [
				title,
				required ? null : [
					' ',
					{
						name: 'span',
						attributes: {
							class: 'form-text'
						},
						children: ['(Optional)']
					}
				]
			]
		},

		!preHelpText ? null : {
			name: 'div',
			attributes: {
				class: 'form-text mb-1 mt-0',
				id: `${id}-prehelptext`
			},
			children: [preHelpText]
		},

		inputConfiguration,

		!postHelpText ? null : {
			name: 'div',
			attributes: {
				class: 'form-text',
				id: `${id}-posthelptext`
			},
			children: [postHelpText]
		}
	];
}

const Factories = {
	form: {
		render: (definition, renderEl = renderElement) => {
			const {
				className,
				id,
				sections = [],
				title
			} = Object.assign(definition, {
				id: definition.id || getNextId()
			});

			return renderEl({
				name: 'form',
				attributes: {
					class: className,
					id
				},
				children: [
					!title ? null : {
						name: 'h1',
						attributes: {
							id: `${id}-title`
						},
						children: [title]
					},

					sections.map((section) => {
						const { type = 'section' } = section;
						return Factories[type].render(section, renderEl);
					}),

					{
						name: 'div',
						children: [
							{
								name: 'button',
								attributes: {
									class: 'btn btn-primary',
									type: 'button'
								},
								children: ['Submit']
							}
						]
					}
				],
				functionCallers: [
					{
						name: 'Factories.form.initialize',
						args: [definition]
					}
				]
			});
		},

		initialize: (definition) => {
			console.log('FORM', definition);
		}
	},

	section: {
		render: (definition, renderEl = renderElement) => {
			const {
				id,
				fields,
				title
			} = Object.assign(definition, {
				id: definition.id || getNextId(),
				fields: definition.fields || []
			});

			return renderEl({
				name: 'div',
				attributes: {
					class: 'card mb-3',
					id
				},
				children: [
					!title ? null : {
						name: 'h2',
						attributes: {
							class: 'card-header h5',
							id: `${id}-title`
						},
						children: [title]
					},
					{
						name: 'div',
						attributes: {
							class: 'card-body'
						},
						children: fields.map((field) => {
							const { type } = Object.assign(field, { type: field.type || 'text' });
							return Factories[type].render(field, renderEl);
						})
					}
				]
			});
		}
	},

	text: {
		render: (definition, renderEl = renderElement) => {
			const {
				choices,
				disabled,
				id,
				placeHolder,
				preHelpText,
				postHelpText,
				readOnly,
				required
			} = Object.assign(definition, {
				id: definition.id || getNextId(),
				title: definition.title || 'Unlabled'
			});

			return renderEl({
				name: 'div',
				attributes: {
					class: 'row'
				},
				children: [
					{
						name: 'div',
						attributes: {
							class: 'col mb-3'
						},
						children: getFieldConfiguration(definition, [
							{
								name: 'input',
								attributes: {
									class: 'form-control',
									disabled: !disabled ? null : '',
									id,
									list: !choices ? null : `${id}-list`,
									name: id,
									placeholder: placeHolder,
									readonly: !readOnly ? null : '',
									required: !required ? null : '',
									type: 'text',
									'aria-describedby': [preHelpText, postHelpText].every((value) => value == null) ? null : [
										!preHelpText ? null : `${id}-prehelptext`,
										!postHelpText ? null : `${id}-posthelptext`
									].filter((value) => value != null).join(' ')
								}
							},

							!choices ? null : {
								name: 'datalist',
								attributes: {
									id: `${id}-list`
								},
								children: choices.map((choice) => ({
									name: 'option',
									attributes: {
										value: choice
									}
								}))
							}
						])
					}
				]
			});
		}
	},

	temp: {
		render: (definition, renderEl = renderElement) => {
			return renderEl({
				name: 'div',
				children: []
			});
		}
	}
};

function render(definition, renderEl = renderElement) {
	const { type = 'form' } = definition;
	return Factories[type].render(definition, renderEl);
}

module.exports = {
	Factories,
	render
};
