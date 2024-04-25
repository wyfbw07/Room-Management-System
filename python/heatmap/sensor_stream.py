# project
from director.director import Director
import sys

# Fill in from the Service Account and Project:
USERNAME   = "cn6os65glkc000fvi3c0"       # this is the key
PASSWORD   = "ca8f2a933f124d5eb83b911b2bc1e085"     # this is the secret
PROJECT_ID = "cn39e25vkss3h69meaqg"                # this is the project id

# url base and endpoint
API_URL_BASE  = "https://api.d21s.com/v2"


if __name__ == '__main__':
    try:
        # Initialise Director instance
        d = Director(USERNAME, PASSWORD, PROJECT_ID, API_URL_BASE, t_range=[18, 27], resolution=5)
        # If the script executes successfully, print a success message
        # print("Python script executed successfully")
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)