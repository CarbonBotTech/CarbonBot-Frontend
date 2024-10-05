import React, { Fragment, memo } from "react";
import debounce from "debounce-promise";
import { search } from './../../helpers/search';
import useTheme from '@material-ui/core/styles/useTheme';
import AsyncSelect from "react-select/async";
import getSelectTheme from './theme';

const Search = (props) => {

    // theme
    const theme = useTheme();
    const formThemeColors = getSelectTheme(theme);

    // methods
    const loadOptions = (inputValue) => promiseOptions(inputValue);
    const debouncedLoadOptions = debounce(loadOptions, 500, {
        leading: false
    });

    const promiseOptions = (inputValue) => {
    
        return new Promise((resolve, reject) => {
            
            search(inputValue).then((data) => {
                const [error, response] = data;

                if(error) return;
                resolve(
                    response.data.map(({ name, slug }) => ({
                        value: slug,
                        label: name
                    }))
                );
            });

        });
    }

    const selectedOption = (selected) => {
        if(!selected || !selected.value) return
        props.history.push('/bots/' + selected.value);
    }

    return (
        <Fragment>
            <AsyncSelect 
                theme={theme => ({
                    ...theme,
                    colors: {
                      ...formThemeColors
                    }})}
                    placeholder={"What kind of bot are you looking for?"}
                onChange={(selected) => selectedOption(selected)}
                noOptionsMessage={() => {
                    return "No results"
                }}
                cacheOptions 
                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                isClearable={true}
                defaultOptions={[]} 
                loadOptions={inputValue => debouncedLoadOptions(inputValue)}
            />
        </Fragment>
    )
}

export default Search;