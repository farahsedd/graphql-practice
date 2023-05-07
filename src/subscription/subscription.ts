import { context } from "../context/context";

export const Subscription = {
    CVUpdates: {
        subscribe: (parent:any, args:any, { pubSub }: typeof context) => pubSub.subscribe("CVUpdates"),
        resolve: (payload:any) => { return payload; },
    }
}