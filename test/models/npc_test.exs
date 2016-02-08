defmodule InitTracker.NPCTest do
  use InitTracker.ModelCase

  alias InitTracker.NPC

  @valid_attrs %{ac: 42, agi_mod: 42, hp: 42, init: 42, name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = NPC.changeset(%NPC{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = NPC.changeset(%NPC{}, @invalid_attrs)
    refute changeset.valid?
  end
end
