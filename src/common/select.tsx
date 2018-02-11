import * as React from 'react';
import { withStyles, StyleRules } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';

const styles: StyleRules = {
  formControl: {
    minWidth: 200,
    maxWidth: 300,
  }
};

interface ISelectProps {
  onChange: (event: any) => void;
  values: string[];
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
          {values.map(value => (
            <option
              key={value}
              value={value}
            >
              {value}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default withStyles(styles)(NativeSelect);