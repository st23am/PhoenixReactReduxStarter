defmodule InitTracker.CharacterView do
  use InitTracker.Web, :view

  def render("index.json", %{characters: characters}) do
    %{data: render_many(characters, InitTracker.CharacterView, "character.json")}
  end

  def render("show.json", %{character: character}) do
    %{data: render_one(character, InitTracker.CharacterView, "character.json")}
  end

  def render("character.json", %{character: character}) do
    %{id: character.id,
      name: character.name,
      init: character.init,
      hp: character.hp,
      ac: character.ac,
      agiMod: character.agi_mod,
      player: character.player,
      type: "character"
     }
  end
end
