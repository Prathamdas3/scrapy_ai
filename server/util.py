from os import getenv
from playwright.sync_api import sync_playwright


def getData(page: int):
    url: str = getenv("BASE_URL", "") + str(page)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            page.goto(url, timeout=6000)
            companies = page.locator(
                "div.mb-6.w-full.rounded.border.border-gray-400.bg-white"
            )
            companies_count = companies.count()
            all_data = []
            for i in range(companies_count):
                parent = companies.nth(i)
                child_company = parent.locator("div.w-full.space-y-2.px-4.pb-2.pt-4")
                child_job = parent.locator(
                    "div.items-end.justify-between.rounded-2xl.px-2.py-2"
                )
                child_count = child_company.count()

                for j in range(child_count):
                    company_element = child_company.nth(j)
                    # job_element=child_job.nth(j)

                    # company information
                    company_name = company_element.locator(
                        "h2.inline.text-md.font-semibold"
                    ).text_content()
                    company_size = company_element.locator(
                        "span.text-xs.italic.text-neutral-500"
                    ).text_content()
                    # company_description = company_element.locator("span.text-xs.text-neutral-1000").text_content().strip() if there is no description then it is giving me an error

                    # job information
                    jobs = []
                    child_job_count = child_job.count()
                    for k in range(child_job_count):
                        job = child_job.nth(k)
                        job_title = job.locator(
                            "a.mr-2.text-sm.font-semibold.text-brand-burgandy"
                        ).text_content()
                        

                        # job_details_locator = job.locator("span.pl-1.text-xs")
                        # job_details = []
                        # job_details.append(
                        #     {
                        #         "salary": job_details_locator.nth(0).text_content() or "",
                        #         "location": job_details_locator.nth(1).text_content() or "",
                        #         "experience": job_details_locator.nth(2).text_content() or "",
                        #     }
                        # )
                        
                        jobs.append({"job_title":job_title})

                    all_data.append({"company_name":company_name,"company_size":company_size,"jobs":jobs})
            browser.close()
            return all_data
    except Exception as e:
        print(f"Error while scraping the data {e}")
        if "ERR_CONNECTION_REFUSED" in str(e):
            print("Blocked! Connection refused.")
        return []
