import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConditionalRoute from "./routes/conditionalRoutes"
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Navbar from "./components/navigation/navbar";


function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/adminlogin/*" element={<AdminLogin />} /> */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <>
      <ChakraProvider>
        <Navbar/>
        <ConditionalRoute />
      </ChakraProvider>
    </>
  );
}

export default App;
