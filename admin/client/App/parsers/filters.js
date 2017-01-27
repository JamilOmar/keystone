import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

export function filtersParser (filters, currentList) {
	if (!filters) return [];

	if (typeof filters === 'string') {
		try {
			filters = JSON.parse(filters);
		} catch (e) {
			console.log('Invalid filters provided', filters);
			return;
		}
	}

	const assembledFilters = filters.map(filter => {
		const path = filter.path;
		const value = Object.assign({}, filter);
		delete value.path;
		return createFilterObject(path, value, currentList.fields);
	});

	filters = assembledFilters.filter(filter => filter);

	return filters;
}

export function filterParser ({ path, value }, activeFilters, currentList) {
	if (!activeFilters || !isArray(activeFilters)) {
		console.warn('activeFilters must be an array');
		return;
	}
	if (!currentList || !isObject(currentList) || isArray(currentList)) {
		console.warn('currentList must be a plain object', currentList);
		return;
	}
	let filter = activeFilters.filter(i => i.field.path === path)[0];
	if (filter) {
		filter.value = value;
	} else {
		filter = createFilterObject(path, value, currentList.fields);
		if (!filter) {
			return;
		}
	}
	return filter;
}

/*
* This method is a util, but has such a specific use that it is being left within
* the file that uses it.
*/

export function createFilterObject (path, value, currentListFields) {
	if (!currentListFields || !isPlainObject(currentListFields)) {
		console.warn('currentListFields must be a plain object', currentListFields);
		return;
	}

	const field = currentListFields[path];

	if (!field) {
		console.warn('Invalid Filter path specified:', path);
		return;
	}

	return {
		field,
		value,
	};
}
