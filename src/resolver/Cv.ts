import { context } from '../context/context'
import { Skill } from '../database/db'

export const Cv = {
    skills: (parent: any, args: any, { db }: typeof context) => {
        const skills: Skill[] = []
        for (const element of db.cv_skill) {
            if (parent.id === element.idCv) {
                const skill = db.skills.find((skill) => skill.id === element.idSkill);
                if (skill) {
                    skills.push(skill);
                }
            }
        }
        return skills
    },
    user: (parent: any, args: any, { db }: typeof context) => {
        const user = db.users.find((user) => user.id === parent.user);

        if (!user) {
            throw new Error(`User not found`);
        }
        return user;
    }
}