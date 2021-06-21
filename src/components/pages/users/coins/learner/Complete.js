import React from 'react'
import PaymentFailure from "./PaymentFailure"
import PaymentSuccess from "./PaymentSuccess"

export default function Complete() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status")

    return (
        <div>
            { (status === "true" || status === "success")  ? <PaymentSuccess/> : <PaymentFailure/> }
        </div>
    )
}