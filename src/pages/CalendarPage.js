import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ListsContext } from '../context/ListsContext';
import Layout from '../config/Layout';
import Calendar from '@atlaskit/calendar';
import 'date-fns';
import date from 'date-and-time';
import 'date-and-time/plugin/meridiem';

export const CalendarDisplay = () => {
    const { selectedDate, setSelectedDate } = useContext(ListsContext);
    const [redirectBool, setRedirectBool] = useState(false);

    date.plugin('meridiem');

    const datePattern = date.compile('YYYY-MM-DD')
    const today = date.format(new Date(), datePattern);


    const log = (msg) => (e) => console.log(msg, e);

    const onDateSelect = (event) => {
        setSelectedDate(event.valueOf())
        setRedirectBool(true)
    };

    console.log('selectedDate', selectedDate)
    console.log('redirectBool', redirectBool)

    return (
        <Layout>
            <div>
                <Calendar
                    defaultSelected={[`${today}`]}
                    innerProps={{
                    style: {
                        // border: '1px solid red',
                        display: 'inline-block',
                    },
                    }}
                    onBlur={() => log('blur')}
                    onChange={() => log('change')}
                    onFocus={() => log('focus')}
                    onSelect={onDateSelect}
                    testId={'calendar'}
                />
            </div>
            {redirectBool ? <Redirect to="/date" /> : ''}
        </Layout>
    )
};