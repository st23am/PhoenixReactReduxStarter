defmodule InitTracker.Repo.Migrations.CreateCharacter do
  use Ecto.Migration

  def change do
    create table(:characters) do
      add :name, :string
      add :init, :integer
      add :hp, :integer
      add :ac, :integer
      add :agi_mod, :integer
      add :player, :string

      timestamps
    end

  end
end
