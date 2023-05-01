import React , {useState, useEffect} from 'react'
import { Box, Container, RadioGroup, Radio, HStack, VStack,Text, Image, Stat, StatLabel,StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import Loader from './Loader';
import {useParams} from "react-router-dom"
import {server} from "../index"
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import  Chart  from "./Chart";

const CoinsDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h")
  const [chartArray, setChartArray] = useState()
  const params = useParams();

  const currencySymbol = currency ==="inr"?"₹" : currency ==="eur" ? "€":"$"


  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (key) => {

    switch (key) {
      case "24h": 
      setDays("24h");
      break;

      case "7d": 
      setDays("7d");
      break;

      case "14d": 
      setDays("14d");
      break;

      case "30d": 
      setDays("30d");
      break;

      case "60d": 
      setDays("60d");
      break;

      case "200d": 
      setDays("200d");
      break;

      case "365d": 
      setDays("365d");
      break;

      case "max": 
      setDays("max");
      break;
        
    
      default:
        setDays("24h");


        break;
    }
  }


  useEffect(()=> {

    const fetchCoin = async ()=> {
        try {
            const {data} = await axios.get(`${server}/coins/${params.id}`)

            /**we write data:chartData because we already mentioned data above and cannot name it again so with ":" we can name anything and use it as different data variables */

            const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
           

console.log(chartData);
            setCoin(data);
            setChartArray(chartData.prices)
            
            setLoading(false);

        } catch (error) {
            setError(true);
            setLoading(false);
        }
    
    }

fetchCoin()
}, [params.id,currency, days]);


if(error) return <ErrorComponent message={"Error while fetching Coin"} />



  return (
    <Container maxW={"container.xl"}>

      {
        loading ? ( <Loader /> ) : (

          <>
            <Box borderWidth={"1"} width={"full"}>
              <Chart arr={chartArray} currency={currencySymbol} days={days}/>
            </Box>

    {/**btn where the date/year which will let us show the past data till current as selected. */}
    <HStack p={"4"} overflowX={"auto"}>

      {
      btns.map((i) => (
        <Button key={i} backgroundColor={"gray.100"} onClick={()=> switchChartStats(i)} >{i}</Button>
      ))

      }
    </HStack>

    <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
{/** here at onChange since this radio group is from chakaraUI we gave it setCurrency instead of e.target.value  */}
        <HStack spacing={"4"}>

            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
            
        </HStack>
    </RadioGroup>


    <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>

      <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>

        Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
      {/**Here split("G")[0]  means that all the text before G will be 0 Index and after G will be 1st Index, Since we need to show time before "G" we took the 0 index by using split. */}
      </Text>

      <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />


      <Stat>

        <StatLabel>{coin.name}</StatLabel>
        <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
        <StatHelpText>
          <StatArrow  type={coin.market_data.price_change_percentage_24h > 0 ? "increase": "decrease"}/>
          {/**Here we set the condition for statarrow so that if % gets increased then statarrow chnages to green if decreased then 0 then stat arrow changed to red */}



          {coin.market_data.price_change_percentage_24h}%
        </StatHelpText>
      </Stat>

      <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
        {
          `#${coin.market_cap_rank}`
        }
      </Badge>


      <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}  />


      <Box w={"full"} p={"4"} >
        <Item title={"Max Supply"} value={coin.market_data.max_supply} />

        <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />

        <Item title={"Market Captial"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />

        <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />

        <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />




      </Box>

    </VStack>
          </>
        )
      }

    </Container>
  )
}


const CustomBar = ({high, low}) => (
  <VStack w={"full"}>
    <Progress value={"50"} colorScheme={"teal"} w={"full"}  borderRadius={"3px"} backgroundColor={"gray.200"}/>

    <HStack justifyContent={"space-between"} w={"full"} >
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24Hr Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
)




const Item = ({title, value}) => (

  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>


)

export default CoinsDetails;