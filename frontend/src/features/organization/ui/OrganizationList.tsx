import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useSessionStore } from '@/entities/session'
import { useOrganizationList } from '../model'
import { useState, useRef, useEffect } from 'react'

export const OrganizationList = () => {
    const organization = useSessionStore((state) => state.organization)
    const switchOrganization = useSessionStore((state) => state.switchOrganization)

    const { organizations } = useOrganizationList()

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!organization) return null

    return (
        <div className="relative mx-4 mb-6" ref={dropdownRef}>
            <div
                className={cn(
                    'flex items-center justify-between',
                    'rounded-lg bg-[#e0f2fe] p-3 font-semibold text-gray-800',
                    'cursor-pointer hover:bg-[#bae6fd] transition-colors',
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <img
                        src={organization.avatarUrl}
                        alt={organization.name}
                        className="h-8 w-8 rounded-full"
                    />
                    <span>{organization.name}</span>
                </div>
                <ChevronDown
                    size={16}
                    className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    {organizations.map((org) => (
                        <div
                            key={org.id}
                            className={cn(
                                "flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer transition-colors",
                                "hover:bg-gray-50",
                                org.id === organization.id && "bg-blue-50 text-blue-600 font-medium"
                            )}
                            onClick={() => {
                                switchOrganization(org)
                                setIsOpen(false)
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src={org.avatarUrl}
                                    alt={org.name}
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                                <span>{org.name}</span>
                            </div>
                            {org.id === organization.id && <Check size={16} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
