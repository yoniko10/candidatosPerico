import React from "react";
import { GetStaticProps } from "next";
import { Product } from "../product/types";
import api from "../product/api";
import {
    Image,
    Button,
    Flex,
    Grid,
    Link,
    HStack,
    Stack,
    Text,
    Box,
    Spacer,
    Center,
    useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

interface Props {
    products: Product[];
}

function parseCurrency(value: number): string {
    return value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
    });
}

const IndexRoute: React.FC<Props> = ({ products }) => {
    const [selectedImage, setSelectedImage] = React.useState<string>(null);

    /* constantes definidas para que funcione el Drawer*/
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    /* custom comment  React.useEffect(() => {
          setTimeout(() => setCart([]), 5000);
      }, [cart]);*/


    return (
        <AnimateSharedLayout type="crossfade">
            <Stack spacing={6}>
                <Grid
                    gridGap={6}
                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                >
                    {products.map((product) => (
                        <Stack
                            padding={4}
                            key={product.id}
                            backgroundColor="gray.100"
                            borderRadius="md"
                        >
                            <Stack spacing={1}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    as={motion.img}
                                    cursor="pointer"
                                    layoutId={product.image}
                                    borderTopRadius="md"
                                    maxHeight={128}
                                    objectFit="cover"
                                    onClick={() => setSelectedImage(product.image)}
                                />
                                <Text fontSize="md">{product.title}</Text>
                                <Text fontSize="sm">{product.description}</Text>
                                <Flex>
                                    <Box p="1" padding={0}>
                                        <Text color="green.500" fontSize="lg" fontWeight="500">
                                            Lista {product.price}
                                        </Text>
                                    </Box>
                                    <Spacer />
                                    <Box p="1" padding={0}>
                                        <Button
                                            padding={2}
                                            paddingRight={0}
                                            isExternal
                                            as={Link}
                                            colorScheme="pink"
                                            size="md"
                                            leftIcon={
                                                <Image src="https://icongr.am/fontawesome/instagram.svg?size=20&color=ffffff" />
                                            }
                                            href={product.instagram}
                                            mr="4"
                                            borderRadius="full"
                                        ></Button>
                                        <Button
                                            marginLeft={1}
                                            padding={2}
                                            paddingRight={0}
                                            isExternal
                                            as={Link}
                                            colorScheme="facebook"
                                            size="md"
                                            leftIcon={
                                                <Image src="https://icongr.am/fontawesome/facebook.svg?size=20&color=ffffff" />
                                            }
                                            href={product.facebook}
                                            borderRadius="full"
                                        ></Button>
                                    </Box>
                                </Flex>
                                <Center>
                                <Button onClick={onOpen} colorScheme="primary" padding="auto"  size="sm" width="xs">
                                    Los voto
                </Button>
                                </Center>
                                

                                <Modal onClose={onClose} isOpen={isOpen} isCentered>

                                    <ModalContent>
                                        <ModalHeader>Elecciones Perico 2021</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Button leftIcon={
                                    <Image src="https://icongr.am/fontawesome/pie-chart.svg?size=20&color=ffffff" />
                                } as={Link} colorScheme="blue" target="_blank" href="https://forms.gle/ZJUVKJh7aeigZXnK9" bg="#1A365D">Contestá la encuesta</Button>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onClose}>Cerrar</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Stack>
                        </Stack>
                    ))}
                </Grid>
                <AnimatePresence>
                    {
                        <Flex
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            as={motion.div}
                            alignItems="center"
                            bottom={4}
                            justifyContent="center"
                            position="sticky"
                        >
                            <Button
                                leftIcon={
                                    <Image src="https://icongr.am/fontawesome/pie-chart.svg?size=20&color=ffffff" />
                                }
                                ref={btnRef}
                                colorScheme="blue"
                                onClick={onOpen}
                                bg="#1A365D"
                            >
                                Encuesta
            </Button>
                        </Flex>}
                </AnimatePresence>
            </Stack>
            <AnimatePresence>
                {selectedImage && (
                    <Flex
                        key="backdrop"
                        alignItems="center"
                        as={motion.div}
                        backgroundColor="rgba(0,0,0,0.5)"
                        justifyContent="center"
                        layoutId={selectedImage}
                        left={0}
                        position="fixed"
                        top={0}
                        height="100%"
                        width="100%"
                        onClick={() => setSelectedImage(null)}
                    >
                        <Image key="image" src={selectedImage} />
                    </Flex>
                )}
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const products = await api.list();

    return {
        revalidate: 10,
        props: {
            products,
        },
    };
};

export default IndexRoute;
