import { Post, User } from './models/models';
import { getData } from './service/get.service';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <img width="100px" src="/logo-alvaro.svg" alt="logo Alvaro Lopes">
  <h1>User List</h1>
  <ul class="area-user" id="listUser"></ul>
`;

const userList: Promise<User[]> = getData();

userList.then((users: User[]) => {
  console.log(users);

  users.forEach((user: User) => {
    const htmlUser = `
      <li>
      <p>Id: ${user.id}</p>
      <p>name: ${user.name}</p>
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>Adress: ${user.address}</p>
      <p>Phone: ${user.phone}</p>
      <p>Website: ${user.website}</p>
      <p>company: ${user.company}</p>
      <ul class="area-posts" id="posts-${user.id}"></ul>
      </li>
    `;
    
    document.querySelector<HTMLDivElement>('#listUser')!.insertAdjacentHTML('beforeend', htmlUser);

    user.posts?.forEach((post: Post) => {      
      const htmlPost = `
        <li>
        <p>Post ID: ${post.id}</p>
        <p>Post Title: ${post.title}</p>
        <p>Post Body: ${post.body}</p>
        </li>
      `;
      
      document.querySelector<HTMLDivElement>(`#posts-${user.id}`)!.insertAdjacentHTML('beforeend', htmlPost);

    })

  })
})



