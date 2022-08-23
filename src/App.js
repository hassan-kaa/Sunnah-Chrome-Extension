//import { Container , Card } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";


function App() {

  //states
  const [index,setIndex] = useState(()=>{
    const localData= localStorage.getItem("hadith_count") 
    if(localData){
      return parseInt(localData)+1
    } 
  else {
    console.log(localData)
    return 0 
  }}) 
  const [time,setTime]= useState();
  const [hadiths,setHadiths]=useState()

  //fetching hadiths from the api function 
  const getHadiths= async ()=> {
   const response = await fetch("https://ahadith-api.herokuapp.com/api/ahadith/all/ar-tashkeel").catch(err=>console.log(err))
   const data=await response.json()
   setHadiths(data.AllChapters)
   console.log(data.AllChapters)
  }

  //updating time every second
  const refreshTime = ()=>{
     setInterval(()=>{setTime(new Date().toLocaleString())
  },1000)
   
  }

//on next button click 
  const handleNext=()=>{
  setIndex(index=>index+1)
  localStorage.setItem("hadith_count",`${index}`)
  }
//on prev button click 
  const handlePrev=()=>{
    setIndex(index=>index-1)
    localStorage.setItem("hadith_count",`${index}`)
  
  }
    useEffect(()=>{
        localStorage.setItem("hadith_count",`${index}`)
    },[index])

//Fetch hadiths on initial render
  useEffect(()=>{getHadiths()

  },[])
//calling refresh time function 
refreshTime()

  return (
    <MyContainer >
      <img alt="background" src="https://images.squarespace-cdn.com/content/v1/538279a0e4b037295d984647/1624488411685-TUXKV1H3Q50WHCBWLPZP/850_9465.jpeg?format=1500w" />
      <h1> {time}</h1>
      {<Wrapper> 
      <h2>{hadiths ? hadiths[index].Ar_Sanad_1 : ""}</h2>
        <h1>
          {hadiths ? hadiths[index].Ar_Text 
          : ""}
        </h1>
        <span>
        <MyButton onClick={handlePrev}>Previous</MyButton>
        <MyButton onClick={handleNext}>Next</MyButton>
        </span>
  
</Wrapper>
        }
    </MyContainer>
  );
}

export default App;
const MyButton=styled(Button)`
color:white ;
background:rgba(180,180,180) ;
border-radius:8px ;
cursor: pointer;
padding:12px ;
display:flex ;
align-items:center ;
justify-content:center ;
`
 const Wrapper=styled.div`
 width:80% ;
 color:white ;
  background:rgba(180,180,180,0.8) ;
  padding:32px;
  z-index:2 ;
  border-radius:8px ;
  display:flex ;
  flex-direction:column ;
  align-items:center ;
  justify-content:center ;
 `
 const MyContainer = styled.div`
   font-family:"Poppins" ;
 width:100% ;
 height:100vh ;
 display:flex;
 flex-direction:column ;
 align-items:center ;
 justify-content:center ;
 position:relative ;
img{
  object-fit:cover ;
  height:100%;
  width:100%;
  z-index:1;
  position:absolute ;
  left:0 ;
  top:0 ;
}
h1{
  z-index:2 ;
  color:white ;

}
h2{
  color: #EEE ;
}
 `