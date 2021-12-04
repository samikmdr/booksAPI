# booksAPI
Api for books lending app
 

##### Install packages
    npm install
##### python virtual environment
    python -m venv c:\path\to\new\env
##### .env File
Create a `.env` file in root directory of this project and copy the following into the env file.
```
# Access Token
ACCESS_TOKEN_SECRET =858f3363818dbf4fd1bf8668c30043f6201c2cbcae32e810f12b777efefdc038ec90def11785a4f99c3cf6a2ddfb4bdf2da0329a8eb05b88435185e3d72bab5f

# Password reset mail options
ENABLE_MAIL = 1
SENDER_EMAIL = books.test777@gmail.com
SENDER_PASS = Porjekt@123#
RECEIVER_EMAIL = ***** your email here

# Recommender system settings
PATH_TO_PYTHON_EXE_IN_VENV = ********
PATH_TO_RECOMMENDER_PYTHON_FILE = ********

```
##### RUN APPLICATION
    npm run dev
