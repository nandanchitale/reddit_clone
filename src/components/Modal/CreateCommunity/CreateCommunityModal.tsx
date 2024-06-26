import { auth, firestore } from '@/firebase/clientApp';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Divider, Text, Input, useStatStyles, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc, Transaction } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';

type CreateCommunityModalProps = {
    open: boolean
    handleClose: () => void
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {

    const [communityName, setCommunityName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [error, setError] = useState("");
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // re-calculate how many characters remaining in the name

        if (event.target.value.length > 21) return;

        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    };

    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name);
    }

    const handleCreateCommunity = async () => {
        try {
            if (error) setError("");

            // Validate Community name
            const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if (format.test(communityName) || communityName.length < 3) {
                throw new Error("Community name must be between 3 - 21 characters, and also can only contains letters, numbers and underscore(_)");
            }

            setLoading(true);

            // Create a community Document in firestore
            // 1> Check whether community name is taken or not
            const communityDocRef = doc(firestore, 'community', communityName);

            await runTransaction(firestore, async (transaction) => {
                const communityDoc = await transaction.get(communityDocRef);

                if (communityDoc.exists()) {
                    throw new Error(`Sorry, r/${communityName} is already taken. Try another`);
                    return;
                }

                // Create community
                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType
                });

                // Create Community snippet on user
                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true
                });
            });

            setLoading(false);
        } catch (error: any) {
            console.log(`handleCreateCommunity Error : ${error}`);
            setError(error.message)
        }
    }

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display="flex"
                        flexDirection="column"
                        fontSize={15}
                        padding={3}
                    >
                        Create Community
                    </ModalHeader>
                    <Box
                        pl={3}
                        pr={3}
                    >
                        <Divider />
                        <ModalCloseButton />
                        <ModalBody
                            display="flex"
                            flexDirection="column"
                            padding="10px 0 px"
                        >
                            <Text
                                fontWeight={600}
                                fontSize={15}
                            >
                                Name
                            </Text>
                            <Text>
                                Community names including capitalization cannot be changed.
                            </Text>
                            <Text
                                position="relative"
                                top="28px"
                                left="10px"
                                width="20px"
                                color="gray.400"
                            >r/</Text>
                            <Input
                                position="relative"
                                value={communityName}
                                size="sm"
                                pl="22px"
                                onChange={handleChange}
                            />
                            <Text
                                color={charsRemaining === 0 ? "red" : "gray.500"}
                            >
                                {charsRemaining} characters remaining
                            </Text>
                            <Text fontSize="9pt" color="red" pt={1}>
                                {error}
                            </Text>
                            <Box
                                mt={4}
                                mb={4}
                            >
                                <Text
                                    fontWeight={600}
                                    fontSize={15}
                                >
                                    Community Type
                                </Text>
                                <Stack spacing={2}>
                                    <Checkbox
                                        name="public"
                                        isChecked={communityType === "public"}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={BsFillPersonFill}
                                                color="gray.500"
                                                mr={2}
                                            />
                                            <Text
                                                fontSize="10pt"
                                                mr={1}
                                            >
                                                Public
                                            </Text>
                                            <Text
                                                fontSize="8pt"
                                                color="gray.500"
                                                pt={1}
                                            >
                                                Anyone can view, post and comment to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name="restricted"
                                        isChecked={communityType === "restricted"}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={BsEyeFill}
                                                color="gray.500"
                                                mr={2}
                                            />
                                            <Text
                                                fontSize="10pt"
                                                mr={1}
                                            >
                                                Restricted
                                            </Text>
                                            <Text
                                                fontSize="8pt"
                                                color="gray.500"
                                                pt={1}
                                            >
                                                Anyone can view, but only approved users can post
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name="private"
                                        isChecked={communityType === "private"}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={HiLockClosed}
                                                color="gray.500"
                                                mr={2}
                                            />
                                            <Text
                                                fontSize="10pt"
                                                mr={1}
                                            >
                                                Private
                                            </Text>
                                            <Text
                                                fontSize="8pt"
                                                color="gray.500"
                                                pt={1}
                                            >
                                                Only approved users can view and submit this
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>
                    <ModalFooter
                        bg="gray.100"
                        borderRadius="0px 0px 10px 10px"
                    >
                        <Button
                            variant="outline"
                            height="30px"
                            onClick={handleClose}
                            mr={3}
                        >
                            Cancel
                        </Button>
                        <Button
                            height="30px"
                            onClick={handleCreateCommunity} isLoading={loading}
                        >Create Community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
}
export default CreateCommunityModal;