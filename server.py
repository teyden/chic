from flask import Flask, send_from_directory 

app = Flask(__name__, static_url_path='')



########### VIEW ###########

@app.route('/static/js/<path:path>')
def send_js(path):
	return send_from_directory('static/js', path)


@app.route('/static/css/<path:path>')
def send_css(path):
	return send_from_directory('static/css', path)


@app.route('/static/Flat-UI-master/<path:path>')
def send_ui(path):
	return send_from_directory('static/Flat-UI-master', path)


@app.route('/static/img/<path:path>')
def send_img(path):
	return send_from_directory('static/img', path)

#### 

@app.route('/')
def index():
	return send_from_directory('static', 'index.html')
