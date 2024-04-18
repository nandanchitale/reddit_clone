import { Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '@/components/Modal/Auth/AuthModal';

type RightContentProps = {
    // user:any
};

const RightContent: React.FC<RightContentProps> = () => {

    return (
        <>
            <AuthModal />
            <Flex
                justifyContent="space-between"
                alignItems="center"
            >
                <AuthButtons />
            </Flex>
        </>
    );
}
export default RightContent;