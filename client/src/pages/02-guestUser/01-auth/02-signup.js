import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  useToast,
  Wrap,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  Image,
  Flex,
  AvatarBadge,
  IconButton,
  Center,
  useDisclosure,
  Link,
  Text,
  FormErrorMessage, // Add this import for error message display
} from '@chakra-ui/react';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Signup = ({ setIsCreateNewUserActive, fetchData }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, two lowercase letters, two uppercase letters, two numbers, and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match') // Check if it matches the 'password' field
      .required('Password confirmation is required'),
    district: Yup.string().required('District is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submit button clicked")
      // Remove confirmPassword from the formData before submitting
      const { confirmPassword, ...formData } = values;
      submitForm(formData);
    },
  });

  const submitForm = async (formData) => {
    try {
      const res = await axios.post(`${baseUrl}/signup`, formData);
      // Handle success and error messages
      if (res.status == 200) {

        toast({
          title: 'Success.',
          description: 'District admin user account created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
        fetchData()
        setIsCreateNewUserActive(false)
      } else {
        toast({
          title: 'Error.',
          description: 'Failed to create user.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }

    } catch (error) {
      console.error("Error updating image: ", error)
      toast({
        title: 'Error.',
        description: "Could not connect to server.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>

    <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            spacing={4}
            w="100%"
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
          >
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl' }}
            >
              Signup
            </Heading>
            <FormControl id="firstName" isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder="Last Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                id="firstName"
                {...formik.getFieldProps('firstName')}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <Box color="red.500" mt={1}>
                  {formik.errors.firstName}
                </Box>
              )}
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder="Last Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                id="lastName"
                {...formik.getFieldProps('lastName')}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <Box color="red.500" mt={1}>
                  {formik.errors.lastName}
                </Box>
              )}
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                id="email"
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email && (
                <Box color="red.500" mt={1}>
                  {formik.errors.email}
                </Box>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="password"
                  _placeholder={{ color: 'gray.500' }}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...formik.getFieldProps('password')}
                />
                <InputRightElement width="4.5rem">
                  {showPassword ? (
                    <ViewOffIcon onClick={handleTogglePassword} />
                  ) : (
                    <ViewIcon onClick={handleTogglePassword} />
                  )}
                </InputRightElement>
              </InputGroup>
              {formik.errors.password && formik.touched.password && (
                <Box color="red.500" mt={1}>
                  {formik.errors.password}
                </Box>
              )}
            </FormControl>
            <FormControl id="confirmPassword" isRequired isInvalid={formik.errors.confirmPassword}>
              <FormLabel>Confirm password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="password"
                  _placeholder={{ color: 'gray.500' }}
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...formik.getFieldProps('confirmPassword')}
                />
                <InputRightElement width="4.5rem">
                  {showPassword ? (
                    <ViewOffIcon onClick={handleTogglePassword} />
                  ) : (
                    <ViewIcon onClick={handleTogglePassword} />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
            </FormControl>
              <Button
                bg={'blue.400'}
                color={'white'}
                w="full"
                type="submit"
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={()=>formik.handleSubmit()}
              >
                Submit
              </Button>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={() => navigate("/login")} >Login</Link>
              </Text>
          </Stack>
        </form>
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

  );
};

export default Signup;
