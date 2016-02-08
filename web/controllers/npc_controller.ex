defmodule InitTracker.NPCController do
  use InitTracker.Web, :controller

  alias InitTracker.NPC

  plug :scrub_params, "npc" when action in [:create, :update]

  def index(conn, _params) do
    npcs = Repo.all(NPC)
    render(conn, "index.json", npcs: npcs)
  end

  def create(conn, %{"npc" => npc_params}) do
    changeset = NPC.changeset(%NPC{}, npc_params)

    case Repo.insert(changeset) do
      {:ok, npc} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", npc_path(conn, :show, npc))
        |> render("show.json", npc: npc)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(InitTracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    npc = Repo.get!(NPC, id)
    render(conn, "show.json", npc: npc)
  end

  def update(conn, %{"id" => id, "npc" => npc_params}) do
    npc = Repo.get!(NPC, id)
    changeset = NPC.changeset(npc, npc_params)

    case Repo.update(changeset) do
      {:ok, npc} ->
        render(conn, "show.json", npc: npc)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(InitTracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    npc = Repo.get!(NPC, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(npc)

    send_resp(conn, :no_content, "")
  end
end
