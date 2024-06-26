import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {

    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            Sorry, that community does not exists or has been banned
            <Link href="/">
                <Button mt={4}>Go Home</Button>
            </Link>
        </Flex>
    );
}
export default NotFound;