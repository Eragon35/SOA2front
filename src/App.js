import logo from './logo.svg';
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Link } from "react-router-dom";


function App( ) {
    // 2. Use at the root of your app
    return (
        <div>
            <h1> Hello Arsentii </h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                }}
            >
                <Link to="/auth">Auth</Link> |{" "}
                <Link to="/patients">Doctor</Link>
            </nav>
        </div>
        // <ChakraProvider>
        //     <Router>
        //         <AppRoutes/>
        //     </Router>
        //     {/*<Component />*/}
        // </ChakraProvider>
    )
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <div>
//           ISBD App
//         </div>
//         {/*<p>*/}
//         {/*  Edit <code>src/App.js</code> and save to reload.*/}
//         {/*</p>*/}
//         {/*<a*/}
//         {/*  className="App-link"*/}
//         {/*  href="https://reactjs.org"*/}
//         {/*  target="_blank"*/}
//         {/*  rel="noopener noreferrer"*/}
//         {/*>*/}
//         {/*  Learn React*/}
//         {/*</a>*/}
//       </header>
//     </div>
//   );
// }


export default App;
