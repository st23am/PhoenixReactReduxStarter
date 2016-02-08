# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     InitTracker.Repo.insert!(%InitTracker.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias InitTracker.{NPC, Character, Repo}

data = [
  %Character{name: "frank", init: 10, hp: 10, ac: 12, agi_mod: 1},
  %Character{name: "joe", init: 7, hp: 10, ac: 12, agi_mod: 0},
  %Character{name: "susan", init: 5, hp: 10, ac: 12, agi_mod: 1},
  %NPC{name: "goblin", init: 7, hp: 3, ac: 10, agi_mod: 2},
  %NPC{name: "bugbear", init: 8, hp: 13, ac: 10, agi_mod: 1},
  %NPC{name: "hobgoblin", init: 4, hp: 7, ac: 12, agi_mod: 1},
  %NPC{name: "skeleton", init: 10, hp: 5, ac: 10, agi_mod: 0},
]

Enum.each(data, fn(model) -> Repo.insert!(model) end)
