import {
    Button,
    chakra, FormControl,
    FormLabel,
    Input, Stack
} from '@chakra-ui/react'
import * as React from 'react'
import {useState} from "react";



export const ObservationForm = (props) => {
    const smokerId = parseInt(localStorage.getItem("smokerId"))
    const [ start, setStart ] = useState('');
    const [ finish, setFinish ] = useState('');
    const [ hoursPerDay, setHoursPerDay ] = useState('');
    const axios = require('axios')


    const setObservationStart = (event) => {
        setStart(event.target.value);
    }

    const setObservationFinish = (event) => {
        setFinish(event.target.value);
    }
    const setObservationHours = (event) => {
        setHoursPerDay(parseInt(event.target.value));
    }




    const signUpHandler = () => {
        const data = {
            smokerId,
            start,
            finish,
            hoursPerDay
        };

        // console.log(data, 'data')

        axios.post("http://localhost:9000/addobservation", data).then(response => {
            console.log(response)
            // TODO: add record that request was send and refresh punishment table
        })
    }



    return (
        <chakra.form
            onSubmit={(e) => {
                e.preventDefault() // your login logic here
            }}
            {...props}
        >
            <Stack spacing="6">
                <FormControl id="start">
                    <FormLabel>Начало слежки</FormLabel>
                    <Input name="start" type="text" required  value={start} onChange={setObservationStart}/>
                </FormControl>

                <FormControl id="finish">
                    <FormLabel>Конец слежки</FormLabel>
                    <Input name="finish" type="text" required  value={finish} onChange={setObservationFinish}/>
                </FormControl>

                <FormControl id="hoursPerDay">
                    <FormLabel>Кол-во часов в день</FormLabel>
                    <Input name="hoursPerDay" type="text" required  value={hoursPerDay} onChange={setObservationHours}/>
                </FormControl>

                <Button type="submit" colorScheme="blue" size="300px" fontSize="md" onClick={signUpHandler}>
                    Назначить слежку
                </Button>
            </Stack>
        </chakra.form>
    )
}