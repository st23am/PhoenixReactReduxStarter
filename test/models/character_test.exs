defmodule InitTracker.CharacterTest do
  use InitTracker.ModelCase

  alias InitTracker.Character

  @valid_attrs %{ac: 42, agi_mod: 42, hp: 42, init: 42, name: "some content", player: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Character.changeset(%Character{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Character.changeset(%Character{}, @invalid_attrs)
    refute changeset.valid?
  end
end
