import { useState } from "react";
import ShowDashboard from "./showDashboard";
import ForcastSection from "./forcast";

export default function SearchSection() {

    const [input, setInput] = useState<string>("");
    const [city, setCity] = useState<string>("Kolkata");

    const handleSearch = () => {
        if (!input.trim()) return;
        setCity(input);
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] text-black px-6 py-12">
            <section className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-black/10 pb-8">

                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Weather
                        </h1>

                    </div>

                    <div className="flex gap-3 w-full md:w-auto">

                        <input
                            type="text"
                            placeholder="Search city..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            className="flex-1 md:w-80 px-5 py-3 bg-white border border-black/10 rounded-full outline-none"
                        />

                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
                        >
                            Search
                        </button>

                    </div>

                </div>
                <ShowDashboard city={city} />
                <ForcastSection city={city} />
            </section>
        </div>
    )
}