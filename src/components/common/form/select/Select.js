import ReactSelect from 'react-select'
import withForm from "../withForm";
import classnames from "classnames";
import {defaultSelectFormatter} from "../../../../utils/formUtils";
import './Select.scss'
import {useEffect, useState} from "react";
import _ from 'lodash';
import CreatableSelect from "react-select/creatable";

const Select = ({
                    id,
                    name,
                    onChange,
                    className,
                    value,
                    search,
                    options: initialOptions = [],
                    formatter = defaultSelectFormatter,
                    onCreate,
                    isMulti
                }) => {

    const [formattedOptions, setFormattedOptions] = useState(initialOptions.map(formatter.toSelect));
    const [formattedValue, setFormattedValue] = useState(value);

    useEffect(() => {
        if (value) {
            if (isMulti) {
                setFormattedValue(value.filter(v => !v._destroy).map(formatter.toSelect));
            } else {
                setFormattedValue(formatter.toSelect(value))
            }
        }
    }, [value, isMulti]);

    const formattedOnChange = newValue => {
        if (isMulti) {
            const mappedValue = value.filter(v => v.id || newValue.some(nV => nV.value === v.value)).map(v => ({
                ...v,
                _destroy: !newValue.some(nV => nV.id === v.id)
            }))
            onChange(mappedValue)
        } else {
            onChange(formatter.toFormik(newValue))
        }
    }

    const handleSearch = (query) => {
        search(query, options => setFormattedOptions(options.map(formatter.toSelect)))
    }

    const debouncedSearch = _.debounce(handleSearch, 500);

    const onMenuOpen = () => {
        search && handleSearch();
    }

    const handleInputChange = (value) => {
        search && debouncedSearch(value)
    }
    const onCreateOption = (option) => {
        if (isMulti) {
            onCreate(option, createdOption => {
                onChange([...value, createdOption])
            })
        } else {
            onCreate(option, onChange)
        }
    }
    const selectProps = {
        id,
        name,
        className: classnames('select', className),
        classNamePrefix: "select",
        value: formattedValue,
        onMenuOpen,
        onInputChange: handleInputChange,
        options: formattedOptions,
        onChange: formattedOnChange,
        onCreateOption,
        isMulti
    };


    return onCreate ? <CreatableSelect {...selectProps}/> :
        <ReactSelect {...selectProps} />

}

export default withForm(Select);