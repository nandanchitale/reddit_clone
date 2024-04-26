import { authModalState } from '@/atoms/authModelAtom';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/Error';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { use, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {

    const setAuthModelState = useSetRecoilState(authModalState);

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);

    // Firebase logic
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };


    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // update form state
        setLoginForm(prev => ({
            ...loginForm,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name='email'
                placeholder="john.doe@example.com"
                type='text'
                mb={2}
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                bg="gray.50"
            />
            <Input
                required
                name='password'
                type="password"
                placeholder="Password"
                onChange={onChange}
                fontSize="10pt"
                mb={2}
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                bg="gray.50"
            />
            <Button
                width='100%'
                height="36px"
                type="submit"
                mt={2}
                mb={2}
            >Log In</Button>
            <Text
                textAlign="center"
                color="red"
                fontSize="10pt"
            >
                {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Flex fontSize="9pt" justifyContent="Center">
                <Text mr={1}>New Here?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => {
                        setAuthModelState((prev) => ({
                            ...prev, view: "signup"
                        }))
                    }}
                >SIGN UP</Text>
            </Flex>
        </form>
    );
}
export default Login;