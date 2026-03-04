import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { TopNav, ContextHeader, ProofFooter, type ProofState, type ProofKey } from './design-system/layout'
import { Button, Card, Field, TextArea, TextInput } from './design-system/ui'

// --- Types ---

interface Education {
    id: string
    school: string
    degree: string
    year: string
}

interface Experience {
    id: string
    company: string
    role: string
    duration: string
    desc: string
}

interface Project {
    id: string
    name: string
    desc: string
    link: string
}

interface ResumeData {
    personal: {
        name: string
        email: string
        phone: string
        location: string
    }
    summary: string
    education: Education[]
    experience: Experience[]
    projects: Project[]
    skills: string
    links: {
        github: string
        linkedin: string
    }
}

const DEFAULT_DATA: ResumeData = {
    personal: { name: '', email: '', phone: '', location: '' },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: '',
    links: { github: '', linkedin: '' }
}

const SAMPLE_DATA: ResumeData = {
    personal: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+1 234 567 890',
        location: 'San Francisco, CA'
    },
    summary: 'Experienced Software Engineer with a passion for building scalable web applications and AI integrations.',
    education: [
        { id: '1', school: 'Tech University', degree: 'B.S. Computer Science', year: '2016 - 2020' }
    ],
    experience: [
        { id: '1', company: 'Global Tech', role: 'Senior Developer', duration: '2021 - Present', desc: 'Leading the frontend team in developing AI-driven features.' }
    ],
    projects: [
        { id: '1', name: 'AI Resume Builder', desc: 'A premium tool for creating resumes using AI.', link: 'github.com/janedoe/builder' }
    ],
    skills: 'React, TypeScript, Node.js, OpenAI, Python, AWS',
    links: {
        github: 'github.com/janedoe',
        linkedin: 'linkedin.com/in/janedoe'
    }
}

// --- Pages ---

function Home() {
    const navigate = useNavigate()
    return (
        <div style={{ textAlign: 'center', padding: 'var(--space-5) 0' }}>
            <h1 className="ds-headline" style={{ fontSize: '64px', marginBottom: 'var(--space-2)' }}>
                Build a Resume That Gets Read.
            </h1>
            <p className="ds-subtext" style={{ margin: '0 auto var(--space-4)' }}>
                A premium, minimal approach to professional storytelling. No noise, just your career in its best light.
            </p>
            <Button onClick={() => navigate('/builder')}>Start Building</Button>
        </div>
    )
}

