"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent } from 'react'

import { useState } from 'react';

const isValidAmazonProductURL = (url: string) => {
    try{
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname

        if(
            hostname.includes('amazon.com') ||
            hostname.includes('amazon') ||
            hostname.endsWith('amazon')
        ){
            return true;
        }

    }catch(error){
        return false;
    }
}

const Searchbar = () => {

    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        
        const isValidLink = isValidAmazonProductURL(searchPrompt);

        // alert(isValidLink ? 'Valid Link' : 'Invalid Link , Add amazon link')
        if(!isValidLink) return alert('Please provide a valid Amazon Link')

        try{
            setisLoading(true);

            // Scrap out first product
            const product = await scrapeAndStoreProduct(searchPrompt);

        }catch(error){
            console.log(error);
        }finally{
            setisLoading(false)
        }

    }
  return (
    <form 
        className='flex flex-wrap gap-4 mt-12' 
        onSubmit={handleSubmit}
    >
        <input 
            type="text" 
            value={searchPrompt}
            onChange={(e)=>setSearchPrompt(e.target.value)}
            placeholder='Enter product link'
            className='searchbar-input'
        />
        <button 
            type='submit' 
            className='searchbar-btn'
        >
            {isLoading ? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default Searchbar
