import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import "./main.css"


export default function Main() {
    // const server = "/SOA2s2"
    const server = ""
    const url = "https://localhost:13371/" + server + "api/v1"
    const urlNav = "https://localhost:13371/" + server + "api/v1/navigator"

    const config = {
        headers: {
            Accept: '*/*',
        }
    }
    function write(data) {
        document.getElementById('response').innerText = ""
        document.getElementById('response').style.color = 'aqua'
        console.log('data is');
        console.log(JSON.stringify(data, null, 2))
        document.getElementById('response').innerText = JSON.stringify(data, null, 2)
    }

    function writeError(error) {
        document.getElementById('response').innerText = ""
        document.getElementById('response').style.color = 'tomato'
        console.log('error is');
        console.log(JSON.stringify(error, null, 2))
        let status = ""
        let msg = ""
        let t = ""
        if (error === undefined) {
            status = 400
            msg = "Invalid input"
            const date = new Date()
            t = (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate())
        } else {
            status = error.status
            msg = error.data.message
            t = error.data.timestamp.slice(0, 10)
        }
        document.getElementById('response').innerText = "{\n\"code\":" + status +
            ",\n\"message\": \"" + msg + "\"\n\"time\": \"" + t + "\"\n}"
    }

    function readObj()  {
        const id = parseInt(document.getElementById("id").value)
        const name = document.getElementById("name").value
        const x = parseFloat(document.getElementById("coorX").value)
        const y = parseFloat(document.getElementById("coorY").value)
        const date = document.getElementById("creationDate").value
        const fromX = parseFloat(document.getElementById("fromX").value)
        const fromY = parseFloat(document.getElementById("fromY").value)
        const fromZ = parseFloat(document.getElementById("fromZ").value)
        const toX = parseFloat(document.getElementById("toX").value)
        const toY = parseFloat(document.getElementById("toY").value)
        const toZ = parseFloat(document.getElementById("toZ").value)
        const distance = parseInt(document.getElementById("distance").value)
        const obj = {}
        obj.id = id
        obj.name = name
        const c = {}
        c.x = x
        c.y = y
        obj.coordinates = c
        obj.creationDate = date
        const from = {}
        from.x = fromX
        from.y = fromY
        from.z = fromZ
        const to = {}
        to.x = toX
        to.y = toY
        to.z = toZ
        obj.from = from
        obj.to = to
        obj.distance = distance

        return obj
    }

    async function get() {
        console.log('trying to GET request')
        const id = document.getElementById("id").value
        console.log('id is ' + id)
        await axios
            .get(url + '/route/' + id, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function deleteById() {
        console.log('trying to DELETE request')
        const id = document.getElementById("id").value
        await axios
            .delete(url + '/route/' + id, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function post() {
        console.log('trying to POST request')
        let obj = readObj()
        console.log('obj is ' + JSON.stringify(obj, null, 2))
        await axios
            .post(url + '/route', obj, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function put() {
        console.log('trying to PUT request')
        const id = document.getElementById("id").value
        let obj = readObj()
        console.log('obj is ' + JSON.stringify(obj, null, 2))
        await axios
            .put(url + '/route/' + id, obj, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function list() {
        console.log('trying to LIST request')
        const name = document.getElementById("columnName").value || 'id'
        const sortD = document.getElementById("sortDirection").value || 'asc'
        const page = document.getElementById("page").value || "1"
        const pageSize = document.getElementById("pageSize").value || "10"
        // console.log('id is ' + id)
        await axios
            .get(url + '/routes', {params : {columnName : name, sortDirection: sortD, page: page, pageSize: pageSize}}, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function byName() {
        console.log('trying to GET request')
        const name = document.getElementById("name").value
        await axios
            .get(url + '/routesByName/' + name, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function dEq() {
        console.log('trying to GET request')
        const distance = document.getElementById("distance").value
        await axios
            .get(url + '/distanceEqual/' + distance, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function dMore() {
        console.log('trying to GET request')
        const distance = document.getElementById("distance").value
        await axios
            .get(url + '/distanceMore/' + distance, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function navGet() {
        console.log('trying to GET request')
        const from = document.getElementById("nameFrom").value
        const to = document.getElementById("nameTo").value
        const order = document.getElementById("navOrderBy").value
        await axios
            .get(urlNav + '/routes/' + from + '/' + to + '/' + order, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }

    async function navPost() {
        console.log('trying to POST request')
        const from = document.getElementById("nameFrom").value
        const to = document.getElementById("nameTo").value
        const distance = document.getElementById("navDistance").value
        let obj = readObj()
        console.log('obj is ' + JSON.stringify(obj, null, 2))
        await axios
            .post(urlNav + '/route/add/' + from + '/' + to + '/' + distance, obj, config)
            .then((response) => {
                write(response.data)
            }).catch((error) => {
                writeError(error.response)
            });
    }



    let navigate = useNavigate();
    const apologize = () =>{
        let path = `apologize`;
        navigate(path);
    }

    return (
        <main style={{ padding: "1rem 0" }}>
            <div id='main'>
                <h2>Routes API:</h2>
                <label htmlFor="id">Id</label>
                <div>
                    <input id = 'id' type={"number"}/>
                </div>
                <div>
                    <Button onClick={get}>Get</Button>
                    <Button onClick={deleteById}>Delete</Button>
                </div>
                <div>
                    <label>name</label>
                    <div>
                        <input id="name" type={"text"}/>
                    </div>
                    <label htmlFor="coordinates">coordinates</label>
                    <div>
                        <label>X</label>
                        <input id="coorX" type={"text"}/>
                        <label>Y</label>
                        <input id="coorY" type={"text"}/>
                    </div>
                    <label>creating date</label>
                    <div>
                        <input id="creationDate" type={"date"}/>
                    </div>
                    <label htmlFor="from">from</label>
                    <div>
                        <label>X</label>
                        <input id="fromX" type={"number"}/>
                        <label>Y</label>
                        <input id="fromY" type={"number"}/>
                        <label>Z</label>
                        <input id="fromZ" type={"number"}/>
                    </div>
                    <label htmlFor="to">to</label>
                    <div>
                        <label>X</label>
                        <input id="toX" type={"number"}/>
                        <label>Y</label>
                        <input id="toY" type={"number"}/>
                        <label>Z</label>
                        <input id="toZ" type={"number"}/>
                    </div>
                    <label htmlFor="distance">distance</label>
                    <div>
                        <input id = 'distance' type={"number"}/>
                    </div>
                </div>
                <Button onClick={post}>Post</Button>
                <Button onClick={put}>Put</Button>
                <div>
                    <div>
                        <label>column name</label>
                        <select id={"columnName"}>
                            <option>name</option>
                            <option>creationDate</option>
                            <option>distance</option>
                            <option>coordinates.x</option>
                            <option>coordinates.y</option>
                            <option>location.x</option>
                            <option>location.y</option>
                            <option>location.z</option>
                        </select>
                    </div>
                    <div>
                        <label>sort direction</label>
                        <select id={"sortDirection"}>
                            <option>asc</option>
                            <option>desc</option>
                        </select>
                    </div>
                    <div>
                        <label>page</label>
                        <input id="page" type={"number"}/>
                    </div>
                    <div>
                        <label>page size</label>
                        <input id="pageSize" type={"number"}/>
                    </div>
                </div>
                <Button onClick={list}>Routes</Button>
                {/*<div>*/}
                {/*    <label htmlFor="name">name</label>*/}
                {/*    <input type={"text"}/>*/}
                {/*</div>*/}
                <Button onClick={byName}>Routes by name</Button>

                <h2>Distance API:</h2>
                {/*<div>*/}
                {/*    <label htmlFor="distance">distance</label>*/}
                {/*    <input type={"number"}/>*/}
                {/*</div>*/}
                <Button onClick={dEq}>Distance equal</Button>
                <Button onClick={dMore}>Distance more</Button>

                <h2>Navigator API:</h2>
                <div>
                    <div>
                        <label>name from</label>
                        <input id="nameFrom" type={"text"}/>
                    </div>
                    <div>
                        <label>name to</label>
                        <input id="nameTo" type={"text"}/>
                    </div>
                    <label>order by</label>
                    <select id={"navOrderBy"}>
                        <option>asc</option>
                        <option>desc</option>
                    </select>
                </div>
                <Button onClick={navGet}>Get</Button>
                <div>
                    <label>distance</label>
                    <input id="navDistance" type={"number"}/>
                </div>
                <Button onClick={navPost}>Post</Button>


                {/* todo: move response to right side*/}
                {/* todo: add validation */}
                <div>
                    <h2>Response:</h2>
                    <div id='response'>

                    </div>
                </div>

                <Button onClick={apologize}>Apologize</Button>
            </div>
        </main>
    );
}