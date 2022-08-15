import { renderElement } from './html-factory.debug.js';

let idCounter = 0;

function filteredJoin(...items) {
	return items.filter((item) => item != null).join(' ');
}

// -----------------------------------------------------------------------------

function makeField(definition, createInput, render = renderElement) {
	const {
		className,
		id = `form-factory-${idCounter++}`,
		postHelpText,
		preHelpText,
		required,
		title = 'Untitled'
	} = definition;

	const preHelpTextId = !preHelpText ? null : `${id}-pre-help-text`;
	const postHelpTextId = !postHelpText ? null : `${id}-post-help-text`;
	const ariaDescribedBy = !preHelpTextId && !postHelpTextId ? null : filteredJoin(preHelpTextId, postHelpTextId);

	console.log('REQUIRED', required);

	return render('div', { class: filteredJoin('col-12 mb-3', className), id: `${id}-element` }, [
		render('label', { for: id, class: 'form-label', id: `${id}-label` }, [
			title,
			required ? null : [
				' ',
				render('span', { class: 'form-text' }, '(Optional)')
			]
		]),

		!preHelpText ? null : render('div', { class: 'form-text mb-1 mt-0', id: preHelpTextId }, preHelpText),

		createInput({ ariaDescribedBy, id, title, ...definition }, render),

		!postHelpText ? null : render('div', { class: 'form-text', id: postHelpTextId }, postHelpText)
	]);
}

// -----------------------------------------------------------------------------

function makeTextareaField(definition, render = renderElement) {
	return makeField(definition, (definitionArg, renderArg) => {
		const {
			ariaDescribedBy,
			disabled,
			id,
			placeHolder,
			readOnly,
			required,
			rows
		} = definitionArg;

		return renderArg('textarea', {
			disabled: !disabled ? null : '',
			placeholder: placeHolder,
			readonly: !readOnly ? null : '',
			required: !required ? null : '',
			rows,
			class: 'form-control',
			id,
			'aria-describedby': ariaDescribedBy
		});
	}, render);
}

// -----------------------------------------------------------------------------

function makeTextField(definition, render = renderElement) {
	return makeField(definition, (definitionArg, renderArg) => {
		const {
			ariaDescribedBy,
			disabled,
			id,
			placeHolder,
			readOnly,
			required
		} = definitionArg;

		return renderArg('input', {
			disabled: !disabled ? null : '',
			placeholder: placeHolder,
			readonly: !readOnly ? null : '',
			required: !required ? null : '',
			type: 'text',
			class: 'form-control',
			id,
			'aria-describedby': ariaDescribedBy
		});
	}, render);
}

// -----------------------------------------------------------------------------

function makeRow(definition, render = renderElement) {
	const {
		className,
		factories,
		fields = [],
		id
	} = definition;

	const finalFactories = Object.assign({}, defaultFactories, factories);

	return render('div', { class: filteredJoin('row', className), id }, fields.map((field) => {
		const { type = 'text' } = field;
		return finalFactories[type]({ factories, ...field }, render);
	}));
}

// -----------------------------------------------------------------------------

function makeSection(definition, render = renderElement) {
	const {
		className,
		factories,
		id = `form-factory-${idCounter++}`,
		rows = [],
		title
	} = definition;

	const finalFactories = Object.assign({}, defaultFactories, factories);

	return render('div', { class: filteredJoin('card mb-3', className), id }, [
		!title ? null : render('h2', { class: 'card-header h5', id: `${id}-heading` }, title),

		render('div', { class: 'card-body' }, rows.map((row) => {
			const { type = 'row' } = row;
			return finalFactories[type]({ factories, ...row }, render);
		}))
	]);
}

// -----------------------------------------------------------------------------

function makeForm(definition, render = renderElement) {
	const {
		className,
		factories,
		id = `form-factory-${idCounter++}`,
		title,
		sections = []
	} = definition;

	const finalFactories = Object.assign({}, defaultFactories, factories);

	return render('form', { class: filteredJoin('mb-3', className), id }, [
		!title ? null : render('h1', { id: `${id}-heading` }, title),

		sections.map((section) => {
			const { type = 'section' } = section;
			return finalFactories[type]({ factories, ...section }, render);
		})
	]);
}

// -----------------------------------------------------------------------------

function factory(definition, render = renderElement) {
	const {
		factories,
		type = 'form'
	} = definition;

	const finalFactories = Object.assign({}, defaultFactories, factories);

	return finalFactories[type]({ factories, ...definition }, render);
}

// -----------------------------------------------------------------------------

const defaultFactories = {
	form: makeForm,
	row: makeRow,
	section: makeSection,
	text: makeTextField,
	textarea: makeTextareaField
};

export {
	factory
};
