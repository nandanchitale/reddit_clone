import { auth } from '@/firebase/clientApp';
import { Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

type Props = {}

export default function OAuthButtons({ }: Props) {
    const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

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