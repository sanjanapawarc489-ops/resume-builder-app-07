import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, type BadgeVariant } from './ui'

export function TopNav() {
    return (
        <nav className="ds-topBar">
            <div className="ds-container">
                <div className="ds-topBarInner">
                    <NavLink to="/" className="ds-projectName" style={{ textDecoration: 'none', color: 'inherit' }}>
                        AI Resume Builder
                    </NavLink>
                    <div className="ds-topBarNav">
                        <NavLink to="/builder" className={({ isActive }) => `ds-navLink ${isActive ? 'active' : ''}`}>Builder</NavLink>
                        <NavLink to="/preview" className={({ isActive }) => `ds-navLink ${isActive ? 'active' : ''}`}>Preview</NavLink>
                        <NavLink to="/proof" className={({ isActive }) => `ds-navLink ${isActive ? 'active' : ''}`}>Proof</NavLink>
                    </div>
                    <div className="ds-topBarRight">
                        <Badge variant="neutral">Beta 1.0</Badge>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export function ContextHeader({ headline, subtext }: { headline: string; subtext: string }) {
    return (
        <div className="ds-contextHeader">
            <div className="ds-container">
                <h1 className="ds-headline">{headline}</h1>
                <p className="ds-subtext">{subtext}</p>
            </div>
        </div>
    )
}

export type ProofKey = 'ui' | 'logic' | 'test' | 'deployed'

export type ProofState = {
    [key in ProofKey]: {
        checked: boolean
        proof: string
    }
}

export function ProofFooter({
    proof,
    onChange,
}: {
    proof: ProofState
    onChange: (key: ProofKey, next: { checked?: boolean; proof?: string }) => void
}) {
    return (
        <footer className="ds-proofFooter">
            <div className="ds-container">
                <h4 className="ds-proofTitle">Project Accountability</h4>
                <div className="ds-checklist">
                    {(['ui', 'logic', 'test', 'deployed'] as ProofKey[]).map((key) => (
                        <div key={key} className="ds-checkItem">
                            <input
                                type="checkbox"
                                checked={proof[key].checked}
                                onChange={(e) => onChange(key, { checked: e.target.checked })}
                                style={{ marginTop: '4px' }}
                            />
                            <div className="ds-checkLabel">
                                <span className="ds-checkName">
                                    {key === 'ui' && 'UI Architecture'}
                                    {key === 'logic' && 'Core Logic'}
                                    {key === 'test' && 'Automated Tests'}
                                    {key === 'deployed' && 'Live Build'}
                                </span>
                                <input
                                    type="text"
                                    className="ds-proofInput"
                                    placeholder="Paste proof link/note…"
                                    value={proof[key].proof}
                                    onChange={(e) => onChange(key, { proof: e.target.value })}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}
