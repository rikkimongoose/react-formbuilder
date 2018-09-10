import { TextControl, TextAreaControl } from './controls/'

const FormBuilderTypes = [
    {
        key: "controls",
        title: "Компоненты",
        types: [
          TextControl,
          TextAreaControl
        ]
    }, {
        key: "text",
        title: "Текст",
        types: []
    }
  
];

export default FormBuilderTypes;