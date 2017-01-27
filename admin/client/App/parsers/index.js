import { filtersParser, filterParser, createFilterObject } from './filters.js';

function columnsParser (columns, currentList) {
	if (!currentList) {
		console.warn('No currentList is selected');
		return;
	}
	if (!columns || columns.length === 0) {
		return currentList.expandColumns(currentList.defaultColumns);
	}
	return currentList.expandColumns(columns);
};

function sortParser (path, currentList) {
	if (!currentList) {
		console.warn('No currentList is selected');
		return;
	}
	if (!path) return currentList.expandSort(currentList.defaultSort);
	return currentList.expandSort(path);
}

export {
	createFilterObject,
	filtersParser,
	filterParser,
	sortParser,
	columnsParser,
};
