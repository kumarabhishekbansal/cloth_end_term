import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Box } from '@chakra-ui/react';
import '../payment.css';

import CheckoutForm from "../components/ChackoutForm";
const REACT_APP_STRIPE_PK='pk_test_51N3Kg0SFDKU1xx9ELnO8wf5GAhS3DgTPVg49zWpbBGLbewzSuYDdnApJhW4HyiZDowekitP5FaIqPIZRjWYl24dV00QDKMro6s'
const stripePromise = loadStripe(REACT_APP_STRIPE_PK);

let REACT_APP_API_BASE_URL='http://localhost:4000'
const Payment = () => {
    console.log("stripePromise : ",stripePromise);
    const [clientSecret, setClientSecret] = useState("");
    const { state } = useLocation();

    useEffect(() => {

        fetch(`${REACT_APP_API_BASE_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: state.price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
            console.log("payment ",clientSecret);
    }, [state]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Box className="payment" display='flex' justifyContent='center' p={{ base: 0, md: 5 }} >
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm address={state.address} clientsecret={clientSecret} />
                </Elements>
            )}
        </Box>
    )
}

export default Payment;