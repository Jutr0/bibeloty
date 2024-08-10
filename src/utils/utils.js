export const replaceOrAdd = (collection, element, identifier = 'id') => {
    const index = collection.findIndex(item => item[identifier] === element[identifier]);

    const newCollection = [...collection]
    if (index !== -1) {
        newCollection[index] = element;
    } else {
        newCollection.push(element);
    }

    return newCollection;
};
