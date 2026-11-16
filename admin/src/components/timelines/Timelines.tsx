import { DataTable } from "@/components/dashboard/data-table"
import data from "@/app/dashboard/data.json"

export default function Timelines() {
    return (
        <div className="flex flex-col gap-4">
            <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold">Timelines</h1>
            </div>
            <DataTable data={data} />
        </div>
    )
}
