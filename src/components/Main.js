import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Main() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        General
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>Основная информация</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Приложение было разработано для дисциплины Веб программирование в "Университете ИТМО"
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Стек приложения</Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Что было использовано в проекте
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Backend - Java Spring + PostgreSQL;
                        Frontend - React + Redux
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        Основной функционал
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Описание возможностей
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        В приложении имеется авторизация, через Spring Security, добавление данных в базу данных
                        посредством HTTP запросов
                        через формы, получение всех данных и дальнейший вывод их на экран.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Personal data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Автор: Бекмухаметов Владислав Робертович.
                    </Typography>
                    <Typography>
                        Вариант: 12119.
                    </Typography>
                    <Typography>
                        Группа: P32121.
                    </Typography>
                    <Typography>
                        <a href="https://github.com/YuikoSempai">GitHub</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}