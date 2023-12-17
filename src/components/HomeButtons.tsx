import {
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Input,
} from "@chakra-ui/react";
import {
  AiOutlineFileAdd,
  AiOutlineFolderOpen,
  AiOutlineLink,
} from "react-icons/ai";
import TaskItem from "./TaskItem";
import { useState } from "react";
import { tasksDb } from "../lib/dummy-data/tasksDb";

const HomeButtons = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const textboxes = Object.keys(tasksDb);

  const filteredTextboxes = textboxes.filter((textbox) =>
    textbox.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Flex flexDirection="column" gap={3}>
      <>
        <Button
          size="xl"
          colorScheme="salmon"
          leftIcon={<AiOutlineFileAdd fontSize={36} />}
          onClick={onOpen}
        >
          Create a document from a PDF...
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          size="6xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <Input />
                <Input type="file" />
                <Input />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <VStack minH={"100%"}>
                  {filteredTextboxes.map((textbox, index) => (
                    <Input key={index} placeholder={textbox} />
                  ))}
                </VStack>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="salmon" mr={3} onClick={onClose}>
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <Button
        size="xl"
        variant="outline"
        leftIcon={<AiOutlineFolderOpen fontSize={36} />}
      >
        Add a document from your hard drive...
      </Button>
      <Button
        size="xl"
        variant="outline"
        leftIcon={<AiOutlineLink fontSize={36} />}
      >
        Import a document with a link...
      </Button>
    </Flex>
  );
};

export default HomeButtons;
