import type { Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  admin: {
    width: '50%',
  },
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  admin: {
    width: '50%',
  },
}

const require: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
  admin: {
    width: '50%',
  },
}

const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
  admin: {
    width: '50%',
  },
}

const defaultValue: Field = {
  name: 'defaultValue',
  type: 'text',
  label: 'Default Value',
  admin: {
    width: '50%',
  },
}

const width: Field = {
  name: 'fieldWidth',
  type: 'select',
  label: 'Width',
  options: [
    { value: 'full', label: '100%' },
    { value: '3/4', label: '75%' },
    { value: '2/3', label: '66%' },
    { value: '1/2', label: '50%' },
    { value: '1/3', label: '33%' },
    { value: '1/4', label: '25%' },
  ],
  admin: {
    width: '50%',
  },
}

const hidden: Field = {
  name: 'hidden',
  type: 'checkbox',
  label: 'Hidden Field',
  admin: {
    width: '50%',
  },
}

export { placeholder, width, name, label, require, defaultValue, hidden }
