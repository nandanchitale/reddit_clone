import { auth, firestore } from '@/firebase/clientApp';
import { Button, Flex, Image } from '@chakra-ui/react'
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

type Props = {}

export default function OAuthButtons({ }: Props) {
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    };

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred]);

    return (
        <Flex
            direction="column"
            width="100%"
            mb={4}
        >
            <Button
                variant="oauth"
                mb={2}
                onClick={() => signInWithGoogle()}
                isLoading={loading}
            >
                <Image
                    mr={4}
                    height="20px"
                    width="20px"
                    src="/google_logo.png"
                    alt="Login With Google"
                />
                Continue With Google
            </Button>
        </Flex >
    )
}