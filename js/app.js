
// load News Category 

const loadNewsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => disPlayNewsCategory(data.data.news_category));
       
    
}
// display News Category 
const disPlayNewsCategory = categories => {

    // console.log(categories);
    const categoryName = document.getElementById('category-name');
    categories.forEach(category => {
        
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.classList.add('mx-3');
        li.innerHTML = `
        <a onclick="loadingNews('${category.category_id}')" class="nav-link" aria-current="page" href="#">${category.category_name}
        </a>
        `;
        categoryName.appendChild(li);

    })
}


//load single news using id

const loadingNews = (categoryId) => {

    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
        .then(res => res.json())
        
        .then(data => displayNews(data.data)); 
     
}

//news found


const newsContainer = document.getElementById('news-container');
 
const displayNews = (allNews) => {
    //news found
    const newsFound = document.getElementById('news-found');
    const newsText = newsFound.innerText;
    const newsNum = parseInt(newsText);
    newsFound.innerText = allNews.length ? allNews.length : "No news found";
    
   
    allNews.forEach(news => {
        
        // const containerDiv = document.createElement('div');
        // containerDiv.classList.add('col-sm-3');
        // containerDiv.innerHTML = `
        // <img src="${news.image_url}" alt="" srcset="">
        
        // `;
        
        
     
        
        
        // const containerDiv2 = document.createElement('div');
        // containerDiv2.classList.add('col-sm-9');
        // containerDiv.innerHTML = `
        // <h3>The best fashion influencers to follow for sartorial inspiration</h3>
        //                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde iste exercitationem officia deleniti doloremque asperiores quos velit voluptatibus iure architecto </p>

        //                 <div class="row d-flex align-items-center">
        //                     <div class="col-sm-3">
        //                         <div class="d-flex align-items-center">
        //                             <img src="images/Rectangle 19.png" alt="" srcset="">
                                    
        //                               <div class="mx-2">
        //                                 <small><strong>Jane Cooper</strong></small>
        //                                 <br>
        //                                 <small>Jan 10, 2022 </small>
        //                               </div>
        //                         </div>
        //                     </div>
        //                     <div class="col-sm-3">
        //                         <i class="fa-regular fa-eye"></i>
        //                         1.5 M
        //                     </div>
        //                     <div class="col-sm-3">
        //                         <i class="fa-regular fa-star"></i>
        //                         <i class="fa-regular fa-star"></i>
        //                         <i class="fa-regular fa-star"></i>
        //                         <i class="fa-regular fa-star"></i>
        //                         <i class="fa-regular fa-star"></i>
        //                     </div>
        //                     <div class="col-sm-3">
        //                        <button class="btn btn-danger px-4">Show More</button>
        //                     </div>
        //                 </div>
        
        // `;

        // const rowDiv = document.createElement('div');
        // rowDiv.classList.add('row');
        // rowDiv.appendChild(containerDiv);
        // rowDiv.appendChild(containerDiv2);
        // newsContainer.appendChild(rowDiv);
    
      })
 
}






loadNewsCategory();