console.log("Content4");

function create_popup(nyt_data, tweet) {
    console.log("Creating Popup");
    let data = nyt_data['data'];

    if (data.length == 0) {return false;}

    console.log("Tweet");
    console.log(tweet);

    let width = tweet.offsetWidth;
    let height = tweet.offsetHeight;

    let hover_box = document.createElement('DIV');
    console.log("Width, Height: " + width + ", " + height);
    
    hover_box.classList.add('hover-box');

    let aspect_ratio = Math.min(tweet.offsetWidth, tweet.offsetHeight);
    
    for (let i = 0; i < data.length; i++) {
        article_data = data[i];
        let web_url = article_data['web_url'];
        let image_link = article_data['image_link'];
        //let abstract = article_data['abstract'];
        let headline = article_data['headline'];
        let article_div = document.createElement('DIV');
        article_div.classList.add('article');
        article_div.innerHTML = `
            <a href="${web_url}" target="_blank" rel="noopener noreferrer">
                <img src = "${image_link}" class="article-image">
                <div class="article-heading">
                    ${headline}
                </div>
            </a>
        `;
        hover_box.appendChild(article_div);
    }
    hover_box.style.width = '500px !important';
    hover_box.style.height = '400px !important';
    
    return hover_box;
}

function addMissInformationAction() {
    console.log("Main Function");
    let tweets = document.querySelectorAll('article');

    for (let i = 0; i < tweets.length; i++) {
        let nyt_data;

        let result;

        let tweet = tweets[i];

        if (tweet.querySelector('div[data-id="miss_information_element"]')) {continue;}

        let tweet_text = tweet.querySelector('div[data-testid="tweetText"]').textContent;

        let like_button = tweet.querySelector('div[data-testid="like"]').parentNode;
        
        //let share_tweet = tweet.querySelector('div[aria-label="Share Tweet"]').parentNode.parentNode;
        
        let miss_information_element = document.createElement('div');
        miss_information_element.setAttribute('data-id', 'miss_information_element');
        
        let miss_information_image = document.createElement('img');
        miss_information_image.setAttribute('data-id', 'miss_information_image');
        miss_information_image.src = 'https://raw.githubusercontent.com/josheligoldman/CodeJam/main/miss_information/mag1_10.svg';
        miss_information_image.classList.add('miss-information-image');

        miss_information_element.appendChild(miss_information_image);
        miss_information_element.className = like_button.className + ' miss-information-element' + ' hover-box-anchor';

        chrome.runtime.sendMessage(
            {
                'topic': tweet_text, 
            },
            function(response) {
                console.log("In sendMessage");
                let hover_box = create_popup(response, tweet);
                if (!hover_box) {return;}
                miss_information_element.appendChild(hover_box);
            }
        );

        //like_button.parentNode.appendChild(miss_information_element);
        like_button.parentNode.insertBefore(miss_information_element, like_button); 

        console.log("Done Main Function");

    }
    
}

setInterval(addMissInformationAction, 1000);




