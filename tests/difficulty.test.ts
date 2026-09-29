import { describe, expect, it } from 'vitest'
import { aiShortcutChance, aiSkill, difficultyProfile } from '../src/game/difficulty'

describe('competition intensity', () => {
  it('scales AI competence from relaxed through intense and keeps it bounded', () => {
    const levels = ['relaxed', 'standard', 'intense'] as const
    const skills = levels.map(level => aiSkill(0.92, level))
    expect(skills[0]).toBeLessThan(skills[1])
    expect(skills[1]).toBeLessThan(skills[2])
    expect(aiSkill(0.98, 'intense')).toBeLessThanOrEqual(0.99)
    expect(aiSkill(0.1, 'relaxed')).toBeGreaterThanOrEqual(0.4)
  })

  it('makes shortcut choices and item reactions more competitive at higher intensity', () => {
    expect(aiShortcutChance(0.5, 'relaxed')).toBeLessThan(aiShortcutChance(0.5, 'standard'))
    expect(aiShortcutChance(0.5, 'standard')).toBeLessThan(aiShortcutChance(0.5, 'intense'))
    expect(aiShortcutChance(0.95, 'intense')).toBeLessThanOrEqual(0.98)
    expect(difficultyProfile('intense').itemReaction).toBeGreaterThan(difficultyProfile('standard').itemReaction)
    expect(difficultyProfile('intense').passingBias).toBeGreaterThan(difficultyProfile('standard').passingBias)
  })
})
