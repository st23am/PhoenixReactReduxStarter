defmodule InitTracker.NPCView do
  use InitTracker.Web, :view

  def render("index.json", %{npcs: npcs}) do
    %{data: render_many(npcs, InitTracker.NPCView, "npc.json")}
  end

  def render("show.json", %{npc: npc}) do
    %{data: render_one(npc, InitTracker.NPCView, "npc.json")}
  end

  def render("npc.json", %{npc: npc}) do
    %{id: npc.id,
      name: npc.name,
      init: npc.init,
      hp: npc.hp,
      ac: npc.ac,
      agiMod: npc.agi_mod,
      type: "npc"
     }
  end
end
