defmodule InitTracker.Repo.Migrations.CreateNPC do
  use Ecto.Migration

  def change do
    create table(:npcs) do
      add :name, :string
      add :init, :integer
      add :hp, :integer
      add :ac, :integer
      add :agi_mod, :integer

      timestamps
    end

  end
end
