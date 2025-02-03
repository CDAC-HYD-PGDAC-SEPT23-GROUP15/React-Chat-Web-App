import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [blockedChats, setBlockedChats] = useState([]); // State to hold blocked chats

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isBlockedChatsOpen,
    onOpen: onOpenBlockedChats,
    onClose: onCloseBlockedChats,
  } = useDisclosure(); // State and functions for blocked chats modal
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    console.log("Search query:", search); // Add this line
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log("Search result:", data); // Add this line
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleViewBlockedChats = () => {
    axios
      .get("/api/chat/blocked", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Fetched blocked chats:", response.data);
        setBlockedChats(response.data);
        onOpenBlockedChats();
      })
      .catch((error) => {
        console.error("Error fetching blocked chats:", error);
        // Handle error
      });
  };

  useEffect(() => {
    console.log("Blocked chats:", blockedChats);
  }, [blockedChats]);
  const handleUnblockChat = async (chatId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Update the chat to unblock it
      await axios.put(`/api/chat/unblock/${chatId}`, {}, config);

      // Remove the unblocked chat from the blockedChats list
      setBlockedChats(blockedChats.filter((chat) => chat._id !== chatId));
    } catch (error) {
      console.error("Failed to unblock chat:", error);
      toast({
        title: "Error Occurred!",
        description: "Failed to unblock the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex" // Set display to flex
        justifyContent="space-between" // Align items with space between
        alignItems="center" // Align items vertically centered
        bgGradient="linear-gradient(to right, #16222A 0%, #3A6073  51%, #16222A  100%)  " // Gradient from dark gray to light gray
        width="100%" // Set width to 100% of the parent container
        padding="10px" // Add padding around the content
        border="5px solid #555" // Add a solid border with a dark gray color
        borderRadius="md" // Apply a medium border radius for rounded corners
        boxShadow="md" // Add a medium shadow for depth
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            bgGradient="linear(to-r, #3A3A3A, #808080)" // Gradient from dark gray to light gray
            color="white" // Text color
            borderRadius="full" // Apply full border radius for a rounded appearance
            boxShadow="md" // Add a medium shadow for depth
            px={4} // Add horizontal padding for spacing
            py={2} // Add vertical padding for spacing
            _hover={{
              bgGradient: "linear(to-r, #4a4a4a, #909090)", // Lighten the gradient on hover
              color: "white", // Change text color on hover
            }}
          >
            <i className="fas fa-search"></i> {/* Icon */}
            <Text d={{ base: "none", md: "flex" }} ml={2} fontWeight="bold">
              Search User
            </Text>{" "}
            {/* Text */}
          </Button>
        </Tooltip>
        <Text
          fontSize="3xl" // Increase font size for emphasis
          fontFamily="Arial, sans-serif" // Use Arial font with fallback to sans-serif
          fontWeight="bold" // Make the text bold for emphasis
          color="#f0f0f0" // Light gray color
          letterSpacing="1px" // Add slight letter spacing for better readability
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)" // Add a subtle text shadow for depth
        >
          React Chat Web App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bgColor="transparent"
              color="white" // Set the text color to white
              rightIcon={<ChevronDownIcon />}
              fontFamily="cursive"
              fontWeight="bold"
              h="50px"
              w="200px"
              _hover={{ bgColor: "transparent" }} // Remove white highlight on hover
              _active={{ bgColor: "transparent" }} // Remove highlight on click
              _focus={{ boxShadow: "none" }} // Remove outline highlight on focus
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
                mr={2}
              />
              <Text fontWeight="bold" fontSize="xs" mr={2} color="white">
                {" "}
                {/* Set the text color to white */}
                Welcome,
              </Text>
              <Text
                fontWeight="bold"
                fontSize="sm"
                fontStyle="italic"
                color="white"
              >
                {" "}
                {/* Set the text color to white */}
                {user.name}
              </Text>
            </MenuButton>

            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleViewBlockedChats}>
                Blocked Chats
              </MenuItem>{" "}
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                console.log("User object2:", user); // Add this line
                return (
                  <UserListItem
                    key={user._id}
                    user={user} // Pass the entire user object
                    handleFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Blocked Chats Modal */}
      {/* Blocked Chats Modal */}
      <Modal isOpen={isBlockedChatsOpen} onClose={onCloseBlockedChats}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Blocked Chats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display the list of blocked chats */}
            <Box>
              {blockedChats.map((chat) => (
                <Flex
                  key={chat._id}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>{chat.users[1].name}</Text>
                  <Button onClick={() => handleUnblockChat(chat._id)}>
                    Unblock
                  </Button>
                </Flex>
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseBlockedChats}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SideDrawer;
