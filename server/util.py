from os import getenv
from playwright.sync_api import sync_playwright

def check(page:int):
    url=getenv('BASE_URL','') + str(page)
    return url

def scrap_site(page:int) -> str:
    url=getenv('BASE_URL','')+page
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url,timeout=6000)
            companies = page.locator("div.mb-6.w-full.rounded.border.border-gray-400.bg-white").count()
            print(companies)
            browser.close()
            return "Done"
    except:
        print("Error while scraping the data")
        return ""