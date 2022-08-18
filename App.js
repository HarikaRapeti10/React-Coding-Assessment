
/*

Create a react app that:

-> populates n number of quotes from https://strangerthings-quotes.vercel.app/api/quotes/n 
example: https://strangerthings-quotes.vercel.app/api/quotes/5
 (credit: https://github.com/shadowoff09/strangerthings-quotes)
-> parses the json by author name
-> create a button - one for each author - and when button is clicked all  quotes belonging to that author are displayed
-> use your own CSS 


https://github.com/shadowoff09/strangerthings-quotes 

*/

import React, { useState, useEffect } from 'react';
const title = "React App";

function App() {

    const[authorQuotes,setAuthorQuotes]= useState({})
    const[authorList,setAuthorList]=useState([])
    const[quotesList,setQuoteList]=useState([])
    var quotesObj = {}


useEffect(() => {
  async function fetchData() {
    // You can await here
     await fetch('https://strangerthings-quotes.vercel.app/api/quotes/5')
    .then(res =>res.json())
    .then(res => {
        // console.log('res', res)
        res.map((data)=>{
          if(quotesObj[data.author]){
            quotesObj[data.author].push(data.quote)
          }else{
            quotesObj[data.author] = [data.quote];
          }
        });
    })

    setAuthorQuotes(quotesObj);
    setAuthorList(Object.keys(quotesObj))


  }
  fetchData();
}, []); 

   function findQuotes(id){
    console.log(id,authorQuotes)
     var dummy = authorQuotes[id]
     setQuoteList(dummy)
    }
    return (
        <div >  
                {authorList.map(author=>{
             
                    return(
                      <div>
                        <button  key={author} value={author}  onClick={() => findQuotes(author)}>{author}</button>                   
                      </div>
                    )
                 })
                }
    
              {quotesList? quotesList.map(quote=>{
                      return(
                         <li key={quote}>{quote}</li>
                      )
                 }) : null
              }
             
      
        </div>
    );
}


export default App;
