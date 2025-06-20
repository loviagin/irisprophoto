"use server";

import { SquareClient, SquareEnvironment, SquareError } from "square";
import { randomUUID } from "crypto";

(BigInt.prototype as any).toJSON = function () {
    return Number(this); 
};

const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment: SquareEnvironment.Sandbox,
});
const locationID = process.env.SQUARE_LOCATION_ID!;

interface SubmitPaymentProps {
    amount: number;
    sourceId: string;
}

export async function submitPayment({ amount, sourceId }: SubmitPaymentProps) {
    try {
        const idempotencyKey = randomUUID();
        const order = await client.orders.create({
            idempotencyKey: idempotencyKey,
            order: {
                locationId: locationID,
                lineItems: [
                    {
                        name: "Gift certificate for Iris Pro Photo",
                        quantity: "1",
                        basePriceMoney: {
                            amount: BigInt(amount),
                            currency: "USD"
                        }
                    },
                ],
            },
        });

        if (order.order?.id) {
            const payment = await client.payments.create({
                sourceId: sourceId,
                amountMoney: {
                    amount: BigInt(amount),
                    currency: "USD"
                },
                orderId: order.order.id,
                locationId: locationID,
                idempotencyKey: randomUUID()
            });

            console.log("Payment result:", JSON.stringify(payment, null, 2));

            if (payment.payment?.status === 'COMPLETED') {
                console.log("Payment completed successfully");
                return {
                    order: {
                        ...order.order,
                        state: 'COMPLETED'
                    }
                };
            } else {
                console.error("Payment not completed:", payment.payment?.status);
                return {
                    order: {
                        ...order.order,
                        state: payment.payment?.status || 'FAILED'
                    }
                };
            }
        }

        return order;
    } catch (error) {
        if (error instanceof SquareError) {
            console.error("Error occurred: " + error.message);
        } else {
            console.error("Unexpected error occurred: ", error);
        }
        throw error;
    }
}