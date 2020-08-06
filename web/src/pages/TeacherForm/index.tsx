import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select, { SubjectOptions, WeekdayOptions } from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([{
        week_day: 0, from: '', to: ''
    }]);

    function addNewScheduleItems() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }]);
    }

    function handleCreateLesson(e: FormEvent) {
        e.preventDefault();

        api.post('lessons', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
            .then(() => {
                alert('Cadastro realizado com sucesso!');

                history.push('/');
            })
            .catch(() => alert('Erro ao cadastrar!'))
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject
        });
    }

    function setScheludeItemValue(index: number, field: string, value: string) {
        console.log(index + field + value);
        const updatedSchuleItems = scheduleItems.map((scheduleItem, position) => {
            if (position === index) {
                return { ...scheduleItem, [field]: value }
            } else {
                return scheduleItem;
            }
        });
        setScheduleItems(updatedSchuleItems);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateLesson}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            options={SubjectOptions}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}

                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItems}>
                                + Novo horário
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        options={WeekdayOptions}
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheludeItemValue(index, 'week_day', e.target.value)}
                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheludeItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheludeItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;