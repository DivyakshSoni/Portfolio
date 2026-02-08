import { Scroll, useScroll } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import React from 'react'

const Section = (props) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const { id, style, children, ...rest } = props
    return (
        <section
            id={id}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '10%',
                paddingRight: '10%',
                paddingTop: id === 'top' && isMobile ? '100px' : '0',
                ...style
            }}
            {...rest}
        >
            {children}
        </section>
    )
}

const ProjectCard = ({ title, role, desc, tags }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '2rem',
            maxWidth: '600px'
        }}
    >
        <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.8rem)', marginBottom: '0.5rem', fontFamily: 'monospace' }}>{title}</h3>
        <p style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{role}</p>
        <p style={{ lineHeight: 1.6, color: '#ccc', marginBottom: '1.5rem' }}>{desc}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {tags.map((tag, i) => (
                <span key={i} style={{
                    fontSize: '0.8rem',
                    padding: '0.2rem 0.8rem',
                    border: '1px solid #333',
                    borderRadius: '20px',
                    color: '#888'
                }}>
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
)

export const Overlay = () => {
    const scroll = useScroll()
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Listen for external navigation events from the Navbar
    useEffect(() => {
        const handleNav = (e) => {
            const id = e.detail
            if (id === 'top') {
                scroll.el.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                const element = document.getElementById(id)
                if (element && scroll.el) {
                    const top = element.offsetTop
                    scroll.el.scrollTo({ top: top, behavior: 'smooth' })
                }
            }
        }

        window.addEventListener('nav-to', handleNav)
        return () => window.removeEventListener('nav-to', handleNav)
    }, [scroll])

    return (
        <Scroll html>
            <div style={{ width: '100vw' }}>

                {/* 1. Hero — heading left, video on the right */}
                <Section
                    id="top"
                    style={{
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start',
                        justifyContent: 'center',
                        paddingTop: isMobile ? '120px' : '0',
                        textAlign: isMobile ? 'center' : 'left'
                    }}
                >
                    {/* Text content (left-aligned on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        style={{
                            maxWidth: '800px',
                            width: '100%',
                            zIndex: 10
                        }}
                    >
                        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                            Complexity <br /> <span style={{ color: 'var(--color-accent)' }}>Into Clarity.</span>
                        </h1>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
                            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.85, maxWidth: '600px', margin: isMobile ? '0 auto 1rem auto' : '0 0 1rem 0', fontFamily: 'monospace' }}>
                                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>Divyaksh Soni</span> • Full-Stack Developer & Systems Thinker
                            </p>
                            <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', opacity: 0.65, fontFamily: 'monospace' }}>
                                Building scalable solutions • Automating workflows • Data-driven development
                            </p>
                        </motion.div>
                    </motion.div>
                </Section>

                {/* 2. About */}
                <Section style={{ alignItems: 'flex-end', textAlign: 'right' }} id="about">
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '600px' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>The Engineer's Mind</h2>
                        <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem', color: '#ccc' }}>
                            Developer with hands-on experience building full-stack applications, automating manual workflows, and working with data-driven systems. Strong foundation in backend logic, APIs, databases, and frontend frameworks.
                        </p>
                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#aaa', marginBottom: '2rem' }}>
                            Proven ability to translate real-world requirements into structured, scalable software solutions through live projects, client implementations, and academic systems.
                        </p>

                        <div style={{ borderTop: '1px solid #333', paddingTop: '1rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Education</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                <strong>Master of Computer Applications (MCA)</strong> <br />
                                <span style={{ opacity: 0.7 }}>University of Mumbai (Sep 2025 - Aug 2027)</span> <br />
                                <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>Focus: Enterprise Applications, Software Systems, Data-Driven Development</span>
                            </p>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                <strong>Bachelor of Computer Applications (BCA)</strong> <br />
                                <span style={{ opacity: 0.7 }}>Mohanlal Sukhadia University, Udaipur (2021-2024)</span> <br />
                                <span style={{ opacity: 0.7 }}>GPA: 8.7</span>
                            </p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8, fontStyle: 'italic' }}>
                                Technical Director - Innovation and Startup Development Club
                            </p>
                        </div>
                    </motion.div>
                </Section>

                {/* 3. Skills */}
                <Section style={{ alignItems: 'flex-start' }} id="skills">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginBottom: '2rem', color: 'var(--color-bg)', WebkitTextStroke: '1px var(--color-text)', opacity: 0.5 }}>SKILL SYSTEM</h2>
                        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: '800px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Tech Stack</h3>
                                <ul style={{ listStyle: 'none', color: '#ccc', lineHeight: '1.6', fontSize: '0.9rem' }}>
                                    <li><strong>Programming:</strong> Python, JavaScript, PHP, SQL</li>
                                    <li><strong>Frontend:</strong> React, HTML, CSS, Three.js</li>
                                    <li><strong>Backend:</strong> Node.js, PHP, REST APIs</li>
                                    <li><strong>Databases:</strong> MySQL, Supabase</li>
                                    <li><strong>Data & Tools:</strong> Pandas, NumPy, Git/GitHub, Azure Fundamentals</li>
                                </ul>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Certifications</h3>
                                <ul style={{ listStyle: 'none', color: '#ccc', lineHeight: '1.6', fontSize: '0.9rem' }}>
                                    <li>• Microsoft Azure Fundamentals — Cloud Concepts</li>
                                    <li>• Develop NLP Solutions with Azure AI Services</li>
                                    <li>• IBM Big Data Foundations — Level 1</li>
                                    <li>• AWS Cloud Development Kit (CDK) Primer</li>
                                    <li>• Introduction to AWS Command Line Interface (CLI)</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </Section>

                {/* 4. Projects */}
                <Section style={{ height: 'auto', padding: '10vh 10%' }} id="projects">
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '4rem', textAlign: 'center' }}>SYSTEMS BUILT</h2>

                    <ProjectCard
                        title="Secure Inventory Management System"
                        role="Live • Team Project (University of Mumbai)"
                        desc="Developed a full-stack system covering purchase orders, inventory tracking, billing, and reporting. Automated manual procurement and inventory workflows into a centralized web application. Implemented role-based access control for admin, staff, and management users. Designed backend logic and database schema to ensure data integrity."
                        tags={['PHP', 'MySQL', 'RBAC', 'Full-Stack', 'Automation']}
                    />
                    <ProjectCard
                        title="OldTimers — Vintage Car Booking & Operations Platform"
                        role="Live Project • Operations Platform"
                        desc="Converted a fully manual vintage car booking process into an automated digital system. Built client-facing booking workflows and admin modules for approvals and scheduling. Reduced coordination errors and improved operational efficiency significantly."
                        tags={['Web Development', 'Process Optimization', 'Client Systems', 'Automation']}
                    />
                    <ProjectCard
                        title="AI-Powered LinkedIn & Resume Analyzer"
                        role="Personal Project • AI Integration"
                        desc="Developed an AI-driven system to analyze resumes and LinkedIn profiles. Implemented dual-engine NLP processing with AI integration and third-party APIs. Generates resume scoring, skill-gap analysis, and role-fit recommendations for job matching."
                        tags={['Python', 'NLP', 'Azure AI', 'Data Analysis', 'API Integration']}
                    />
                    <ProjectCard
                        title="Business Data Analysis Project"
                        role="Cognifyz Technologies • Data Analysis"
                        desc="Conducted data cleaning and exploratory analysis on structured datasets. Identified trends and insights relevant to business analysis. Presented findings in clear, structured analytical summaries to support internal decision-making."
                        tags={['Python', 'Pandas', 'Data Analysis', 'EDA', 'Reporting']}
                    />
                </Section>

                {/* 5. Experience */}
                <Section style={{ textAlign: 'center', alignItems: 'center', paddingTop: '100px', paddingBottom: '100px', height: 'auto' }} id="experience">
                    <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Professional Timeline</h2>
                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', width: '100%', maxWidth: '1200px' }}>
                        <div style={{ textAlign: 'left', padding: '1.5rem', borderLeft: '2px solid var(--color-accent)', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Cognifyz Technologies</h3>
                            <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Data Analyst Intern (Jul '24 - Aug '24)</p>
                            <ul style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                                <li>Performed data cleaning, preprocessing, and validation on structured datasets</li>
                                <li>Conducted exploratory data analysis to identify trends and patterns</li>
                                <li>Prepared analytical summaries and reports to support decision-making</li>
                            </ul>
                        </div>
                        <div style={{ textAlign: 'left', padding: '1.5rem', borderLeft: '2px solid var(--color-accent)', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Desro Adventures</h3>
                            <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Event & Media Coordinator (Jun '24 - Jul '24)</p>
                            <ul style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                                <li>Planned and executed large-scale events with 200+ participants</li>
                                <li>Coordinated vendors, schedules, and on-ground execution</li>
                                <li>Used feedback and data to improve execution quality by 15%</li>
                            </ul>
                        </div>
                        <div style={{ textAlign: 'left', padding: '1.5rem', borderLeft: '2px solid var(--color-accent)', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Splixcube IT Solutions</h3>
                            <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>PHP Intern (Dec '20 - Dec '23)</p>
                            <ul style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                                <li>Assisted in backend development of PHP-based web applications</li>
                                <li>Worked with MySQL databases and server-side logic</li>
                                <li>Supported feature implementation, debugging, and optimizations</li>
                            </ul>
                        </div>
                        <div style={{ textAlign: 'left', padding: '1.5rem', borderLeft: '2px solid var(--color-accent)', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Kreativy — Early Stage Venture</h3>
                            <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Co-Founder & Operations (May '23 - Sep '25)</p>
                            <ul style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                                <li>Co-founded and operated an offline business with real-world workflows</li>
                                <li>Managed order tracking, client coordination, and vendor communication</li>
                                <li>Gained practical exposure to translating business processes into structured systems</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginTop: '5rem', padding: '2rem', borderTop: '1px solid #333' }}>
                        <p style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>"Automation is not about speed — it’s about clarity."</p>
                    </div>
                </Section>

                {/* Contact Section */}
                <Section style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }} id="contact">
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '2rem' }}>Get In Touch</h2>
                    <div style={{ textAlign: 'center' }}>
                        <a href="mailto:devsoni1209@gmail.com" style={{
                            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                            color: 'var(--color-accent)',
                            textDecoration: 'none',
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            devsoni1209@gmail.com
                        </a>
                        <a href="tel:+918955791968" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#ccc', fontFamily: 'monospace', textDecoration: 'none', display: 'block', marginTop: '0.5rem' }}>
                            +91 89557 91968
                        </a>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a href="https://www.linkedin.com/in/divyaksh-soni/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #555' }}>LinkedIn</a>
                        <a href="https://github.com/DivyakshSoni" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #555' }}>GitHub</a>
                    </div>
                </Section>
            </div>
        </Scroll>
    )
}
