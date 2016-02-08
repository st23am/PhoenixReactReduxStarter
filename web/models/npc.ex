defmodule InitTracker.NPC do
  use InitTracker.Web, :model

  schema "npcs" do
    field :name, :string
    field :init, :integer
    field :hp, :integer
    field :ac, :integer
    field :agi_mod, :integer

    timestamps
  end

  @required_fields ~w(name init hp ac agi_mod)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
