import { useNavigate } from 'react-router-dom'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL;


export default function Signup() {
    const toast = useToast()
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = async () => {
        try {
        const data ={
            'fullName': fullName,
            'email': email,
            'password': password
            }

        const res = await axios.post(`${baseUrl}/signup`, data)

        // Handle success and error messages
        if (res.status === 200) {
            toast({
            title: 'Success.',
            description: 'User registered.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
            });
            window.location.reload()

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
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
                <FormControl w="full" id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" onChange={(e) => setFullName(e.target.value)}  />
                </FormControl>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => submitForm()}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
            <Text>Already a user?</Text>  <Link color={'blue.400'} onClick={() => navigate("/login")} >Login</Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}