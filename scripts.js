//Importing data from data.js
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()


// Helper function to create an element

const createElement = (tag, attributes,innerHTML='') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    element.innerHTML = innerHTML;
    return element;
};

// for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
//     const element = document.createElement('button')
//     element.classList = 'preview'
//     element.setAttribute('data-preview', id)

//     element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
        
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//     `

//     starting.appendChild(element)
// }

//Function to render books

const renderBooks = (bookList, container, clear = false, pageNumber =0) => {
    if (clear) container.innerHTML = '';
    const fragment = document.createDocumentFragment();


    bookList.slice(pageNumber * BOOKS_PER_PAGE, (pageNumber + 1) * BOOKS_PER_PAGE).forEach(({ author, id, image, title }) => {
        const bookElement = createElement("button", { class: "preview", "data-preview": id },`
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}
            </div>`);

            fragment.appendChild(bookElement);
    });

    container.appendChild(fragment);
// document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
// document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

// document.querySelector('[data-list-button]').innerHTML = `
//     <span>Show more</span>
//     <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
// `  

// document.querySelector('[data-list-button]').addEventListener('click', () => {
//     const fragment = document.createDocumentFragment()

//     for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
//         const element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)
    
//         element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

//     document.querySelector('[data-list-items]').appendChild(fragment)
//     page += 1
// })

//     document.querySelector('[data-list-items]').appendChild(newItems)
//     document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

//     document.querySelector('[data-list-button]').innerHTML = `
//         <span>Show more</span>
//         <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
//     `

//     window.scrollTo({top: 0, behavior: 'smooth'});
//     document.querySelector('[data-search-overlay]').open = false
// })

     // Update 'Show More' button

     const showMoreButton = document.querySelector('[data-list-button]');
     showMoreButton.disabled = matches.length <= (pageNumber + 1) * BOOKS_PER_PAGE;
     showMoreButton.innerHTML = `
         <span>Show more</span>
         <span class="list__remaining">($ ={Math.max(matches.length - ((pageNumber + 1)* BOOKS_PER_PAGE), 0)})</span>`;
};


// Function to populate dropdowns

const populateDropdown = (dropdown, data, defaultText) => {
    populateDropdown.innerHTML = '';
    const firstOption = createElement("option", {value: "any"}, defaultText);
    dropdown.appendChild(firstOption);

    Object.entries(data).forEach(([id, name]) => {
        const option = createElement("option", { value: id }, name);
        dropdown.appendChild(option);

    });

};


//Function to toggle modals

const toggleModal = (selector, isOpen) => {
    document.querySelector(selector).open = isOpen;
};
 
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.querySelector('[data-settings-theme]').value = 'night'
//     document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//     document.documentElement.style.setProperty('--color-light', '10, 10, 20');
// } else {
//     document.querySelector('[data-settings-theme]').value = 'day'
//     document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//     document.documentElement.style.setProperty('--color-light', '255, 255, 255');
// }

// Function to apply the Theme

const applyTheme = (theme) => {
    document.documentElement.style.setProperty("--color-dark", theme === "night" ? "255, 255, 255" : "10, 10, 20");
    document.documentElement.style.setProperty("--color-light", theme === "night" ? "10, 10, 20" : "255, 255, 255");
};


//     for (const book of books) {
//         let genreMatch = filters.genre === 'any'

//         for (const singleGenre of book.genres) {
//             if (genreMatch) break;
//             if (singleGenre === filters.genre) { genreMatch = true }
//         }

//         if (
//             (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
//             (filters.author === 'any' || book.author === filters.author) && 
//             genreMatch
//         ) {
//             result.push(book)
//         }
//     }

// Function to filter books

const filterBooks = (filter) => {
    return books.filter(book =>{
        let genreMatch = filter.genre === "any" || book.genres.includes(filter.genre);
        let titleMatch = filter.title.trim() === "" || book.title.toLowerCase().includes(filters.title.toLowerCase());
        let authorMatch = filter.author == "any" || book.author === filter.author;
        return genreMatch && titleMatch && authorMatch;

    });
};

// Function to load more books

const loadMoreBooks = () => { 
    page += 1;
    renderBooks(matches, document.querySelector("[data-list-items]"),false,page);
};

// Initial Render

const listItemsContainer = document.querySelector("[data-list-items]");
renderBooks(matches, listItemsContainer);
populateDropdown(document.querySelector("[data-search-genres]"), genres, "All Genres");
populateDropdown(document.querySelector("[data-search-authors]"), authors, "All Authors");
applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? "night" : "day");


