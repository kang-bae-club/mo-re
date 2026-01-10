import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium min-w-[300px] transition-colors outline-none border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:outline-none hover:ring-0 hover:ring-offset-0 hover:border-0 focus:outline-none focus:ring-0 active:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-[#3E83A8] text-primary-foreground hover:bg-[#3E83A8]/80',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'bg-transparent text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-6 py-2',
                sm: 'h-8 px-4',
                lg: 'h-11 px-10',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

// 25.12.07 bsy - React19 스타일에 따라 forwardRef 제거
const Button = ({
    className,
    variant,
    size,
    asChild = false,
    ref,
    ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    const Comp = asChild ? Slot : 'button'
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
}
Button.displayName = 'Button'

export { Button, buttonVariants }

