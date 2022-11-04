import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Cart, CartButton, CartItem, CartProps } from '@thoughtindustries/cart'

function Page() {

    const query = gql`
    query {
        CourseById(id: "b6c00977-99b4-4663-9d0e-7c39385cfc49") {
          title
          priceInCents
        }
    }`

    const { data, loading, error } = useQuery(query);

    const mockCartCourseItem = {
      purchasableType: 'course',
      purchasableId: 'course-1',
      title: 'Test course',
      priceInCents: 200,
      quantity: 1,
      instructorAccessPriceInCents: 300,
      isBulkPurchase: false
    };

    const mockCart = {
      items: [
        mockCartCourseItem as CartItem
      ]
    };

  return (
    <div className='flex flex-col'>

        {/* Header */}
        <div className='bg bg-red-200 w-full h-32'>
            <h1 className='t text-4xl'>Header Stuff!</h1>
        </div>

        <Cart checkoutUrl='/checkout'>
          <CartButton/>
        </Cart>

        <div className='flex flex-row'>
            {/* About the course */}
            <div className='bg-blue-100 w-2/3 h-72'>
              <h1>I'm info about the course</h1>
            </div>
            {/* Purchase course window */}
            <div className='bg-yellow-100 w-1/3 h-72 flex flex-col'>
              <h1 className='hover:bg-slate-100 rounded-lg m-2 
              px-3 hover:cursor-pointer bg-slate-200 text-center'
                >Start Course!</h1>
              
              <div className='flex flex-row justify-between'>
                <div>
                  <h1>Enroll Today</h1>
                  <h1>$200</h1>
                </div>
                <h1
                  onClick={() => {
                    console.log("Hey hey hey!")
                  }}
                  className='hover:bg-slate-100 rounded-lg m-2 
                  px-3 hover:cursor-pointer bg-slate-200 text-center'>
                  Enroll now
                </h1>
              </div>

            </div>
        </div>

    </div>
  );
}

export { Page };