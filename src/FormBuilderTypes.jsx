import {     
    ControlAutocomplete,
    ControlCheckBox,
    ControlDate,
    ControlHeader,
    ControlNumber,
    ControlParagraph,
    ControlRadioGroup,
    ControlSelect,
    ControlText,
    ControlTextArea
} from './controls'

const FormBuilderTypes = [
    {
        key: "controls",
        title: "Компоненты",
        types: [
            ControlAutocomplete,
            ControlCheckBox,
            ControlDate,
            ControlNumber,
            ControlRadioGroup,
            ControlSelect,
            ControlText,
            ControlTextArea
        ]
    }, {
        key: "text",
        title: "Текст",
        types: [
            ControlHeader,
            ControlParagraph,
        ]
    }
  
];

export default FormBuilderTypes;