// Event Listeners
// document.querySelector('[data-search-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = false
// })
document.querySelector("[data-search-cancel]").addEventListener("click",()=>{
    toggleModal("[data-search-overlay]", false)
});

// document.querySelector('[data-header-search]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = true 
//     document.querySelector('[data-search-title]').focus()
// })

document.querySelector("[data-header-search]").addEventListener("click",()=>{
    toggleModal("[data-search-overlay]", true)
    document.querySelector("[data-search-title]").focus();

});

// document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = false
// })

document.querySelector("[data-settings-cancel]").addEventListener("click",()=>{
    toggleModal("data-settings-overlay", false)
});

// document.querySelector('[data-header-settings]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = true 
// })

document.querySelector("[data-header-settings]").addEventListener("click",()=>{
    toggleModal("[data-settings-overlay]", true);
});

// document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const { theme } = Object.fromEntries(formData)

    
//     document.querySelector('[data-settings-overlay]').open = false
// })
document.querySelector("[data-settings-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    applyTheme(theme);
    toggleModal("[data-settings-overlay]", false);
});


// document.querySelector('[data-list-close]').addEventListener('click', () => {
//     document.querySelector('[data-list-active]').open = false
// })

document.querySelector("[data-list-close]").addEventListener("click",()=>{
    toggleModal("[data-list-active]", false);
});

document.querySelector("[data-list-button]").addEventListener("click", loadMoreBooks);


// document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     const result = []

//     page = 1;
//     matches = result

document.querySelector("[data-search-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const filters = Object.fromEntries(new FormData(event.target));
    matches = filterBooks(filters);
    page = 0;
    renderBooks(matches, listItemsContainer, true, page);
    toggleModal("[data-search-overlay]", false);

});

// document.querySelector('[data-list-items]').addEventListener('click', (event) => {
//     const pathArray = Array.from(event.path || event.composedPath())
//     let active = null

//     for (const node of pathArray) {
//         if (active) break

//         if (node?.dataset?.preview) {
//             let result = null
    
//             for (const singleBook of books) {
//                 if (result) break;
//                 if (singleBook.id === node?.dataset?.preview) result = singleBook
//             } 
        
//             active = result
//         }
//     }
    
//     if (active) {
//         document.querySelector('[data-list-active]').open = true
//         document.querySelector('[data-list-blur]').src = active.image
//         document.querySelector('[data-list-image]').src = active.image
//         document.querySelector('[data-list-title]').innerText = active.title
//         document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
//         document.querySelector('[data-list-description]').innerText = active.description
//     }
// })

// document.querySelector('[data-list-items]').appendChild(starting)

// const genreHtml = document.createDocumentFragment()
// const firstGenreElement = document.createElement('option')
// firstGenreElement.value = 'any'
// firstGenreElement.innerText = 'All Genres'
// genreHtml.appendChild(firstGenreElement)

// for (const [id, name] of Object.entries(genres)) {
//     const element = document.createElement('option')
//     element.value = id
//     element.innerText = name
//     genreHtml.appendChild(element)
// }

// document.querySelector('[data-search-genres]').appendChild(genreHtml)

// const authorsHtml = document.createDocumentFragment()
// const firstAuthorElement = document.createElement('option')
// firstAuthorElement.value = 'any'
// firstAuthorElement.innerText = 'All Authors'
// authorsHtml.appendChild(firstAuthorElement)

// for (const [id, name] of Object.entries(authors)) {
//     const element = document.createElement('option')
//     element.value = id
//     element.innerText = name
//     authorsHtml.appendChild(element)
// }

// document.querySelector('[data-search-authors]').appendChild(authorsHtml)


//     if (result.length < 1) {
//         document.querySelector('[data-list-message]').classList.add('list__message_show')
//     } else {
//         document.querySelector('[data-list-message]').classList.remove('list__message_show')
//     }

//     document.querySelector('[data-list-items]').innerHTML = ''
//     const newItems = document.createDocumentFragment()

//     for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
//         const element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)
    
//         element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `

//         newItems.appendChild(element)
//     }

// Book Preview Click Event

document.querySelector("[data-list-items]").addEventListener("click", (event) => {
    const pathArray = event.composedPath();
    let active = null;

    for (const node of pathArray) {
        if (node?.dataset?.preview) {
            active = books.find(book => book.id === node.dataset.preview);
            break;
        }
    }

    if (active) {
        toggleModal("[data-list-active]", true);
        document.querySelector("[data-list-blur]").src = active.image;
        document.querySelector("[data-list-image]").src = active.image;
        document.querySelector("[data-list-title]").innerText = active.title;
        document.querySelector("[data-list-subtitle]").innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText = active.description;
    }
});
