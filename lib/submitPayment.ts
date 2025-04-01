"use server";

import { SquareClient, SquareEnvironment, SquareError } from "square";
import { randomUUID } from "crypto";

(BigInt.prototype as any).toJSON = function () {
    return Number(this); // 👈 важно: именно число, а не строка
};

const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment: SquareEnvironment.Production,
});
const locationID = process.env.SQUARE_LOCATION_ID!;

interface SubmitPaymentProps {
    amount: number;
}

export async function submitPayment({ amount }: SubmitPaymentProps) {
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
        return order;
    } catch (error) {
        if (error instanceof SquareError) {
            console.error("Error occurred: " + error.message);
        } else {
            console.error("Unexpected error occurred: ", error);
        }
    }
}