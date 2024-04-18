import { Center, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';

const Navbar: React.FC<any> = () => {

    return (
        // Chakra UI Flexbox  component for layout
        // Can pass styles as prop to chakra components
        <Flex
            bg="white"
            height="44px"
            padding="6px 12px"
            justifyContent={{ md: "space-between" }}
        >
            <Flex
                align="center"
                width={{ base: "40px", md: "auto" }}
                mr={{ base: 0, md: 2 }}
            >
                <Image
                    src="/reddit_icons/Reddit_Icon_2Color.png"
                    height="30px"
                    alt="reddit_icon"
                    mr={1}
                />
                <Image
                    src="/reddit_icons/Reddit_Logo_Wordmark_Black.png"
                    height="30px"
                    display={{ base: "none", md: "unset" }} // base for mobile size
                    alt="reddit_icon"
                />
            </Flex>
            <SearchInput />
            <RightContent />

            {/* 
            <Directory/>            
            */}
        </Flex>
    )
}
export default Navbar;