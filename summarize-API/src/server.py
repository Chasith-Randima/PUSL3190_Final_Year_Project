# importing required packages
from flask import Flask, request, jsonify
import time
from datetime import datetime, timezone, timedelta
import requests
from pymongo import MongoClient
from flask_cors import CORS

# intialinzing the app
app = Flask(__name__)

# Use your MongoDB Atlas connection string
mongo_conn_str = 'mongodb+srv://final_year_project:Ngd2jIj9PpvQfb5i@cluster0.3mhko.mongodb.net/news_scraping_site?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(mongo_conn_str)

# Adjust these to match your specific database and collection names
db = client['news_scraping_site']
summaries_collection = db.articles
scraped_collection = db.scrapedarticles

# route to handle incoming article
@app.route('/auto', methods=['POST'])
def auto():
    # storing request body data to newly initialized variables.
    content = request.json.get('content', '')
    title = request.json.get('title', '')
    author = request.json.get('author', '')
    date = request.json.get('date', '')
    timeArticle = request.json.get('time', '')
    image = request.json.get('image', '')
    publisher = request.json.get('publisher', '')
    customFetch = request.json.get('customFetch', 'false')
    url = request.json.get("url", "www.google.com")

    # If there are no content in the body sending response with the error message
    if not content:
        return jsonify({"error": "No content provided"}), 400
    # start timing to check summarization time
    start_time = time.time()
    # intializing hosted summarization model url
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    # setting access token as headers
    headers = {"Authorization": "Bearer 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"}

    # function which takes article content as payload and send request to above initialized API
    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    
    # calling the function and storing response data in output variable
    output = query({"inputs": content})
    # calculating and storing total time it took for summarization process
    execution_time = time.time() - start_time
    # getting current datetime to check request time
    current_datetime = datetime.now(timezone.utc)
    formatted_datetime = current_datetime.strftime("%Y-%m-%dT%H:%M:%S.%f%z")

    # adding all the data needs to be saved into database to a object
    summary_document = {
        "original_text": content,
        "summarized_text": output[0]["summary_text"],
        "title": title,
        "author": author,
        "date": date,
        "time": timeArticle,
        "image": image,
        "publisher": publisher,
        "createdAt": formatted_datetime,
        "customFetch": customFetch,
        "url": url
    }
    
    # saving data to mongodb database
    result = summaries_collection.insert_one(summary_document)
    # returning response with the saved data
    return jsonify({
        "summarized_text": output[0]["summary_text"],
        "execution_time": f"{execution_time} seconds",
        "mongodb_article_id": str(result.inserted_id),
        "original_text": content,
        "timestamp": time.time(),
        "title": title,
        "author": author,
        "date": date,
        "time": timeArticle,
        "images": image,
        "createdAt": formatted_datetime,
        "customFetch": customFetch,
        "url": url
    })

@app.route('/singleAuto', methods=['POST'])
def singleAuto():
    content = request.json.get('content', '')
    title = request.json.get('title', '')
    author = request.json.get('author', '')
    date = request.json.get('date', '')
    timeArticle = request.json.get('time', '')
    image = request.json.get('image', '')
    publisher = request.json.get('publisher', '')

    if not content:
        return jsonify({"error": "No content provided"}), 400
    
    start_time = time.time()
    
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    headers = {"Authorization": "Bearer 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"}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    
    output = query({"inputs": content})
    
    execution_time = time.time() - start_time
    current_datetime = datetime.now(timezone.utc)
    formatted_datetime = current_datetime.strftime("%Y-%m-%dT%H:%M:%S.%f%z")

    summary_document = {
        "original_text": content,
        "summarized_text": output[0]["summary_text"],
        "title": title,
        "author": author,
        "date": date,
        "time": timeArticle,
        "image": image,
        "publisher": publisher,
        "createdAt": formatted_datetime
    }

    result = summaries_collection.insert_one(summary_document)
    
    return jsonify({
        "summarized_text": output[0]["summary_text"],
        "execution_time": f"{execution_time} seconds",
        "mongodb_article_id": str(result.inserted_id),
        "original_text": content,
        "timestamp": time.time(),
        "title": title,
        "author": author,
        "date": date,
        "time": timeArticle,
        "images": image,
        "createdAt": formatted_datetime
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3005, debug=True)
