import { authModalState } from '@/atoms/authModelAtom';
import { auth, firestore } from '../../../firebase/clientApp';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { use, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { addDoc, collection } from 'firebase/firestore';
import { User } from 'firebase/auth';

type SignUpProps = {

};

const SignUp: React.FC<SignUpProps> = () => {

    const [
        createUserWithEmailAndPassword,
        userCred,
        loading,
        userError
    ] = useCreateUserWithEmailAndPassword(auth);

    const setAuthModelState = useSetRecoilState(authModalState);

    const [error, setError] = useState('');

    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Firebase logic
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError("");
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Passwords match
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // update form state
        setSignUpForm(prev => ({ ...signUpForm, [event.target.name]: event.target.value }));
    };

    // Create user Logic
    const createUserDocument = async (user: User) => {
        await addDoc(collection(firestore, 'users'), JSON.parse(JSON.stringify(user)));
    };

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user)
        }
    }, [userCred]);

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name='email'
                placeholder="john.doe@example.com"
                type='email'
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
            <Input
                required
                name='confirmPassword'
                type="password"
                placeholder="Confirm Password"
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
            {error || userError && (
                <Text
                    textAlign="center"
                    color="red"
                    fontSize="10pt"
                >
                    {error || userError.message}
                </Text>
            )}
            <Button
                width='100%'
                height="36px"
                type="submit"
                mt={2}
                mb={2}
                isLoading={loading}
            >Sign Up</Button>
            <Flex fontSize="9pt" justifyContent="Center">
                <Text mr={1}>Already a redditor?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => {
                        setAuthModelState((prev) => ({
                            ...prev, view: "login"
                        }))
                    }}
                >LOG IN</Text>
            </Flex>
        </form>
    );
}
export default SignUp;