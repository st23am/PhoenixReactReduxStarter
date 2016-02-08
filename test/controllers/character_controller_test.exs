defmodule InitTracker.CharacterControllerTest do
  use InitTracker.ConnCase

  alias InitTracker.Character
  @valid_attrs %{ac: 42, agi_mod: 42, hp: 42, init: 42, name: "some content", player: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, character_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    character = Repo.insert! %Character{}
    conn = get conn, character_path(conn, :show, character)
    assert json_response(conn, 200)["data"] == %{"id" => character.id,
      "name" => character.name,
      "init" => character.init,
      "hp" => character.hp,
      "ac" => character.ac,
      "agi_mod" => character.agi_mod,
      "player" => character.player}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, character_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, character_path(conn, :create), character: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Character, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, character_path(conn, :create), character: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    character = Repo.insert! %Character{}
    conn = put conn, character_path(conn, :update, character), character: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Character, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    character = Repo.insert! %Character{}
    conn = put conn, character_path(conn, :update, character), character: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    character = Repo.insert! %Character{}
    conn = delete conn, character_path(conn, :delete, character)
    assert response(conn, 204)
    refute Repo.get(Character, character.id)
  end
end
