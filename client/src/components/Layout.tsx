import { ModeToggle } from "@/components/toggle-button"

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="container px-4 py-8 mx-auto">
        <header className="flex flex-col items-center justify-between gap-4 px-6 mb-8 sm:flex-row">
            <h1 className="text-2xl font-bold sm:text-3xl">Job Board</h1>
            <ModeToggle />
        </header>
        {children}
    </div>
}