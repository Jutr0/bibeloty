export const defaultSelectFormatter = {
    toSelect: (option) => ({...option, label: option?.name, value: option?.id}),
    toFormik: (option) => ({...option, name: option?.label, id: option?.value})
}

export const flatSelectFormatter = {
    toSelect: (option) => ({label: option, value: option}),
    toFormik: (option) => option.value
}