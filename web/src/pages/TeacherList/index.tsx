import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select, { SubjectOptions, WeekdayOptions } from '../../components/Select';
import api from '../../services/api';

import './styles.css'

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    
    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('lessons', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        options={SubjectOptions}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        options={WeekdayOptions}
                        value={week_day}
                        onChange={(e) => setWeekDay(e.target.value)}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher} />;
                    })
                }
            </main>
        </div>
    )
}

export default TeacherList;