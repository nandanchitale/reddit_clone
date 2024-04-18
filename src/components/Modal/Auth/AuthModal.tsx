import { authModalState } from '@/atoms/authModelAtom';
import { Flex, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, ModalFooter } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';

const AuthModal: React.FC = () => {

    const [modalState, setModalState] = useRecoilState(authModalState);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOnClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    }

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleOnClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center'>
                        {modalState.view === 'login' && 'Login'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        pb={6}
                    >
                        <Flex
                            direction="column"
                            align="center"
                            justifyContent="center"
                            width="70%"
                        >
                            <AuthInputs />
                            {/* 
                                <OAuthButtons />
                                
                                <ResetPassword /> 
                            */}
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AuthModal;