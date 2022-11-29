import { env } from '../env/env';
import { Post, User } from '../models/models';
import fetch from 'cross-fetch';

const api = env.baseApiUrl

export async function getData(): Promise<User[]> {
    let userList: User[] = [];
    let postList: Post[] = [];

    await getUsers().then((users) => {
        userList = users;
    });

    await getPosts().then((posts) => {
        postList = posts;
    });

    return GeneratelistUser(userList, postList);
}

export async function getUsers(): Promise<any> {
    return fetch(`${api}/users`, { method: 'GET' })
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (data) {
            return data
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });
}

export async function getPosts(): Promise<any> {
    return fetch(`${api}/posts`, { method: 'GET' })
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (data) {
            return data
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });
}

export function GeneratelistUser(users: User[], posts: Post[]): User[] {
    const newUsers: any[] = [];

    users.forEach((user: User, index: number) => {
        let newUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            address: `${user.address?.street}, ${user.address?.suite} - ${user.address?.zipcode} ${user.address?.city}`,
            phone: user.phone,
            website: user.website,
            company: user.company?.name,
            posts: []
        }

        newUsers.push(newUser);
        
        posts.forEach((post: Post) => {
            if (user.id === post.userId) {
                const newPost = {
                    id: post.id,
                    title: post.title,
                    body: post.body
                }
                newUsers[index].posts?.push(newPost)
            }
        })
    })

    return newUsers;
}