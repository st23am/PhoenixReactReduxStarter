defmodule InitTracker.GameChannel do
  alias InitTracker.GameServer
  use InitTracker.Web, :channel
  require Logger

  def join("games:lobby", payload, socket) do
    gamestate = GameServer.all()
    if authorized?(payload) do
      {:ok, %{gamestate: gamestate}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  #def handle_in("ping", payload, socket) do
  #  {:reply, {:ok, payload}, socket}
  #end
  def handle_in("clear:gamestate", _params, socket) do
    GameServer.clear()
    broadcast! socket, "clear:gamestate", %{}
    {:reply, :ok, socket}
  end

  def handle_in("new:combatant", params, socket) do
    Logger.info("RECIEVED NEW COMBATANT #{inspect(params["data"])}")
    GameServer.add(params["data"])
    broadcast! socket, "new:combatant", %{
      data: params["data"]
    }

    {:reply, :ok, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  #def handle_in("shout", payload, socket) do
  #  broadcast socket, "shout", payload
  #  {:noreply, socket}
  #end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
