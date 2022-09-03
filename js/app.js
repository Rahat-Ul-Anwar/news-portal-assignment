
// load News Category 

const loadNewsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => disPlayNewsCategory(data.data.news_category));
    
    
}
// display News Category 
const disPlayNewsCategory = categories => {
    
    const categoryName = document.getElementById('category-name');
    categories.forEach(category => {
        
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.classList.add('mx-3');
        li.innerHTML = `<a class="nav-link" aria-current="page" href="#">${category.category_name}</a>`;
        categoryName.appendChild(li);

})
     
}


loadNewsCategory();