function Builder({ data, update }: { data: ResumeData; update: (d: ResumeData) => void }) {
    const addEdu = () => update({ ...data, education: [...data.education, { id: Date.now().toString(), school: '', degree: '', year: '' }] })
    const addExp = () => update({ ...data, experience: [...data.experience, { id: Date.now().toString(), company: '', role: '', duration: '', desc: '' }] })
    const addProj = () => update({ ...data, projects: [...data.projects, { id: Date.now().toString(), name: '', desc: '', link: '' }] })

    const loadSample = () => update(SAMPLE_DATA)

    return (
        <div className="ds-twoPanel">
            <div className="ds-panelStack" style={{ gap: 'var(--space-3)' }}>
                <Card title="Personal Information">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                        <Field label="Full Name">
                            <TextInput value={data.personal.name} onChange={e => update({ ...data, personal: { ...data.personal, name: e.target.value } })} />
                        </Field>
                        <Field label="Email">
                            <TextInput value={data.personal.email} onChange={e => update({ ...data, personal: { ...data.personal, email: e.target.value } })} />
                        </Field>
                        <Field label="Phone">
                            <TextInput value={data.personal.phone} onChange={e => update({ ...data, personal: { ...data.personal, phone: e.target.value } })} />
                        </Field>
                        <Field label="Location">
                            <TextInput value={data.personal.location} onChange={e => update({ ...data, personal: { ...data.personal, location: e.target.value } })} />
                        </Field>
                    </div>
                </Card>

                <Card title="Professional Summary">
                    <Field label="Summary">
                        <TextArea value={data.summary} onChange={e => update({ ...data, summary: e.target.value })} placeholder="Briefly describe your career goals and achievements..." />
                    </Field>
                </Card>

                <Card title="Education">
                    {data.education.map((edu, idx) => (
                        <div key={edu.id} style={{ marginBottom: 'var(--space-2)', borderBottom: idx < data.education.length - 1 ? 'var(--border)' : 'none', paddingBottom: 'var(--space-2)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                                <Field label="School">
                                    <TextInput value={edu.school} onChange={e => {
                                        const newEdu = [...data.education]; newEdu[idx].school = e.target.value; update({ ...data, education: newEdu })
                                    }} />
                                </Field>
                                <Field label="Degree">
                                    <TextInput value={edu.degree} onChange={e => {
                                        const newEdu = [...data.education]; newEdu[idx].degree = e.target.value; update({ ...data, education: newEdu })
                                    }} />
                                </Field>
                                <Field label="Year(s)">
                                    <TextInput value={edu.year} onChange={e => {
                                        const newEdu = [...data.education]; newEdu[idx].year = e.target.value; update({ ...data, education: newEdu })
                                    }} />
                                </Field>
                            </div>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addEdu}>+ Add Education</Button>
                </Card>

                <Card title="Experience">
                    {data.experience.map((exp, idx) => (
                        <div key={exp.id} style={{ marginBottom: 'var(--space-2)', borderBottom: idx < data.experience.length - 1 ? 'var(--border)' : 'none', paddingBottom: 'var(--space-2)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                                <Field label="Company">
                                    <TextInput value={exp.company} onChange={e => {
                                        const newExp = [...data.experience]; newExp[idx].company = e.target.value; update({ ...data, experience: newExp })
                                    }} />
                                </Field>
                                <Field label="Role">
                                    <TextInput value={exp.role} onChange={e => {
                                        const newExp = [...data.experience]; newExp[idx].role = e.target.value; update({ ...data, experience: newExp })
                                    }} />
                                </Field>
                                <Field label="Duration">
                                    <TextInput value={exp.duration} onChange={e => {
                                        const newExp = [...data.experience]; newExp[idx].duration = e.target.value; update({ ...data, experience: newExp })
                                    }} />
                                </Field>
                            </div>
                            <Field label="Description">
                                <TextArea value={exp.desc} onChange={e => {
                                    const newExp = [...data.experience]; newExp[idx].desc = e.target.value; update({ ...data, experience: newExp })
                                }} />
                            </Field>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addExp}>+ Add Experience</Button>
                </Card>

                <Card title="Projects & Skills">
                    <Field label="Skills (comma separated)">
                        <TextInput value={data.skills} onChange={e => update({ ...data, skills: e.target.value })} placeholder="e.g. React, Python, Product Management" />
                    </Field>
                    <div style={{ height: 'var(--space-3)' }} />
                    <Field label="GitHub URL">
                        <TextInput value={data.links.github} onChange={e => update({ ...data, links: { ...data.links, github: e.target.value } })} />
                    </Field>
                    <Field label="LinkedIn URL">
                        <TextInput value={data.links.linkedin} onChange={e => update({ ...data, links: { ...data.links, linkedin: e.target.value } })} />
                    </Field>
                </Card>
            </div>

            <aside className="ds-panelStack">
                <Card title="Live Preview">
                    <div className="resume-preview-shell">
                        <div style={{ padding: 'var(--space-3)', minHeight: '600px', background: 'white', color: 'black', border: '1px solid #ddd', fontSize: '12px', fontFamily: 'serif' }}>
                            <div style={{ textAlign: 'center', marginBottom: 'var(--space-3)' }}>
                                <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>{data.personal.name || 'Your Name'}</h2>
                                <div>{data.personal.email} | {data.personal.phone}</div>
                                <div>{data.personal.location}</div>
                            </div>

                            <div style={{ marginBottom: 'var(--space-3)' }}>
                                <h3 style={{ borderBottom: '1px solid black', textTransform: 'uppercase', fontSize: '14px' }}>Summary</h3>
                                <p>{data.summary || 'A brief summary of your career...'}</p>
                            </div>

                            <div style={{ marginBottom: 'var(--space-3)' }}>
                                <h3 style={{ borderBottom: '1px solid black', textTransform: 'uppercase', fontSize: '14px' }}>Experience</h3>
                                {data.experience.length === 0 && <p style={{ opacity: 0.5 }}>Work history...</p>}
                                {data.experience.map(exp => (
                                    <div key={exp.id} style={{ marginBottom: 'var(--space-2)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                            <span>{exp.company}</span>
                                            <span>{exp.duration}</span>
                                        </div>
                                        <div style={{ fontStyle: 'italic' }}>{exp.role}</div>
                                        <p style={{ marginTop: '4px' }}>{exp.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginBottom: 'var(--space-3)' }}>
                                <h3 style={{ borderBottom: '1px solid black', textTransform: 'uppercase', fontSize: '14px' }}>Education</h3>
                                {data.education.map(edu => (
                                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span>{edu.school} — {edu.degree}</span>
                                        <span>{edu.year}</span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h3 style={{ borderBottom: '1px solid black', textTransform: 'uppercase', fontSize: '14px' }}>Skills</h3>
                                <p>{data.skills}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Controls">
                    <Button variant="secondary" onClick={loadSample} style={{ width: '100%' }}>Load Sample Data</Button>
                    <div style={{ height: 'var(--space-1)' }} />
                    <Button variant="primary" onClick={() => window.print()} style={{ width: '100%' }}>Download PDF</Button>
                </Card>
            </aside>
        </div>
    )
}

function Preview({ data }: { data: ResumeData }) {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '60px', minHeight: '1000px', boxShadow: '0 0 20px rgba(0,0,0,0.05)', color: 'black', fontFamily: 'var(--font-serif)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '32px', letterSpacing: '1px', fontWeight: 'normal', textTransform: 'uppercase' }}>{data.personal.name || 'NAME'}</h1>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                    {data.personal.email} • {data.personal.phone} • {data.personal.location}
                </div>
                <div style={{ fontSize: '14px', marginTop: '4px', opacity: 0.8 }}>
                    {data.links.github} | {data.links.linkedin}
                </div>
            </div>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Professional Summary</h2>
                <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{data.summary || 'No summary provided.'}</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Professional Experience</h2>
                {data.experience.map(exp => (
                    <div key={exp.id} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
                            <span>{exp.company}</span>
                            <span>{exp.duration}</span>
                        </div>
                        <div style={{ fontStyle: 'italic', fontSize: '14px', marginBottom: '4px' }}>{exp.role}</div>
                        <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{exp.desc}</p>
                    </div>
                ))}
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Education</h2>
                {data.education.map(edu => (
                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                        <span><span style={{ fontWeight: 'bold' }}>{edu.school}</span>, {edu.degree}</span>
                        <span>{edu.year}</span>
                    </div>
                ))}
            </section>

            <section>
                <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Skills</h2>
                <p style={{ fontSize: '14px' }}>{data.skills || 'No skills listed.'}</p>
            </section>
        </div>
    )
}

function Proof() {
    return (
        <div className="ds-panelStack">
            <Card title="Project Proof Artifacts">
                <p className="ds-cardBody">
                    This page serves as the placeholder for the development artifacts of the AI Resume Builder project.
                </p>
                <div style={{ height: 'var(--space-4)' }} />
                <div className="ds-empty">
                    <h4 className="ds-stateTitle">Architecture Artifacts</h4>
                    <p className="ds-stateBody">Visual documentation of the system's data flow and component hierarchy will be linked here.</p>
                </div>
                <div className="ds-empty">
                    <h4 className="ds-stateTitle">Technical Debt Log</h4>
                    <p className="ds-stateBody">Ongoing notes on optimization and future-proofing the resume engine.</p>
                </div>
            </Card>
        </div>
    )
}

// --- Main App ---

export default function App() {
    const [data, setData] = useState<ResumeData>(() => {
        const saved = localStorage.getItem('rb_resume_data')
        return saved ? JSON.parse(saved) : DEFAULT_DATA
    })

    const [proof, setProof] = useState<ProofState>({
        ui: { checked: false, proof: '' },
        logic: { checked: false, proof: '' },
        test: { checked: false, proof: '' },
        deployed: { checked: false, proof: '' },
    })

    useEffect(() => {
        localStorage.setItem('rb_resume_data', JSON.stringify(data))
    }, [data])

    const updateProof = (key: ProofKey, next: { checked?: boolean; proof?: string }) => {
        setProof((prev) => ({ ...prev, [key]: { ...prev[key], ...next } }))
    }

    return (
        <div className="ds-shell">
            <TopNav />

            <main className="ds-main" style={{ marginTop: 'var(--space-3)' }}>
                <div className="ds-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/builder" element={<Builder data={data} update={setData} />} />
                        <Route path="/preview" element={<Preview data={data} />} />
                        <Route path="/proof" element={<Proof />} />
                    </Routes>
                </div>
            </main>

            <ProofFooter proof={proof} onChange={updateProof} />
        </div>
    )
}
