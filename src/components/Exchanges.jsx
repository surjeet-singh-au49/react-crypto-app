import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';


const Exchanges = () => {  
    
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    


    useEffect(()=> {

        const fetchExchanges = async ()=> {
            try {
                const {data} = await axios.get(`${server}/exchanges`)


                setExchanges(data);
                console.log(data)
                setLoading(false);

            } catch (error) {
                setError(true)
                setLoading(false)
            }
        
        }

fetchExchanges()
    }, []);

    if(error) return <ErrorComponent message={"Error while fetching Exchanges"} />

  return (
    <Container maxW={"container.xl"}>

        {loading ? ( <Loader /> ) : (<>
        
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {/*We need to pass the key for every map function we use and the key should be unique*/}
            {
                exchanges.map((i)=>(

                   <ExchangeCards key={i.id} name= {i.name} img = {i.image} rank = {i.trust_score_rank} url = {i.url} /> 
                   
                   
                ))
                }

        </HStack>

        
        
        </>
        )}

    </Container>
  )
};

const ExchangeCards = ({name , img, rank, url}) => {
    /*1. Instead of Link tag we will use anchor tag because we are rendering data from an API of another site url
     2. IN target attribute we use "blank" instead of "_blank" this will once open a new tab on clicking the url after that another url will open in the same tab instead of opening a new tab everytime.*/

    return (
        
      <a href={url} target={"blank"}>
  
          <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"} css={{
            "&:hover":{
                transform: "scale(1.1)"
            }
          }}>
              <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchanges"} />
  
              <Heading size={"md"} noOfLines={1}>{rank}</Heading>
  
              <Text noOfLines={1}>{name}</Text>
          </VStack>
  
      </a>
  
    )
  }

/*We create a ExchangeCard component to show all the data in Exchanges where we map the data and show it on the screen.*/




export default Exchanges;