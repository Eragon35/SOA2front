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
import {useState} from "react";
import {HiEye, HiEyeOff} from "react-icons/hi";
import {useNavigate} from "react-router";



export const LoginForm = (props) => {
    const [ username, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef(null)
    const axios = require('axios')
    const history = useNavigate()


    const setLogin = (event) => {
        setUserName(event.target.value);
    }

    const setUserPassword = (event) => {
        setPassword(event.target.value);
    }

    String.prototype.hashCode = function() {
        let hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };



    const signUpHandler = () => {
        const login = username.toLowerCase()
        const pass = password.hashCode().toString()
        const data = {
            login,
            pass
        };


        axios.post("http://localhost:9000/auth", data).then(response => {
            console.log(response.data);
            window.localStorage.setItem("doctorId", response.data)
            history('/patients')
        })
    }
    const onClickReveal = () => {
        onToggle()
        const input = inputRef.current

        if (input) {
            input.focus({
                preventScroll: true,
            })
            const length = input.value.length * 2
            requestAnimationFrame(() => {
                input.setSelectionRange(length, length)
            })
        }
    }



    return (
        <chakra.form
            onSubmit={(e) => {
                e.preventDefault() // your login logic here
            }}
            {...props}
        >
            <Stack spacing="6">
                <FormControl id="email">
                    <FormLabel>Email address or mobile phone</FormLabel>
                    <Input name="email" type="email" autoComplete="email" required  value={username} onChange={setLogin}/>
                </FormControl>
                <FormControl id="password">
                    <Flex justify="space-between">
                        <FormLabel>Password</FormLabel>
                    </Flex>
                    <InputGroup>
                        <InputRightElement>
                            <IconButton
                                bg="transparent !important"
                                variant="ghost"
                                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                                onClick={onClickReveal}
                            />
                        </InputRightElement>
                        <Input name="password" type={isOpen ? 'text' : 'password'} autoComplete="password" required  value={password} onChange={setUserPassword}/>
                    </InputGroup>
                </FormControl>

                <Button type="submit" colorScheme="blue" size="lg" fontSize="md" onClick={signUpHandler}>
                    Войти
                </Button>
            </Stack>
        </chakra.form>
    )
}