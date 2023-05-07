import { sign } from "crypto";

interface Cv {
    id: number,
    name: string;
    age: string;
    job: string;
    skills: number[];
    user: number;
}

interface Skill {
    id: number,
    designation: string;
    cvs: number[];
}

interface User {
    id: number,
    name: string;
    email: string;
    role: Role;
    cvs: number[];
}

enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}



const users: User[] = [
    {
        id: 1,
        name: "user 1",
        email: "user1@gmail.com",
        role: Role.ADMIN,
        cvs: []
    },
    {
        id: 2,
        name: "user 2",
        email: "user2@gmail.com",
        role: Role.USER, cvs: []
    },
    {
        id: 3,
        name: "user 3",
        email: "user3@gmail.com",
        role: Role.USER, cvs: []
    },
];

const skills: Skill[] = [
    { id: 1, designation: "skill1", cvs: [] },
    { id: 2, designation: "skill2", cvs: [] },
    { id: 3, designation: "skill3", cvs: [] },
    { id: 4, designation: "skill4", cvs: [] },
]

const cvs: Cv[] = [
    {
        id: 1,
        name: "cv1",
        age: "21",
        job: "job1",
        skills: [skills[0].id, skills[3].id],
        user: users[0].id,
    },
    {
        id: 2,
        name: "cv2",
        age: "21",
        job: "job2",
        skills: [skills[1].id],
        user: users[1].id,
    },
    {
        id: 3,
        name: "cv3",
        age: "21",
        job: "job3",
        skills: [skills[2].id],
        user: users[2].id,
    },
];

skills[0].cvs.push(cvs[0].id);
skills[1].cvs.push(cvs[1].id);
skills[2].cvs.push(cvs[2].id);
skills[3].cvs.push(cvs[0].id);

users[0].cvs.push(cvs[0].id);
users[1].cvs.push(cvs[1].id);
users[2].cvs.push(cvs[2].id);

export const db = {
    skills,
    users,
    cvs,
};