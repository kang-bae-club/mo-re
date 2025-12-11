import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/shared/lib'

interface BackButtonProps {
    className?: string
}

export const BackButton = ({ className }: BackButtonProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <button
            onClick={handleBack}
            className={cn(
                'p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center',
                className,
            )}
            aria-label="Go back"
        >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
    )
}
