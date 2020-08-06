import React, { SelectHTMLAttributes } from 'react';

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest} >
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>   
                })}
            </select>
        </div>
    );
}

const SubjectOptions = [
    { value: 'Matemática', label: 'Matemática' },
    { value: 'Física', label: 'Física' },
    { value: 'Biologia', label: 'Biologia' },
    { value: 'Química', label: 'Química' },
    { value: 'Geografia', label: 'Geografia' },
    { value: 'História', label: 'História' },
    { value: 'Redação', label: 'Redação' },
    { value: 'Português', label: 'Português' },
    { value: 'Literatura', label: 'Literatura' },
];

const WeekdayOptions = [
    { value: '0', label: 'Domingo' },
    { value: '1', label: 'Segunda-feira' },
    { value: '2', label: 'Terça-feira' },
    { value: '3', label: 'Quarta-feira' },
    { value: '4', label: 'Quinta-feira' },
    { value: '5', label: 'Sexta-feira' },
    { value: '6', label: 'Sábado' },
]

export default Select;



export {SubjectOptions, WeekdayOptions};