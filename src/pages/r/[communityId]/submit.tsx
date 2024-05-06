import PageContent from '@/components/layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type SubmitPostPageProps = {

};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
    return (
        <PageContent>
            <>
                <Box
                    p="14px 0px"
                    borderBottom="1px solid"
                    borderColor="white"
                >
                    <Text>Create a Post</Text>
                </Box>
                <NewPostForm />
            </>
            <>
                {/* About */}
            </>
        </PageContent>
    );
}
export default SubmitPostPage;