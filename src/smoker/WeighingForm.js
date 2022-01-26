import {
    Button,
    chakra, FormControl,
    FormLabel,
    Input, Stack
} from '@chakra-ui/react'
import * as React from 'react'
import {useState} from "react";



export const WeighingForm = (props) => {
    const smokerId = parseInt(localStorage.getItem("smokerId"))
    const [ date, setDate ] = useState('');
    const [ weight, setWeight ] = useState('');
    const axios = require('axios')


    const setWeighinhgDate = (event) => {
        setDate(event.target.value);
    }

    const setSmokerWeight = (event) => {
        setWeight(event.target.value);
    }




    const signUpHandler = () => {
        const data = {
            smokerId,
            date,
            weight
        };

        // console.log(data, 'data')

        axios.post("http://localhost:9000/weighing", data).then(response => {
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
                <FormControl id="date">
                    <FormLabel>Дата взвешивания</FormLabel>
                    <Input name="date" type="date" required  value={date} onChange={setWeighinhgDate}/>
                </FormControl>

                <FormControl id="weight">
                    <FormLabel>Вес</FormLabel>
                    <Input name="weight" type="text" required  value={weight} onChange={setSmokerWeight}/>
                </FormControl>

                <Button type="submit" colorScheme="blue" size="300px" fontSize="md" onClick={signUpHandler}>
                    Добавить взвешивание
                </Button>
            </Stack>
        </chakra.form>
    )
}