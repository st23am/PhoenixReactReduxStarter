defmodule InitTracker.GameServer do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, :ok, [name: __MODULE__])
  end

  def init(:ok) do
    {:ok, []}
  end

  def all(), do: GenServer.call(__MODULE__, {:all})
  def add(combatant), do: GenServer.cast(__MODULE__, {:add, combatant})
  def clear(), do: GenServer.cast(__MODULE__, {:clear})

  def handle_call({:all}, _from, gamestate), do: {:reply, gamestate, gamestate}
  def handle_cast({:clear}, gamestate), do: {:noreply, []}

  def handle_cast({:add, combatant}, gamestate) do
    {:noreply,  [combatant | gamestate]}
  end
end
