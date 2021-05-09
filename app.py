from flask import Flask, render_template, session, redirect, request
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "test123"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
debug = DebugToolbarExtension(app)
boggle_game = Boggle()


@app.route("/")
def render_home():
    return "Hello"
