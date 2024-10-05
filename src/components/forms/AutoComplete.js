import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";

const ControlledAutocomplete = ({ 
	options = [], 
	renderInput, 
	getOptionLabel, 
	onChange: ignored, 
	control, 
	defaultValue, 
	name, 
	renderOption, 
	renderTags,
	rules, 
	multiple,
	freeSolo 
}) => {
	return (
	  	<Controller
			render={({ onChange, ...props }) => (
				<Autocomplete
					options={options}
					getOptionLabel={getOptionLabel}
					renderOption={renderOption}
					renderInput={renderInput}
					renderTags={renderTags}
					onChange={(e, data) => onChange(data)}
					multiple={multiple}
					{...props}
					freeSolo={freeSolo}
					closeIcon={null}
				/>
			)}
			onChange={([, data]) => data}
			defaultValue={defaultValue}
			name={name}
			control={control}
			rules={rules}
	  	/>
	);
}

export default ControlledAutocomplete;