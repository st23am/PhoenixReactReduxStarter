defmodule InitTracker.NPCControllerTest do
  use InitTracker.ConnCase

  alias InitTracker.NPC
  @valid_attrs %{ac: 42, agi_mod: 42, hp: 42, init: 42, name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, npc_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    npc = Repo.insert! %NPC{}
    conn = get conn, npc_path(conn, :show, npc)
    assert json_response(conn, 200)["data"] == %{"id" => npc.id,
      "name" => npc.name,
      "init" => npc.init,
      "hp" => npc.hp,
      "ac" => npc.ac,
      "agi_mod" => npc.agi_mod}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, npc_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, npc_path(conn, :create), npc: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(NPC, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, npc_path(conn, :create), npc: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    npc = Repo.insert! %NPC{}
    conn = put conn, npc_path(conn, :update, npc), npc: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(NPC, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    npc = Repo.insert! %NPC{}
    conn = put conn, npc_path(conn, :update, npc), npc: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    npc = Repo.insert! %NPC{}
    conn = delete conn, npc_path(conn, :delete, npc)
    assert response(conn, 204)
    refute Repo.get(NPC, npc.id)
  end
end