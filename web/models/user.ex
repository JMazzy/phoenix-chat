defmodule Chat.User do
  use Chat.Web, :model

  schema "users" do
    field :name, :string
    field :email, :string
    field :username, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps
  end

  @required_fields ~w(name email username password password_confirmation)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:email, min: 5)
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:username, on: Chat.Repo, downcase: true)
    |> validate_length(:password, min: 6)
    |> validate_length(:password_confirmation, min: 6)
    |> validate_confirmation(:password)
  end

  # def validate_confirmation(changeset, field) do
  #   value = get_field(changeset, field)
  #   confirmation_value = get_field(changeset, :"#{field}_confirmation")
  #   if value != confirmation_value, do: add_error(changeset, :"#{field}_confirmation", "does not match"), else: changeset
  # end
end
