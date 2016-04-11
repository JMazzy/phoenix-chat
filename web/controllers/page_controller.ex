defmodule Chat.PageController do
  use Chat.Web, :controller

  plug Chat.Plug.Authenticate

  def action(conn, _) do
    apply(__MODULE__, action_name(conn),
      [conn, conn.params, conn.assigns.current_user])
  end

  def index(conn, _params, current_user) do
    render(conn, "index.html", user: current_user)
  end
end
