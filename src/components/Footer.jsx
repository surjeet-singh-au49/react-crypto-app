import { Avatar, Box, Button, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineLinkedin,AiFillInstagram,AiOutlineFacebook} from "react-icons/ai"
import AvatarImg from "../assets/11.png"
const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} minH={"48"} px={"16"} py={["16", "8"]}>

        <Stack direction={["column", "row"]} alignItems={"center"} h={"full"} borderBottom={'2px solid white'} py={"10px"} >

            <VStack w={"full"} alignItems={["center", "flex-start"]} >

                <Text fontWeight={"bold"}>About Us</Text>

                <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center", "left"]} >We are the best Cryto Trading App in India, we provide our guidance at a very reasonable price.</Text>

                <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center", "left"]} >The purpose of this website is solely to display information regarding the products and services available on the CryptoDoctor.com App. It is not intended to offer access to any of such products and services. You may obtain access to such products and services on the CryptoDoctor.com App.</Text>

                
            </VStack>

            <VStack >
                    <Avatar boxSize={"28"} mt={["4", "0"]} name='Surjeet Singh' src={AvatarImg}/>
                    <Text>Our Founder</Text>

                    <HStack w={"full"}  >

                <Heading size={"xs"} textTransform={"uppercase"} textAlign={"center"}>Connect Us:</Heading>

                <Button variant={"link"} colorScheme={"linkedin"} > 
                    <a href="https://www.linkedin.com/in/surjeet-singh-602253181/" target='blank'><AiOutlineLinkedin size={"2.5rem"} /></a>

                </Button>

                <Button variant={"link"} backgroundColor={"#C13584"}  > 
                    <a href="https://www.instagram.com/surjeet_singh1416/" target='blank'><AiFillInstagram size={"2.5rem"} /></a>

                </Button>


                <Button variant={"link"} colorScheme={"blue"} > 
                    <a href="https://www.facebook.com/surjeet.singh.50364592/" target='blank'><AiOutlineFacebook size={"2.5rem"} /></a>

                </Button>

            </HStack>
                </VStack>


                
        </Stack>

        <Text textAlign={"center"} py={"2"}>Copyright ©  2023 CryptoDoctor.com. All rights reserved.</Text>

    </Box>
  )
}

export default Footer