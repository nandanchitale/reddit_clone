import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '@/components/Modal/Auth/AuthModal';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

type RightContentProps = {
    user: any
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {

    return (
        <>
            <AuthModal />
            <Flex
                justifyContent="space-between"
                alignItems="center"
            >
                {user ? (<div>
                    <Button
                        onClick={() => signOut(auth)}
                    >
                        Logout
                    </Button>
                </div>) : (<AuthButtons />)}
            </Flex>
        </>
    );
}
export default RightContent;