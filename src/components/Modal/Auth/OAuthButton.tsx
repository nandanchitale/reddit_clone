import { Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'

type Props = {}

export default function OAuthButtons({ }: Props) {
    return (
        <Flex
            direction="column"
            width="100%"
            mb={4}
        >
            <Button variant="oauth" mb={2}>
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