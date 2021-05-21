import React from 'react'
import PaymentFailure from "./PaymentFailure"
import PaymentSuccess from "./PaymentSuccess"

export default function ProfileRight() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status")

    console.log(status)

    return (
        <div>
            { status === "true" ? <PaymentSuccess/> : <PaymentFailure/> }
        </div>
    )
}