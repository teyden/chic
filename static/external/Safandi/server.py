
from flask import Flask, session, request, make_response, jsonify, send_file
from flask import render_template, url_for, redirect, send_from_directory
import requests
import os
import json


from flask import Flask, send_from_directory, request, render_template, json

app = Flask(__name__, static_url_path='')


## Helpers
def is_empty(post):
	''' is_empty() ==> True if empty, else false '''
	valid = False
	if post == {}:
		return True
	else:
		for element in post:
			if (post[element] == None or post[element] == ''):
				valid = True
				break
		return valid 

def allParametersExist(post, default):
	''' allParametersExist() ==> True if all exist, else false 
	default is a dictionary seed
	post is a dictionary sent by the request in the frontend
	''' 
	valid = True
	for field in default:
		if field not in post:
			print("%s %s" % ("This field DNE: ", field))
			valid = False
	return valid


########### VIEW ###########

@app.route('/js/<path:path>')
def send_js(path):
	return send_from_directory('js', path)


@app.route('/css/<path:path>')
def send_css(path):
	return send_from_directory('css', path)


@app.route('/images/<path:path>')
def send_images(path):
	return send_from_directory('images', path)


@app.route('/fonts/<path:path>')
def send_fonts(path):
	return send_from_directory('fonts', path)

#### 

@app.route('/')
@app.route('/home')
def index():
	return send_from_directory('', 'index.html')

# @app.route('/aboutus')
# def load_aboutus():
# 	## LOAD PARTIAL 
# 	return send_from_directory('static/html', 'aboutus.html')

# @app.route('/services')
# def load_services():
# 	return send_from_directory('static/html', 'services.html')


### API
appt_request_seed = {
	"#email": "",
	"#number": 0,
	"#service": "",
	"#date": 0,
	"#time": 0
}

@app.route('/api/request_appt')
def request_appointment():
	'''
	Adds appointment request to DB and sends an email to the user
	to confirm that the request has been made.

	- Admin must check over request 
	- Contact (email or phone) user to verify request 
	- If confirmed then appt_request --> appt_booking (new_booking)
	'''
	data = request.get_json() #force=True
	'''
	new_appt_request = appointment_request.create(json=data, retrieve=True)   - DB
	session['id'] = new_appt['id'] 
	notify('admins', 'New Appointment', repr(new_appt_request))
	return Envelope(
		to_addr = new_appt_request['#email'],
		subject = api.config['CONFIRMATION_EMAIL_SUBJECT'],
		text_body = render_template('static/text/emails/new_appt.txt'),
		html_body = render_template('static/html/emails/new_appt.html'))
	'''
	authorized = False
	if is_empty(data) == False and allParametersExist(data, appt_request_seed):
		email = data.get("#email")
		number = data.get("#number")

	return json.dumps({'success':True}), 200, {'ContentType':'application/json'}




if __name__ == '__main__':
	app.run(debug=True)	