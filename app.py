from flask import Flask, render_template, session, jsonify, request
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "test123"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
debug = DebugToolbarExtension(app)
boggle_game = Boggle()


@app.route("/")
def render_home():
    board = boggle_game.make_board()
    session["board"] = board
    return render_template("index.html", board=board)


@app.route("/check", methods=["POST"])
def check_words():
    word = request.json["word"]
    board = session["board"]
    res = boggle_game.check_valid_word(board, word)
    return jsonify({'result': res})
