import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';

type NewPostFormProps = {

};

const formTabs: TabItem[] = [
    {
        title: "Post",
        icon: IoDocumentText
    },
    {
        title: "Images & Video",
        icon: IoImageOutline
    },
    {
        title: "Link",
        icon: BsLink45Deg
    },
];

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [loading, setLoading] = useState(false);
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: ""
    });

    const [selectedFile, setSelectedFile] = useState<string>();

    const handleCreatePost = async () => { };

    const onSelectedImage = () => { };

    const onTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {
            target: { name, value },
        } = event;
        setTextInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    return (
        <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            mt={2}
        >
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem
                        key={item.title}
                        item={item}
                        selected={item.title === selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === "Post" && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={loading}
                    />
                )}
            </Flex>
        </Flex>
    );
}
export default NewPostForm;