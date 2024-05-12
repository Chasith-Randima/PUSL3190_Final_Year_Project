# from flask import Flask, render_template, request
# from weather import get_current_weather
# from waitress import serve

# from transformers import PegasusForConditionalGeneration, PegasusTokenizer

# app = Flask(__name__)


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')

# @app.route('/test')
# def test():
#     tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
#     # Load model
#     model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")
#     return "Hello World!..."


# @app.route('/weather')
# def get_weather():
#     city = request.args.get('city')

#     print("working...")

#     # Check for empty strings or string with only spaces
#     if not bool(city.strip()):
#         # You could render "City Not Found" instead like we do below
#         city = "Kansas City"

#     weather_data = get_current_weather(city)

#     # City is not found by API
#     if not weather_data['cod'] == 200:
#         return render_template('city-not-found.html')

#     return render_template(
#         "weather.html",
#         title=weather_data["name"],
#         status=weather_data["weather"][0]["description"].capitalize(),
#         temp=f"{weather_data['main']['temp']:.1f}",
#         feels_like=f"{weather_data['main']['feels_like']:.1f}"
#     )


# if __name__ == "__main__":
#     serve(app, host="0.0.0.0", port=8000)





# ---------------------------------------------------------------------------------


# from flask import Flask, render_template, request, jsonify
# from waitress import serve
# from transformers import PegasusForConditionalGeneration, PegasusTokenizer
# import time

# app = Flask(__name__)

# # Assuming the rest of your Flask app code remains unchanged

# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')

# @app.route('/test', methods=['POST'])
# def test():
#     # Extract text from the request body
#     content = request.json.get('content', '')
    
#     if not content:
#         return jsonify({"error": "No content provided"}), 400
    
#     start_time = time.time()
    
#     # Specify the directory where you have saved the model
#     model_save_directory = "./my_project_folder/pegasus_model"
    
#     # Load the model and tokenizer from the directory
#     model = PegasusForConditionalGeneration.from_pretrained(model_save_directory)
#     tokenizer = PegasusTokenizer.from_pretrained(model_save_directory)
    
#     # Create tokens - number representation of our text
#     tokens = tokenizer(content, truncation=True, padding="longest", return_tensors="pt")
    
#     # Summarize
#     summary = model.generate(**tokens, min_length=60, max_length=100)
    
#     # Decode summary
#     summarized_text = tokenizer.decode(summary[0], skip_special_tokens=True)
    
#     end_time = time.time()
#     execution_time = end_time - start_time
    
#     # Return the summarized text and execution time
#     return jsonify({
#         "summarized_text": summarized_text,
#         "execution_time": f"{execution_time} seconds"
#     })

# # Assuming you have the `if __name__ == "__main__"` block to run the app
# if __name__ == "__main__":
#     serve(app, host="0.0.0.0", port=8000)



# ======================================================================================


# from flask import Flask, request, jsonify
# from waitress import serve
from pymongo import MongoClient
# from transformers import PegasusForConditionalGeneration, PegasusTokenizer

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from waitress import serve
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from transformers import BartForConditionalGeneration, BartTokenizer

import torch
import time
import time
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Use your MongoDB Atlas connection string
mongo_conn_str = 'mongodb+srv://final_year_project:Ngd2jIj9PpvQfb5i@cluster0.3mhko.mongodb.net/news_scraping_site?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(mongo_conn_str)

# Adjust these to match your specific database and collection names
db = client['news_scraping_site']
summaries_collection = db.articles
scraped_collection = db.scrapedarticles


@app.route('/')
def hello():
    return {"hello":"its fucking working..."}
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test():
    content = request.json.get('content', '')
    
    if not content:
        return jsonify({"error": "No content provided"}), 400
    
    start_time = time.time()
    
    # model_save_directory = "./my_project_folder/pegasus_model"
    model_save_directory = "./models/pegasus_model"
    
    model = PegasusForConditionalGeneration.from_pretrained(model_save_directory)
    tokenizer = PegasusTokenizer.from_pretrained(model_save_directory)
    
    tokens = tokenizer(content, truncation=True, padding="longest", return_tensors="pt")
    summary = model.generate(**tokens, min_length=60, max_length=100)
    summarized_text = tokenizer.decode(summary[0], skip_special_tokens=True)
    
    # Save the summary to MongoDB Atlas
    summary_document = {
        "original_text": content,
        "summarized_text": summarized_text,
        "timestamp": time.time()
    }
    result = summaries_collection.insert_one(summary_document)
    
    end_time = time.time()
    execution_time = end_time - start_time
    
    return jsonify({
        "summarized_text": summarized_text,
        "execution_time": f"{execution_time} seconds",
        "mongodb_object_id": str(result.inserted_id)  # Return the MongoDB Object ID of the inserted document
    })


