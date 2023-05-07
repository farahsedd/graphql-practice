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
    getAllCvSkills:(parent: any, args: any, { db }: typeof context, info: any) => {
        return db.cv_skill
    },
}