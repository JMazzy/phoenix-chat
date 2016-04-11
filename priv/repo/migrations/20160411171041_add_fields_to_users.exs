defmodule Chat.Repo.Migrations.AddFieldsToUsers do
  use Ecto.Migration

  def change do

    alter table(:users) do
      add :username, :string
      add :encrypted_password, :string
    end

  end
end
