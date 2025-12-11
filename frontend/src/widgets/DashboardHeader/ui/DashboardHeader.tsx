
import { RotateCcw } from 'lucide-react'
import { formatDateTime } from '@/shared/lib'

interface DashboardHeaderProps {
    title: string
    lastUpdated?: string
}

export const DashboardHeader = ({ title, lastUpdated }: DashboardHeaderProps) => {
    const formattedDate = formatDateTime(lastUpdated)

    return (
        <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center gap-1 text-sm text-gray-500">
                {formattedDate} 기준
                <RotateCcw
                    size={16}
                    className="cursor-pointer hover:text-blue-500"
                />
            </div>
        </div>
    )
}
