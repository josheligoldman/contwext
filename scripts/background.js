console.log("At least reached background.js");

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //sendResponse("ok");

        var server_host = 'https://maximumgross.pythonanywhere.com';
        var url = server_host + '/nlp/get_key/?topic='+ encodeURIComponent(request['topic']);
        //var url = "https://api.quotable.io/random";
        //var url = "https://maximumgross.pythonanywhere.com/nlp/get_key/?topic=Biden%20granddaughter%20gets%20married%2C%20offering%20youthful%20spin%20for%20president%20turning%2080%20https%3A%2F%2Fctvnews.ca%2Fworld%2Fbiden-granddaughter-gets-married-offering-youthful-spin-for-president-turning-80-1.6160621%3Fcid%3Dsm%253Atrueanthem%253A%257B%257Bcampaignname%257D%257D%253Atwitterpost%25E2%2580%258B%26taid%3D63794ae7eaedf2000109665e%26utm_campaign%3DtrueAnthem%253A%2BTrending%2BContent%26utm_medium%3DtrueAnthem%26utm_source%3Dtwitter%E2%80%A6";

        //throw Error("Just for shits.");
        
        fetch(url).then(
            function(response) {
            if (response.status != 200) {
                return true;
            }
            response.json().then(function(data) {
                sendResponse({'url': url, 'data': data});
                return true;
            });
            }
        ).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

        return true;
                
    }
);





