import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { StyleRules, withStyles } from 'material-ui/styles';
import * as React from 'react';
import { isArray } from 'util';

const styles: StyleRules = {
  formControl: {
    minWidth: 200,
    maxWidth: 300,
  }
};

interface ISelectProps {
  onChange: (event: any) => void;
  values: (string | string[])[];
  selectedValue: string;
  classes?: any;
  label: string;
  name: string;
  defaultValue?: string;
}

type SelectType = (props: ISelectProps) => JSX.Element;

const NativeSelect: SelectType = ({ selectedValue, classes, onChange, values, name, label }) => {
  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          native
          value={selectedValue}
          onChange={onChange}
          inputProps={{
            id: name,
            name: name,
          }}
        >
          <option value=''></option>
          {values.map(value => {
            const [key, name] = isArray(value) ? value : [value, value];
            return <option
              key={key}
              value={key}
            >
              {name}
            </option>
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default withStyles(styles)(NativeSelect);