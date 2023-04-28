// https://random-data-api.com/documentation

// const usersAPIParams = new URLSearchParams({
//     size: 2,
//     param2: true
// })
//
// const URL = `https://random-data-api.com/api/v2/users?${usersAPIParams.toString()}`
// const button = document.querySelector('button');
// const usersArea = document.querySelector('.users');
//
// button.addEventListener('click', () => {
//     makeRequest(URL, loadUsersHandler)
// })
//
// function loadUsersHandler (data) { // [{}, {}, ...]
//     console.log(data)
//     data.forEach(userData => { // {}
//         const { email, first_name } = userData;
//         const userCard = `
// <h3>${first_name}</h3>
// <h4>${email}</h4>
// `;
//         usersArea.insertAdjacentHTML('beforeend', userCard);
//     })
// }
//
// function makeRequest (url, handler) {
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error happened, code: ${response.status}`)
//             }
//             return response.json();
//         })
//         .then(handler)
//         .catch(error => {
//             console.log(error.message)
//         })
// }

// https://github.com/typicode/json-server#paginate
// https://jsonplaceholder.typicode.com/posts - base url (posts)
let _page = 0;
const _limit = 3;

const buttonTop = document.querySelector('.top-button');
const buttonDown = document.querySelector('.down-button');
const postsArea = document.querySelector('.posts');
const currentPageMarkup = document.querySelector('.page');

const buttonDownHandler = () => {
    console.log(_page)
    _page += 1;
    const usersAPIParams = new URLSearchParams({
        _page,
        _limit
    })
    const URL = `https://jsonplaceholder.typicode.com/posts?${usersAPIParams.toString()}`
    makeRequest(URL, loadPostsHandler)
    updatePage()
}

const buttonTopHandler = () => {
    if (_page <= 1) return;
    _page -= 1;
    console.log(_page)
    const usersAPIParams = new URLSearchParams({
        _page,
        _limit
    })
    const URL = `https://jsonplaceholder.typicode.com/posts?${usersAPIParams.toString()}`
    makeRequest(URL, loadPostsHandler)
    updatePage()
}

buttonTop.addEventListener('click', buttonTopHandler);
buttonDown.addEventListener('click', buttonDownHandler);

function updatePage () {
    currentPageMarkup.innerText = _page.toString();
}

function loadPostsHandler (data) { // [{}, {}, ...]
    postsArea.innerHTML = '';
        data.forEach(postData => { // {}
        const { title, body, id } = postData;
        const postCard = `
<h3>${id}. ${title}</h3>
<h4>${body}</h4>
`;
            postsArea.insertAdjacentHTML('beforeend', postCard);
    })
}

function makeRequest (url, handler) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error happened, code: ${response.status}`)
            }
            return response.json();
        })
        .then(handler)
        .catch(error => {
            console.log(error.message)
        })
}
