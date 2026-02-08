import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('top')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const navItems = [
        { id: 'top', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'contact', label: 'Contact' }
    ]

    // Track active section using IntersectionObserver
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        }

        const sectionVisibility = new Map()

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const sectionId = entry.target.id || 'top'
                sectionVisibility.set(sectionId, {
                    isIntersecting: entry.isIntersecting,
                    intersectionRatio: entry.intersectionRatio
                })
            })

            // Determine the most visible section
            let mostVisibleSection = 'top'
            let maxRatio = 0

            sectionVisibility.forEach((visibility, sectionId) => {
                if (visibility.isIntersecting && visibility.intersectionRatio > maxRatio) {
                    maxRatio = visibility.intersectionRatio
                    mostVisibleSection = sectionId
                }
            })

            // If no section is significantly visible, check scroll position
            if (maxRatio < 0.1) {
                const sections = ['top', 'about', 'skills', 'projects', 'contact']
                let closestSection = 'top'
                let minDistance = Infinity

                sections.forEach((sectionId) => {
                    const element = document.getElementById(sectionId)
                    if (element) {
                        const rect = element.getBoundingClientRect()
                        const distance = Math.abs(rect.top)
                        if (distance < minDistance && rect.top < window.innerHeight) {
                            minDistance = distance
                            closestSection = sectionId
                        }
                    }
                })
                mostVisibleSection = closestSection
            }

            setActiveSection(mostVisibleSection)
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        // Observe all sections
        const observeSections = () => {
            navItems.forEach((item) => {
                const element = document.getElementById(item.id)
                if (element) {
                    observer.observe(element)
                }
            })
        }

        // Wait for DOM to be ready
        setTimeout(observeSections, 100)

        // Also listen to custom nav events to update immediately
        const handleNav = (e) => {
            setActiveSection(e.detail)
        }
        window.addEventListener('nav-to', handleNav)

        return () => {
            observer.disconnect()
            window.removeEventListener('nav-to', handleNav)
        }
    }, [])

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false)
            }
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('nav')) {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener('click', handleClickOutside)
            return () => document.removeEventListener('click', handleClickOutside)
        }
    }, [isMobileMenuOpen])

    const navTo = (id) => {
        // Dispatch custom event for navigation (handled by Overlay component)
        window.dispatchEvent(new CustomEvent('nav-to', { detail: id }))
        // Close mobile menu after navigation
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '1rem 5%' : '1.5rem 5%',
                zIndex: 9999,
                pointerEvents: 'auto',
                background: isMobile 
                    ? 'rgba(0,0,0,0.95)' 
                    : 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7), transparent)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                minHeight: isMobile ? 'var(--navbar-height, 70px)' : 'auto'
            }}
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.05em',
                    cursor: 'pointer',
                    color: '#fff',
                    fontFamily: 'monospace'
                }}
                onClick={() => navTo('top')}
            >
                <span style={{ color: 'var(--color-accent)' }}>Divyaksh</span> Soni
            </motion.div>

            {/* Desktop Navigation */}
            <div style={{
                display: isMobile ? 'none' : 'flex',
                gap: 'clamp(1rem, 3vw, 2.5rem)',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                alignItems: 'center'
            }}>
                {navItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        onClick={() => navTo(item.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeSection === item.id ? 'var(--color-accent)' : '#fff',
                            cursor: 'pointer',
                            padding: '0.5rem 0',
                            position: 'relative',
                            transition: 'color 0.3s ease',
                            fontFamily: 'monospace',
                            fontSize: 'inherit',
                            textTransform: 'inherit',
                            letterSpacing: 'inherit'
                        }}
                    >
                        {item.label}
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="activeIndicator"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'var(--color-accent)',
                                    borderRadius: '2px'
                                }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileMenu}
                style={{
                    display: isMobile ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: '5px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    zIndex: 10000
                }}
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={{
                        rotate: isMobileMenuOpen ? 45 : 0,
                        y: isMobileMenuOpen ? 8 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        width: '25px',
                        height: '2px',
                        background: '#fff',
                        display: 'block',
                        borderRadius: '2px'
                    }}
                />
                <motion.span
                    animate={{
                        opacity: isMobileMenuOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        width: '25px',
                        height: '2px',
                        background: '#fff',
                        display: 'block',
                        borderRadius: '2px'
                    }}
                />
                <motion.span
                    animate={{
                        rotate: isMobileMenuOpen ? -45 : 0,
                        y: isMobileMenuOpen ? -8 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        width: '25px',
                        height: '2px',
                        background: '#fff',
                        display: 'block',
                        borderRadius: '2px'
                    }}
                />
            </motion.button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 'var(--navbar-height, 70px)',
                            left: 0,
                            right: 0,
                            background: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            padding: '2rem',
                            zIndex: 9998,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navTo(item.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: activeSection === item.id ? 'var(--color-accent)' : '#fff',
                                    cursor: 'pointer',
                                    padding: '0.75rem 0',
                                    textAlign: 'left',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontFamily: 'monospace',
                                    borderBottom: activeSection === item.id ? '2px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
