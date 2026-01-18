import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useFetchData from '@/hooks/useFetchData';


const DashboardTable = ({ type }) => {
    console.log("Type in dbt:", type)
    const baseUrl = "http://localhost:8080/results";
    const url =
        type === "today"
            ? `${baseUrl}/today`
            : baseUrl;
    console.log(url)
    const { data: history_data, loading, error } = useFetchData(url);

    const table_data = history_data?.content
    // console.log(table_data)

    const showValue = (value, fallback = "N/A") =>
        value === null || value === undefined || value === ""
            ? fallback
            : value;

    return (
        <Table>
            <TableCaption>Result History</TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead>Result ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Weather</TableHead>
                    <TableHead>Travel</TableHead>
                    <TableHead>Scenery</TableHead>
                    <TableHead>Activities</TableHead>
                    <TableHead>Weights</TableHead>
                    <TableHead className="text-right">Created</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {table_data?.map((row, idx) => (
                    <TableRow key={row?.result_id ?? idx}>
                        <TableCell className="font-medium">
                            {showValue(row?.result_id)}
                        </TableCell>

                        <TableCell>
                            {row?.User?.username ? row?.User?.username : "Guest"}
                        </TableCell>

                        <TableCell>
                            {showValue(row?.Place?.place_name)}
                        </TableCell>

                        <TableCell>
                            {row?.preferences?.budget
                                ? `$${row.preferences.budget.toLocaleString()} VND`
                                : "N/A"}
                        </TableCell>

                        <TableCell>
                            {(() => {
                                const w = row?.preferences?.weather;

                                const parts = w
                                    ? [
                                        w.weather_type,
                                        w.avg_temp != null ? `${w.avg_temp}°C` : null,
                                        w.humidity != null ? `${w.humidity}%` : null,
                                    ].filter(Boolean)
                                    : [];

                                return parts.length ? parts.join(" · ") : "N/A";
                            })()}
                        </TableCell>

                        <TableCell>
                            {row?.preferences
                                ? `${showValue(row.preferences.travel_month)} · ${showValue(
                                    row.preferences.total_travel_days
                                )} days`
                                : "N/A"}
                        </TableCell>

                        <TableCell>
                            {row?.preferences?.scenery_requirement?.length
                                ? row.preferences.scenery_requirement.join(", ")
                                : "N/A"}
                        </TableCell>

                        <TableCell>
                            {row?.preferences?.activity_requirement?.length
                                ? row.preferences.activity_requirement.join(", ")
                                : "N/A"}
                        </TableCell>

                        <TableCell>
                            {row?.preferences?.weights ? (
                                <>
                                    Budget: {showValue(row.preferences.weights.budget)},{" "}
                                    Scenery: {showValue(row.preferences.weights.scenery)},{" "}
                                    Activity: {showValue(row.preferences.weights.activity)},{" "}
                                    Weather: {showValue(row.preferences.weights.weather)}
                                </>
                            ) : (
                                "N/A"
                            )}
                        </TableCell>

                        <TableCell className="text-right">
                            {row?.createdAt
                                ? new Date(row.createdAt).toLocaleDateString()
                                : "N/A"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DashboardTable