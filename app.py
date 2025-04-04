from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json

app = Flask(__name__)
app.secret_key = '1234'

# Load configuration from config.json
def load_config():
    with open('config.json') as config_file:
        return json.load(config_file)

config = load_config()


@app.route('/')
def home():
    timer_length = session.get('session_length', config['default_session_length'])
    background_image = session.get('background', config['default_background'])
    music = session.get('music', config['default_music'])
    
    return render_template(
        'index.html',
        timer_length=timer_length,
        background_image=background_image,
        music=music,
        config=config 
    )


@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if request.method == 'POST':
        session['session_length'] = request.form.get('session_length', config.get('default_session_length', 25))
        session['break_length'] = request.form.get('break_length', config.get('default_break_length', 5))
        session['background'] = request.form.get('background', config.get('default_background', 'forest.jpg'))
        session['music'] = request.form.get('music', config.get('default_music', 'lofi.mp3'))
        session['timer_color'] = request.form.get('timer_color', '#ffffff')  # Save the timer color
        return redirect(url_for('home'))
    return render_template('settings.html', config=config)


@app.route('/api/preferences', methods=['GET'])
def get_preferences():
    return jsonify({
        'session_length': session.get('session_length', config.get('default_session_length', 25)),
        'break_length': session.get('break_length', config.get('default_break_length', 5)),
        'background': session.get('background', config.get('default_background', 'default.jpg')),
        'music': session.get('music', config.get('default_music', 'silence.mp3'))
    })


if __name__ == '__main__':
    app.run(port=8080, debug=True)
