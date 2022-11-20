console.log("Content4");

function create_popup(nyt_data, tweet) {
    let data = nyt_data['data'];
    let hover_box = document.createElement("DIV");

    if (data.length == 0) {
        return false;
    }

    hover_box.classList.add('hover-box');

    let aspect_ratio = Math.min(tweet.offsetWidth, tweet.offsetHeight);
    //hover_box.style.width = '900px !important';
    let width = aspect_ratio * 0.9;
    let height = aspect_ratio * 0.6;

    hover_box.style.cssText += `width: ${width}px !important;`;
    hover_box.style.cssText += `height: ${height}px !important;`;
    hover_box.style.cssText += `left: -${width/2 - 35/4}px !important;`;

    for (let i = 0; i < data.length; i++) {
        article_data = data[i];
        
        let web_url = article_data['web_url'];
        let image_link = article_data['image_link'];
        let headline = article_data['headline'];

        console.log(`src"${image_link}"`);
        
        let article_div = document.createElement('DIV');
        article_div.classList.add('article');
        article_div.innerHTML = `
            <a href="${web_url}" target="_blank" rel="noopener noreferrer">
                <img class="article-image" src="${image_link}">
                <div class="article-headline">
                    Hello World!
                </div>
            </a>
        `;

        article_div.style.cssText += `width: ${100/data.length}% !important;`

        hover_box.appendChild(article_div);
    }
    
    return hover_box;
    
}

function addMissInformationAction() {
    console.log("Main Function");
    let tweets = document.querySelectorAll('article');

    for (let i = 0; i < tweets.length; i++) {
        let nyt_data;

        let result;

        let tweet = tweets[i];

        if (tweet.querySelector('div[data-id="contwext-element"]')) {continue;}

        let tweet_text = tweet.querySelector('div[data-testid="tweetText"]').textContent;

        let like_button = tweet.querySelector('div[data-testid="like"]').parentNode;
        
        //let share_tweet = tweet.querySelector('div[aria-label="Share Tweet"]').parentNode.parentNode;

        let contwext = document.createElement('DIV');
        contwext.classList.add('contwext-element');
        contwext.className = like_button.className + ' contwext-element';
        contwext.setAttribute('data-id', 'contwext-element');
        contwext.innerHTML = `
            <img src='https://raw.githubusercontent.com/josheligoldman/CodeJam/main/miss_information/mag1_10.svg' class='contwext-image'>
        `;

        contwext.addEventListener('click', function() {

        })

        
        chrome.runtime.sendMessage(
            {
                'topic': tweet_text, 
            },
            function(response) {
                console.log("In sendMessage");
                let popup_box = create_popup(response, tweet);

                console.log(popup_box);

                if (!popup_box) {
                    return;
                }

                contwext.appendChild(popup_box);
            }
        );

        //like_button.parentNode.appendChild(miss_information_element);
        like_button.parentNode.insertBefore(contwext, like_button); 

        console.log("Done Main Function");

    }
    
}

setInterval(addMissInformationAction, 1000);




