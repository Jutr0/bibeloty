import ReactSelect from 'react-select'
import withForm from "./withForm";
import classnames from "classnames";
import {defaultSelectFormatter} from "../../../utils/formUtils";
import './Select.scss'
import {useState} from "react";
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
                    onCreate
                }) => {

    const [options, setOptions] = useState(initialOptions);

    const formattedOptions = options.map(formatter.toSelect)
    const formattedValue = value ? formatter.toSelect(value) : null
    const formattedOnChange = newValue => onChange(formatter.toFormik(newValue))

    const handleSearch = (query) => {
        search(query, setOptions)
    }

    const debouncedSearch = _.debounce(handleSearch, 500);

    const onMenuOpen = () => {
        search && handleSearch();
    }

    const handleInputChange = (value) => {
        search && debouncedSearch(value)
    }
    const onCreateOption = (value) => {
        onCreate(value, onChange)
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
        onCreateOption
    };


    return onCreate ? <CreatableSelect {...selectProps}/> :
        <ReactSelect {...selectProps} />

}

export default withForm(Select);