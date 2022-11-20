from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse , HttpResponse ####
import requests

API_URL = "https://api-inference.huggingface.co/models/yanekyuk/bert-uncased-keyword-extractor"
headers = {"Authorization": "Bearer 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"}


def get_key(input):

    topic = input.GET.get('topic', None)

    print(topic)

    query = {
        'inputs': topic
    }


    output = requests.post(API_URL, headers=headers, json=query).json()

    if output == {'error': 'Model yanekyuk/bert-uncased-keyword-extractor is currently loading',
 'estimated_time': 20.0}:
     return JsonResponse({'error': 'currently loading'}, safe=False)

    keywords = []

    for i in range(len(output)):
        keywords.append(output[i]['word'])

    articles = get_good_article_dicts(load_json(execute(keywords))['response']['docs'])

    return JsonResponse(articles, safe=False)

def index(input):
    return HttpResponse("Hello, world. You're at the wiki index.")


##

def load_json(url_str):
    url = requests.get(url_str)
    text = url.text
    data = json.loads(text)

    return data


def execute(keywords):
    keyword_str = ""
    for keyword in keywords:
        keyword_str += "\"" + keyword + "\" "
    keyword_str = keyword_str[:-1]

    requestUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_fields=document_type&facet_filter\
    =false&page=1&sort=relevance&q=(" + keyword_str + ")&api-key=2Mpyos8bt4BHqy7NOKEATwK3csOFO1hI"

    return requestUrl


def get_good_article_dicts(list_of_article_dictionaries):
    list_of_good_article_dicts = []
    for i in range(len(list_of_article_dictionaries)):
        if list_of_article_dictionaries[i]['multimedia'] != []:
            list_of_article_dictionaries[i]['image_link'] = "https://static01.nyt.com/" + list_of_article_dictionaries[i]['multimedia'][0]['url']
        else:
            list_of_article_dictionaries[i]['image_link'] = "https://thumbs.dreamstime.com/b/no-image-icon-vector-available-picture-symbol-isolated-white-background-suitable-user-interface-element-205805243.jpg"
        if list_of_article_dictionaries[i]['web_url'][24:29] != "video" and \
            list_of_article_dictionaries[i]['web_url'][35:43] != "briefing" and \
                list_of_article_dictionaries[i]['web_url'][35:45] != "t-magazine":
            small_article_dict = {'web_url': list_of_article_dictionaries[i]['web_url'],
            'headline': list_of_article_dictionaries[i]['headline']['main'],
            'abstract': list_of_article_dictionaries[i]['abstract'],
            'image_link': list_of_article_dictionaries[i]['image_link']
            }
            list_of_good_article_dicts.append(small_article_dict)

    if len(list_of_good_article_dicts) > 3:
        list_of_good_article_dicts = list_of_good_article_dicts[:3]

    return list_of_good_article_dicts


