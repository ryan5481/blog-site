import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { assignUserRole, setLoginDetails } from '../../../redux/reducers/userSlice'
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Login() {
    const toast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
      })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

    const submitForm = async () => {
        try {
            const res = await axios.post(`${baseUrl}/login`, {
                email: formData.email,
                password: formData.password,
              })

        // Handle success and error messages
        if (res.status === 200) {
            dispatch(assignUserRole("user"));
            dispatch(
            setLoginDetails({
            email: res.data.email,
            id: res.data.id,
            fullName: res.data.fullName,
            isLoggedIn: true
          })
        );
            toast({
            title: 'Success.',
            description: 'Logged in.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
            });
            navigate("/")

        } else {
            toast({
            title: 'Error.',
            description: 'Failed to register user.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
            });
        }
        } catch (error) {
        console.error('Error', error);
        toast({
            title: 'Error.',
            description: 'Failed to connect to server.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
        });
        }
    }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" placeholder='Email ID' onChange={handleInputChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" placeholder='Password' onChange={handleInputChange} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={() => submitForm()}>
              Sign in
            </Button>
            <Text align={'center'}>
                Don't have an account? <Link color={'blue.400'} onClick={() => navigate("/signup")} >Signup</Link>
              </Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}