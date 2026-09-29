import type { Difficulty } from '../engine/save'

export type DifficultyProfile = {
  /** Additive spline-driver competence adjustment; no hidden speed multiplier. */
  skillBonus: number
  /** Scales how quickly rivals reassess a held item. */
  itemReaction: number
  /** Additive chance to choose the shortcut. */
  shortcutBias: number
  /** Strength of a deliberate lane change to pass a nearby rival. */
  passingBias: number
}

const PROFILES: Record<Difficulty, DifficultyProfile> = {
  relaxed: { skillBonus: -0.12, itemReaction: 0.82, shortcutBias: -0.1, passingBias: 0.12 },
  standard: { skillBonus: 0, itemReaction: 1, shortcutBias: 0, passingBias: 0.45 },
  intense: { skillBonus: 0.08, itemReaction: 1.3, shortcutBias: 0.12, passingBias: 0.82 },
}

export function difficultyProfile(difficulty: Difficulty): DifficultyProfile {
  return PROFILES[difficulty]
}

/** Improve decision/handling skill without granting opaque top-speed bonuses. */
export function aiSkill(baseSkill: number, difficulty: Difficulty): number {
  return Math.min(0.99, Math.max(0.4, baseSkill + difficultyProfile(difficulty).skillBonus))
}

export function aiShortcutChance(baseChance: number, difficulty: Difficulty): number {
  return Math.min(0.98, Math.max(0, baseChance + difficultyProfile(difficulty).shortcutBias))
}
