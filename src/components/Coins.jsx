import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text, Button, Radio, RadioGroup} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';



const Coins = () => {  
    
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    /*currency state will help us to fetch the data in inr or in another other curreny if given as initial value*/
    
    const [currency, setCurrency] = useState("inr");


    const currencySymbol = currency ==="inr"?"₹" : currency ==="eur" ? "€":"$"


    const btns = new Array(132).fill(1);

    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    }


    useEffect(()=> {

        const fetchCoins = async ()=> {
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)


                setCoins(data);
                
                setLoading(false);

            } catch (error) {
                setError(true);
                setLoading(false);
            }
        
        }

fetchCoins()
    }, [currency,page]);

    if(error) return <ErrorComponent message={"Error while fetching Coins"} />

  return (
    <Container maxW={"container.xl"}>

        {
        loading ? ( <Loader /> ) : (<>

        {/*This is a Radio group from where the actual data will change as per the selection of the currency */}

<RadioGroup value={currency} onChange={setCurrency} p={"8"}>
{/** here at onChange since this radio group is from chakaraUI we gave it setCurrency instead of e.target.value  */}
    <HStack spacing={"4"}>

            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
            
        </HStack>
</RadioGroup>
        
        
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {/*We need to pass the key for every map function we use and the key should be unique*/}
            {
                coins.map((i)=>(

                   <CoinCards key={i.id} id={i.id} name= {i.name} img = {i.image} symbol = {i.symbol} price = {i.current_price} currencySymbol={currencySymbol} /> 
                   
                   
                ))
                }

        </HStack>

        {/**paginaton component */}

        <HStack w={"full"} overflowX={"auto"} p={"8"} >
            {
                btns.map((item, index)=> (
                
                <Button key={index} bgColor={"blackAlpha.900"} color={"white"} css={{
                    "&:hover":{
                        transform : "scale(1.1)",
                        background: "black"
                    }
                  }} 
                onClick={()=>changePage(index+1)}>

                {index+1}

            </Button>))
            }
        </HStack>
        
        </>
        )
        }

    </Container>
  )
};


const CoinCards = ({id, name, img, symbol, price, currencySymbol = "₹"}) => {

    /*1. Instead of Link tag we will use anchor tag because we are rendering data from an API of another site url
*/

    return (
        
      <Link to={`/coins/${id}`} >
  
          <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"} css={{
            "&:hover":{
                transform: "scale(1.1)"
            }
          }}>
              <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchanges"} />
  
              <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
  
              <Text noOfLines={1}>{name}</Text>
              <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
          </VStack>
  
      </Link>
  
    )
  }

/*We create a ExchangeCard component to show all the data in Exchanges where we map the data and show it on the screen.*/






export default Coins;