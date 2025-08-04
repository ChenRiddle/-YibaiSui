from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

# 创建Flask应用
app = Flask(__name__)

# 允许前端访问
CORS(app)

# 设置数据库路径
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "yibaisui.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 创建数据库连接
db = SQLAlchemy(app)