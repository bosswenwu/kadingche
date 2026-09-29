import { describe, expect, it } from 'vitest'
import { defaultSave, parseSave } from '../src/engine/save'

describe('competition intensity save data', () => {
  it('starts new saves at the requested higher challenge', () => {
    expect(defaultSave().difficulty).toBe('intense')
  })

  it('round-trips a valid player-selected difficulty', () => {
    const parsed = parseSave(JSON.stringify({ ...defaultSave(), difficulty: 'relaxed' }))
    expect(parsed.difficulty).toBe('relaxed')
  })

  it('keeps older version-2 saves valid and defaults them to intense', () => {
    const oldSave = { ...defaultSave() } as Record<string, unknown>
    delete oldSave.difficulty
    expect(parseSave(JSON.stringify(oldSave)).difficulty).toBe('intense')
  })

  it('falls back safely for an unknown saved difficulty', () => {
    expect(parseSave(JSON.stringify({ ...defaultSave(), difficulty: 'impossible' })).difficulty).toBe('intense')
  })
})
