import pytest
import json
from src import app



@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index_route(client):
    response = client.get('/')
    assert response.status_code == 200

def test_test_route(client):
    data = {'content': 'Your test content here'}
    response = client.post('/test', json=data)
    assert response.status_code == 200
    response_data = json.loads(response.data)
    assert 'summarized_text' in response_data
    assert 'execution_time' in response_data
    assert 'mongodb_object_id' in response_data

def test_bart_route(client):
    data = {'content': 'Your test content here'}
    response = client.post('/bart', json=data)
    assert response.status_code == 200
    response_data = json.loads(response.data)
    assert 'summarized_text' in response_data
    assert 'execution_time' in response_data
    assert 'mongodb_article_id' in response_data

def test_auto_route(client):
    data = {'content': 'Your test content here', 'title': 'Test Title', 'author': 'Test Author', 'date': '2024-05-09', 'time': '10:00', 'image': 'image_url', 'publisher': 'Test Publisher'}
    response = client.post('/auto', json=data)
    assert response.status_code == 200
    response_data = json.loads(response.data)
    assert 'summarized_text' in response_data
    assert 'execution_time' in response_data
    assert 'mongodb_article_id' in response_data

def test_singleAuto_route(client):
    data = {'content': 'Your test content here', 'title': 'Test Title', 'author': 'Test Author', 'date': '2024-05-09', 'time': '10:00', 'image': 'image_url', 'publisher': 'Test Publisher'}
    response = client.post('/singleAuto', json=data)
    assert response.status_code == 200
    response_data = json.loads(response.data)
    assert 'summarized_text' in response_data
    assert 'execution_time' in response_data
    assert 'mongodb_article_id' in response_data

def test_one_route(client):
    response = client.post('/one', json={'limit': 5})
    assert response.status_code == 200
    response_data = json.loads(response.data)
    assert 'message' in response_data

