import { GraphQLError, graphql } from 'graphql';
import { context } from '../context/context'
import { isPropertyAccessOrQualifiedName } from 'typescript';

export const Mutation = {
    addCv: (_parent: never, { input }: any, { pubSub, db }: typeof context) => {
        const { name, age, job, skills, user } = input;
        const id = db.cvs.length + 1;
        const s = db.skills.filter((skill) => skills.includes(skill.id)).map(s => s.id)
        const u = db.users.find((x) => x.id === user);
        if (!u) {
            throw new GraphQLError(`user not found.`);
        }
        const newCV = {
            id,
            name,
            age,
            job,
            skills: s,
            user: u.id,
        };
        db.cvs.push(newCV);
        s.forEach(function (x) {
            const idCvSkill = db.cv_skill.length + 1;
            const newCVSkill = {
                id:idCvSkill,
                idCv:newCV.id,
                idSkill:x
            };
            db.cv_skill.push(newCVSkill);
        })
        // pubSub.publish('CVUpdates',newCV);
        return newCV;
    },
    updateCv: (_parent: never, { input }: any, { pubSub, db }: typeof context) => {
        const { id, name, age, job, skills, user } = input;
        const cvIndex = db.cvs.findIndex((cv) => cv.id === id);
        if (cvIndex === -1) {
            throw new GraphQLError(`CV not found.`);
        }
        const s = db.skills.filter((skill) => skills.includes(skill.id));
        const u = db.users.find((x) => x.id === user);
        if (!u) {
            throw new GraphQLError(`User not found.`);
        }
        const updatedCV = {
            ...db.cvs[cvIndex],
            name: name ?? db.cvs[cvIndex].name,
            age: age ?? db.cvs[cvIndex].age,
            job: job ?? db.cvs[cvIndex].job,
            skills: s.map(x => x.id),
            user: u.id,
        };
        db.cvs[cvIndex] = updatedCV;
        const cvSkill = db.cv_skill.filter((x) => x.idCv=== updatedCV.id);
        cvSkill.forEach(function (x) {
            const Index = db.cv_skill.findIndex((y) => y.id === x.id);
            const deletedCvSkill = db.cv_skill.splice(Index, 1)[0];
        })
        s.forEach(function (x) {
            const idCvSkill = db.cv_skill.length + 1;
            const newCVSkill = {
                id:idCvSkill,
                idCv:updatedCV.id,
                idSkill:x.id
            };
            db.cv_skill.push(newCVSkill);
        })
        //pubSub.publish('CVUpdates',updatedCV);
        return updatedCV;
    },
    deleteCV: (_parent: never, { id }: { id: number }, { db, pubSub }: typeof context) => {
        const cvIndex = db.cvs.findIndex((cv) => cv.id === id);
        if (cvIndex === -1) {
            throw new Error(`CV not found`);
        }
        const deletedCV = db.cvs.splice(cvIndex, 1)[0];
        db.skills.forEach((cvSkill) => {
            if (cvSkill.id === id) {
                const skillIndex = db.skills.findIndex((skill) => skill.id === cvSkill.id);
                if (skillIndex !== -1) {
                    db.skills[skillIndex].cvs = db.skills[skillIndex].cvs.filter((cvId) => cvId !== id);
                }
            }
        });
        db.skills = db.skills.filter((cvSkill) => cvSkill.id !== id);

        const userIndex = db.users.findIndex((x) => x.id === deletedCV.user);
        if (userIndex !== -1) {
            db.users[userIndex].cvs = db.users[userIndex].cvs.filter((cvId) => cvId !== id);
        }
        const cvSkill = db.cv_skill.filter((x) => x.idCv=== deletedCV.id);
        cvSkill.forEach(function (x) {
            const Index = db.cv_skill.findIndex((y) => y.id === x.id);
            const deletedCvSkill = db.cv_skill.splice(Index, 1)[0];
        })
        //pubSub.publish('CVUpdates', deletedCV);
        return deletedCV;
    }
}

