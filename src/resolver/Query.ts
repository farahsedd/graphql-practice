import { db } from "../database/db";
import { GraphQLError } from "graphql";
import { context } from "../context/context";


export const Query = {
    hello: (parent: any, args: any, context: any, info: any) => {
        return `Hello ${args.name || 'World'}`;
    },
    getAllCvs: (parent: any, args: any, { db }: typeof context, info: any) => {
        return db.cvs
    },
    getCvById: (parent: any, args:any , { db }: typeof context, info: any) => {
        const {id } = args;
        return db.cvs.find((cv) => cv.id === id)
    },
    getInfoByCv: (parent:any, args: any, { db }: typeof context, info: any) => {
        const {id } = args;
        const user = db.users.find((user) => user.id === parent.user);
        if (!user) {
            throw new Error(`User with ID ${parent.userId} not found`);
        }
        const skills = db.skills.filter((skill) => {
            return skill.cvs.some((cv) => cv === parent.id);
        });
        return { user, skills };
    },


    // users: (parent, args, context:{ db }, info) => {
    //     return db.users
    // },
    // getUser: (parent, { id }, context:{ db }, info) => {
    //     return db.users.find((user) => user.id === id)
    // }
    // ,
    // skills: (parent, args, context:{ db }, info) => {
    //     return db.skills
    // },
    // getSkill: (parent, { id }, context:{ db }, info) => {
    //     return db.skills.find((skill) => skill.id === id)
    // }
}