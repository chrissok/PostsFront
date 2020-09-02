const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const postDOM = document.querySelector('.posts');

const API_URL = "https://lucky-chatter-sponge.glitch.me/posts";

loading.style.display = '';

listAllPosts()

form.addEventListener('submit', (e) =>{
    e.preventDefault();
   const formData = new FormData(form);

   const name = formData.get('name');
   const content = formData.get('content');

   const post = {
       name,
       content
   }

   form.style.display = 'none';
   loading.style.display = '';
   
   fetch(API_URL,{
       method: 'POST',
       body: JSON.stringify(post),
       headers:{
           'content-type' : 'application/json'
       }
   }).then(response => response.json())
   .then(createdPost => {
       form.reset();
       form.style.display = '';
       listAllPosts();
   })
})

function listAllPosts(){
    postDOM.innerHTML = '';
    fetch(API_URL)
    .then(response => response.json())
    .then(posts =>{
        posts.reverse();
        posts.forEach(post =>{
            const div = document.createElement('div');
            const header = document.createElement('h3');

            header.textContent = post.name;
            const  content = document.createElement('p');
            content.textContent = post.content;

            const date = document.createElement('small');
            date.textContent = new Date(post.created_at)

            div.appendChild(header);
            div.appendChild(content);
            div.appendChild(date);

            postDOM.appendChild(div);
        })
        loading.style.display = 'none'; 
    })
}