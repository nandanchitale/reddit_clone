import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";

type SearchInputProps = {
    user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {

    return (
        <Flex
            flexGrow={1}
            mr={2}
            align="center"
            maxWidth={user ? "auto" : "600px"}
        >
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    // eslint-disable-next-line react/no-children-prop
                    children={<SearchIcon color='gray.400' mb={1} />}
                />
                <Input
                    placeholder='Search Reddit'
                    fontSize="10pt"
                    mx={1}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"
                    }}
                    _focus={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"
                    }}
                    height="34px"
                    bg="gray.50"
                />
            </InputGroup>
        </Flex >
    );
}

export default SearchInput;