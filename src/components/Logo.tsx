type LogoProps = {
  /** Use the official reversed (white) artwork for dark surfaces. */
  inverted?: boolean
  /** "lockup" omits the descriptor; "stacked" is the full primary logo. */
  variant?: 'lockup' | 'stacked'
  className?: string
  loading?: 'eager' | 'lazy'
}

const artwork = {
  lockup: {
    purple: {
      src: '/brand/lemozin-lockup-purple.png',
      srcSet:
        '/brand/lemozin-lockup-purple-480.png 480w, /brand/lemozin-lockup-purple-960.png 960w, /brand/lemozin-lockup-purple.png 1200w',
    },
    white: {
      src: '/brand/lemozin-lockup-white.png',
      srcSet:
        '/brand/lemozin-lockup-white-480.png 480w, /brand/lemozin-lockup-white-960.png 960w, /brand/lemozin-lockup-white.png 1200w',
    },
    width: 1200,
    height: 674,
  },
  stacked: {
    purple: {
      src: '/brand/lemozin-stacked-purple.png',
      srcSet:
        '/brand/lemozin-stacked-purple-400.png 400w, /brand/lemozin-stacked-purple-800.png 800w, /brand/lemozin-stacked-purple.png 1600w',
    },
    white: {
      src: '/brand/lemozin-stacked-white.png',
      srcSet:
        '/brand/lemozin-stacked-white-400.png 400w, /brand/lemozin-stacked-white-800.png 800w, /brand/lemozin-stacked-white.png 1600w',
    },
    width: 1600,
    height: 1037,
  },
} as const

/**
 * Official Lemozin artwork, extracted from the supplied brand book.
 * The image is never recoloured, stretched, or cropped; only scaled.
 * The lockup intentionally omits the descriptor for compact navigation use.
 */
export function Logo({
  inverted = false,
  variant = 'lockup',
  className = '',
  loading = 'eager',
}: LogoProps) {
  const art = artwork[variant]
  const image = inverted ? art.white : art.purple

  return (
    <img
      className={`logo logo--${variant}${className ? ` ${className}` : ''}`}
      src={image.src}
      srcSet={image.srcSet}
      sizes={variant === 'stacked' ? '180px' : '96px'}
      width={art.width}
      height={art.height}
      alt=""
      loading={loading}
      decoding="async"
      draggable={false}
    />
  )
}
