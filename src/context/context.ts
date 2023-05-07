import { createPubSub } from '@graphql-yoga/subscription'
import { db } from '../database/db'
 
// 1
// type PubSubChannels = {
//     CVUpdates:any
// }
 
// 2
// const pubSub = createPubSub<PubSubChannels>()
const pubSub = createPubSub()

export const context = {
    db,
    pubSub,
}
