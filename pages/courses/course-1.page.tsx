import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Cart, CartButton, CartItem, CartProps, AddToCartButton, EcommItemType } from '@thoughtindustries/cart'

/* 

The course detail page is on /courses/course-1
The course actually starts at learn/course/crypto-101/what-is-crypto/crypto-explained
Checkout page is: https://jackanticosandbox.thoughtindustries.com/orders?cart=%5B%7B%22purchasableId%22%3A%22b6c00977-99b4-4663-9d0e-7c39385cfc49%22%2C%22purchasableType%22%3A%22course%22%2C%22quantity%22%3A1%2C%22isBulkPurchase%22%3Afalse%2C%22priceInCents%22%3A20000%7D%5D
Our checkout page is: https://jackanticosandbox.thoughtindustries.com/checkout?cart=%5B%7B%22purchasableId%22%3A%22b6c00977-99b4-4663-9d0e-7c39385cfc49%22%2C%22purchasableType%22%3A%22course%22%2C%22quantity%22%3A1%2C%22isBulkPurchase%22%3Afalse%2C%22priceInCents%22%3A20000%7D%5D
*/

function Page() {

    const [language, setLanguage] = useState("en");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState(0)
    const [hasAccess, setHasAccess] = useState(false)

    const query = gql`
    query {
        CurrentUser {
          lang
        }
        CourseById(id: "b6c00977-99b4-4663-9d0e-7c39385cfc49") {
          title
          priceInCents
          courseGroup {
            description
            asset
          }
        }
        UserContentItems {
          id
        }
    }
    `

    const { data, loading, error } = useQuery(query);

    if (data) {

      console.log(data)
      useEffect(() => {
        setLanguage(data.CurrentUser.lang)
        setTitle(data.CourseById.title)
        setPrice(data.CourseById.priceInCents)
        setDescription(data.CourseById.courseGroup.description)
        setImageUrl(data.CourseById.courseGroup.asset)
        let courses = data.UserContentItems
        for (let i = 0; i < courses.length; i++) {
          if (courses[i].id === "b6c00977-99b4-4663-9d0e-7c39385cfc49") {
            setHasAccess(true)
          }
        }
      }, [])
    } else if (error) {
      console.log("Error")
      console.log(error)
    }

    let currencySign = "$"
    let currencyCode = "USD"

    if (language == "en") {
      currencySign = "£"
      currencyCode = "GBP"
    } else if (language == "germ") {
      currencySign = "€"
      currencyCode = "EUR"
    } else if (language == "ja") {
      currencySign = "¥"
      currencyCode = "JPY"
    }

    let startButton;
    if (hasAccess) {
      startButton = <h1 
        className='hover:bg-slate-100 rounded-lg mt-10 w-3/5 hover:cursor-pointer bg-slate-200 text-center text-2xl'
        onClick={() => {
          window.location.href = "https://jackanticosandbox.thoughtindustries.com/learn/course/course-32/american-cities/lesson-1-boston"
        }}
        >Start Course!
      </h1>
    }

  return (
    <div className='flex flex-col h-screen bg-slate-200'>

        {/* Header */}
        <div className='w-full h-32 bg-slate-200 text-center pt-10 border-b-4 border-black'>
            <h1 className='t text-4xl'>Course Catalog: {title}</h1>
        </div>

        <div className='flex flex-row'>
            {/* About the course */}
            <div className='bg-slate-200 w-3/5 px-24 pt-6'>
              <h1 className='text-3xl'>{title}</h1>
              <h1 className='text-xl'>{description}</h1>
              <img
                  src={imageUrl}
                  />
            </div>

            {/* Purchase course window */}
            <div className='w-2/5 flex flex-col h-screen border-l-2 border-black'>
              <div className='b bg-slate-50 m-4 rounded-lg mt-20'>
                <div className='flex flex-row justify-center'>
                  { startButton }
                </div>
                
                <div className='flex flex-row justify-between mt-8'>

                  
                  <div className='text-xl ml-4'>
                    <h1>Enroll Today:</h1>
                    <h1>{currencySign}{price / 100}</h1>
                  </div>
                    
                

                  <Cart checkoutUrl='/orders' currencyCode={currencyCode}>
                    <div className='flex flex-col text-xl mr-8'>
                      <AddToCartButton
                        purchasableType={EcommItemType.Course}
                        purchasable={{
                          id: "b6c00977-99b4-4663-9d0e-7c39385cfc49", 
                          priceInCents: price,
                          name: title
                          // asset
                          // where can I find PurchasableItem type defintion??
                        }}
                      >
                        Add to Cart
                      </AddToCartButton>
                      <CartButton/>
                    </div>
                  </Cart>
                </div>
              </div>

            </div>
        </div>

    </div>
  );
}

export { Page };