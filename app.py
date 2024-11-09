import os
import shutil
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()
NETLIFY_API_TOKEN = "nfp_NUftAbk8YjhZLhFWt8k5iZu2pfdV7NTj3fa9"


app = FastAPI()

def package_code(source_dir: str, output_zip: str):
    """
    Zips the contents of the specified source directory.
    """
    shutil.make_archive(output_zip, 'zip', source_dir)

def create_netlify_site():
    """
    Creates a new site on Netlify and returns the site ID.
    """
    url = "https://api.netlify.com/api/v1/sites"
    headers = {
        "Authorization": f"Bearer {NETLIFY_API_TOKEN}",
        "Content-Type": "application/json"
    }

    # You can specify optional parameters for custom site details
    response = requests.post(url, headers=headers, json={})

    if response.status_code == 201:
        return response.json().get("id")  # Site ID
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

def deploy_to_netlify(zip_file_path: str, site_id: str) -> str:
    """
    Deploys the specified ZIP file to the Netlify site with the given site ID.
    """
    url = f"https://api.netlify.com/api/v1/sites/{site_id}/deploys"
    headers = {
        "Authorization": f"Bearer {NETLIFY_API_TOKEN}"
    }

    # Open the zip file and send it in the POST request
    with open(zip_file_path, 'rb') as zip_file:
        files = {'file': zip_file}
        response = requests.post(url, headers=headers, files=files)

    if response.status_code == 200:
        deploy_url = response.json().get("deploy_ssl_url")
        return deploy_url
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

@app.post("/create-and-deploy")
def create_and_deploy_code():
    """
    Endpoint to create a new Netlify site and deploy the current directory to it.
    """
    # Define source directory and output zip file
    source_dir = os.getcwd()  # Current directory
    output_zip = os.path.join(source_dir, "deployment")  # Output file name without extension

    try:
        # Step 1: Package the code
        package_code(source_dir, output_zip)
        zip_file_path = f"{output_zip}.zip"

        # Step 2: Create a new Netlify site
        site_id = create_netlify_site()
        print("New Netlify Site ID:", site_id)  # For debugging

        # Step 3: Deploy to the newly created Netlify site
        deploy_url = deploy_to_netlify(zip_file_path, site_id)

        # Step 4: Clean up the zip file after deployment
        os.remove(zip_file_path)

        # Return the deployment URL to the client
        return JSONResponse(content={"message": "Deployment successful", "deploy_url": deploy_url, "site_id": site_id})

    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Deployment failed", "error": str(e)})


