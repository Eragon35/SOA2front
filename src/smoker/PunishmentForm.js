import {
    Button,
    chakra, Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input, InputGroup,
    InputRightElement,
    Stack,
    useDisclosure
} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from "react";
import {HiEye, HiEyeOff} from "react-icons/hi";
import ReactRouterDOM from "react-dom";
import { Navigate, Routes, Route  } from "react-router";
import Select from "react-select";
import axios from "axios";
import AsyncSelect from "react-select/async";



export const PunishmentForm = (props) => {
    // const [ username, setUserName ] = useState('');
    // const [ password, setPassword ] = useState('');
    // const { isOpen, onToggle } = useDisclosure()
    // const inputRef = React.useRef(null)
    const axios = require('axios')
    const smokerId = parseInt(localStorage.getItem("smokerId"))
    const [punishment, setPunishment] = useState('')
    const [victim, setVictim] = useState(3)
    const [cost1, setCost1] = useState('')
    const relativesURL = "http://localhost:9000/relatives/?smokerId=" + localStorage.getItem("smokerId")


    const setPunishmentType = (event) => {
        setPunishment(event.target.value)
    }
    const setPunishmentVictim = (event) => {
        setVictim(event.target.value)
    }
    const setPunishmentCost = (event) => {
        setCost1(event.target.value)
    }

    const [relativesData, setRelativesData] = useState([]);

    const [loadingRelativesData, setLoadingRelativesData] = useState(true);


    useEffect(() => {
        async function getRelativesData() {
            await axios
                .get(relativesURL)
                .then((response) => {
                    // check if the data is populated
                    console.log('Relatives', response.data);
                    setRelativesOptions(response.data)
                    setRelativesData(response.data)
                    // you tell it that you had the result
                    // setLoadingRelativesData(false)
                });
        }
        if (loadingRelativesData) getRelativesData();
    })

    function setRelativesOptions(data) {
        console.log('adding relatives')
        data.forEach(x => {
            relativesOptions.push({ value: String(x.personId), label: x.firstName + ' ' + x.lastName})
            console.log(x.id,' ',relativesOptions)
        })
        setLoadingRelativesData(false)
    }


    const signUpHandler = () => {
        let cost = parseInt(cost1)
        const data = {
            punishment,
            smokerId,
            victim,
            cost
        };

        console.log(data, 'data')
        axios.post("http://localhost:9000/punishment", data).then(response => {
            console.log(response)
            return;

        })
    }

    let relativesOptions = [
        { value: '1', label: 'Richard Morrison'},
        { value: '3', label: 'Lucinda Morrison' },
        { value: '4', label: 'Elvin Morrison' }
    ]


    const handleClick = () => {
        setRelativesOptions(relativesData)
    }

    return (
        <chakra.form
            onSubmit={(e) => {
                e.preventDefault() // your login logic here
            }}
            {...props}
        >
            <Stack spacing="6">
                <FormControl id="victimId">
                    <FormLabel>Выбор жертвы</FormLabel>
                    {/*<Input name="victimId" type="date" required  value={victimId} onChange={setPunishmentVictim}/>*/}
                    <Select options={relativesOptions} value = 'Lucinda Morrison' />
                </FormControl>

                <FormControl id="punishment">
                    <FormLabel>Тип назания</FormLabel>
                    <Input name="punishment" type="text" required  value={punishment} onChange={setPunishmentType}/>
                </FormControl>

                <FormControl id="hoursPerDay">
                    <FormLabel>Стоимость наказания</FormLabel>
                    <Input name="hoursPerDay" type="text" required  value={cost1} onChange={setPunishmentCost}/>
                </FormControl>

                <Button type="submit" colorScheme="blue" size="300px" fontSize="md" onClick={signUpHandler}>
                    Назначить наказание
                </Button>
            </Stack>
        </chakra.form>
        // <div> {/*onClick={handleClick}*/}
        //         <Select options={relativesOptions} onChange={setVictimId(this.value)}/>
        //     {/*<AsyncSelect loadOptions={relativesOptions}/>*/}
        // </div>
    )
}