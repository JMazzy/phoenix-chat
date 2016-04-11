defmodule Chat.PageController do
  use Chat.Web, :controller

  plug Chat.Plug.Authenticate

  def index(conn, _params) do
    render conn, "index.html"
    IO.puts(conn.assigns.current_user)
  end
end
