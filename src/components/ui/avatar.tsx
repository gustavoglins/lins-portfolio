"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

type AvatarVariant = "circle" | "portrait"

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  variant?: AvatarVariant
  size?: number
}

function Avatar({
  className,
  variant = "circle",
  size = 1,
  style,
  ...props
}: AvatarProps) {
  // base sizes in pixels (match tailwind defaults used before)
  const baseSizes = {
    circle: 128, // corresponds to w-32/h-32 (8rem = 128px)
    portrait: 384, // corresponds to h-96 (24rem = 384px)
  }

  const base = variant === 'circle' ? baseSizes.circle : baseSizes.portrait
  const computedStyle: React.CSSProperties = {
    // explicit width/height so layout space updates with size
    ...(variant === 'circle'
      ? { width: `${base * size}px`, height: `${base * size}px`, borderRadius: '9999px' }
      : { height: `${base * size}px` }),
    ...style,
  }

  const variantClasses = variant === 'circle' ? 'overflow-hidden' : 'aspect-[3/4] overflow-hidden'

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex shrink-0',
        variantClasses,
        className
      )}
      style={computedStyle}
      {...props}
    />
  )
}

type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image> & {
  bw?: boolean | 'hover'
}

function AvatarImage({
  className,
  bw,
  ...props
}: AvatarImageProps) {
  const bwClass = bw === 'hover'
    ? 'grayscale hover:grayscale-0 transition-all duration-300'
    : bw
    ? 'grayscale transition-all duration-300'
    : ''

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('w-full h-full object-cover', bwClass, className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex w-full h-full items-center justify-center',
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