@app.route('/bart', methods=['POST'])
def bart():
    print("bart route called")
    # Get the content from the request
    content = request.json.get('content', '')
    print(content)
    
    # Check if content is provided
    if not content:
        return jsonify({"error": "No content provided"}), 400
    
    start_time = time.time()
    
    # Path to your BART model, adjust as necessary
    model_save_directory = "./models/bart-large-cnn"
    
    # Load the tokenizer and model
    tokenizer = BartTokenizer.from_pretrained(model_save_directory)
    model = BartForConditionalGeneration.from_pretrained(model_save_directory)
    
    # Process the content for summarization
    inputs_no_trunc = tokenizer(content, max_length=None, return_tensors='pt', truncation=False)
    chunk_start = 0
    chunk_end = tokenizer.model_max_length  # 1024 for BART
    inputs_batch_lst = []
    while chunk_start <= len(inputs_no_trunc['input_ids'][0]):
        inputs_batch = inputs_no_trunc['input_ids'][0][chunk_start:chunk_end]
        inputs_batch = torch.unsqueeze(inputs_batch, 0)
        inputs_batch_lst.append(inputs_batch)
        chunk_start += tokenizer.model_max_length
        chunk_end += tokenizer.model_max_length

    # Generate summaries for each batch of tokens
    summary_ids_lst = [model.generate(inputs, num_beams=4, max_length=100, early_stopping=True) for inputs in inputs_batch_lst]

    # Combine the batched summaries
    summary_batch_lst = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=False) for summary_id in summary_ids_lst for g in summary_id]
    summary_all = '\n'.join(summary_batch_lst)
    
    # Calculate the execution time
    execution_time = time.time() - start_time

    summary_document = {
        "original_text": content,
        "summarized_text": summary_all,
        "timestamp": time.time()
    }

    result = summaries_collection.insert_one(summary_document)
    
    # Return the summarized text and execution time
    return jsonify({
        "summarized_text": summary_all,
        "execution_time": f"{execution_time} seconds",
        "mongodb_article_id":f"{result.inserted_id}"
    })


@app.route('/one', methods=['POST'])
def one():
    print("bart route called")
    # Get the limit from the request
    limit = request.json.get('limit', 5)

    # Calculate the time threshold (1 hour ago)
    time_threshold = datetime.now() - timedelta(hours=1)

    # Query for articles
    articles = scraped_collection.find({
        "summarized": "false"
        # "fetched_time": {"$gte": time_threshold}
    }).limit(limit)

    # print(len(articles))
    articles_list = list(articles)
    print(articles_list)

    # Path to your BART model
    model_save_directory = "./models/bart-large-cnn"
    
    # Load the tokenizer and model
    tokenizer = BartTokenizer.from_pretrained(model_save_directory)
    model = BartForConditionalGeneration.from_pretrained(model_save_directory)

    for article in articles:
        content = article['content']
        start_time = time.time()

        # Summarize the content
        inputs = tokenizer(content, return_tensors='pt', max_length=1024, truncation=True)
        summary_ids = model.generate(inputs['input_ids'], num_beams=4, max_length=100, early_stopping=True)
        summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        execution_time = time.time() - start_time


    

        summary_document = {
        # "original_text": content,
        "summary": summary_text,
        "summarized":"true"
        # "timestamp": time.time()
        }

        result = summaries_collection.insert_one(summary_document)

            # Save the summarized text back to the database
        result_scraped = scraped_collection.update_one(
            {"_id": article['_id']},
            {"$set": {"summarized":"true"}}
        )

        print(f"Summarized and updated article ID {article['_id']}, Execution time: {execution_time} seconds")

    return jsonify({"message": "Summarization completed for requested articles"})


# if __name__ == "__main__":
#     # serve(app, host="0.0.0.0", port=9000)
#     app.run(host="0.0.0.0", port=9000, debug=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)