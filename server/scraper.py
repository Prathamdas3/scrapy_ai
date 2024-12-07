from playwright.sync_api import sync_playwright
from os import getenv
from threading import Lock

all_data = []
data_lock = Lock()


def getData(page: str):

    base_url = getenv("BASE_URL", "")
    proxy_server = getenv("PROXY", "")
    proxy_username = getenv("PROXY_USER_NAME", "")
    proxy_password = getenv("PROXY_USER_PASSWORD", "")
    id = 1

    url = f"{base_url}{page}"

    global all_data

    try:
        with sync_playwright() as p:
            # Launch browser with proxy settings
            browser = p.chromium.launch(
                headless=True,
                # proxy=(
                #     {
                        # "server": proxy_server,
                        # "username": proxy_username,
                        # "password": proxy_password,
                    # }
                #     if proxy_server
                #     else None
                # ),
            )

            # Set up browser context with a custom user agent
            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
                )
            )

            # Open a new page
            page = context.new_page()
            page.goto(url, timeout=30000, wait_until="domcontentloaded")
            print(page.content())

            # Extract company data
            companies = page.locator(
                "div.mb-6.w-full.rounded.border.border-gray-400.bg-white"
            )

            for i in range(companies.count()):
                parent = companies.nth(i)
                company_info = parent.locator("div.w-full.space-y-2.px-4.pb-2.pt-4")

                company_name = (
                    company_info.locator(
                        "h2.inline.text-md.font-semibold"
                    ).text_content()
                    or "N/A"
                )
                company_size = (
                    company_info.locator(
                        "span.text-xs.italic.text-neutral-500"
                    ).text_content()
                    or "N/A"
                )

                company_link = (
                    company_info.locator("a.text-neutral-1000").get_attribute("href")
                    or "N/A"
                )

                # Extract job data
                job_elements = parent.locator(
                    "div.items-end.justify-between.rounded-2xl.px-2.py-2"
                )

                for j in range(job_elements.count()):
                    job_title = (
                        job_elements.nth(j)
                        .locator("a.mr-2.text-sm.font-semibold.text-brand-burgandy")
                        .text_content()
                        or "N/A"
                    )
                    job_link = (
                        job_elements.nth(j)
                        .locator("a.mr-2.text-sm.font-semibold.text-brand-burgandy")
                        .get_attribute("href")
                        or "N/A"
                    )

                    with data_lock:
                        if job_title == "Python Developer":
                            all_data.append(
                                {
                                    "id": id,
                                    "job_title": job_title,
                                    "job_link": job_link,
                                    "company_name": company_name.strip(),
                                    "company_link": company_link,
                                    "company_size": company_size.strip(),
                                }
                            )
                            id = id + 1

            browser.close()
            return all_data

    except Exception as e:
        print(f"Error while scraping data: {e}")
        if "ERR_CONNECTION_REFUSED" in str(e):
            print("Blocked! Connection refused.")
        return []
