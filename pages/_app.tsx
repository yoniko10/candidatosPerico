import React from "react";
import {
  ChakraProvider,
  Divider,
  Box,
  Heading,
  Text,
  Image,
  Container,
  VStack,
  Button,
  Link,
  Flex,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          borderRadius="sm"
          backgroundColor="white"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image
              alt="Escudo de Jujuy"
              sizes="sm"
              borderRadius={9999}
              src="https://res.cloudinary.com/yoniko10/image/upload/c_thumb,w_200,g_face/v1622342026/elecciones/escudoPerico_aiaith.png"
            ></Image>
            <Heading>Elecciones Perico</Heading>
            <Text>Conocé las candidaturas</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
        <Container
          centerContent
          borderRadius="sm"
          backgroundColor="white"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={5}
        >
          <Flex>
          <Text fontSize="lg" mr="2">© Sergio Vasquez Omonte 2021</Text>
          <Button
            padding={2}
            paddingRight={0}
            isExternal
            as={Link}
            size="sm"
            colorScheme="pink"
            borderRadius="full"
            leftIcon={
              <Image src="https://icongr.am/fontawesome/instagram.svg?size=16&color=ffffff" />
            }
            href={"https://www.instagram.com/omontesergio/"}
            mr="3"
            bg="#1A365D"
          ></Button>
          <Button
            marginLeft={1}
            padding={2}
            paddingRight={0}
            isExternal
            as={Link}
            colorScheme="blue"
            size="sm"
            bg="#1A365D"
            borderRadius="full"
            leftIcon={
              <Image src="https://icongr.am/fontawesome/linkedin.svg?size=16&color=ffffff" />
            }
            href={"https://www.linkedin.com/in/sergio-vasquezomonte/"}
            mr="3"
          ></Button>
          <Button
            marginLeft={1}
            padding={2}
            paddingRight={0}
            isExternal
            as={Link}
            colorScheme="cyan"
            size="sm"
            bg="#1A365D"
            borderRadius="full"
            leftIcon={
              <Image src="https://icongr.am/fontawesome/link.svg?size=16&color=ffffff" />
            }
            href={"https://linktr.ee/sergiovomonte"}
            mr="3"
          ></Button>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
