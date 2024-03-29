import { Avatar, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/LogoHeader.svg";

const Navbar = () => {
  const buttonStyling = {
    variant: "link",
    colorScheme: "stoneGray",
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    size: "lg",
  };

  return (
    <Flex
      borderBottom="2px solid #D6D6D6"
      alignItems="center"
      px={2}
      py={1}
      gap={5}
      height={16}
    >
      <Link to=".">
        <Image src={Logo} w={200}></Image>
      </Link>
      <Spacer />
      <Button {...buttonStyling} as={Link} to=".">
        Home
      </Button>
      <Button {...buttonStyling} as={Link} to="task-manager">
        Task Manager
      </Button>
      <Button {...buttonStyling} as={Link} to="help">
        Help
      </Button>
      <Button {...buttonStyling} as={Link} to="settings">
        Settings
      </Button>
      <Avatar
        name="User"
        src="https://imgpile.com/images/GUOnOa.png"
        as={Link}
        to="profile"
      />
    </Flex>
  );
};

export default Navbar;
