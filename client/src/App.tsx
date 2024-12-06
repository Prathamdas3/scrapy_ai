import { JobList } from "./components/JobListing";
import Layout from "./components/Layout";



export default function App() {

    return (
        <Layout>
            <main className="p-6 mx-auto space-y-8 conatiner">               
                <JobList />
            </main>
        </Layout>
    );
}