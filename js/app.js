
//************************** */ load News Category ****************************

const loadNewsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => disPlayNewsCategory(data.data.news_category))
        .catch(error => console.log(error))
       
    
}
// ****************display News Category **************************
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


//******************************load single news using id***********************
const newsContainer = document.getElementById('news-container');
const loadingNews = categoryId => {
    //clear body 
    newsContainer.textContent = '';

    // start loading spinner
    toggleSpinner(true);


    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
     
}

 
   


const displayNews = (allNews) => {

   
//************************news found or not section***********************

    console.log(allNews);

    const newsFound = document.getElementById('news-found');
    const newsText = newsFound.innerText;
    const newsNum = parseInt(newsText);
    newsFound.innerText = allNews.length ? allNews.length : "No news found";

   // sorting the total views
    
    allNews.sort(function (a, b) {
        return b.total_view - a.total_view;
    });
    
   
    allNews.forEach(news => {

    
        // console.log(news)
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('col-sm-3');
        containerDiv.innerHTML = `
        <img class="img-fluid img-size" src="${news.image_url}" alt="" srcset="">
        
        `;
        
        const containerDiv2 = document.createElement('div');
        containerDiv2.classList.add('col-sm-9');
        containerDiv2.innerHTML = `
            <h5>${news.title}</h5>
            <p> ${news.details.slice(0, 300)}...</p>
            
         `;


        
        const div1 = document.createElement('div');
        div1.classList.add("row", "d-flex", "align-items-center");
        
        const div2 = document.createElement('div');
        div2.classList.add('col-sm-3');

        const div3 = document.createElement('div');
        div3.classList.add("d-flex", "align-items-center");
        div3.innerHTML = `<img class="img-fluid thumb-img" src="${news.thumbnail_url}">`;
         
        const div4 = document.createElement('div');
        div4.classList.add("mx-2");

        div4.innerHTML = `
        
        <small><strong>${news.author.name ? news.author.name : "no name found"}</strong></small>
        <br>                               
        <small> ${news.author.published_date ? news.author.published_date : "no date found"} </small> 
                            
        `;
        div3.appendChild(div4);

        div2.appendChild(div3);
        div1.appendChild(div2);

        const div5 = document.createElement('div');
        div5.classList.add('col-sm-3');

        div5.innerHTML = ` 
                <i class="fa-regular fa-eye"></i>
                ${news.total_view ? news.total_view : "no views found"}
                `;
        div1.appendChild(div5);
         
        
            
        const div6 = document.createElement('div');
        div6.classList.add('col-sm-3');

        div6.innerHTML = `
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        `;
        
        div1.appendChild(div6);
            
        // console.log(div1)
            
        const div7 = document.createElement('div');
        div7.classList.add('col-sm-3');

    //*************************** News detail using Show more button click*********************
        div7.innerHTML = `
        <button onclick="loadNewsDetails('${news._id}')" class="btn btn-danger px-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show More</button>
     
        `;
        
        div1.appendChild(div7);

        containerDiv2.appendChild(div1);
       
            
     
        const rowDiv = document.createElement('div');
        rowDiv.classList.add("row", "m-4"); 
        rowDiv.style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
      
        rowDiv.style.padding = "10px";
        rowDiv.appendChild(containerDiv);
        rowDiv.appendChild(containerDiv2);
        newsContainer.appendChild(rowDiv);
    })
    
     // loading spinner stop
 
    toggleSpinner(false);
}

const loadNewsDetails = (newsId) => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        
        .then(data => displayNewsDetails(data.data[0])); 
    
    
}


const displayNewsDetails = (newsDetails) => {

    // console.log(newsDetails)

// ***********************modal section *************************
    const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerText = newsDetails.title;
    // console.log(modalTitle)

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
                               <img class="img-fluid" src=" ${newsDetails.image_url}"/>
                               <p> Author Name:<strong> ${newsDetails.author.name ? newsDetails.author.name :"no name found"}</strong> </p>
                               <p>${newsDetails.details}</p>
                               <p> Published date: ${newsDetails.author.published_date ?newsDetails.author.published_date : "no published date found"}</p>
                               
                               <br/> <br/>
                               <p> Total views: ${newsDetails.total_view} </p>
                               `
}


// ********************************toggle spinner*************************

const toggleSpinner = (isLoading) => {

    const sectionLoader = document.getElementById('loader');
    if (isLoading) {
        sectionLoader.classList.remove('d-none');
    }

    else {
        
        sectionLoader.classList.add('d-none');
   }


}

//Calling Main Function

loadNewsCategory();